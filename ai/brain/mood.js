export class Mood {
  constructor() {
    this.current = "neutral";
  }

  update(input) {
    if (input.includes("!")) this.current = "aggressive";
    else this.current = "neutral";
  }
} 