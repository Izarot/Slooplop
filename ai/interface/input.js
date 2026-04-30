export function setupInput(memory, mood) {
  const inputEl = document.getElementById("input");
  const sendBtn = document.getElementById("sendBtn");

  console.log("SETUP INPUT RUNNING");

  if (!inputEl || !sendBtn) {
    console.error("Missing input or button");
    return;
  }

  function send() {
  alert("SEND RUNNING"); // debug

  const text = inputEl.value.trim();
  if (!text) return;

  // 👇 FORCE TEST UI
  addMessage("USER: " + text, "user");

  // 👇 TEMP STATIC RESPONSE (skip brain for now)
  const response = "AI WORKING";

  setTimeout(() => {
    addMessage(response, "ai");
  }, 200);

  inputEl.value = "";
}

    const text = inputEl.value.trim();
    if (!text) return;

    addMessage(text, "user");

    let response;
    try {
      response = generateResponse(text, memory, mood);
    } catch (err) {
      console.error(err);
      response = "Brain error";
    }

    setTimeout(() => {
      addMessage(response, "ai");

      if (window.renderMathInElement) {
        renderMathInElement(document.body);
      }
    }, 200);

    inputEl.value = "";
  }

  // ✅ DESKTOP CLICK
  sendBtn.addEventListener("click", send);

  // ✅ MOBILE TOUCH
  sendBtn.addEventListener("touchstart", (e) => {
    e.preventDefault(); // stops weird double trigger
    send();
  });

  // ✅ ENTER KEY
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      send();
    }
  });
}