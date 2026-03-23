const fs = require('fs')

const stateMap = {
    opcode: 'opcode', comment: 'comment',
    segment: 'segment', value: 'value'
}

const opcodeMap = {
    push: 'push', pop: 'pop',
    gt: 'gt', lt: 'lt', eq: 'eq',
    neg: 'neg', add: 'add', sub: 'sub',
    and: 'and', or: 'or', not: 'not'
}

// `this` is the reserved keyword in javascript
const segmentMap = {
    constant: 'constant', local: 'local', argument: 'argument',
    static: 'static', thiss: 'this', that: 'that',
    temp: 'temp', pointer: 'pointer'
}


const inputFile = process.argv[2]
const outputFile = process.argv[3] ?? 'output.asm'

if (!inputFile) throw new Error('provide the vm code file for translation')

const expression = {}

function resetExpression(){
    expression.buffer = ''
    expression.opcode = ''
    expression.segment = ''
    expression.value = ''
    expression.state = stateMap.opcode
}

resetExpression();

// buffer operations
function appendBuffer(ch) {
    expression.buffer += ch;
}
function clearBuffer() {
    expression.buffer = ''
}
// end buffer operations

// expression operations
const isBufferEmpty = () =>  expression.buffer.trim() == '';

function setOpcode() {
    if (isBufferEmpty()) return;
    const opcode = expression.buffer.toLowerCase()
    if (opcodeMap[opcode] == undefined) throw new Error('wrong opcode')
    expression.opcode = opcode
    clearBuffer();
    expression.state = stateMap.segment
}
function setSegment() {
    if (isBufferEmpty()) return;
    const segment = expression.buffer.toLowerCase()
    if (segmentMap[segment] == undefined) throw new Error('wrong segment')
    expression.segment = segment
    clearBuffer();
    expression.state = stateMap.value;
}
function setValue() {
    if (isBufferEmpty()) return;
    expression.value = expression.buffer
    clearBuffer();
}
// end expression operations

// state actions
function onSpace() {
    if (expression.state == stateMap.opcode) 
        setOpcode();
    else if (expression.state == stateMap.segment) 
        setSegment();
}

function onNewLine() {
    if (expression.state == stateMap.opcode) 
        setOpcode();
    else if (expression.state == stateMap.value) 
        setValue();
    
    // if(expression.state != stateMap.comment)
    translate(expression.opcode, expression.segment, expression.value)
    resetExpression()
}
// end state actions

function translate(opcode, segment, value) {
    if(opcode == '') return;

    if(opcode == opcodeMap.push || opcode == opcodeMap.pop){
        if(segment.trim() == '' || value.trim() == '') throw new Error('vm code is not correct')
    }

    value = Number(value)

    console.log(opcode, segment, value)
}

function stateMachine(ch) {
    if (ch == "\n") {
        onNewLine()
    }
    else if (ch == "/") {
        onNewLine()
        expression.state = stateMap.comment
    }
    else if (ch == " ") {
        onSpace()
    }
    else if(ch == "\r"){
       
    }
    else{
        if (expression.state == stateMap.comment) return
        if (ch == ' ') return
        appendBuffer(ch)
    }
}

const stream = fs.createReadStream(inputFile, { encoding: 'utf8' })

stream.on('data', chunk => {
    for (let ch of chunk) {
        stateMachine(ch)
    }
})

stream.on('end', () => {
    onNewLine()
})
