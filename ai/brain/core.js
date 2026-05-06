import { think } from "./intelligence/thoughtEngine.js";

export async function processInput(input) {

    try {

        const result = await think(input);

        if (!result || result.length === 0) {
            return "I could not think of a response.";
        }

        return result;

    } catch (error) {

        console.error("FULL BRAIN ERROR:", error);

        return `
System reasoning failure:

${error.message}
        `;
    }
}