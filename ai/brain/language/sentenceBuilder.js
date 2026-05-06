// /ai/brain/language/sentenceBuilder.js

import { applyGrammar }
from "./grammarEngine.js";

export function buildSentence(
  structure,
  mappedConcepts,
  reasoning,
  thought
) {

  let response = "";

  // OPENING

  response += buildOpening(
    structure,
    thought
  );

  // MAIN ANSWER

  if (reasoning.answer) {

    response += " " +
      reasoning.answer;
  }

  // EXPLANATION LAYER

  if (
    thought.responsePlan
      .includeExplanation
  ) {

    response += buildExplanation(
      reasoning
    );
  }

  // FINAL GRAMMAR

  response =
    applyGrammar(response);

  return response;
}


function buildOpening(
  structure,
  thought
) {

  // question mode

  if (structure.type === "question") {

    if (
      thought.responsePlan.tone
      === "logical"
    ) {

      return "Logically speaking,";
    }

    return "From my analysis,";
  }

  // statements

  if (
    structure.emotion
    === "anger"
  ) {

    return "I understand your frustration.";
  }

  return "I understand.";
}


function buildExplanation(
  reasoning
) {

  if (
    !reasoning.conclusions ||
    reasoning.conclusions.length === 0
  ) {
    return "";
  }

  let explanation =
    " Reasoning: ";

  explanation +=
    reasoning.conclusions.join(
      ", "
    );

  return explanation;
}