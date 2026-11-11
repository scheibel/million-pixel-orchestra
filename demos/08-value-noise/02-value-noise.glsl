float zufall(vec2 ort);
float valueNoise(vec2 p);

// GESTALTUNG
void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = fragCoord / iResolution.xy;
    vec2 p = fragCoord / iResolution.y * 6.0;
    float wert = valueNoise(p);
    vec3 color = vec3(wert);
    fragColor = vec4(color, 1.0);
}

// VORBEREITETE BASIS: beim nächsten Schritt ergänzen, bisherigen Code behalten.
// Vorbereitete Hashfunktion: gleicher Ort, gleicher Pseudozufallswert.
// Kein zeitlich wechselnder Zufall; die Konstanten gehören zur Basisfunktion.
float zufall(vec2 ort)
{
    return fract(sin(dot(ort, vec2(127.1, 311.7))) * 43758.5453);
}

// Vier Zufallswerte sind an den Ecken jeder quadratischen Gitterzelle verankert.
float valueNoise(vec2 p)
{
    vec2 zelle = floor(p);
    vec2 t = fract(p);
    // Das bekannte Smoothstep-Polynom aus Demo 4.
    vec2 weich = t * t * (3.0 - 2.0 * t);
    float unten = mix(zufall(zelle), zufall(zelle + vec2(1.0, 0.0)), weich.x);
    float oben = mix(zufall(zelle + vec2(0.0, 1.0)), zufall(zelle + vec2(1.0, 1.0)), weich.x);
    return mix(unten, oben, weich.y);
}
