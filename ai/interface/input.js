// /ai/interface/input.js

import { generateResponse } from "../brain/core.js";

import { addMessage } from "./ui.js";

import { renderLatex } from "../brain/intelligence/latex.js";


export function setupInput(
  memory,
  mood,
  profile
) {

  const inputEl =
    document.getElementById(
      "input"
    );

  const sendBtn =
    document.getElementById(
      "sendBtn"
    );

  
   // USER MESSAGE

    addMessage(
      text,
      "user"
    );

    inputEl.value = "";

    let response =
      "Processing...";

    try {

      response =
        await generateResponse(
          text,
          memory,
          mood,
          profile
        );

    } catch (error) {

      console.error(error);

      response =
        "System reasoning failure.";
    }

    // AI MESSAGE

    addMessage(
      response,
      "ai"
    );

    // LATEX

    renderLatex();
  }

  // BUTTON

  sendBtn.onclick = send;

  // ENTER

  inputEl.addEventListener(
    "keydown",
    e => {

      if (
        e.key === "Enter"
      ) {

        e.preventDefault();

        send();
      }
    }
  );
}
