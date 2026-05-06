// /ai/brain/intelligence/thoughtEngine.js

export function think(structure, mappedConcepts, reasoning) {

  const thought = {
    stages: [],
    finalIntent: structure.type,
    emotionalState: structure.emotion,
    confidence: reasoning.confidence,
    responsePlan: null
  };

  // STAGE 1
  thought.stages.push({
    stage: "input_analysis",
    result: "Input parsed successfully"
  });

  // STAGE 2
  if (mappedConcepts.concepts.length > 0) {

    thought.stages.push({
      stage: "concept_mapping",
      result:
        `Mapped ${mappedConcepts.concepts.length} concepts`
    });

  } else {

    thought.stages.push({
      stage: "concept_mapping",
      result:
        "No concepts identified"
    });
  }

  // STAGE 3
  thought.stages.push({
    stage: "reasoning",
    result:
      reasoning.answer || "No reasoning output"
  });

  // STAGE 4
  thought.responsePlan =
    buildResponsePlan(
      structure,
      reasoning
    );

  return thought;
}


function buildResponsePlan(structure, reasoning) {

  const plan = {
    tone: "neutral",
    style: "informative",
    includeExplanation: false
  };

  // QUESTION HANDLING

  if (structure.type === "question") {

    plan.style = "explanatory";
    plan.includeExplanation = true;
  }

  // EMOTION HANDLING

  if (structure.emotion === "anger") {

    plan.tone = "calm";
  }

  if (structure.emotion === "curiosity") {

    plan.tone = "logical";
  }

  return plan;
}