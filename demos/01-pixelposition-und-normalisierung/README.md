# Pixelposition und Farbverlauf

**Stände:** START ist vorläufig weiß. Im Zwischenstand werden die normierten Pixelkoordinaten als Rot und Grün sichtbar; ZIEL nutzt die horizontale Position für einen Farbverlauf.

**Mathematik:** `fragCoord` ist die Pixelposition, `iResolution.xy` die Bildgröße. `uv = fragCoord / iResolution.xy` normiert beide Achsen. `mix(links, rechts, uv.x)` mischt die Farben linear. Für geometrische Abstände wird später das Seitenverhältnis berücksichtigt.

Alle Stände sind vollständige ShaderToy-Image-Snippets.
