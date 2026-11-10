# Farbverlauf

**Zielbild:** Ein Farbverlauf mischt zwei Farben entlang der horizontalen Position.

**Mathematik:** Die Pixelposition fragCoord wird durch die Auflösung iResolution.xy geteilt. uv.x läuft von links nach rechts von 0 bis 1. mix berechnet die lineare Mischung (1 − uv.x) · links + uv.x · rechts. Für diesen Verlauf sind gleich große Abstandseinheiten nicht erforderlich.

`START.glsl` ist vorläufig ein einfacher weißer Ausgangspunkt. `ZIEL.glsl` zeigt das Zielbild. Beide Dateien sind vollständige ShaderToy-Image-Snippets.
