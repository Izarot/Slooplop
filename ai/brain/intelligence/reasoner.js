// /ai/brain/intelligence/reasoner.js

import { FACTS } from "../knowledge/facts.js";

export function reason(structure, mappedConcepts) {

  const reasoning = {
    intent: structure.type,
    confidence: 0,
    observations: [],
    conclusions: [],
    answer: null
  };

  const dominant = mappedConcepts.dominantConcept;

  if (!dominant) {
    reasoning.observations.push(
      "No dominant concept detected"
    );

    reasoning.answer =
      "I cannot fully identify the topic yet.";

    return reasoning;
  }

  reasoning.observations.push(
    `Detected concept: ${dominant.word}`
  );

  reasoning.confidence += 1;

  // QUESTION REASONING

  if (structure.type === "question") {

    reasoning.observations.push(
      "User is asking for explanation"
    );

    // SKY REASONING

    if (
      dominant.word === "sky" &&
      structure.words.includes("green")
    ) {

      reasoning.conclusions.push(
        "Green sky is unusual"
      );

      reasoning.conclusions.push(
        "Possible atmospheric conditions"
      );

      reasoning.answer =
        "The sky is normally blue. If it appears green, it may be caused by storms, unusual lighting, or atmospheric particles.";

      reasoning.confidence += 2;
    }

    // WATER REASONING

    else if (
      dominant.word === "water" &&
      structure.words.includes("black")
    ) {

      reasoning.conclusions.push(
        "Black water is not normal"
      );

      reasoning.conclusions.push(
        "Possible darkness or pollution"
      );

      reasoning.answer =
        "Water is usually transparent. It can appear black because of darkness, depth, pollution, or lack of reflected light.";

      reasoning.confidence += 2;
    }

    // FACT LOOKUP

    else if (FACTS[dominant.word]) {

      reasoning.conclusions.push(
        "Using stored knowledge"
      );

      reasoning.answer =
        FACTS[dominant.word];

      reasoning.confidence += 1;
    }

    else {

      reasoning.answer =
        "I understand the question, but I do not yet have enough knowledge to answer properly.";
    }
  }

  // STATEMENTS

  else {

    reasoning.answer =
      "I understand your statement.";

    reasoning.confidence += 1;
  }

  return reasoning;
}