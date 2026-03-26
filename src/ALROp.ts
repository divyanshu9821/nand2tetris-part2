// arithmetic, logic and relation operations --------------


export function twoOperandALOp(op: string): string {
    return ""
        + "@R0\n"
        + "AM=M-1\n"
        + "D=M\n"
        + "A=A-1\n"
        + (op != '-' ? `M=D${op}M\n` : `M=M${op}D\n`)
}

export function singleOperandALOp(op: string): string {
    return ""
        + "@R0\n"
        + "A=M-1\n"
        + `M=${op}M\n`
}

export function relationalOp(count: number | string, op: string): string {
    count = String(count)
    return ""
        + "@R0\n"
        + "AM=M-1\n"
        + "D=M\n"
        + "A=A-1\n"
        + "D=M-D\n"
        + `@TRUE_${count}\n`
        + `D;${op}\n`
        + "@R0\n"
        + "A=M-1\n"
        + "M=0\n"
        + `@END_${count}\n`
        + "0;JMP\n"
        + `(TRUE_${count})\n`
        + "@R0\n"
        + "A=M-1\n"
        + "M=-1\n"
        + `(END_${count})\n`
}