import { parse } from "./language/parser.js";

import { mapConcepts } from "./intelligence/conceptMapper.js";

import { reason } from "./intelligence/reasoner.js";

import { think } from "./intelligence/thoughtEngine.js";

import { evaluateWorldState } from "./world/worldModel.js";

import { buildSentence } from "./language/sentenceBuilder.js";

import { updateGlobalMemory } from "./learning/globalMemory.js";

import { detectPatterns } from "./learning/patternLearner.js";

import { renderLatex } from "./intelligence/latex.js";

import { applyGrammar } from "./language/grammarEngine.js";


export async function generateResponse(
  input,
  memory,
  mood,
  profile
) {

  try {

    // -----------------------------
    // INPUT CLEANING
    // -----------------------------

    const cleaned =
      String(input || "").trim();

    if (!cleaned) {
      return "Please say something.";
    }


    // -----------------------------
    // MEMORY
    // -----------------------------

    memory.add(
      "user",
      cleaned
    );


    // -----------------------------
    // MOOD + PROFILE
    // -----------------------------

    mood.update(cleaned);

    profile.update(cleaned);


    // -----------------------------
    // PARSER
    // -----------------------------

    const structure =
      parse(cleaned);


    // -----------------------------
    // CONCEPT MAPPING
    // -----------------------------

    const mappedConcepts =
      mapConcepts(structure);


    // -----------------------------
    // WORLD MODEL
    // -----------------------------

    const worldState =
      evaluateWorldState(
        structure,
        mappedConcepts
      );


    // -----------------------------
    // REASONER
    // -----------------------------

    const reasoning =
      reason(
        structure,
        mappedConcepts,
        worldState
      );


    // -----------------------------
    // THOUGHT ENGINE
    // -----------------------------

    const thought =
      think(
        structure,
        mappedConcepts,
        reasoning
      );


    // -----------------------------
    // PATTERN LEARNING
    // -----------------------------

    const patterns =
      detectPatterns(
        memory,
        structure
      );


    // -----------------------------
    // SENTENCE BUILDING
    // -----------------------------

    let response =
      buildSentence(
        structure,
        mappedConcepts,
        reasoning,
        thought,
        patterns,
        worldState
      );


    // -----------------------------
    // GRAMMAR FIXING
    // -----------------------------

    response =
      applyGrammar(response);


    // -----------------------------
    // STORE AI RESPONSE
    // -----------------------------

    memory.add(
      "ai",
      response
    );


    // -----------------------------
    // GLOBAL LEARNING
    // -----------------------------

    updateGlobalMemory(
      structure,
      reasoning,
      response
    );


    // -----------------------------
    // LATEX
    // -----------------------------

    setTimeout(() => {

      try {
        renderLatex();
      }

      catch (e) {
        console.warn(
          "LaTeX render warning:",
          e
        );
      }

    }, 0);


    // -----------------------------
    // FINAL RESPONSE
    // -----------------------------

    return response;

  }

  catch (error) {

    console.error(
      "FULL BRAIN ERROR:",
      error
    );

    return `
System reasoning failure:

${error.message}
    `;
  }
}