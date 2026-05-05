// ai/brain/intelligence/grammar.js

import { dictionary } from "./dictionary.js";

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function buildSentence(thought, input, profile) {
  // 🧠 greeting
  if (thought.intent === "greet") {
    return pick(dictionary.responses.greet);
  }

  // 🧠 explanation
  if (thought.intent === "explain") {
    return "You're asking why. Here's the idea: " + input;
  }

  // 🧠 process / how
  if (thought.intent === "process") {
    return "To do this, break it into steps and execute carefully.";
  }

  // 🧠 creation
  if (thought.intent === "create") {
    return "Start by defining a goal, then build step by step.";
  }

  // 🧠 math (placeholder for future LaTeX power)
  if (thought.intent === "math") {
    return "Let's solve this step by step: " + input;
  }

  // 😡 aggressive tone override
  if (thought.tone === "aggressive") {
    return pick(dictionary.responses.calm);
  }

  // 🧠 adapt to user interest
  if (profile && profile.topInterest && profile.topInterest() === "math") {
    return "Since you like math, let's analyze this logically.";
  }

  // 🤷 fallback
  return pick(dictionary.responses.unknown);
}