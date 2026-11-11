import test from "node:test";
import assert from "node:assert/strict";
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { buildSite, projectRoot } from "../scripts/build-site.mjs";
import { createStaticServer } from "../scripts/serve.mjs";
import { AnimationClock } from "../site/assets/clock.js";
import { parseCompilerLog } from "../site/assets/renderer.js";
import { loadCatalog } from "../site/assets/catalog.js";

test("Animation pausiert ohne Zeitsprung und kann pausiert zurückgesetzt werden", () => {
  const clock = new AnimationClock(1000);
  assert.equal(clock.read(2500), 1.5);
  clock.toggle(2500);
  assert.equal(clock.read(99000), 1.5);
  clock.toggle(99000);
  assert.equal(clock.read(100000), 2.5);
  clock.toggle(100000);
  clock.reset(200000);
  assert.equal(clock.read(300000), 0);
  assert.equal(clock.playing, false);
  clock.toggle(300000);
  assert.equal(clock.read(300500), .5);
});

test("Compiler-Zeilennummern beziehen sich auf Snippets, Wrapper-Fehler bleiben separat", () => {
  const errors = parseCompilerLog("ERROR: 0:3: 'oops' : undeclared identifier\nERROR: 1:1: no matching mainImage\n0(7) : error C0000: syntax error\n");
  assert.deepEqual(errors.map(error => error.line), [3, null, 7]);
});

export async function fixture() {
  const root = await mkdtemp(join(tmpdir(), "million-pixels-test-"));
  for (const directory of ["site", "demos", "templates"]) await cp(join(projectRoot, directory), join(root, directory), { recursive: true });
  return root;
}

test("Vorlage lässt sich ohne Viewer-Änderung einbinden; Build läuft unter Projektpfad", async t => {
  const root = await fixture();
  t.after(() => rm(root, { recursive: true, force: true }));
  await cp(join(root, "templates/demo"), join(root, "demos/meine-demo"), { recursive: true });
  const catalog = JSON.parse(await readFile(join(root, "site/catalog.json"), "utf8"));
  catalog.demos.push("demos/meine-demo/demo.json");
  await writeFile(join(root, "site/catalog.json"), JSON.stringify(catalog));
  const output = join(root, "hosting/workshop");
  const result = await buildSite({ root, output });
  assert.equal(result.demos, catalog.demos.length);
  const server = createStaticServer({ root: join(root, "hosting"), demos: null });
  server.listen(0, "127.0.0.1");
  await new Promise(resolve => server.once("listening", resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const base = `http://127.0.0.1:${server.address().port}/workshop/`;
  const loaded = await loadCatalog(new URL(base));
  assert.equal(loaded.demos.length, catalog.demos.length);
  assert.equal(loaded.starter.id, "leer");
  assert.ok(!loaded.demos.some(demo => demo.id === loaded.starter.id), "Die freie Vorlage gehört nicht zur Workshop-Reihenfolge");
  const starterSource = new URL(loaded.starter.snapshots[0].file, loaded.starter.url);
  assert.match(await (await fetch(starterSource)).text(), /void mainImage/);
  const paths = ["", "editor.html?demo=meine-demo", "assets/editor.js", "assets/style.css", "catalog.json", "demos/meine-demo/demo.json", "demos/meine-demo/START.glsl", "demos/00-konstante-farbe/ZIEL.glsl"];
  for (const path of paths) assert.equal((await fetch(new URL(path, base))).status, 200, path);
  assert.match((await fetch(new URL("assets/editor.js", base))).headers.get("content-type"), /javascript/);
  assert.equal((await fetch(new URL("../.git/config", base))).status, 404);
  assert.equal((await fetch(new URL("fehlend.glsl", base))).status, 404);
  assert.equal((await fetch(base, { method: "POST" })).status, 405);
  const redirect = await fetch(base.slice(0, -1), { redirect: "manual" });
  assert.equal(redirect.status, 301);
  assert.equal(redirect.headers.get("location"), "/workshop/");
  for (const html of ["index.html", "editor.html"]) {
    const text = await (await fetch(new URL(html, base))).text();
    for (const [, attribute] of text.matchAll(/(?:src|href)="([^"#?]+)"/g)) {
      if (attribute.startsWith("http")) continue;
      assert.equal((await fetch(new URL(attribute, new URL(html, base)))).status, 200, attribute);
    }
  }
  assert.equal(await readFile(join(output, ".nojekyll"), "utf8"), "");
  await rm(join(root, "demos/meine-demo/START.glsl"));
  await assert.rejects(buildSite({ root, output }), /ENOENT/);
  assert.equal((await fetch(new URL("demos/meine-demo/START.glsl", base))).status, 200, "Vorheriger Build bleibt nutzbar");
});

test("Build lehnt fehlende PDFs, doppelte IDs und unsichere Pfade ab", async t => {
  const root = await fixture();
  t.after(() => rm(root, { recursive: true, force: true }));
  const path = join(root, "site/catalog.json");
  const original = JSON.parse(await readFile(path, "utf8"));
  await writeFile(path, JSON.stringify({ ...original, materials: [{ title: "Folien", file: "downloads/folien.pdf" }] }));
  await assert.rejects(buildSite({ root }), /ENOENT/);
  await mkdir(join(root, "site/downloads"), { recursive: true });
  await writeFile(join(root, "site/downloads/folien.pdf"), "Keine PDF");
  await assert.rejects(buildSite({ root }), /Ungültige PDF/);
  await writeFile(path, JSON.stringify({ ...original, demos: ["demos/../../CONTEXT.md/demo.json"] }));
  await assert.rejects(buildSite({ root }), /Ungültiger Demo-Pfad/);
  await writeFile(path, JSON.stringify({ ...original, starter: "demos/../leer/demo.json" }));
  await assert.rejects(buildSite({ root }), /Ungültiger Demo-Pfad/);
  await writeFile(path, JSON.stringify({ ...original, starter: original.demos[0] }));
  await assert.rejects(buildSite({ root }), /Doppelte Demo/);
  await writeFile(path, JSON.stringify(original));
  await cp(join(root, "demos/00-konstante-farbe"), join(root, "demos/kopie"), { recursive: true });
  await writeFile(path, JSON.stringify({ ...original, demos: [...original.demos, "demos/kopie/demo.json"] }));
  await assert.rejects(buildSite({ root }), /Doppelte Demo-ID/);
  await assert.rejects(buildSite({ root, output: root }), /Build-Ziel/);
  await assert.rejects(buildSite({ root, output: join(root, "folien") }), /Build-Ziel/);
});
