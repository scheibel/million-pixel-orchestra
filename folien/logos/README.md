# Logos der Folien

Die neue persönliche Vorstellungsfolie verwendet das HPI-Vollogo aus der vom Nutzer angegebenen [Dateiseite auf Wikipedia](https://de.wikipedia.org/wiki/Datei:Hasso-Plattner-Institut_logo.svg). Die unveränderte [Original-SVG von Wikimedia Commons](https://upload.wikimedia.org/wikipedia/commons/f/f2/Hasso-Plattner-Institut_logo.svg) wurde am 11. November 2026 als `hpi-logo-voll.svg` lokal gespeichert. Die Dateibeschreibung nennt den ursprünglichen Urheber als unbekannt und die Vektorkonvertierung durch Marsupilami; das Logo ist dort als gemeinfrei wegen fehlender Schöpfungshöhe gekennzeichnet.

Für pdfLaTeX liegt zusätzlich `hpi-logo-voll.pdf` als Vektorkonvertierung vor. Erzeugt mit Inkscape 1.1.2, vom Repository-Hauptverzeichnis aus:

```sh
inkscape folien/logos/hpi-logo-voll.svg --export-area-page --export-type=pdf --export-filename=folien/logos/hpi-logo-voll.pdf
```

SVG und PDF werden versioniert. Der normale Folien-Build verwendet die fertige PDF und benötigt weder einen Download noch Inkscape.

Das bereits vorhandene `uni_logo.pdf` wird auf der persönlichen Vorstellungsfolie zusammen mit dem HPI-Vollogo mittelgroß unten platziert. Die übrigen Folien verwenden weiterhin die vorhandenen kleinen Kopfzeilenlogos aus dem Beamerstil.

Für die dunkle Testvariante der Titelfolie liegt `uni_logo-weiss.pdf` vor. Die einzige schwarze RGB-Füllfarbe des Originals ist darin durch Weiß ersetzt; alle Vektorpfade, Seitenmaße und die Transparenz bleiben erhalten. Das HPI-Logo wird unverändert verwendet. Die fertige PDF wird versioniert; der Folien-Build benötigt kein Konvertierungswerkzeug. Erzeugung mit Python 3 und `pypdf`:

```python
from pypdf import PdfReader, PdfWriter
from pypdf.generic import FloatObject, NameObject

page = PdfReader("folien/logos/uni_logo.pdf").pages[0]
content = page.get_contents()
for index, (operands, operator) in enumerate(content.operations):
    if operator == b"rg":
        assert list(operands) == [0, 0, 0]
        content.operations[index] = ([FloatObject(1)] * 3, operator)
page[NameObject("/Contents")] = content
writer = PdfWriter()
writer.add_page(page)
with open("folien/logos/uni_logo-weiss.pdf", "wb") as output:
    writer.write(output)
```
