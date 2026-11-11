# Millionen Pixel

Rahmenwerk für den 90-Minuten-Oberstufenworkshop **„Grafiken programmieren – Mit Mathematik zu Millionen Pixeln“**: deutsche Landingpage, lokaler Shader-Editor und vollständig kopierbare ShaderToy-Snippets.

Live-Website: [www.willyscheibel.de/million-pixel-orchestra/](https://www.willyscheibel.de/million-pixel-orchestra/).

Die Schülerinnen und Schüler öffnen zu Beginn die öffentliche Projektwebsite und programmieren direkt im eigenen Live-Editor. Dieser bietet Live-Vorschau, Fehleranzeigen, Animationssteuerung und vorbereitete Quellcode-Stände. ShaderToy wird als optionale Plattform zum Weiterexperimentieren erwähnt; alle Snippets bleiben dorthin kopierbar. Website und PDFs lassen sich gemeinsam bauen; die PDF-Einbindung auf der Website bleibt zurückgestellt. Die Workshop-Demos werden noch didaktisch ausgearbeitet.

Die Landingpage bietet die sechs vorbereiteten Demos und darüber „Leeren Editor öffnen“ für eigene Experimente. Dieser Einstieg lädt ein ShaderToy-Grundgerüst mit weißer Ausgabe. Der Materialbereich kehrt mit der Veröffentlichung von Materialien zurück.

## Lokal starten

Voraussetzungen: **Node.js ab Version 22**, npm und ein aktueller Browser mit **WebGL2**. Es gibt keine npm-Abhängigkeiten; Paketinstallation und LaTeX sind für die Vorschau nicht erforderlich.

```sh
npm run dev
```

Anschließend **http://127.0.0.1:8000/** öffnen. Ein anderer Port ist über `npm run dev -- --port 8080` möglich. Mit Strg+C beenden.

Die Website über HTTP öffnen; `file://` kann die Shader-Dateien nicht laden. Der Entwicklungsserver liefert `site/` und die Demo-Dateien unter `demos/`. Änderungen an Dateien werden nach Neuladen der Seite übernommen.

Für Zugriff von einem anderen Gerät im lokalen Netz mit `--host 0.0.0.0` starten und dort die lokale IP-Adresse des Entwicklergeräts öffnen. Ohne sichere Browser-Zwischenablage markiert „Für ShaderToy kopieren“ den Code zum manuellen Kopieren.

## Den Editor verwenden

- **Stände:** START, Zwischenstände und ZIEL per Schaltfläche auswählen.
- **Bearbeiten:** Nach 350 ms Eingabepause wird automatisch kompiliert; sofort mit „Kompilieren“ oder Strg/⌘+Enter. Zeilennummern begleiten die normale Texteingabe. Die Tab-Taste bleibt für die Tastaturnavigation verfügbar.
- **Fehler:** Fehlerzeilen werden markiert und sind über die Meldung anwählbar. Die letzte erfolgreich kompilierte Vorschau bleibt mit sichtbarer Kennzeichnung erhalten. Ohne vorherigen Erfolg erscheint ein Fehlerzustand.
- **Animation:** Die Symbolschaltflächen für Pause/Abspielen und Zeitrücksetzung sowie die Zeitanzeige steuern `iTime`. Bei Pause werden Codeänderungen mit derselben Zeit dargestellt. Kompilieren setzt die Zeit nicht zurück.
- **Vollbild:** Die Vollbild-Schaltfläche oder Strg-Klick auf das Bild öffnet die bildschirmfüllende Vorschau; Strg-Klick oder Esc schließt sie. Der Browser muss die Fullscreen-API unterstützen.
- **Entwürfe:** Änderungen bleiben je Stand innerhalb der geöffneten Seite erhalten. Wechseln setzt die Zeit zurück und erhält den Wiedergabezustand. „Stand wiederherstellen“ verwirft den aktuellen Entwurf und lädt seine vorbereitete Fassung. Neuladen verwirft alle Browserentwürfe; Repository-Dateien werden nicht verändert.
- **ShaderToy-Export:** „Für ShaderToy kopieren“ übernimmt den vollständigen aktuellen Editorinhalt einschließlich eigener Änderungen. Anschließend ShaderToy öffnen, den Inhalt des Image-Codefelds vollständig ersetzen und ausführen. Die Anleitung steht direkt unter dem Editor; bei fehlender Zwischenablage wird der Code zum manuellen Kopieren markiert.
- **Veröffentlichte Stände:** Optional `shadertoyUrl` je Stand in `demo.json` hinterlegen. Die Landingpage zeigt diese Links unter der Demo; im Editor folgt der Link dem gewählten Stand. Fehlt die URL, wird dies angezeigt und ein neues ShaderToy-Projekt angeboten. Die Website legt keine Projekte an und überträgt Änderungen ausschließlich über Kopieren und Einfügen.

Sechs Demos führen von Farbe bis zu animierten Wolken. Demo 4 führt über fünf Stände von 1 Punkt LERP über 2 Punkte LERP, 2 Punkte Smoothstep und 4 Punkte Smoothstep zu 4 Punkten Smootherstep: Im Halt wechseln die Punkte mit derselben Kurve von Schwarz zur Eckfarbe und zurück. Der START enthält den vorbereiteten Rahmen mit einem Punkt, das ZIEL vier Punkte mit zeitversetztem Ablauf wie im Kanon. Demo 5 führt vom UV-Bild über Zufall pro Pixel und Value Noise zu Simplex Noise. Demo 6 übernimmt dieses Ergebnis und ergänzt fBm, Wolkengestaltung und Animation. Beide haben vier vollständige Stände mit vorbereiteter Noise-Basis. Die START-Shader der ersten drei Demos sind noch vorläufig weiß. Alle Demos besitzen START-, Zwischen- und ZIEL-Stände. Die weitere Unterrichtsausarbeitung steht noch aus.

Ein erster Satz druckbarer Tafelbildentwürfe mit LaTeX-/PGF/TikZ-Quelle und Aufbauhinweisen liegt unter [tafelbilder/](tafelbilder/README.md).
Eine erste Beamer-Präsentation mit Build-Anleitung liegt unter [folien/](folien/README.md).

## Neue Demo ableiten

```sh
cp -R templates/demo demos/10-meine-demo
```

In `demo.json` ID, deutsche Texte und Standliste anpassen, die vollständigen GLSL-Dateien bearbeiten und `demos/10-meine-demo/demo.json` in die Liste `demos` in `site/catalog.json` aufnehmen. Der Editor muss nicht verändert werden. Format und Schnittstelle stehen in [demos/README.md](demos/README.md).

## Website und PDFs bauen

Der Gesamtbuild benötigt zusätzlich eine lokale LaTeX-Distribution mit **pdfLaTeX**. Er ist mit TeX Live 2022/dev (Debian) geprüft. Benötigt werden Beamer, PGF/TikZ, `qrcode`, `babel` einschließlich Deutsch, `geometry`, AMS-Pakete, `newtxmath`, `sourcesanspro`, `sourcecodepro`, `roboto` und `microtype`. Details stehen in [folien/README.md](folien/README.md) und [tafelbilder/README.md](tafelbilder/README.md).

```sh
npm run build
npm run preview
```

`npm run build` erzeugt zuerst beide PDFs, anschließend die Website und Demos. Ergebnis:

| Ausgabe | Inhalt |
| --- | --- |
| `dist/` | Statische Website und Shader-Demos |
| `folien/build/vortrag.pdf` | Beamer-Folien, zwei LaTeX-Durchläufe |
| `tafelbilder/build/tafelbilder.pdf` | Druckbare Tafelbilder |

Fehlende Pflichtquellen, fehlendes `pdflatex` oder LaTeX-Fehler brechen den Build ab. Bisherige PDFs werden erst ersetzt, wenn beide Dokumente erfolgreich gebaut wurden; bei einem Dokumentfehler bleibt auch die bisherige Website erhalten. Es wird kein Push ausgeführt.

Die PDFs werden **vorerst weder nach `dist/` kopiert noch auf der Website verlinkt**. Der Materialkatalog bleibt leer. Ihre spätere Einbindung ist ein eigener Backlogpunkt.

Einzelne Teile lassen sich separat bauen:

```sh
npm run build:site  # Nur Website und Demos, ohne LaTeX
npm run build:pdf   # Nur Folien und Tafelbilder
```

`npm run preview` stellt ausschließlich `dist/` unter http://127.0.0.1:8000/ bereit. Alle Build-Verzeichnisse werden ignoriert.

Das Bundle enthält HTML, CSS, JavaScript, Demo-Metadaten und GLSL-Dateien sowie `.nojekyll`. Relative URLs funktionieren auch unter einem GitHub-Pages-Repositorypfad.

## GitHub Pages veröffentlichen

Der separate Befehl veröffentlicht das zuvor gebaute `dist/` nach `origin`, Branch **`gh-pages`**:

```sh
npm run publish:pages -- --dry-run  # Änderungen prüfen, ohne Commit oder Push
npm run publish:pages              # Fertiges Bundle committen und pushen
```

Build und Veröffentlichung bleiben getrennt. Ablauf, einmalige Pages-Einstellung und Voraussetzungen stehen in [docs/PUBLISHING.md](docs/PUBLISHING.md). Es werden keine eigenen GitHub-Actions-Workflows eingerichtet.

## Prüfen

```sh
npm test
npm run test:browser
```

`npm test` prüft Zeitsteuerung, Compiler-Zuordnung, Demo-Vorlage, Build-Fehler und Hosting unter einem Projektpfad. Es startet einen temporären lokalen HTTP-Server. Publish-Tests verwenden ausschließlich temporäre lokale Git-Repositories und prüfen Erstveröffentlichung, Updates, Probelauf und unveränderte Bundles. Mit installiertem `pdflatex` wird zusätzlich der Gesamtbuild mit kleinen Dokumenten geprüft; sonst entfällt nur dieser Test.

`npm run test:browser` benötigt zusätzlich einen lokal installierten Chromium-Browser. Standardbefehl ist `chromium`; ein anderer Pfad ist über `CHROME_BIN` möglich. Der Test startet einen isolierten Headless-Browser mit Software-WebGL und temporärem Profil. Er prüft echte Pixelwerte, Entwürfe, GLSL-Fehler und Korrektur, Animation, Zwischenablage samt Fallback, mobile Ansicht, Pixeldichte, Kontextverlust und Ladefehler. Die Testwebsite liegt unter `/million-pixel-orchestra/`; die Quell-Demos werden dabei nicht verändert. Optionale Screenshots: `SCREENSHOT_DIR` setzen.

Die ShaderToy-Kompatibilität wird über unveränderte Snippets im WebGL2-Adapter geprüft; ein direkter Test in ShaderToy steht noch aus und ist für den Workshop optional. Die eigene Website ist die Teilnehmerumgebung und muss auf den vorgesehenen Geräten nutzbar sein. Ein Test des Editors auf tatsächlichen Schul-iPads steht noch aus.

## Repository

| Pfad | Aufgabe |
| --- | --- |
| `site/` | Website, Editor und Katalog |
| `demos/` | Shader-Snippets und Metadaten |
| `templates/demo/` | Kopiervorlage |
| `scripts/` | HTTP-Server, Website-/PDF-/Gesamtbuild und Pages-Publish |
| `tests/` | Funktions-, Hosting- und Browserprüfungen |
| `docs/ARCHITECTURE.md` | Architektur und Erweiterungspunkte |
| `docs/PUBLISHING.md` | GitHub-Pages-Veröffentlichung |
| `CONTEXT.md`, `ROADMAP.md` | Entscheidungen und getrennte Planung |
| `AGENTS.md` | Arbeitsanweisungen für Codex |

Rahmenwerk und Unterrichtsinhalte bleiben getrennt. Keine Git-Commits oder Veröffentlichung ohne ausdrücklichen Auftrag.
