import { doubleOpcode, relOpcode, singleOpcode } from "./constants.js"
import { relationalOp, singleOperandALOp, twoOperandALOp } from "./ALROp.js"
import { push } from "./pushOp.js";
import { pop } from "./popOp.js";

const output = (tokens: string[], asm: string) => `// ${tokens.join(' ')} \n${asm} \n`

let counter = 0;

// Arithmetic Logical Relational Operation Translation
function ALROT(tokens: string[]): string {
    const opcode = tokens[0]
    if (!opcode) throw new Error()

    let asm = "";

    if (singleOpcode[opcode])
        asm = singleOperandALOp(singleOpcode[opcode])
    else if (doubleOpcode[opcode])
        asm = twoOperandALOp(doubleOpcode[opcode])
    else if (relOpcode[opcode])
        asm = relationalOp(counter++, relOpcode[opcode])
    else
        throw new Error()

    return output(tokens, asm)
}

// stack operation Translation
function SOT(tokens: string[]): string {
    const opcode = tokens[0]
    const segment = tokens[1]
    const value = Number(tokens[2])

    if (
        opcode == undefined ||
        segment == undefined ||
        Number.isNaN(value)
    ) throw new Error()

    let asm = ""

    if (opcode == 'pop')
        asm = pop(segment, value)
    else if (opcode == 'push')
        asm = push(segment, value)
    else
        throw new Error()

    return output(tokens, asm)
}

export function translate(tokens: string[]): string {
    if (tokens.length == 1) {
        return ALROT(tokens)
    } else if (tokens.length == 3) {
        return SOT(tokens)
    } else {
        throw new Error()
    }
}