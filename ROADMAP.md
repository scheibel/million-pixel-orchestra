# Roadmap — Rahmenwerk, Integrationen und Inhalte

Die Planung besteht aus drei getrennten Bereichen: **Features des Rahmenwerks**, **externe Integrationen** und **Workshopinhalt**. Sie haben eigene Aufgaben und Abnahmen. Ihre Reihenfolge im Dokument ist keine gemeinsame Implementierungsfolge und kein Auftrag, alles auf einmal umzusetzen.

Lehrmaterialien und beschreibende Webseitentexte sind auf Deutsch; Quellcode darf auf Englisch sein. F1 ist implementiert. Seit 11. November 2026 sind auch Dokument-/Gesamtbuild, ShaderToy-Kopierablauf mit veröffentlichten Stand-Links und der Pages-Publish-Prozess umgesetzt. PDF-Inklusion auf der Website, tatsächliche Veröffentlichung und fachliche Fertigstellung bleiben offen.

## Aktueller Backlog — konkrete Restarbeit

- [ ] Stil der Website iterieren: Gestaltung der Landingpage und Demo-Seite abstimmen und überarbeiten.
- [ ] **Zurückgestellt:** PDFs aus den lokalen Build-Verzeichnissen in das Website-Bundle übernehmen und als Downloads verlinken.
- [ ] Live-Coding-Schritte je Demo festlegen und daraus geeignete START- und fehlende Zwischenstände erstellen; bei Noise die vorbereiteten Basisfunktionen einbinden.
- [ ] Vorhandene Folien und Tafelbilder an diese Schritte anpassen; Auftaktbeispiel auswählen und einbinden.
- [ ] Galeriebeispiele auf Funktion prüfen und Originaltitel, Urheberschaft sowie Lizenzangaben vervollständigen.
- [ ] 90-Minuten-Ablauf durchspielen und anpassen; HPI-Platzierung, LLM-Ausblick und Meerbild entscheiden. Für Demo 4 die Zeit für Smoothstep, Smootherstep und Farbwechsel bewerten.
- [ ] Nach gesondertem Übertragungsauftrag die Demo-Stände auf ShaderToy bereitstellen, echte `shadertoyUrl`-Werte eintragen und die QR-Platzhalter der Demo-Folien ersetzen.
- [ ] ShaderToy auf Teilnehmergeräten prüfen, insbesondere auf Schul-iPads.
- [ ] Nach gesondertem Veröffentlichungsauftrag das geprüfte Bundle mit dem vorhandenen Publish-Befehl pushen, Pages einmalig auf `gh-pages` / (root) einstellen und Website sowie QR-Zugänge prüfen.
- [ ] Die ältere Folien-Checkliste im Vortragsskelett mit dem inzwischen vorhandenen Materialbestand abgleichen.

Die folgenden Abschnitte dokumentieren den Stand und die Abnahmekriterien. Bereits umgesetzte Anforderungen sind keine zusätzlichen offenen Aufgaben.

## 1. Features des Rahmenwerks

### F1 — Landingpage, lokales Hosting und Shader-Vorschau

**Stand: umgesetzt und lokal geprüft (29. Oktober 2026), ShaderToy-Zugang am 11. November 2026 ergänzt.** Einstieg über `npm run dev`, reiner Website-Build über `npm run build:site`; Details in `README.md` und `docs/ARCHITECTURE.md`. Die folgenden Punkte beschreiben den umgesetzten Umfang.

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
- Der damalige Website-Build (heute `npm run build:site`) erzeugte ein statisches Bundle mit einer konstanten Farb-Demo und drei Ständen. Keine PDF-Downloads registriert, daher keine nicht funktionierenden PDF-Links.
- ShaderToy-Kompatibilität lokal über vollständige unveränderte Image-Snippets geprüft. Ein direkter Test in ShaderToy steht noch aus. Die lokale Website wird vorrangig für die Vorführung auf einem Laptop betrachtet; ihre iPad-Funktion ist nachrangig. Keine externe Veröffentlichung vorgenommen.

### F2 — Build für Folien und Tafelbilder

**Stand: umgesetzt und lokal geprüft (11. November 2026).** `npm run build:pdf` baut mit pdfLaTeX die vorhandenen Beamer- und PGF/TikZ-Quellen nach `folien/build/` und `tafelbilder/build/`. Zwei Durchläufe für die Folien, einer für die Tafelbilder. Voraussetzungen und Pakete sind in den README-Dateien dokumentiert; geprüft mit TeX Live 2022/dev (Debian).

- Fehlende Pflichtquellen, fehlendes `pdflatex` und LaTeX-Fehler werden gemeldet; vorhandene PDFs bleiben bei einem Kompilierungsfehler erhalten.
- **Prüfung:** echte Projektdokumente (17 Folien, zehn Tafelseiten) gebaut; automatisierte Tests mit kleinen Dokumenten prüfen Erfolg, Fehler und Erhaltung des vorherigen Builds. Die Demo-Vorschau bleibt ohne LaTeX nutzbar.

### F3 — Gemeinsamer Release-Build und Downloads

**Stand: Gesamtbuild umgesetzt und lokal geprüft (11. November 2026); PDF-Inklusion ausdrücklich zurückgestellt.** `npm run build` erzeugt zuerst die PDFs und anschließend die Website samt Demos. Bei einem Dokumentfehler wird kein neuer Website-Build erzeugt. `npm run build:site` ist weiterhin ohne LaTeX nutzbar.

- Aktuelle Ausgaben: statisches Bundle in `dist/`, PDFs ausschließlich in den lokalen Dokument-Build-Verzeichnissen. `site/catalog.json` enthält weiterhin keine Materialien. Build und Push bleiben getrennte Befehle.
- **Offen, zurückgestellt:** PDFs ins Bundle übernehmen, Downloadlinks aktivieren und das Bundle einschließlich Downloads unter einem Repository-Unterpfad prüfen. Dieser Schritt wird nicht durch den aktuellen Build-Auftrag umgesetzt.

### F4 — Website-Stil

**Offen:** Stil der Landingpage und der Demo-Seite iterieren. Als eigene Aufgabe im Backlog aufgenommen; noch kein Gestaltungsauftrag.

## 2. Externe Integrationen vordenken

### I1 — ShaderToy

- **Umgesetzt (11. November 2026):** expliziter Kopier-/Einfügeablauf auf der Demo-Seite mit Zwischenablage-Fallback. `shadertoyUrl` je Stand steuert den veröffentlichten Zugang auf Landingpage und Demo-Seite. Fehlende URLs werden angezeigt; es werden keine veröffentlichten Projekte vorgetäuscht. Tests prüfen Kopieren und Stand-Linkwechsel.
- Kopierbare `mainImage`-Snippets und die festgelegten ShaderToy-Eingaben als Schnittstelle berücksichtigen; keine Abhängigkeit der Lehr-Snippets vom lokalen Viewer.
- Lokale und ShaderToy-Ausführung sollen dieselbe Pixelberechnung verwenden. Kompatibilität zunächst lokal soweit möglich prüfen.
- Für die Unterrichtsvorbereitung prüfen, ob die Teilnehmenden die vorbereiteten Demos in ShaderToy auf den vorgesehenen Geräten, insbesondere Schul-iPads, aufrufen und bearbeiten können. Das betrifft ShaderToy; die lokale Website ist dafür keine Voraussetzung.
- Übertragung geprüfter START-/ZIEL-Stände und bei Bedarf zusätzlicher Zwischenstände sowie Ablage der späteren ShaderToy-Links je Stand vorsehen. Vorbereitete Links dienen dem Workshop.
- Das Anlegen oder Veröffentlichen von ShaderToy-Projekten ist ein eigener, ausdrücklich zu beauftragender Schritt.

### I2 — GitHub Pages

- Festgelegte Website-Adresse: `https://www.willyscheibel.de/million-pixel-orchestra/`. Link und QR-Code sind auf Übersichts- und Abschlussfolie eingebunden; die Veröffentlichung bleibt ein eigener Schritt.
- Statisches Gesamtergebnis ohne erforderliches Server-Backend vorsehen; keine fest kodierte Domain.
- Relative oder passend konfigurierte Pfade müssen auch unter einem Repository-Unterverzeichnis funktionieren, einschließlich Shader-Dateien und PDF-Downloads.
- **Umgesetzt (11. November 2026):** `npm run publish:pages` pusht das zuvor gebaute `dist/` nach `origin/gh-pages`; `--dry-run` prüft ohne Commit oder Push. Temporäres Git-Repository, Erhaltung der Branchhistorie, kein Force-Push und keine Änderung des Quellarbeitsbaums. Anleitung und einmalige Einstellung auf `gh-pages` / (root) in `docs/PUBLISHING.md`. Lokal gegen ein temporäres Bare-Repository geprüft: Erstveröffentlichung, Updates, Löschungen, Probelauf und unverändertes Bundle.
- Aktuell werden ausschließlich Website und Demos veröffentlicht; die PDF-Inklusion bleibt zurückgestellt. Tatsächlicher Push und einmalige GitHub-Einstellung sind noch auszuführen, sobald die Veröffentlichung beauftragt ist.
- Keine GitHub-Actions-Workflows für Build oder Deployment verwenden. GitHub Pages stellt die fertigen Dateien bereit; dort keine LaTeX-Distribution oder Projekt-Build-Werkzeuge voraussetzen.
- Build und Push getrennt halten; vorerst lokal unter einem simulierten Projektpfad prüfen.
- Die Planung der Integration und die Hostbarkeit sind kein Auftrag zur Einrichtung oder Veröffentlichung auf GitHub Pages.

## 3. Workshopinhalt

Die Inhaltsplanung und das Rahmenwerk haben getrennte Aufgaben. Lernziele, festgelegte Einschränkungen und die abgestimmte didaktische Progression aus `CONTEXT.md` bleiben Grundlage.

Das [Vortragsskelett](docs/VORTRAGSSKELETT.md) ordnet die geplanten Folien, Demos, Tafelbilder, ShaderToy-Beispiele und QR-Codes dem Ablauf zu. Es enthält die offenen Aufgaben für persönliche Vorstellung, HPI-Studium, Übersicht, Demo-Folien und Zugangslinks. Reihenfolge und Zeitplanung bleiben Arbeitsstand.

Die erste Vorstellungsfolie „Wer bin ich?“ enthält das gewünschte Porträt vom Februar 2016 als lokale Bilddatei. Der Witz zum Alter des Fotos bleibt mündlich; die Timeline behält ihre Schriftgröße und horizontale Jahresskala.

Die Inspirationsgalerie ist mit den sechs am 11. November 2026 ausgewählten ShaderToy-Demos `4df3Rn`, `XdlSDs`, `WtfGDX`, `mtyGWy`, `fstyD4` und `3sySRK` umgesetzt: zwei Zeilen, drei Spalten, je ein lokales Originalvorschaubild, ein QR-Code und ein anklickbarer Link. Bildquellen und ausstehende Prüfung der Originalseiten bzw. Live-Ausführung sind unter `folien/bilder/galerie/README.md` dokumentiert. Es wurden keine ShaderToy-Projekte angelegt oder veröffentlicht.

### Konzeptablauf pro Demo — Arbeitsstand

Die ersten drei Abläufe folgen dem Vorschlag des Nutzers. Demo 4 wurde am 11. November 2026 anhand der neuen Vorgaben konkretisiert und mit fünf Ständen umgesetzt. Die Abläufe ab Demo 5 sind Vorschläge zur gemeinsamen weiteren Planung. Vor Demo 1 stehen Pixelraster, Fragment-Shader, ShaderToy-Boilerplate und RGB.

1. **Farbe und Zeit:** Farbe → Farbe 1 → Farbe 2 → Farbe in Abhängigkeit von der Zeit. `iTime` und die Schwingung der Farbkomponenten werden hier erstmals anschaulich eingeführt.
2. **Pixelposition und Farbverlauf:** Pixelposition und Auflösung → normierte Position → Farbe in Abhängigkeit der Pixelposition → Mischung zweier Referenzfarben anhand der x-Position.
3. **Kreis und Metaballs:** Vordergrund und Hintergrund unterscheiden → Vordergrund anhand des Abstands vom Zentrum → quadrierter Abstand → mehrere Kreise → Kreise als Energiefelder → überlagerte Felder auswerten → Positionen zeitabhängig verändern. Die Zentrierung und das Seitenverhältnis werden bei der Abstandsmessung erklärt.

4. **Polynom und weiche Kante:** fünf Stände in der Reihenfolge **1 Punkt LERP → 2 Punkte LERP → 2 Punkte Smoothstep → 4 Punkte Smoothstep → 4 Punkte Smootherstep (ZIEL)**. Punkte auf einer Raute mit Ecken N/O/S/W; im Halt mit derselben Kurve wie für den Weg Schwarz → Eckfarbe → Schwarz, erst dann weiterfahren. Lokale Zuordnung: N rot, O grün, S blau, W gelb. Schritt 1 → 2 führt die Schleife mit den Stimmen 1 und 3 des Kanons ein (Indizes 0 und 2, Verzögerungen 0/3 Sekunden); Schritt 2 → 3 ändert nur die Rückgabe von `verlauf`; Schritt 3 → 4 ändert die Schleifenschrittweite von 2 auf 1 und ergänzt die Stimmen 2 und 4; Schritt 4 → ZIEL ändert nur das Polynom. Der Einsatzabstand von 1,5 Sekunden weicht von der Abschnittsdauer von 1,8 Sekunden ab. Aktuelle Zeitwahl: 1,2 Sekunden Fahrt und 0,6 Sekunden Halt. Folie und Tafelbild 6 begleiten die fünf Schritte.

Vorschlag für die Fortsetzung:

5. **Wellen und Animation:** Funktionsgraph als Pixelbild → Sinuskurve → Amplitude und Frequenz → Phase → Bewegung mit `iTime`.
6. **Taylorapproximation:** bekannte Sinuskurve → Polynom als lokale Näherung → Näherung und Referenz gemeinsam darstellen → Abweichung mit wachsendem Abstand vom Entwicklungspunkt beobachten.
7. **Value Noise:** reproduzierbare Pseudozufallswerte → Werte auf einem Gitter → lineare Interpolation → glatte Interpolation → Interpolation in zwei Dimensionen. Noise-Basisfunktionen werden vorbereitet.
8. **fBm:** vorhandenes Value Noise → größere und kleinere Strukturen durch Skalierung → gewichtete Überlagerung mehrerer Oktaven → Normalisierung → Wolkenbild.

Die konzeptionellen Schritte sind nicht sämtlich als eigene Shader-Stände vorhanden. Die weißen START-Stände außerhalb von Demo 4 sind vorläufig; dort bleiben konkrete START-/Zwischenstände und die Zeitplanung auszuarbeiten. Demo 4 besitzt bereits einen vorbereiteten Bewegungs-, Farb- und Zeichenrahmen im START.

### Bisheriger Themen- und Materialbestand der Planung

- **Pixel, Farben und Koordinaten:** `00-konstante-farbe` mit konstanten Farben und zeitabhängigem RGB; `01-pixelposition-und-normalisierung` verbindet normierte Position und Farbverlauf als Stände.
- **Formen und Felder:** `03-kreis-und-quadrierter-abstand` verbindet Kreis, statische und bewegte Metaballs als Stände; `dot` und der quadrierte Abstand bilden die Grundlage.
- **Glatte Übergänge:** `05-polynom-und-weiche-kante` mit fünf vollständigen Ständen: 1 Punkt LERP, 2 Punkte LERP, 2 Punkte Smoothstep, 4 Punkte Smoothstep und 4 Punkte Smootherstep. Weg und Farbwechsel im Halt verwenden dieselbe Kurve; ab dem zweiten Stand laufen die Punkte im Kanon.
- **Zeit und Approximation:** `06-wellen-und-animation` mit Sinus/Cosinus, Phase und `iTime`; `07-taylor-approximation` mit sichtbarem Vergleich zur Referenz.
- **Zufall, Noise, fBm:** `08-value-noise` mit Pseudozufall und vorgegebener Gitter-/Interpolationsbasis; `09-fbm` mit mehreren Noise-Oktaven und Wolken/Marmor als möglichen Ergebnissen.
- **Begleitmaterialien:** deutsche LaTeX-Beamer-Folien und Tafelbilder mit versionierten Quellen, abgestimmt auf Lernziele und mathematische Kerngedanken der Demos. Erste Entwürfe liegen unter `folien/` und `tafelbilder/`. Die persönliche Timeline ist nach den neuesten Angaben vom 11. November 2026 korrigiert: Programmieren als Hobby 2001–2007, Computerlehrgänge 2004–2006; die Kategorien Softwaresystemingenieur seit 2007, Computergrafiker seit 2009 und Forscher in der Computergrafik seit 2013 stehen direkt zwischen den zugehörigen Stationen. Die Consulting-Firma gehört zum Bereich Computergrafiker. Kleinere Beschriftungen und dünne graue Jahreslinien ersetzen die bisherige Darstellung mit Legende; Details in `folien/README.md`. Weitere persönliche Inhalte, funktionierende QR-Codes und die weitere Abstimmung stehen aus. Das Wellenmotiv bleibt offen; Demo-4-Folie und Tafelbild 6 zeigen jetzt die Raute sowie Bewegung und Farbwechsel mit denselben Polynomen.
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
| 43–46 | Smoothstep und Smootherstep für Fahrt, Halt und Farbwechsel |
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

Schema: `demos/<NN>-<name>/demo.json`, `START.glsl`, optional weitere selbsterklärend benannte Zwischenstandsdateien, `ZIEL.glsl` und eine knappe `README.md` je Demo. Die `snapshots`-Liste beschreibt Reihenfolge, Beschriftungen und Quellen; `site/catalog.json` registriert die Demos. `templates/demo/` bietet eine Kopiervorlage. Acht Demos decken die Themen von Farbe bis fBm ab. Demo 4 besitzt einen ausgearbeiteten START mit linearer Bewegung und Farbwechsel; die übrigen START-Stände sind vorläufig weiß. Die ersten vier Demos enthalten Zwischenstände. Die weitere didaktische Ausarbeitung bleibt offen.
