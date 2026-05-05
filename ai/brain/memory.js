// ai/brain/memory.js

export class Memory {
  constructor() {
    this.messages = [];
    this.phrases = [];
  }

  // 🧠 store messages
  add(role, text) {
    this.messages.push({ role, text });

    if (this.messages.length > 40) {
      this.messages.shift();
    }
  }

  // 🔍 recent context
  getRecent(n = 5) {
    return this.messages.slice(-n).map(m => m.text).join(" ");
  }

  // 🧠 store AI responses
  storePhrase(response) {
    if (!this.phrases.includes(response)) {
      this.phrases.push(response);
    }

    if (this.phrases.length > 60) {
      this.phrases.shift();
    }
  }

  // 🔎 find similar phrase
  findSimilar(input) {
    const words = input.toLowerCase().split(/\s+/);

    let best = null;
    let score = 0;

    this.phrases.forEach(p => {
      let s = 0;

      words.forEach(w => {
        if (p.includes(w)) s++;
      });

      if (s > score) {
        score = s;
        best = p;
      }
    });

    return best;
  }

  // 🧠 memory recall (NEW 🔥)
  recall(input) {
    const words = input.toLowerCase().split(/\s+/);

    for (let i = this.messages.length - 1; i >= 0; i--) {
      const msg = this.messages[i];

      if (msg.role === "user") {
        for (let w of words) {
          if (msg.text.toLowerCase().includes(w)) {
            return msg.text;
          }
        }
      }
    }

    return null;
  }
}