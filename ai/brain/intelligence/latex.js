// ai/brain/intelligence/latex.js

export function renderLatex() {
  if (window.renderMathInElement) {
    try {
      renderMathInElement(document.body, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false }
        ]
      });
    } catch (e) {
      console.error("KaTeX render error:", e);
    }
  }
}