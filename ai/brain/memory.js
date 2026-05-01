export class Memory {
  constructor() {
    this.messages = [];
  }

  add(role, text) {
    this.messages.push({ role, text });
    if (this.messages.length > 20) this.messages.shift();
  }

  getRecent(n = 5) {
    return this.messages.slice(-n).map(m => m.text).join(" ").toLowerCase();
  }
}