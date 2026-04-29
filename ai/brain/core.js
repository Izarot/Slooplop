export function generateResponse(input, memory, mood) {
  const text = input.toLowerCase();

  memory.add("user", input);
  mood.update(input);

  const context = getContext(memory);
  const intent = detectIntent(text);

  return routeIntent(intent, text, context, mood, memory);
}

// 🎯 intent detection
function detectIntent(text) {
  if (text.includes("hello") || text.includes("hi")) return "greet";
  if (text.includes("code") || text.includes("build")) return "build";
  if (text.includes("how are you")) return "status";
  if (text.includes("what")) return "question";
  if (isMath(text)) return "math";
  if (text.length < 5) return "low";
  return "unknown";
}

// 🧠 router
function routeIntent(intent, text, context, mood, memory) {

  switch (intent) {

    case "greet":
      return style("Hello.", mood);

    case "status":
      return style("Running stable. Learning.", mood);

    case "build":
      memory.add("topic", "build");
      return style("What are we building?", mood);

    case "question":
      return style("Be specific.", mood);

    case "math":
      return solveMath(text);

    case "low":
      return style("Too vague.", mood);

    default:
      return dynamic(text, context, mood, memory);
  }
}

// 🔥 dynamic fallback
function dynamic(text, context, mood, memory) {
  const lastTopic = memory.getLast("topic");

  if (lastTopic === "build") {
    return style("You're building something. Define the feature.", mood);
  }

  if (context.includes("hello")) {
    return style("Continue.", mood);
  }

  if (text.includes("fuck") || text.includes("fck")) {
    return style("Say it clearly.", mood);
  }

  if (text.length > 25) {
    return style("Good. Now refine it.", mood);
  }

  return style("Say something useful.", mood);
}

// 🎭 style (clean)
function style(text, mood) {
  return text;
}

// 🔍 context
function getContext(memory) {
  return memory.messages
    .slice(-5)
    .map(m => m.text.toLowerCase())
    .join(" ");
}

// 🧮 math detection
function isMath(text) {
  return /[0-9+\-*/^=]/.test(text);
}

// 🧠 math solver + LaTeX output
function solveMath(text) {
  try {
    const clean = text.replace(/[^0-9+\-*/().^]/g, "");

    const result = Function(`return (${clean})`)();

    return `\\(${clean} = ${result}\\)`; // LaTeX format
  } catch {
    return "Invalid math expression.";
  }
}