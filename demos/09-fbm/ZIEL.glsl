// Reproduzierbarer Pseudozufallswert für einen Gitterpunkt.
float zufall(vec2 gitterpunkt)
{
    return fract(sin(dot(gitterpunkt, vec2(127.1, 311.7))) * 43758.5453);
}

float valueNoise(vec2 p)
{
    vec2 zelle = floor(p);
    vec2 t = fract(p);
    vec2 weich = t * t * (3.0 - 2.0 * t);
    float unten = mix(zufall(zelle), zufall(zelle + vec2(1.0, 0.0)), weich.x);
    float oben = mix(zufall(zelle + vec2(0.0, 1.0)), zufall(zelle + vec2(1.0, 1.0)), weich.x);
    return mix(unten, oben, weich.y);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 p = fragCoord / iResolution.y * 4.0;
    float wolken = 0.5 * valueNoise(p)
                 + 0.25 * valueNoise(2.0 * p)
                 + 0.125 * valueNoise(4.0 * p)
                 + 0.0625 * valueNoise(8.0 * p);
    wolken /= 0.9375;
    vec3 color = mix(vec3(0.08, 0.25, 0.5), vec3(1.0, 1.0, 1.0), wolken);
    fragColor = vec4(color, 1.0);
}
