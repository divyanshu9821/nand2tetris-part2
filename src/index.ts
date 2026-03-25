import { inputFileRead, outputFileRemove, outputFileAppend } from "./fileIO.js";
import { tokenize } from "./tokenizer.js";
import { translate } from "./translator.js";
import {type tokenResObj } from "./types.js";

outputFileRemove();

const lines: string[] = inputFileRead();

for (const line of lines) {
    const response: tokenResObj = tokenize(line)
    if (!response.status || !response.tokens) continue;
    const string: string = translate(response.tokens)
    outputFileAppend(string)
}