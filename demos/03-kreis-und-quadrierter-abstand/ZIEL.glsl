void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 p = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;
    float versatz = 0.23 + 0.14 * sin(iTime);
    vec2 a = p - vec2(-versatz, 0.0);
    vec2 b = p - vec2(versatz, 0.0);
    float abstandQuadrat = dot(a, a);
    float feld = 0.035 / (abstandQuadrat + 0.01);
    feld += 0.035 / (dot(b, b) + 0.01);
    vec3 color = vec3(0.04, 0.08, 0.16);
    if (feld > 1.0) {
        color = vec3(0.2, 0.85, 0.7);
    }
    fragColor = vec4(color, 1.0);
}
