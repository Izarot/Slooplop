import { generateResponse } from "../brain/core.js";
import { Memory } from "../brain/memory.js";
import { Mood } from "../brain/mood.js";

const memory = new Memory();
const mood = new Mood();

const inputEl = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");

sendBtn.onclick = sendMessage;
inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const text = inputEl.value.trim();
  if (!text) return;

  addMessage(text, "user");

  const response = generateResponse(text, memory, mood);

  setTimeout(() => {
    addMessage(response, "ai");
    renderMath(); // 🔥 important
  }, 200);

  inputEl.value = "";
}

function addMessage(text, sender) {
  const chat = document.getElementById("chat");

  const msg = document.createElement("div");
  msg.className = sender === "user" ? "msg user" : "msg ai";

  msg.innerHTML = text; // needed for LaTeX

  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

// 🧮 render LaTeX using KaTeX
function renderMath() {
  if (window.renderMathInElement) {
    renderMathInElement(document.body);
  }
}