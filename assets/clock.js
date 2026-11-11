export class AnimationClock {
  constructor(now = performance.now()) {
    this.playing = true;
    this.offset = 0;
    this.started = now;
  }

  read(now = performance.now()) {
    return this.offset + (this.playing ? (now - this.started) / 1000 : 0);
  }

  toggle(now = performance.now()) {
    this.offset = this.read(now);
    this.started = now;
    this.playing = !this.playing;
  }

  reset(now = performance.now()) {
    this.offset = 0;
    this.started = now;
  }
}
