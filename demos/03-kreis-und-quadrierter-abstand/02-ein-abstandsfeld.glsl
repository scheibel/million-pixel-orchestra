void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 p = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;
    vec2 a = p;
    float abstandQuadrat = dot(a, a);
    float feld = 0.035 / (abstandQuadrat + 0.01);
    vec3 color = vec3(0.04, 0.08, 0.16);
    if (feld > 1.0) {
        color = vec3(0.2, 0.85, 0.7);
    }
    fragColor = vec4(color, 1.0);
}
