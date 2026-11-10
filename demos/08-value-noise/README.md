# Value Noise

**Zielbild:** Interpolierte Pseudozufallswerte ergeben ein weiches Muster.

**Mathematik:** fragCoord ist die Pixelposition, iResolution.xy die Bildgröße; die Division durch die Bildhöhe sorgt für quadratische Gitterzellen. Eine vorbereitete Hashfunktion erzeugt reproduzierbare Pseudozufallswerte an Gitterpunkten. Das Polynom 3t² − 2t³ glättet die Interpolation zwischen vier Eckwerten.

`START.glsl` ist vorläufig ein einfacher weißer Ausgangspunkt. `ZIEL.glsl` zeigt das Zielbild. Beide Dateien sind vollständige ShaderToy-Image-Snippets.
