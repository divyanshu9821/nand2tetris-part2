const { readFile } = require('./fileIO.js')
const { tokenize } = require('./tokenizer.js')
const { translate } = require('./translator.js')

const lines = readFile();

for (const line of lines) {
    const response = tokenize(line)
    if (!response.status) continue;
    translate(response.tokens)
}