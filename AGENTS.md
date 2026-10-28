# AGENTS.md — Codex-Arbeitsanweisungen

## Auftrag
Entwickle versionierte deutsche Lehrmaterialien für den 90-Minuten-Oberstufenworkshop „Grafiken programmieren – Mit Mathematik zu Millionen Pixeln“: eine kleine Sammlung didaktisch aufeinander aufbauender **ShaderToy-kompatibler Fragment-Shader** sowie die Quellen für **LaTeX-Beamer-Folien und Tafelbilder**.

Vor relevanten Änderungen die Dateien `CONTEXT.md` und `ROADMAP.md` lesen. Diese Dateien bilden die fachliche Grundlage. `CONTEXT.md` unterscheidet verbindliche Entscheidungen von Planungsvorschlägen; diese Trennung respektieren.

## Sprache und Lehrmaterialien
- Die Lehrmaterialien sind auf Deutsch zu verfassen. Das gilt auch für beschreibende Texte auf Webseiten und insbesondere für Folien.
- Quellcode darf auf Englisch sein; eingebettete Codebeispiele dürfen englische Bezeichner beibehalten.
- Neben den Demos gehören auch die bearbeitbaren Quellen für Folien und Tafelbilder ins Repository. Folien werden mit LaTeX Beamer erstellt; das Quellformat der Tafelbilder ist noch offen.

## Technische Leitplanken
- Workshopinhalt ist die direkte Berechnung der Farbe eines Pixels: `color = f(x, y, t)`.
- Beispiele als kopierbare GLSL-ShaderToy-Snippets mit `mainImage(out vec4 fragColor, in vec2 fragCoord)` erstellen.
- Es sind die ShaderToy-Eingaben `fragCoord`, `iResolution` und, sobald nötig, `iTime` zu verwenden. Keine Maus-/Tastatursteuerung, keine Texturen, kein Audio und keine zusätzlichen Uniform-Parameter in den Lehrbeispielen.
- Es geht ausschließlich um Fragment-Shader und Pixelberechnung, **nicht** um Vertex-Shader, Geometriemodelle, Rasterisierungspipelines oder deren Erklärung.
- Die Mathematik darf sichtbar sein: kleine, verständliche Ausdrücke, nachvollziehbare Variablen, keine unnötigen Abstraktionen. Keine magischen Hilfsfunktionen ohne Einordnung; bei Noise sind vorbereitete Basisfunktionen explizit vorgesehen.
- Vor allem bei Koordinaten: die Pixelposition (`fragCoord`) und Auflösung (`iResolution`) zuerst erklären. Seitenverhältnis berücksichtigen und nachvollziehbar zeigen, welche Koordinaten benutzt werden.
- Lokale Vorschau darf zusätzliche Entwicklungshilfen besitzen. Diese sind **nicht** Bestandteil der Live-Demos und dürfen die ShaderToy-Kompatibilität nicht beeinträchtigen.
- Abhängigkeiten minimal halten; bevorzugt eine kleine WebGL2-basierte lokale Vorschau. Kein schweres Rendering-Framework ohne begründeten Bedarf.
- Eine deutsche Landingpage erschließt Demos und Lehrmaterialien. Ein einfacher lokaler HTTP-Server macht die Website samt Demo-Vorschau zugänglich.
- Der vollständige Release-Build läuft auf dem Entwicklergerät, setzt dort eine passende LaTeX-Distribution einschließlich benötigter Pakete voraus und erzeugt in `dist/` die statische Website samt Demos und verlinkten PDF-Downloads für Folien und Tafelbilder.
- Das gesamte Release-Ergebnis muss auf GitHub Pages hostbar sein: kein erforderliches Server-Backend, Pfade auch unter einem Repository-Unterverzeichnis funktionsfähig.
- Für die Veröffentlichung wird das lokal fertig gebaute `dist/`-Bundle in die GitHub-Pages-Veröffentlichungsquelle gepusht. Keine GitHub-Actions-Workflows für Build oder Deployment vorsehen; auf GitHub Pages keine LaTeX-Distribution oder Projekt-Build-Werkzeuge voraussetzen. Build und Veröffentlichung sind getrennte Schritte.
- Lokale Demo-Vorschau und vollständigen Release-Build getrennt nutzbar halten; für die Demo-Vorschau ist keine LaTeX-Installation erforderlich.

## Didaktische Leitplanken
- Ein anfänglicher Boilerplate-Block erklärt Raster, `fragCoord`, `iResolution`, Fragment-Shader-Ausführung und RGB.
- Bei jeder live entwickelten Demo einen `START`- und einen `ZIEL`-Stand als separate Shader-Snippets vorsehen. Der START-Stand ist zum Abtippen geeignet, der ZIEL-Stand zeigt die abgeschlossene Änderung.
- Konzepte und Mathematik unmittelbar dort erklären, wo sie verwendet werden, statt sie in einem isolierten Theorieblock vorwegzunehmen.
- Progression: konstante Farbe → Positionsabhängigkeit → geometrische Formen/Kombinationen → weiche Übergänge/Polynome → zeitabhängige Grafik/Sinus/Taylor → Pseudozufall/Noise/fBm.
- Keine separate Einheit zu Nutzerinteraktion oder Parametrisierung. Eigenschaften werden allenfalls direkt im Shadercode geändert.
- Die anspruchsvolleren Themen Matrizen/Rotation, Ray Marching/Intersektionstests und Stochastik gehören **nur** zur Inspirationsgalerie, nicht zum Live-Coding.
- Keine Live-Demos zu Gras oder Voronoi.

## Arbeitsweise
- Planung in drei Bereichen führen: Features des Rahmenwerks, externe Integrationen (ShaderToy/GitHub Pages) und Workshopinhalt. Integrationsanforderungen früh berücksichtigen; Veröffentlichung bleibt ein eigener Schritt. Die hierarchische Inhaltsplanung erfolgt später.
- In kleinen, prüfbaren Schritten vorgehen. Neue Features und Demos einzeln umsetzen.
- Jeder Demo-Schritt bekommt selbsterklärende Dateinamen und eine kurze Beschreibung des mathematischen Kerngedankens.
- Zum Schluss eines Schritts: lokale Kompilierbarkeit/visuelle Vorschau prüfen, ShaderToy-Kompatibilität soweit möglich überprüfen und Änderungen knapp dokumentieren.
- Keine Veröffentlichung auf ShaderToy oder externen Diensten ohne expliziten Auftrag.
- Nicht automatisch über das vereinbarte Arbeitspaket hinaus implementieren. Die didaktische Reihenfolge ist keine Implementierungsfolge des Rahmenwerks. `ROADMAP.md` nach geklärten Entscheidungen aktualisieren.
- Git-Commits nur auf ausdrücklichen Auftrag oder nach entsprechender Abstimmung; Änderungen commit-fähig halten.
