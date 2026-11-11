# Tafelbilder – Entwurf

Zehn A4-Seiten im Querformat begleiten den fachlichen Ablauf von Pixeln bis fBm. Jede Seite zeigt den fertigen Zusammenhang und nennt unten eine mögliche Reihenfolge für den Aufbau an Tafel oder Whiteboard. Die PDF-Seiten lassen sich einzeln ausdrucken oder direkt zeigen; für die Projektion empfiehlt sich die Vollbildansicht.

| Seite | Inhalt | Bezug |
| --- | --- | --- |
| 1 | Pixelraster und Shader-Eingaben | Einstieg |
| 2 | RGB und zeitabhängige Farbe | Demo 1 |
| 3 | Pixelkoordinaten, Normierung und Farbverlauf | Demo 2 |
| 4 | Abstand, quadrierter Abstand und Kreis | Demo 3 |
| 5 | Felder, Überlagerung und Metaballs | Demo 3 |
| 6 | Raute, Fahrt und Halt; Lerp, Smoothstep, Smootherstep für Weg und Farbwechsel | Demo 4 |
| 7 | Sinus, Amplitude, Frequenz und Phase | Wellen |
| 8 | Sinus und Taylorpolynom | Approximation |
| 9 | Gitterwerte und Interpolation | Value Noise |
| 10 | Überlagerung von Noise-Oktaven | fBm |

Die Tafelseiten sind ein didaktischer Entwurf. Das Meerbild auf Seite 7 ist ein Motivvorschlag und noch kein umgesetzter Shader. Demo 4 verwendet seit 11. November 2026 eine eigene Raute mit Punktbewegung und Schwarz–Eckfarbe–Schwarz im Halt; Seite 6 zeigt die fünf Stände 1 Punkt LERP → 2 Punkte LERP → 2 Punkte Smoothstep → 4 Punkte Smoothstep → 4 Punkte Smootherstep sowie die Auswahl der Stimmen 1 und 3 in Phase 2/3 (0/3 Sekunden Verzögerung) und den vollständigen Kanon ab Phase 4 (0/1,5/3/4,5 Sekunden). Die Nummern der Tafelseiten sind keine Demo-Nummern.

## PDF erstellen

Voraussetzungen: eine lokale LaTeX-Distribution mit `pdflatex`, PGF/TikZ, `babel` mit deutscher Sprachunterstützung, `geometry` und AMS-Mathematikpaketen. Automatisiert vom Repository-Hauptverzeichnis aus mit `npm run build:pdf` (beide Dokumente) oder `npm run build` (zusätzlich Website). Direkter LaTeX-Aufruf:

```sh
mkdir -p tafelbilder/build
pdflatex -interaction=nonstopmode -halt-on-error -output-directory=tafelbilder/build tafelbilder/tafelbilder.tex
```

Das druckbare Ergebnis liegt unter `tafelbilder/build/tafelbilder.pdf`; die bearbeitbare Quelle ist `tafelbilder.tex`. Das Build-Verzeichnis ist nicht versioniert. Der Gesamtbuild erzeugt die PDFs lokal; die Einbindung in die Website und PDF-Veröffentlichung bleiben zurückgestellt.
