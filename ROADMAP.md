# Roadmap — von der lokalen Codebasis zu ShaderToy

Diese Roadmap enthält **Implementierungsphasen** und eine **provisorische 90-Minuten-Ablaufskizze**. Die Phasen sind kein Auftrag, alles auf einmal zu programmieren.

## Phase 0 — Repository und Vorschau (zuerst)
- Minimalen lokalen Shader-Viewer erstellen (bevorzugt WebGL2; keine schweren Frameworks).
- ShaderToy-typische `mainImage(out vec4 fragColor, in vec2 fragCoord)`-Snippets möglichst unverändert darstellen können.
- `fragCoord` an Pixelposition, `iResolution` an Framebuffergröße und `iTime` an Zeit binden.
- Die Codeübertragung aus den Demos zu ShaderToy muss einfach sein; das lokale Preview-Gerüst darf die Snippets nicht mit app-spezifischen APIs verunreinigen.
- Laufzeitfehler und GLSL-Kompilierfehler sichtbar anzeigen. Mit Fenstergrößen-/Seitenverhältniswechseln umgehen.
- Als Smoke-Test nur einen Shader für konstante Farbe hinzufügen. Dazu eine kurze Startanleitung.
- **Abnahme:** lokal lauffähiger Viewer, ein sichtbarer Vollbildshader, klare Fehlermeldung bei einem absichtlich kaputten Shader, definierte Handhabung der ShaderToy-Uniforms.

## Phase 1 — Pixel, Farben und Koordinaten
Jeweils `START` und `ZIEL` getrennt versionieren:
- `00-konstante-farbe`
- `01-pixelposition-und-normalisierung`
- `02-farbverlauf`

## Phase 2 — Formen und Felder
- `03-kreis-und-quadrierter-abstand`: `dot`, quadrierter euklidischer Abstand, harter Kreisrand.
- `04-metaballs`: mehrere Kreisfelder und ihre Kombination.

## Phase 3 — Glatte Übergänge
- `05-polynom-und-weiche-kante`: `3t²-2t³` herleiten und zum weichen Übergang ausbauen.

## Phase 4 — Zeit und Approximation
- `06-wellen-und-animation`: Sinus/Cosinus, Phase, `iTime`.
- `07-taylor-approximation`: Sinus- oder Cosinus-Approximation gegen Referenz vergleichen; Approximation nicht nur behaupten, sondern sichtbar machen.

## Phase 5 — Zufall, Noise, fBm
- `08-value-noise`: Pseudozufall + vorgegebene Gitter-/Interpolationsbasis.
- `09-fbm`: mehrere Noise-Oktaven, sichtbarer Aufbau; Wolken/Marmor als mögliche Ergebnisse.

## Phase 6 — Unterrichtsvorbereitung und Veröffentlichung
- Alle START-/ZIEL-Stände mit der lokalen Vorschau prüfen.
- Links und Handout-Referenzen ordnen; Tastatureingaben/Sonderzeichen minimieren.
- Erst jetzt ShaderToy-Demos anlegen und Links dokumentieren. Keine automatisierte Veröffentlichung ohne Auftrag.
- Galerie-Beispiele auswählen, externe Werke korrekt zuordnen und Quellen nennen.

## Provisorische Ablaufskizze (aus letztem Planungsstand, noch nicht final beschlossen)

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

## Umsetzungskonvention
Empfohlenes Schema: `demos/<NN>-<name>/START.glsl` und `demos/<NN>-<name>/ZIEL.glsl` sowie eine knappe `README.md` je Demo (Lernziel, Mathematik, sichtbarer Unterschied). Die konkreten Phasendateien und der lokale Runner sind noch zu implementieren.
