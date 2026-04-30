export function generateResponse(input, memory, mood) {
  const text = input.toLowerCase();

  memory.add("user", input);
  mood.update(input);

  if (text.includes("hello") || text.includes("hi")) {
    return "Hello.";
  }

  if (/[0-9+\-*/]/.test(text)) {
    try {
      const clean = text.replace(/[^0-9+\-*/().]/g, "");
      const result = Function(`return (${clean})`)();
      return `\\(${clean} = ${result}\\)`;
    } catch {
      return "Invalid math.";
    }
  }

  if (text.length < 5) return "Too vague.";

  return "Continue.";
}