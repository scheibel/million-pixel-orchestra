import { execFile } from "node:child_process";
import { cp, mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { projectRoot } from "./build-site.mjs";
import { validateCatalog, validateDemo } from "../site/assets/catalog.js";

const execute = promisify(execFile);
const branch = "gh-pages";

async function checkBundle(directory) {
  try {
    for (const file of ["index.html", "editor.html", ".nojekyll", "assets/editor.js", "assets/landing.js", "assets/catalog.js", "assets/clock.js", "assets/renderer.js", "assets/style.css", "assets/icon.svg"]) {
      await readFile(join(directory, file));
    }
    const catalog = validateCatalog(JSON.parse(await readFile(join(directory, "catalog.json"), "utf8")));
    for (const path of catalog.demos) {
      const demo = validateDemo(JSON.parse(await readFile(join(directory, path), "utf8")));
      for (const snapshot of demo.snapshots) await readFile(join(directory, dirname(path), snapshot.file));
    }
    for (const material of catalog.materials) await readFile(join(directory, material.file));
  } catch (error) {
    throw new Error(`Kein vollständiges Website-Bundle in dist/. Zuerst npm run build oder npm run build:site ausführen. ${error.message}`);
  }
  async function checkFiles(path) {
    for (const entry of await readdir(path, { withFileTypes: true })) {
      if (entry.isSymbolicLink() || entry.name.toLowerCase() === ".git") throw new Error("dist/ darf keine symbolischen Links oder .git-Einträge enthalten.");
      if (entry.isDirectory()) await checkFiles(join(path, entry.name));
    }
  }
  await checkFiles(directory);
}

export async function publishPages({ root = projectRoot, dryRun = false } = {}) {
  root = resolve(root);
  const bundle = join(root, "dist");
  await checkBundle(bundle);
  const git = async (cwd, args) => (await execute("git", args, { cwd, maxBuffer: 8 * 1024 * 1024 })).stdout.trim();
  let remote;
  try { remote = await git(root, ["remote", "get-url", "--push", "origin"]); }
  catch { throw new Error("Git-Remote origin fehlt oder Git ist nicht verfügbar. Bitte origin und den Git-Zugriff einrichten."); }
  if (!remote.includes(":")) remote = resolve(root, remote);
  const temporary = await mkdtemp(join(tmpdir(), "million-pixels-publish-"));
  try {
    await git(temporary, ["init", "--quiet", `--initial-branch=${branch}`]);
    await git(temporary, ["remote", "add", "origin", remote]);
    const existing = await git(temporary, ["ls-remote", "--refs", "origin", `refs/heads/${branch}`]);
    if (existing) {
      await git(temporary, ["fetch", "--quiet", "--depth=1", "origin", `refs/heads/${branch}`]);
      await git(temporary, ["checkout", "--quiet", "-B", branch, "FETCH_HEAD"]);
    }
    for (const entry of await readdir(temporary)) {
      if (entry !== ".git") await rm(join(temporary, entry), { recursive: true, force: true });
    }
    await cp(bundle, temporary, { recursive: true });
    await git(temporary, ["add", "--all"]);
    const changes = await git(temporary, ["diff", "--cached", "--stat"]);
    if (!changes) {
      console.log("gh-pages enthält bereits dieses Bundle; kein Commit und kein Push erforderlich.");
      return { changed: false, dryRun, branch };
    }
    console.log(changes);
    if (dryRun) {
      console.log("Probelauf abgeschlossen: kein Commit, kein Push. Ziel: origin, Branch gh-pages, Verzeichnis /.");
    } else {
      for (const key of ["user.name", "user.email"]) {
        let value;
        try { value = await git(root, ["config", "--get", key]); }
        catch { throw new Error(`Git-Identität fehlt: ${key} vor der Veröffentlichung konfigurieren.`); }
        await git(temporary, ["config", key, value]);
      }
      await git(temporary, ["commit", "--quiet", "-m", "Website veröffentlichen"]);
      // A normal push preserves history and rejects concurrent updates.
      await git(temporary, ["push", "origin", `HEAD:refs/heads/${branch}`]);
      console.log("Website-Bundle nach origin/gh-pages gepusht. GitHub Pages muss gh-pages / (root) als Quelle verwenden.");
    }
    return { changed: true, dryRun, branch };
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2);
    if (args.some(arg => arg !== "--dry-run")) throw new Error("Aufruf: npm run publish:pages -- [--dry-run]");
    await publishPages({ dryRun: args.includes("--dry-run") });
  } catch (error) {
    console.error(`Veröffentlichung fehlgeschlagen: ${error.message}`);
    process.exitCode = 1;
  }
}
