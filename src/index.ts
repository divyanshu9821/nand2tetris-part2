import { inputFileRead, outputFileCreate, outputFileAppend } from "./fileIO.js";
import { tokenize } from "./tokenizer.js";
import { translate } from "./translator.js";

outputFileCreate();

const lines = inputFileRead();

for (let i = 0; i < lines.length; i++) {
    try {

        const tokens = tokenize(lines[i] || "")
        if (!tokens.status || !Array.isArray(tokens.tokens)) continue;
        const string = translate(tokens.tokens)
        outputFileAppend(string)

    } catch (e) {
        console.log(`Error on line: ${i + 1}`)
        process.exit();
    }
}