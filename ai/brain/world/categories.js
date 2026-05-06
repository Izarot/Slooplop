// /ai/brain/world/categories.js

export const CATEGORIES = {

  nature: [
    "sky",
    "water",
    "tree",
    "forest",
    "cloud",
    "rain",
    "river",
    "ocean",
    "mountain"
  ],

  science: [
    "math",
    "physics",
    "gravity",
    "energy",
    "atom",
    "equation"
  ],

  technology: [
    "ai",
    "computer",
    "robot",
    "algorithm",
    "program"
  ],

  space: [
    "sun",
    "moon",
    "earth",
    "planet",
    "star",
    "galaxy"
  ],

  emotion: [
    "anger",
    "fear",
    "happy",
    "sad",
    "confused"
  ]
};


export function getCategory(word) {

  for (const category in CATEGORIES) {

    if (
      CATEGORIES[category]
        .includes(word)
    ) {

      return category;
    }
  }

  return "unknown";
}