const { opcodes, segments } = require('./constants.js')

function cleanLine(line) {
    return line.split('/')[0].trim();
}

function extractTokens(line) {
    return line.split(/\s+/)
}

function validateOpcode(tokens) {
    if (!Object.keys(opcodes).includes(tokens[0])) {
        throw new Error('wrong opcode')
    }
}

function validateStackOpcode(tokens) {
    validateOpcode(tokens)
    
    if (!Object.keys(segments).includes(tokens[1])) {
        throw new Error('wrong segment')
    }
    
    if (Number.isNaN(Number(tokens[2]))) {
        throw new Error('wrong value')
    }
}

function tokenize(line) {
    line = cleanLine(line)
    if (line == "") return { status: false }

    const tokens = extractTokens(line)

    if (tokens.length == 1) validateOpcode(tokens)
    else if (tokens.length == 3) validateStackOpcode(tokens)
    else return { status: false }

    return { status: true, tokens }
}

module.exports = { tokenize }