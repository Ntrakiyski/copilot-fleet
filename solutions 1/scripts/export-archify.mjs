import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';

const [htmlArg, sourceArg, outputArg] = process.argv.slice(2);
if (!htmlArg || !sourceArg) {
  throw new Error('Usage: node scripts/export-archify.mjs <artifact.html> <source.json> [output-directory]');
}

const htmlPath = path.resolve(htmlArg);
const sourcePath = path.resolve(sourceArg);
const outputDir = path.resolve(outputArg || path.dirname(htmlPath));
const source = JSON.parse(await fs.readFile(sourcePath, 'utf8'));
await fs.mkdir(outputDir, { recursive: true });

const executablePath = process.env.CHROME_PATH;
if (!executablePath) throw new Error('CHROME_PATH is required');

const browser = await chromium.launch({
  headless: true,
  executablePath,
  args: ['--no-sandbox', '--disable-dev-shm-usage']
});
const context = await browser.newContext({
  acceptDownloads: true,
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 1
});
const page = await context.newPage();
const errors = [];
page.on('pageerror', error => errors.push(String(error)));
page.on('console', message => {
  if (message.type() === 'error') errors.push(message.text());
});

const url = new URL(pathToFileURL(htmlPath).href);
url.searchParams.set('theme', 'dark');
await page.goto(url.href, { waitUntil: 'load' });
await page.waitForSelector('svg[data-quality-profile="showcase"]');
await page.waitForTimeout(350);

async function exportFormat(format, fileName) {
  await page.click('#btn-export');
  const selector = `#export-menu button[data-format="${format}"]`;
  await page.waitForSelector(selector, { state: 'visible' });
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click(selector)
  ]);
  await download.saveAs(path.join(outputDir, fileName));
  await page.waitForTimeout(150);
}

await exportFormat('png', 'enterprise-project-agent.diagram.png');
await exportFormat('svg', 'enterprise-project-agent.diagram.svg');
await exportFormat('share-card', 'enterprise-project-agent.share-card.png');

await page.click('#btn-present');
await page.waitForFunction(() => document.documentElement.getAttribute('data-present') === 'true');
await page.screenshot({
  path: path.join(outputDir, 'enterprise-project-agent.executive-1920x1080.png'),
  fullPage: false
});
const presentMode = await page.evaluate(() => document.documentElement.getAttribute('data-present'));
await page.click('#btn-present');
await page.waitForFunction(() => document.documentElement.getAttribute('data-present') !== 'true');

const viewports = [[1440, 900], [1600, 1000], [1920, 1080], [2048, 1320]];
const results = [];
for (const [width, height] of viewports) {
  await page.setViewportSize({ width, height });
  await page.waitForTimeout(120);
  results.push(await page.evaluate(([viewportWidth, viewportHeight, counts]) => {
    const root = document.documentElement;
    const svg = document.querySelector('svg[data-quality-profile]');
    const rect = svg?.getBoundingClientRect();
    return {
      scrollWidth: root.scrollWidth,
      clientWidth: root.clientWidth,
      scrollHeight: root.scrollHeight,
      clientHeight: root.clientHeight,
      nodes: counts.nodes,
      edges: counts.edges,
      cards: counts.cards,
      views: counts.views,
      title: document.title,
      svgViewBox: svg?.getAttribute('viewBox') || null,
      guidedVisible: !document.querySelector('#guided-views')?.hidden,
      diagramWidth: rect ? Math.round(rect.width) : null,
      diagramHeight: rect ? Math.round(rect.height) : null,
      viewport: [viewportWidth, viewportHeight],
      overflowX: root.scrollWidth > root.clientWidth,
      overflowY: root.scrollHeight > root.clientHeight
    };
  }, [width, height, {
    nodes: source.components?.length || 0,
    edges: source.connections?.length || 0,
    cards: source.cards?.length || 0,
    views: source.meta?.views?.length || 0
  }]));
}

await page.setViewportSize({ width: 1920, height: 1080 });
const themeBefore = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
await page.click('#btn-theme');
const themeAfter = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
await page.click('#btn-theme');

// Guided controls may be intentionally hidden by the responsive viewer shell.
// Dispatch the same DOM click directly so the test verifies the viewer event,
// not whether a specific toolbar control is visible at this viewport.
await page.evaluate(() => {
  const next = document.querySelector('#guided-view-next');
  if (!(next instanceof HTMLButtonElement)) {
    throw new Error('Guided-view next control is missing');
  }
  next.click();
});
await page.waitForTimeout(120);
const guidedLabel = await page.textContent('#guided-view-label');

const interactionCheck = {
  checks: {
    guided_chapters: source.meta?.views?.length || 0,
    guided_label_after_click: guidedLabel?.trim() || null,
    theme_toggle: {
      before: themeBefore,
      after: themeAfter,
      changed: themeBefore !== themeAfter
    },
    present_mode: presentMode
  },
  errors
};

const visualCheck = {
  artifact: htmlPath,
  results,
  errors,
  visualReview: 'pending-manual-inspection'
};

await fs.writeFile(
  path.join(outputDir, 'enterprise-project-agent.interaction-check.json'),
  `${JSON.stringify(interactionCheck, null, 2)}\n`
);
await fs.writeFile(
  path.join(outputDir, 'enterprise-project-agent.visual-check.json'),
  `${JSON.stringify(visualCheck, null, 2)}\n`
);

await browser.close();

if (errors.length) throw new Error(`Browser errors: ${errors.join(' | ')}`);
if (results.some(result => result.overflowX || result.overflowY)) {
  throw new Error('Architecture artifact overflowed at one or more required viewports');
}
if (themeBefore === themeAfter || presentMode !== 'true' || !guidedLabel?.trim()) {
  throw new Error('Required Archify interactions did not pass');
}
