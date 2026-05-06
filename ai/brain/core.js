// /ai/brain/core.js

import { parse } from "./language/parser.js";

import { mapConcepts } from "./intelligence/conceptMapper.js";

import { reason } from "./intelligence/reasoner.js";

import { think } from "./intelligence/thoughtEngine.js";

import { evaluateWorldState } from "./world/worldModel.js";

import { buildSentence } from "./language/sentenceBuilder.js";

import { updateGlobalMemory } from "./learning/globalMemory.js";

import { detectPatterns } from "./learning/patternLearner.js";


export async function generateResponse(
  input,
  memory,
  mood,
  profile
) {

  // MEMORY

  memory.add(
    "user",
    input
  );

  mood.update(input);

  profile.update(input);

  // PARSING

  const structure =
    parse(input);

  // CONCEPTS

  const mappedConcepts =
    mapConcepts(structure);

  // WORLD MODEL

  const worldState =
    evaluateWorldState(
      structure,
      mappedConcepts
    );

  // REASONING

  const reasoning =
    reason(
      structure,
      mappedConcepts,
      worldState
    );

  // THOUGHT ENGINE

  const thought =
    think(
      structure,
      mappedConcepts,
      reasoning
    );

  // LEARNING

  const patterns =
    detectPatterns(
      memory,
      structure
    );

  // RESPONSE

  const response =
    buildSentence(
      structure,
      mappedConcepts,
      reasoning,
      thought,
      patterns,
      worldState
    );

  // STORE AI RESPONSE

  memory.add(
    "ai",
    response
  );

  // GLOBAL LEARNING

  updateGlobalMemory(
    structure,
    reasoning,
    response
  );

  return response;
}