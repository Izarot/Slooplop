// /ai/app.js

import { Memory }
from "./brain/memory.js";

import { Mood }
from "./brain/mood.js";

import { Profile }
from "./brain/profile.js";

import { setupInput }
from "./interface/input.js";


// CORE STATE

const memory =
  new Memory();

const mood =
  new Mood();

const profile =
  new Profile();


// START SYSTEM

window.addEventListener(
  "DOMContentLoaded",
  () => {

    console.log(
      "SL V0.4 initialized"
    );

    setupInput(
      memory,
      mood,
      profile
    );
  }
);