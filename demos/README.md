# Shader-Demos und Bildspezifikation

Ein Bild wird durch ein vollständiges **ShaderToy-Image-Snippet** definiert. Für jedes Pixel berechnet dieselbe Funktion seine Farbe:

```glsl
void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec3 color = vec3(0.08, 0.45, 0.48);
    fragColor = vec4(color, 1.0);
}
```

Keine lokale Hilfsfunktion, eigene `main`-Funktion, `#version`-Zeile oder Uniform-Deklarationen ergänzen. Die Ausführungsumgebung stellt das technische Gerüst bereit. Alpha `1.0` ergibt eine deckende Farbe.

## Verfügbare Eingaben

| Eingabe | Bedeutung in der lokalen Vorschau |
| --- | --- |
| `fragCoord` (`vec2`) | Pixelposition im Framebuffer, Ursprung links unten; erstes Pixelzentrum bei `(0.5, 0.5)` |
| `iResolution` (`vec3`) | Tatsächliche Framebufferbreite und -höhe einschließlich Gerätepixeldichte; dritte Komponente `1.0` |
| `iTime` (`float`) | Animationszeit in Sekunden; über Wiedergabe/Pause und Zurücksetzen steuerbar |

Eine konstante Farbe benötigt nur den RGB-Vektor. Position und Auflösung vor ihrer Verwendung fachlich erklären. Eine spätere Koordinatenumrechnung muss das Seitenverhältnis berücksichtigen: Getrenntes Normieren von x und y auf `[0, 1]` garantiert keine gleich großen Abstandseinheiten. Der Viewer nimmt dem Shader diese Entscheidung nicht ab und verformt das gerenderte Bild nicht nachträglich.

Keine Texturen, Kanäle, Maus-, Tastatur-, Audio- oder zusätzliche Uniform-Eingaben verwenden. Vorbereitete Noise-Basisfunktionen stehen direkt in den jeweiligen vollständigen Snippets.

## Eine Demo aus der Vorlage erstellen

1. `templates/demo/` nach `demos/<name>/` kopieren.
2. In `demo.json` die eindeutige `id`, `title`, `summary` und `math` anpassen. Beschreibende Texte sind auf Deutsch.
3. Die vollständigen `START.glsl`- und `ZIEL.glsl`-Dateien bearbeiten. Zwischenstände als weitere selbsterklärend benannte GLSL-Dateien ergänzen.
4. Jeden Stand in `snapshots` eintragen. Die Listenreihenfolge bestimmt die Schaltflächenreihenfolge.
5. Den Manifestpfad in `site/catalog.json` unter `demos` ergänzen. Diese Liste bestimmt die Reihenfolge auf der Landingpage.
6. Seite neu laden, jeden Stand kompilieren und den sichtbaren Unterschied prüfen. Danach `npm test`, `npm run build:site` und bei verfügbarem Chromium `npm run test:browser` ausführen. `npm run build` baut zusätzlich die PDFs und benötigt LaTeX.

Beispiel für einen zusätzlichen Stand zwischen `start` und `ziel`:

```json
{
  "id": "zwischenstand",
  "label": "Zwischenstand · Mehr Rot",
  "file": "01-mehr-rot.glsl",
  "description": "Der größere Rotanteil verändert die Farbe des gesamten Bildes."
}
```

## Metadatenvertrag

- Demo- und Stand-IDs bestehen aus Kleinbuchstaben, Zahlen und trennenden Bindestrichen. Demo-IDs sind im Katalog eindeutig, Stand-IDs innerhalb einer Demo.
- `title`, `summary`, `math`, `label` und `description` sind nicht leere Texte. Die Demo-`README.md` ergänzt Lernziel, Mathematik und sichtbare Änderung.
- Für eine vollständige Live-Demo sind `start` und `ziel` erforderlich; beliebig viele weitere Stände sind möglich. Solange ein START-Stand noch fehlt, kann ein einzelner ZIEL-Stand registriert werden. Anfangs wird `start` geladen, sofern vorhanden, sonst der erste Stand.
- `file` ist relativ zu `demo.json` und verweist auf eine vollständige GLSL-Datei. Nur lokale relative Pfade ohne `..`, versteckte Pfadteile oder externe URLs sind erlaubt.
- Optional besitzt jeder Stand `shadertoyUrl` der Form `https://www.shadertoy.com/view/<ID>`. Nur tatsächlich vorhandene, geprüfte Projekte eintragen. Die Landingpage zeigt alle hinterlegten Stand-Links unter der jeweiligen Demo. Im Editor wird der veröffentlichte Link für den gewählten Stand angezeigt; ohne URL erscheint ein Hinweis und ein Link zu einem neuen Projekt. Die Übertragung ist ein eigener Auftrag.
- Browserentwürfe verändern keine Dateien. Sie bleiben je Stand bis zum Neuladen erhalten; „Stand wiederherstellen“ lädt die vorbereitete Fassung.

Bei aufeinanderfolgenden Ständen den bestehenden Rahmen erhalten: pro Schritt möglichst nur die fachliche Änderung, keine unabhängigen Änderungen an Farben oder Namen. Vorbereitete Basisblöcke ergänzen; einheitliche Wertebereiche ermöglichen den Austausch eines Funktionsaufrufs.

Der Build prüft Metadaten, vorhandene Dateien und die grundlegende Snippet-Struktur. Die tatsächliche GLSL-Kompilierung und das Bild werden im Browser geprüft. Neue Demos erfordern keine Änderung am Editor oder Renderer.
