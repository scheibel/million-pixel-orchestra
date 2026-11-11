# Farbe und Zeit

**Zielbild:** Alle Pixel wechseln gemeinsam ihre Farbe.

**Mathematik:** RGB besteht aus Rot, Grün und Blau. `iTime` gibt die Zeit in Sekunden an. Der Sinus schwankt zwischen −1 und 1; `0.5 + 0.5 * sin(iTime)` ergibt Werte zwischen 0 und 1. Die Verschiebungen um 2 und 4 Radiant lassen die Farbanteile zeitversetzt schwingen. Sinus und Phase werden hier anschaulich eingeführt; eine separate Wellen- oder Taylor-Demo ist nicht mehr vorgesehen.

**Stände:** Der vorläufige START ist weiß; Violett und Koralle sind konstante Zwischenstände. Rot, Grün und Blau stehen schon im START als drei benannte Variablen im Code. Die Farb-Stände ändern nur deren Werte; ZIEL ersetzt die drei Konstanten durch zeitabhängige Ausdrücke. Alle Dateien sind vollständige ShaderToy-Image-Snippets.
