import { loadCatalog } from "./catalog.js";

try {
  const { demos, starter, materials } = await loadCatalog();
  const materialList = document.querySelector("#material-list");
  for (const material of materials) {
    const link = document.createElement("a");
    link.className = "material-card";
    link.href = `./${material.file}`;
    link.type = "application/pdf";
    link.download = "";
    const content = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = material.title;
    const format = document.createElement("p");
    format.textContent = "PDF herunterladen";
    content.append(title, format);
    const arrow = document.createElement("span");
    arrow.className = "demo-arrow";
    arrow.textContent = "↓";
    arrow.setAttribute("aria-hidden", "true");
    link.append(content, arrow);
    materialList.append(link);
  }
  document.querySelector("#materialien").hidden = materials.length === 0;
  if (starter) {
    const link = document.querySelector("#empty-editor");
    link.href = `./editor.html?demo=${encodeURIComponent(starter.id)}`;
    link.hidden = false;
  }
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
    content.append(title, summary);
    const arrow = document.createElement("span");
    arrow.className = "demo-arrow";
    arrow.textContent = "↗";
    arrow.setAttribute("aria-hidden", "true");
    link.append(number, content, arrow);
    list.append(link);
    const published = demo.snapshots.filter(snapshot => snapshot.shadertoyUrl);
    if (published.length) {
      const links = document.createElement("div");
      links.className = "shadertoy-links";
      links.append("Veröffentlicht auf ShaderToy: ");
      for (const snapshot of published) {
        const external = document.createElement("a");
        external.href = snapshot.shadertoyUrl;
        external.target = "_blank";
        external.rel = "noopener noreferrer";
        external.textContent = `${snapshot.label} ↗`;
        links.append(external);
      }
      list.append(links);
    }
  });
  if (!demos.length) list.textContent = "Noch keine Demos vorhanden.";
} catch (error) {
  document.querySelector("#demo-list").replaceChildren();
  const message = document.querySelector("#catalog-error");
  message.textContent = `Die Demos konnten nicht geladen werden. ${error.message} Bitte die Website über den lokalen HTTP-Server öffnen.`;
  message.hidden = false;
}
