export class Memory {
  constructor() {
    this.messages = [];
    this.data = {};
  }

  add(type, text) {
    this.messages.push({ type, text });
  }

  set(key, value) {
    this.data[key] = value;
  }

  getLast(key) {
    return this.data[key];
  }
}