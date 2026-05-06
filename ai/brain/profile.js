// /ai/brain/profile.js

export class Profile {

  constructor() {

    this.userStyle = {

      analytical: 0,

      emotional: 0,

      aggressive: 0,

      playful: 0
    };

    this.preferences = {

      topics: {},

      responseLength:
        "medium",

      prefersLogic: true
    };

    this.history = [];
  }


  // UPDATE PROFILE

  update(input) {

    const text =
      input.toLowerCase();

    this.history.push(text);

    if (
      this.history.length > 100
    ) {

      this.history.shift();
    }

    // detect style

    this.detectStyle(text);

    // detect topics

    this.detectTopics(text);

    // detect response preference

    this.detectPreference(text);
  }


  // STYLE DETECTION

  detectStyle(text) {

    if (
      text.includes("why") ||
      text.includes("how")
    ) {

      this.userStyle
        .analytical++;
    }

    if (
      text.includes("lol") ||
      text.includes("lmao")
    ) {

      this.userStyle
        .playful++;
    }

    if (
      text.includes("fuck") ||
      text.includes("shit")
    ) {

      this.userStyle
        .aggressive++;
    }
  }


  // TOPIC DETECTION

  detectTopics(text) {

    const words =
      text.split(/\s+/);

    words.forEach(word => {

      if (word.length < 4) {
        return;
      }

      if (
        !this.preferences
          .topics[word]
      ) {

        this.preferences
          .topics[word] = 0;
      }

      this.preferences
        .topics[word]++;
    });
  }


  // RESPONSE PREFERENCE

  detectPreference(text) {

    if (
      text.length > 120
    ) {

      this.preferences
        .responseLength =
          "long";
    }

    if (
      text.length < 20
    ) {

      this.preferences
        .responseLength =
          "short";
    }
  }


  // DOMINANT STYLE

  dominantStyle() {

    let best =
      "neutral";

    let max = 0;

    for (
      const style
      in this.userStyle
    ) {

      if (
        this.userStyle[style]
        > max
      ) {

        max =
          this.userStyle[style];

        best = style;
      }
    }

    return best;
  }


  // TOP TOPIC

  topTopic() {

    let best = null;

    let max = 0;

    for (
      const topic
      in this.preferences.topics
    ) {

      if (
        this.preferences
          .topics[topic]
        > max
      ) {

        max =
          this.preferences
            .topics[topic];

        best = topic;
      }
    }

    return best;
  }
}