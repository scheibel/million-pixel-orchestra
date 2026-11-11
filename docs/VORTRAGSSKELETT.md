# Vortragsskelett – Grafiken programmieren

Arbeitsstand für den 90-Minuten-Oberstufenworkshop **„Grafiken programmieren – Mit Mathematik zu Millionen Pixeln“**. Die Reihenfolge ist ein Vorschlag für die weitere Ausarbeitung; die minutengenaue Planung und der Umfang einzelner Demos sind noch offen. Die [Roadmap](../ROADMAP.md) enthält die konzeptionellen Teilschritte und eine vorläufige Zeitplanung.

## Vorgeschlagener Ablauf

| Abschnitt | Inhalt und Medien | Stand / offene Arbeit |
| --- | --- | --- |
| Auftakt | Titel, ein eindrucksvolles Shader-Beispiel und die Leitfrage: Wie berechnet Mathematik ein Bild? | Beispiel und Quellen auswählen. |
| Wer bin ich? | Persönliche Vorstellung anhand zweier Zeitstrahlfolien von Hobbyprogrammierung und Ausbildung bis zu Computergrafik, Forschung und Lehre. | Zeitstrahl liegt als Entwurf vor; persönliche Schwerpunkte für den Vortrag abstimmen. |
| Studium am HPI | Bachelor, Master und Promotion sowie mögliche Berufswege; Studienverlaufsplan, Link und QR-Code zu hpi.de. | Platzierung im Ablauf abstimmen; eine Vertiefung am Ende ist ebenfalls möglich. |
| Übersicht | Was wir heute bauen: Farbe → Position → Formen → Bewegung → Noise. Hinweis auf Mitprogrammieren in ShaderToy. | Übersicht und Umfang mit den Demos abstimmen. |
| Einstieg in die Pixelberechnung | Pixelraster, RGB und das Modell „eine Farbe pro Pixel“; `fragCoord`, `iResolution`, später `iTime` direkt am Boilerplate einführen. Tafelbild 1 als Zeichnung oder fertige Seite. | Einführung und Codevorlage für den Vortrag ausarbeiten. |
| Demo-Blöcke | Pro Block: Frage oder Zielbild → nötiges Konzept am Tafelbild oder auf der Folie → gemeinsames Live-Coding in ShaderToy → Ergebnis und kurzer Rückblick. | Siehe Zuordnung unten; je Demo START, ZIEL und sinnvolle Zwischenstände abstimmen. |
| Inspirationsgalerie | Ausgewählte Beispiele zu Rotation/Matrizen, Ray Marching oder stochastischen Effekten zeigen und einordnen. | Beispiele und Urheberschaft prüfen; keine Live-Herleitung dieser Themen. |
| Abschluss | Zusammenfassung, Fragen und Möglichkeiten zum Weiterexperimentieren. QR-Code zur Website mit lesbarer Adresse. | Inhalt und Website-Adresse ergänzen. |

Ein früherer Entwurf enthält außerdem einen LLM-Ausblick. Ob und wo er vorkommt, ist noch offen.

## Demos und begleitende Materialien

Die Reihenfolge folgt dem aktuellen Katalog; die Nummern bezeichnen hier die Vortragsfolge. Die zehn [Tafelbildentwürfe](../tafelbilder/README.md) können live entwickelt oder fertig gezeigt werden. Ein erster [Beamer-Foliensatz](../folien/README.md) enthält Demo-Folien und Platzhalter für QR-Codes; echte QR-Codes sind noch zu erstellen.

| Nr. | Demo und Konzept | Tafelbildseiten | Folie und ShaderToy |
| --- | --- | --- | --- |
| 1 | [Farbe und Zeit](../demos/00-konstante-farbe/README.md): RGB, konstante Farben, zeitabhängiger Farbwechsel | 2 | Zielbild, RGB und Einstieg zu `iTime`; QR-Code zum vorbereiteten START. |
| 2 | [Pixelposition und Farbverlauf](../demos/01-pixelposition-und-normalisierung/README.md): Position, Auflösung, Normalisierung und Mischung | 3 | Koordinaten und zwei Referenzfarben; QR-Code zum START. |
| 3 | [Kreis und bewegte Metaballs](../demos/03-kreis-und-quadrierter-abstand/README.md): Abstand, Felder, Überlagerung und Bewegung | 4–5 | Kreis → Felder → Metaballs; QR-Code zum START. |
| 4 | [Polynom und weiche Kante](../demos/05-polynom-und-weiche-kante/README.md): Übergang und kubische Interpolation | 6 | Harte und weiche Kante vergleichen; QR-Code zum START. Eine Integration in Demo 3 wurde vorgeschlagen und ist noch nicht beschlossen. |
| 5 | [Wellen und Animation](../demos/06-wellen-und-animation/README.md): Sinus, Phase und Zeit | 7 | Sinus als Bildbaustein; QR-Code zum START. Ein Meerbild wurde vorgeschlagen und ist noch nicht umgesetzt oder beschlossen. |
| 6 | [Taylorapproximation](../demos/07-taylor-approximation/README.md): Referenz und lokale Näherung vergleichen | 8 | Vergleich und Entwicklungsstelle; QR-Code zum START. |
| 7 | [Value Noise](../demos/08-value-noise/README.md): Gitterwerte und Interpolation | 9 | Gitter und glatte Mischung; QR-Code zum START. Noise-Basisfunktionen werden für das Live-Coding vorbereitet. |
| 8 | [fBm](../demos/09-fbm/README.md): mehrere gewichtete Noise-Oktaven und Wolken | 10 | Grobe und feine Strukturen; QR-Code zum START. |

Die vorhandenen weißen START-Shader sind vorläufige Platzhalter. Die konkrete Live-Coding-Progression und zusätzliche Stände müssen noch ausgearbeitet werden. Die Folien begleiten die Konzepte jeweils unmittelbar bei ihrer Anwendung; sie sind kein separater Theorieblock.

## Folienbestand – To-dos

- [ ] Titel und Auftakt mit ausgewähltem Beispiel.
- [ ] „Wer bin ich?“ mit den Angaben der vortragenden Person.
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
- [ ] Galerie- und Auftaktbeispiele auswählen; Funktionsfähigkeit, Quelle und Urheberschaft prüfen. Die in [CONTEXT.md](../CONTEXT.md) gesammelten ShaderToy-IDs sind Kandidaten und noch nicht zugeordnet.
- [ ] Pro Demo einen QR-Code für den vorbereiteten START-Link auf der entsprechenden Folie vorsehen; weitere Stand-Links nach Bedarf zugänglich machen. Eine lesbare Kurzadresse bzw. ein alternativer Zugang hilft beim Abtippen.
- [ ] QR-Code und lesbare Adresse zur veröffentlichten Website für Übersicht und Abschluss vorsehen. Die endgültige Website-Adresse steht noch aus.
- [ ] QR-Codes erst mit tatsächlichen, überprüften Zieladressen erzeugen und auf den vorgesehenen Geräten sowie in Projektionsgröße testen.

Die Website bündelt die Materialien; die Teilnehmenden programmieren in ShaderToy. Lokaler Release-Build, Veröffentlichung auf GitHub Pages und Übertragung zu ShaderToy sind eigenständige Schritte und durch dieses Skelett nicht beauftragt.
