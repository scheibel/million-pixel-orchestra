# Code-Journal – Druckfassung

Das Code-Journal ist die separate Arbeitsunterlage für den Vortragenden. Die bisherigen 19 Codevergleiche sind aus dem projizierten Vortrag herausgelöst und werden auf je einer A4-Seite im Hochformat ausgegeben.

`journal.tex` definiert das Drucklayout; `code-schritte.tex` enthält die übernommenen Übergänge mit Bisher-/Jetzt-Code, Dateinamen, Quellzeilennummern sowie Hinweisen zum Live-Programmieren und mündlichen Erläutern. Dunkle Schrift, sparsame graue Flächen und ausdrückliche Beschriftungen unterstützen auch den Graustufendruck. Das Journal verwendet keinen Beamer-Stil.

| Demo | Thema | Seiten |
| --- | --- | --- |
| 1 | Farbe und Zeit | 1–3 |
| 2 | Pixelposition und Farbverlauf | 4–5 |
| 3 | Kreis und Metaballs | 6–9 |
| 4 | Polynome für Bewegung und Farbe | 10–13 |
| 5 | Vom Zufall zu Noise | 14–16 |
| 6 | Wolken aus Noise | 17–19 |

Dieser erste Schritt übernimmt die bisherigen Codeauszüge und Erklärungen. Die vollständigen START-Codes und benötigten Basisblöcke als lückenlose Abtippvorlage sind anschließend noch zu ergänzen bzw. zu prüfen. Die vollständigen versionierten Shader liegen weiterhin unter `demos/`.

## PDF bauen

Vom Repository-Hauptverzeichnis aus:

```sh
npm run build:pdf
```

Der gemeinsame Dokument-Build erzeugt Vortragsfolien, Tafelbilder und `code-journal/build/journal.pdf`. `npm run build` baut danach zusätzlich die Website. Für das Journal werden pdfLaTeX mit `babel` einschließlich Deutsch, `geometry`, `xcolor` und den AMS-Paketen benötigt; diese gehören bereits zur dokumentierten LaTeX-Ausstattung.

Alle vier PDFs (lokaler Vortrag, Website-Fassung, Tafelbilder und Journal) werden zuerst temporär gebaut. Erst bei vollständigem Erfolg werden die bestehenden Ausgabedateien mit erhaltenen Inodes überschrieben. Das Build-Verzeichnis wird ignoriert; das Journal wird nicht in die Website übernommen oder veröffentlicht.
