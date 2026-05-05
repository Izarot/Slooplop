// ai/brain/intelligence/reasoner.js

export function reason(structure, memory) {
  const words = structure.rawWords;

  let thought = {
    topic: null,
    intent: structure.type,
    confidence: 0,
    reasoning: []
  };

  // topic detection
  if (words.includes("sky")) {
    thought.topic = "sky";
    thought.confidence += 2;
    thought.reasoning.push("detected sky topic");
  }

  if (words.includes("math") || words.includes("solve")) {
    thought.topic = "math";
    thought.confidence += 2;
    thought.reasoning.push("detected math topic");
  }

  if (words.includes("ai")) {
    thought.topic = "ai";
    thought.confidence += 2;
    thought.reasoning.push("detected ai topic");
  }

  // short input reasoning
  if (words.length < 3) {
    thought.reasoning.push("input too short");
  }

  // context influence (deterministic)
  const recent = memory.getRecent();

  if (recent.includes("math")) {
    thought.topic = "math";
    thought.reasoning.push("context reinforces math");
  }

  if (recent.includes("ai")) {
    thought.topic = "ai";
    thought.reasoning.push("context reinforces ai");
  }

  return thought;
}