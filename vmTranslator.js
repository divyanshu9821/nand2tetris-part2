const stateMap = {
    opcode: 'opcode',
    comment: 'comment',
    segment: 'segment',
    value: 'value'
}

const opcodeMap = {
    push: 'push', pop: 'pop',
    gt: 'gt', lt: 'lt', eq: 'eq',
    neg: 'neg', add: 'add', sub: 'sub',
    and: 'and', or: 'or', not: 'not',
    has: (opcode) => {
        if (opcodeMap[opcode] == undefined) throw new Error('wrong opcode')
    }
}

const segmentMap = {
    constant: 'constant', local: 'local', argument: 'argument',
    static: 'static', thiss: 'this', that: 'that',
    temp: 'temp', pointer: 'pointer',
    has: (segment) => {
        if (segmentMap[segment] == undefined) throw new error('wrong segment')
    }
}

function stateFactory() {
    let _state = null;

    function reset() {
        _state = stateMap.opcode
    }

    function set(st) {
        _state = st
    }

    function get() {
        return _state;
    }

    function is(st) {
        return _state == st
    }

    reset();

    return { reset, set, get, is }
}

function bufferFactory() {
    let _buf = null;

    function reset() {
        _buf = '';
    }

    function getString() {
        return _buf.toLowerCase();
    }

    function getNumber() {
        return Number(_buf)
    }

    function append(ch) {
        if (ch != ' ') _buf += ch;
    }

    function isEmpty() {
        return _buf.trim() == ''
    }

    reset();

    return { reset, getString, getNumber, append, isEmpty }
}

function expressionFactory() {
    let opcode = null
    let segment = null
    let value = null

    function reset() {
        opcode = ''
        segment = ''
        value = ''
    }

    function get() {
        return { opcode, segment, value }
    }

    function setOpcode(state, buffer) {
        if (!state.is(stateMap.opcode)) return
        if (buffer.isEmpty()) return
        opcode = buffer.getString()
        opcodeMap.has(opcode)
        buffer.reset();
        state.set(stateMap.segment)
    }

    function setSegment(state, buffer) {
        if (!state.is(stateMap.segment)) return
        if (buffer.isEmpty()) return
        segment = buffer.getString()
        segmentMap.has(segment)
        buffer.reset();
        state.set(stateMap.value)
    }

    function setValue(state, buffer) {
        if (!state.is(stateMap.value)) return;
        if (buffer.isEmpty()) return;
        value = buffer.getString()
        buffer.reset();
        state.set(stateMap.opcode)
    }

    function final(state, buffer) {
        if (opcode == '') return;

        if (opcode == opcodeMap.push || opcode == opcodeMap.pop)
            if (segment.trim() == '' || value.trim() == '')
                throw new Error('vm code is not correct')

        state.reset()
        buffer.reset()
        const expObj = get();
        reset()
        return expObj;
    }

    reset()

    return { reset, get, setOpcode, setSegment, setValue, final }
}

const state = stateFactory()
const buffer = bufferFactory()
const expression = expressionFactory()

function processCharacter(ch) {
    if (ch == " ") {

        expression.setOpcode(state, buffer)
        expression.setSegment(state, buffer)

    } else if (ch == "\n" || ch == '/') {
        if (state.is(stateMap.comment)) {
            if(ch == "\n") state.set(stateMap.opcode)
            else return
        }
        expression.setOpcode(state, buffer)
        expression.setValue(state, buffer)

        const expObj = expression.final(state, buffer)

        console.log(expObj)

        if (ch == "/") {
            state.set(stateMap.comment)
        }
    }
    else {

        if (state.is(stateMap.comment) || ch == '\r') return

        buffer.append(ch)
    }
}



const { error } = require('console')
const fs = require('fs')

const inputFile = process.argv[2]
const outputFile = process.argv[3] ?? 'output.asm'

if (!inputFile) throw new Error('provide the vm code file for translation')

const stream = fs.createReadStream(inputFile, { encoding: 'utf8' })

stream.on('data', chunk => {
    for (let ch of chunk) {
        processCharacter(ch)
    }
})

stream.on('end', () => {
    processCharacter('\n')
})
