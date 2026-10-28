# Erste Nachricht an Codex

Lies zuerst `AGENTS.md`, `CONTEXT.md` und `ROADMAP.md` vollständig.

Ich entwickle eine 90-minütige Oberstufen-Einführung in die Computergrafik mit ShaderToy. Der pädagogische Kontext und die entschiedenen Einschränkungen stehen in diesen Dateien. Behandle die provisorischen Zeitangaben ausdrücklich nicht als endgültig freigegeben.

Setze zunächst **ausschließlich Phase 0 der Roadmap** um: Erstelle ein möglichst kleines lokales WebGL2-Preview-Gerüst, das einzelne ShaderToy-kompatible GLSL-Snippets mit `mainImage(out vec4 fragColor, in vec2 fragCoord)` darstellen kann und `fragCoord`, `iResolution`, `iTime` unterstützt. Die Lehr-Snippets sollen ohne Abhängigkeit vom Preview-Gerüst nach ShaderToy kopierbar bleiben. Benutze möglichst wenig Abhängigkeiten, erkläre die Startbefehle, zeige GLSL-Kompilierfehler sinnvoll an und teste die Vorschau mit einer einzigen konstanten Farbe. Implementiere noch nicht die übrigen Demos und erstelle keine ShaderToy-Projekte online.

Dokumentiere Architekturentscheidungen knapp im Repository und gib mir danach eine Übersicht über geänderte Dateien, lokale Prüfungen und offene Punkte, bevor wir Phase 1 beginnen. Nimm keinen Git-Commit vor, bevor ich dich dazu auffordere.
