// /ai/interface/ui.js

export function addMessage(
  text,
  sender
) {

  const chat =
    document.getElementById(
      "chat"
    );

  if (!chat) {
    return;
  }

  const wrapper =
    document.createElement(
      "div"
    );

  wrapper.className =
    sender === "user"
      ? "messageRow userRow"
      : "messageRow aiRow";

  const bubble =
    document.createElement(
      "div"
    );

  bubble.className =
    sender === "user"
      ? "messageBubble userBubble"
      : "messageBubble aiBubble";

  bubble.innerHTML =
    formatMessage(text);

  wrapper.appendChild(
    bubble
  );

  chat.appendChild(
    wrapper
  );

  // auto scroll

  requestAnimationFrame(() => {

    chat.scrollTop =
      chat.scrollHeight;
  });
}


function formatMessage(
  text
) {

  return text

    // escape html

    .replace(
      /</g,
      "&lt;"
    )

    .replace(
      />/g,
      "&gt;"
    )

    // code formatting

    .replace(
      /`([^`]+)`/g,
      "<code>$1</code>"
    )

    // bold

    .replace(
      /\*\*(.*?)\*\*/g,
      "<strong>$1</strong>"
    )

    // italics

    .replace(
      /\*(.*?)\*/g,
      "<em>$1</em>"
    )

    // new lines

    .replace(
      /\n/g,
      "<br>"
    );
}


export function clearChat() {

  const chat =
    document.getElementById(
      "chat"
    );

  if (chat) {

    chat.innerHTML = "";
  }
}