// /ai/brain/world/worldModel.js

import { getCategory }
from "./categories.js";

export function evaluateWorldState(
  structure,
  mappedConcepts
) {

  const state = {

    assumptions: [],

    inconsistencies: [],

    probabilities: [],

    realismScore: 0
  };

  // analyze concepts

  mappedConcepts.concepts.forEach(
    concept => {

      const category =
        getCategory(concept.word);

      state.assumptions.push(
        `${concept.word} belongs to ${category}`
      );

      state.realismScore += 1;
    }
  );

  // unusual sky colors

  if (
    structure.words.includes("sky") &&
    structure.words.includes("green")
  ) {

    state.inconsistencies.push(
      "Sky is not normally green"
    );

    state.probabilities.push(
      "Possible storm conditions"
    );

    state.probabilities.push(
      "Possible atmospheric distortion"
    );
  }

  // unusual water colors

  if (
    structure.words.includes("water") &&
    structure.words.includes("black")
  ) {

    state.inconsistencies.push(
      "Water is not normally black"
    );

    state.probabilities.push(
      "Possible darkness or pollution"
    );
  }

  // confidence scaling

  if (
    state.inconsistencies.length === 0
  ) {

    state.realismScore += 2;
  }

  return state;
}