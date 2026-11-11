# Tafelbilder – Entwurf

**Geklärte Verwendung:** Der Vortragende erhält die Tafelbilder ausgedruckt als Vorlage zum Live-Anzeichnen. Dieselben vollständigen Endstände sollen zusätzlich in die statischen Vortragsfolien aufgenommen werden, falls das Anzeichnen entfällt. Diese Folieneinbindung ist noch offen. Das Code-Journal ist ein separates Druckartefakt.

Acht A4-Seiten im Querformat begleiten den fachlichen Ablauf von Pixeln bis fBm. Jede Seite zeigt den fertigen Zusammenhang und nennt unten eine mögliche Reihenfolge für den Aufbau an Tafel oder Whiteboard. Die PDF-Seiten lassen sich einzeln ausdrucken oder direkt zeigen; für die Projektion empfiehlt sich die Vollbildansicht.

| Seite | Inhalt | Bezug |
| --- | --- | --- |
| 1 | Pixelraster und Shader-Eingaben | Einstieg |
| 2 | RGB und zeitabhängige Farbe | Demo 1 |
| 3 | Pixelkoordinaten, Normierung und Farbverlauf | Demo 2 |
| 4 | Abstand, quadrierter Abstand und Kreis | Demo 3 |
| 5 | Felder, Überlagerung und Metaballs | Demo 3 |
| 6 | Raute, Fahrt und Halt; Lerp, Smoothstep, Smootherstep für Weg und Farbwechsel | Demo 4 |
| 7 | UV-Bild, Pixelzufall, interpolierte Gitterwerte und Simplex als alternative Noise-Basis | Demo 5 |
| 8 | Simplex-Oktaven, fBm, Wolkendichte/Farbe und zeitliche Verschiebung | Demo 6 |

Die Tafelseiten sind ein didaktischer Entwurf. Die früheren Seiten zu Wellen und Taylor entfallen. Seite 7 unterscheidet Value Noise (interpolierte skalare Gitterwerte) von Simplex Noise (gewichtete Gradientenbeiträge auf einem Dreiecksgitter). Seite 8 verwendet dieselbe Simplex-Basis und führt über fBm und Wolkengestaltung zur Animation. Demo 4 verwendet seit 11. November 2026 eine eigene Raute mit Punktbewegung und Schwarz–Eckfarbe–Schwarz im Halt; Seite 6 zeigt die fünf Stände 1 Punkt LERP → 2 Punkte LERP → 2 Punkte Smoothstep → 4 Punkte Smoothstep → 4 Punkte Smootherstep sowie die Auswahl der Stimmen 1 und 3 in Phase 2/3 (0/3 Sekunden Verzögerung) und den vollständigen Kanon ab Phase 4 (0/1,5/3/4,5 Sekunden). Die Nummern der Tafelseiten sind keine Demo-Nummern.

Die RGB-Balken auf Seite 2 verwenden Rot, Grün und Blau. Alle acht frisch gebauten Druckseiten werden unverändert in den Anhang des Vortrags eingebunden. Links von Folien 6–13 führen dorthin, Rücksprunglinks zurück zur jeweiligen Konzeptfolie. Der gemeinsame Dokument-Build erzeugt deshalb die Tafelbilder vor dem Vortrag.

## PDF erstellen

Voraussetzungen: eine lokale LaTeX-Distribution mit `pdflatex`, PGF/TikZ, `babel` mit deutscher Sprachunterstützung, `geometry` und AMS-Mathematikpaketen. Automatisiert vom Repository-Hauptverzeichnis aus mit `npm run build:pdf` (alle drei Dokumente) oder `npm run build` (zusätzlich Website). Direkter LaTeX-Aufruf:

```sh
mkdir -p tafelbilder/build
pdflatex -interaction=nonstopmode -halt-on-error -output-directory=tafelbilder/build tafelbilder/tafelbilder.tex
```

Das druckbare Ergebnis liegt unter `tafelbilder/build/tafelbilder.pdf`; die bearbeitbare Quelle ist `tafelbilder.tex`. Die daneben liegende `tafelbilder.pdf` ist die versionierte Druckfassung der acht Seiten. Das Build-Verzeichnis ist nicht versioniert. Der Gesamtbuild erzeugt die PDFs lokal; die Einbindung in die Website und PDF-Veröffentlichung bleiben zurückgestellt.
