# MySQL MCP Server

This repo includes a small read-only MCP server for MySQL at `mcp/mysql-server.mjs`.

Configuration:

- Create `mcp/mysql.config.json` based on `mcp/mysql.config.example.json`, or
- Provide `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`, and `MYSQL_DATABASE` as environment variables

Run locally:

```bash
npm run mysql:mcp
```

Available tools:

- `list_tables`
- `describe_table`
- `get_connection_info`
- `run_readonly_query`
