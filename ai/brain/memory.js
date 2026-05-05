export class Memory {
  constructor() {
    this.messages = [];
    this.patterns = {};   // learned patterns
    this.phrases = [];    // learned responses
  }

  // 🧠 store conversation
  add(role, text) {
    this.messages.push({ role, text });

    if (this.messages.length > 30) {
      this.messages.shift();
    }

    // learn from user input
    if (role === "user") {
      this.learnPattern(text);
    }
  }

  // 🔍 recent context
  getRecent(n = 5) {
    return this.messages.slice(-n).map(m => m.text).join(" ");
  }

  // 🧠 pattern learning (core idea)
  learnPattern(text) {
    const words = text.toLowerCase().split(/\s+/);

    words.forEach(word => {
      if (!this.patterns[word]) {
        this.patterns[word] = 0;
      }
      this.patterns[word]++;
    });
  }

  // 🧠 phrase learning
  storePhrase(response) {
    if (!this.phrases.includes(response)) {
      this.phrases.push(response);
    }

    if (this.phrases.length > 50) {
      this.phrases.shift();
    }
  }

  // 🔎 find similar phrase
  findSimilar(input) {
    const words = input.toLowerCase().split(/\s+/);

    let bestMatch = null;
    let bestScore = 0;

    this.phrases.forEach(phrase => {
      let score = 0;

      words.forEach(word => {
        if (phrase.includes(word)) score++;
      });

      if (score > bestScore) {
        bestScore = score;
        bestMatch = phrase;
      }
    });

    return bestMatch;
  }

  // 🧠 dominant topic
  getTopWord() {
    let max = 0;
    let word = null;

    for (let w in this.patterns) {
      if (this.patterns[w] > max) {
        max = this.patterns[w];
        word = w;
      }
    }

    return word;
  }
}