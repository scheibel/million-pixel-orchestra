import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildSite, projectRoot } from "./build-site.mjs";
import { buildDocuments } from "./build-documents.mjs";

export async function buildProject({ root = projectRoot } = {}) {
  const documents = await buildDocuments({ root });
  const site = await buildSite({ root });
  return { ...site, documents };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const result = await buildProject();
    console.log(`Build abgeschlossen: Website mit ${result.demos} Demos in ${result.output}.`);
    for (const path of result.documents) console.log(`PDF: ${path}`);
    console.log("PDFs werden vorerst lokal erzeugt; ihre Einbindung in die Website bleibt zurückgestellt.");
  } catch (error) {
    console.error(`Build fehlgeschlagen: ${error.message}`);
    process.exitCode = 1;
  }
}
