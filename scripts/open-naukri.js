const { chromium, firefox, webkit } = require('playwright');

const browserTypes = {
  chromium,
  firefox,
  webkit,
};

async function openNaukriJobsPage() {
  const headed = ['1', 'true', 'yes'].includes(String(process.env.NAUKRI_HEADED).toLowerCase());
  const browserName = process.env.NAUKRI_BROWSER || (headed ? 'chromium' : 'firefox');
  const browserType = browserTypes[browserName];
  const keepOpenMs = Number.parseInt(
    process.env.NAUKRI_KEEP_OPEN_MS || (headed ? '5000' : '0'),
    10
  );

  if (!browserType) {
    throw new Error(`Unsupported browser "${browserName}". Use chromium, firefox, or webkit.`);
  }

  console.log(`Launching ${browserName} in ${headed ? 'headed' : 'headless'} mode`);

  const browser = await browserType.launch({ headless: !headed });
  try {
    const page = await browser.newPage();

    await page.goto(
      'https://www.naukri.com/quality-analyst-jobs-in-bengaluru?expJD=true',
      { waitUntil: 'domcontentloaded' }
    );

    await page.waitForLoadState('networkidle');
    const title = await page.title();
    console.log(`Opened: ${title}`);

    if (/access denied/i.test(title)) {
      throw new Error('Naukri returned an Access Denied page.');
    }

    if (keepOpenMs > 0) {
      await page.waitForTimeout(keepOpenMs);
    }
  } finally {
    await browser.close();
  }
}

openNaukriJobsPage().catch((error) => {
  console.error('Failed to open Naukri:', error);
  process.exit(1);
});
