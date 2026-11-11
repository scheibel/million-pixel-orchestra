# Vortragsskelett – Grafiken programmieren

Arbeitsstand für den 90-Minuten-Oberstufenworkshop **„Grafiken programmieren – Mit Mathematik zu Millionen Pixeln“**. Die Reihenfolge ist ein Vorschlag für die weitere Ausarbeitung; die minutengenaue Planung und der Umfang einzelner Demos sind noch offen. Die [Roadmap](../ROADMAP.md) enthält die konzeptionellen Teilschritte und eine vorläufige Zeitplanung.

## Vorgeschlagener Ablauf

| Abschnitt | Inhalt und Medien | Stand / offene Arbeit |
| --- | --- | --- |
| Auftakt | Titel, ein eindrucksvolles Shader-Beispiel und die Leitfrage: Wie berechnet Mathematik ein Bild? | Beispiel und Quellen auswählen. |
| Wer bin ich? | Name, M.Sc. IT-Systems-Engineering, Website, Position und Affiliation; Porträt rechts oben, darunter Google-Maps-Karte von Potsdam mit HPI-Markierung am Griebnitzsee; HPI-Vollogo und Uni-Potsdam-Logo unten links. | Neue persönliche Vorstellungsfolie vor der Zeitleiste umgesetzt. |
| Werdegang | Zwei Zeitstrahlfolien von Hobbyprogrammierung und Ausbildung bis zu Computergrafik, Forschung und Lehre. | Persönliche Schwerpunkte für den Vortrag abstimmen; erste Folie heißt „Vom Hobby zum Studium“. |
| Studium am HPI | Bachelor, Master und Promotion sowie mögliche Berufswege; Studienverlaufsplan, Link und QR-Code zu hpi.de. | Platzierung im Ablauf abstimmen; eine Vertiefung am Ende ist ebenfalls möglich. |
| Übersicht | Erster Workshopblock: Farbe und Zeit → Farbe abhängig von der Bildposition → Objekte durch Abstände → gezielte Steuerung von Bewegung und Farbe. Hinweis auf Mitprogrammieren in ShaderToy. | Die vier Leitideen sind festgelegt und auf der Übersichtsfolie abgebildet. Fortsetzung ab Demo 5 bleibt Planungsstand. |
| Einstieg in die Pixelberechnung | Pixelraster, RGB und das Modell „eine Farbe pro Pixel“; `fragCoord`, `iResolution`, später `iTime` direkt am Boilerplate einführen. Tafelbild 1 als Zeichnung oder fertige Seite. | Einführung und Codevorlage für den Vortrag ausarbeiten. |
| Demo-Blöcke | Pro Block: Frage oder Zielbild → nötiges Konzept am Tafelbild oder auf der Folie → gemeinsames Live-Coding in ShaderToy → Ergebnis und kurzer Rückblick. | Siehe Zuordnung unten; je Demo START, ZIEL und sinnvolle Zwischenstände abstimmen. |
| Inspirationsgalerie | Sechs ausgewählte ShaderToy-Demos als Raster mit zwei Zeilen und drei Spalten, jeweils mit Originalvorschaubild, QR-Code und Link. | In den Folien umgesetzt; [Quellen und ausstehende Prüfung](../folien/bilder/galerie/README.md). Keine Live-Herleitung. |
| Abschluss | Zusammenfassung, Fragen und Möglichkeiten zum Weiterexperimentieren. QR-Code zur Website mit lesbarer Adresse. | Website-Link und QR-Code zu `https://www.willyscheibel.de/million-pixel-orchestra/` auf Übersicht und Abschluss eingebunden. Inhalt weiter abstimmen. |

Ein früherer Entwurf enthält außerdem einen LLM-Ausblick. Ob und wo er vorkommt, ist noch offen.

## Demos und begleitende Materialien

Der rote Faden der ersten vier Demos ist festgelegt:

| Demo | Leitidee |
| --- | --- |
| 1 | Eine Farbe und Farbe in Abhängigkeit der Zeit. |
| 2 | Farbe in Abhängigkeit der Position im Bild: Raster, Pixelpositionen und Auflösung. |
| 3 | Objekte im Bild über Abstände und Felder sichtbar machen. |
| 4 | Objekte gezielt steuern und ihre Bewegung mit Farbe verknüpfen. |

Animation ist schon ab Demo 1 sichtbar; Demo 4 gestaltet ihren zeitlichen Verlauf bewusst mit Interpolation und Polynomen. Die folgenden Demos bilden die bisher geplante Fortsetzung.

Die Reihenfolge folgt dem aktuellen Katalog; die Nummern bezeichnen hier die Vortragsfolge. Die zehn [Tafelbildentwürfe](../tafelbilder/README.md) können live entwickelt oder fertig gezeigt werden. Ein erster [Beamer-Foliensatz](../folien/README.md) enthält Demo-Folien, echte QR-Codes für Website und Inspirationsgalerie sowie vorläufige QR-Platzhalter für die noch offenen ShaderToy-START-Links.

| Nr. | Demo und Konzept | Tafelbildseiten | Folie und ShaderToy |
| --- | --- | --- | --- |
| 1 | [Farbe und Zeit](../demos/00-konstante-farbe/README.md): RGB, konstante Farben, zeitabhängiger Farbwechsel | 2 | Zielbild, RGB und Einstieg zu `iTime`; QR-Code zum vorbereiteten START. |
| 2 | [Pixelposition und Farbverlauf](../demos/01-pixelposition-und-normalisierung/README.md): Position, Auflösung, Normalisierung und Mischung | 3 | Koordinaten und zwei Referenzfarben; QR-Code zum START. |
| 3 | [Kreis und bewegte Metaballs](../demos/03-kreis-und-quadrierter-abstand/README.md): Abstand, Felder, Überlagerung und Bewegung | 4–5 | Kreis → Felder → Metaballs; QR-Code zum START. |
| 4 | [Polynome für Bewegung und Farbe](../demos/05-polynom-und-weiche-kante/README.md): Lerp → Smoothstep → Smootherstep | 6 | Punkt auf einer Raute N/O/S/W; abbremsen, halten, beschleunigen. Im Halt mit derselben Kurve Schwarz → Rot/Grün/Blau/Gelb → Schwarz. Fünf Stände: 1 Punkt LERP → 2 Punkte LERP → 2 Punkte Smoothstep → 4 Punkte Smoothstep → 4 Punkte Smootherstep. Phase 2/3 zeigen die Stimmen 1 und 3 (0/3 Sekunden Verzögerung); ab Phase 4 kommen Stimmen 2 und 4 hinzu (0/1,5/3/4,5 Sekunden); QR-Code zum ShaderToy-START bleibt offen. |
| 5 | [Wellen und Animation](../demos/06-wellen-und-animation/README.md): Sinus, Phase und Zeit | 7 | Sinus als Bildbaustein; QR-Code zum START. Ein Meerbild wurde vorgeschlagen und ist noch nicht umgesetzt oder beschlossen. |
| 6 | [Taylorapproximation](../demos/07-taylor-approximation/README.md): Referenz und lokale Näherung vergleichen | 8 | Vergleich und Entwicklungsstelle; QR-Code zum START. |
| 7 | [Value Noise](../demos/08-value-noise/README.md): Gitterwerte und Interpolation | 9 | Gitter und glatte Mischung; QR-Code zum START. Noise-Basisfunktionen werden für das Live-Coding vorbereitet. |
| 8 | [fBm](../demos/09-fbm/README.md): mehrere gewichtete Noise-Oktaven und Wolken | 10 | Grobe und feine Strukturen; QR-Code zum START. |

Demo 4 besitzt einen vorbereiteten Bewegungs-, Farb- und Zeichenrahmen im START; im Live-Coding wird zunächst auf zwei Punkte erweitert, dann Smoothstep eingeführt, danach auf vier Punkte erweitert und zuletzt Smootherstep eingesetzt. Die weißen START-Shader der übrigen Demos sind vorläufige Platzhalter. Deren konkrete Live-Coding-Progression und zusätzliche Stände müssen noch ausgearbeitet werden. Die Folien begleiten die Konzepte jeweils unmittelbar bei ihrer Anwendung; sie sind kein separater Theorieblock.

## Folienbestand – To-dos

- [ ] Titel und Auftakt mit ausgewähltem Beispiel.
- [x] „Wer bin ich?“ mit Name, Abschluss, Website, Position, Affiliation, Porträt, Potsdam-Karte mit HPI-Markierung und den beiden Logos vor der Zeitleiste ergänzen.
- [ ] „Studium am HPI“ mit persönlicher Perspektive.
- [ ] Übersicht über Ablauf und Mitprogrammieren.
- [ ] Einstieg in Pixel, RGB und ShaderToy-Boilerplate.
- [ ] Pro Demo passende Folien für Zielbild, zentrale Idee und Zugang zum START erstellen; die endgültige Anzahl richtet sich nach dem Lernschritt.
- [ ] Inspirationsgalerie, Rückblick und Abschluss mit Website-Zugang.
- [ ] Den ersten Entwurf der deutschen LaTeX-Beamer-Quellen mit den Tafelbildern abstimmen und weiter ausarbeiten.

## ShaderToy-Beispiele und QR-Codes – To-dos

- [ ] Eigene Demos lokal prüfen und die für das Mitprogrammieren geeigneten START-, ZIEL- und gegebenenfalls Zwischenstände festlegen.
- [ ] ShaderToy-Projekte und geeignete Zugangslinks je Stand vorbereiten, sobald die separate Übertragung ausdrücklich beauftragt wird. Die Snippets im Repository bleiben die versionierte Grundlage.
- [ ] Prüfen, ob die Teilnehmenden die vorbereiteten ShaderToy-Beispiele auf ihren Geräten öffnen und zum Mitprogrammieren verwenden können, insbesondere auf Schul-iPads.
- [x] Galeriebeispiele auswählen und mit lokalen Originalvorschaubildern, QR-Codes und Links einbinden: `4df3Rn`, `XdlSDs`, `WtfGDX`, `mtyGWy`, `fstyD4`, `3sySRK`.
- [ ] Live-Funktion, Originaltitel, Urheberschaft und Lizenzangaben der Galeriebeispiele auf ShaderToy prüfen; automatische Seitenabrufe waren blockiert. Auftaktbeispiel separat auswählen und prüfen.
- [ ] Pro Demo einen QR-Code für den vorbereiteten START-Link auf der entsprechenden Folie vorsehen; weitere Stand-Links nach Bedarf zugänglich machen. Eine lesbare Kurzadresse bzw. ein alternativer Zugang hilft beim Abtippen.
- [x] QR-Code und lesbare Adresse `https://www.willyscheibel.de/million-pixel-orchestra/` für Übersicht und Abschluss einbinden.
- [ ] Nach Veröffentlichung Website-Erreichbarkeit prüfen; QR-Codes auf den vorgesehenen Geräten sowie in Projektionsgröße testen. Die Website-Adresse ist vorgegeben, ihre Veröffentlichung erfolgt separat.

Die Website bündelt die Materialien; die Teilnehmenden programmieren in ShaderToy. Lokaler Release-Build, Veröffentlichung auf GitHub Pages und Übertragung zu ShaderToy sind eigenständige Schritte und durch dieses Skelett nicht beauftragt.
