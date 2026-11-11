# Kreis und bewegte Metaballs

**Abfolge:** START (vorläufig weiß) → Kreis → ein Abstandsfeld → zwei statische Metaballs → bewegte Metaballs.

| Stand | Datei | Änderung zum vorherigen Stand |
| --- | --- | --- |
| Kreis | `01-kreis.glsl` | Zentrierte Koordinaten, quadrierten Abstand und Radiusvergleich ergänzen. |
| Ein Abstandsfeld | `02-ein-abstandsfeld.glsl` | Den Radius durch `feld = 0.035 / (abstandQuadrat + 0.01)` ersetzen und `feld > 1.0` vergleichen. |
| Zwei statische Metaballs | `03-metaballs-statisch.glsl` | Die Zentren symmetrisch versetzen und den zweiten Feldbeitrag mit `feld += ...` addieren. |
| ZIEL | `ZIEL.glsl` | Nur `versatz = 0.23` durch `versatz = 0.23 + 0.14 * sin(iTime)` ersetzen. |

**Mathematik:** `fragCoord` ist die Pixelposition, `iResolution.xy` die Bildgröße. Die Division durch die Bildhöhe hält die Abstandseinheiten gleich. `a` ist der Vektor vom ersten Mittelpunkt zum Pixel; `dot(a, a)` ist sein quadrierter Abstand. Der Kreis vergleicht diesen mit dem quadrierten Radius. Ein abstandsabhängiges Feld wird mit einem Grenzwert verglichen, danach ein zweites Feld addiert. `0.01` verhindert eine Division durch null. Der Feldmaßstab 0.035 und der Grenzwert 1 bestimmen die sichtbare Größe; sie müssen nicht den ursprünglichen Kreisradius 0.3 reproduzieren.

Hintergrund- und Objektfarbe bleiben in allen Form-Ständen gleich. Koordinaten, Namen und Zeichenrahmen bleiben erhalten. Der eigene Ein-Feld-Stand trennt die Umrechnung des Abstands von der Überlagerung zweier Felder.

Alle fünf Stände sind vollständige ShaderToy-Image-Snippets. Die ID `metaballs` bleibt erhalten; ihre Datei heißt nun `03-metaballs-statisch.glsl`.
