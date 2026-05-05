import { fixGrammar } from "./grammarEngine.js";

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const OPENERS = [
  "I understand.",
  "Let me think.",
  "Here is what I see.",
  "Okay."
];

const THINKING_LINES = [
  "I analyze your input",
  "I look at the structure",
  "I try to understand the meaning"
];

const RESPONSES = [
  "This seems incomplete.",
  "You may want to clarify this.",
  "There is a pattern here.",
  "I can explain this better if you give more detail."
];

const ANSWERS = {
  sky: "The sky appears red due to light scattering in the atmosphere.",
  math: "Mathematics works by applying rules to numbers and structures."
};

export function build(structure, memory) {
  const words = structure.rawWords;

  // ✨ fix user sentence first
  const cleaned = fixGrammar([...words]);

  let sentence = "";

  // 🧠 opener
  sentence += random(OPENERS) + " ";

  // 🧠 reasoning (not visible as steps, but natural)
  if (Math.random() > 0.4) {
    sentence += random(THINKING_LINES) + ". ";
  }

  // 🧠 detect known topics
  let answer = null;

  for (let key in ANSWERS) {
    if (words.includes(key)) {
      answer = ANSWERS[key];
      break;
    }
  }

  // 🧠 generate output
  if (structure.isQuestion && answer) {
    sentence += answer;
  } 
  else if (structure.isQuestion) {
    sentence += "That is a good question. " + random(RESPONSES);
  } 
  else if (words.length <= 2) {
    sentence += "That is very short. Can you explain more?";
  } 
  else {
    sentence += cleaned + ".";
  }

  return sentence;
}