// /ai/brain/intelligence/conceptMapper.js

import { CONCEPTS } from "../knowledge/concepts.js";

export function mapConcepts(structure) {
  const concepts = [];

  structure.words.forEach(word => {
    const concept = findConcept(word);

    if (concept) {
      concepts.push({
        word,
        category: concept.category,
        properties: concept.properties,
        related: concept.related
      });
    }
  });

  return {
    concepts,
    dominantConcept: findDominant(concepts)
  };
}


function findConcept(word) {
  return CONCEPTS[word] || null;
}


function findDominant(concepts) {
  if (concepts.length === 0) {
    return null;
  }

  return concepts[0];
}