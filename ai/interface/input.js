// ai/interface/input.js

import { generateResponse } from "../brain/core.js";
import { addMessage } from "./ui.js";
import { renderLatex } from "../brain/intelligence/latex.js";

export function setupInput(memory, mood, profile) {
  const inputEl = document.getElementById("input");
  const sendBtn = document.getElementById("sendBtn");

  if (!inputEl || !sendBtn) {
    alert("UI not found");
    return;
  }

  // 🧠 SEND FUNCTION
  function send() {
    const text = inputEl.value.trim();
    if (!text) return;

    // show user message
    addMessage(text, "user");

    let response = "Error";

    try {
      response = generateResponse(text, memory, mood, profile);
    } catch (e) {
      console.error("AI error:", e);
      response = "Something broke.";
    }

    // show AI response
    setTimeout(() => {
      addMessage(response, "ai");

      // 🔥 render LaTeX after message
      renderLatex();

    }, 120);

    inputEl.value = "";
  }

  // ✅ BUTTON CLICK
  sendBtn.onclick = send;

  // ✅ ENTER KEY
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      send();
    }
  });
}