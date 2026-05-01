import { generateResponse } from "../brain/core.js";
import { addMessage } from "./ui.js";

export function setupInput(memory, mood, profile) {
  const inputEl = document.getElementById("input");
  const sendBtn = document.getElementById("sendBtn");
  const chat = document.getElementById("chat");

  if (!inputEl || !sendBtn || !chat) {
    console.error("Missing elements");
    return;
  }

  function send() {
    const text = inputEl.value.trim();
    if (!text) return;

    addMessage(text, "user");

    let response;
    try {
      response = generateResponse(text, memory, mood, profile);
    } catch (e) {
      console.error(e);
      response = "Brain error";
    }

    setTimeout(() => {
      addMessage(response, "ai");
    }, 120);

    inputEl.value = "";
  }

  // ✅ 1. ENTER ALWAYS WORKS
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      send();
    }
  });

  // ✅ 2. BUTTON CLICK (keep it simple)
  sendBtn.onclick = send;

  // 🔥 3. BACKUP: TAP ANYWHERE NEAR INPUT SENDS
  document.addEventListener("touchend", (e) => {
    const rect = sendBtn.getBoundingClientRect();

    const x = e.changedTouches[0].clientX;
    const y = e.changedTouches[0].clientY;

    // if tap is near button (extra hitbox)
    if (
      x > rect.left - 20 &&
      x < rect.right + 20 &&
      y > rect.top - 20 &&
      y < rect.bottom + 20
    ) {
      send();
    }
  });
}