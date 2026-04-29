export const mood = {
  current: "neutral",

  update(input) {
    const text = input.toLowerCase();

    if (text.includes("angry") || text.includes("hate")) {
      this.current = "aggressive";
    } else if (text.includes("love") || text.includes("happy")) {
      this.current = "friendly";
    } else if (text.includes("code") || text.includes("build")) {
      this.current = "focused";
    } else {
      this.current = "neutral";
    }
  }
};