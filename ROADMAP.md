# Roadmap — Rahmenwerk, Integrationen und Inhalte

Die Planung besteht aus drei getrennten Bereichen: **Features des Rahmenwerks**, **externe Integrationen** und **Workshopinhalt**. Sie haben eigene Aufgaben und Abnahmen. Ihre Reihenfolge im Dokument ist keine gemeinsame Implementierungsfolge und kein Auftrag, alles auf einmal umzusetzen.

Lehrmaterialien und beschreibende Webseitentexte sind auf Deutsch; Quellcode darf auf Englisch sein. F1, Dokument-/Gesamtbuild, ShaderToy-Kopierablauf mit optionalen veröffentlichten Stand-Links und der Pages-Publish-Prozess sind umgesetzt. Die öffentliche Website ist erreichbar geprüft. PDF-Inklusion auf der Website sowie die folgenden Anpassungen der Lehrmaterialien bleiben offen.

## Artefakte für morgen — Anforderungen und Stand

Verbindliche Anforderungen stehen in `CONTEXT.md`. Zwei Website-Rollen können mit derselben Anwendung erfüllt werden; ihr Unterschied liegt in der Bereitstellung.

| Nr. | Artefakt und Abnahme | Aktueller Stand / verbleibende Arbeit |
| --- | --- | --- |
| 1 | Teilnehmer-Website: öffentlich erreichbar, vorbereitete Demos direkt bearbeiten und ausführen; Adresse und QR-Zugang vorhanden. | Öffentliche Startseite und Katalog erreichbar geprüft; Editor und Stände vorhanden. Nutzung auf tatsächlichen Teilnehmergeräten, insbesondere Schul-iPads, noch prüfen. Ein lokales Bundle allein genügt nicht. |
| 2 | Vortragenden-Website: lokal gebaut und über lokalen HTTP-Server nutzbar, Präsentation und Live-Coding einschließlich Standwahl und Vollbild. | Vorhanden und lokal geprüft. Finalen Ablauf am Vortragsgerät mit Browser-/PDF-Wechsel und lesbarer Projektion erproben. Öffentliche Veröffentlichung ist hierfür kein Abnahmekriterium. |
| 3 | Statische Folien: allgemeine Informationen und Konzepte, Website-Zugang und vollständige Tafelbild-Endstände; kein Code-Journal. | 17 Hauptfolien und acht verlinkte Tafelbild-Anhangseiten. Folien 6–13 mit Konzepten, Mathematik und Experimenten überarbeitet; sechs Demo-Zugänge führen zur eigenen Website. Codevergleiche bleiben im separaten Journal. |
| 4 | Gedruckte Tafelbilder: lesbare A4-Vorlagen zum Live-Anzeichnen, passend zu Demos und projizierten Endständen. | Acht Tafelseiten als LaTeX-/TikZ-Quellen und Druck-PDF vorhanden. Endstände in den Folien abgleichen; Ausdruck und Druckkontrolle noch bestätigen. |
| 5 | Gedrucktes Code-Journal: eigenständiges Druck-PDF mit START-Code, Änderungsfolge und nötigem Basiscode zum Abtippen. | Eigenständiges A4-Druck-PDF mit den bisherigen 19 Codevergleichen vorhanden und im Dokument-Build enthalten. Vollständige START- und nötige Basisblöcke für die Abtippvorlage noch ergänzen bzw. prüfen; Ausdruck und Druckkontrolle noch bestätigen. |

Zusätzliche Vorschläge wie Ablaufzettel und lokale Sicherheitskopie sind Empfehlungen, keine neu vereinbarten Pflichtartefakte. Anforderungen festzuhalten ist noch keine Umsetzung der offenen Dokumentänderungen.

## Aktueller Backlog — konkrete Restarbeit

**Entscheidung für den Workshop am 12. November 2026:** Die Teilnehmenden öffnen zu Beginn die öffentliche Projektwebsite und arbeiten direkt im eigenen Live-Editor mit den vorbereiteten Ständen. ShaderToy wird als optionale Plattform erwähnt; eigene ShaderToy-Projekte, veröffentlichte Stand-Links und deren Geräteprüfung sind keine Pflichtaufgaben für morgen. Die öffentliche Startseite und der Katalog wurden am 11. November 2026 erreichbar geprüft. Die frühere Planung mit ShaderToy als Teilnehmerumgebung ist ersetzt; ältere Abnahmeberichte dokumentieren den damaligen Stand.

- [ ] Stil der Website weiter iterieren: Landingpage in der ersten Iteration vereinfacht und freien Editor-Einstieg ergänzt; weitere Gestaltung der Landingpage und Demo-Seite abstimmen.
- [ ] **Zurückgestellt:** GLSL-Syntax-Highlighting im Live-Editor ergänzen. Als mögliche Umsetzung wurde eine farbige Darstellung unter dem bestehenden Textfeld besprochen; die technische Umsetzung ist noch nicht festgelegt.
- [ ] **Zurückgestellt:** PDFs aus den lokalen Build-Verzeichnissen in das Website-Bundle übernehmen und als Downloads verlinken.
- [ ] Live-Coding-Schritte insbesondere für Demo 1–3 konkretisieren und geeignete START-/Zwischenstände ausarbeiten; bei Demo 4–6 den vorbereiteten Rahmen erklären und die vorhandenen Stände didaktisch erproben. Noise-Basisfunktionen sind eingebunden.
- [x] Die 19 Codevergleiche aus den Vortragsfolien herauslösen und als eigenständiges A4-Code-Journal bauen.
- [ ] START-Code und benötigte Basisblöcke im Journal zum Abtippen vollständig verfügbar machen; die bisher übernommenen Auszüge detailliert prüfen.
- [x] Die acht vollständigen Tafelbild-Endstände als verlinkte Projektionsalternativen in den statischen Foliensatz aufnehmen; dieselben PDF-Seiten wie in der Druckfassung verwenden.
- [x] Code-Journal als separates PDF in `npm run build:pdf` und den Gesamtbuild aufnehmen; vorhandenen Schutz bei LaTeX-Fehlern und Erhaltung der PDF-/Verzeichnis-Inodes auf alle Dokumente anwenden.
- [ ] Tafelbilder und Code-Journal ausdrucken und Lesbarkeit kontrollieren; Folien/Website und Medienwechsel im Probelauf prüfen. Auftaktbeispiel auswählen und einbinden.
- [ ] Galeriebeispiele auf Funktion prüfen und Originaltitel, Urheberschaft sowie Lizenzangaben vervollständigen.
- [ ] 90-Minuten-Ablauf durchspielen und anpassen; LLM-Ausblick entscheiden; Zeit für die sechs Demos neu verteilen. Für Demo 4 die Zeit für Smoothstep, Smootherstep und Farbwechsel bewerten; beim Probelauf den vorbereiteten Rahmen und die Sichtbarkeit des Smootherstep-Vergleichs prüfen. Reviewhinweise stehen in der Demo-README.
- [x] Demo-Zugänge in den Folien auf die Projektwebsite abstimmen; sechs anklickbare Editor-Zugänge mit START-Arbeitsauftrag ersetzen die ShaderToy-QR-Platzhalter.
- [ ] **Optional, nach dem Workshop:** Nach gesondertem Übertragungsauftrag die Demo-Stände auf ShaderToy bereitstellen und echte `shadertoyUrl`-Werte eintragen.
- [ ] Die öffentliche Projektwebsite samt Editor auf Teilnehmergeräten prüfen, insbesondere auf Schul-iPads: Aufrufen, Demo und Stand wählen, Code ändern und kompilieren.
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

### F2 — Build für Folien, Tafelbilder und Code-Journal

**Erweiterung umgesetzt:** Der Dokument- und Gesamtbuild erzeugt drei getrennte PDFs: Vortrag zum Präsentieren sowie Tafelbilder und Code-Journal zum Drucken. Das Journal liegt unter `code-journal/build/journal.pdf` (A4 hoch, 19 Seiten); der Vortrag enthält nach dem Herauslösen 16 Folien, die Tafelbilder weiterhin acht Seiten. Die Einbindung der Tafelbild-Endstände in den Vortrag ist noch offen. PDF-Veröffentlichung bleibt zurückgestellt.

**Stand: umgesetzt und lokal geprüft (11. November 2026).** `npm run build:pdf` baut mit pdfLaTeX die vorhandenen Beamer-, PGF/TikZ- und Journal-Quellen nach `folien/build/`, `tafelbilder/build/` und `code-journal/build/`. Zwei Durchläufe für die Folien, je einer für Tafelbilder und Journal. Voraussetzungen und Pakete sind in den README-Dateien dokumentiert; geprüft mit TeX Live 2022/dev (Debian).

- Fehlende Pflichtquellen, fehlendes `pdflatex` und LaTeX-Fehler werden gemeldet; vorhandene PDFs bleiben bei einem Kompilierungsfehler erhalten.
- **Rebuilds:** Nach erfolgreicher temporärer Kompilierung aller drei Dokumente werden die Dateien in den bestehenden Build-Verzeichnissen überschrieben. Die Verzeichnisse und PDF-Dateien behalten ihre Inodes; die automatisierte Prüfung kontrolliert dies zusammen mit tatsächlich geändertem PDF-Inhalt.
- **Prüfung:** echte Projektdokumente (aktuell 16 Folien, acht Tafelseiten, 19 Journal-Seiten) gebaut; automatisierte Tests mit kleinen Dokumenten prüfen Erfolg, Fehler und Erhaltung des vorherigen Builds. Die Demo-Vorschau bleibt ohne LaTeX nutzbar.

### F3 — Gemeinsamer Release-Build und Downloads

**Stand: Gesamtbuild umgesetzt und lokal geprüft (11. November 2026); PDF-Inklusion ausdrücklich zurückgestellt.** `npm run build` erzeugt zuerst die PDFs und anschließend die Website samt Demos. Bei einem Dokumentfehler wird kein neuer Website-Build erzeugt. `npm run build:site` ist weiterhin ohne LaTeX nutzbar.

- Aktuelle Ausgaben: statisches Bundle in `dist/`, PDFs ausschließlich in den lokalen Dokument-Build-Verzeichnissen. `site/catalog.json` enthält weiterhin keine Materialien. Build und Push bleiben getrennte Befehle.
- **Offen, zurückgestellt:** PDFs ins Bundle übernehmen, Downloadlinks aktivieren und das Bundle einschließlich Downloads unter einem Repository-Unterpfad prüfen. Dieser Schritt wird nicht durch den aktuellen Build-Auftrag umgesetzt.

### F4 — Website-Stil

Der Header von Landingpage und Editor verlinkt das Quellrepository unter `https://github.com/scheibel/million-pixel-orchestra`.

**Ergänzung:** Der Footer ist auf Landingpage und Editor-Seite entfernt. Im Einstieg der Landingpage entfallen außerdem der Button „Demos entdecken“ und der darunterstehende ShaderToy-Begleittext.

**Erste Iteration umgesetzt (11. November 2026):** Header auf „Million Pixel Orchestra“ reduziert, Themenzeile entfernt und Überschrift auf „Millionen Pixel. Eine Berechnungsvorschrift.“ geändert. Das Pixelbild erläutert Berechnungsvorschrift `f`, Pixelposition `x/y` und Zeit `t`. „Vorbereitete Demos“ ersetzt die bisherigen Einleitungstexte; die Karten zeigen keine Standanzahl und keinen Vorschauhinweis mehr. Arbeitsorte-Block und Materialsektion sind entfernt; Materialien kehren erst mit ihrer Veröffentlichung zurück.

„Leeren Editor öffnen“ führt separat von der Workshop-Reihenfolge zu einer weißen, lauffähigen Shader-Vorlage. Der optionale Katalogeintrag `starter` bindet sie in Laden, Website-Build und Bundle-Prüfung ein. Der Shader ist ein vollständiges `mainImage`-Snippet und verwendet keine zusätzlichen Eingaben. Weitere Gestaltungsiterationen bleiben offen; Syntax-Highlighting bleibt zurückgestellt.

**Prüfung:** Website-Build und zehn Node-Tests erfolgreich, einschließlich der Vorlage unter einem Repository-Unterpfad und der Prüfung auf fehlende Vorlagendateien im Bundle. Landingpage mit Firefox 159 bei 320, 375, 768 und 1440 Pixel Breite visuell geprüft; kein horizontales Überlaufen. Die freie Vorlage kompiliert in WebGL2, Bearbeiten und Wiederherstellen funktionieren. Die Chromium-Browserprüfung ist um diesen Ablauf ergänzt, konnte hier mangels Chromium jedoch nicht ausgeführt werden.

## 2. Externe Integrationen vordenken

### I1 — ShaderToy

**Aktuelle Rolle:** optionale Weiterverwendung und Inspirationsgalerie. Die eigene Website übernimmt das Live-Coding der Teilnehmenden; die folgenden ShaderToy-Übertragungsaufgaben sind keine Voraussetzung für den Workshop.

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

**Lernweg umgesetzt (12. November 2026):** Folien 6–13 sind in `folien/lernweg.tex` neu ausgearbeitet: Pixelmodell und Vorlage, RGB/Sinus, Normalisierung/Mischung, Abstand/Felder, Interpolationspolynome, Pixelzufall/Value Noise/vorbereitetes Simplex und fBm/Wolken/Drift. Jede Demo besitzt einen Link zum eigenen Editor mit START-Arbeitsauftrag und ein kleines Experiment. Die sechs ShaderToy-QR-Platzhalter entfallen; ShaderToy wird als optionale kompatible Umgebung erwähnt. Vier echte Zwischenbilder ergänzen die bestehenden Zielbilder. Vorbereiteter Code wird von der gemeinsamen Änderung unterschieden.

Die acht vollständigen Druck-Tafelbilder folgen als verlinkter Anhang mit Rücksprunglinks. Der Vortrag hat 17 Hauptfolien und acht Anhangseiten; die abgenommenen Seiten 1–5 und 14–17 bleiben erhalten. Der PDF-Build erzeugt die Tafeln vor dem Vortrag und bindet die frisch gebaute PDF ein. Code-Journal-Vervollständigung, Geräteprüfung und Probelauf bleiben eigenständige offene Aufgaben.


**Prüfung des Lernwegs:** Dokument-Build erfolgreich; keine Überstände auf Folien 6–13. Alle acht Konzeptfolien visuell geprüft. Sechs Editor-URLs und alle PDF-Sprungziele geprüft; die acht eingebundenen PDF-Formulare enthalten die unveränderten Druckseiten. Bildvergleich bestätigt unveränderte Seiten 1–5 und 14–17. Die Build-/Publish-Prüfung besteht einschließlich eines Erstbuilds mit eingebundener frischer Tafel-PDF sowie Fehler- und Inode-Erhaltung.

**Testvariante der Titelfolie:** Die vom Nutzer bereitgestellte Aufnahme `folien/bilder/galerie/mtyGWy-titel.png` ersetzt das bisherige Galerie-Vorschaubild als Vollbild-Hintergrund und verlinkt die zugehörige ShaderToy-Seite. Titel und Name sind weiß, die Veranstaltungszeile leicht abgetönt weiß. Das Uni-Potsdam-Logo verwendet eine weiße Vektorvariante; das HPI-Logo behält seine Originalfarben. Die Anpassungen sind auf die Titelfolie begrenzt. Die vorhandene Bildquellendokumentation gilt auch für diese Verwendung.

Die Schrift auf der Titelfolie erhält mit `pdfrender` eine schwarze Kontur: 0,4 pt für den Titel, 0,3 pt für den Namen und 0,2 pt für die kleinere Veranstaltungszeile. Die Logos werden nicht konturiert.

**Anordnung der Titelfolie:** Logos oben rechts, vollständiger Titel oben links in einer Zeile, Sprechername links darunter und Veranstaltungsangaben unten rechts. TikZ verankert die Inhalte direkt an den Folienrändern. Der Titel passt mit rund 141,5 mm Breite in die 148 mm breite Textfläche, ohne die bisherige Schriftgröße zu verkleinern.

**Demo-Übersicht aktualisiert (11. November 2026):** Folie 5 umfasst alle sechs aktuellen Demos in zwei Reihen mit je drei ZIEL-Vorschaubildern, einschließlich Simplex Noise und animierter fBm-Wolken. Die Bilder werden mit dem optionalen Werkzeug `scripts/render-demo-previews.py` aus den unveränderten Ziel-Snippets bei festen Zeiten gerendert und unter `folien/bilder/demo-ziele/` versioniert. Quellprüfsummen und Renderdaten sind dort dokumentiert; der PDF-Build bleibt unabhängig vom Renderwerkzeug. Website-Adresse, QR-Code und Hinweis zum Mitprogrammieren bleiben auf der Übersicht erhalten.

**Präzisierung zu Demo 1:** Auf der Übersicht ersetzt eine RGB-Füllanzeige die einfarbige Vorschau. Drei Balken zeigen die Farbkomponenten des ZIEL-Shaders bei `iTime = 0`; Pfeile deuten steigende bzw. fallende Anteile an. Die Grafik ist als bearbeitbares TikZ direkt in der Folienquelle angelegt.

**Teaser auf der Übersicht:** Demo 5 heißt „Mit Rauschen gestalten“ mit „Chaos, aber unter Kontrolle“; Demo 6 heißt „Wolken aus Rauschen“ mit „Natürliche Strukturen mit Rauschen modellieren“. Fachbegriffe wie Noise, Simplex Noise und fBm werden dort noch nicht vorweggenommen.

**3D-Ausblick ergänzt (11. November 2026):** Direkt nach „Was ist noch möglich?“ steht „Von Pixeln zu 3D-Welten“ mit den beiden bereitgestellten Screenshots und anklickbaren Links zu `https://webgl-operate.org` und `https://hpicgs.github.io/cg1-playground`. Der Ausblick motiviert zum Weiterexperimentieren; der Live-Coding-Umfang bleibt bei sechs Fragment-Shader-Demos. Die Bilder sind lokal unter `folien/bilder/3d-ausblick/` gespeichert; Quellen und der per LaTeX gewählte Playground-Ausschnitt sind dort dokumentiert. Der Vortrag umfasst damit 17 Folien.

**Prüfung des 3D-Ausblicks:** `npm run build:pdf` erfolgreich; neue Folie 15 gerendert und visuell ohne Überstände geprüft. Beide Bildlinks und beide ausgeschriebenen Adressen in der erzeugten PDF auf die vorgegebenen Ziele geprüft.

**Folienreihenfolge festgelegt:** „Studium am HPI“ ist vom bisherigen Platz als Folie 5 ans Ende hinter Inspirationsgalerie und Rückblick verschoben. Die Folie konkretisiert die abschließende Studienbotschaft. Der zuletzt gebaute Vortrag vor der Trennung von Folien und Code-Journal hat 35 Folien; die frühere Frage nach der HPI-Platzierung ist damit entschieden.

**Aktuelle Folienkorrektur:** Auf „Vom Hobby zum Studium“ ist der gleichlautende rote Untertitel entfernt. Die folgende Zeitleistenfolie trägt den bisherigen roten Text „Forschung, Praxis und Lehre“ als Überschrift; auch dort entfällt der Untertitel.

**Zeitachsen korrigiert (12. November 2026):** Auf beiden Zeitstrahlfolien ist 2025 statt 2027 als letzte Jahreszahl beschriftet. Die gemeinsame Zeitachse trägt rechts eine Pfeilspitze; Skala und Stationen bleiben erhalten.

**Schaubild auf Folie 12 ergänzt (12. November 2026):** Die zweite untere Spalte zeigt die bilineare Mischung der vier Eckwerte über die Zwischenwerte U und V zum Wert N. Die Mischgewichte sind passend zu den Formeln als s(t_x) und s(t_y) bezeichnet; die Grafik bleibt als TikZ bearbeitbar.

Die Inhaltsplanung und das Rahmenwerk haben getrennte Aufgaben. Lernziele, festgelegte Einschränkungen und die abgestimmte didaktische Progression aus `CONTEXT.md` bleiben Grundlage.

Das [Vortragsskelett](docs/VORTRAGSSKELETT.md) ordnet die geplanten Folien, Demos, Tafelbilder, ShaderToy-Beispiele und QR-Codes dem Ablauf zu. Es enthält die offenen Aufgaben für persönliche Vorstellung, HPI-Studium, Übersicht, Demo-Folien und Zugangslinks. Reihenfolge und Zeitplanung bleiben Arbeitsstand.

Vor den zwei Zeitstrahlfolien steht die neue persönliche Vorstellungsfolie „Wer bin ich?“ mit Name, M.Sc. IT-Systems-Engineering, Website, Position als wissenschaftlicher Mitarbeiter und der Affiliation am Fachgebiet Computergrafische Systeme, Hasso-Plattner-Institut, Digital Engineering Fakultät, Universität Potsdam. Das Porträt vom Februar 2016 ist von der Zeitleiste auf diese Folie verschoben. Unten stehen mittelgroß das vom Nutzer verlinkte HPI-Vollogo und das Logo der Universität Potsdam. Quelle und lokale SVG-/PDF-Fassung sind unter `folien/logos/` dokumentiert. Die erste Zeitleistenfolie heißt „Vom Hobby zum Studium“; ihre Schriftgröße und horizontale Jahresskala bleiben erhalten. Der Witz zum Alter des Fotos bleibt mündlich. Eine zusätzliche mittelgroße Google-Maps-Abbildung unter dem Porträt zeigt Potsdam mit Innenstadt, Havel und Babelsberg sowie das markierte HPI am Griebnitzsee. Sie ist lokal gespeichert und anklickbar mit Google Maps verlinkt; Logo und Kartendatenhinweise bleiben sichtbar. Die beiden Institutslogos stehen unten links. Quelle und Einbettung sind in `folien/bilder/karten/` dokumentiert.

Die Inspirationsgalerie ist mit den sechs am 11. November 2026 ausgewählten ShaderToy-Demos `4df3Rn`, `XdlSDs`, `WtfGDX`, `mtyGWy`, `fstyD4` und `3sySRK` umgesetzt: zwei Zeilen, drei Spalten, je ein lokales Originalvorschaubild, ein QR-Code und ein anklickbarer Link. Bildquellen und ausstehende Prüfung der Originalseiten bzw. Live-Ausführung sind unter `folien/bilder/galerie/README.md` dokumentiert. Es wurden keine ShaderToy-Projekte angelegt oder veröffentlicht.

### Konzeptablauf pro Demo — Arbeitsstand

Für die ersten vier Demos ist der übergeordnete Ablauf jetzt festgelegt: **Farbe und Zeit → Farbe abhängig von der Bildposition → Objekte durch Abstände → gezielte Steuerung der Objekte und Verknüpfung mit Farbe**. Dies bildet den roten Faden der Übersicht in den Folien. Die nachfolgenden Details beschreiben die einzelnen Lernschritte; die Fortsetzung ist als Noise → fBm/Wolken/Animation festgelegt; die bisherigen Wellen- und Taylor-Demos entfallen.

Die ersten drei Abläufe folgen dem Vorschlag des Nutzers. Demo 4 wurde am 11. November 2026 anhand der neuen Vorgaben konkretisiert und mit fünf Ständen umgesetzt. Demo 5 und 6 sind nach der neuen Vorgabe mit je vier Ständen umgesetzt. Vor Demo 1 stehen Pixelraster, Fragment-Shader, ShaderToy-Boilerplate und RGB.

1. **Farbe und Zeit:** Farbe → Farbe 1 → Farbe 2 → Farbe in Abhängigkeit von der Zeit. `iTime` und die Schwingung der Farbkomponenten werden hier erstmals anschaulich eingeführt.
2. **Pixelposition und Farbverlauf:** Pixelposition und Auflösung → normierte Position → Farbe in Abhängigkeit der Pixelposition → Mischung zweier Referenzfarben anhand der x-Position.
3. **Kreis und Metaballs:** Vordergrund und Hintergrund unterscheiden → Vordergrund anhand des Abstands vom Zentrum → quadrierter Abstand → Kreis als einzelnes Abstandsfeld → zwei Felder addieren und auswerten → Positionen zeitabhängig verändern. Die Zentrierung und das Seitenverhältnis werden bei der Abstandsmessung erklärt.

4. **Polynome für Bewegung und Farbe:** fünf Stände in der Reihenfolge **1 Punkt LERP → 2 Punkte LERP → 2 Punkte Smoothstep → 4 Punkte Smoothstep → 4 Punkte Smootherstep (ZIEL)**. Punkte auf einer Raute mit Ecken N/O/S/W; im Halt mit derselben Kurve wie für den Weg Schwarz → Eckfarbe → Schwarz, erst dann weiterfahren. Lokale Zuordnung: N rot, O grün, S blau, W gelb. Schritt 1 → 2 erhöht nur die bereits vorbereitete Schleifengrenze von 1 auf 4 und zeigt die Stimmen 1 und 3 des Kanons (Indizes 0 und 2, Verzögerungen 0/3 Sekunden); Schritt 2 → 3 ändert nur die Rückgabe von `verlauf`; Schritt 3 → 4 ändert die Schleifenschrittweite von 2 auf 1 und ergänzt die Stimmen 2 und 4; Schritt 4 → ZIEL ändert nur das Polynom. Der Einsatzabstand von 1,5 Sekunden weicht von der Abschnittsdauer von 1,8 Sekunden ab. Aktuelle Zeitwahl: 1,2 Sekunden Fahrt und 0,6 Sekunden Halt. Folie und Tafelbild 6 begleiten die fünf Schritte.

Festgelegte Fortsetzung (11. November 2026):

5. **Vom Zufall zu Noise:** START UV-Bild → Phase 1 Zufall pro Pixel → Phase 2 Value Noise → ZIEL Simplex Noise. Value Noise interpoliert reproduzierbare Zufallswerte am quadratischen Gitter mit dem Smoothstep-Polynom aus Demo 4. Simplex Noise ist ein vorbereitetes alternatives Verfahren mit Gradienten auf einem Dreiecksgitter; die Basis wird eingeordnet und nicht live hergeleitet.
6. **Wolken aus Noise:** START Simplex Noise → Phase 1 fBm → Phase 2 Wolkengestaltung → Phase 3 Animation (ZIEL). START entspricht exakt dem ZIEL aus Demo 5. Vier gewichtete Oktaven ergänzen Details, Smoothstep und Farbmischung gestalten Wolken, eine zeitabhängige Verschiebung lässt das Muster wandern.

Die bisherigen Demos 5 (Wellen/Animation) und 6 (Taylor) sind entfernt. Die bisherigen Demos 7/8 heißen im Vortrag jetzt 5/6; technische IDs und Pfade `08-value-noise` und `09-fbm` bleiben für vorhandene Links erhalten. Beide haben vier eigenständige ShaderToy-Snippets mit vorbereiteter Noise-Basis und vollständigen Lizenzhinweisen.

**Frühere lokale Prüfung vor der Dokumenttrennung:** Gesamtbuild mit sechs Demos, 35 Folien und acht Tafelseiten; die automatisierten Tests prüfen zusätzlich die unveränderten Rahmen in Demo 4 und die einzelnen Noise-Aufrufwechsel. Die Browserprüfung kompiliert sämtliche Stände in WebGL2 unter einem Repository-Unterpfad und prüft UV-Farben, unveränderte statische Zufalls-/Noise-Bilder, räumlichen Zusammenhang, den identischen Anschluss Demo 5 → 6, Wolkenfarben und den erst im ZIEL animierten Drift. Direkte Ausführung in ShaderToy und Erprobung im Unterricht stehen noch aus.

Die konzeptionellen Schritte der ersten drei Demos sind noch nicht sämtlich als eigene Shader-Stände vorhanden; ihre weißen START-Stände sind vorläufig. Demo 4 hat einen vorbereiteten Bewegungsrahmen, Demo 5 startet mit dem UV-Bild und Demo 6 mit Simplex Noise. Die minutengenaue Planung bleibt offen.

### Code-Journal für die Übergänge

**Herausgelöst und separat gebaut:** Die 19 Codevergleiche liegen unter `code-journal/code-schritte.tex`; `code-journal/journal.tex` stellt sie auf je einer A4-Druckseite dar. Verteilung: Demo 1 drei, Demo 2 zwei, Demo 3 vier, Demo 4 vier, Demo 5 drei und Demo 6 drei Übergänge. Bisher-/Jetzt-Auszüge, Quellzeilennummern und Erklärungshinweise sind übernommen. Der Vortrag enthält diese Übergänge nicht mehr. Die vollständigen START- und benötigten Basisblöcke als lückenlose Abtippvorlage sind in der nächsten Detailrunde zu ergänzen bzw. zu prüfen; die Tafelbild-Endstände bleiben separat in die statischen Folien einzubinden.

**Prüfung der Trennung:** Dokument- und Gesamtbuild mit allen drei PDFs erfolgreich. Alle 19 Übergänge, 108 gesetzten Codezeilen einschließlich Fortsetzungszeilen und 19 Erklärungstexte unverändert übernommen. Journal-Seiten 1 und 15 visuell geprüft; keine Überstände im LaTeX-Protokoll. Die vier Build-/Publish-Tests bestehen, einschließlich eines Fehlers im dritten Dokument und der Erhaltung aller PDF-/Verzeichnis-Inodes. Auch beim echten Projekt-Rebuild bleiben die sechs betroffenen Inodes erhalten.

### Bisheriger Themen- und Materialbestand der Planung

- **Pixel, Farben und Koordinaten:** `00-konstante-farbe` mit konstanten Farben und zeitabhängigem RGB; `01-pixelposition-und-normalisierung` verbindet normierte Position und Farbverlauf als Stände.
- **Formen und Felder:** `03-kreis-und-quadrierter-abstand` verbindet Kreis, statische und bewegte Metaballs als Stände; `dot` und der quadrierte Abstand bilden die Grundlage.
- **Glatte Übergänge:** `05-polynom-und-weiche-kante` mit fünf vollständigen Ständen: 1 Punkt LERP, 2 Punkte LERP, 2 Punkte Smoothstep, 4 Punkte Smoothstep und 4 Punkte Smootherstep. Weg und Farbwechsel im Halt verwenden dieselbe Kurve; ab dem zweiten Stand laufen die Punkte im Kanon.
- **Zufall und Noise (Demo 5):** `08-value-noise` mit UV-Bild, Zufall pro Pixel, Value Noise und vorbereitetem Simplex Noise.
- **fBm, Wolken und Animation (Demo 6):** `09-fbm` übernimmt das Simplex-Ziel, überlagert vier Oktaven, gestaltet Wolken und animiert sie zuletzt.
- **Begleitmaterialien:** deutsche LaTeX-Beamer-Folien und Tafelbilder mit versionierten Quellen, abgestimmt auf Lernziele und mathematische Kerngedanken der Demos. Erste Entwürfe liegen unter `folien/` und `tafelbilder/`. Die persönliche Timeline ist nach den neuesten Angaben vom 11. November 2026 korrigiert: Programmieren als Hobby 2001–2007, Computerlehrgänge 2004–2006; die Kategorien Softwaresystemingenieur seit 2007, Computergrafiker seit 2009 und Forscher in der Computergrafik seit 2013 stehen direkt zwischen den zugehörigen Stationen. Die Consulting-Firma gehört zum Bereich Computergrafiker. Kleinere Beschriftungen und dünne graue Jahreslinien ersetzen die bisherige Darstellung mit Legende; Details in `folien/README.md`. Weitere persönliche Inhalte, funktionierende QR-Codes und die weitere Abstimmung stehen aus. Die Wellen- und Taylor-Folien/-Tafelbilder sind entfernt; Demo 5 und 6 begleiten die neue Noise-Abfolge. Demo-4-Folie und Tafelbild 6 zeigen jetzt die Raute sowie Bewegung und Farbwechsel mit denselben Polynomen.
- **Unterrichtsvorbereitung:** separate START-/ZIEL-Stände lokal prüfen, Links und Handout-Referenzen ordnen, Tastatureingaben/Sonderzeichen minimieren; Galerie-Beispiele auswählen und externe Werke mit Quellen zuordnen.

### Provisorische Ablaufskizze (nach Kürzung auf sechs Demos neu abzustimmen)

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
| 46–76 | Demo 5: UV → Pixelzufall → Value Noise → Simplex; Demo 6: Simplex → fBm → Wolken → Animation. Aufteilung nach Probelauf neu festlegen. |
| 76–81 | Galerie: Matrizen/Rotation, Ray Marching, stochastische Effekte |
| 81–84 | HPI/Studium |
| 84–86 | Rückblick, Handout, ShaderToy-Links |
| 86–90 | Puffer/Fragen/Showcase |

Offen: Den früher eingeplanten 5-Minuten-LLM-Ausblick mit dieser Ablaufskizze abgleichen. Die frei gewordene Zeit aus Wellen/Taylor ist auf die ersten vier Demos, die beiden Noise-Demos und eigenständige Änderungen zu verteilen; der zusammengefasste 46–76-Minuten-Block ist kein endgültiges Budget. Auch die frühe Einführung von `iTime` und Sinus sowie die bewegten Metaballs brauchen einen Probelauf. Zeitbudgets sind Summen mehrerer Theorie- und Coding-Teilblöcke und dürfen bei späteren Anpassungen anders aufgeteilt werden.

### Umgesetzte technische Konvention für Demos

Schema: `demos/<NN>-<name>/demo.json`, `START.glsl`, optional weitere selbsterklärend benannte Zwischenstandsdateien, `ZIEL.glsl` und eine knappe `README.md` je Demo. Die `snapshots`-Liste beschreibt Reihenfolge, Beschriftungen und Quellen; `site/catalog.json` registriert die Demos. `templates/demo/` bietet eine Kopiervorlage. Sechs Demos decken die Themen von Farbe bis animierten Wolken ab. Demo 4 besitzt einen ausgearbeiteten START mit linearer Bewegung und Farbwechsel, Demo 5 ein UV-Bild und Demo 6 Simplex Noise. Nur die START-Stände der ersten drei Demos sind noch vorläufig weiß. Alle sechs Demos enthalten Zwischenstände. Zwischen den Ständen bleibt der Rahmen stabil: Demo 1 ändert die drei RGB-Zuweisungen, Demo 3 ergänzt ein einzelnes Abstandsfeld vor der Überlagerung und behält Farben bei, Demo 4 ändert pro Übergang genau eine Codezeile. In Demo 5 wechseln Pixelzufall, Value Noise und `simplexNoise01` über einzelne Aufrufe; neue Basisfunktionen werden nur ergänzt. Demo 6 übernimmt die Basis unverändert, verwendet normierte Noise-Werte für die Oktavsumme und ergänzt die Animation mit einer Zeile. Die weitere didaktische Ausarbeitung bleibt offen.
