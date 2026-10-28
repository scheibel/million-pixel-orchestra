# Million Pixels Vortrag MCG — Codex Starter

Dieses Repository enthält eine kuratierte Übergabe des ChatGPT-Projektkontexts für die versionierte Entwicklung des MCG-Workshops „Grafiken programmieren – Mit Mathematik zu Millionen Pixeln“.

Geplant sind ShaderToy-kompatible Demos sowie die bearbeitbaren Quellen für LaTeX-Beamer-Folien und Tafelbilder. Die Lehrmaterialien, beschreibenden Webseitentexte und Folien sind auf Deutsch; Quellcode darf auf Englisch sein. Das Quellformat der Tafelbilder ist noch offen.

Zum geplanten Setup gehören eine deutsche Landingpage und einfaches lokales HTTP-Hosting. Ein vollständiger Release-Build soll Website, Demos sowie aus den Quellen gebaute Folien- und Tafelbild-PDFs bündeln und die PDFs auf der Website zum Download verlinken. Das statische Gesamtergebnis soll auch als GitHub-Pages-Projektseite hostbar sein. Die lokale Demo-Vorschau soll ohne LaTeX-Installation nutzbar bleiben. Diese Infrastruktur ist noch umzusetzen; die Schritte und Abnahmekriterien stehen in `ROADMAP.md`.

Der vollständige Release-Build läuft auf dem Entwicklergerät und setzt dort eine passende LaTeX-Distribution einschließlich benötigter Pakete voraus. Er erzeugt das fertige Website-Bundle in `dist/`. Anschließend wird dieses Bundle separat in die GitHub-Pages-Veröffentlichungsquelle gepusht. GitHub-Actions-Workflows für Build oder Deployment sind nicht vorgesehen; auf GitHub Pages werden keine LaTeX-Distribution oder Projekt-Build-Werkzeuge benötigt.

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

Die Planung unterscheidet Features des Rahmenwerks, externe Integrationen (ShaderToy und GitHub Pages) und Workshopinhalt. Die hierarchische Ausarbeitung der Inhalte folgt später. Die erste technische Aufgabe im Startprompt ist auf F1 der Roadmap begrenzt.

Zuerst **lokal entwickeln und per Git versionieren**, danach geprüfte ShaderToy-`START`-/`ZIEL`-Snippets übertragen. Nicht aus einem Chat heraus ad hoc ShaderToy-Demos anlegen, bevor ihre Entwicklungsstände im Repository existieren.

## Dateikarte
- `AGENTS.md`: technische und didaktische Regeln für Codex.
- `CONTEXT.md`: kuratierter, quellenbewusster Planungsstand.
- `ROADMAP.md`: getrennte Planung für Rahmenwerk, Integrationen und Inhalte; bisherige Themen- und vorläufige Ablaufskizze.
- `CODEX_STARTPROMPT.md`: erste konkrete Aufgabe für Codex.
- `demos/`: Raum für die späteren Demo-Snippets.
