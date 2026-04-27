import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import mysql from 'mysql2/promise';
import { McpServer, StdioServerTransport } from '@modelcontextprotocol/server';
import { z } from 'zod';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const defaultConfigPath = path.join(__dirname, 'mysql.config.json');

const MysqlConfigSchema = z.object({
  host: z.string().min(1, 'host is required'),
  port: z.coerce.number().int().positive().default(3306),
  user: z.string().min(1, 'user is required'),
  password: z.string().default(''),
  database: z.string().min(1, 'database is required'),
  connectTimeoutMs: z.coerce.number().int().positive().default(10000),
  maxRows: z.coerce.number().int().positive().max(1000).default(200),
  ssl: z.boolean().default(false)
});

function readJsonConfig(configPath) {
  if (!fs.existsSync(configPath)) {
    return {};
  }

  try {
    return JSON.parse(fs.readFileSync(configPath, 'utf8'));
  } catch (error) {
    throw new Error(`Could not parse ${configPath}: ${error.message}`);
  }
}

function loadConfig() {
  const configPath = process.env.MYSQL_MCP_CONFIG_PATH || defaultConfigPath;
  const fileConfig = readJsonConfig(configPath);

  const merged = {
    host: process.env.MYSQL_HOST ?? fileConfig.host,
    port: process.env.MYSQL_PORT ?? fileConfig.port,
    user: process.env.MYSQL_USER ?? fileConfig.user,
    password: process.env.MYSQL_PASSWORD ?? fileConfig.password,
    database: process.env.MYSQL_DATABASE ?? fileConfig.database,
    connectTimeoutMs:
      process.env.MYSQL_CONNECT_TIMEOUT_MS ?? fileConfig.connectTimeoutMs,
    maxRows: process.env.MYSQL_MAX_ROWS ?? fileConfig.maxRows,
    ssl:
      process.env.MYSQL_SSL === undefined
        ? fileConfig.ssl
        : process.env.MYSQL_SSL === 'true'
  };

  const parsed = MysqlConfigSchema.safeParse(merged);
  if (parsed.success) {
    return { config: parsed.data, configPath };
  }

  const issues = parsed.error.issues
    .map((issue) => `${issue.path.join('.') || 'config'}: ${issue.message}`)
    .join('\n');

  throw new Error(
    [
      'MySQL MCP configuration is incomplete.',
      `Expected JSON config at ${configPath} or MYSQL_* environment variables.`,
      issues
    ].join('\n')
  );
}

function formatResult(data) {
  return [
    {
      type: 'text',
      text: JSON.stringify(data, null, 2)
    }
  ];
}

function sanitizeReadonlySql(sql) {
  const trimmed = sql.trim();
  if (!trimmed) {
    throw new Error('sql is required');
  }

  const singleStatement = trimmed.replace(/;+\s*$/, '');
  if (singleStatement.includes(';')) {
    throw new Error('Only one SQL statement is allowed per request.');
  }

  const keywordMatch = singleStatement.match(
    /^(?:\/\*[\s\S]*?\*\/\s*)*([a-zA-Z]+)/
  );
  const keyword = keywordMatch?.[1]?.toUpperCase();
  const allowedKeywords = new Set([
    'SELECT',
    'SHOW',
    'DESCRIBE',
    'DESC',
    'EXPLAIN'
  ]);

  if (!keyword || !allowedKeywords.has(keyword)) {
    throw new Error(
      'Only read-only SELECT, SHOW, DESCRIBE, DESC, and EXPLAIN queries are allowed.'
    );
  }

  return singleStatement;
}

async function listTables(pool, schemaName) {
  const [rows] = await pool.query(
    `
      SELECT
        TABLE_NAME AS tableName,
        TABLE_TYPE AS tableType
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_SCHEMA = ?
      ORDER BY TABLE_NAME
    `,
    [schemaName]
  );

  return rows;
}

async function describeTable(pool, schemaName, tableName) {
  const [rows] = await pool.query(
    `
      SELECT
        COLUMN_NAME AS columnName,
        COLUMN_TYPE AS columnType,
        IS_NULLABLE AS isNullable,
        COLUMN_DEFAULT AS defaultValue,
        COLUMN_KEY AS columnKey,
        EXTRA AS extra
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?
      ORDER BY ORDINAL_POSITION
    `,
    [schemaName, tableName]
  );

  return rows;
}

function createPoolFromConfig(config) {
  return mysql.createPool({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
    waitForConnections: true,
    connectionLimit: 4,
    queueLimit: 0,
    multipleStatements: false,
    connectTimeout: config.connectTimeoutMs,
    ssl: config.ssl ? {} : undefined
  });
}

async function main() {
  const { config, configPath } = loadConfig();
  const pool = createPoolFromConfig(config);

  try {
    await pool.query('SELECT 1');
  } catch (error) {
    await pool.end();
    throw new Error(
      `Could not connect to MySQL using ${configPath}: ${error.message}`
    );
  }

  const server = new McpServer({
    name: 'mysql-readonly',
    version: '1.0.0'
  });

  server.registerTool(
    'list_tables',
    {
      title: 'List MySQL Tables',
      description: 'List the tables available in the configured MySQL schema.',
      inputSchema: z.object({
        schema: z
          .string()
          .min(1)
          .optional()
          .describe('Optional schema name. Defaults to the configured database.')
      })
    },
    async ({ schema }) => {
      const activeSchema = schema || config.database;
      const tables = await listTables(pool, activeSchema);
      const result = {
        schema: activeSchema,
        tableCount: tables.length,
        tables
      };

      return {
        content: formatResult(result),
        structuredContent: result
      };
    }
  );

  server.registerTool(
    'describe_table',
    {
      title: 'Describe MySQL Table',
      description: 'Return column details for a table in the configured MySQL schema.',
      inputSchema: z.object({
        table: z.string().min(1).describe('The table name to inspect.'),
        schema: z
          .string()
          .min(1)
          .optional()
          .describe('Optional schema name. Defaults to the configured database.')
      })
    },
    async ({ table, schema }) => {
      const activeSchema = schema || config.database;
      const columns = await describeTable(pool, activeSchema, table);
      const result = {
        schema: activeSchema,
        table,
        columnCount: columns.length,
        columns
      };

      return {
        content: formatResult(result),
        structuredContent: result
      };
    }
  );

  server.registerTool(
    'get_connection_info',
    {
      title: 'Get MySQL Connection Info',
      description: 'Show the active MySQL host, port, and database for this MCP server.'
    },
    async () => {
      const result = {
        host: config.host,
        port: config.port,
        database: config.database,
        maxRows: config.maxRows,
        ssl: config.ssl
      };

      return {
        content: formatResult(result),
        structuredContent: result
      };
    }
  );

  server.registerTool(
    'run_readonly_query',
    {
      title: 'Run Read-Only MySQL Query',
      description:
        'Run a single read-only MySQL query. Only SELECT, SHOW, DESCRIBE, DESC, and EXPLAIN are allowed.',
      inputSchema: z.object({
        sql: z.string().min(1).describe('A single read-only SQL statement.')
      })
    },
    async ({ sql }) => {
      const safeSql = sanitizeReadonlySql(sql);
      const [rows] = await pool.query(safeSql);
      const normalizedRows = Array.isArray(rows) ? rows : [];
      const limitedRows = normalizedRows.slice(0, config.maxRows);
      const result = {
        rowCount: normalizedRows.length,
        truncated: normalizedRows.length > limitedRows.length,
        maxRows: config.maxRows,
        rows: limitedRows
      };

      return {
        content: formatResult(result),
        structuredContent: result
      };
    }
  );

  const shutdown = async () => {
    await pool.end().catch(() => {});
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
