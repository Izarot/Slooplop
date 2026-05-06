// /ai/brain/language/parser.js

const QUESTION_WORDS = [
  "why",
  "how",
  "what",
  "when",
  "where",
  "who"
];

const EMOTIONAL_WORDS = {
  anger: ["fuck", "shit", "idiot", "stupid"],
  curiosity: ["why", "how", "what"],
  happiness: ["good", "nice", "great"],
  confusion: ["huh", "what", "confused"]
};

export function parse(input) {
  const cleaned = clean(input);

  const words = cleaned.split(/\s+/).filter(Boolean);

  const structure = {
    raw: input,
    cleaned,
    words,

    type: detectType(words),
    emotion: detectEmotion(words),

    subject: detectSubject(words),
    verb: detectVerb(words),
    object: detectObject(words),

    keywords: extractKeywords(words),

    hasMath: detectMath(input),
    hasLatex: detectLatex(input),

    timestamp: Date.now()
  };

  return structure;
}


function clean(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s$^*+\-=(){}[\].]/g, "")
    .trim();
}


function detectType(words) {
  if (words.length === 0) return "empty";

  if (QUESTION_WORDS.includes(words[0])) {
    return "question";
  }

  return "statement";
}


function detectEmotion(words) {
  for (const emotion in EMOTIONAL_WORDS) {
    const set = EMOTIONAL_WORDS[emotion];

    if (words.some(w => set.includes(w))) {
      return emotion;
    }
  }

  return "neutral";
}


function detectSubject(words) {
  if (words.length === 0) return null;

  return words[0];
}


function detectVerb(words) {
  const COMMON_VERBS = [
    "is",
    "are",
    "was",
    "were",
    "build",
    "make",
    "explain",
    "solve",
    "learn",
    "think"
  ];

  for (const word of words) {
    if (COMMON_VERBS.includes(word)) {
      return word;
    }
  }

  return null;
}


function detectObject(words) {
  if (words.length <= 2) return [];

  return words.slice(1);
}


function extractKeywords(words) {
  return words.filter(w => w.length > 3);
}


function detectMath(text) {
  return /[+\-*/=^]/.test(text);
}


function detectLatex(text) {
  return /\$.*\$/.test(text);
}