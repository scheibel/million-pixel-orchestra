void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 p = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;
    float abstandQuadrat = dot(p, p);
    float radius = 0.3;
    vec3 color = vec3(0.05, 0.08, 0.18);
    if (abstandQuadrat < radius * radius) {
        color = vec3(1.0, 0.45, 0.2);
    }
    fragColor = vec4(color, 1.0);
}
