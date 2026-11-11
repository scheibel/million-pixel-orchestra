# Veröffentlichung auf GitHub Pages

Die Live-Adresse der Website ist `https://www.willyscheibel.de/million-pixel-orchestra/`. Das lokale `dist/`-Bundle wird in den Branch `gh-pages` von `origin` gepusht. Die PDFs bleiben derzeit ausschließlich in `folien/build/` und `tafelbilder/build/`; sie werden nicht veröffentlicht.

## Voraussetzungen

- Node.js ab 22, Git und Schreibzugriff auf `origin` über die vorhandene Git-Authentifizierung.
- Git-Identität über `user.name` und `user.email` im Quellrepository oder global konfiguriert.
- Ein fertig gebautes und geprüftes `dist/`. Auf GitHub werden weder Node.js noch LaTeX oder Projekt-Build-Befehle ausgeführt.

## Lokal bauen und prüfen

```sh
npm run build
npm run preview
```

Der Gesamtbuild benötigt die in der README genannten LaTeX-Pakete. Für eine reine Website-Veröffentlichung genügt `npm run build:site` ohne LaTeX. In der Vorschau die Demos und die Codeübernahme prüfen. Die automatisierten Tests prüfen den Repository-Unterpfad mit `npm test` und `npm run test:browser`.

## Probelauf und Push

```sh
npm run publish:pages -- --dry-run
npm run publish:pages
```

Der Publish-Befehl baut nichts neu. Er prüft die notwendigen Bundle-Dateien und lädt den bisherigen Stand von `origin/gh-pages` in ein temporäres Git-Repository. Nur der Inhalt von `dist/` wird als neuer Stand übernommen; inzwischen entfernte Dateien verschwinden auch im Veröffentlichungsbranch. Beim ersten Aufruf wird der Branch angelegt. Quellbranch, Arbeitsbaum und Staging-Bereich des Projekts bleiben unverändert.

Der Probelauf zeigt die Änderungen und erzeugt weder Commit noch Push. Der normale Aufruf erzeugt einen Commit im temporären Repository und pusht ihn nach `gh-pages`. Vorhandene Branchhistorie bleibt erhalten; es gibt keinen Force-Push. Wenn zwischen Abruf und Push jemand anderes veröffentlicht, lehnt Git den Push ab. Nach Prüfung den Befehl erneut ausführen. Bei identischem Bundle erfolgen weder Commit noch Push.

## GitHub Pages einmalig einstellen

Nach dem ersten Push ist `gh-pages` als Branch vorhanden. Im GitHub-Repository unter **Settings → Pages → Build and deployment** einstellen:

1. **Source:** Deploy from a branch.
2. **Branch:** `gh-pages`.
3. **Folder:** `/ (root)`.
4. Speichern.

Die Datei `.nojekyll` liegt im Bundle und unterbindet die Jekyll-Verarbeitung. Das Vorgehen entspricht der [GitHub-Dokumentation zur Veröffentlichungsquelle](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) und zum [lokalen Build mit `.nojekyll`](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).

Es wird keine eigene Workflow-Datei angelegt. GitHub verwendet für die Bereitstellung aus einem Branch intern einen Pages-Deployment-Lauf; dieser führt keinen Projekt- oder LaTeX-Build aus.

Nach dem Deployment die Website-Adresse, Demo-Stände, ShaderToy-Links und QR-Codes auf den vorgesehenen Geräten prüfen. Die Umsetzung des Prozesses allein veröffentlicht nichts; dafür muss der Publish-Befehl ausdrücklich ausgeführt werden.
