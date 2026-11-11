# Zielbilder der Demo-Übersicht

Folie 5 („Die sechs Demos im Überblick“) zeigt die sechs aktuellen Workshop-Demos in Katalogreihenfolge. Demo 1 wird durch eine direkt in LaTeX/TikZ gezeichnete RGB-Füllanzeige dargestellt; die fünf weiteren Vorschauen stammen direkt aus den ZIEL-Shadern. Die PNGs liegen lokal und werden versioniert; der PDF-Build benötigt weder Grafiktreiber noch Netzwerkzugriff.

Die RGB-Füllanzeige ist als `\rgbfuellanzeige` in `folien/vortrag.tex` definiert. Die Füllstände entsprechen dem ZIEL bei `iTime = 0`: Rot 0,5, Grün ungefähr 0,955 und Blau ungefähr 0,122. Pfeile an den Füllgrenzen deuten die momentane zeitliche Änderung an: Rot steigt, Grün und Blau fallen. Die einfarbige PNG-Vorschau bleibt als Renderreferenz erhalten, ist auf Folie 5 aber durch die Füllanzeige ersetzt.

| Bild | Demo | `iTime` in Sekunden |
| --- | --- | --- |
| `00-konstante-farbe.png` | Farbe und Zeit | 1,0 |
| `01-pixelposition-und-normalisierung.png` | Position und Farbverlauf | 0,0 |
| `03-kreis-und-quadrierter-abstand.png` | Kreis und Metaballs | 3,6 |
| `05-polynom-und-weiche-kante.png` | Bewegung und Farbe | 4,5 |
| `08-value-noise.png` | Vom Zufall zu Noise (Simplex-ZIEL) | 0,0 |
| `09-fbm.png` | Wolken aus Noise (animiertes ZIEL) | 8,0 |

Die Bilder sind Momentaufnahmen der Animationen. Demo 1 ist im Ziel räumlich einfarbig; Demo 4 zeigt vier Punkte mit Smootherstep und dem Farbwechsel während des Halts. Die Shader werden unverändert mit `mainImage`, `fragCoord`, `iResolution` und `iTime` ausgeführt. Die Auflösung beträgt 640 × 360 Pixel. Renderer, Zeitpunkte, Quellpfade und SHA-256-Prüfsummen der GLSL-Dateien stehen in `renderdaten.json`.

Zum Aktualisieren nach Shaderänderungen vom Repository-Hauptverzeichnis aus:

```sh
EGL_PLATFORM=surfaceless LIBGL_ALWAYS_SOFTWARE=1 python3 scripts/render-demo-previews.py
npm run build:pdf
```

Das optionale Renderwerkzeug benötigt unter Linux Python 3 und Mesa mit `libEGL.so.1` sowie `libGLESv2.so.2`. Es nutzt die Python-Standardbibliothek und rendert über OpenGL ES 3 mit demselben GLSL-ES-3.00-Rahmen wie die WebGL2-Vorschau. Es ersetzt keinen direkten Browser-/ShaderToy-Test und ist kein zusätzlicher Pflichtschritt im Release-Build.

Geprüft: Alle sechs ZIEL-Shader kompilieren und rendern mit Mesa llvmpipe. Quellprüfsummen, Bildmaße und Deckkraft stimmen. PDF-Seite 5 enthält die RGB-Füllanzeige und die fünf weiteren Zielbilder. `npm run build:pdf` läuft erfolgreich; die gerenderte Übersicht ist visuell geprüft und erzeugt keine LaTeX-Überstände.
