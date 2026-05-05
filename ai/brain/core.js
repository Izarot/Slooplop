// ai/brain/core.js

import { analyze } from "./language/grammarEngine.js";
import { build } from "./language/sentenceBuilder.js";
import { reason } from "./intelligence/reasoner.js";
import { getKnowledge } from "./intelligence/knowledge.js";

export function generateResponse(input, memory, mood, profile) {
  const text = input.trim();

  // store input
  memory.add("user", text);

  // update systems
  mood.update(text);
  profile.update(text);

  // analyze structure
  const structure = analyze(text);

  // reasoning layer
  const thought = reason(structure, memory);

  // knowledge layer
  const knowledge = getKnowledge(thought.topic);

  // memory recall (deterministic)
  const recalled = memory.recall(text);

  let responseParts = [];

  // 1. memory relevance (only if strong match)
  if (recalled && recalled !== text) {
    responseParts.push("You mentioned before: \"" + recalled + "\".");
  }

  // 2. grammar-based base response
  const base = build(structure, memory);
  responseParts.push(base);

  // 3. inject knowledge if question + topic exists
  if (structure.isQuestion && knowledge) {
    responseParts.push(knowledge.explanation);
  }

  // 4. profile awareness (deterministic)
  const interest = profile.topInterest();
  if (interest && interest !== thought.topic) {
    responseParts.push("You often talk about \"" + interest + "\".");
  }

  const response = responseParts.join(" ");

  // store output
  memory.add("ai", response);
  memory.storePhrase(response);

  return style(response, mood, profile);
}


// deterministic style system
function style(text, mood, profile) {
  const tone = profile.dominantTone();

  if (tone === "friendly") {
    return text + " 🙂";
  }

  if (tone === "aggressive") {
    return text.toUpperCase();
  }

  if (tone === "analytical") {
    return "→ " + text;
  }

  return text;
}