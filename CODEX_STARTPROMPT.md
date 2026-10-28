# Erste Nachricht an Codex

Lies zuerst `AGENTS.md`, `CONTEXT.md` und `ROADMAP.md` vollständig.

Ich entwickle eine 90-minütige Oberstufen-Einführung in die Computergrafik mit ShaderToy. Der pädagogische Kontext und die entschiedenen Einschränkungen stehen in diesen Dateien. Behandle die provisorischen Zeitangaben ausdrücklich nicht als endgültig freigegeben.

Die Planung trennt Features des Rahmenwerks, externe Integrationen und Workshopinhalt. Die hierarchische Inhaltsplanung folgt später.

Setze zunächst **ausschließlich F1 (Landingpage, lokales Hosting und Shader-Vorschau) der Roadmap** um und berücksichtige dabei die Integrationsanforderungen I1 (ShaderToy) und I2 (GitHub Pages):

- Erstelle eine kleine deutsche Landingpage und einen einfachen lokalen HTTP-Server für Website und Demo-Vorschau. Dokumentiere den Startbefehl; diese Nutzung soll keine LaTeX-Installation benötigen.
- Erstelle ein möglichst kleines lokales WebGL2-Preview-Gerüst, das einzelne ShaderToy-kompatible GLSL-Snippets mit `mainImage(out vec4 fragColor, in vec2 fragCoord)` darstellen kann und `fragCoord`, `iResolution`, `iTime` unterstützt. Die Lehr-Snippets sollen ohne Abhängigkeit vom Preview-Gerüst nach ShaderToy kopierbar bleiben. Benutze möglichst wenig Abhängigkeiten, zeige GLSL-Kompilierfehler sinnvoll an und teste die Vorschau mit einer einzigen konstanten Farbe.
- Bereite einen lokalen statischen Website-Build nach `dist/` für Website, Demos und spätere PDF-Downloads vor. Das Ergebnis muss auch unter einem GitHub-Pages-Repository-Unterpfad funktionieren und ohne Server-Backend hostbar sein. Prüfe dies lokal.
- Plane die Einbindung der späteren Dokument-Builds ein: F2 stellt den PDF-Build für LaTeX-Beamer-Folien und Tafelbilder bereit, F3 bündelt Website, Demos und PDFs im vollständigen Release-Build mit Downloadlinks. Diese Arbeitspakete werden separat umgesetzt und können mit technischen Beispielen unabhängig vom fertigen Workshopinhalt geprüft werden. Verlinke bis dahin nur vorhandene Downloads.
- Berücksichtige den festgelegten Veröffentlichungsweg: Der vollständige Release-Build läuft auf dem Entwicklergerät mit passender lokaler LaTeX-Distribution und erzeugt das fertige `dist/`-Bundle. Dieses wird anschließend separat in die GitHub-Pages-Veröffentlichungsquelle gepusht. Keine GitHub-Actions-Workflows für Build oder Deployment einrichten und keine LaTeX-Distribution oder Projekt-Build-Werkzeuge auf GitHub Pages voraussetzen.

Implementiere noch nicht die übrigen Demos, Folien oder Tafelbilder. Erstelle keine ShaderToy-Projekte online und veröffentliche die Website noch nicht.

Dokumentiere Architekturentscheidungen knapp im Repository und gib mir danach eine Übersicht über geänderte Dateien, lokale Prüfungen und offene Punkte. Warte danach auf die Wahl des nächsten Arbeitspakets. Nimm keinen Git-Commit vor, bevor ich dich dazu auffordere.
