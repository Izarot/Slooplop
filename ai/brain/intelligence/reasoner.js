// ai/brain/intelligence/reasoner.js

export function reason(structure, memory) {
  const thought = {
    topic: null,
    confidence: 0,
    intent: structure.type,
    depth: []
  };

  const words = structure.rawWords;

  // 🧠 detect topic
  if (words.includes("sky")) {
    thought.topic = "sky";
    thought.confidence += 2;
  }

  if (words.includes("math") || words.includes("solve")) {
    thought.topic = "math";
    thought.confidence += 2;
  }

  if (words.includes("ai")) {
    thought.topic = "ai";
    thought.confidence += 2;
  }

  // 🧠 reasoning depth (chain, but internal)
  if (structure.isQuestion) {
    thought.depth.push("question detected");
    thought.depth.push("seeking explanation");
  }

  if (words.length < 3) {
    thought.depth.push("input too short");
  }

  // 🧠 context influence
  const recent = memory.getRecent();

  if (recent.includes("math")) {
    thought.topic = "math";
    thought.depth.push("context suggests math");
  }

  return thought;
}