# Kreis und quadrierter Abstand

**Zielbild:** Ein Abstandstest zeichnet einen Kreis mit harter Kante.

**Mathematik:** fragCoord ist die Pixelposition, iResolution.xy die Bildgröße. Nach Verschiebung zum Mittelpunkt werden beide Achsen durch die Bildhöhe geteilt: So entsprechen gleiche Koordinatenabstände gleichen Pixelabständen. dot(p, p) ist x² + y²; der Vergleich mit r² vermeidet eine Wurzel.

`START.glsl` ist vorläufig ein einfacher weißer Ausgangspunkt. `ZIEL.glsl` zeigt das Zielbild. Beide Dateien sind vollständige ShaderToy-Image-Snippets.
