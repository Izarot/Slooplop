import { generateResponse } from "../brain/core.js";
import { addMessage } from "./ui.js";

export function setupInput(memory, mood, profile) {
  const inputEl = document.getElementById("input");
  const sendBtn = document.getElementById("sendBtn");

  if (!inputEl || !sendBtn) {
    alert("UI not found");
    return;
  }

  function send() {
    const text = inputEl.value.trim();
    if (!text) return;

    addMessage(text, "user");

    let response = "Error";
    try {
      response = generateResponse(text, memory, mood, profile);
    } catch (e) {
      console.error(e);
    }

    setTimeout(() => {
      addMessage(response, "ai");
    }, 120);

    inputEl.value = "";
  }

  // ✅ attach directly (NO DOMContentLoaded)
  sendBtn.onclick = send;

  inputEl.onkeydown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      send();
    }
  };
}