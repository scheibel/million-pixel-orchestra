import { fetchText, loadCatalog } from "./catalog.js";
import { ShaderPreview } from "./renderer.js";

const element = id => document.getElementById(id);
const source = element("source");
let preview;
let selected;
let compileTimer;
let errorLines = new Set();
const states = new Map();
const buttons = new Map();

function showFailure(message) {
  element("load-error").textContent = message;
  element("load-error").hidden = false;
  element("compile-status").textContent = "Vorschau nicht verfügbar.";
  element("compile-status").dataset.state = "error";
}

function updateLines() {
  const fragment = document.createDocumentFragment();
  for (let index = 1; index <= source.value.split("\n").length; index++) {
    const line = document.createElement("span");
    line.textContent = index;
    if (errorLines.has(index)) line.className = "error-line";
    fragment.append(line);
  }
  element("line-numbers").replaceChildren(fragment);
  element("line-numbers").scrollTop = source.scrollTop;
}

function updateDraft() {
  const state = states.get(selected);
  state.draft = source.value;
  for (const [id, button] of buttons) {
    const state = states.get(id);
    button.textContent = state.label + (state.draft !== state.prepared ? " · geändert" : "");
    button.setAttribute("aria-pressed", String(id === selected));
  }
  const dirty = state.draft !== state.prepared;
  element("draft-status").textContent = dirty ? "Eigener Entwurf" : "Vorbereitete Fassung";
  element("restore").disabled = !dirty;
}

function setStatus(message, state) {
  element("compile-status").textContent = message;
  element("compile-status").dataset.state = state;
}

function goToLine(line) {
  const lines = source.value.split("\n");
  const start = lines.slice(0, line - 1).reduce((sum, text) => sum + text.length + 1, 0);
  source.focus();
  source.setSelectionRange(start, start + (lines[line - 1]?.length || 0));
  source.scrollTop = Math.max(0, (line - 3) * 23);
  element("line-numbers").scrollTop = source.scrollTop;
}

function compile() {
  clearTimeout(compileTimer);
  try {
    const result = preview.compile(source.value);
    errorLines = new Set();
    element("errors").hidden = result.ok;
    element("stale-label").hidden = result.ok || !preview.program;
    if (result.ok) {
      element("load-error").hidden = true;
      setStatus("Kompiliert · Die Vorschau zeigt den aktuellen Code.", "success");
    } else {
      setStatus(preview.program ? "Fehler im aktuellen Code · Die Vorschau zeigt zuletzt gültigen Code." : "Fehler im aktuellen Code · Noch keine gültige Vorschau.", "error");
      element("error-log").textContent = result.log;
      element("error-list").replaceChildren();
      for (const error of result.errors) {
        const item = document.createElement("li");
        if (error.line) {
          errorLines.add(error.line);
          const jump = document.createElement("button");
          jump.type = "button";
          jump.textContent = `Zeile ${error.line}: ${error.message}`;
          jump.addEventListener("click", () => goToLine(error.line));
          item.append(jump);
        } else item.textContent = `Shader-Schnittstelle: ${error.message}`;
        element("error-list").append(item);
      }
    }
    updateLines();
  } catch (error) { showFailure(error.message); }
}

function selectSnapshot(id) {
  if (selected) states.get(selected).draft = source.value;
  selected = id;
  const state = states.get(id);
  source.value = state.draft;
  source.scrollTop = 0;
  source.scrollLeft = 0;
  element("snapshot-description").textContent = state.description;
  element("shadertoy-link").href = state.shadertoyUrl || "https://www.shadertoy.com/new";
  element("copy-status").textContent = "";
  preview.resetTime();
  updateDraft();
  compile();
}

try {
  const { demos } = await loadCatalog();
  const requested = new URLSearchParams(location.search).get("demo");
  const demo = requested ? demos.find(demo => demo.id === requested) : demos[0];
  if (!demo) throw new Error("Diese Demo ist nicht im Katalog vorhanden. Bitte über „Alle Demos“ eine Demo auswählen.");
  element("demo-title").textContent = demo.title;
  document.title = `${demo.title} · Millionen Pixel`;
  element("demo-summary").textContent = demo.summary;
  element("demo-math").textContent = demo.math;
  const loaded = await Promise.all(demo.snapshots.map(async snapshot => ({
    ...snapshot, prepared: await fetchText(new URL(snapshot.file, demo.url))
  })));
  for (const snapshot of loaded) {
    states.set(snapshot.id, { ...snapshot, draft: snapshot.prepared });
    const button = document.createElement("button");
    button.type = "button";
    button.className = "snapshot-button";
    button.dataset.snapshot = snapshot.id;
    button.textContent = snapshot.label;
    button.addEventListener("click", () => selectSnapshot(snapshot.id));
    buttons.set(snapshot.id, button);
    element("snapshots").append(button);
  }
  preview = new ShaderPreview(element("preview"), {
    onFrame(time, width, height) {
      element("time").value = `${time.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} s`;
      element("resolution").textContent = `${width} × ${height} px`;
    },
    onError: showFailure,
    onRestore: compile
  });
  element("workspace").disabled = false;
  selectSnapshot(demo.snapshots.some(snapshot => snapshot.id === "start") ? "start" : demo.snapshots[0].id);
  source.addEventListener("input", () => {
    updateDraft();
    errorLines.clear();
    updateLines();
    element("errors").hidden = true;
    element("stale-label").hidden = !preview.program;
    setStatus("Änderungen ausstehend · Die Vorschau wartet auf die Kompilierung.", "pending");
    clearTimeout(compileTimer);
    compileTimer = setTimeout(compile, 350);
  });
  source.addEventListener("scroll", () => { element("line-numbers").scrollTop = source.scrollTop; });
  source.addEventListener("keydown", event => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") { event.preventDefault(); compile(); }
  });
  element("compile").addEventListener("click", compile);
  element("restore").addEventListener("click", () => {
    source.value = states.get(selected).prepared;
    element("copy-status").textContent = "";
    updateDraft();
    compile();
  });
  element("play").addEventListener("click", () => {
    preview.toggle();
    const label = preview.clock.playing ? "Animation pausieren" : "Animation abspielen";
    element("pause-icon").toggleAttribute("hidden", !preview.clock.playing);
    element("play-icon").toggleAttribute("hidden", preview.clock.playing);
    element("play").setAttribute("aria-label", label);
    element("play").title = label;
  });
  element("reset-time").addEventListener("click", () => preview.resetTime());
  const frame = element("preview-frame");
  const fullscreenButton = element("fullscreen");
  const fullscreenAvailable = document.fullscreenEnabled && typeof frame.requestFullscreen === "function";
  if (!fullscreenAvailable) {
    fullscreenButton.disabled = true;
    fullscreenButton.title = "Vollbild wird von diesem Browser nicht unterstützt";
  }
  document.addEventListener("fullscreenchange", () => {
    const active = document.fullscreenElement === frame;
    const label = active ? "Vollbild schließen" : "Vollbild öffnen";
    fullscreenButton.setAttribute("aria-label", label);
    if (fullscreenAvailable) fullscreenButton.title = label;
    element("fullscreen-enter-icon").toggleAttribute("hidden", active);
    element("fullscreen-exit-icon").toggleAttribute("hidden", !active);
  });
  async function toggleFullscreen() {
    const status = element("fullscreen-status");
    status.hidden = true;
    try {
      if (!fullscreenAvailable) throw new Error("Vollbild wird von diesem Browser nicht unterstützt.");
      if (document.fullscreenElement === frame) await document.exitFullscreen();
      else if (document.fullscreenElement) throw new Error("Bitte zuerst das andere Vollbild schließen.");
      else await frame.requestFullscreen();
    } catch (error) {
      status.textContent = `Vollbild nicht verfügbar. ${error.message}`;
      status.hidden = false;
    }
  }
  fullscreenButton.addEventListener("click", toggleFullscreen);
  element("preview").addEventListener("click", event => {
    if (event.ctrlKey) { event.preventDefault(); toggleFullscreen(); }
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && document.fullscreenElement === frame) {
      event.preventDefault();
      toggleFullscreen();
    }
  });
  element("copy").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(source.value);
      element("copy-status").textContent = "Code kopiert. Bereit für ShaderToy.";
    } catch {
      source.focus();
      source.select();
      element("copy-status").textContent = "Code markiert. Mit Strg / ⌘ + C oder dem Kopiermenü kopieren.";
    }
  });
  window.addEventListener("pagehide", event => {
    if (!event.persisted) { clearTimeout(compileTimer); preview.destroy(); }
  });
} catch (error) {
  element("demo-title").textContent = "Demo nicht verfügbar";
  showFailure(error.message);
}
