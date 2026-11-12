import test from "node:test";
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { cp, mkdir, mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import { buildSite, projectRoot } from "../scripts/build-site.mjs";
import { buildProject } from "../scripts/build.mjs";
import { buildDocuments } from "../scripts/build-documents.mjs";
import { publishPages } from "../scripts/publish-pages.mjs";

const execute = promisify(execFile);
const git = async (cwd, ...args) => (await execute("git", args, { cwd })).stdout.trim();

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), "million-pixels-release-test-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  for (const directory of ["site", "demos"]) await cp(join(projectRoot, directory), join(root, directory), { recursive: true });
  for (const [directory, name] of [["folien", "vortrag"], ["tafelbilder", "tafelbilder"], ["code-journal", "journal"]]) {
    await mkdir(join(root, directory));
    await writeFile(join(root, directory, `${name}.tex`), "\\documentclass{article}\n\\begin{document}Build-Test\\end{document}\n");
  }
  await cp(join(projectRoot, "folien/vortrag-website.tex"), join(root, "folien/vortrag-website.tex"));
  return root;
}

test("Dokument-Build meldet fehlende Quellen und Werkzeuge und erhält vorhandene PDFs", async t => {
  const root = await fixture(t);
  await mkdir(join(root, "folien/build"));
  const pdf = join(root, "folien/build/vortrag.pdf");
  await writeFile(pdf, "%PDF-vorhanden");
  await assert.rejects(buildDocuments({ root, engine: join(root, "fehlendes-pdflatex") }), /pdflatex fehlt/);
  assert.equal(await readFile(pdf, "utf8"), "%PDF-vorhanden");
  await rm(join(root, "tafelbilder/tafelbilder.tex"));
  await assert.rejects(buildDocuments({ root }), /Pflichtquelle.*tafelbilder/);
});

test("Gesamtbuild bindet frisch gebaute Tafeln ein; LaTeX-Fehler erhalten PDFs und Website", async t => {
  try { await execute("pdflatex", ["--version"]); }
  catch (error) { if (error.code === "ENOENT") return t.skip("LaTeX ist für die übrigen Tests nicht erforderlich."); throw error; }
  const root = await fixture(t);
  // No previous board PDF exists: the slides must find the current staged build.
  await writeFile(join(root, "folien/vortrag.tex"), "\\documentclass{article}\n\\usepackage{graphicx}\n\\begin{document}\\ifdefined\\oeffentlicheFolien\\else Private Vorstellung\\newpage\\fi Gemeinsamer Inhalt\\includegraphics[width=5cm]{tafelbilder.pdf}\\end{document}\n");
  const result = await buildProject({ root });
  assert.equal(result.documents.length, 4);
  for (const path of result.documents) assert.equal((await readFile(path)).subarray(0, 5).toString(), "%PDF-");
  try {
    const localText = (await execute("pdftotext", [join(root, "folien/build/vortrag.pdf"), "-"])).stdout;
    const publicText = (await execute("pdftotext", [join(root, "folien/build/vortrag-website.pdf"), "-"])).stdout;
    assert.match(localText, /Private Vorstellung/);
    assert.doesNotMatch(publicText, /Private Vorstellung/);
    for (const text of [localText, publicText]) assert.match(text, /Gemeinsamer Inhalt/);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    t.diagnostic("PDF-Textvergleich entfällt, weil pdftotext fehlt.");
  }
  const materials = JSON.parse(await readFile(join(root, "dist/catalog.json"), "utf8")).materials;
  assert.deepEqual(materials, [{ title: "Vortragsfolien", file: "downloads/folien.pdf" }]);
  assert.deepEqual(await readFile(join(root, "dist/downloads/folien.pdf")), await readFile(join(root, "site/downloads/folien.pdf")), "Das Bundle enthält die freigegebene Fassung, unabhängig von Dokument-Rebuilds");
  for (const name of ["tafelbilder", "journal"]) await assert.rejects(readFile(join(root, `dist/downloads/${name}.pdf`)), /ENOENT/);
  const pdfInodes = await Promise.all(result.documents.map(async path => (await stat(path)).ino));
  const directories = [join(root, "folien/build"), join(root, "tafelbilder/build"), join(root, "code-journal/build")];
  const directoryInodes = await Promise.all(directories.map(async path => (await stat(path)).ino));
  const firstPdf = await readFile(result.documents[0]);
  await writeFile(join(root, "folien/vortrag.tex"), "\\documentclass{article}\n\\begin{document}Geaenderter Vortrag nach Rebuild\\end{document}\n");
  await buildProject({ root });
  assert.deepEqual(await Promise.all(result.documents.map(async path => (await stat(path)).ino)), pdfInodes, "PDF-Inodes bleiben beim Rebuild erhalten");
  assert.deepEqual(await Promise.all(directories.map(async path => (await stat(path)).ino)), directoryInodes, "Build-Verzeichnisse bleiben beim Rebuild erhalten");
  assert.notDeepEqual(await readFile(result.documents[0]), firstPdf, "Das bestehende PDF enthält den neuen Vortrag");
  const previousPdfs = await Promise.all(result.documents.map(path => readFile(path)));
  const previousSite = await readFile(join(root, "dist/index.html"));
  await writeFile(join(root, "code-journal/journal.tex"), "\\documentclass{article}\\begin{document}\\absichtlichUngueltig\\end{document}");
  await assert.rejects(buildProject({ root }), /PDF-Build fehlgeschlagen:.*code-journal/);
  assert.deepEqual(await Promise.all(result.documents.map(path => readFile(path))), previousPdfs);
  assert.deepEqual(await readFile(join(root, "dist/index.html")), previousSite);
  await writeFile(join(root, "code-journal/journal.tex"), "\\documentclass{article}\\begin{document}Journal\\end{document}");
  await writeFile(join(root, "folien/vortrag-website.tex"), "\\documentclass{article}\\begin{document}\\absichtlichUngueltig\\end{document}");
  await assert.rejects(buildProject({ root }), /PDF-Build fehlgeschlagen:.*vortrag-website/);
  assert.deepEqual(await Promise.all(result.documents.map(path => readFile(path))), previousPdfs);
  assert.deepEqual(await readFile(join(root, "dist/index.html")), previousSite);
});

test("Publish prüft das Bundle vor Git-Zugriff", async t => {
  const root = await fixture(t);
  await assert.rejects(publishPages({ root, dryRun: true }), /Kein vollständiges Website-Bundle/);
  await buildSite({ root });
  await rm(join(root, "dist/assets/renderer.js"));
  await assert.rejects(publishPages({ root, dryRun: true }), /Kein vollständiges Website-Bundle.*renderer\.js/);
  await buildSite({ root });
  await rm(join(root, "dist/demos/leerer-editor/VORLAGE.glsl"));
  await assert.rejects(publishPages({ root, dryRun: true }), /Kein vollständiges Website-Bundle.*VORLAGE\.glsl/);
  await buildSite({ root });
  await rm(join(root, "dist/downloads/folien.pdf"));
  await assert.rejects(publishPages({ root, dryRun: true }), /Kein vollständiges Website-Bundle.*folien\.pdf/);
});

test("Pages-Publish: Probelauf, erster Push, Fortschreibung und unverändertes Bundle", async t => {
  const root = await fixture(t);
  const remote = await mkdtemp(join(tmpdir(), "million-pixels-pages-remote-"));
  t.after(() => rm(remote, { recursive: true, force: true }));
  await git(remote, "init", "--bare", "--initial-branch=gh-pages");
  await git(root, "init", "--initial-branch=main");
  await git(root, "config", "user.name", "Build-Test");
  await git(root, "config", "user.email", "build-test@example.invalid");
  await git(root, "remote", "add", "origin", remote);
  await writeFile(join(root, ".gitignore"), "dist/\n");
  await git(root, "add", ".");
  await git(root, "commit", "-m", "Quellstand für Test");
  const sourceHead = await git(root, "rev-parse", "HEAD");
  await buildSite({ root });
  await writeFile(join(root, "dist/entfernen.txt"), "Veraltete Datei");
  const trial = await publishPages({ root, dryRun: true });
  assert.equal(trial.changed, true);
  assert.equal(await git(root, "ls-remote", "--refs", "origin", "refs/heads/gh-pages"), "");
  await publishPages({ root });
  const first = await git(remote, "rev-parse", "gh-pages");
  const files = (await git(remote, "ls-tree", "--name-only", "gh-pages")).split("\n");
  assert.ok(files.includes(".nojekyll"));
  assert.ok(files.includes("index.html"));
  assert.ok(!files.includes("folien"));
  assert.ok(!files.includes("site"));
  assert.equal(await git(remote, "show", "gh-pages:entfernen.txt"), "Veraltete Datei");
  await buildSite({ root });
  await publishPages({ root });
  const second = await git(remote, "rev-parse", "gh-pages");
  assert.notEqual(first, second);
  assert.equal(await git(remote, "rev-parse", "gh-pages^"), first);
  await assert.rejects(git(remote, "show", "gh-pages:entfernen.txt"));
  assert.equal((await publishPages({ root })).changed, false);
  assert.equal(await git(remote, "rev-parse", "gh-pages"), second);
  assert.equal(await git(root, "rev-parse", "HEAD"), sourceHead);
  assert.equal(await git(root, "status", "--porcelain"), "");
});
