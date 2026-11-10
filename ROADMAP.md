# Roadmap — Rahmenwerk, Integrationen und Inhalte

Die Planung besteht aus drei getrennten Bereichen: **Features des Rahmenwerks**, **externe Integrationen** und **Workshopinhalt**. Sie haben eigene Aufgaben und Abnahmen. Ihre Reihenfolge im Dokument ist keine gemeinsame Implementierungsfolge und kein Auftrag, alles auf einmal umzusetzen.

Lehrmaterialien und beschreibende Webseitentexte sind auf Deutsch; Quellcode darf auf Englisch sein. F1 ist seit 29. Oktober 2026 lokal implementiert und geprüft. F2/F3, Veröffentlichung und die fachliche Ausarbeitung der Workshopmaterialien stehen noch aus.

## 1. Features des Rahmenwerks

### F1 — Landingpage, lokales Hosting und Shader-Vorschau

**Stand: umgesetzt und lokal geprüft (29. Oktober 2026).** Einstieg über `npm run dev`, Website-Build über `npm run build`; Details in `README.md` und `docs/ARCHITECTURE.md`. Die folgenden Punkte beschreiben den umgesetzten Umfang.

- Kleine deutsche Landingpage als Einstieg zur Demo-Vorschau erstellen; den Downloadbereich für später gebaute Lehrmaterialien vorsehen. Nur vorhandene Dateien verlinken.
- Einfachen lokalen HTTP-Server mit dokumentiertem Startbefehl für Website und Vorschau bereitstellen; ohne LaTeX-Abhängigkeit für diese Nutzung.
- Einen lokalen Shader-Editor mit Live-Vorschau, Fehlerbehandlung und Animationssteuerung erstellen (Vorschau bevorzugt WebGL2; keine schweren Rendering-Frameworks). Die Schülerinnen und Schüler programmieren live in ShaderToy; die lokale Umgebung ergänzt diesen Arbeitsablauf.
- ShaderToy-typische `mainImage(out vec4 fragColor, in vec2 fragCoord)`-Snippets möglichst unverändert darstellen können.
- `fragCoord` an Pixelposition, `iResolution` an Framebuffergröße und `iTime` an Zeit binden.
- Die Codeübertragung aus den Demos zu ShaderToy muss einfach sein; das lokale Preview-Gerüst darf die Snippets nicht mit app-spezifischen APIs verunreinigen.
- Je Demo mehrere vorbereitete, vollständige GLSL-Stände unterstützen und auf der Demo-Seite per Schaltflächen auswählbar machen. Live-Demos besitzen mindestens `START` und `ZIEL`; beliebig viele zusätzliche Zwischenstände müssen möglich sein. Diese dienen als verlässliche Bezugspunkte bei Fehlern im Live-Coding.
- Metadaten über `site/catalog.json` und je Demo eine `demo.json` mit geordneter Standliste beschreiben. Der Vertrag in `demos/README.md` legt IDs, Texte, relative GLSL-Pfade und optionale ShaderToy-Links fest. Der lokale Code-Editor setzt die unten beschriebenen Bedienregeln um.
- Eine wiederverwendbare Kopiervorlage für neue Demos einschließlich ShaderToy-Snippet und benötigter Metadaten bereitstellen. Das interne WebGL-Gerüst bleibt außerhalb der kopierbaren Lehr-Snippets.
- Laufzeitfehler und GLSL-Kompilierfehler sichtbar anzeigen. Mit Fenstergrößen-/Seitenverhältniswechseln umgehen. Animationssteuerung lokal über die Bereitstellung von `iTime` umsetzen, ohne die Lehr-Snippets zu verändern.
- Als technischen Smoke-Test nur eine Demo für konstante Farbe hinzufügen; mehrere vorbereitete Farb-Stände prüfen die Auswahl per Schaltflächen. Dazu eine kurze Startanleitung und eine Anleitung zum Ableiten einer neuen Demo aus der Kopiervorlage. Dies nimmt keine Ausarbeitung der Lehr-Demos vorweg.
- Lokalen statischen Website-Build und eine klare Einbindung der späteren PDF-Builds vorbereiten. `dist/` als gemeinsames Ausgabeverzeichnis für Website, Shader und Downloads verwenden. Werkzeugwahl knapp begründen.
- Integrationsanforderungen I1 und I2 von Anfang an berücksichtigen.
- **Abnahme:** Landingpage und Editor über den lokalen Server erreichbar, ein sichtbarer Vollbildshader, Änderungen im Editor in der Live-Vorschau sichtbar, mehrere vorbereitete Stände per Schaltflächen auswählbar, klare Fehlermeldung bei einem absichtlich kaputten Shader und erfolgreiche Vorschau nach dessen Korrektur. Animationssteuerung und definierte Handhabung der ShaderToy-Uniforms prüfen. Eine weitere Demo durch Kopieren der Vorlage und Anpassen ihrer Dateien einbinden können, ohne den Editor oder Viewer zu ändern. Statischen Website-Build auch unter einem simulierten Repository-Unterpfad prüfen.

#### Umgesetzte Bedienregeln für F1

- **Editor und Kompilierung:** Quellcode mit Zeilennummern bearbeiten; nach 350 ms Eingabepause automatisch kompilieren. Zusätzlich eine Schaltfläche zum sofortigen Kompilieren und Strg/⌘+Enter anbieten.
- **Fehler:** GLSL-Meldungen den Zeilen des bearbeiteten Snippets zuordnen. Bei einem Kompilierfehler die letzte erfolgreich kompilierte Vorschau weiter anzeigen und deutlich kennzeichnen, dass sie nicht dem aktuellen Editorinhalt entspricht. Falls noch keine erfolgreiche Vorschau existiert, einen verständlichen Fehlerzustand anzeigen. Eine Korrektur aktualisiert die Vorschau wieder automatisch.
- **Animation:** Wiedergabe/Pause, Zurücksetzen auf `iTime = 0` und eine Anzeige der aktuellen Animationszeit anbieten. Während einer Pause weiterhin Codeänderungen mit eingefrorener Zeit darstellen; beim Fortsetzen ohne Zeitsprung weiterlaufen. Gewöhnliche Neukompilierung setzt die Zeit nicht zurück.
- **Vollbild und Symbole:** Die Vorschau kann über eine Schaltfläche oder Strg-Klick auf das Bild bildschirmfüllend geöffnet und über Strg-Klick oder Esc wieder geschlossen werden. Die Zeitsteuerung verwendet lokal eingebundene SVG-Symbole mit zugänglichen Beschriftungen. Wenn die Fullscreen-API nicht verfügbar ist, bleibt die normale Vorschau nutzbar.
- **Vorbereitete Stände und eigene Änderungen:** Zuerst `START` laden. Beim Wechsel Editor und Vorschau auf den gewählten Stand umschalten und die Zeit auf null setzen; Wiedergabe-/Pausenzustand beibehalten. Eigene Änderungen je Stand innerhalb der geöffneten Seite als Entwurf erhalten und bei der Rückkehr wiederherstellen; veränderte Stände kennzeichnen. Ein eigener Rücksetzbefehl stellt die vorbereitete Fassung wieder her. Die versionierten GLSL-Dateien werden durch Browseränderungen nicht überschrieben. Dauerhafte Entwurfsspeicherung über Neuladen hinweg ist für F1 zunächst nicht vorgesehen.
- **Codeübernahme:** Den vollständigen aktuellen Editorinhalt über eine Kopierschaltfläche nach ShaderToy übernehmen können.

#### Prüfergebnis F1

- `npm test`: Zeitverhalten, Compiler-Zeilen, Einbindung einer kopierten Demo-Vorlage ohne Viewer-Änderung, Build-Validierung, Link-Erreichbarkeit und HTTP-Hosting unter einem simulierten Repositorypfad geprüft.
- `npm run test:browser`: mit Chromium 156 und Software-WebGL2 unter `/million-pixel-orchestra/` echte Farbwerte, alle Beispielstände, Live-Änderungen, Fehler samt Korrektur, Entwürfe, Pause/Zeitreset, Zwischenablage einschließlich Fallback, Größenwechsel und Gerätepixeldichte geprüft. Mobile Ansicht visuell kontrolliert; Kontextverlust, fehlende Quellen und fehlendes WebGL2 geprüft.
- `npm run build`: statisches Bundle mit einer konstanten Farb-Demo und drei Ständen erzeugt. Keine PDF-Downloads registriert, daher keine nicht funktionierenden PDF-Links.
- ShaderToy-Kompatibilität lokal über vollständige unveränderte Image-Snippets geprüft. Ein direkter Test in ShaderToy steht noch aus. Die lokale Website wird vorrangig für die Vorführung auf einem Laptop betrachtet; ihre iPad-Funktion ist nachrangig. Keine externe Veröffentlichung vorgenommen.

### F2 — Build für Folien und Tafelbilder

- Automatisierten lokalen PDF-Build für LaTeX-Beamer-Quellen bereitstellen. Auf dem Entwicklergerät wird eine passende LaTeX-Distribution einschließlich benötigter Pakete vorausgesetzt; Distribution, Engine und Paketbedarf bei der Umsetzung dokumentieren.
- Tafelbilder aus bearbeitbaren LaTeX-Quellen mit PGF/TikZ automatisiert als druckbare PDFs erzeugen.
- Build-Werkzeuge, Voraussetzungen und Aufruf dokumentieren. Die reine Website-/Demo-Vorschau bleibt ohne LaTeX nutzbar.
- **Abnahme:** PDF-Erzeugung mit minimalen technischen Beispielen prüfen; diese sind keine fertigen Lehrmaterialien. Fehlende Werkzeuge und fehlgeschlagene Dokument-Builds verständlich melden.

### F3 — Gemeinsamer Release-Build und Downloads

- Auf F1 und F2 aufbauen: Ein dokumentierter Gesamtbefehl baut auf dem Entwicklergerät Website und Demos sowie Folien- und Tafelbild-PDFs aus den versionierten Quellen und bündelt alles in `dist/`. Für den vollständigen Release-Build wird die passende lokale LaTeX-Distribution vorausgesetzt.
- `dist/` enthält das fertig gebaute, statisch hostbare Bundle. Der Build führt keinen Push aus; die Veröffentlichung ist ein separater Schritt. Keine GitHub-Actions-Workflows für Build oder Deployment einführen.
- Die erzeugten PDFs auf der Landingpage zum Download verlinken. Fehlende Pflichtquellen, Build-Werkzeuge oder fehlgeschlagene Dokument-Builds müssen den vollständigen Release-Build mit verständlicher Meldung abbrechen; keine stillschweigend unvollständigen Releases.
- Die Pipeline unabhängig von der fachlichen Ausarbeitung der Lehrmaterialien entwickeln. Technische Beispieldokumente erlauben die Prüfung des Rahmenwerks; die vollständigen Workshopmaterialien werden zusätzlich geprüft, sobald sie vorliegen.
- **Abnahme:** vollständigen lokalen Build aus einem sauberen Checkout mit dokumentierten Voraussetzungen ausführen; ausschließlich `dist/` per lokalem HTTP-Server unter einem simulierten GitHub-Pages-Projektpfad bereitstellen. Demos und Downloads müssen erreichbar, PDFs lesbar und alle internen Links gültig sein; die Bereitstellung der fertigen Dateien benötigt keine LaTeX-Distribution oder Projekt-Build-Werkzeuge.

## 2. Externe Integrationen vordenken

### I1 — ShaderToy

- Kopierbare `mainImage`-Snippets und die festgelegten ShaderToy-Eingaben als Schnittstelle berücksichtigen; keine Abhängigkeit der Lehr-Snippets vom lokalen Viewer.
- Lokale und ShaderToy-Ausführung sollen dieselbe Pixelberechnung verwenden. Kompatibilität zunächst lokal soweit möglich prüfen.
- Für die Unterrichtsvorbereitung prüfen, ob die Teilnehmenden die vorbereiteten Demos in ShaderToy auf den vorgesehenen Geräten, insbesondere Schul-iPads, aufrufen und bearbeiten können. Das betrifft ShaderToy; die lokale Website ist dafür keine Voraussetzung.
- Übertragung geprüfter START-/ZIEL-Stände und bei Bedarf zusätzlicher Zwischenstände sowie Ablage der späteren ShaderToy-Links je Stand vorsehen. Vorbereitete Links dienen dem Workshop.
- Das Anlegen oder Veröffentlichen von ShaderToy-Projekten ist ein eigener, ausdrücklich zu beauftragender Schritt.

### I2 — GitHub Pages

- Statisches Gesamtergebnis ohne erforderliches Server-Backend vorsehen; keine fest kodierte Domain.
- Relative oder passend konfigurierte Pfade müssen auch unter einem Repository-Unterverzeichnis funktionieren, einschließlich Shader-Dateien und PDF-Downloads.
- Festgelegter Veröffentlichungsweg: Website samt PDFs vollständig auf dem Entwicklergerät nach `dist/` bauen, lokal prüfen und anschließend das fertige Bundle in die GitHub-Pages-Veröffentlichungsquelle pushen. Veröffentlichungsbranch und konkreten Push-Ablauf bei der Umsetzung dokumentieren.
- Keine GitHub-Actions-Workflows für Build oder Deployment verwenden. GitHub Pages stellt die fertigen Dateien bereit; dort keine LaTeX-Distribution oder Projekt-Build-Werkzeuge voraussetzen.
- Build und Push getrennt halten; vorerst lokal unter einem simulierten Projektpfad prüfen.
- Die Planung der Integration und die Hostbarkeit sind kein Auftrag zur Einrichtung oder Veröffentlichung auf GitHub Pages.

## 3. Workshopinhalt — hierarchische Ausarbeitung später

Eine eigene hierarchische Inhaltsplanung wird später erarbeitet. Die folgenden Punkte bewahren den bisherigen fachlichen Planungsstand; sie sind keine Implementierungsphasen des Rahmenwerks. Lernziele, festgelegte Einschränkungen und die abgestimmte didaktische Progression aus `CONTEXT.md` bleiben Grundlage.

### Bisheriger Themen- und Materialbestand der Planung

- **Pixel, Farben und Koordinaten:** `00-konstante-farbe` mit konstanten Farben und zeitabhängigem RGB; `01-pixelposition-und-normalisierung` verbindet normierte Position und Farbverlauf als Stände.
- **Formen und Felder:** `03-kreis-und-quadrierter-abstand` verbindet Kreis, statische und bewegte Metaballs als Stände; `dot` und der quadrierte Abstand bilden die Grundlage.
- **Glatte Übergänge:** `05-polynom-und-weiche-kante` mit Herleitung von `3t²-2t³` und Anwendung auf weiche Übergänge.
- **Zeit und Approximation:** `06-wellen-und-animation` mit Sinus/Cosinus, Phase und `iTime`; `07-taylor-approximation` mit sichtbarem Vergleich zur Referenz.
- **Zufall, Noise, fBm:** `08-value-noise` mit Pseudozufall und vorgegebener Gitter-/Interpolationsbasis; `09-fbm` mit mehreren Noise-Oktaven und Wolken/Marmor als möglichen Ergebnissen.
- **Begleitmaterialien:** deutsche LaTeX-Beamer-Folien und Tafelbilder mit versionierten Quellen, abgestimmt auf Lernziele und mathematische Kerngedanken der Demos.
- **Unterrichtsvorbereitung:** separate START-/ZIEL-Stände lokal prüfen, Links und Handout-Referenzen ordnen, Tastatureingaben/Sonderzeichen minimieren; Galerie-Beispiele auswählen und externe Werke mit Quellen zuordnen.

### Provisorische Ablaufskizze (aus letztem Planungsstand, noch nicht final beschlossen)

| Minute | Aktivität |
|---|---|
| 00–02 | Auftakt/Showcase |
| 02–04 | HPI-Einordnung |
| 04–10 | Pixelraster, Fragment-Shader, RGB, Boilerplate |
| 10–12 | Konstante Farbe und erster zeitabhängiger Farbwechsel |
| 12–15 | Normalisierung der Koordinaten |
| 15–18 | Farbverlauf |
| 18–20 | Übergang/Puffer |
| 20–24 | Kreis: Abstand, quadrierter Abstand, `dot` |
| 24–28 | Kreis live entwickeln |
| 28–32 | Metaballs-Prinzip |
| 32–35 | Metaballs umsetzen und Bewegung zeigen |
| 35–37 | Übergang/Puffer |
| 37–43 | Glattes Interpolationspolynom `3t²-2t³` |
| 43–46 | Weiche Kanten im Shader |
| 46–50 | Sinus, Phase, Zeit |
| 50–55 | Animierte Wellen |
| 55–60 | Taylorapproximation erklären |
| 60–64 | Approximation visualisieren |
| 64–66 | Übergang/Puffer |
| 66–70 | Pseudozufall, Gitterwerte, Interpolation und fBm |
| 70–76 | Value Noise → fBm → Wolken/Marmor |
| 76–81 | Galerie: Matrizen/Rotation, Ray Marching, stochastische Effekte |
| 81–84 | HPI/Studium |
| 84–86 | Rückblick, Handout, ShaderToy-Links |
| 86–90 | Puffer/Fragen/Showcase |

Offen: Den früher eingeplanten 5-Minuten-LLM-Ausblick mit dieser Ablaufskizze abgleichen. Insbesondere die Zeit für die frühe Einführung von `iTime` und Sinus sowie die bewegten Metaballs ist neu zu bewerten. Zeitbudgets sind Summen mehrerer Theorie- und Coding-Teilblöcke und dürfen bei späteren Anpassungen anders aufgeteilt werden.

### Umgesetzte technische Konvention für Demos

Schema: `demos/<NN>-<name>/demo.json`, `START.glsl`, optional weitere selbsterklärend benannte Zwischenstandsdateien, `ZIEL.glsl` und eine knappe `README.md` je Demo. Die `snapshots`-Liste beschreibt Reihenfolge, Beschriftungen und Quellen; `site/catalog.json` registriert die Demos. `templates/demo/` bietet eine Kopiervorlage. Acht Demos decken die Themen von Farbe bis fBm ab und besitzen vorläufige weiße START-Stände. Die zusammengefassten Demos enthalten Zwischenstände. Die weitere didaktische Ausarbeitung bleibt offen.
