import { generateResponse } from "../brain/core.js";
import { addMessage } from "./ui.js";

export function setupInput(memory, mood) {
  const inputEl = document.getElementById("input");
  const sendBtn = document.getElementById("sendBtn");

  sendBtn.onclick = send;
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") send();
  });

  function send() {
    const text = inputEl.value.trim();
    if (!text) return;

    addMessage(text, "user");

    const response = generateResponse(text, memory, mood);

    setTimeout(() => {
      addMessage(response, "ai");
      renderMath();
    }, 200);

    inputEl.value = "";
  }
}

// LaTeX rendering
function renderMath() {
  if (window.renderMathInElement) {
    renderMathInElement(document.body);
  }
}