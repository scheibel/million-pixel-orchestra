# Architektur von F1

## Statische Website ohne Laufzeitabhängigkeiten

HTML, CSS und native JavaScript-Module bilden Landingpage und Editor. Ein normales Textfeld mit synchronen Zeilennummern erhält native Texteingabe und Tastaturnavigation. Ein schweres Rendering-Framework und ein externer Editor sind für die kurzen Snippets nicht erforderlich. Es werden keine CDN-Ressourcen, Webfonts oder externen Bibliotheken geladen.

Node.js ab Version 22 mit Standardbibliothek stellt HTTP-Server und Website-Build bereit. Paketinstallation und LaTeX sind für F1 nicht erforderlich. Das Ergebnis benötigt nur einen statischen HTTP-Host; Node.js ist auf GitHub Pages nicht erforderlich.

## Datenfluss und Pfade

`site/catalog.json` registriert Demo-Manifeste und vorhandene PDF-Downloads. Ein `demo.json` enthält Texte und eine geordnete Liste vollständiger Shader-Dateien. Die Landingpage liest die Metadaten; die Demo-Seite lädt alle vorbereiteten Quellen und führt den ausgewählten Stand aus. Eine Demo wird über `editor.html?demo=<id>` adressiert.

URLs werden relativ zur Website bzw. zum Manifest aufgelöst. Dasselbe Bundle funktioniert auf `/` und `/million-pixel-orchestra/`, ohne Domainkonfiguration. Der Entwicklungsserver liefert `site/` und zusätzlich `demos/`; der Produktionshost liefert ausschließlich das fertige Bundle.

## Trennung von Shader und Vorschau

Die Bildspezifikation ist der unveränderte `mainImage`-Quelltext. Der Adapter in `site/assets/renderer.js` ergänzt intern die WebGL2-Ausführungsumgebung. Dieses Gerüst ist kein Unterrichtsinhalt und wird nicht mitkopiert.

- `fragCoord` erhält die Pixelposition, `iResolution.xy` die tatsächliche Framebuffergröße, `iResolution.z` den Wert `1.0`.
- Die Canvasgröße folgt der sichtbaren Fläche und Gerätepixeldichte, begrenzt durch WebGL-Größenlimits. Der Shader berechnet in dieser Auflösung; Koordinatenumrechnung und Seitenverhältniskorrektur bleiben im Snippet sichtbar.
- `iTime` kommt aus einer unabhängigen Uhr. Pausieren friert sie ein; Fortsetzen zählt ohne Sprung weiter. Kompilieren verändert die Uhr nicht. Standwechsel setzt sie zurück und erhält den Wiedergabezustand.
- Die Vorschau rendert bei laufender Zeit sowie nach Code- oder Größenänderungen. Auch bei Pause werden erfolgreiche Codeänderungen dargestellt.

## Kompilierung und Fehler

Nach 350 ms Eingabepause oder auf ausdrücklichen Befehl wird ein neues Programm separat kompiliert und verbunden. Erst bei Erfolg ersetzt es das bisherige Programm. Bei Fehlern bleiben Editorinhalt und letzte gültige Vorschau bestehen; ein Hinweis kennzeichnet den Unterschied.

`#line` ordnet Compiler-Zeilen dem Snippet zu. Meldungen aus dem Adapter erscheinen als Schnittstellenfehler. Die originale Compiler-Meldung bleibt einsehbar. Texte werden über `textContent` eingefügt. Ladefehler, fehlendes WebGL2 und Kontextverlust erhalten sichtbare Meldungen. Nach Kontextwiederherstellung wird der aktuelle Code erneut kompiliert.

## Entwürfe und Zwischenablage

Jeder Stand besitzt eine vorbereitete Quelle und einen separaten Entwurf im Arbeitsspeicher. Wechsel erhält Entwürfe; der Rücksetzbefehl verwirft den aktuellen Entwurf. Neuladen startet mit den versionierten Dateien. Es gibt keine dauerhafte Speicherung oder Synchronisation mit Quelldateien bzw. ShaderToy.

„Code kopieren“ übernimmt ausschließlich den vollständigen Editorinhalt. Ohne verfügbare Zwischenablage wird der Code markiert und die manuelle Kopiermöglichkeit erklärt. ShaderToy-Links werden optional je Stand hinterlegt; die Website veröffentlicht nichts.

## Website-Build und Dokument-Builds

`scripts/build.mjs` validiert Katalog, eindeutige IDs, relative Pfade und referenzierte Shaderquellen. Registrierte Materialien müssen als PDFs vorliegen. Ein temporäres Verzeichnis wird fertiggestellt, bevor der vorhandene Website-Build ersetzt wird. Kopiervorlage und Tests landen nicht im Bundle. `.nojekyll` ermöglicht die Bereitstellung ohne Jekyll-Verarbeitung.

F2 wird Dokumentquellen exportieren; F3 wird PDFs und Website im vollständigen Release-Build zusammenführen. Die jetzige Schnittstelle dafür besteht aus PDFs unter `site/downloads/` und `materials`-Einträgen im Katalog. Das endgültige Übergabeverzeichnis kann in F2/F3 angepasst werden. `npm run build` ist nur der Website-Build und führt weder LaTeX noch einen Push aus.

Veröffentlichungsbranch und Push-Ablauf werden bei der separaten Veröffentlichungsintegration festgelegt. F1 richtet kein Hosting ein; GitHub-Actions-Workflows sind nicht vorgesehen.

## Prüfung

Node-Tests prüfen Zeitverhalten, Fehlerzuordnung, Ableitung aus der Kopiervorlage sowie Build und HTTP-Zugriff unter einem Repositorypfad. Der Browser-Test startet Chromium und nutzt dessen Debugging-Protokoll ohne Testbibliothek. Er prüft mit Software-WebGL echte Pixelwerte, GLSL-Fehler samt Korrektur, Entwürfe, Animation, Zwischenablage, Pixeldichte, mobile Darstellung und Ausfälle.

Geprüft am 29. Oktober 2026 mit Node.js 24 und Chromium 156. Direkter ShaderToy-Test und Prüfung auf einem echten iPad/Safari bleiben Teil der späteren Integrations- und Unterrichtsvorbereitung.
