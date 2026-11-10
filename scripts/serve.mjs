import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { realpath, stat } from "node:fs/promises";
import { extname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8", ".glsl": "text/plain; charset=utf-8", ".svg": "image/svg+xml", ".pdf": "application/pdf" };

export function createStaticServer({ root = join(projectRoot, "site"), demos = join(projectRoot, "demos") } = {}) {
  root = resolve(root);
  const server = createServer(async (request, response) => {
    const fail = (status, message) => { response.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" }); response.end(message); };
    if (!["GET", "HEAD"].includes(request.method)) { response.setHeader("Allow", "GET, HEAD"); fail(405, "Nur GET und HEAD werden unterstützt."); return; }
    try {
      const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
      if (pathname.includes("\0") || pathname.includes("\\") || pathname.split("/").some(part => part.startsWith("."))) {
        fail(404, "Datei nicht gefunden."); return;
      }
      const demoRequest = demos && pathname.startsWith("/demos/");
      const directory = resolve(demoRequest ? demos : root);
      const relative = demoRequest ? pathname.slice("/demos/".length) : pathname.slice(1);
      let path = resolve(directory, relative);
      if (path !== directory && !path.startsWith(directory + sep)) { fail(404, "Datei nicht gefunden."); return; }
      let info = await stat(path);
      if (info.isDirectory()) {
        if (!pathname.endsWith("/")) {
          response.writeHead(301, { Location: `${new URL(request.url, "http://localhost").pathname}/${new URL(request.url, "http://localhost").search}` });
          response.end(); return;
        }
        path = join(path, "index.html");
        info = await stat(path);
      }
      const canonical = await realpath(path);
      const canonicalRoot = await realpath(directory);
      if (!info.isFile() || !canonical.startsWith(canonicalRoot + sep)) { fail(404, "Datei nicht gefunden."); return; }
      response.writeHead(200, { "Content-Type": types[extname(path)] || "application/octet-stream", "Content-Length": info.size, "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" });
      if (request.method === "HEAD") response.end();
      else createReadStream(path).on("error", () => response.destroy()).pipe(response);
    } catch (error) {
      if (["ENOENT", "ENOTDIR", "EACCES"].includes(error.code)) fail(404, "Datei nicht gefunden.");
      else if (error instanceof URIError) fail(400, "Ungültiger Pfad.");
      else fail(500, "Die Datei konnte nicht geladen werden.");
    }
  });
  return server;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2);
    const options = {};
    for (let index = 0; index < args.length; index += 2) {
      if (!["--root", "--port", "--host"].includes(args[index]) || !args[index + 1]) throw new Error("Aufruf: node scripts/serve.mjs [--root dist] [--port 8000] [--host 127.0.0.1]");
      options[args[index].slice(2)] = args[index + 1];
    }
    const root = options.root ? resolve(options.root) : join(projectRoot, "site");
    if (!(await stat(join(root, "index.html"))).isFile()) throw new Error("index.html fehlt; für dist zuerst npm run build ausführen.");
    const port = Number(options.port ?? 8000);
    if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("Der Port muss zwischen 1 und 65535 liegen.");
    const host = options.host || "127.0.0.1";
    const server = createStaticServer({ root, demos: options.root ? null : join(projectRoot, "demos") });
    server.on("error", error => { console.error(`Server konnte nicht gestartet werden: ${error.message}`); process.exitCode = 1; });
    server.listen(port, host, () => { console.log(`Lokale Vorschau: http://${host.includes(":") ? `[${host}]` : host}:${port}/`); });
    for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => server.close());
  } catch (error) { console.error(`Serverfehler: ${error.message}`); process.exitCode = 1; }
}
