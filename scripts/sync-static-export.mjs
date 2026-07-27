import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDirectory, "..");
const exportDirectory = resolve(projectRoot, "out");
const publishDirectory = resolve(projectRoot, "dist");

const publishRelativePath = relative(projectRoot, publishDirectory);
if (
  !publishRelativePath ||
  publishRelativePath.startsWith("..") ||
  resolve(projectRoot, publishRelativePath) !== publishDirectory
) {
  throw new Error(`Refusing to replace unsafe publish directory: ${publishDirectory}`);
}

await rm(publishDirectory, { recursive: true, force: true });
await mkdir(publishDirectory, { recursive: true });
await cp(exportDirectory, publishDirectory, { recursive: true });

console.log("Copied the Next.js static export from out/ to dist/ for Render.");
