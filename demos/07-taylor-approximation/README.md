# Taylorapproximation

**Zielbild:** Sinus und Taylorpolynom werden als zwei Kurven verglichen.

**Mathematik:** fragCoord ist die Pixelposition, iResolution.xy die Bildgröße. Die Position wird relativ zur Bildmitte mit der Bildhöhe skaliert; anschließend werden die x- und y-Achse für die Darstellung angepasst. Das Polynom x − x³/6 + x⁵/120 approximiert sin(x) um x = 0; weiter vom Ursprung weichen die Kurven sichtbar voneinander ab. Türkis zeigt den Sinus, Koralle das Polynom.

`START.glsl` ist vorläufig ein einfacher weißer Ausgangspunkt. `ZIEL.glsl` zeigt das Zielbild. Beide Dateien sind vollständige ShaderToy-Image-Snippets.
