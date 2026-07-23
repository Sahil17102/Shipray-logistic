import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const output = resolve(root, 'dist');
const defaultApiBaseUrl = 'https://shipray-logisticbackend.onrender.com';
const defaultFrontendUrl = 'https://shipray-logistic.onrender.com';
const apiBaseUrl = (process.env.API_BASE_URL || process.env.BACKEND_URL || defaultApiBaseUrl).replace(/\/+$/, '');
const frontendUrl = (process.env.FRONTEND_URL || defaultFrontendUrl).replace(/\/+$/, '');

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

const pages = (await readdir(root)).filter(file => file.endsWith('.html'));

for (const file of [...pages, 'script.js', 'styles.css']) {
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

for (const page of pages) {
  const builtHtml = await readFile(resolve(output, page), 'utf8');
  if (!builtHtml.includes('<script src="config.js"></script>')) {
    throw new Error(`${page} is missing the generated config.js script tag.`);
  }
}

console.log(`Built ${pages.length} Shipray pages in ${output}`);
