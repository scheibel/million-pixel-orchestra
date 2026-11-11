void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 p = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;
    float welle = 0.2 * sin(10.0 * p.x - 2.0 * iTime);
    float abstand = abs(p.y - welle);
    float linie = 1.0 - smoothstep(0.005, 0.015, abstand);
    vec3 color = mix(vec3(0.03, 0.08, 0.18), vec3(0.2, 0.9, 0.8), linie);
    fragColor = vec4(color, 1.0);
}
