# Freigegebene Materialien

`folien.pdf` ist die am 12. November 2026 freigegebene Fassung des Vortrags
„Grafiken programmieren – Mit Mathematik zu Millionen Pixeln“ mit 14 Folien.
Die persönlichen Folien 2–4 („Wer bin ich?“ und die beiden Zeitstrahlen)
erscheinen ausschließlich im lokalen Vortrag. Die Kontaktadresse auf der
Rückblicksfolie bleibt auch öffentlich enthalten.
Die Website-Fassung wurde aus `folien/build/vortrag-website.pdf` übernommen und wird als fertiges PDF
versioniert. `site/catalog.json` registriert den Download; die Landingpage
zeigt ihn unter „Materialien“.

Website-Build und lokale Vorschau benötigen dadurch auch für diesen Download
keine LaTeX-Installation. Dokument-Rebuilds verändern die freigegebene Fassung
nicht automatisch. Nach Freigabe einer neuen Fassung erst `npm run build:pdf`
ausführen, dann ausschließlich `folien/build/vortrag-website.pdf` nach `site/downloads/folien.pdf`
kopieren und die Website neu bauen. Build und Veröffentlichung bleiben getrennt.

Code-Journal und Tafelbilder sind nicht als Website-Downloads freigegeben.
