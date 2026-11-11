# Logos der Folien

Die neue persönliche Vorstellungsfolie verwendet das HPI-Vollogo aus der vom Nutzer angegebenen [Dateiseite auf Wikipedia](https://de.wikipedia.org/wiki/Datei:Hasso-Plattner-Institut_logo.svg). Die unveränderte [Original-SVG von Wikimedia Commons](https://upload.wikimedia.org/wikipedia/commons/f/f2/Hasso-Plattner-Institut_logo.svg) wurde am 11. November 2026 als `hpi-logo-voll.svg` lokal gespeichert. Die Dateibeschreibung nennt den ursprünglichen Urheber als unbekannt und die Vektorkonvertierung durch Marsupilami; das Logo ist dort als gemeinfrei wegen fehlender Schöpfungshöhe gekennzeichnet.

Für pdfLaTeX liegt zusätzlich `hpi-logo-voll.pdf` als Vektorkonvertierung vor. Erzeugt mit Inkscape 1.1.2, vom Repository-Hauptverzeichnis aus:

```sh
inkscape folien/logos/hpi-logo-voll.svg --export-area-page --export-type=pdf --export-filename=folien/logos/hpi-logo-voll.pdf
```

SVG und PDF werden versioniert. Der normale Folien-Build verwendet die fertige PDF und benötigt weder einen Download noch Inkscape.

Das bereits vorhandene `uni_logo.pdf` wird auf der persönlichen Vorstellungsfolie zusammen mit dem HPI-Vollogo mittelgroß unten platziert. Die übrigen Folien verwenden weiterhin die vorhandenen kleinen Kopfzeilenlogos aus dem Beamerstil.
