export function localPath(value) {
  return typeof value === "string" && /^[a-zA-Z0-9_./-]+$/.test(value)
    && value.split("/").every(part => part && !part.startsWith("."));
}

function requireText(value, name) {
  if (typeof value !== "string" || !value.trim()) throw new Error(`${name} fehlt oder ist leer.`);
}

export function validateCatalog(catalog) {
  if (!catalog || !Array.isArray(catalog.demos) || !Array.isArray(catalog.materials)) {
    throw new Error("Der Katalog benötigt die Listen demos und materials.");
  }
  if (new Set(catalog.demos).size !== catalog.demos.length) throw new Error("Doppelte Demo im Katalog.");
  for (const path of catalog.demos) {
    if (!localPath(path) || !path.startsWith("demos/") || !path.endsWith("/demo.json")) {
      throw new Error(`Ungültiger Demo-Pfad: ${path}`);
    }
  }
  for (const material of catalog.materials) {
    requireText(material.title, "Materialtitel");
    if (!localPath(material.file) || !material.file.startsWith("downloads/") || !material.file.endsWith(".pdf")) {
      throw new Error("Materialien müssen auf lokale PDFs unter downloads/ verweisen.");
    }
  }
  return catalog;
}

export function validateDemo(demo) {
  if (!demo || typeof demo.id !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(demo.id)) {
    throw new Error("Eine Demo benötigt eine eindeutige id aus Kleinbuchstaben, Zahlen und Bindestrichen.");
  }
  for (const key of ["title", "summary", "math"]) requireText(demo[key], key);
  if (!Array.isArray(demo.snapshots) || demo.snapshots.length < 2) {
    throw new Error(`${demo.id}: Mindestens START und ZIEL werden benötigt.`);
  }
  const ids = new Set();
  for (const snapshot of demo.snapshots) {
    if (typeof snapshot.id !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(snapshot.id) || ids.has(snapshot.id)) {
      throw new Error(`${demo.id}: Ungültige oder doppelte Stand-ID.`);
    }
    ids.add(snapshot.id);
    requireText(snapshot.label, "Standbeschriftung");
    requireText(snapshot.description, "Standbeschreibung");
    if (!localPath(snapshot.file) || !snapshot.file.endsWith(".glsl")) {
      throw new Error(`${demo.id}: Jeder Stand benötigt eine lokale .glsl-Datei.`);
    }
    if (snapshot.shadertoyUrl !== undefined &&
        (typeof snapshot.shadertoyUrl !== "string" || !/^https:\/\/www\.shadertoy\.com\/view\/[a-zA-Z0-9]+$/.test(snapshot.shadertoyUrl))) {
      throw new Error(`${demo.id}: Ungültiger ShaderToy-Link.`);
    }
  }
  if (!ids.has("start") || !ids.has("ziel")) throw new Error(`${demo.id}: Die Stand-IDs start und ziel fehlen.`);
  return demo;
}

export async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Datei nicht erreichbar (${response.status}): ${url.pathname}`);
  return response.text();
}

export async function loadCatalog(base = new URL("../", import.meta.url)) {
  const catalog = validateCatalog(JSON.parse(await fetchText(new URL("catalog.json", base))));
  const demos = await Promise.all(catalog.demos.map(async path => {
    const url = new URL(path, base);
    return { ...validateDemo(JSON.parse(await fetchText(url))), url };
  }));
  if (new Set(demos.map(demo => demo.id)).size !== demos.length) throw new Error("Demo-IDs müssen eindeutig sein.");
  return { demos, materials: catalog.materials, base };
}
