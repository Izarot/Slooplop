import { generateResponse } from "./brain/core.js";

const chat = document.getElementById("chat");
const input = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");

// ===== ADD MESSAGE =====

function addMessage(text, type) {
  const msg = document.createElement("div");
  msg.className = "msg " + type;
  msg.textContent = text;
  chat.appendChild(msg);

  chat.scrollTop = chat.scrollHeight;
}

// ===== HANDLE SEND =====

function handleSend() {
  const text = input.value.trim();
  if (!text) return;

  // USER LEFT
  addMessage(text, "user");

  input.value = "";

  // AI THINKING (optional but nice)
  const thinking = document.createElement("div");
  thinking.className = "msg ai thinking";
  thinking.textContent = "...";
  chat.appendChild(thinking);
  chat.scrollTop = chat.scrollHeight;

  setTimeout(() => {
    thinking.remove();

    let response;
    try {
      response = generateResponse(text);
    } catch (e) {
      response = "Error in brain ⚡";
    }

    // AI RIGHT
    addMessage(response, "ai");

  }, 200);
}

// ===== EVENTS =====

sendBtn.addEventListener("click", handleSend);

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSend();
});