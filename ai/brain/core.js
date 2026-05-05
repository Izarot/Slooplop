import { analyze } from "./language/grammarEngine.js";
import { build } from "./language/sentenceBuilder.js";

export function generateResponse(input, memory, mood, profile) {
  const text = input.trim();

  // 🧠 store input
  memory.add("user", text);

  mood.update(text);
  profile.update(text);

  // 🧠 analyze structure
  const structure = analyze(text);

  // 🧠 try reuse learned response
  const learned = memory.findSimilar(text);

  let response;

  if (learned && Math.random() > 0.4) {
    // 🔁 reuse + mutate slightly
    response = mutate(learned);
  } else {
    // 🧠 generate fresh
    response = build(structure, memory);
  }

  // 🧠 store AI response
  memory.add("ai", response);
  memory.storePhrase(response);

  return style(response, mood, memory);
}


// 🧬 mutation system (gives variation)
function mutate(text) {
  const variations = [
    text,
    text + ".",
    text.replace("I", "I think"),
    text.replace("understand", "get"),
  ];

  return variations[Math.floor(Math.random() * variations.length)];
}


// 🎭 tone styling
function style(res, mood, memory) {
  let result = res;

  if (mood.current === "friendly") {
    result += " 🙂";
  }

  if (mood.current === "aggressive") {
    result = result.toUpperCase();
  }

  if (mood.current === "analytical") {
    result = "→ " + result;
  }

  // 🧠 inject topic awareness
  const topic = memory.getTopWord();
  if (topic && Math.random() > 0.7) {
    result += ` (You seem to talk about "${topic}")`;
  }

  return result;
}