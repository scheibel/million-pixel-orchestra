void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 p = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;
    float x = p.x * 5.0;
    float sinus = sin(x);
    float x2 = x * x;
    float taylor = x * (1.0 - x2 / 6.0 + x2 * x2 / 120.0);
    float referenzLinie = 1.0 - smoothstep(0.01, 0.03, abs(p.y * 3.0 - sinus));
    float taylorLinie = 1.0 - smoothstep(0.01, 0.03, abs(p.y * 3.0 - taylor));
    vec3 color = vec3(0.04, 0.06, 0.14);
    color = mix(color, vec3(0.15, 0.85, 0.8), referenzLinie);
    color = mix(color, vec3(1.0, 0.38, 0.2), taylorLinie);
    fragColor = vec4(color, 1.0);
}
