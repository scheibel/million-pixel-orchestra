# Millionen Pixel

Rahmenwerk für den 90-Minuten-Oberstufenworkshop **„Grafiken programmieren – Mit Mathematik zu Millionen Pixeln“**: deutsche Landingpage, lokaler Shader-Editor und vollständig kopierbare ShaderToy-Snippets.

Die Schülerinnen und Schüler rufen die Demos zum Mitprogrammieren in ShaderToy auf. Die lokale Werkstatt ist insbesondere für die Vorführung auf einem Laptop vorgesehen und bietet Live-Vorschau, Fehleranzeigen, Animationssteuerung und vorbereitete Quellcode-Stände. F1 ist implementiert; die Ausarbeitung der Workshop-Demos sowie PDF- und Release-Builds folgen separat.

## Lokal starten

Voraussetzungen: **Node.js ab Version 22**, npm und ein aktueller Browser mit **WebGL2**. Es gibt keine npm-Abhängigkeiten; Paketinstallation und LaTeX sind für die Vorschau nicht erforderlich.

```sh
npm run dev
```

Anschließend **http://127.0.0.1:8000/** öffnen. Ein anderer Port ist über `npm run dev -- --port 8080` möglich. Mit Strg+C beenden.

Die Website über HTTP öffnen; `file://` kann die Shader-Dateien nicht laden. Der Entwicklungsserver liefert `site/` und die Demo-Dateien unter `demos/`. Änderungen an Dateien werden nach Neuladen der Seite übernommen.

Für Zugriff von einem anderen Gerät im lokalen Netz mit `--host 0.0.0.0` starten und dort die lokale IP-Adresse des Entwicklergeräts öffnen. Ohne sichere Browser-Zwischenablage markiert „Code kopieren“ den Code zum manuellen Kopieren.

## Den Editor verwenden

- **Stände:** START, Zwischenstände und ZIEL per Schaltfläche auswählen.
- **Bearbeiten:** Nach 350 ms Eingabepause wird automatisch kompiliert; sofort mit „Kompilieren“ oder Strg/⌘+Enter. Zeilennummern begleiten die normale Texteingabe. Die Tab-Taste bleibt für die Tastaturnavigation verfügbar.
- **Fehler:** Fehlerzeilen werden markiert und sind über die Meldung anwählbar. Die letzte erfolgreich kompilierte Vorschau bleibt mit sichtbarer Kennzeichnung erhalten. Ohne vorherigen Erfolg erscheint ein Fehlerzustand.
- **Animation:** Die Symbolschaltflächen für Pause/Abspielen und Zeitrücksetzung sowie die Zeitanzeige steuern `iTime`. Bei Pause werden Codeänderungen mit derselben Zeit dargestellt. Kompilieren setzt die Zeit nicht zurück.
- **Vollbild:** Die Vollbild-Schaltfläche oder Strg-Klick auf das Bild öffnet die bildschirmfüllende Vorschau; Strg-Klick oder Esc schließt sie. Der Browser muss die Fullscreen-API unterstützen.
- **Entwürfe:** Änderungen bleiben je Stand innerhalb der geöffneten Seite erhalten. Wechseln setzt die Zeit zurück und erhält den Wiedergabezustand. „Stand wiederherstellen“ verwirft den aktuellen Entwurf und lädt seine vorbereitete Fassung. Neuladen verwirft alle Browserentwürfe; Repository-Dateien werden nicht verändert.
- **ShaderToy:** Den vollständigen Editorinhalt kopieren und in das Image-Codefeld von ShaderToy einsetzen. Ein hinterlegter ShaderToy-Link je Stand wird verwendet; andernfalls führt der Link zu einem neuen Projekt. Die Website legt keine Projekte automatisch an.

Acht Demos decken die geplanten Themen von Farbe bis fBm ab. Jede Demo beginnt vorläufig mit einem weißen START-Shader und besitzt einen ZIEL-Stand; die ersten drei Demos enthalten zusätzlich Zwischenstände. Die weitere Unterrichtsausarbeitung steht noch aus.

Ein erster Satz druckbarer Tafelbildentwürfe mit LaTeX-/PGF/TikZ-Quelle und Aufbauhinweisen liegt unter [tafelbilder/](tafelbilder/README.md).

## Neue Demo ableiten

```sh
cp -R templates/demo demos/10-meine-demo
```

In `demo.json` ID, deutsche Texte und Standliste anpassen, die vollständigen GLSL-Dateien bearbeiten und `demos/10-meine-demo/demo.json` in die Liste `demos` in `site/catalog.json` aufnehmen. Der Editor muss nicht verändert werden. Format und Schnittstelle stehen in [demos/README.md](demos/README.md).

## Statische Website bauen

```sh
npm run build
npm run preview
```

`npm run build` validiert Katalog und Quellen und erzeugt **ausschließlich die statische Website** in `dist/`. Der Befehl führt keinen Push aus. `npm run preview` stellt nur das fertige Verzeichnis unter http://127.0.0.1:8000/ bereit. `dist/` wird nicht versioniert.

Das Bundle enthält HTML, CSS, JavaScript, Demo-Metadaten und GLSL-Dateien sowie `.nojekyll`. Relative URLs funktionieren auch unter einem GitHub-Pages-Repositorypfad. Die spätere Veröffentlichung über einen separaten Push der fertigen Dateien ist in F3/I2 vorgesehen; es gibt keine GitHub-Actions-Workflows.

**Dieser Website-Build ist noch kein vollständiger Workshop-Release.** F2 ergänzt die lokale PDF-Erzeugung aus Beamer- und PGF/TikZ-Tafelbildquellen; F3 führt sie mit dem Website-Build zusammen. Lokale LaTeX-Distribution und Engine werden dort festgelegt. Der spätere Gesamtbuild muss bei fehlenden Pflichtmaterialien abbrechen.

Die Einbindung fertiger PDFs ist vorbereitet: Dateien unter `site/downloads/` ablegen und in `site/catalog.json` unter `materials` mit `title` und `file` (z. B. `downloads/folien.pdf`) registrieren. Der Website-Build verlangt für jeden Eintrag eine vorhandene PDF-Datei. Ohne Einträge erscheint ein Hinweis statt nicht funktionierender Downloadlinks. Diese Schnittstelle wird später vom Dokument-Build bedient.

## Prüfen

```sh
npm test
npm run test:browser
```

`npm test` prüft die Zeitsteuerung, Compiler-Zuordnung, Ableitung aus der Vorlage, Build-Fehler und statisches Hosting unter einem Projektpfad. Es startet einen temporären lokalen HTTP-Server.

`npm run test:browser` benötigt zusätzlich einen lokal installierten Chromium-Browser. Standardbefehl ist `chromium`; ein anderer Pfad ist über `CHROME_BIN` möglich. Der Test startet einen isolierten Headless-Browser mit Software-WebGL und temporärem Profil. Er prüft echte Pixelwerte, Entwürfe, GLSL-Fehler und Korrektur, Animation, Zwischenablage samt Fallback, mobile Ansicht, Pixeldichte, Kontextverlust und Ladefehler. Die Testwebsite liegt unter `/million-pixel-orchestra/`; die Quell-Demos werden dabei nicht verändert. Optionale Screenshots: `SCREENSHOT_DIR` setzen.

Die lokale ShaderToy-Kompatibilität wird über unveränderte Snippets im WebGL2-Adapter geprüft. Ein direkter Test in ShaderToy sowie die Prüfung von ShaderToy auf den vorgesehenen Teilnehmergeräten stehen noch aus; es wurde nichts veröffentlicht. Die iPad-Unterstützung der lokalen Website ist nachrangig.

## Repository

| Pfad | Aufgabe |
| --- | --- |
| `site/` | Website, Editor und Katalog |
| `demos/` | Shader-Snippets und Metadaten |
| `templates/demo/` | Kopiervorlage |
| `scripts/` | HTTP-Server und Website-Build mit Node-Standardbibliothek |
| `tests/` | Funktions-, Hosting- und Browserprüfungen |
| `docs/ARCHITECTURE.md` | Architektur und Erweiterungspunkte |
| `CONTEXT.md`, `ROADMAP.md` | Entscheidungen und getrennte Planung |
| `AGENTS.md` | Arbeitsanweisungen für Codex |

Rahmenwerk und Unterrichtsinhalte bleiben getrennt. Keine Git-Commits oder Veröffentlichung ohne ausdrücklichen Auftrag.
