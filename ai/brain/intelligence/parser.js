// ai/brain/intelligence/parser.js

export function parse(input) {
  return input
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter(Boolean);
}