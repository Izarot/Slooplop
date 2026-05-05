// ai/brain/core.js

import { parse } from "./intelligence/parser.js";
import { interpret } from "./intelligence/meaning.js";
import { buildSentence } from "./intelligence/grammar.js";

export function generateResponse(input, memory, mood, profile) {
  // 🧠 store memory
  memory.add("user", input);

  // 🎭 update systems
  mood.update(input);
  profile.update(input);

  // 🧩 THINKING PIPELINE
  const words = parse(input);
  const thought = interpret(words);

  // 🧠 build response
  let response = buildSentence(thought, input, profile);

  // 🎭 apply mood styling
  response = style(response, mood);

  // 🧬 learning (simple reinforcement)
  if (profile.learn) {
    profile.learn(input, response);
  }

  return response;
}


// 🎭 STYLE ENGINE (light, not annoying)
function style(text, mood) {
  if (mood.current === "friendly") return text + " 🙂";
  if (mood.current === "aggressive") return text.toUpperCase();
  if (mood.current === "focused") return "[FOCUS] " + text;
  if (mood.current === "analytical") return "→ " + text;

  return text;
}