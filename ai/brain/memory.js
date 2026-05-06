// /ai/brain/memory.js

export class Memory {

  constructor() {

    // short-term memory

    this.messages = [];

    // compressed long-term memory

    this.longTerm = [];

    // concept memory

    this.concepts = {};

    // conversational state

    this.currentTopic = null;

    this.lastUserMessage = null;

    this.lastAIMessage = null;
  }


  // STORE MESSAGE

  add(role, text) {

    const message = {
      role,
      text,
      timestamp: Date.now()
    };

    this.messages.push(message);

    // limit short-term memory

    if (this.messages.length > 40) {

      this.messages.shift();
    }

    // update state

    if (role === "user") {

      this.lastUserMessage =
        text;
    }

    if (role === "ai") {

      this.lastAIMessage =
        text;
    }

    // concept extraction

    this.learnConcepts(text);
  }


  // CONCEPT LEARNING

  learnConcepts(text) {

    const words =
      text
        .toLowerCase()
        .split(/\s+/);

    words.forEach(word => {

      if (word.length < 4) {
        return;
      }

      if (!this.concepts[word]) {

        this.concepts[word] = 0;
      }

      this.concepts[word]++;
    });

    this.currentTopic =
      this.findDominantConcept();
  }


  // DOMINANT TOPIC

  findDominantConcept() {

    let best = null;

    let max = 0;

    for (const word in this.concepts) {

      if (
        this.concepts[word] > max
      ) {

        max =
          this.concepts[word];

        best = word;
      }
    }

    return best;
  }


  // RECENT MEMORY

  getRecent(count = 6) {

    return this.messages
      .slice(-count)
      .map(m => m.text)
      .join(" ");
  }


  // MEMORY SEARCH

  search(keyword) {

    return this.messages.filter(
      msg =>
        msg.text
          .toLowerCase()
          .includes(
            keyword.toLowerCase()
          )
    );
  }


  // LONG TERM MEMORY

  compressMemory() {

    const summary = {

      topic:
        this.currentTopic,

      timestamp:
        Date.now(),

      totalMessages:
        this.messages.length
    };

    this.longTerm.push(summary);

    // prevent huge memory

    if (
      this.longTerm.length > 50
    ) {

      this.longTerm.shift();
    }
  }


  // STATE EXPORT

  exportState() {

    return {

      topic:
        this.currentTopic,

      concepts:
        this.concepts,

      totalMessages:
        this.messages.length
    };
  }
}