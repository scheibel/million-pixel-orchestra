# Projektkontext — Million Pixels Vortrag MCG

*Kuratiertes Handover aus den Projektgesprächen bis 28. Oktober 2026. Dies ist eine fachliche Arbeitsgrundlage, kein vollständiger Chat-Export.*

*Ergänzt am 29. Oktober 2026 um die verbindlichen Sprachvorgaben, den Umfang der Lehrmaterialien, Website und Release-Build sowie die Trennung der Planungsebenen.*

*Ebenfalls am 29. Oktober 2026 ergänzt: mehrere per Schaltfläche auswählbare Quellcode-Stände je Demo sowie ein lokaler Code-Editor mit Live-Vorschau, Fehlerbehandlung und Animationssteuerung. Die Schülerinnen und Schüler programmieren live in ShaderToy.*

## Planungsebenen (festgelegt)
1. **Rahmenwerk (Framework):** Features für Landingpage, lokale Vorschau, Hosting, Dokument-Builds und gemeinsamen Release-Build.
2. **Externe Integrationen:** ShaderToy und GitHub Pages frühzeitig vordenken und ihre Anforderungen im Rahmenwerk berücksichtigen. Tatsächliche Übertragung und Veröffentlichung sind eigene Schritte.
3. **Workshopinhalt:** Demos, Folien und Tafelbilder fachlich und didaktisch planen. Die konzeptionelle Aufschlüsselung pro Demo wird in `ROADMAP.md` erarbeitet; der bisherige Themen- und Ablaufstand bleibt erhalten.

Diese Bereiche sind getrennt zu planen. Die didaktische Reihenfolge ist keine Implementierungsfolge für das Rahmenwerk. Die technische Dokument-Build-Pipeline kann mit minimalen Beispielen unabhängig von den später ausgearbeiteten Lehrmaterialien entwickelt werden. `ROADMAP.md` führt Aufgaben und Abnahmen nach diesen Bereichen.

## Veranstaltung und Zielgruppe
- **Workshop-Titel:** „Grafiken programmieren – Mit Mathematik zu Millionen Pixeln“.
- **Format:** 90 Minuten, Oberstufe am Marie-Curie-Gymnasium (MCG), gemeinsam entwickelte Live-Demos.
- **Geräte:** möglichst Schul-iPad oder eigener Laptop; dedizierte Tastatur vorteilhaft. Beamer/Smartboard und Tafel/Whiteboard. Sonderzeichen und Copy/Paste als praktische Hürde berücksichtigen.
- **Plattform für die abschließenden Demos:** ShaderToy. Die Beispiele sollen zuerst lokal versioniert entwickelt und erst später nach ShaderToy übertragen werden.
- **Live-Coding der Schülerinnen und Schüler:** in ShaderToy. Parallel bietet das lokale Rahmenwerk einen erweiterten Shader-Editor mit Live-Vorschau; beide Umgebungen verwenden dieselben kopierbaren Shader-Snippets.
- **Prüfpriorität:** Die Website und ihre lokale Vorschau sind insbesondere für die Vorführung auf einem Laptop vorgesehen; ihre Funktion auf iPads ist nachrangig. Die Teilnehmenden rufen dieselben Demos zum Mitprogrammieren in ShaderToy auf. Ob das auf Schul-iPads funktioniert, hängt von ShaderToy und dessen Nutzung auf diesen Geräten ab und ist in der Unterrichtsvorbereitung dort zu prüfen.

## Sprache und Materialumfang (festgelegt)
- Ziel des Projekts sind **deutsche Lehrmaterialien**. Beschreibende Texte auf Webseiten und insbesondere auf Folien sind auf Deutsch zu halten.
- Quellcode darf auf Englisch sein, auch in eingebetteten Codebeispielen.
- Das Repository beherbergt neben den Shader-Demos auch die **bearbeitbaren Quellen für Folien und Tafelbilder**.
- Für die Folien wird **LaTeX Beamer** verwendet. Tafelbilder werden in **LaTeX mit PGF/TikZ** verwaltet und als druckbare PDFs ausgegeben.

## Website, lokales Hosting und Release-Build (festgelegt)
- Eine **deutsche Landingpage** bietet einen zentralen Einstieg zu Demos und Lehrmaterialien.
- Als Website-Adresse ist seit 11. November 2026 **`https://scheibel.github.io/million-pixel-orchestra`** festgelegt. Die Übersichts- und Abschlussfolie verwenden diese Adresse als anklickbaren Link und QR-Code. Die Festlegung der Adresse ist kein Auftrag zur Veröffentlichung.
- Ein **einfaches lokales HTTP-Hosting** stellt Landingpage und Demo-Vorschau bereit. Die reine Demo-Vorschau setzt keine LaTeX-Installation voraus.
- Ein **vollständiger Release-Build auf dem Entwicklergerät** baut die Website, die Demos sowie die LaTeX-Beamer-Folien und Tafelbilder aus ihren versionierten Quellen nach `dist/`. Die Lehrmaterialien werden als PDFs auf der Website zum Download verlinkt. Eine passende lokale LaTeX-Distribution einschließlich benötigter Pakete wird für diesen Build vorausgesetzt.
- Das gemeinsame Build-Ergebnis ist **statisch auf GitHub Pages hostbar**, auch unter dem Unterpfad eines Repositorys. Im Hosting ist kein eigenes Backend erforderlich.
- **Veröffentlichungsweg:** das lokal fertig gebaute `dist/`-Bundle in die GitHub-Pages-Veröffentlichungsquelle pushen. Es werden keine GitHub-Actions-Workflows für Build oder Deployment verwendet. Auf GitHub Pages werden weder eine LaTeX-Distribution noch andere Projekt-Build-Werkzeuge vorausgesetzt; dort werden die fertigen Dateien bereitgestellt.
- Lokaler Release-Build und anschließender Push zur Veröffentlichung bleiben getrennte Schritte.
- Der Website-Build und der lokale HTTP-Server verwenden Node.js ab Version 22 ohne zusätzliche Abhängigkeiten. Die konkreten PDF-Build-Werkzeuge bleiben für F2 offen. GitHub-Pages-Kompatibilität ist kein Auftrag zur Veröffentlichung.

## Lokaler Shader-Editor (festgelegt)
- Die Demo-Seite enthält einen bearbeitbaren Code-Editor mit Live-Vorschau, Fehlerbehandlung und Animationssteuerung als erweiterte lokale Umsetzung der Shader-Coding-Umgebung.
- Der lokale Editor ergänzt das Live-Coding der Schülerinnen und Schüler in ShaderToy. Er bleibt Teil der statischen Website und benötigt kein Server-Backend.
- Editor, Vorschau und vorbereitete Quellcode-Stände sind miteinander verbunden. Die Shader bleiben vollständig nach ShaderToy kopierbar; die lokalen Entwicklungshilfen erfordern keine zusätzlichen Lehr-Uniforms.
- Die zuvor vorgeschlagenen Bedienregeln sind mit dem Implementierungsauftrag vom 29. Oktober 2026 in F1 umgesetzt: automatische Kompilierung nach 350 ms, letzte gültige Vorschau bei Fehlern, Wiedergabe/Pause und Zeitrücksetzung sowie getrennte Entwürfe je Stand bis zum Neuladen. Einzelheiten stehen in `README.md` und F1 der Roadmap.
- Die Bildvorschau bietet Vollbild über eine Schaltfläche oder Strg-Klick auf das Canvas; Strg-Klick und Esc schließen es wieder. Die Zeitsteuerung verwendet zugänglich beschriftete Symbole. Diese Funktionen gehören ausschließlich zur lokalen Vorschau.

## Quellcode-Stände je Demo (festgelegt)
- Jede Demo unterstützt mehrere vorbereitete Quellcode-Stände, zwischen denen auf der Demo-Seite per Schaltflächen gewechselt werden kann. Sie dienen als verlässliche Bezugspunkte bei Fehlern im Live-Coding.
- Für Live-Demos bleiben `START` und `ZIEL` erhalten; zusätzliche Zwischenstände sollen nach Bedarf ergänzt werden können. Es gibt keine feste Beschränkung auf zwei Stände.
- Jeder Stand liegt als vollständiges, eigenständig kopierbares ShaderToy-Snippet vor. Die vorhandene Vorgabe separater START-/ZIEL-Dateien bleibt bestehen.
- Das umgesetzte Metadatenformat ist `demo.json` mit einer geordneten `snapshots`-Liste; `site/catalog.json` registriert die Demos. Anfangs wird `start` geladen, sofern vorhanden; bei vorläufig nur einem ZIEL-Stand wird dieser geladen. Für fertige Live-Demos bleibt START erforderlich. Beim Wechsel folgen Editor und Vorschau dem ausgewählten Stand bzw. dessen erhaltenem Entwurf; die Zeit wird auf null gesetzt, der Wiedergabezustand bleibt erhalten. „Stand wiederherstellen“ lädt die vorbereitete Fassung zurück. Der Vertrag ist in `demos/README.md` dokumentiert.

## Übergeordnete Lernziele (festgelegt)
1. Interesse an Informatikstudium und Programmieren wecken.
2. Computergrafik als Teilgebiet der Computer Science sichtbar machen.
3. Die Rolle von Mathematik für die Computergrafik praktisch verdeutlichen.
4. Über spannende visuelle Anwendungen für Mathematik motivieren.
5. Einen Baukasten zum selbstständigen Spielen und Vertiefen mitgeben.

## Inhaltlicher Kern (festgelegt)
- Farben/Farbräume (insbesondere RGB), Pixelraster und Pixelposition, Mathematik als unmittelbare Grundlage der Bildberechnung.
- Fragment-Shader-Denkmodell: Für die aktuelle Pixelposition wird die Farbe berechnet; dieselbe Berechnung wird über viele Pixel ausgeführt.
- ShaderToy-Schnittstelle: `fragCoord` (aktuelle Pixelposition), `iResolution` (Bildgröße), `iTime` (Animationszeit). Zuerst technische Minimalvorlage/Boilerplate erklären.
- Die Leitformel beginnt mit einer konstanten Farbe und umfasst anschließend zeitabhängige Farbe `color = f(t)`, ortsabhängige Farbe `color = f(x, y)` und orts- und zeitabhängige Farbe `color = f(x, y, t)`. **Kein zusätzlicher Interaktionsparameter `p`.**
- Unmittelbar nacheinander passende mathematische Konzepte und kleine Live-Coding-Ergebnisse; keine Vorab-Mathematikvorlesung.
- Für jede Live-Demo **mindestens die vorbereiteten ShaderToy-Stände `START` und `ZIEL`**, damit Teilnehmende den START-Stand übernehmen und zum ZIEL mitprogrammieren können. Zusätzliche Zwischenstände unterstützen den Rückgriff bei Fehlern im Live-Coding.
- Im Workshop vorbereitete ShaderToy-Links zum Abtippen/Übernehmen nutzen; frühere gemeinsame Planung sieht keine Abhängigkeit vom erstmaligen Live-Erstellen von ShaderToy-Projekten vor.

## Geplante didaktische Progression (inhaltlich abgestimmt)
1. **Pixel & Farbe:** konstante Farbe; RGB als Farbvektor; `iTime` und Sinus für einen Farbwechsel anschaulich einführen.
2. **Koordinaten:** `fragCoord` und `iResolution`; normierte Position; positionsabhängige Farben und Farbverlauf.
3. **Kreise:** Abstand und insbesondere quadrierter Abstand, `dot`; Kreis und Metaballs als Stände derselben Demo, abschließend mit zeitabhängig bewegten Mittelpunkten.
4. **Weiche Übergänge:** Polynome und Herleitung einer kubischen glatten Interpolation, z. B. `3t² - 2t³`, anschließend Anwendung bei weichen Kanten.
5. **Wellen & Animation:** Sinus/Cosinus, Phase und `iTime` vertiefen; anschließend Taylorapproximation von Sinus/Cosinus und Unterschied zwischen exakter Berechnung und Approximation.
6. **Noise:** Pseudozufall, Gitterwerte, Interpolation, Value Noise, fBm; Basisfunktionen für Noise werden vorbereitet, statt alles von Grund auf zu tippen. Visuelle Ergebnisse z. B. Wolken/Marmor.
7. **Inspirationsgalerie, keine Live-Herleitung:** Matrizen/Rotation, Ray Marching/Intersektionstests, stochastische Effekte.

## Bewusst außerhalb des Workshopumfangs (festgelegt)
- Keine selbstständige Einheit zu Maus, Tastatur, externen Steuerparametern oder UI-Interaktion.
- Keine explizite Geometrie, Vertex-Shader, Rasterisierungs-Pipeline oder allgemeine Rendererarchitektur.
- Keine Gras-Demo und keine Voronoi-Demo.
- Fortgeschrittene Galeriethemen nicht zusätzlich live programmieren.

## Rahmenzeiten
Ein früher Organisationsentwurf sah 2 Min Einstieg, 3 Min HPI, 75 Min fachlichen Workshop, 5 Min Ausblick auf LLMs, 3 Min HPI und 2 Min Outro vor. Eine jüngere Ablaufskizze mit detaillierten Demo-Minuten und 4 Min Puffer findet sich in `ROADMAP.md`. **Die minutengenaue Abstimmung und der Stellenwert des LLM-Ausblicks sind noch zu konsolidieren.**

## Bestehende Inspirationsreferenzen
Die folgenden ShaderToy-IDs wurden in den Projektgesprächen als Beispiele/Referenzen gesammelt (Zuordnung zu konkreten Live-Demos/Galerie vor Einsatz prüfen):
- `4df3Rn`
- `MltXz2`
- `XdlSDs`
- `WtfGDX`
- `mtyGWy`
- `fstyD4`

## Qualitätskriterien
- Alle Lehrbeispiele auf iPad/Laptop nachvollziehbar; geringe Tipp-Hürde, besonders für Sonderzeichen.
- Der Code ist kurz genug, um ihn im Unterricht sichtbar zu verändern.
- Die Mathematik erklärt das sichtbare Bild; Visualisierungen zeigen direkt, was eine Funktionsänderung bewirkt.
- Die Übungen bleiben als eigenständig veränderbare Snippets mit eindeutigen START-/ZIEL-Ständen und bei Bedarf zusätzlichen Zwischenständen erhalten; die Demo-Seite bietet Schaltflächen zur Auswahl der vorbereiteten Stände.
