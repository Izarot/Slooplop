import { generateResponse } from "../brain/core.js";
import { addMessage } from "./ui.js";

export function setupInput(memory, mood, profile) {
  document.addEventListener("DOMContentLoaded", () => {
    const inputEl = document.getElementById("input");
    const sendBtn = document.getElementById("sendBtn");

    if (!inputEl || !sendBtn) {
      alert("UI not found");
      return;
    }

    function send() {
      console.log("SEND CALLED"); // 🔍 debug
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

    // ✅ single reliable binding
    sendBtn.onclick = send;

    // ✅ Enter key
    inputEl.onkeydown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        send();
      }
    };

    // 🔍 tap debug
    sendBtn.addEventListener("touchstart", () => {
      console.log("TOUCH START DETECTED");
    });
  });
}