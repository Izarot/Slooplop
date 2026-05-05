// ai/brain/intelligence/meaning.js

import { dictionary } from "./dictionary.js";

export function interpret(words) {
  const thought = {
    intent: "unknown",
    tone: "neutral",
    keywords: []
  };

  // detect intent
  for (const [intent, list] of Object.entries(dictionary.intents)) {
    if (words.some(w => list.includes(w))) {
      thought.intent = intent;
      break;
    }
  }

  // detect tone
  for (const [tone, list] of Object.entries(dictionary.tone)) {
    if (words.some(w => list.includes(w))) {
      thought.tone = tone;
      break;
    }
  }

  // store keywords (simple version)
  thought.keywords = words.filter(w => w.length > 3);

  return thought;
}