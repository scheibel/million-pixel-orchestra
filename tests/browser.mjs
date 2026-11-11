// Real WebGL2 integration checks using Chromium's debugging protocol and Node's WebSocket.
// No browser automation package or runtime dependency is required.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { buildSite, projectRoot } from "../scripts/build-site.mjs";
import { createStaticServer } from "../scripts/serve.mjs";

const root = await mkdtemp(join(tmpdir(), "million-pixels-browser-"));
const profile = await mkdtemp(join(projectRoot, ".browser-test-"));
let browser, server, socket;
try {
  for (const directory of ["site", "demos", "templates"]) await cp(join(projectRoot, directory), join(root, directory), { recursive: true });
  await cp(join(root, "templates/demo"), join(root, "demos/meine-demo"), { recursive: true });
  const fixtureManifestPath = join(root, "demos/meine-demo/demo.json");
  const fixtureManifest = JSON.parse(await readFile(fixtureManifestPath, "utf8"));
  fixtureManifest.snapshots[0].shadertoyUrl = "https://www.shadertoy.com/view/Ab12Cd";
  await writeFile(fixtureManifestPath, JSON.stringify(fixtureManifest));
  const catalog = JSON.parse(await readFile(join(root, "site/catalog.json"), "utf8"));
  catalog.demos.push("demos/meine-demo/demo.json");
  await writeFile(join(root, "site/catalog.json"), JSON.stringify(catalog));
  const output = join(root, "hosting/million-pixel-orchestra");
  await buildSite({ root, output });
  server = createStaticServer({ root: join(root, "hosting"), demos: null });
  await new Promise((resolve, reject) => { server.once("error", reject); server.listen(0, "127.0.0.1", resolve); });
  const origin = `http://127.0.0.1:${server.address().port}`;
  const base = `${origin}/million-pixel-orchestra/`;
  browser = spawn(process.env.CHROME_BIN || "chromium", [
    "--headless=new", "--no-sandbox", "--disable-dev-shm-usage", "--disable-background-networking", "--disable-extensions",
    "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--no-first-run", "--no-default-browser-check",
    "--remote-debugging-address=127.0.0.1", "--remote-debugging-port=0", `--user-data-dir=${profile}`, "about:blank"
  ], { stdio: ["ignore", "ignore", "pipe"], detached: true });
  const endpoint = await new Promise((resolve, reject) => {
    let log = "";
    const timer = setTimeout(() => reject(new Error(`Chromium startet nicht. CHROME_BIN auf einen Chromium-Browser setzen. ${log.slice(-2000)}`)), 25000);
    browser.once("error", error => { clearTimeout(timer); reject(error); });
    browser.once("exit", code => { clearTimeout(timer); reject(new Error(`Chromium beendet (${code}): ${log.slice(-2000)}`)); });
    browser.stderr.on("data", data => {
      log += data.toString();
      const match = log.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (match) { clearTimeout(timer); resolve(match[1]); }
    });
  });
  socket = new WebSocket(endpoint);
  await new Promise((resolve, reject) => { socket.addEventListener("open", resolve, { once: true }); socket.addEventListener("error", reject, { once: true }); });
  let sequence = 0;
  const pending = new Map();
  const failures = [];
  socket.addEventListener("message", event => {
    const message = JSON.parse(event.data);
    if (message.method === "Runtime.exceptionThrown") failures.push(message.params.exceptionDetails.text + ": " + (message.params.exceptionDetails.exception?.description || ""));
    if (!message.id) return;
    const request = pending.get(message.id);
    if (!request) return;
    clearTimeout(request.timer);
    pending.delete(message.id);
    if (message.error) request.reject(new Error(message.error.message));
    else request.resolve(message.result);
  });
  function send(method, params = {}, sessionId) {
    return new Promise((resolve, reject) => {
      const id = ++sequence;
      const timer = setTimeout(() => { pending.delete(id); reject(new Error(`Browser-Zeitlimit: ${method}`)); }, 15000);
      pending.set(id, { resolve, reject, timer });
      socket.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
    });
  }
  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
  const page = (method, params) => send(method, params, sessionId);
  await page("Page.enable");
  await page("Runtime.enable");
  await send("Browser.grantPermissions", { origin, permissions: ["clipboardReadWrite", "clipboardSanitizedWrite"] });
  await page("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1100, deviceScaleFactor: 1, mobile: false });
  async function evaluate(expression) {
    const result = await page("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true, userGesture: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
    return result.result.value;
  }
  async function until(expression) {
    const deadline = Date.now() + 10000;
    do {
      if (await evaluate(expression)) return;
      await new Promise(resolve => setTimeout(resolve, 60));
    } while (Date.now() < deadline);
    throw new Error(`Browser-Zustand fehlt: ${expression}\n${await evaluate('document.body.innerText')}`);
  }
  const click = selector => evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);
  async function edit(text) {
    await evaluate(`document.querySelector('#source').value = ${JSON.stringify(text)}; document.querySelector('#source').dispatchEvent(new Event('input', {bubbles:true}));`);
    await until(`document.querySelector('#compile-status').dataset.state !== 'pending'`);
  }
  const success = () => until(`document.querySelector('#compile-status')?.dataset.state === 'success'`);
  async function pixel(x = ".5", y = ".5") {
    return evaluate(`(async () => { await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))); const canvas = document.querySelector('#preview'); const gl = canvas.getContext('webgl2'); gl.drawArrays(gl.TRIANGLES, 0, 3); const data = new Uint8Array(4); gl.readPixels(Math.min(canvas.width-1, Math.floor(canvas.width*${x})), Math.min(canvas.height-1, Math.floor(canvas.height*${y})), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, data); return Array.from(data); })()`);
  }
  function color(actual, expected) { expected.forEach((channel, index) => assert.ok(Math.abs(actual[index] - channel) <= 2, `${actual} ≠ ${expected}`)); }
  async function frameSignature() {
    await pixel();
    return evaluate(`(() => { const c = document.querySelector('#preview'); const gl = c.getContext('webgl2'); gl.drawArrays(gl.TRIANGLES, 0, 3); const data = new Uint8Array(c.width * c.height * 4); gl.readPixels(0, 0, c.width, c.height, gl.RGBA, gl.UNSIGNED_BYTE, data); let signature = ''; for (let y = 0; y < c.height; y += 12) for (let x = 0; x < c.width; x += 12) { const i = 4 * (y * c.width + x); signature += String.fromCharCode(data[i], data[i + 1], data[i + 2]); } return signature; })()`);
  }
  async function screenshot(name) {
    if (!process.env.SCREENSHOT_DIR) return;
    await mkdir(process.env.SCREENSHOT_DIR, { recursive: true });
    const { data } = await page("Page.captureScreenshot", { captureBeyondViewport: true });
    await writeFile(join(process.env.SCREENSHOT_DIR, `${name}.png`), Buffer.from(data, "base64"));
  }
  // Compare noise at fixed times, independently of browser scheduling.
  async function noiseFrame(time) {
    await pixel();
    return evaluate(`(() => {
      const c = document.querySelector('#preview'), gl = c.getContext('webgl2');
      gl.uniform1f(gl.getUniformLocation(gl.getParameter(gl.CURRENT_PROGRAM), 'iTime'), ${time});
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      const data = new Uint8Array(c.width * c.height * 4);
      gl.readPixels(0, 0, c.width, c.height, gl.RGBA, gl.UNSIGNED_BYTE, data);
      let hash = 2166136261, min = 255, max = 0, differences = 0, pairs = 0;
      let grayscale = true, skyColors = true, opaque = true;
      for (let y = 0; y < c.height; y++) for (let x = 0; x < c.width; x++) {
        const i = 4 * (y * c.width + x), r = data[i], g = data[i+1], b = data[i+2];
        min = Math.min(min, r); max = Math.max(max, r);
        grayscale &&= r === g && g === b;
        skyColors &&= r <= g && g <= b;
        opaque &&= data[i+3] === 255;
        if (x > 0) { differences += Math.abs(r - data[i-4]); pairs++; }
        for (let k = 0; k < 4; k++) hash = Math.imul(hash ^ data[i+k], 16777619) >>> 0;
      }
      return {hash, min, max, grayscale, skyColors, opaque, roughness: differences / pairs / 255};
    })()`);
  }
  let simplexGoal;
  await page("Page.navigate", { url: base });
  await until(`document.querySelectorAll('.demo-card').length === ${catalog.demos.length}`);
  assert.equal(await evaluate("document.documentElement.lang"), "de");
  assert.equal(await evaluate("document.querySelectorAll('#material-list a').length"), 0);
  assert.equal(await evaluate("document.querySelector('.shadertoy-links a').href"), "https://www.shadertoy.com/view/Ab12Cd");
  for (const path of catalog.demos.slice(1, -1)) {
    const manifest = JSON.parse(await readFile(join(root, path), "utf8"));
    await page("Page.navigate", { url: `${base}editor.html?demo=${manifest.id}` });
    await success();
    assert.equal(await evaluate("document.querySelectorAll('.snapshot-button').length"), manifest.snapshots.length);
    if (['01-pixelposition-und-normalisierung', '03-kreis-und-quadrierter-abstand'].includes(manifest.id)) {
      color(await pixel(), [255, 255, 255, 255]);
      color(await pixel(".1", ".9"), [255, 255, 255, 255]);
    }
    for (const snapshot of manifest.snapshots.slice(1, -1)) {
      await click(`[data-snapshot="${snapshot.id}"]`);
      await success();
      await pixel();
    }
    await click('[data-snapshot="ziel"]');
    await success();
    await pixel();
    const colors = await evaluate(`(() => { const c = document.querySelector('#preview'); const gl = c.getContext('webgl2'); gl.drawArrays(gl.TRIANGLES, 0, 3); const data = new Uint8Array(c.width * c.height * 4); gl.readPixels(0, 0, c.width, c.height, gl.RGBA, gl.UNSIGNED_BYTE, data); const colors = new Set(); for (let i = 0; i < data.length; i += 4) { colors.add(data.slice(i, i + 4).join(',')); if (colors.size > 1) break; } return colors.size; })()`);
    assert.ok(colors > 1, `${manifest.id}: Bild ist unerwartet einfarbig`);
    if (manifest.id === '03-kreis-und-quadrierter-abstand') {
      const before = await frameSignature();
      await until(`parseFloat(document.querySelector('#time').value.replace(',', '.')) > 1.0`);
      assert.notEqual(await frameSignature(), before, 'Metaballs bewegen sich');
    }
    if (manifest.id === '05-polynom-und-weiche-kante') {
      await click('#play');
      // Freeze only the test rendering time; the teaching snippets stay unchanged.
      async function pointsAt(time) {
        await pixel();
        return evaluate(`(() => {
          const c = document.querySelector('#preview');
          const gl = c.getContext('webgl2');
          gl.uniform1f(gl.getUniformLocation(gl.getParameter(gl.CURRENT_PROGRAM), 'iTime'), ${time});
          gl.drawArrays(gl.TRIANGLES, 0, 3);
          const data = new Uint8Array(c.width * c.height * 4);
          gl.readPixels(0, 0, c.width, c.height, gl.RGBA, gl.UNSIGNED_BYTE, data);
          const visited = new Uint8Array(c.width * c.height);
          const points = [];
          const isPoint = i => Math.min(data[4 * i], data[4 * i + 1], data[4 * i + 2]) < 30;
          for (let seed = 0; seed < visited.length; seed++) {
            if (visited[seed] || !isPoint(seed)) continue;
            const stack = [seed];
            visited[seed] = 1;
            let count = 0, sumX = 0, sumY = 0;
            while (stack.length) {
              const i = stack.pop(), x = i % c.width, y = Math.floor(i / c.width);
              count++; sumX += x + .5; sumY += y + .5;
              const neighbors = [];
              if (x > 0) neighbors.push(i - 1);
              if (x + 1 < c.width) neighbors.push(i + 1);
              if (y > 0) neighbors.push(i - c.width);
              if (y + 1 < c.height) neighbors.push(i + c.width);
              for (const neighbor of neighbors) if (!visited[neighbor] && isPoint(neighbor)) {
                visited[neighbor] = 1; stack.push(neighbor);
              }
            }
            const center = 4 * (Math.floor(sumY / count) * c.width + Math.floor(sumX / count));
            points.push({ position: [(sumX / count - c.width / 2) / c.height, (sumY / count - c.height / 2) / c.height], rgb: Array.from(data.slice(center, center + 3)) });
          }
          return points;
        })()`);
      }
      const near = (actual, expected) => {
        assert.ok(actual, 'Bewegter Punkt ist sichtbar');
        assert.ok(Math.hypot(actual.position[0] - expected[0], actual.position[1] - expected[1]) < .004, `${actual.position} liegt nicht bei ${expected}`);
      };
      const stages = [
        ['start', [0]], ['zwei-punkte-lerp', [0, 2]], ['zwei-punkte-smoothstep', [0, 2]],
        ['vier-punkte-smoothstep', [0, 1, 2, 3]], ['ziel', [0, 1, 2, 3]]
      ];
      assert.deepEqual(manifest.snapshots.map(snapshot => snapshot.id), stages.map(([id]) => id));
      const early = [];
      const phaseFrames = new Map();
      for (const [id, voices] of stages) {
        const count = voices.length;
        await click(`[data-snapshot="${id}"]`);
        await success();
        async function frameAt(time) {
          const points = await pointsAt(time);
          assert.equal(points.length, count, `${id}: erwartete Punktzahl bei ${time} s`);
          return points;
        }
        async function leaderAt(time, position) {
          const points = await frameAt(time);
          const point = points.find(point => Math.hypot(point.position[0] - position[0], point.position[1] - position[1]) < .004);
          near(point, position);
          return point;
        }
        color((await leaderAt(0, [0, .3])).rgb, [0, 0, 0]);
        // The leading point is the only point on the north-east edge at this time.
        const travel = (await frameAt(.3)).find(point => point.position[0] > 0 && point.position[1] > 0);
        assert.ok(travel, 'Führender Punkt fährt auf der ersten Kante');
        early.push(travel.position[0]);
        color(travel.rgb, [0, 0, 0]);
        color((await leaderAt(.6, [.15, .15])).rgb, [0, 0, 0]);
        for (const time of [1.2, 1.275, 1.5, 1.725, 1.8]) await leaderAt(time, [.3, 0]);
        color((await leaderAt(1.2, [.3, 0])).rgb, [0, 0, 0]);
        color((await leaderAt(1.8, [.3, 0])).rgb, [0, 0, 0]);
        const rising = (await leaderAt(1.275, [.3, 0])).rgb;
        const falling = (await leaderAt(1.725, [.3, 0])).rgb;
        color(rising, falling);
        assert.ok(Math.abs(rising[1] / 255 - travel.position[0] / .3) < .02, 'Weg und Farbimpuls verwenden dieselbe Kurve');
        for (const [time, position, rgb] of [
          [1.5, [.3, 0], [0, 255, 0]],
          [3.3, [0, -.3], [0, 0, 255]],
          [5.1, [-.3, 0], [255, 255, 0]],
          [6.9, [0, .3], [255, 0, 0]]
        ]) color((await leaderAt(time, position)).rgb, rgb);
        color((await leaderAt(7.2, [0, .3])).rgb, [0, 0, 0]);
        const canon = await frameAt(1.5);
        phaseFrames.set(id, canon);
        assert.equal(canon.filter(point => point.rgb[1] > 240).length, 1, 'Farbphasen sind zeitversetzt');
        // Two-point phases retain voices 1 and 3 of the complete canon.
        for (const voice of voices) {
          color((await leaderAt(1.5 + voice * 1.5, [.3, 0])).rgb, [0, 255, 0]);
        }
      }
      assert.ok(Math.abs(early[0] - early[1]) < .004, 'Zweiter LERP-Punkt verändert den ersten nicht');
      assert.ok(Math.abs(early[2] - early[3]) < .004, 'Vier Smoothstep-Punkte behalten dieselbe Kurve');
      assert.ok(early[1] > early[2] && early[3] > early[4], 'Smoothstep und Smootherstep fahren zunehmend sanft an');
      for (const [before, after] of [['start', 'zwei-punkte-lerp'], ['zwei-punkte-smoothstep', 'vier-punkte-smoothstep']]) {
        const expanded = phaseFrames.get(after);
        for (const point of phaseFrames.get(before)) {
          const match = expanded.find(candidate => Math.hypot(candidate.position[0] - point.position[0], candidate.position[1] - point.position[1]) < .004);
          near(match, point.position);
          color(match.rgb, point.rgb);
        }
      }
      console.log('✓ Fünf Demo-4-Stände: Punktzahlen 1–2–2–4–4, Stimmen 1/3 in Phase 2/3, Farbimpuls und Kanon');
    }
    if (['08-value-noise', '09-fbm'].includes(manifest.id)) {
      await click('#play');
      const frames = {};
      for (const snapshot of manifest.snapshots) {
        await click(`[data-snapshot="${snapshot.id}"]`);
        await success();
        const frame = frames[snapshot.id] = await noiseFrame(0);
        assert.ok(frame.opaque && frame.max - frame.min > 30, `${manifest.id}/${snapshot.id}: sichtbare Struktur`);
        if (manifest.id === '09-fbm' && snapshot.id === 'ziel') {
          assert.notEqual((await noiseFrame(2)).hash, frame.hash, 'Wolken wandern mit der Zeit');
          assert.equal((await noiseFrame(0)).hash, frame.hash, 'Zeit null stellt das Wolkenbild wieder her');
        } else {
          assert.equal((await noiseFrame(2)).hash, frame.hash, `${manifest.id}/${snapshot.id}: statisches Muster ohne Flimmern`);
        }
        if (manifest.id === '08-value-noise' && snapshot.id === 'start') {
          color(await pixel('.1', '.9'), [26, 230, 0, 255]);
        } else if (snapshot.id === 'wolken' || manifest.id === '09-fbm' && snapshot.id === 'ziel') {
          assert.ok(frame.skyColors && !frame.grayscale, 'Wolken zwischen Blau und Weiß');
        } else {
          assert.ok(frame.grayscale, `${manifest.id}/${snapshot.id}: Graustufen`);
        }
        await noiseFrame(0);
        await screenshot(`${manifest.id}-${snapshot.id}`);
      }
      if (manifest.id === '08-value-noise') {
        assert.ok(frames['zufall-pro-pixel'].roughness > .12, 'Unabhängige benachbarte Pixelwerte');
        for (const id of ['value-noise', 'ziel']) {
          assert.ok(frames[id].roughness < .06, `${id}: räumlich zusammenhängendes Muster`);
        }
        simplexGoal = frames.ziel.hash;
      } else {
        assert.equal(frames.start.hash, simplexGoal, 'Demo 6 schließt visuell unverändert an Demo 5 an');
        assert.notEqual(frames.fbm.hash, frames.start.hash, 'Oktaven verändern die räumliche Struktur');
        assert.equal(frames.wolken.hash, frames.ziel.hash, 'Animation ergänzt bei Zeit null keine Bildänderung');
      }
      console.log(`✓ ${manifest.id}: Anschluss, räumliche Struktur, Farben und Zeitverhalten`);
    }
    await screenshot(manifest.id);
  }
  console.log("✓ START-, Zwischen- und ZIEL-Stände aller Demos");
  await page("Page.navigate", { url: base });
  await until(`document.querySelectorAll('.demo-card').length === ${catalog.demos.length}`);
  await screenshot("landing-desktop");
  await page("Page.navigate", { url: `${base}editor.html?demo=00-konstante-farbe` });
  await success();
  color(await pixel(), [255, 255, 255, 255]);
  assert.equal(await evaluate("document.querySelector('#shadertoy-link').href"), "https://www.shadertoy.com/new");
  assert.match(await evaluate("document.querySelector('#shadertoy-status').textContent"), /noch kein veröffentlichter/);
  assert.equal(await evaluate("document.querySelectorAll('.snapshot-button').length"), 4);
  assert.equal(await evaluate("document.querySelector('#play').getAttribute('aria-label')"), "Animation pausieren");
  assert.equal(await evaluate("document.querySelector('#reset-time').getAttribute('aria-label')"), "Zeit auf 0 zurücksetzen");
  await click('#fullscreen');
  await until(`document.fullscreenElement?.id === 'preview-frame'`);
  await until(`document.querySelector('#preview').width === Math.round(innerWidth * devicePixelRatio) && document.querySelector('#preview').height === Math.round(innerHeight * devicePixelRatio)`);
  assert.equal(await evaluate("document.querySelector('#fullscreen').getAttribute('aria-label')"), "Vollbild schließen");
  assert.equal(await evaluate("getComputedStyle(document.querySelector('#fullscreen-exit-icon')).display !== 'none'"), true);
  color(await pixel(), [255, 255, 255, 255]);
  await evaluate("document.querySelector('#preview').dispatchEvent(new MouseEvent('click', { bubbles: true, ctrlKey: true }))");
  await until(`document.fullscreenElement === null`);
  await until(`document.querySelector('#fullscreen').getAttribute('aria-label') === 'Vollbild öffnen'`);
  await evaluate("document.querySelector('#preview').dispatchEvent(new MouseEvent('click', { bubbles: true, ctrlKey: true }))");
  await until(`document.fullscreenElement?.id === 'preview-frame'`);
  await page("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
  await page("Input.dispatchKeyEvent", { type: "keyUp", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
  await until(`document.fullscreenElement === null`);
  console.log("✓ Vollbild über Schaltfläche und Strg-Klick, Rückkehr mit Strg-Klick und Esc");
  await click('[data-snapshot="violett"]');
  await success();
  color(await pixel(), [115, 82, 199, 255]);
  await click('[data-snapshot="koralle"]');
  await success();
  color(await pixel(), [242, 82, 51, 255]);
  await click('[data-snapshot="ziel"]');
  await success();
  const beforeColor = await pixel();
  await until(`parseFloat(document.querySelector('#time').value.replace(',', '.')) > 1.0`);
  assert.notDeepEqual(await pixel(), beforeColor, 'RGB-Farbe verändert sich mit der Zeit');
  await click('[data-snapshot="start"]');
  const original = await evaluate("document.querySelector('#source').value");
  const changed = original.replace('float rot = 1.0;', 'float rot = 0.20;')
    .replace('float gruen = 1.0;', 'float gruen = 0.60;')
    .replace('float blau = 1.0;', 'float blau = 0.80;');
  assert.notEqual(changed, original, 'Die benannten RGB-Komponenten lassen sich bearbeiten');
  await edit(changed);
  await success();
  color(await pixel(), [51, 153, 204, 255]);
  await click('[data-snapshot="ziel"]');
  await click('[data-snapshot="start"]');
  assert.equal(await evaluate("document.querySelector('#source').value"), changed);
  assert.match(await evaluate("document.querySelector('[data-snapshot=start]').textContent"), /geändert/);
  const invalid = changed.replace('float rot = 0.20;', 'float rot = notDefined;');
  await edit(invalid);
  assert.equal(await evaluate("document.querySelector('#compile-status').dataset.state"), "error");
  assert.equal(await evaluate("document.querySelector('.error-line').textContent"), "3");
  assert.equal(await evaluate("document.querySelector('#stale-label').hidden"), false);
  color(await pixel(), [51, 153, 204, 255]);
  await click("#error-list button");
  assert.match(await evaluate("document.querySelector('#source').value.slice(document.querySelector('#source').selectionStart, document.querySelector('#source').selectionEnd)"), /notDefined/);
  await screenshot("editor-error");
  await click('[data-snapshot="ziel"]');
  await click('[data-snapshot="start"]');
  assert.equal(await evaluate("document.querySelector('#source').value"), invalid);
  await click("#restore");
  await success();
  assert.equal(await evaluate("document.querySelector('#source').value"), original);
  color(await pixel(), [255, 255, 255, 255]);
  console.log("✓ Stände, Entwürfe, Live-Kompilierung, Fehlerzeilen und letzte gültige Vorschau");

  await click("#play");
  await click("#reset-time");
  const technicalShader = "void mainImage(out vec4 fragColor, in vec2 fragCoord) {\n  fragColor = vec4(mod(iTime, 1.0), fragCoord.x / iResolution.x, fragCoord.y / iResolution.y, 1.0);\n}\n";
  await edit(technicalShader);
  await success();
  await until(`document.querySelector('#time').value === '0,00 s'`);
  color(await pixel(), [0, 128, 128, 255]);
  color(await pixel("1", "0"), [0, 255, 0, 255]);
  await click("#play");
  await until(`parseFloat(document.querySelector('#time').value.replace(',', '.')) > .25`);
  await click("#play");
  const paused = await evaluate("document.querySelector('#time').value");
  await edit(technicalShader + "// Änderung bei pausierter Zeit\n");
  await success();
  await new Promise(resolve => setTimeout(resolve, 150));
  const settled = await evaluate("document.querySelector('#time').value");
  assert.ok(Math.abs(parseFloat(paused.replace(",", ".")) - parseFloat(settled.replace(",", "."))) < .15);
  await click("#compile");
  await new Promise(resolve => setTimeout(resolve, 150));
  assert.equal(await evaluate("document.querySelector('#time').value"), settled);
  await click('#fullscreen');
  await until(`document.fullscreenElement?.id === 'preview-frame'`);
  await until(`document.querySelector('#preview').width === Math.round(innerWidth * devicePixelRatio)`);
  assert.equal(await evaluate("document.querySelector('#time').value"), settled);
  color((await pixel()).slice(1), [128, 128, 255]);
  await evaluate("document.querySelector('#preview').dispatchEvent(new MouseEvent('click', { bubbles: true, ctrlKey: true }))");
  await until(`document.fullscreenElement === null`);
  await until(`document.querySelector('#preview').width === Math.round(document.querySelector('#preview').getBoundingClientRect().width * devicePixelRatio)`);
  await screenshot("editor-desktop");
  await click("#copy");
  await until(`document.querySelector('#copy-status').textContent.includes('Code kopiert')`);
  assert.equal(await evaluate("navigator.clipboard.readText()"), await evaluate("document.querySelector('#source').value"));
  await evaluate("navigator.clipboard.writeText = async () => { throw new Error('Test'); }");
  await click("#copy");
  await until(`document.querySelector('#copy-status').textContent.includes('Code markiert')`);
  assert.equal(await evaluate("document.querySelector('#source').selectionEnd"), (await evaluate("document.querySelector('#source').value")).length);
  console.log("✓ Animationszeit, Bearbeitung bei Pause und Codeübernahme mit Fallback");

  await page("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await until(`document.querySelector('#preview').width === Math.round(document.querySelector('#preview').getBoundingClientRect().width * 2)`);
  assert.ok(await evaluate("document.documentElement.scrollWidth <= window.innerWidth"), "Mobile Ansicht darf nicht horizontal überlaufen");
  assert.ok(await evaluate("document.querySelector('#preview').height === Math.round(document.querySelector('#preview').getBoundingClientRect().height * 2)"));
  color((await pixel()).slice(1), [128, 128, 255]);
  await screenshot("editor-mobile");
  await click('[data-snapshot="ziel"]');
  await until(`document.querySelector('#time').value === '0,00 s'`);
  assert.equal(await evaluate("document.querySelector('#play').getAttribute('aria-label')"), "Animation abspielen");
  assert.equal(await evaluate("getComputedStyle(document.querySelector('#play-icon')).display !== 'none'"), true);
  assert.equal(await evaluate("getComputedStyle(document.querySelector('#pause-icon')).display"), "none");
  console.log("✓ Hochauflösendes Pixelraster, Seitenverhältnis, mobile Ansicht und pausierter Standwechsel");

  await page("Page.navigate", { url: `${base}editor.html?demo=meine-demo` });
  await success();
  color(await pixel(), [20, 115, 122, 255]);
  assert.equal(await evaluate("document.querySelector('#shadertoy-link').href"), "https://www.shadertoy.com/view/Ab12Cd");
  assert.match(await evaluate("document.querySelector('#shadertoy-link').textContent"), /Veröffentlichten Stand/);
  await click('[data-snapshot="ziel"]');
  assert.equal(await evaluate("document.querySelector('#shadertoy-link').href"), "https://www.shadertoy.com/new");
  await click('[data-snapshot="start"]');
  assert.equal(await evaluate("document.querySelector('#shadertoy-link').href"), "https://www.shadertoy.com/view/Ab12Cd");
  await evaluate("window.testLoss = document.querySelector('#preview').getContext('webgl2').getExtension('WEBGL_lose_context'); window.testLoss.loseContext()");
  await until(`!document.querySelector('#load-error').hidden`);
  await evaluate("window.testLoss.restoreContext()");
  await until(`document.querySelector('#load-error').hidden && document.querySelector('#compile-status').dataset.state === 'success'`);
  color(await pixel(), [20, 115, 122, 255]);
  await page("Page.navigate", { url: `${base}editor.html?demo=unbekannt` });
  await until(`document.querySelector('#load-error')?.textContent.includes('nicht im Katalog')`);
  await writeFile(join(output, "demos/meine-demo/START.glsl"), "void mainImage(out vec4 fragColor, in vec2 fragCoord) { notDefined; }\n");
  await page("Page.navigate", { url: `${base}editor.html?demo=meine-demo` });
  await until(`document.querySelector('#compile-status')?.textContent.includes('Noch keine gültige Vorschau')`);
  assert.equal(await evaluate("document.querySelector('#stale-label').hidden"), true);
  await rm(join(output, "demos/meine-demo/START.glsl"));
  await page("Page.navigate", { url: `${base}editor.html?demo=meine-demo` });
  await until(`document.querySelector('#load-error')?.textContent.includes('404')`);
  const { identifier } = await page("Page.addScriptToEvaluateOnNewDocument", { source: "const nativeGetContext = HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext = function(type, ...args) { return type === 'webgl2' ? null : nativeGetContext.call(this, type, ...args); };" });
  await page("Page.navigate", { url: `${base}editor.html?demo=00-konstante-farbe` });
  await until(`document.querySelector('#load-error')?.textContent.includes('WebGL2 ist nicht verfügbar')`);
  await page("Page.removeScriptToEvaluateOnNewDocument", { identifier });
  const { identifier: noFullscreen } = await page("Page.addScriptToEvaluateOnNewDocument", { source: "Object.defineProperty(document, 'fullscreenEnabled', { value: false });" });
  await page("Page.navigate", { url: `${base}editor.html?demo=00-konstante-farbe` });
  await success();
  assert.equal(await evaluate("document.querySelector('#fullscreen').disabled"), true);
  await evaluate("document.querySelector('#preview').dispatchEvent(new MouseEvent('click', { bubbles: true, ctrlKey: true }))");
  await until(`!document.querySelector('#fullscreen-status').hidden`);
  assert.match(await evaluate("document.querySelector('#fullscreen-status').textContent"), /nicht unterstützt/);
  await page("Page.removeScriptToEvaluateOnNewDocument", { identifier: noFullscreen });
  assert.deepEqual(failures, [], "Keine unbehandelten Browserfehler");
  console.log("✓ Kopierte Demo, Kontextwiederherstellung, unbekannte Demos, fehlende Dateien und fehlendes WebGL2");
  console.log("Browserprüfung unter /million-pixel-orchestra/ erfolgreich.");
} finally {
  socket?.close();
  if (browser?.pid) {
    try { process.kill(-browser.pid, "SIGTERM"); } catch {}
    if (browser.exitCode === null) await Promise.race([new Promise(resolve => browser.once("exit", resolve)), new Promise(resolve => setTimeout(resolve, 1500))]);
    try { process.kill(-browser.pid, "SIGKILL"); } catch {}
  }
  if (server) { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
  await rm(root, { recursive: true, force: true });
  await rm(profile, { recursive: true, force: true });
}
