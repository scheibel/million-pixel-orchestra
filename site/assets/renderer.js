import { AnimationClock } from "./clock.js";

const vertexSource = `#version 300 es
const vec2 positions[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
void main() { gl_Position = vec4(positions[gl_VertexID], 0.0, 1.0); }`;

function fragmentSource(source) {
  return `#version 300 es
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
out vec4 previewColor;
#line 1 0
${source}
#line 1 1
void main() { mainImage(previewColor, gl_FragCoord.xy); }
`;
}

export function parseCompilerLog(log) {
  return log.split("\n").filter(line => line.trim()).map(message => {
    const match = message.match(/(?:ERROR|WARNING):\s*(\d+):(\d+):/) || message.match(/^(\d+)\((\d+)\)/);
    return { line: match && Number(match[1]) === 0 && Number(match[2]) > 0 ? Number(match[2]) : null, message };
  });
}

export class ShaderPreview {
  constructor(canvas, { onFrame, onError, onRestore }) {
    this.canvas = canvas;
    this.onFrame = onFrame;
    this.onError = onError;
    this.onRestore = onRestore;
    this.clock = new AnimationClock();
    this.gl = canvas.getContext("webgl2", { alpha: false, antialias: false });
    if (!this.gl) throw new Error("WebGL2 ist nicht verfügbar. Bitte einen aktuellen Browser mit aktivierter Grafikbeschleunigung verwenden.");
    this.initialize();
    this.dirty = true;
    this.lastDisplay = -Infinity;
    this.contextLost = event => {
      event.preventDefault();
      this.lost = true;
      this.onError("Die Grafikverbindung wurde unterbrochen. Die Vorschau wartet auf ihre Wiederherstellung.");
    };
    this.contextRestored = () => {
      try {
        this.lost = false;
        this.initialize();
        this.onRestore();
      } catch (error) { this.onError(error.message); }
    };
    canvas.addEventListener("webglcontextlost", this.contextLost);
    canvas.addEventListener("webglcontextrestored", this.contextRestored);
    this.tick = this.tick.bind(this);
    this.frame = requestAnimationFrame(this.tick);
  }

  initialize() {
    const gl = this.gl;
    this.program = null;
    this.vertex = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(this.vertex, vertexSource);
    gl.compileShader(this.vertex);
    if (!gl.getShaderParameter(this.vertex, gl.COMPILE_STATUS)) {
      throw new Error(`Das Vorschau-Gerüst konnte nicht gestartet werden: ${gl.getShaderInfoLog(this.vertex)}`);
    }
    this.vao = gl.createVertexArray();
    gl.bindVertexArray(this.vao);
    gl.disable(gl.DITHER);
    gl.clearColor(0.09, 0.17, 0.18, 1);
    this.dirty = true;
  }

  compile(source) {
    if (this.lost) throw new Error("Die Grafikverbindung ist unterbrochen. Bitte auf die Wiederherstellung warten.");
    const gl = this.gl;
    const fragment = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragment, fragmentSource(source));
    gl.compileShader(fragment);
    if (!gl.getShaderParameter(fragment, gl.COMPILE_STATUS)) {
      const log = gl.getShaderInfoLog(fragment) || "Unbekannter GLSL-Kompilierfehler.";
      gl.deleteShader(fragment);
      return { ok: false, log, errors: parseCompilerLog(log) };
    }
    const program = gl.createProgram();
    gl.attachShader(program, this.vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.detachShader(program, fragment);
    gl.deleteShader(fragment);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const log = gl.getProgramInfoLog(program) || "Der Shader konnte nicht verbunden werden.";
      gl.deleteProgram(program);
      return { ok: false, log, errors: [{ line: null, message: log }] };
    }
    if (this.program) gl.deleteProgram(this.program);
    this.program = program;
    this.resolutionLocation = gl.getUniformLocation(program, "iResolution");
    this.timeLocation = gl.getUniformLocation(program, "iTime");
    this.dirty = true;
    return { ok: true };
  }

  resetTime() { this.clock.reset(); this.dirty = true; }
  toggle() { this.clock.toggle(); this.dirty = true; }

  tick(now) {
    this.frame = requestAnimationFrame(this.tick);
    if (this.lost) return;
    try {
      const gl = this.gl;
      const ratio = window.devicePixelRatio || 1;
      const bounds = this.canvas.getBoundingClientRect();
      const maxSize = this.maxSize ??= Math.min(gl.getParameter(gl.MAX_RENDERBUFFER_SIZE), ...gl.getParameter(gl.MAX_VIEWPORT_DIMS));
      const scale = Math.min(ratio, maxSize / Math.max(bounds.width, bounds.height, 1));
      const width = Math.max(1, Math.round(bounds.width * scale));
      const height = Math.max(1, Math.round(bounds.height * scale));
      if (width !== this.canvas.width || height !== this.canvas.height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.dirty = true;
      }
      const time = this.clock.read(now);
      if (this.dirty || this.clock.playing) {
        gl.viewport(0, 0, width, height);
        if (this.program) {
          gl.useProgram(this.program);
          gl.bindVertexArray(this.vao);
          gl.uniform3f(this.resolutionLocation, width, height, 1);
          gl.uniform1f(this.timeLocation, time);
          gl.drawArrays(gl.TRIANGLES, 0, 3);
        } else gl.clear(gl.COLOR_BUFFER_BIT);
        this.dirty = false;
      }
      if (now - this.lastDisplay > 70) {
        this.onFrame(time, width, height);
        this.lastDisplay = now;
      }
    } catch (error) {
      cancelAnimationFrame(this.frame);
      this.onError(`Die Vorschau wurde angehalten: ${error.message}`);
    }
  }

  destroy() {
    cancelAnimationFrame(this.frame);
    this.canvas.removeEventListener("webglcontextlost", this.contextLost);
    this.canvas.removeEventListener("webglcontextrestored", this.contextRestored);
    if (this.program) this.gl.deleteProgram(this.program);
    this.gl.deleteShader(this.vertex);
    this.gl.deleteVertexArray(this.vao);
  }
}
