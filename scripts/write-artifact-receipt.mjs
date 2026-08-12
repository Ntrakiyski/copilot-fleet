import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

const [artifactDirArg, sourceArg, docxArg] = process.argv.slice(2);
if (!artifactDirArg || !sourceArg) {
  throw new Error('Usage: node scripts/write-artifact-receipt.mjs <artifact-directory> <source.json> [document.docx]');
}

const artifactDir = path.resolve(artifactDirArg);
const sourcePath = path.resolve(sourceArg);
const source = JSON.parse(await fs.readFile(sourcePath, 'utf8'));
const entries = await fs.readdir(artifactDir, { withFileTypes: true });
const paths = entries
  .filter(entry => entry.isFile())
  .map(entry => path.join(artifactDir, entry.name))
  .filter(filePath => !filePath.endsWith('artifact-receipt.json') && !filePath.endsWith('-package.zip'));
if (docxArg) paths.push(path.resolve(docxArg));

const files = [];
for (const filePath of paths.sort()) {
  const bytes = await fs.readFile(filePath);
  files.push({
    name: path.relative(process.cwd(), filePath),
    bytes: bytes.length,
    sha256: crypto.createHash('sha256').update(bytes).digest('hex')
  });
}

const visualPath = path.join(artifactDir, 'enterprise-project-agent.visual-check.json');
const interactionPath = path.join(artifactDir, 'enterprise-project-agent.interaction-check.json');
const visual = JSON.parse(await fs.readFile(visualPath, 'utf8'));
const interaction = JSON.parse(await fs.readFile(interactionPath, 'utf8'));

const receipt = {
  artifact: source.meta?.title || 'Enterprise Project Agent Architecture',
  generated_at: new Date().toISOString(),
  runtime: 'Archify fetched from tt-a1i/archify during GitHub Actions',
  diagram_type: source.diagram_type,
  source: {
    components: source.components?.length || 0,
    connections: source.connections?.length || 0,
    boundaries: source.boundaries?.length || 0,
    cards: source.cards?.length || 0,
    guided_views: source.meta?.views?.length || 0
  },
  checks: {
    viewport_containment: visual.results.every(result => !result.overflowX && !result.overflowY) ? 'passed' : 'failed',
    viewports_checked: visual.results.map(result => result.viewport.join('x')),
    console_errors: visual.errors.length,
    theme_toggle: interaction.checks.theme_toggle.changed,
    presentation_mode: interaction.checks.present_mode === 'true',
    guided_views: interaction.checks.guided_chapters
  },
  files
};

await fs.writeFile(
  path.join(artifactDir, 'artifact-receipt.json'),
  `${JSON.stringify(receipt, null, 2)}\n`
);
