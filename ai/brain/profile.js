// ai/brain/profile.js

export class Profile {
  constructor() {
    this.tone = {
      friendly: 0,
      aggressive: 0,
      analytical: 0
    };

    this.preferences = {};
    this.history = [];
  }

  // 🧠 update based on input
  update(input) {
    const text = input.toLowerCase();

    if (/(hello|hi|thanks)/.test(text)) {
      this.tone.friendly++;
    }

    if (/(fuck|shit|idiot)/.test(text)) {
      this.tone.aggressive++;
    }

    if (/(why|how|explain)/.test(text)) {
      this.tone.analytical++;
    }

    // store interaction
    this.history.push(text);

    if (this.history.length > 50) {
      this.history.shift();
    }

    // detect interests
    const words = text.split(/\s+/);

    words.forEach(w => {
      if (!this.preferences[w]) {
        this.preferences[w] = 0;
      }
      this.preferences[w]++;
    });
  }

  // 🎯 dominant tone
  dominantTone() {
    return Object.keys(this.tone).reduce((a, b) =>
      this.tone[a] > this.tone[b] ? a : b
    );
  }

  // 🧠 top interest
  topInterest() {
    let max = 0;
    let key = null;

    for (let k in this.preferences) {
      if (this.preferences[k] > max) {
        max = this.preferences[k];
        key = k;
      }
    }

    return key;
  }

  // 🧬 personality shift
  evolveStyle() {
    const dominant = this.dominantTone();

    if (dominant === "friendly") {
      return "soft";
    }

    if (dominant === "aggressive") {
      return "sharp";
    }

    if (dominant === "analytical") {
      return "logical";
    }

    return "neutral";
  }
}