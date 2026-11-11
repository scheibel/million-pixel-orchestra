float zufall(vec2 ort);

// GESTALTUNG
void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = fragCoord / iResolution.xy;
    vec2 p = fragCoord / iResolution.y * 6.0;
    float wert = zufall(floor(fragCoord));
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
