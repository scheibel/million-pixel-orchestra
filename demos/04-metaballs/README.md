# Metaballs

**Zielbild:** Zwei Abstandsfelder verbinden sich zu einer zusammenhängenden Form.

**Mathematik:** Die Pixelposition fragCoord wird relativ zur Bildmitte mit der Bildhöhe iResolution.y skaliert, damit Abstände auf beiden Achsen gleich groß sind. Jedes Feld fällt mit dem quadrierten Abstand ab. Ihre Summe überschreitet auch zwischen den Zentren den Schwellenwert; so verbinden sich die Formen. 0,01 begrenzt den Feldwert im Zentrum.

`START.glsl` ist vorläufig ein einfacher weißer Ausgangspunkt. `ZIEL.glsl` zeigt das Zielbild. Beide Dateien sind vollständige ShaderToy-Image-Snippets.
