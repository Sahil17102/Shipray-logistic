import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const output = resolve(root, 'dist')
const shell = await readFile(resolve(output, 'index.html'), 'utf8')
const routes = ['weight-calculator', 'rate-calculator', 'tracking']

await Promise.all(routes.map(async route => {
  const directory = resolve(output, route)
  await mkdir(directory, { recursive: true })
  await writeFile(resolve(directory, 'index.html'), shell, 'utf8')
}))

console.log(`Created static entrypoints for ${routes.length} React routes.`)
