import { cp, mkdir, mkdtemp, readFile, rename, rm, stat, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { validateCatalog, validateDemo } from "../site/assets/catalog.js";

export const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const json = async path => JSON.parse(await readFile(path, "utf8"));

// PDF downloads remain optional; document builds do not populate the website.
export async function buildSite({ root = projectRoot, output = join(root, "dist") } = {}) {
  root = resolve(root);
  output = resolve(output);
  if (output === root || !output.startsWith(`${root}/`) || ["site", "demos", "scripts", "templates", "tests", "folien", "tafelbilder", "docs", ".git"].some(name => output === join(root, name) || output.startsWith(`${join(root, name)}/`))) {
    throw new Error("Das Build-Ziel muss ein eigenes Ausgabeverzeichnis innerhalb des Projekts sein.");
  }
  const catalog = validateCatalog(await json(join(root, "site/catalog.json")));
  const copies = [];
  const ids = new Set();
  for (const path of catalog.demos) {
    const manifestPath = join(root, path);
    const demo = validateDemo(await json(manifestPath));
    if (ids.has(demo.id)) throw new Error(`Doppelte Demo-ID: ${demo.id}`);
    ids.add(demo.id);
    copies.push([manifestPath, path]);
    for (const snapshot of demo.snapshots) {
      const sourcePath = join(dirname(manifestPath), snapshot.file);
      const source = await readFile(sourcePath, "utf8");
      if (!/\bvoid\s+mainImage\s*\(/.test(source) || /^\s*#version\b/m.test(source) || /^\s*uniform\b/m.test(source)) {
        throw new Error(`${sourcePath}: Ein vollständiges mainImage-Snippet ohne #version oder eigene Uniform-Deklarationen wird erwartet.`);
      }
      copies.push([sourcePath, join(dirname(path), snapshot.file)]);
    }
  }
  for (const material of catalog.materials) {
    const path = join(root, "site", material.file);
    if (!(await stat(path)).isFile()) throw new Error(`PDF fehlt: ${material.file}`);
    const header = await readFile(path);
    if (!header.subarray(0, 5).equals(Buffer.from("%PDF-"))) throw new Error(`Ungültige PDF-Datei: ${material.file}`);
  }

  await mkdir(dirname(output), { recursive: true });
  const staging = await mkdtemp(join(dirname(output), ".website-build-"));
  try {
    await cp(join(root, "site"), staging, { recursive: true });
    for (const [source, target] of copies) {
      await mkdir(dirname(join(staging, target)), { recursive: true });
      await cp(source, join(staging, target));
    }
    await writeFile(join(staging, ".nojekyll"), "");
    // Validate first: a missing source must not erase the previous usable build.
    await rm(output, { recursive: true, force: true });
    await rename(staging, output);
  } finally {
    await rm(staging, { recursive: true, force: true });
  }
  return { output, demos: ids.size, materials: catalog.materials.length };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const result = await buildSite();
    console.log(`Website gebaut: ${result.output} (${result.demos} Demo(s), ${result.materials} PDF(s)).`);
  } catch (error) {
    console.error(`Website-Build fehlgeschlagen: ${error.message}`);
    process.exitCode = 1;
  }
}
