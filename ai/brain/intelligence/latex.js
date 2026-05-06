// /ai/brain/intelligence/latex.js

export function renderLatex() {

  if (
    !window.renderMathInElement
  ) {

    console.warn(
      "KaTeX renderer missing"
    );

    return;
  }

  try {

    renderMathInElement(
      document.body,

      {

        delimiters: [

          {
            left: "$$",
            right: "$$",
            display: true
          },

          {
            left: "$",
            right: "$",
            display: false
          }
        ],

        throwOnError: false
      }
    );

  } catch (error) {

    console.error(
      "LaTeX rendering failed:",
      error
    );
  }
}