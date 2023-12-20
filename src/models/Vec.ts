class Vec {
  x: number;
  y: number;
  private constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  plus(other: Vec) {
    return new Vec(this.x + other.x, this.y + other.y);
  }
  times(factor: number) {
    return new Vec(this.x * factor, this.y * factor);
  }
  static create(x: number, y: number) {
    return new Vec(x, y);
  }
}

export { Vec };
