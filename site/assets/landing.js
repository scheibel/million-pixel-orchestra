import { loadCatalog } from "./catalog.js";

try {
  const { demos, materials, base } = await loadCatalog();
  const list = document.querySelector("#demo-list");
  list.replaceChildren();
  demos.forEach((demo, index) => {
    const link = document.createElement("a");
    link.className = "demo-card";
    link.href = `./editor.html?demo=${encodeURIComponent(demo.id)}`;
    const number = document.createElement("span");
    number.className = "demo-number";
    number.textContent = String(index + 1).padStart(2, "0");
    const content = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = demo.title;
    const summary = document.createElement("p");
    summary.textContent = demo.summary;
    const meta = document.createElement("span");
    meta.className = "demo-meta";
    meta.textContent = `${demo.snapshots.length} ${demo.snapshots.length === 1 ? "vorbereiteter Stand" : "vorbereitete Stände"} · Code & Live-Vorschau`;
    content.append(title, summary, meta);
    const arrow = document.createElement("span");
    arrow.className = "demo-arrow";
    arrow.textContent = "↗";
    arrow.setAttribute("aria-hidden", "true");
    link.append(number, content, arrow);
    list.append(link);
  });
  if (!demos.length) list.textContent = "Noch keine Demos vorhanden.";
  if (materials.length) {
    const list = document.querySelector("#material-list");
    list.replaceChildren();
    for (const material of materials) {
      const link = document.createElement("a");
      link.className = "material-link";
      link.href = new URL(material.file, base).href;
      link.textContent = `${material.title} · PDF ↓`;
      list.append(link);
    }
  }
} catch (error) {
  document.querySelector("#demo-list").replaceChildren();
  const message = document.querySelector("#catalog-error");
  message.textContent = `Die Demos konnten nicht geladen werden. ${error.message} Bitte die Website über den lokalen HTTP-Server öffnen.`;
  message.hidden = false;
}
