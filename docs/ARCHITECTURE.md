# Architektur

## Statische Website ohne Laufzeitabhängigkeiten

HTML, CSS und native JavaScript-Module bilden Landingpage und Editor. Ein normales Textfeld mit synchronen Zeilennummern erhält native Texteingabe und Tastaturnavigation. Ein schweres Rendering-Framework und ein externer Editor sind für die kurzen Snippets nicht erforderlich. Es werden keine CDN-Ressourcen, Webfonts oder externen Bibliotheken geladen.

Node.js ab Version 22 mit Standardbibliothek stellt HTTP-Server und Website-Build bereit. Paketinstallation und LaTeX sind für F1 nicht erforderlich. Das Ergebnis benötigt nur einen statischen HTTP-Host; Node.js ist auf GitHub Pages nicht erforderlich.

## Datenfluss und Pfade

`site/catalog.json` registriert Demo-Manifeste und vorhandene PDF-Downloads. Ein `demo.json` enthält Texte und eine geordnete Liste vollständiger Shader-Dateien. Die Landingpage liest die Metadaten; die Demo-Seite lädt alle vorbereiteten Quellen und führt den ausgewählten Stand aus. Eine Demo wird über `editor.html?demo=<id>` adressiert.

Der optionale Katalogeintrag `starter` registriert eine freie Shader-Vorlage außerhalb der Workshop-Reihenfolge. Die Landingpage bietet dafür „Leeren Editor öffnen“ an. Editor, Build und Bundle-Prüfung verwenden denselben Metadatenvertrag wie für die Workshop-Demos. Die Materialsektion der Landingpage bleibt bis zur Veröffentlichung von Materialien entfernt; der Datenvertrag für spätere Downloads bleibt erhalten.

URLs werden relativ zur Website bzw. zum Manifest aufgelöst. Dasselbe Bundle funktioniert auf `/` und `/million-pixel-orchestra/`, ohne Domainkonfiguration. Der Entwicklungsserver liefert `site/` und zusätzlich `demos/`; der Produktionshost liefert ausschließlich das fertige Bundle.

## Trennung von Shader und Vorschau

Die Bildspezifikation ist der unveränderte `mainImage`-Quelltext. Der Adapter in `site/assets/renderer.js` ergänzt intern die WebGL2-Ausführungsumgebung. Dieses Gerüst ist kein Unterrichtsinhalt und wird nicht mitkopiert.

- `fragCoord` erhält die Pixelposition, `iResolution.xy` die tatsächliche Framebuffergröße, `iResolution.z` den Wert `1.0`.
- Die Canvasgröße folgt der sichtbaren Fläche und Gerätepixeldichte, begrenzt durch WebGL-Größenlimits. Der Shader berechnet in dieser Auflösung; Koordinatenumrechnung und Seitenverhältniskorrektur bleiben im Snippet sichtbar.
- `iTime` kommt aus einer unabhängigen Uhr. Pausieren friert sie ein; Fortsetzen zählt ohne Sprung weiter. Kompilieren verändert die Uhr nicht. Standwechsel setzt sie zurück und erhält den Wiedergabezustand.
- Die Vorschau rendert bei laufender Zeit sowie nach Code- oder Größenänderungen. Auch bei Pause werden erfolgreiche Codeänderungen dargestellt.
- Die Fullscreen-API vergrößert den Vorschaurahmen und damit das Canvas; der bestehende Größenabgleich passt den Framebuffer auch im pausierten Zustand an. `fullscreenchange` synchronisiert die Schaltfläche, Strg-Klick und Esc verlassen den Modus. Ohne Fullscreen-Unterstützung bleibt die Vorschau regulär bedienbar. Die Steuersymbole sind direkt eingebundene SVGs mit zugänglichen Namen und benötigen keine Icon-Bibliothek.

## Kompilierung und Fehler

Nach 350 ms Eingabepause oder auf ausdrücklichen Befehl wird ein neues Programm separat kompiliert und verbunden. Erst bei Erfolg ersetzt es das bisherige Programm. Bei Fehlern bleiben Editorinhalt und letzte gültige Vorschau bestehen; ein Hinweis kennzeichnet den Unterschied.

`#line` ordnet Compiler-Zeilen dem Snippet zu. Meldungen aus dem Adapter erscheinen als Schnittstellenfehler. Die originale Compiler-Meldung bleibt einsehbar. Texte werden über `textContent` eingefügt. Ladefehler, fehlendes WebGL2 und Kontextverlust erhalten sichtbare Meldungen. Nach Kontextwiederherstellung wird der aktuelle Code erneut kompiliert.

## Entwürfe und Zwischenablage

Jeder Stand besitzt eine vorbereitete Quelle und einen separaten Entwurf im Arbeitsspeicher. Wechsel erhält Entwürfe; der Rücksetzbefehl verwirft den aktuellen Entwurf. Neuladen startet mit den versionierten Dateien. Es gibt keine dauerhafte Speicherung oder Synchronisation mit Quelldateien bzw. ShaderToy.

„Für ShaderToy kopieren“ übernimmt ausschließlich den vollständigen Editorinhalt. Ohne verfügbare Zwischenablage wird der Code markiert und die manuelle Kopiermöglichkeit erklärt. Die Demo-Seite erklärt das anschließende Einfügen in das Image-Codefeld. `shadertoyUrl` wird optional je Stand hinterlegt: Die Landingpage zeigt alle vorhandenen Links; im Editor folgt der Zugang dem ausgewählten Stand. Ohne URL wird der fehlende Veröffentlichungslink benannt und ein neues Projekt angeboten. Browseränderungen werden ausschließlich per Kopieren und Einfügen übertragen.

## Website-Build und Dokument-Builds

`scripts/build-site.mjs` validiert Katalog, eindeutige IDs, relative Pfade und referenzierte Shaderquellen. Registrierte Materialien müssen als PDFs vorliegen. Ein temporäres Verzeichnis wird fertiggestellt, bevor der vorhandene Website-Build ersetzt wird. Kopiervorlage und Tests landen nicht im Bundle. `.nojekyll` ermöglicht die Bereitstellung ohne Jekyll-Verarbeitung.

`scripts/build-documents.mjs` baut beide Dokumente mit pdfLaTeX aus dem Repository-Hauptverzeichnis in temporäre Ausgabeverzeichnisse. Die Folien benötigen zwei Durchläufe. Erst nach erfolgreicher Prüfung beider PDFs werden `folien/build/` und `tafelbilder/build/` ersetzt. Fehlende Quellen, Werkzeuge und LaTeX-Fehler brechen den Vorgang ab.

`scripts/build.mjs` orchestriert Dokument- und Website-Build mit `npm run build`. Die PDFs bleiben aktuell lokal; ihre Einbindung in `dist/` und den Materialkatalog ist zurückgestellt. `npm run build:site` und `npm run dev` benötigen kein LaTeX. Der Build führt keinen Push aus.

## GitHub-Pages-Veröffentlichung

`scripts/publish-pages.mjs` prüft das vorhandene Bundle und übernimmt ausschließlich `dist/` in ein temporäres Git-Repository. Ein vorhandener `origin/gh-pages`-Stand wird vor dem Kopieren geladen und anschließend normal fortgeschrieben. Veraltete Dateien werden entfernt, unveränderte Bundles erzeugen keinen Commit. `--dry-run` zeigt die Änderungen ohne Commit oder Push. Quellbranch und Index werden nicht geändert; auf dem Host erfolgt kein Projekt-Build. Ein konkurrierendes Update führt zur Ablehnung des normalen Pushs. Die einmalige Pages-Einstellung ist in `docs/PUBLISHING.md` beschrieben. Eigene GitHub-Actions-Workflows werden nicht angelegt.

## Prüfung

Node-Tests prüfen Zeitverhalten, Fehlerzuordnung, Ableitung aus der Kopiervorlage sowie Build und HTTP-Zugriff unter einem Repositorypfad. Der Browser-Test startet Chromium und nutzt dessen Debugging-Protokoll ohne Testbibliothek. Er prüft mit Software-WebGL echte Pixelwerte, GLSL-Fehler samt Korrektur, Entwürfe, Animation, Zwischenablage, Pixeldichte, mobile Darstellung und Ausfälle.

Geprüft am 29. Oktober 2026 mit Node.js 24 und Chromium 156. Die lokale Website ist insbesondere für die Vorführung auf einem Laptop vorgesehen; ihre iPad-Unterstützung ist nachrangig. Der direkte ShaderToy-Test und die Prüfung der Nutzung von ShaderToy auf den vorgesehenen Teilnehmergeräten bleiben Teil der Integrations- und Unterrichtsvorbereitung.
