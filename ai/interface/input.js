import { generateResponse } from "../brain/core.js";
import { addMessage } from "./ui.js";

export function setupInput(memory, mood, profile) {
  const inputEl = document.getElementById("input");
  const sendBtn = document.getElementById("sendBtn");

  function send() {
    const text = inputEl.value.trim();
    if (!text) return;

    addMessage(text, "user");

    const response = generateResponse(text, memory, mood, profile);

    setTimeout(() => {
      addMessage(response, "ai");
    }, 150);

    inputEl.value = "";
  }

  // ✅ FIX: works on mobile + desktop
  sendBtn.addEventListener("click", send);
  sendBtn.addEventListener("touchend", send);

  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") send();
  });
}