// /ai/brain/mood.js

export class Mood {

  constructor() {

    this.state = "neutral";

    this.intensity = 0;

    this.history = [];
  }


  update(input) {

    const text =
      input.toLowerCase();

    let detected =
      "neutral";

    // emotional detection

    if (
      containsAny(
        text,
        [
          "angry",
          "hate",
          "fuck",
          "shit",
          "idiot"
        ]
      )
    ) {

      detected =
        "aggressive";
    }

    else if (
      containsAny(
        text,
        [
          "sad",
          "depressed",
          "lonely",
          "cry"
        ]
      )
    ) {

      detected =
        "sad";
    }

    else if (
      containsAny(
        text,
        [
          "why",
          "how",
          "explain",
          "analyze"
        ]
      )
    ) {

      detected =
        "analytical";
    }

    else if (
      containsAny(
        text,
        [
          "lol",
          "lmao",
          "funny",
          "xd"
        ]
      )
    ) {

      detected =
        "playful";
    }

    this.state =
      detected;

    this.intensity++;

    this.history.push({
      mood: detected,
      timestamp:
        Date.now()
    });

    if (
      this.history.length > 40
    ) {

      this.history.shift();
    }
  }


  current() {

    return {

      state:
        this.state,

      intensity:
        this.intensity
    };
  }


  reset() {

    this.state =
      "neutral";

    this.intensity = 0;
  }
}


function containsAny(
  text,
  words
) {

  return words.some(
    word =>
      text.includes(word)
  );
}