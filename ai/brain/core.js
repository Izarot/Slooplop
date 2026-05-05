// ai/brain/core.js

import { analyze } from "./language/grammarEngine.js";
import { build } from "./language/sentenceBuilder.js";
import { reason } from "./intelligence/reasoner.js";
import { getKnowledge } from "./intelligence/knowledge.js";

export function generateResponse(input, memory, mood, profile) {
  const text = input.trim();

  memory.add("user", text);
  mood.update(text);
  profile.update(text);

  const structure = analyze(text);
  const thought = reason(structure, memory);
  const knowledge = getKnowledge(thought.topic);

  let response = build(structure, memory);

  if (structure.isQuestion && knowledge) {
    response += " " + knowledge.explanation;
  }

  const recalled = memory.recall(text);
  if (recalled) {
    response = "Earlier you said: \"" + recalled + "\". " + response;
  }

  memory.add("ai", response);
  memory.storePhrase(response);

  return style(response, mood, profile);
}

function style(res, mood, profile) {
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

  const styleType = profile.evolveStyle ? profile.evolveStyle() : "neutral";

  if (styleType === "soft") {
    result += ".";
  }

  if (styleType === "sharp") {
    result = result.replace(/\.$/, "!"); 
  }

  if (styleType === "logical") {
    result = "Logically, " + result;
  }

  return result;
}