import { generateResponse } from "./brain/core.js";
import { memory } from "./brain/memory.js";
import { mood } from "./brain/mood.js";

// ✅ CORRECT SELECTORS (MATCH YOUR HTML)
const inputBox = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");
const chatBox = document.getElementById("chat");

// safety check
if (!inputBox || !sendBtn || !chatBox) {
  console.error("Elements not found. Check IDs.");
}

// BUTTON CLICK
sendBtn.onclick = () => {
  const userText = inputBox.value.trim();
  if (!userText) return;

  addMessage("user", userText);

  const reply = generateResponse(userText, memory, mood);

  addMessage("ai", reply);

  inputBox.value = "";
};

// ENTER KEY
inputBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendBtn.click();
  }
});

// MESSAGE RENDER
function addMessage(type, text) {
  const div = document.createElement("div");
  div.className = type;
  div.textContent = text;

  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}