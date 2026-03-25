import { readFile } from "./fileIO.js";
import { tokenize } from "./tokenizer.js";
import { translate } from "./translator.js";
import {type tokenResObj } from "./types.js";

const lines: string[] = readFile();

for (const line of lines) {
    const response: tokenResObj = tokenize(line)
    if (!response.status || !response.tokens) continue;
    translate(response.tokens)
}