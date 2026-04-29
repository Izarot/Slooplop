export function generateResponse(input, memory, mood) {
  const text = input.toLowerCase();

  // update systems
  memory.add("user", input);
  mood.update(input);

  // === Intent Handling ===

  if (text.includes("hello") || text.includes("hi")) {
    return respond("Hello ⚡", mood);
  }

  if (text.includes("how are you")) {
    return respond("Operating smoothly ⚡", mood);
  }

  if (text.includes("code")) {
    return respond("Alright. What are we building? ⚡🔥", mood);
  }

  // === Dynamic fallback ===
  return generateDynamic(text, memory, mood);
}

function respond(base, mood) {
  if (mood.current === "friendly") return base + " 😊";
  if (mood.current === "aggressive") return base + " ⚠️";
  if (mood.current === "focused") return base + " 💻";
  return base;
}

function generateDynamic(text, memory, mood) {
  const variants = [
    `You're onto something: "${text}"`,
    `That input has potential ⚡`,
    `Processing that idea...`,
    `Expand on that.`,
    `Interesting direction.`,
  ];

  const pick = variants[Math.floor(Math.random() * variants.length)];
  return respond(pick, mood);
}