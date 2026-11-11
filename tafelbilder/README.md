# Tafelbilder – Entwurf

Zehn A4-Seiten im Querformat begleiten den fachlichen Ablauf von Pixeln bis fBm. Jede Seite zeigt den fertigen Zusammenhang und nennt unten eine mögliche Reihenfolge für den Aufbau an Tafel oder Whiteboard. Die PDF-Seiten lassen sich einzeln ausdrucken oder direkt zeigen; für die Projektion empfiehlt sich die Vollbildansicht.

| Seite | Inhalt | Bezug |
| --- | --- | --- |
| 1 | Pixelraster und Shader-Eingaben | Einstieg |
| 2 | RGB und zeitabhängige Farbe | Demo 1 |
| 3 | Pixelkoordinaten, Normierung und Farbverlauf | Demo 2 |
| 4 | Abstand, quadrierter Abstand und Kreis | Demo 3 |
| 5 | Felder, Überlagerung und Metaballs | Demo 3 |
| 6 | Lineare und kubische Übergänge | Weiche Kante |
| 7 | Sinus, Amplitude, Frequenz und Phase | Wellen |
| 8 | Sinus und Taylorpolynom | Approximation |
| 9 | Gitterwerte und Interpolation | Value Noise |
| 10 | Überlagerung von Noise-Oktaven | fBm |

Die Tafelseiten sind ein didaktischer Entwurf. Das Meerbild auf Seite 7 ist ein Motivvorschlag und noch kein umgesetzter Shader. Eine Zusammenfassung der weichen Kante mit den Metaballs ist ebenfalls noch nicht beschlossen. Die Nummern der Tafelseiten sind keine Demo-Nummern.

## PDF erstellen

Voraussetzungen: eine lokale LaTeX-Distribution mit `pdflatex`, PGF/TikZ, `babel` mit deutscher Sprachunterstützung, `geometry` und AMS-Mathematikpaketen. Vom Repository-Hauptverzeichnis aus:

```sh
mkdir -p tafelbilder/build
pdflatex -interaction=nonstopmode -halt-on-error -output-directory=tafelbilder/build tafelbilder/tafelbilder.tex
```

Das druckbare Ergebnis liegt unter `tafelbilder/build/tafelbilder.pdf`; die bearbeitbare Quelle ist `tafelbilder.tex`. Das Build-Verzeichnis ist nicht versioniert. Dieser direkte PDF-Aufruf ist unabhängig vom Website-Build; die geplante gemeinsame Dokument- und Release-Pipeline (F2/F3) ist weiterhin offen.
