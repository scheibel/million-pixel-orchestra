# Demo 5 · Vom Zufall zu Noise

**Abfolge:** UV-Bild → Zufall pro Pixel → Value Noise → Simplex Noise.

| Stand | Datei | Mathematischer Kerngedanke |
| --- | --- | --- |
| START · UV-Bild | `START.glsl` | `fragCoord / iResolution.xy`: Rot zeigt x, Grün zeigt y; Rückgriff auf Demo 2. |
| Phase 1 · Zufall pro Pixel | `01-zufall-pro-pixel.glsl` | Ein reproduzierbarer Pseudozufallswert je ganzzahliger Pixelposition. |
| Phase 2 · Value Noise | `02-value-noise.glsl` | Zufallswerte am groben Gitter verankern; erst horizontal, dann vertikal mit dem bekannten Smoothstep-Polynom interpolieren. |
| ZIEL · Simplex Noise | `ZIEL.glsl` | Die vorbereitete Basis austauschen: gewichtete Gradientenbeiträge auf einem Dreiecksgitter. |

**Lernziel:** Unabhängige Pixelwerte wirken unruhig. Räumliche Zusammenhänge entstehen, wenn benachbarte Pixel dieselben Gitterdaten verwenden. `floor` wählt die Zelle, `fract` die Position darin; `mix` und `3t² − 2t³` knüpfen an Demo 2 und 4 an.

Die Werte sind Pseudozufall: gleicher Ort liefert innerhalb der jeweiligen Ausführung denselben Wert; ohne `iTime` flimmert nichts. Die Sinus-Hashfunktion wird als Basis bereitgestellt, nicht hergeleitet; ihre Ergebnisse müssen nicht auf jeder GPU bitgleich sein.

**Koordinaten:** Das UV-Bild verwendet beide Auflösungskomponenten und erreicht auf beiden Achsen 0…1. Für Noise wechseln wir sichtbar zu `fragCoord / iResolution.y * 6.0`: sechs Einheiten in der Höhe und gleich große Einheiten auf beiden Achsen, damit die Gitterzellen quadratisch bleiben.

**Value Noise und Simplex Noise unterscheiden:** Simplex ist keine zusätzliche Glättung derselben interpolierten Eckwerte. Value Noise interpoliert skalare Zufallswerte auf einem quadratischen Gitter; die bereitgestellte Simplex-Basis kombiniert Gradientenbeiträge von drei Ecken eines Dreiecksgitters. Die Herleitung gehört nicht zum Live-Coding. Untersucht werden Muster, Maßstab und die gemeinsame Schnittstelle „Position hinein, Wert heraus“. Zum Vergleich bleiben Maßstab und Graustufendarstellung gleich. Die vorbereitete Funktion `simplexNoise01(p)` bildet den ungefähren Bereich −1…1 mit `0.5 + 0.5 * simplexNoise(p)` auf 0…1 ab und begrenzt ihn mit `clamp` auf diesen Bereich. Value Noise und diese Schnittstelle liefern damit beide Werte zwischen 0 und 1.

**Minimale Änderungen:** Die beiden Koordinatenzeilen stehen bereits im START und bleiben erhalten. Phase 1 ergänzt den Zufallswert und wechselt zur Graustufenausgabe. Phase 2 ersetzt im Gestaltungs-Code nur den Zufallsaufruf durch `valueNoise(p)`; der erklärbare Interpolationsblock kommt darunter hinzu. Zum ZIEL wird ausschließlich `valueNoise(p)` durch `simplexNoise01(p)` ersetzt; die vorbereitete Simplex-Basis samt Schnittstelle kommt hinzu. Hash und Value Noise werden behalten. Funktionsdeklarationen stehen oben, der Gestaltungs-Code folgt, die Basisdefinitionen stehen darunter. So muss kein bisheriger Code verschoben oder gelöscht werden.

Alle vier Stände sind eigenständig kopierbare ShaderToy-Image-Snippets. Das ZIEL ist bytegleich mit dem START von Demo 6. Die technische ID `08-value-noise` bleibt für bestehende Links erhalten; die Vortragsnummer ist 5.

**Quelle der vorbereiteten Simplex-Basis:** [Ashima Arts / Ian McEwan, webgl-noise, 2D Simplex Noise](https://github.com/ashima/webgl-noise/blob/master/src/noise2D.glsl), gepflegt von Stefan Gustavson, MIT-Lizenz. Funktionsname und Kommentare sind angepasst. Der vollständige Lizenzhinweis steht im kopierbaren Snippet und in den entsprechenden Ständen von Demo 6.
