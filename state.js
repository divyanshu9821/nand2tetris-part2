const stateMap = {
    comment: 0,
    opcode: 1,
    segment: 2,
    value: 3
}

let state = null

function reset() {
    state = stateMap.opcode 
}

function comment() {
    state = stateMap.comment 
}

function isComment() {
    return state == stateMap.comment 
}

function isOpcode() {
    return state == stateMap.opcode 
}

function segment() {
    state = stateMap.segment 
}

function isSegment() {
    return state == stateMap.segment 
}

function value() {
    state = stateMap.value 
}

function isValue() {
    return state == stateMap.value 
}

reset()

module.exports = {
    reset, comment, isComment,
    isOpcode, segment, isSegment, value, isValue
}