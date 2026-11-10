void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = fragCoord / iResolution.xy;
    vec3 links = vec3(0.08, 0.15, 0.45);
    vec3 rechts = vec3(1.0, 0.38, 0.18);
    vec3 color = mix(links, rechts, uv.x);
    fragColor = vec4(color, 1.0);
}
