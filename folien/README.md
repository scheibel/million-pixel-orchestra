# Vortragsfolien – erster Entwurf

`vortrag.tex` enthält einen ersten deutschen LaTeX-Beamer-Foliensatz im 16:9-Format. Die 35 Folien folgen dem [Vortragsskelett](../docs/VORTRAGSSKELETT.md): Vorstellung, HPI, Überblick, Pixel und Boilerplate, eine Einstiegsfolie pro Demo, 19 Änderungsfolien für deren Übergänge, Galerie und Abschluss. Die Demo-Folien verweisen auf passende [Tafelbilder](../tafelbilder/README.md).

Auf die persönliche Vorstellungsfolie folgen zwei Zeitstrahlfolien mit gemeinsamer Skala von 2000 bis 2027 und verkleinerter Beschriftung (6,3 pt für Stationen, 6,5 pt für Jahreszahlen). Programmieren als Hobby reicht von 2001 bis 2007; die Mitwirkung in Computerlehrgängen liegt zwischen 2004 und 2006. Drei rote, fortlaufende Zeiträume gliedern die berufliche Entwicklung direkt zwischen den Stationen: Softwaresystemingenieur seit 2007 (erste bezahlte Programmierarbeit) zwischen Webseitenprogrammierung und Bachelorstudium; Computergrafiker seit 2009 (erste Projekte in diesem Bereich) nach dem Masterstudium, zu Beginn der zweiten Timeline-Folie; Forscher in der Computergrafik seit 2013 (erste Forschungsprojekte mit anschließenden Publikationen) zwischen Open Source und Promotionsstudium. Die Consulting-Firma ist dem Bereich Computergrafiker zugeordnet. Dezente Gruppenflächen bündeln Kategorien und zugehörige Stationen. Die konkreten Stationen sind blau; ein Punkt markiert das Abitur. Dünne graue Jahreslinien ordnen Balken und Pfeile der Zeitachse zu; eine Legende entfällt. Pfeile kennzeichnen Einträge mit angegebenem Beginn und offenem Ende. Der Skalenendpunkt 2027 ist kein Enddatum für diese Tätigkeiten.

Die neue Folie „Wer bin ich?“ steht vor der Zeitleiste und enthält Willy Scheibel, M.Sc. IT-Systems-Engineering, die anklickbare Website `www.willyscheibel.de`, die Position als wissenschaftlicher Mitarbeiter am Fachgebiet Computergrafische Systeme sowie die Affiliation Hasso-Plattner-Institut, Digital Engineering Fakultät, Universität Potsdam. Das unveränderte [Porträt vom Februar 2016](https://www.willyscheibel.de/images/willy-scheibel-feb-2016.png) ist von der Zeitleiste auf diese Folie gewandert und steht rechts oben. Darunter ist eine mittelgroße Google-Maps-Karte mit roter HPI-Markierung am Griebnitzsee eingebunden. Potsdam, Innenstadt, Havel und Babelsberg prägen den Ausschnitt; die Karte öffnet beim Anklicken Google Maps. Die lokale Abbildung mit sichtbarem Google-Logo und Kartendatenhinweisen ermöglicht einen Offline-Build; [Quelle und Einbettung](bilder/karten/README.md) sind dokumentiert. Unten links stehen das gewünschte HPI-Vollogo und das Logo der Universität Potsdam mit je 12 mm Höhe. Die kleinen Kopfzeilenlogos entfallen nur auf dieser Folie. Das HPI-Vollogo liegt als lokale Original-SVG und konvertierte Vektor-PDF vor; [Quelle und Konvertierung](logos/README.md) sind dokumentiert. Die erste Zeitleistenfolie heißt jetzt „Vom Hobby zum Studium“; Schriftgröße und horizontale Jahresskala bleiben erhalten. Der Hinweis auf das Alter des Fotos bleibt dem mündlichen Vortrag vorbehalten.

Die HPI-Folie enthält einen QR-Code und Link zu `https://hpi.de` sowie den Studienverlaufsplan des HPI, lokal unter `bilder/hpi-studienverlaufsplan.png` eingebunden. Quelle: [HPI-Studienverlaufsplan](https://hpi.de/fileadmin/_processed_/e/b/csm_DE-Muster-Studienverlaufsplan-BS-ITSE_7b52593d17.png) (vom Server als WebP geliefert und für LaTeX in PNG umgewandelt). Für die noch offenen ShaderToy-START-Adressen sind beschriftete QR-Platzhalter vorgesehen; die Links und echten QR-Codes werden nach Bereitstellung und Prüfung ergänzt. Die Inspirationsgalerie enthält die sechs ausgewählten Demos `4df3Rn`, `XdlSDs`, `WtfGDX`, `mtyGWy`, `fstyD4` und `3sySRK` in zwei Zeilen und drei Spalten, jeweils mit lokalem Originalvorschaubild, QR-Code mit weißer Ruhezone und anklickbarem Link. [Bildquellen und Prüfstand](bilder/galerie/README.md) sind separat dokumentiert. Das Auftaktbeispiel bleibt offen. Die bisherigen Wellen- und Taylor-Folien entfallen. Demo 5 zeigt UV-Bild → Pixelzufall → Value Noise → Simplex Noise; Demo 6 zeigt Simplex Noise → fBm → Wolkengestaltung → Animation. Tafelbilder 7/8 begleiten diese vierstufigen Abläufe. Simplex wird als vorbereitete Gradienten-Noise-Basis vom interpolierten Value Noise unterschieden. Demo 4 zeigt jetzt den Bewegungsvergleich Lerp → Smoothstep → Smootherstep auf einer Raute und den Farbwechsel Schwarz → Eckfarbe → Schwarz während des Halts; die fünf Stände sind 1 Punkt LERP → 2 Punkte LERP → 2 Punkte Smoothstep → 4 Punkte Smoothstep → 4 Punkte Smootherstep. Der Schleifenrahmen ist schon im START vorbereitet; für Phase 2 wird nur die Schleifengrenze erhöht. Phase 2 und 3 zeigen die Stimmen 1 und 3 des Kanons mit Verzögerungen von 0 und 3 Sekunden. Ab Phase 4 ergänzen Stimmen 2 und 4 die bisherigen Verzögerungen 0/1,5/3/4,5 Sekunden.

Der auf der bereitgestellten Vorlage basierende Stil liegt in `stil.tex`: weißer Hintergrund, schwarze Schrift, HPI-Farben sowie Kopf- und Fußzeile. Eingebunden werden `logos/uni_logo.pdf` und `logos/hpi-logo-cmyk.pdf`; ein TU-Graz-Logo ist nicht vorgesehen. Fehlende Logodateien werden als Platzhalter dargestellt.

Der zusammengeführte Vortragstitel erscheint auf der Titelfolie zentriert und fett im bisherigen Untertitelstil, mit einem Zeilenumbruch nach dem Gedankenstrich. Die Kopfzeile enthält die Logos; die Fußzeilen der Inhaltsfolien verwenden Foliennummer, Abschnitt und Kurztitel.

Die Website-Adresse ist als `https://www.willyscheibel.de/million-pixel-orchestra/` festgelegt. Übersicht und Abschluss enthalten dafür einen echten QR-Code mit weißer Ruhezone sowie die anklickbare, über zwei Zeilen lesbare Adresse. Das Ziel wird zentral über `\workshopurl` in `vortrag.tex` gesetzt. Die URL wird wie vorgegeben verwendet; die Online-Erreichbarkeit ist nach der separaten Veröffentlichung zu prüfen.

## Änderungen zwischen den Phasen zeigen

[code-schritte.tex](code-schritte.tex) enthält für jeden der 19 Übergänge zwischen aufeinanderfolgenden Shader-Ständen eine eigene Folie. Die sechs Gruppen werden in `vortrag.tex` jeweils direkt nach der Demo-Einstiegsfolie eingebunden.

| Demo | Übergänge | Folien im PDF |
| --- | --- | --- |
| 1 · Farbe und Zeit | 3 | 10–12 |
| 2 · Position und Farbverlauf | 2 | 14–15 |
| 3 · Kreis und Metaballs | 4 | 17–20 |
| 4 · Polynome für Bewegung und Farbe | 4 | 22–25 |
| 5 · Vom Zufall zu Noise | 3 | 27–29 |
| 6 · Wolken aus Noise | 3 | 31–33 |

Jede Folie zeigt **Bisher / Jetzt** mit Dateinamen und den tatsächlichen Quellzeilennummern. Ersetzte Zeilen sind rot, neue Zeilen blau, unveränderter Kontext grau. Gelbe Kästen kennzeichnen zusätzlich übernommenen Basiscode bzw. ausdrücklich zu erklärenden vorbereiteten Code. Die beiden Hinweise **Live programmieren** und **Mündlich erläutern** benennen die Änderung und ihre mathematischen Bausteine. Lange Funktionen werden als gekennzeichnete Auszüge gezeigt; die vollständigen kopierbaren Fassungen stehen weiterhin in den Shader-Dateien.

Die Schrittnummern zählen Übergänge, nicht Shader-Stände. Der identische Anschluss von Demo 5 zu Demo 6 ist kein zusätzlicher Übergang innerhalb einer Demo. Die Folien sind Begleiter für das Live-Coding, kein zusätzlicher Theorieblock. Bei späteren Shader-Änderungen Codeauszüge und Zeilennummern mitziehen.

Die Änderungsfolien verwenden die bestehende LaTeX-Ausstattung. Es sind keine zusätzlichen Pakete, npm-Abhängigkeiten, externen Downloads oder Shell-Escape-Befehle erforderlich.

## PDF erstellen

Voraussetzungen: eine lokale LaTeX-Distribution mit `pdflatex`, Beamer, PGF/TikZ, `qrcode`, `babel` mit deutscher Sprachunterstützung, `newtxmath`, `sourcesanspro`, `sourcecodepro`, `roboto`, `microtype` und AMS-Mathematikpaketen. Automatisiert vom Repository-Hauptverzeichnis aus mit `npm run build:pdf` (beide Dokumente) oder `npm run build` (zusätzlich Website). Direkter LaTeX-Aufruf:

```sh
mkdir -p folien/build
pdflatex -interaction=nonstopmode -halt-on-error -output-directory=folien/build folien/vortrag.tex
pdflatex -interaction=nonstopmode -halt-on-error -output-directory=folien/build folien/vortrag.tex
```

Das Ergebnis ist `folien/build/vortrag.pdf`; die bearbeitbare Quelle ist `vortrag.tex`. Das Build-Verzeichnis ist nicht versioniert. Der Gesamtbuild erzeugt die PDFs lokal; die Einbindung in die Website und PDF-Veröffentlichung bleiben zurückgestellt.
