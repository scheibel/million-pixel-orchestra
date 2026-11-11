# Vortragsfolien – erster Entwurf

`vortrag.tex` enthält einen ersten deutschen LaTeX-Beamer-Foliensatz im 16:9-Format. Die 17 Folien folgen dem [Vortragsskelett](../docs/VORTRAGSSKELETT.md): Vorstellung, HPI, Überblick, Pixel und Boilerplate, eine Einstiegsfolie pro Demo, Galerie und Abschluss. Die Demo-Folien verweisen auf passende [Tafelbilder](../tafelbilder/README.md).

Die persönliche Vorstellung verwendet zwei Zeitstrahlfolien mit den angegebenen Stationen von 2000 bis 2027. Pfeile kennzeichnen Einträge mit angegebenem Beginn und offenem Ende. Die HPI-Folie enthält einen QR-Code und Link zu `https://hpi.de` sowie den Studienverlaufsplan des HPI, lokal unter `bilder/hpi-studienverlaufsplan.png` eingebunden. Quelle: [HPI-Studienverlaufsplan](https://hpi.de/fileadmin/_processed_/e/b/csm_DE-Muster-Studienverlaufsplan-BS-ITSE_7b52593d17.png) (vom Server als WebP geliefert und für LaTeX in PNG umgewandelt). Für ShaderToy-STARTs und die Workshop-Website sind lediglich beschriftete QR-Platzhalter vorgesehen; die Adressen und echte QR-Codes werden nach Bereitstellung und Prüfung ergänzt. Auftakt- und Galeriebeispiele sowie Quellen stehen noch aus. Das Meerbild und eine Zusammenlegung der weichen Kante mit den Metaballs sind Vorschläge, die weiterhin offen sind.

## PDF erstellen

Voraussetzungen: eine lokale LaTeX-Distribution mit `pdflatex`, Beamer, PGF/TikZ, `qrcode`, `babel` mit deutscher Sprachunterstützung, Latin Modern und AMS-Mathematikpaketen. Vom Repository-Hauptverzeichnis aus:

```sh
mkdir -p folien/build
pdflatex -interaction=nonstopmode -halt-on-error -output-directory=folien/build folien/vortrag.tex
pdflatex -interaction=nonstopmode -halt-on-error -output-directory=folien/build folien/vortrag.tex
```

Das Ergebnis ist `folien/build/vortrag.pdf`; die bearbeitbare Quelle ist `vortrag.tex`. Das Build-Verzeichnis ist nicht versioniert. Dieser direkte Aufruf ist unabhängig vom Website-Build; die gemeinsame Dokument- und Release-Pipeline (F2/F3) ist weiterhin offen.
