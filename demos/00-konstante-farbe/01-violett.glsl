void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    float rot = 0.45;
    float gruen = 0.32;
    float blau = 0.78;
    vec3 color = vec3(rot, gruen, blau);
    fragColor = vec4(color, 1.0);
}
