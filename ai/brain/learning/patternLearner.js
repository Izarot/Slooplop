// /ai/brain/learning/patternLearner.js

export function detectPatterns(
  memory,
  structure
) {

  const recent =
    memory.getRecent(10);

  const patterns = {

    repeatedQuestions: false,

    repeatedConcepts: [],

    userBehavior: "normal",

    dominantTopic: null
  };

  // repeated question detection

  if (
    recent.includes(
      structure.cleaned
    )
  ) {

    patterns.repeatedQuestions =
      true;
  }

  // dominant topic detection

  const frequency = {};

  structure.keywords.forEach(
    word => {

      if (!frequency[word]) {

        frequency[word] = 0;
      }

      frequency[word]++;
    }
  );

  patterns.dominantTopic =
    findDominant(frequency);

  // aggressive behavior

  if (
    structure.emotion === "anger"
  ) {

    patterns.userBehavior =
      "aggressive";
  }

  return patterns;
}


function findDominant(obj) {

  let best = null;

  let max = 0;

  for (const key in obj) {

    if (obj[key] > max) {

      max = obj[key];

      best = key;
    }
  }

  return best;
}