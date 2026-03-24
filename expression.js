let opcode = null
let segment = null
let value = null

const opcodeMap = {
    push: 'push', pop: 'pop',
    gt: 'gt', lt: 'lt', eq: 'eq',
    neg: 'neg', add: 'add', sub: 'sub',
    and: 'and', or: 'or', not: 'not',
}

const segmentMap = {
    constant: 'constant', local: 'local', argument: 'argument',
    static: 'static', thiss: 'this', that: 'that',
    temp: 'temp', pointer: 'pointer',
}

function clear() {
    opcode = ''
    segment = ''
    value = ''
}

function setOp(op) {
    op = op.toLowerCase()
    if (opcodeMap[op] == undefined) throw new Error('wrong opcode')
    opcode = op
    segment = ''
    value = ''
}

function setSeg(seg) {
    seg = seg.toLowerCase()
    if (segmentMap[seg] == undefined) throw new Error('wrong segment')
    segment = seg
    value = ''
}

function setVal(val) {
    val = Number(val)
    if (val == 'NaN') throw new Error('value must be number')
    value = val
}

function get() {
    return { opcode, segment, value }
}

module.exports = { clear, setOp, setSeg, setVal, get }