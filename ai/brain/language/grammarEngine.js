const COMMON_VERBS = [
  "is", "are", "was", "were", "do", "does",
  "make", "build", "explain", "learn", "think",
  "want", "need", "know"
];

const QUESTION_WORDS = ["why", "how", "what", "when", "where"];
const PRONOUNS = ["i", "you", "it", "we", "they"];
const ARTICLES = ["a", "an", "the"];

export function analyze(input) {
  const raw = input.toLowerCase().trim();
  const words = raw.split(/\s+/);

  let structure = {
    type: "statement",
    isQuestion: false,
    subject: null,
    verb: null,
    object: [],
    rawWords: words
  };

  // detect question
  if (QUESTION_WORDS.some(q => raw.startsWith(q))) {
    structure.isQuestion = true;
    structure.type = "question";
  }

  // basic parsing
  words.forEach(word => {
    if (!structure.subject && PRONOUNS.includes(word)) {
      structure.subject = word;
      return;
    }

    if (!structure.verb && COMMON_VERBS.includes(word)) {
      structure.verb = word;
      return;
    }

    if (!ARTICLES.includes(word)) {
      structure.object.push(word);
    }
  });

  // fallback subject
  if (!structure.subject) {
    structure.subject = "you";
  }

  return structure;
}


// ✨ BASIC ENGLISH FIXER
export function fixGrammar(words) {
  if (!words || words.length === 0) return "";

  // Capitalize first word
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);

  // Fix common shorthand
  return words
    .map(w => {
      if (w === "u") return "you";
      if (w === "r") return "are";
      if (w === "wtf") return "what is this";
      return w;
    })
    .join(" ");
}