export function buildResponse(input, context, profile) {
  const text = input.toLowerCase();

  // 🔥 detect intent
  if (text.includes("build") || text.includes("make")) {
    return planBuild(text);
  }

  if (text.includes("solve") || text.includes("think")) {
    return planSolve(text);
  }

  if (text.includes("why")) {
    return explainWhy(text);
  }

  if (text.includes("how")) {
    return explainHow(text);
  }

  // 🎯 fallback but structured
  return [
    "Observe input",
    "Detect pattern",
    "No clear goal",
    "Ask for clarification"
  ];
}


// 🧠 LOGIC CHAINS

function planBuild(text) {
  return [
    "Define goal",
    "List components",
    "Design structure",
    "Implement step-by-step",
    "Test and refine"
  ];
}

function planSolve(text) {
  return [
    "Understand problem",
    "Break into parts",
    "Solve each part",
    "Combine results",
    "Verify answer"
  ];
}

function explainWhy(text) {
  return [
    "Identify cause",
    "Check dependencies",
    "Trace reasoning",
    "Conclude explanation"
  ];
}

function explainHow(text) {
  return [
    "Define objective",
    "Choose method",
    "Execute steps",
    "Evaluate result"
  ];
}
