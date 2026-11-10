# fBm: Wolken aus Noise

**Zielbild:** Mehrere unterschiedlich große Noise-Muster ergeben eine Wolkentextur.

**Mathematik:** fragCoord und iResolution.y ergeben Koordinaten mit gleich großen Einheiten auf beiden Achsen. Die vorbereitete Value-Noise-Funktion interpoliert Pseudozufallswerte im Gitter. Vier Oktaven mit jeweils doppelter Frequenz und halbem Gewicht überlagern grobe und feine Strukturen. Die Gewichtssumme 0,9375 normalisiert das Ergebnis.

`START.glsl` ist vorläufig ein einfacher weißer Ausgangspunkt. `ZIEL.glsl` zeigt das Zielbild. Beide Dateien sind vollständige ShaderToy-Image-Snippets.
