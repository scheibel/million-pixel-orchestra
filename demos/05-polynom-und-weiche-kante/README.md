# Polynom und weiche Kante

**Zielbild:** Ein kubisches Polynom macht den Rand eines Kreises weich.

**Mathematik:** fragCoord und iResolution.xy bestimmen die Position relativ zur Bildmitte; die Division durch die Bildhöhe hält den Kreis rund. Der Abstand wird über ein schmales Randintervall auf t zwischen 0 und 1 abgebildet. 3t² − 2t³ verläuft an beiden Enden flach und mischt Innen- und Außenfarbe weich.

`START.glsl` ist vorläufig ein einfacher weißer Ausgangspunkt. `ZIEL.glsl` zeigt das Zielbild. Beide Dateien sind vollständige ShaderToy-Image-Snippets.
