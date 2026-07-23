import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const output = resolve(root, 'dist');
const apiBaseUrl = (process.env.API_BASE_URL || process.env.BACKEND_URL || '').replace(/\/+$/, '');
const frontendUrl = (process.env.FRONTEND_URL || '').replace(/\/+$/, '');

if (!apiBaseUrl) {
  throw new Error('API_BASE_URL (or BACKEND_URL) is required for the production build.');
}

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const file of ['index.html', 'script.js', 'styles.css']) {
  await cp(resolve(root, file), resolve(output, file));
}
await cp(resolve(root, 'assets'), resolve(output, 'assets'), { recursive: true });

const config = [
  'window.SHIPRAY_CONFIG = Object.freeze({',
  `  API_BASE_URL: ${JSON.stringify(apiBaseUrl)},`,
  `  FRONTEND_URL: ${JSON.stringify(frontendUrl)}`,
  '});',
  ''
].join('\n');

await writeFile(resolve(output, 'config.js'), config, 'utf8');

const builtHtml = await readFile(resolve(output, 'index.html'), 'utf8');
if (!builtHtml.includes('<script src="config.js"></script>')) {
  throw new Error('index.html is missing the generated config.js script tag.');
}

console.log(`Built Shipray frontend in ${output}`);
