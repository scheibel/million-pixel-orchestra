# AGENTS.md — Codex-Arbeitsanweisungen

## Auftrag
Entwickle eine kleine, versionierte Sammlung didaktisch aufeinander aufbauender **ShaderToy-kompatibler Fragment-Shader** für den 90-Minuten-Oberstufenworkshop „Grafiken programmieren – Mit Mathematik zu Millionen Pixeln“.

Vor relevanten Änderungen die Dateien `CONTEXT.md` und `ROADMAP.md` lesen. Diese Dateien bilden die fachliche Grundlage. `CONTEXT.md` unterscheidet verbindliche Entscheidungen von Planungsvorschlägen; diese Trennung respektieren.

## Technische Leitplanken
- Workshopinhalt ist die direkte Berechnung der Farbe eines Pixels: `color = f(x, y, t)`.
- Beispiele als kopierbare GLSL-ShaderToy-Snippets mit `mainImage(out vec4 fragColor, in vec2 fragCoord)` erstellen.
- Es sind die ShaderToy-Eingaben `fragCoord`, `iResolution` und, sobald nötig, `iTime` zu verwenden. Keine Maus-/Tastatursteuerung, keine Texturen, kein Audio und keine zusätzlichen Uniform-Parameter in den Lehrbeispielen.
- Es geht ausschließlich um Fragment-Shader und Pixelberechnung, **nicht** um Vertex-Shader, Geometriemodelle, Rasterisierungspipelines oder deren Erklärung.
- Die Mathematik darf sichtbar sein: kleine, verständliche Ausdrücke, nachvollziehbare Variablen, keine unnötigen Abstraktionen. Keine magischen Hilfsfunktionen ohne Einordnung; bei Noise sind vorbereitete Basisfunktionen explizit vorgesehen.
- Vor allem bei Koordinaten: die Pixelposition (`fragCoord`) und Auflösung (`iResolution`) zuerst erklären. Seitenverhältnis berücksichtigen und nachvollziehbar zeigen, welche Koordinaten benutzt werden.
- Lokale Vorschau darf zusätzliche Entwicklungshilfen besitzen. Diese sind **nicht** Bestandteil der Live-Demos und dürfen die ShaderToy-Kompatibilität nicht beeinträchtigen.
- Abhängigkeiten minimal halten; bevorzugt eine kleine WebGL2-basierte lokale Vorschau. Kein schweres Rendering-Framework ohne begründeten Bedarf.

## Didaktische Leitplanken
- Ein anfänglicher Boilerplate-Block erklärt Raster, `fragCoord`, `iResolution`, Fragment-Shader-Ausführung und RGB.
- Bei jeder live entwickelten Demo einen `START`- und einen `ZIEL`-Stand als separate Shader-Snippets vorsehen. Der START-Stand ist zum Abtippen geeignet, der ZIEL-Stand zeigt die abgeschlossene Änderung.
- Konzepte und Mathematik unmittelbar dort erklären, wo sie verwendet werden, statt sie in einem isolierten Theorieblock vorwegzunehmen.
- Progression: konstante Farbe → Positionsabhängigkeit → geometrische Formen/Kombinationen → weiche Übergänge/Polynome → zeitabhängige Grafik/Sinus/Taylor → Pseudozufall/Noise/fBm.
- Keine separate Einheit zu Nutzerinteraktion oder Parametrisierung. Eigenschaften werden allenfalls direkt im Shadercode geändert.
- Die anspruchsvolleren Themen Matrizen/Rotation, Ray Marching/Intersektionstests und Stochastik gehören **nur** zur Inspirationsgalerie, nicht zum Live-Coding.
- Keine Live-Demos zu Gras oder Voronoi.

## Arbeitsweise
- In kleinen, prüfbaren Schritten vorgehen. Neue Features und Demos einzeln umsetzen.
- Jeder Demo-Schritt bekommt selbsterklärende Dateinamen und eine kurze Beschreibung des mathematischen Kerngedankens.
- Zum Schluss eines Schritts: lokale Kompilierbarkeit/visuelle Vorschau prüfen, ShaderToy-Kompatibilität soweit möglich überprüfen und Änderungen knapp dokumentieren.
- Keine Veröffentlichung auf ShaderToy oder externen Diensten ohne expliziten Auftrag.
- Nicht automatisch über die vereinbarte Phase hinaus implementieren. `ROADMAP.md` nach geklärten Entscheidungen aktualisieren.
- Git-Commits nur auf ausdrücklichen Auftrag oder nach entsprechender Abstimmung; Änderungen commit-fähig halten.
