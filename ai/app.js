import { Memory } from "./brain/memory.js";
import { Mood } from "./brain/mood.js";
import { Profile } from "./brain/profile.js";
import { setupInput } from "./interface/input.js";

const memory = new Memory();
const mood = new Mood();
const profile = new Profile();

window.onload = () => {
  setupInput(memory, mood, profile);
};