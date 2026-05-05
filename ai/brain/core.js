// ai/brain/core.js

import { analyze } from "./language/grammarEngine.js";
import { build } from "./language/sentenceBuilder.js";
import { reason } from "./intelligence/reasoner.js";
import { getKnowledge } from "./intelligence/knowledge.js";

export function generateResponse(input, memory, mood, profile) {
  const text = input.trim();

  // 🧠 store input
  memory.add("user", text);

  // 🎭 update systems
  mood.update(text);
  profile.update(text);

  // 🧠 analyze structure
  const structure = analyze(text);

  // 🧠 internal reasoning
  const thought = reason(structure, memory);

  // 📚 knowledge lookup
  const knowledge = getKnowledge(thought.topic);

  // 🧠 build base response
  let response = build(structure, memory);

  // 📚 inject knowledge if relevant
  if (structure.isQuestion && knowledge) {
    response += " " + knowledge.explanation;
  }

  // 🧬 learning
  memory.add("ai", response);
  memory.storePhrase(response);

  return style(response, mood);
}


// 🎭 style system
function style(text, mood) {
  let res = text;

  if (mood.current === "friendly") {
    res += " 🙂";
  }

  if (mood.current === "aggressive") {
    res = res.toUpperCase();
  }

  if (mood.current === "analytical") {
    res = "→ " + res;
  }

  return res;
}