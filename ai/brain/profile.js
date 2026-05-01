export class Profile {
  constructor() {
    this.tone = { friendly: 0, aggressive: 0, focused: 0, analytical: 0 };
    this.interests = {};
  }

  update(input) {
    const text = input.toLowerCase();

    if (/(hello|hi)/.test(text)) this.tone.friendly++;
    if (/(fuck|shit)/.test(text)) this.tone.aggressive++;
    if (/(code|build)/.test(text)) this.tone.focused++;
    if (/(why|how)/.test(text)) this.tone.analytical++;

    const keys = ["code", "math", "game", "ai"];
    keys.forEach(k => {
      if (text.includes(k)) {
        this.interests[k] = (this.interests[k] || 0) + 1;
      }
    });
  }

  dominantTone() {
    return Object.keys(this.tone).reduce((a, b) =>
      this.tone[a] > this.tone[b] ? a : b
    );
  }

  topInterest() {
    return Object.keys(this.interests).reduce((a, b) =>
      this.interests[a] > this.interests[b] ? a : b,
      "general"
    );
  }
}