// Dieselbe Kurve steuert den Weg und den Farbwechsel in der Haltephase.
float verlauf(float t)
{
    return t;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    // Gleiche Abstandseinheiten auf beiden Achsen.
    vec2 p = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;

    // Pro Kante: 1,2 Sekunden Bewegung und 0,6 Sekunden Halt.
    float fahrzeit = 1.2;
    float haltezeit = 0.6;
    float abschnittsdauer = fahrzeit + haltezeit;
    vec3 color = vec3(0.94, 0.95, 0.97);
    // Die Raute dient als Orientierung; der Punkt bleibt gleich gross.
    if (abs(abs(p.x) + abs(p.y) - 0.30) < 0.003) {
        color = vec3(0.55, 0.60, 0.65);
    }
    // Grenze 1: nur Stimme 1; Grenze 4 und Schrittweite 2: Stimmen 1 und 3.
    // Mit Schrittweite 1 kommen die Stimmen 2 und 4 hinzu.
    for (int index = 0; index < 1; index += 2) {
        float punktzeit = mod(iTime - float(index) * 1.5, 4.0 * abschnittsdauer);
        float abschnitt = floor(punktzeit / abschnittsdauer);
        int kante = int(mod(abschnitt, 4.0));
        float zeit = punktzeit - abschnitt * abschnittsdauer;
        float t = clamp(zeit / fahrzeit, 0.0, 1.0);

        // N -> O -> S -> W -> N; Eckfarben: Rot, Gruen, Blau, Gelb.
        vec2 a = vec2(0.0, 0.30);
        vec2 b = vec2(0.30, 0.0);
        vec3 eckfarbe = vec3(0.0, 1.0, 0.0);
        if (kante == 1) {
            a = vec2(0.30, 0.0);
            b = vec2(0.0, -0.30);
            eckfarbe = vec3(0.0, 0.0, 1.0);
        } else if (kante == 2) {
            a = vec2(0.0, -0.30);
            b = vec2(-0.30, 0.0);
            eckfarbe = vec3(1.0, 1.0, 0.0);
        } else if (kante == 3) {
            a = vec2(-0.30, 0.0);
            b = vec2(0.0, 0.30);
            eckfarbe = vec3(1.0, 0.0, 0.0);
        }

        vec2 punkt = mix(a, b, verlauf(t));
        // Nur waehrend des Halts: 0 -> 1 -> 0 fuer Schwarz -> Eckfarbe -> Schwarz.
        float haltefortschritt = clamp((zeit - fahrzeit) / haltezeit, 0.0, 1.0);
        float puls = 1.0 - abs(2.0 * haltefortschritt - 1.0);
        vec3 punktfarbe = mix(vec3(0.0), eckfarbe, verlauf(puls));

        if (length(p - punkt) < 0.025) {
            color = punktfarbe;
        }
    }
    fragColor = vec4(color, 1.0);
}
