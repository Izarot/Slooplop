export function addMessage(text, sender) {
  const chat = document.getElementById("chat");

  const msg = document.createElement("div");
  msg.className = sender === "user" ? "msg user" : "msg ai";

  msg.innerHTML = format(text);

  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

function format(text) {
  return text
    .replace(/\n/g, "<br>")
    .replace(/`(.*?)`/g, "<code>$1</code>");
}