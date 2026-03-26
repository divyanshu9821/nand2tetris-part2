type objLit = Record<string, any>

export const relOpcode: objLit = {
    gt: 'JGT',
    lt: 'JLT',
    eq: 'JEQ'
}

export const singleOpcode: objLit = {
    neg: '-',
    not: '!'
}

export const doubleOpcode: objLit = {
    add: '+',
    sub: '-',
    and: '&',
    or: '|',
}

export const segments: objLit = {
    local: 'LCL',
    argument: 'ARG',
    this: 'THIS',
    that: 'THAT',
}