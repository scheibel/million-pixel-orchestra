void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    float rot = 1.0;
    float gruen = 1.0;
    float blau = 1.0;
    vec3 color = vec3(rot, gruen, blau);
    fragColor = vec4(color, 1.0);
}
