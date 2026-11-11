# Polynome für Bewegung und Farbe

**Zielbild:** Vier Punkte fahren wie Stimmen eines Kanons zeitversetzt auf einem um 45° gedrehten Quadrat. Die Ecken stehen auf Nord, Ost, Süd und West. Vor jeder Ecke wird ein Punkt langsamer, hält an und wechselt von Schwarz zur Eckfarbe und zurück zu Schwarz. Erst dann beschleunigt er auf der nächsten Kante wieder. Eckfarben: N rot, O grün, S blau, W gelb. Die fünf Stände entwickeln den Ablauf mit einem, zwei und vier Punkten: 1 Punkt LERP → 2 Punkte LERP → 2 Punkte Smoothstep → 4 Punkte Smoothstep → 4 Punkte Smootherstep.

**Lernziel:** Die Bahn und ihre Eckpunkte bleiben gleich; ein anderer zeitlicher Mischparameter verändert die Geschwindigkeit. Dieselbe Kurve steuert auch den Farbwechsel während des Halts. Polynome glätten den Übergang zwischen Fahrt und Stillstand sowie den Wechsel zwischen Schwarz und Eckfarbe.

## Live-Coding-Schritte

| Stand | Änderung | Beobachtung |
| --- | --- | --- |
| `START.glsl` · 1 Punkt LERP | `verlauf(t)` gibt `t` zurück; der vollständige Bewegungs-, Farb- und Zeichenrahmen ist vorbereitet. | Gleichförmige Fahrt, abrupter Halt und abruptes Anfahren; linearer Farbwechsel. |
| `01-zwei-punkte-lerp.glsl` · 2 Punkte LERP | Die Schleife über die Stimmen 1 und 3 ausführen: Indizes 0 und 2. | Die beiden Punkte haben Verzögerungen von 0 und 3 Sekunden; die Kurve bleibt linear. |
| `02-zwei-punkte-smoothstep.glsl` · 2 Punkte Smoothstep | Die Rückgabe von `verlauf(t)` durch `t * t * (3.0 - 2.0 * t)` ersetzen. | Beide Punkte bremsen und beschleunigen sanft; auch der Farbwechsel beginnt und endet mit Steigung null. |
| `03-vier-punkte-smoothstep.glsl` · 4 Punkte Smoothstep | Die Schrittweite der Schleife von 2 auf 1 ändern. | Die Stimmen 2 und 4 ergänzen den Kanon; Smoothstep bleibt gleich. |
| `ZIEL.glsl` · 4 Punkte Smootherstep | Die Rückgabe durch `t * t * t * (t * (6.0 * t - 15.0) + 10.0)` ersetzen. | Bei allen vier Punkten geht zusätzlich die zweite Ableitung an den Enden auf null: für den Weg und die Farbanteile. |

Die vorbereitete Funktion `verlauf(t)` berechnet den Mischparameter und wird sowohl für die Position als auch für die Farbe aufgerufen. Ab Phase 2 wird derselbe Ablauf für mehrere Punkte mit versetzter lokaler Zeit berechnet. Die Schritte 2 → 3 und 4 → ZIEL ändern jeweils nur die Rückgabezeile; Schritt 3 → 4 ändert nur die Schrittweite der Schleife und ergänzt damit die Stimmen 2 und 4. Der Rahmen ist in jedem Stand enthalten und wird eingeordnet: Koordinaten, Streckenzeit, Eckpunkte, Positionsmischung, Farbimpuls und Darstellung. Jede Datei ist ein vollständiges ShaderToy-Image-Snippet mit ausschließlich `fragCoord`, `iResolution` und `iTime`.

## Didaktischer Ablauf

1. **Ein Punkt LERP:** START beobachten: Wo wirkt die Bewegung abrupt? Fahrt und Stillstand unterscheiden. LERP zwischen den benachbarten Eckpunkten `a` und `b` erklären: `mix(a, b, s) = (1 − s) · a + s · b`. `s = 0` liefert `a`, `s = 1` liefert `b`. Zeitfortschritt `t` und Wegfortschritt `s = verlauf(t)` unterscheiden. Dieselbe lineare Kurve steuert Schwarz → Eckfarbe → Schwarz im Halt.
2. **Zwei Punkte LERP:** Die Stimmen 1 und 3 des Vier-Punkte-Kanons auswählen. Die Schleife verwendet die Indizes 0 und 2 und damit dieselbe Pixelposition mit lokalen Verzögerungen von 0 und 3 Sekunden. Noch ist die Steigung der Kurve konstant.
3. **Zwei Punkte Smoothstep:** Einen sanften Start und Halt verlangen: `s(0) = 0`, `s(1) = 1` und `s′(0) = s′(1) = 0`. Der kubische Ansatz führt zu `s(t) = 3t² − 2t³`. Einsetzen und beide Punkte vergleichen. Eine flache Kurve bedeutet geringe Geschwindigkeit; auch die Farbmischung wird geglättet.
4. **Vier Punkte Smoothstep:** Die Schrittweite der Schleife von 2 auf 1 ändern. Beobachten, wie vier Stimmen dieselbe bereits geglättete Sequenz zeitversetzt durchlaufen.
5. **Vier Punkte Smootherstep:** Als Erweiterung auch `s″(0) = s″(1) = 0` verlangen: `s(t) = 6t⁵ − 15t⁴ + 10t³`. Das Polynom wird bereitgestellt; die vollständige Herleitung ist kein zusätzlicher Pflichtblock. Alle vier Punkte mit dem vorherigen Smoothstep-Stand vergleichen.

Die Raute behält ihre geraden Kanten. Geglättet wird der zeitliche Verlauf des Mischparameters. Die Steigung entspricht der Geschwindigkeit entlang einer Kante, bis auf den konstanten Faktor aus Kantenlänge und Fahrzeit. Smootherstep hat auch beim Übergang zur Haltephase eine stetige Beschleunigung; der Unterschied zu Smoothstep ist feiner als der zu Lerp.

## Hinweise aus dem didaktischen Review

- **Kernidee:** Dieselbe Interpolation erzeugt eine Position und eine Farbe. Dies knüpft an die Farbmischung aus Demo 2 und die zeitabhängigen Mittelpunkte aus Demo 3 an. Die Haltephase macht den Farbwechsel als zweite Anwendung unmittelbar sichtbar.
- **Vorbereiteter Code:** START umfasst 54 Zeilen. Koordinaten, Eckpunktauswahl, Zeitzerlegung und Zeichnen werden vorbereitet übernommen und abschnittsweise erklärt. Im Live-Coding stehen Positionsmischung, Kurvenwechsel und Schleifenschrittweite im Vordergrund. Das vollständige Abtippen des Rahmens passt nicht in das bisher vorgesehene Zeitbudget von neun Minuten.
- **Vergleich bei gleicher Fahrzeit:** Glatteres Anfahren und Bremsen bedeutet eine höhere Geschwindigkeit in der Mitte. Die maximalen normierten Steigungen betragen bei LERP 1, bei Smoothstep 1,5 und bei Smootherstep 1,875. Alle erreichen dieselbe Ecke nach derselben Fahrzeit.
- **Smootherstep als Vertiefung:** Gegenüber Smoothstep beträgt der maximale normierte Wegunterschied rund 0,054. Bei der aktuellen Kantenlänge und einer Vorschauhöhe von 340 Pixeln sind das rund acht Pixel Positionsunterschied. Den Vergleich daher mit Funktionsgraph und Randbedingungen begleiten; die vollständige quintische Herleitung bleibt eine optionale Vertiefung.
- **Zeitversatz genau benennen:** Die Stimmen 1 und 3 haben drei Sekunden Abstand. Eine halbe Runde dauert 3,6 Sekunden; deshalb sind die Punkte nicht zu jeder Zeit exakt diametral gegenüber. Die Auswahl entspricht dem vereinbarten Kanon. Auch Haltephasen verschiedener Stimmen können sich überlappen; sie sind zeitversetzt, aber nicht streng nacheinander.

Der Titel „Polynome für Bewegung und Farbe“ beschreibt beide Anwendungen. Die technische Demo-ID und das Verzeichnis `05-polynom-und-weiche-kante` bleiben erhalten, damit bestehende Vorschau-Links funktionieren.

## Vorbereiteter Rahmen und Haltezeit

`p = (fragCoord − 0.5 · iResolution.xy) / iResolution.y` zentriert die Pixelposition und verwendet auf beiden Achsen dieselben Abstandseinheiten. Die Eckpunkte sind direkt angegeben; eine Rotationsmatrix wird nicht benötigt. Ein Abstandstest zeichnet den bewegten Punkt, `abs(p.x) + abs(p.y) = 0.30` die Orientierungslinie.

Je Kante sind zunächst **1,2 Sekunden Fahrt und 0,6 Sekunden Halt** eingestellt. `floor` und `mod` wählen zyklisch die Kante und die Zeit innerhalb des Abschnitts. `clamp` begrenzt `t` nach Ende der Fahrzeit auf 1 und erzeugt so die echte Haltephase. Diese Zeitaufteilung ist in allen fünf Ständen gleich. Smoothstep und Smootherstep erzeugen allein keine Haltezeit; sie verändern das Bremsen und Anfahren.

Der separat normierte Haltefortschritt läuft im Halt von 0 bis 1. `puls = 1 − abs(2 · haltefortschritt − 1)` läuft dadurch von 0 nach 1 und zurück nach 0. `verlauf(puls)` steuert die Mischung zwischen Schwarz und der Farbe des erreichten Eckpunkts. Die erste Hälfte des Halts färbt den Punkt ein, die zweite führt ihn wieder zu Schwarz zurück. Während der Fahrt bleibt `puls = 0`. Der helle Hintergrund hält den schwarzen Punkt sichtbar.

## Zeitversetzte Stimmen ab Phase 2

Die zwei Punkte in Phase 2 und 3 sind die **Stimmen 1 und 3** des bisherigen Kanons mit Verzögerungen von **0 und 3 Sekunden**. Dafür läuft die Schleife mit `index += 2` über die Indizes 0 und 2. Ab Phase 4 ergänzt `index++` die Indizes 1 und 3 (Stimmen 2 und 4). Die vier Verzögerungen bleiben **0, 1,5, 3 und 4,5 Sekunden**. Ihre lokale Zeit wird mit `mod(iTime − float(index) * 1.5, 4.0 * abschnittsdauer)` auf eine Runde von 7,2 Sekunden abgebildet. `mod` setzt auch negative lokale Zeiten in die zyklische Runde um; deshalb sind alle vorgesehenen Punkte bereits ab dem ersten Bild sichtbar.

Der Einsatzabstand von 1,5 Sekunden unterscheidet sich von der Abschnittsdauer von 1,8 Sekunden. Damit haben die Punkte unterschiedliche Fortschritte innerhalb ihrer Fahrt und Haltephase. Bei einem Versatz von genau einer Abschnittsdauer würden sie an verschiedenen Ecken gleichzeitig bremsen und ihre Farbe wechseln. Der gewählte Versatz macht den Kanon sichtbar; Fahrzeit, Haltezeit und Polynom sind für alle Punkte gleich.

Für `t` zwischen 0 und 1 entspricht das ausgeschriebene kubische Polynom dem GLSL-Aufruf `smoothstep(0.0, 1.0, t)`. Lerp wird in GLSL mit `mix` ausgedrückt. Beide Zuordnungen folgen der [GLSL-ES-Spezifikation, Abschnitt „Common Functions“](https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf). Das quintische Smootherstep-Polynom steht ausdrücklich im Code.
