// /ai/brain/learning/globalMemory.js

const GLOBAL_STATE = {

  totalMessages: 0,

  learnedConcepts: {},

  learnedPatterns: {},

  commonQuestions: {},

  emotionalPatterns: {},

  responseHistory: []
};


export function updateGlobalMemory(
  structure,
  reasoning,
  response
) {

  GLOBAL_STATE.totalMessages++;

  learnKeywords(structure);

  learnQuestion(structure);

  learnEmotion(structure);

  storeResponse(response);

  learnConcepts(reasoning);
}


function learnKeywords(structure) {

  structure.keywords.forEach(word => {

    if (
      !GLOBAL_STATE.learnedPatterns[word]
    ) {

      GLOBAL_STATE.learnedPatterns[word] = 0;
    }

    GLOBAL_STATE.learnedPatterns[word]++;
  });
}


function learnQuestion(structure) {

  if (
    structure.type !== "question"
  ) {
    return;
  }

  const key =
    structure.cleaned;

  if (
    !GLOBAL_STATE.commonQuestions[key]
  ) {

    GLOBAL_STATE.commonQuestions[key] = 0;
  }

  GLOBAL_STATE.commonQuestions[key]++;
}


function learnEmotion(structure) {

  const emotion =
    structure.emotion;

  if (
    !GLOBAL_STATE.emotionalPatterns[
      emotion
    ]
  ) {

    GLOBAL_STATE.emotionalPatterns[
      emotion
    ] = 0;
  }

  GLOBAL_STATE.emotionalPatterns[
    emotion
  ]++;
}


function storeResponse(response) {

  GLOBAL_STATE.responseHistory.push(
    response
  );

  if (
    GLOBAL_STATE.responseHistory
      .length > 100
  ) {

    GLOBAL_STATE.responseHistory.shift();
  }
}


function learnConcepts(reasoning) {

  reasoning.conclusions.forEach(
    conclusion => {

      if (
        !GLOBAL_STATE.learnedConcepts[
          conclusion
        ]
      ) {

        GLOBAL_STATE.learnedConcepts[
          conclusion
        ] = 0;
      }

      GLOBAL_STATE.learnedConcepts[
        conclusion
      ]++;
    }
  );
}


// READERS

export function getGlobalState() {
  return GLOBAL_STATE;
}


export function getTopPatterns() {

  return sortObject(
    GLOBAL_STATE.learnedPatterns
  );
}


function sortObject(obj) {

  return Object.entries(obj)
    .sort((a, b) =>
      b[1] - a[1]
    );
}