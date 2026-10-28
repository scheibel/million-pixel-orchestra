# Roadmap — Rahmenwerk, Integrationen und Inhalte

Die Planung besteht aus drei getrennten Bereichen: **Features des Rahmenwerks**, **externe Integrationen** und **Workshopinhalt**. Sie haben eigene Aufgaben und Abnahmen. Ihre Reihenfolge im Dokument ist keine gemeinsame Implementierungsfolge und kein Auftrag, alles auf einmal umzusetzen.

Lehrmaterialien und beschreibende Webseitentexte sind auf Deutsch; Quellcode darf auf Englisch sein. Der aktuelle Stand ist Planung; die technische Umsetzung steht noch aus.

## 1. Features des Rahmenwerks

### F1 — Landingpage, lokales Hosting und Shader-Vorschau

- Kleine deutsche Landingpage als Einstieg zur Demo-Vorschau erstellen; den Downloadbereich für später gebaute Lehrmaterialien vorsehen. Nur vorhandene Dateien verlinken.
- Einfachen lokalen HTTP-Server mit dokumentiertem Startbefehl für Website und Vorschau bereitstellen; ohne LaTeX-Abhängigkeit für diese Nutzung.
- Minimalen lokalen Shader-Viewer erstellen (bevorzugt WebGL2; keine schweren Frameworks).
- ShaderToy-typische `mainImage(out vec4 fragColor, in vec2 fragCoord)`-Snippets möglichst unverändert darstellen können.
- `fragCoord` an Pixelposition, `iResolution` an Framebuffergröße und `iTime` an Zeit binden.
- Die Codeübertragung aus den Demos zu ShaderToy muss einfach sein; das lokale Preview-Gerüst darf die Snippets nicht mit app-spezifischen APIs verunreinigen.
- Laufzeitfehler und GLSL-Kompilierfehler sichtbar anzeigen. Mit Fenstergrößen-/Seitenverhältniswechseln umgehen.
- Als technischen Smoke-Test nur einen Shader für konstante Farbe hinzufügen. Dazu eine kurze Startanleitung. Dies nimmt keine Ausarbeitung der Lehr-Demos vorweg.
- Lokalen statischen Website-Build und eine klare Einbindung der späteren PDF-Builds vorbereiten. `dist/` als gemeinsames Ausgabeverzeichnis für Website, Shader und Downloads verwenden. Werkzeugwahl knapp begründen.
- Integrationsanforderungen I1 und I2 von Anfang an berücksichtigen.
- **Abnahme:** Landingpage und Viewer über den lokalen Server erreichbar, ein sichtbarer Vollbildshader, klare Fehlermeldung bei einem absichtlich kaputten Shader, definierte Handhabung der ShaderToy-Uniforms. Statischen Website-Build auch unter einem simulierten Repository-Unterpfad prüfen.

### F2 — Build für Folien und Tafelbilder

- Automatisierten lokalen PDF-Build für LaTeX-Beamer-Quellen bereitstellen. Auf dem Entwicklergerät wird eine passende LaTeX-Distribution einschließlich benötigter Pakete vorausgesetzt; Distribution, Engine und Paketbedarf bei der Umsetzung dokumentieren.
- Für Tafelbilder vor der Implementierung ein bearbeitbares Quellformat mit automatisierbarem PDF-Export festlegen und den Export integrieren.
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
- Übertragung geprüfter START-/ZIEL-Stände und Ablage der späteren ShaderToy-Links vorsehen. Vorbereitete Links dienen dem Workshop.
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

- **Pixel, Farben und Koordinaten:** `00-konstante-farbe`, `01-pixelposition-und-normalisierung`, `02-farbverlauf`.
- **Formen und Felder:** `03-kreis-und-quadrierter-abstand` mit `dot`, quadriertem euklidischem Abstand und hartem Kreisrand; `04-metaballs` mit mehreren Kreisfeldern und ihrer Kombination.
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
| 10–12 | Konstante Farbe |
| 12–15 | Normalisierung der Koordinaten |
| 15–18 | Farbverlauf |
| 18–20 | Übergang/Puffer |
| 20–24 | Kreis: Abstand, quadrierter Abstand, `dot` |
| 24–28 | Kreis live entwickeln |
| 28–32 | Metaballs-Prinzip |
| 32–35 | Metaballs umsetzen |
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

Offen: Den früher eingeplanten 5-Minuten-LLM-Ausblick mit dieser Ablaufskizze abgleichen. Zeitbudgets sind Summen mehrerer Theorie- und Coding-Teilblöcke und dürfen bei späteren Anpassungen anders aufgeteilt werden.

### Bisher vorgeschlagene Umsetzungskonvention für Demos
Empfohlenes Schema: `demos/<NN>-<name>/START.glsl` und `demos/<NN>-<name>/ZIEL.glsl` sowie eine knappe `README.md` je Demo (Lernziel, Mathematik, sichtbarer Unterschied). Die konkreten Demo-Dateien sind noch zu implementieren.
