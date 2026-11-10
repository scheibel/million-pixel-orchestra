# Kreis und bewegte Metaballs

**Stände:** START ist vorläufig weiß. Der erste Zwischenstand zeigt einen Kreis mit harter Kante, der zweite zwei statische Metaballs. Im ZIEL bewegen sich deren Mittelpunkte aufeinander zu und wieder auseinander.

**Mathematik:** `fragCoord` ist die Pixelposition, `iResolution.xy` die Bildgröße. Die auf die Bildhöhe bezogene Position hält den Kreis rund. `dot(p, p)` ergibt den quadrierten Abstand; der Kreis vergleicht ihn mit dem quadrierten Radius. Bei Metaballs werden zwei mit dem Abstand abfallende Felder addiert; oberhalb eines Schwellenwerts entsteht eine Form. `0.01` begrenzt die Felder in ihren Zentren. `sin(iTime)` bewegt die beiden Mittelpunkte symmetrisch.

Alle Stände sind vollständige ShaderToy-Image-Snippets.
