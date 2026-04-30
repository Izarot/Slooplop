export function formatMessage(text) {
  return text
    .replace(/\n/g, "<br>")
    .replace(/`(.*?)`/g, "<code>$1</code>");
}

export function addMessage(text, sender) {
  const chat = document.getElementById("chat");

  if (!chat) return;

  const msg = document.createElement("div");
  msg.className = sender === "user" ? "msg user" : "msg ai";

  msg.innerHTML = formatMessage(text);

  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}