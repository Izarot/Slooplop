export class Mood {
  constructor() {
    this.current = "neutral";
    this.intensity = 0;
  }

  update(input) {
    const text = input.toLowerCase();

    if (/(fuck|shit|idiot)/.test(text)) {
      this.current = "aggressive";
      this.intensity++;
      return;
    }

    if (/(hello|hi|thanks)/.test(text)) {
      this.current = "friendly";
      this.intensity++;
      return;
    }

    if (/(code|build|fix)/.test(text)) {
      this.current = "focused";
      this.intensity++;
      return;
    }

    if (/(why|how|explain)/.test(text)) {
      this.current = "analytical";
      this.intensity++;
      return;
    }

    this.intensity = Math.max(0, this.intensity - 1);
    if (this.intensity === 0) this.current = "neutral";
  }
}