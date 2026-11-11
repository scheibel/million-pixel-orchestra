"""ZIEL-Shader als lokale Folienbilder rendern (Linux, EGL/GLES 3, Python 3).

Nur zur Aktualisierung der versionierten PNGs; kein Teil des PDF-/Release-Builds.
Aufruf: EGL_PLATFORM=surfaceless LIBGL_ALWAYS_SOFTWARE=1 python3 scripts/render-demo-previews.py
"""
import ctypes as C
import hashlib
import json
from pathlib import Path
import struct
import zlib

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "folien/bilder/demo-ziele"
WIDTH, HEIGHT = 640, 360
TIMES = [1.0, 0.0, 3.6, 4.5, 0.0, 8.0]


def function(library, name, result, *arguments):
    fn = getattr(library, name)
    fn.restype, fn.argtypes = result, list(arguments)
    return fn


def integers(*values):
    return (C.c_int * len(values))(*values)


def png(pixels):
    def chunk(kind, data):
        return struct.pack(">I", len(data)) + kind + data + struct.pack(">I", zlib.crc32(kind + data))
    # OpenGL zählt Zeilen von unten; PNG zählt von oben.
    stride = WIDTH * 4
    rows = b"".join(b"\0" + pixels[y * stride:(y + 1) * stride] for y in reversed(range(HEIGHT)))
    return (b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", struct.pack(">IIBBBBB", WIDTH, HEIGHT, 8, 6, 0, 0, 0))
            + chunk(b"IDAT", zlib.compress(rows)) + chunk(b"IEND", b""))


def main():
    egl, gl = C.CDLL("libEGL.so.1"), C.CDLL("libGLESv2.so.2")
    ptr, integer, uint = C.c_void_p, C.c_int, C.c_uint
    display = function(egl, "eglGetDisplay", ptr, ptr)(None)
    assert function(egl, "eglInitialize", uint, ptr, ptr, ptr)(display, None, None), "EGL-Initialisierung fehlgeschlagen"
    assert function(egl, "eglBindAPI", uint, uint)(0x30A0)  # OpenGL ES
    config, count = ptr(), integer()
    attributes = integers(0x3033, 1, 0x3040, 0x40, 0x3024, 8, 0x3023, 8, 0x3022, 8, 0x3021, 8, 0x3038)
    assert function(egl, "eglChooseConfig", uint, ptr, ptr, ptr, integer, ptr)(display, attributes, C.byref(config), 1, C.byref(count)) and count.value
    surface = function(egl, "eglCreatePbufferSurface", ptr, ptr, ptr, ptr)(display, config, integers(0x3057, WIDTH, 0x3056, HEIGHT, 0x3038))
    context = function(egl, "eglCreateContext", ptr, ptr, ptr, ptr, ptr)(display, config, None, integers(0x3098, 3, 0x3038))
    assert surface and context
    assert function(egl, "eglMakeCurrent", uint, ptr, ptr, ptr, ptr)(display, surface, surface, context)
    renderer = function(gl, "glGetString", C.c_char_p, uint)(0x1F01).decode()

    def compile_shader(kind, source):
        shader = function(gl, "glCreateShader", uint, uint)(kind)
        text = C.c_char_p(source.encode())
        function(gl, "glShaderSource", None, uint, integer, ptr, ptr)(shader, 1, C.byref(text), None)
        function(gl, "glCompileShader", None, uint)(shader)
        status = integer()
        function(gl, "glGetShaderiv", None, uint, uint, ptr)(shader, 0x8B81, C.byref(status))
        log = C.create_string_buffer(16384)
        function(gl, "glGetShaderInfoLog", None, uint, integer, ptr, ptr)(shader, len(log), None, log)
        assert status.value, log.value.decode()
        return shader

    vertex = compile_shader(0x8B31, """#version 300 es
    const vec2 positions[3] = vec2[3](vec2(-1,-1), vec2(3,-1), vec2(-1,3));
    void main() { gl_Position = vec4(positions[gl_VertexID], 0, 1); }
    """)
    function(gl, "glViewport", None, integer, integer, integer, integer)(0, 0, WIDTH, HEIGHT)
    function(gl, "glDisable", None, uint)(0x0BD0)  # Dithering wie in der lokalen Vorschau ausschalten.
    OUTPUT.mkdir(parents=True, exist_ok=True)
    records = []
    catalog = json.loads((ROOT / "site/catalog.json").read_text())
    assert len(catalog["demos"]) == len(TIMES), "Zeitpunkte an den Demo-Katalog anpassen"
    jobs = [(path, time, "ziel") for path, time in zip(catalog["demos"], TIMES)]
    # Zwischenbilder für die Erklärfolien; Shader und Katalog bleiben unverändert.
    jobs += [(catalog["demos"][2], 0.0, "kreis"),
             (catalog["demos"][4], 0.0, "zufall-pro-pixel"),
             (catalog["demos"][4], 0.0, "value-noise"),
             (catalog["demos"][5], 0.0, "fbm")]
    for manifest_path, time, snapshot in jobs:
        manifest = json.loads((ROOT / manifest_path).read_text())
        goal = next(s for s in manifest["snapshots"] if s["id"] == snapshot)
        path = Path(manifest_path).parent / goal["file"]
        source = (ROOT / path).read_bytes()
        fragment = compile_shader(0x8B30, "#version 300 es\nprecision highp float;\nuniform vec3 iResolution;\nuniform float iTime;\nout vec4 previewColor;\n"
                                  + source.decode() + "\nvoid main() { mainImage(previewColor, gl_FragCoord.xy); }\n")
        program = function(gl, "glCreateProgram", uint)()
        for shader in [vertex, fragment]:
            function(gl, "glAttachShader", None, uint, uint)(program, shader)
        function(gl, "glLinkProgram", None, uint)(program)
        status = integer()
        function(gl, "glGetProgramiv", None, uint, uint, ptr)(program, 0x8B82, C.byref(status))
        assert status.value, f"Shader-Linkfehler: {path}"
        function(gl, "glUseProgram", None, uint)(program)
        location = function(gl, "glGetUniformLocation", integer, uint, C.c_char_p)
        function(gl, "glUniform3f", None, integer, C.c_float, C.c_float, C.c_float)(location(program, b"iResolution"), WIDTH, HEIGHT, 1)
        function(gl, "glUniform1f", None, integer, C.c_float)(location(program, b"iTime"), time)
        function(gl, "glDrawArrays", None, uint, integer, integer)(4, 0, 3)
        pixels = C.create_string_buffer(WIDTH * HEIGHT * 4)
        function(gl, "glReadPixels", None, integer, integer, integer, integer, uint, uint, ptr)(0, 0, WIDTH, HEIGHT, 0x1908, 0x1401, pixels)
        assert function(gl, "glGetError", uint)() == 0, f"GL-Fehler: {path}"
        filename = manifest["id"] + ("" if snapshot == "ziel" else "-" + snapshot) + ".png"
        (OUTPUT / filename).write_bytes(png(pixels.raw))
        records.append({"file": filename, "source": str(path), "sha256": hashlib.sha256(source).hexdigest(), "iTime": time})
        print(f"{filename}: {WIDTH} × {HEIGHT}, iTime = {time}")
        function(gl, "glDeleteProgram", None, uint)(program)
        function(gl, "glDeleteShader", None, uint)(fragment)
    (OUTPUT / "renderdaten.json").write_text(json.dumps({"renderer": renderer, "width": WIDTH, "height": HEIGHT, "previews": records}, indent=2) + "\n")
    function(egl, "eglMakeCurrent", uint, ptr, ptr, ptr, ptr)(display, None, None, None)
    function(egl, "eglDestroyContext", uint, ptr, ptr)(display, context)
    function(egl, "eglDestroySurface", uint, ptr, ptr)(display, surface)
    function(egl, "eglTerminate", uint, ptr)(display)


if __name__ == "__main__":
    main()
