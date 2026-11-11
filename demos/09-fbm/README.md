# Demo 6 · Wolken aus Noise

**Abfolge:** Simplex Noise → fBm → Wolkengestaltung → Animation.

| Stand | Datei | Mathematischer Kerngedanke |
| --- | --- | --- |
| START · Simplex Noise | `START.glsl` | Unveränderter Anschluss an Demo 5: ein statisches Grauwertmuster. |
| Phase 1 · fBm | `01-fbm.glsl` | Vier Oktaven: Frequenz verdoppeln, Gewicht halbieren; Summe normalisieren. |
| Phase 2 · Wolken | `02-wolken.glsl` | Mit `smoothstep` Wolkendichte gestalten, mit `mix` zwischen Himmelblau und Weiß mischen. |
| Phase 3 · Animation · ZIEL | `ZIEL.glsl` | Die Abfrageposition mit `iTime` verschieben; das vorhandene Muster wandert. |

**Lernziel:** Eine bekannte Noise-Funktion wird durch Skalierung, Addition, Gewichtung, Farbmischung und zeitliche Verschiebung zu einem gestalteten Bild. Die Basis bleibt in allen Ständen gleich; jede Phase ergänzt eine sichtbare Änderung.

Die Koordinaten `p = fragCoord / iResolution.y * 6.0` haben gleich große Einheiten auf beiden Achsen. Größere Argumente `2p`, `4p`, `8p` erzeugen kleinere Strukturen. Die Gewichte 0,5; 0,25; 0,125; 0,0625 ergeben zusammen 0,9375. Jede Oktave verwendet bereits `simplexNoise01(p)` mit Werten zwischen 0 und 1. Die Summe wird nur noch durch 0,9375 geteilt; dadurch entsteht ein gewichteter Mittelwert im selben Bereich.

Die Oktavsumme wird in der Computergrafik als fBm bezeichnet (fraktionale Brownsche Bewegung); im Workshop dient sie als endliche Überlagerung mehrerer Maßstäbe, ohne stochastische Herleitung. In Phase 2 wählt `smoothstep(0.4, 0.65, wert)` den Übergang von klarem Himmel zu dichten Wolken. In Phase 3 kommt ausschließlich `p -= vec2(0.18, 0.06) * iTime` hinzu: Das Feld wandert nach rechts oben. Dies ist eine einfache prozedurale Wolkengestaltung mit Drift.

Alle vier Stände sind vollständige ShaderToy-Image-Snippets ohne Texturen oder zusätzliche Uniforms. START ist bytegleich mit dem ZIEL von Demo 5; die Wolkengestaltung entspricht bei Zeit null dem animierten ZIEL. Der vollständige Basisblock wird unverändert übernommen und nicht erneut hergeleitet; auch Hash und Value Noise aus Demo 5 bleiben als bekannte Bausteine enthalten. Phase 1 ergänzt nur die sichtbare Oktavsumme und ersetzt `simplexNoise01(p)` durch `fbm(p)`. Koordinaten, Namen und Basisfunktionen bleiben in allen vier Ständen gleich.

**Quelle und Lizenz:** [Ashima Arts / Ian McEwan, webgl-noise](https://github.com/ashima/webgl-noise/blob/master/src/noise2D.glsl), gepflegt von Stefan Gustavson, MIT-Lizenz. Vollständige Lizenzhinweise stehen in jedem Snippet; Funktionsname und Kommentare sind angepasst. Die technische ID `09-fbm` bleibt für vorhandene Links erhalten; die Vortragsnummer ist 6.
