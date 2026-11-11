float zufall(vec2 ort);
float valueNoise(vec2 p);
float simplexNoise01(vec2 p);

// GESTALTUNG
float fbm(vec2 p)
{
    // Vier Oktaven: Frequenz verdoppeln, Gewicht halbieren.
    float wert = 0.5 * simplexNoise01(p)
               + 0.25 * simplexNoise01(2.0 * p)
               + 0.125 * simplexNoise01(4.0 * p)
               + 0.0625 * simplexNoise01(8.0 * p);
    return wert / 0.9375;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = fragCoord / iResolution.xy;
    vec2 p = fragCoord / iResolution.y * 6.0;
    p -= vec2(0.18, 0.06) * iTime;
    float wert = fbm(p);
    float dichte = smoothstep(0.4, 0.65, wert);
    vec3 himmel = vec3(0.15, 0.4, 0.75);
    vec3 wolke = vec3(1.0);
    vec3 color = mix(himmel, wolke, dichte);
    fragColor = vec4(color, 1.0);
}

// VORBEREITETE BASIS: beim nächsten Schritt ergänzen, bisherigen Code behalten.
// Vorbereitete Hashfunktion: gleicher Ort, gleicher Pseudozufallswert.
// Kein zeitlich wechselnder Zufall; die Konstanten gehören zur Basisfunktion.
float zufall(vec2 ort)
{
    return fract(sin(dot(ort, vec2(127.1, 311.7))) * 43758.5453);
}

// Vier Zufallswerte sind an den Ecken jeder quadratischen Gitterzelle verankert.
float valueNoise(vec2 p)
{
    vec2 zelle = floor(p);
    vec2 t = fract(p);
    // Das bekannte Smoothstep-Polynom aus Demo 4.
    vec2 weich = t * t * (3.0 - 2.0 * t);
    float unten = mix(zufall(zelle), zufall(zelle + vec2(1.0, 0.0)), weich.x);
    float oben = mix(zufall(zelle + vec2(0.0, 1.0)), zufall(zelle + vec2(1.0, 1.0)), weich.x);
    return mix(unten, oben, weich.y);
}


// Vorbereitete Basis: 2D-Simplex-Noise (Gradienten auf einem Dreiecksgitter).
// Ian McEwan, Ashima Arts; Pflege: Stefan Gustavson.
// Quelle: https://github.com/ashima/webgl-noise/blob/master/src/noise2D.glsl
// Funktionsname und Kommentare für den Workshop angepasst.
//
// Copyright (C) 2011 by Ashima Arts (Simplex noise)
// Copyright (C) 2011-2016 by Stefan Gustavson (Classic noise and others)
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

vec3 mod289(vec3 x)
{
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x)
{
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x)
{
    return mod289(((x * 34.0) + 10.0) * x);
}

// Liefert näherungsweise Werte zwischen -1 und 1; keine Live-Herleitung.
float simplexNoise(vec2 v)
{
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                      -0.577350269189626, 0.024390243902439);
    // Die umgebende Dreieckszelle und ihre drei Ecken bestimmen.
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;

    // Reproduzierbare Gradienten an den drei Ecken auswählen.
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                  + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                           dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);

    // Lokal gewichtete Gradientenbeiträge addieren.
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

// Gemeinsame Schnittstelle mit Value Noise: ein Wert zwischen 0 und 1.
float simplexNoise01(vec2 p)
{
    return clamp(0.5 + 0.5 * simplexNoise(p), 0.0, 1.0);
}
