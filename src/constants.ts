export const opcodes = {
    push: 'push',
    pop: 'pop',
    gt: '>',
    lt: '<',
    eq: '=',
    neg: '-',
    add: '+',
    sub: '-',
    and: '&',
    or: '|',
    not: '!'
}

export const opcodeKeys = Object.keys(opcodes) 

export const segments = {
    constant: 'constant',
    local: 'local',
    argument: 'argument',
    static: 'static',
    this: 'this',
    that: 'that',
    temp: 'temp',
    pointer: 'pointer'
}

export const segmentKeys = Object.keys(segments)