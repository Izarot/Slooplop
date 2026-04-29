export const memory = {
  messages: [],

  add(role, text) {
    this.messages.push({ role, text });

    if (this.messages.length > 50) {
      this.messages.shift();
    }
  }
};