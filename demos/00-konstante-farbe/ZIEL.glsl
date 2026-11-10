void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    float rot = 0.5 + 0.5 * sin(iTime);
    float gruen = 0.5 + 0.5 * sin(iTime + 2.0);
    float blau = 0.5 + 0.5 * sin(iTime + 4.0);
    vec3 color = vec3(rot, gruen, blau);
    fragColor = vec4(color, 1.0);
}
