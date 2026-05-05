// ai/brain/intelligence/dictionary.js

export const dictionary = {
  intents: {
    greet: ["hi", "hello", "hey"],
    explain: ["why"],
    process: ["how"],
    create: ["build", "make", "create"],
    math: ["solve", "calculate"]
  },

  tone: {
    aggressive: ["fuck", "shit", "idiot"],
    friendly: ["thanks", "good", "nice"]
  },

  responses: {
    greet: ["Hello.", "Hey.", "Hi there."],
    unknown: ["I need more clarity.", "Explain that better."],
    calm: ["Relax. Let's stay focused."],
    thinking: ["Let me think...", "Processing that..."]
  }
};
