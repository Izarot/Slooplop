import { generateResponse } from "./brain/core.js";
import { memory } from "./brain/memory.js";
import { mood } from "./brain/mood.js";

const inputBox = document.querySelector("input");
const sendBtn = document.querySelector("button");
const chatBox = document.querySelector(".chat-box");

// SAFETY CHECK (prevents silent failure)
if (!inputBox || !sendBtn || !chatBox) {
  console.error("UI elements not found. Check class names.");
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

// ENTER KEY SUPPORT
inputBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendBtn.click();
  }
});

// MESSAGE RENDER
function addMessage(type, text) {
  const div = document.createElement("div");
  div.className = type === "user" ? "msg user" : "msg ai";
  div.textContent = text;

  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}