// ai/brain/intelligence/knowledge.js

export const KNOWLEDGE = {
  sky: {
    explanation: "The sky appears red due to scattering of light in the atmosphere, especially during sunrise or sunset."
  },

  math: {
    explanation: "Math works by applying logical rules to numbers and structures to find patterns and solutions."
  },

  ai: {
    explanation: "AI is a system that processes input, learns patterns, and generates responses based on data and logic."
  }
};


export function getKnowledge(topic) {
  if (!topic) return null;

  return KNOWLEDGE[topic] || null;
}