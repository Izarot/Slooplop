export function addMessage(text, sender) {
  const chat = document.getElementById("chat");

  const msg = document.createElement("div");
  msg.className = sender === "user" ? "msg user" : "msg ai";

  msg.innerHTML = text;

  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

// optional: clear chat (future use)
export function clearChat() {
  document.getElementById("chat").innerHTML = "";
}
