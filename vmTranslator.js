const stackOpcode = ['push', 'pop']

const aluOpcode = [
    'gt', 'lt', 'eq',
    'neg', 'add', 'sub',
    'and', 'or', 'not'
]

const segments = [
    'constant', 'local', 'argument',
    'static', 'this', 'that',
    'temp', 'pointer',
]

const cleanLine = line => line.split('/')[0].trim()
const extractTokens = line => line.split(/\s+/)

const error = msg => { throw new Error(msg) }

function validateAluOpcode(tokens) {
    if (!aluOpcode.includes(tokens[0])) error('wrong opcode')
}

function validateStackOpcode(tokens) {
    if (!stackOpcode.includes(tokens[0])) error('wrong opcode')
    if (!segments.includes(tokens[1])) error('wrong segment')
    if (Number.isNaN(Number(tokens[2]))) error('wrong value')
}

function processLines(line) {
    line = cleanLine(line)
    if (line == "") return

    const tokens = extractTokens(line)

    if (tokens.length == 1) validateAluOpcode(tokens)
    else if (tokens.length == 3) validateStackOpcode(tokens)
    else return;

    console.log(tokens) // translate here

}

const inputFile = process.argv[2]
if (!inputFile) return console.log('please provide input file')

const fs = require('fs')
const content = fs.readFileSync(inputFile, 'utf8')

const lines = content.split('\n')

for (const line of lines) {
    processLines(line)
}
