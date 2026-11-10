# Pixelposition und Normalisierung

**Zielbild:** Rot und Grün zeigen die normierte Pixelposition.

**Mathematik:** fragCoord gibt die Pixelposition vom linken unteren Rand aus an; iResolution.xy enthält Breite und Höhe. Durch komponentenweise Division entstehen uv-Koordinaten zwischen 0 und 1. Für geometrische Abstände wäre anschließend eine Seitenverhältniskorrektur nötig.

`START.glsl` ist vorläufig ein einfacher weißer Ausgangspunkt. `ZIEL.glsl` zeigt das Zielbild. Beide Dateien sind vollständige ShaderToy-Image-Snippets.
