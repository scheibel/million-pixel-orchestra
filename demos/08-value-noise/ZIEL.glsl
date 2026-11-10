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
    vec2 p = fragCoord / iResolution.y;
    float wert = valueNoise(p * 6.0);
    vec3 color = mix(vec3(0.05, 0.12, 0.25), vec3(0.85, 0.95, 1.0), wert);
    fragColor = vec4(color, 1.0);
}
