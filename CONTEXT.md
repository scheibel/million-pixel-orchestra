# Projektkontext — Million Pixels Vortrag MCG

*Kuratiertes Handover aus den Projektgesprächen bis 28. Oktober 2026. Dies ist eine fachliche Arbeitsgrundlage, kein vollständiger Chat-Export.*

## Veranstaltung und Zielgruppe
- **Workshop-Titel:** „Grafiken programmieren – Mit Mathematik zu Millionen Pixeln“.
- **Format:** 90 Minuten, Oberstufe am Marie-Curie-Gymnasium (MCG), gemeinsam entwickelte Live-Demos.
- **Geräte:** möglichst Schul-iPad oder eigener Laptop; dedizierte Tastatur vorteilhaft. Beamer/Smartboard und Tafel/Whiteboard. Sonderzeichen und Copy/Paste als praktische Hürde berücksichtigen.
- **Plattform für die abschließenden Demos:** ShaderToy. Die Beispiele sollen zuerst lokal versioniert entwickelt und erst später nach ShaderToy übertragen werden.

## Übergeordnete Lernziele (festgelegt)
1. Interesse an Informatikstudium und Programmieren wecken.
2. Computergrafik als Teilgebiet der Computer Science sichtbar machen.
3. Die Rolle von Mathematik für die Computergrafik praktisch verdeutlichen.
4. Über spannende visuelle Anwendungen für Mathematik motivieren.
5. Einen Baukasten zum selbstständigen Spielen und Vertiefen mitgeben.

## Inhaltlicher Kern (festgelegt)
- Farben/Farbräume (insbesondere RGB), Pixelraster und Pixelposition, Mathematik als unmittelbare Grundlage der Bildberechnung.
- Fragment-Shader-Denkmodell: Für die aktuelle Pixelposition wird die Farbe berechnet; dieselbe Berechnung wird über viele Pixel ausgeführt.
- ShaderToy-Schnittstelle: `fragCoord` (aktuelle Pixelposition), `iResolution` (Bildgröße), `iTime` (Animationszeit). Zuerst technische Minimalvorlage/Boilerplate erklären.
- Die Leitformel entwickelt sich von einer konstanten Farbe über `color = f(x, y)` zu `color = f(x, y, t)`. **Kein zusätzlicher Interaktionsparameter `p`.**
- Unmittelbar nacheinander passende mathematische Konzepte und kleine Live-Coding-Ergebnisse; keine Vorab-Mathematikvorlesung.
- Für jede Live-Demo **zwei vorbereitete ShaderToy-Stände `START` und `ZIEL`**, damit Teilnehmende den START-Stand übernehmen und zum ZIEL mitprogrammieren können.
- Im Workshop vorbereitete ShaderToy-Links zum Abtippen/Übernehmen nutzen; frühere gemeinsame Planung sieht keine Abhängigkeit vom erstmaligen Live-Erstellen von ShaderToy-Projekten vor.

## Geplante didaktische Progression (inhaltlich abgestimmt)
1. **Pixel & Farbe:** konstante Farbe; RGB als Farbvektor.
2. **Koordinaten:** `fragCoord` und `iResolution`; normierte Position; positionsabhängige Farben und Farbverlauf.
3. **Kreise:** Abstand und insbesondere quadrierter Abstand, `dot`; einfache Formen und Kombination mehrerer Kreise zu Metaballs.
4. **Weiche Übergänge:** Polynome und Herleitung einer kubischen glatten Interpolation, z. B. `3t² - 2t³`, anschließend Anwendung bei weichen Kanten.
5. **Wellen & Animation:** Sinus/Cosinus, Phase und `iTime`; anschließend Taylorapproximation von Sinus/Cosinus und Unterschied zwischen exakter Berechnung und Approximation.
6. **Noise:** Pseudozufall, Gitterwerte, Interpolation, Value Noise, fBm; Basisfunktionen für Noise werden vorbereitet, statt alles von Grund auf zu tippen. Visuelle Ergebnisse z. B. Wolken/Marmor.
7. **Inspirationsgalerie, keine Live-Herleitung:** Matrizen/Rotation, Ray Marching/Intersektionstests, stochastische Effekte.

## Bewusst außerhalb des Workshopumfangs (festgelegt)
- Keine selbstständige Einheit zu Maus, Tastatur, externen Steuerparametern oder UI-Interaktion.
- Keine explizite Geometrie, Vertex-Shader, Rasterisierungs-Pipeline oder allgemeine Rendererarchitektur.
- Keine Gras-Demo und keine Voronoi-Demo.
- Fortgeschrittene Galeriethemen nicht zusätzlich live programmieren.

## Rahmenzeiten
Ein früher Organisationsentwurf sah 2 Min Einstieg, 3 Min HPI, 75 Min fachlichen Workshop, 5 Min Ausblick auf LLMs, 3 Min HPI und 2 Min Outro vor. Eine jüngere Ablaufskizze mit detaillierten Demo-Minuten und 4 Min Puffer findet sich in `ROADMAP.md`. **Die minutengenaue Abstimmung und der Stellenwert des LLM-Ausblicks sind noch zu konsolidieren.**

## Bestehende Inspirationsreferenzen
Die folgenden ShaderToy-IDs wurden in den Projektgesprächen als Beispiele/Referenzen gesammelt (Zuordnung zu konkreten Live-Demos/Galerie vor Einsatz prüfen):
- `4df3Rn`
- `MltXz2`
- `XdlSDs`
- `WtfGDX`
- `mtyGWy`
- `fstyD4`

## Qualitätskriterien
- Alle Lehrbeispiele auf iPad/Laptop nachvollziehbar; geringe Tipp-Hürde, besonders für Sonderzeichen.
- Der Code ist kurz genug, um ihn im Unterricht sichtbar zu verändern.
- Die Mathematik erklärt das sichtbare Bild; Visualisierungen zeigen direkt, was eine Funktionsänderung bewirkt.
- Die Übungen bleiben als eigenständig veränderbare Snippets mit eindeutigen START-/ZIEL-Ständen erhalten.
