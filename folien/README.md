# Vortragsfolien – erster Entwurf

`vortrag.tex` enthält einen ersten deutschen LaTeX-Beamer-Foliensatz im 16:9-Format. Die 17 Folien folgen dem [Vortragsskelett](../docs/VORTRAGSSKELETT.md): Vorstellung, HPI, Überblick, Pixel und Boilerplate, eine Einstiegsfolie pro Demo, Galerie und Abschluss. Die Demo-Folien verweisen auf passende [Tafelbilder](../tafelbilder/README.md).

Die persönliche Vorstellung verwendet zwei Zeitstrahlfolien mit gemeinsamer Skala von 2000 bis 2027 und verkleinerter Beschriftung (6,3 pt für Stationen, 6,5 pt für Jahreszahlen). Programmieren als Hobby reicht von 2001 bis 2007; die Mitwirkung in Computerlehrgängen liegt zwischen 2004 und 2006. Drei rote, fortlaufende Zeiträume gliedern die berufliche Entwicklung direkt zwischen den Stationen: Softwaresystemingenieur seit 2007 (erste bezahlte Programmierarbeit) zwischen Webseitenprogrammierung und Bachelorstudium; Computergrafiker seit 2009 (erste Projekte in diesem Bereich) nach dem Masterstudium, zu Beginn der zweiten Timeline-Folie; Forscher in der Computergrafik seit 2013 (erste Forschungsprojekte mit anschließenden Publikationen) zwischen Open Source und Promotionsstudium. Die Consulting-Firma ist dem Bereich Computergrafiker zugeordnet. Dezente Gruppenflächen bündeln Kategorien und zugehörige Stationen. Die konkreten Stationen sind blau; ein Punkt markiert das Abitur. Dünne graue Jahreslinien ordnen Balken und Pfeile der Zeitachse zu; eine Legende entfällt. Pfeile kennzeichnen Einträge mit angegebenem Beginn und offenem Ende. Der Skalenendpunkt 2027 ist kein Enddatum für diese Tätigkeiten.

Auf „Wer bin ich?“ steht rechts oben das unveränderte [Porträt vom Februar 2016](https://www.willyscheibel.de/images/willy-scheibel-feb-2016.png), lokal unter `bilder/willy-scheibel-feb-2016.png` eingebunden. Die Timeline behält ihre Schriftgröße und horizontale Jahresskala. Der Hinweis auf das zehn Jahre alte Foto bleibt dem mündlichen Vortrag vorbehalten und erscheint nicht auf der Folie.

Die HPI-Folie enthält einen QR-Code und Link zu `https://hpi.de` sowie den Studienverlaufsplan des HPI, lokal unter `bilder/hpi-studienverlaufsplan.png` eingebunden. Quelle: [HPI-Studienverlaufsplan](https://hpi.de/fileadmin/_processed_/e/b/csm_DE-Muster-Studienverlaufsplan-BS-ITSE_7b52593d17.png) (vom Server als WebP geliefert und für LaTeX in PNG umgewandelt). Für die noch offenen ShaderToy-START-Adressen sind beschriftete QR-Platzhalter vorgesehen; die Links und echten QR-Codes werden nach Bereitstellung und Prüfung ergänzt. Die Inspirationsgalerie enthält die sechs ausgewählten Demos `4df3Rn`, `XdlSDs`, `WtfGDX`, `mtyGWy`, `fstyD4` und `3sySRK` in zwei Zeilen und drei Spalten, jeweils mit lokalem Originalvorschaubild, QR-Code mit weißer Ruhezone und anklickbarem Link. [Bildquellen und Prüfstand](bilder/galerie/README.md) sind separat dokumentiert. Das Auftaktbeispiel bleibt offen. Das Meerbild und eine Zusammenlegung der weichen Kante mit den Metaballs sind Vorschläge, die weiterhin offen sind.

Der auf der bereitgestellten Vorlage basierende Stil liegt in `stil.tex`: weißer Hintergrund, schwarze Schrift, HPI-Farben sowie Kopf- und Fußzeile. Eingebunden werden `logos/uni_logo.pdf` und `logos/hpi-logo-cmyk.pdf`; ein TU-Graz-Logo ist nicht vorgesehen. Fehlende Logodateien werden als Platzhalter dargestellt.

Der zusammengeführte Vortragstitel erscheint auf der Titelfolie zentriert und fett im bisherigen Untertitelstil, mit einem Zeilenumbruch nach dem Gedankenstrich. Die Kopfzeile enthält die Logos; die Fußzeilen der Inhaltsfolien verwenden Foliennummer, Abschnitt und Kurztitel.

Die Website-Adresse ist als `https://www.willyscheibel.de/million-pixel-orchestra/` festgelegt. Übersicht und Abschluss enthalten dafür einen echten QR-Code mit weißer Ruhezone sowie die anklickbare, über zwei Zeilen lesbare Adresse. Das Ziel wird zentral über `\workshopurl` in `vortrag.tex` gesetzt. Die URL wird wie vorgegeben verwendet; die Online-Erreichbarkeit ist nach der separaten Veröffentlichung zu prüfen.

## PDF erstellen

Voraussetzungen: eine lokale LaTeX-Distribution mit `pdflatex`, Beamer, PGF/TikZ, `qrcode`, `babel` mit deutscher Sprachunterstützung, `newtxmath`, `sourcesanspro`, `sourcecodepro`, `roboto`, `microtype` und AMS-Mathematikpaketen. Automatisiert vom Repository-Hauptverzeichnis aus mit `npm run build:pdf` (beide Dokumente) oder `npm run build` (zusätzlich Website). Direkter LaTeX-Aufruf:

```sh
mkdir -p folien/build
pdflatex -interaction=nonstopmode -halt-on-error -output-directory=folien/build folien/vortrag.tex
pdflatex -interaction=nonstopmode -halt-on-error -output-directory=folien/build folien/vortrag.tex
```

Das Ergebnis ist `folien/build/vortrag.pdf`; die bearbeitbare Quelle ist `vortrag.tex`. Das Build-Verzeichnis ist nicht versioniert. Der Gesamtbuild erzeugt die PDFs lokal; die Einbindung in die Website und PDF-Veröffentlichung bleiben zurückgestellt.
