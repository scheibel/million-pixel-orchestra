import { execFile } from "node:child_process";
import { copyFile, mkdir, mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { projectRoot } from "./build-site.mjs";

const execute = promisify(execFile);
const documents = [
  { directory: "folien", name: "vortrag", passes: 2 },
  { directory: "tafelbilder", name: "tafelbilder", passes: 1 },
  { directory: "code-journal", name: "journal", passes: 1 }
];

export async function buildDocuments({ root = projectRoot, engine = "pdflatex" } = {}) {
  root = resolve(root);
  for (const document of documents) {
    const source = join(document.directory, `${document.name}.tex`);
    try { await readFile(join(root, source)); }
    catch { throw new Error(`Pflichtquelle fehlt oder ist nicht lesbar: ${source}`); }
  }
  const staging = await mkdtemp(join(root, ".document-build-"));
  try {
    for (const document of documents) {
      const output = join(staging, document.directory);
      await mkdir(output);
      const source = join(document.directory, `${document.name}.tex`);
      for (let pass = 1; pass <= document.passes; pass++) {
        console.log(`PDF: ${source} (Durchlauf ${pass}/${document.passes})`);
        try {
          await execute(engine, ["-interaction=nonstopmode", "-halt-on-error", "-no-shell-escape", `-output-directory=${output}`, source], {
            cwd: root, maxBuffer: 8 * 1024 * 1024
          });
        } catch (error) {
          if (error.code === "ENOENT") throw new Error("pdflatex fehlt. Eine LaTeX-Distribution mit den dokumentierten Paketen installieren; für die Website allein npm run build:site verwenden.");
          const detail = (error.stdout || error.stderr || error.message).trim().split("\n").slice(-25).join("\n");
          throw new Error(`PDF-Build fehlgeschlagen: ${source}, Durchlauf ${pass}.\n${detail}`);
        }
      }
      const pdf = await readFile(join(output, `${document.name}.pdf`));
      if (!pdf.subarray(0, 5).equals(Buffer.from("%PDF-"))) throw new Error(`Keine gültige PDF erzeugt: ${source}`);
    }
    // Keep previous PDFs until every source has compiled successfully.
    for (const document of documents) {
      const output = join(root, document.directory, "build");
      const source = join(staging, document.directory);
      await mkdir(output, { recursive: true });
      // Overwrite existing files to preserve their inodes and PDF viewer watches.
      for (const name of await readdir(source)) {
        await copyFile(join(source, name), join(output, name));
      }
    }
    return documents.map(document => join(root, document.directory, "build", `${document.name}.pdf`));
  } finally {
    await rm(staging, { recursive: true, force: true });
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    for (const path of await buildDocuments()) console.log(`PDF gebaut: ${path}`);
  } catch (error) {
    console.error(`Dokument-Build fehlgeschlagen: ${error.message}`);
    process.exitCode = 1;
  }
}
