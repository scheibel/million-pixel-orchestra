void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 p = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;
    float abstand = length(p);
    float t = clamp((abstand - 0.25) / 0.10, 0.0, 1.0);
    float weich = t * t * (3.0 - 2.0 * t);
    vec3 innen = vec3(1.0, 0.55, 0.2);
    vec3 aussen = vec3(0.04, 0.08, 0.18);
    vec3 color = mix(innen, aussen, weich);
    fragColor = vec4(color, 1.0);
}
