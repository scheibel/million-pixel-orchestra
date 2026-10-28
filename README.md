# Million Pixels Vortrag MCG — Codex Starter

Dieses Repository enthält eine kuratierte Übergabe des ChatGPT-Projektkontexts für die versionierte Entwicklung des MCG-Workshops „Grafiken programmieren – Mit Mathematik zu Millionen Pixeln“.

## Einstieg

1. Diese Dateien in ein lokales Verzeichnis entpacken.
2. Mit Git versionieren:

   ```sh
   git init
   git add .
   git commit -m "docs: initial workshop context and roadmap"
   ```

3. Codex im Repository starten:

   ```sh
   codex
   ```

   Falls die Codex-CLI noch nicht vorhanden ist: `npm install -g @openai/codex@latest` (mit einer unterstützten Node.js-Installation).

4. Den Prompt aus `CODEX_STARTPROMPT.md` als erste Aufgabe verwenden.

Codex liest `AGENTS.md` automatisch als Repository-Anweisung. Der Startprompt verweist zusätzlich ausdrücklich auf `CONTEXT.md` und `ROADMAP.md`.

## Leitprinzip

Zuerst **lokal entwickeln und per Git versionieren**, danach geprüfte ShaderToy-`START`-/`ZIEL`-Snippets übertragen. Nicht aus einem Chat heraus ad hoc ShaderToy-Demos anlegen, bevor ihre Entwicklungsstände im Repository existieren.

## Dateikarte
- `AGENTS.md`: technische und didaktische Regeln für Codex.
- `CONTEXT.md`: kuratierter, quellenbewusster Planungsstand.
- `ROADMAP.md`: Implementierungsphasen und vorläufiger Ablauf.
- `CODEX_STARTPROMPT.md`: erste konkrete Aufgabe für Codex.
- `demos/`: Raum für die späteren Demo-Snippets.
