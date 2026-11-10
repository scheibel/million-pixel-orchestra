# Wellen und Animation

**Zielbild:** Eine Sinuskurve bewegt sich mit der Zeit über das Bild.

**Mathematik:** fragCoord bezeichnet die Pixelposition und iResolution.xy die Bildgröße. Die um die Bildmitte verschobenen Koordinaten werden durch die Bildhöhe geteilt. sin(10x − 2t) beschreibt die Höhe der Welle; iTime verschiebt ihre Phase. Ein schmaler Abstand zur Kurve färbt die Linie.

`START.glsl` ist vorläufig ein einfacher weißer Ausgangspunkt. `ZIEL.glsl` zeigt das Zielbild. Beide Dateien sind vollständige ShaderToy-Image-Snippets.
