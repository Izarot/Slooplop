const COMMON_VERBS = [
  "is",
  "are",
  "was",
  "were",
  "do",
  "does",
  "make",
  "build",
  "explain",
  "learn",
  "think",
  "want",
  "need",
  "know",
  "feel",
  "see",
  "understand",
  "create",
  "become"
];

const QUESTION_WORDS = [
  "why",
  "how",
  "what",
  "when",
  "where",
  "who"
];

const PRONOUNS = [
  "i",
  "you",
  "it",
  "we",
  "they",
  "he",
  "she"
];

const ARTICLES = [
  "a",
  "an",
  "the"
];

export function analyze(input) {

  const raw = String(input || "")
    .toLowerCase()
    .trim();

  const words = raw.split(/\s+/);

  const structure = {
    type: "statement",
    isQuestion: false,
    subject: null,
    verb: null,
    object: [],
    rawWords: words
  };

  if (
    QUESTION_WORDS.some(q =>
      raw.startsWith(q)
    )
  ) {
    structure.isQuestion = true;
    structure.type = "question";
  }

  words.forEach(word => {

    if (
      !structure.subject &&
      PRONOUNS.includes(word)
    ) {
      structure.subject = word;
      return;
    }

    if (
      !structure.verb &&
      COMMON_VERBS.includes(word)
    ) {
      structure.verb = word;
      return;
    }

    if (!ARTICLES.includes(word)) {
      structure.object.push(word);
    }

  });

  if (!structure.subject) {
    structure.subject = "you";
  }

  return structure;
}

export function fixGrammar(input) {

  if (!input) {
    return "";
  }

  let words;

  if (Array.isArray(input)) {
    words = [...input];
  } else {
    words = String(input).split(/\s+/);
  }

  if (words.length === 0) {
    return "";
  }

  words[0] =
    words[0].charAt(0).toUpperCase() +
    words[0].slice(1);

  const fixed = words.map(word => {

    const lower = word.toLowerCase();

    if (lower === "u") {
      return "you";
    }

    if (lower === "r") {
      return "are";
    }

    if (lower === "wtf") {
      return "what is this";
    }

    return word;

  });

  let sentence = fixed.join(" ");

  if (
    !sentence.endsWith(".") &&
    !sentence.endsWith("?") &&
    !sentence.endsWith("!")
  ) {
    sentence += ".";
  }

  return sentence;
}

export const applyGrammar = fixGrammar;