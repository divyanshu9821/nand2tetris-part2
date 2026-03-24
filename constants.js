const opcodes = {
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

const segments = {
    constant: 'constant',
    local: 'local',
    argument: 'argument',
    static: 'static',
    this: 'this',
    that: 'that',
    temp: 'temp',
    pointer: 'pointer'
}

module.exports = { opcodes, segments }