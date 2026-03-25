import { stackOpcodekeys, opcodeKeys, segmentKeys } from './constants.js'
import { type tokenResObj } from './types.js'

function cleanLine(line: string) {
    [line = ""] = line.split('/')
    return line.trim()
}

function extractTokens(line: string): string[] {
    return line.split(/\s+/)
}

function validateOpcode(tokens: string[]): void {
    if (!tokens[0] || !opcodeKeys.includes(tokens[0])) {
        throw new Error('wrong opcode')
    }
}

function validateStackOpcode(tokens: string[]): void {
    if (!tokens[0] || !stackOpcodekeys.includes(tokens[0])) {
        throw new Error('wrong opcode')
    }

    if (!tokens[1] || !segmentKeys.includes(tokens[1])) {
        throw new Error('wrong segment')
    }

    if (!tokens[2] || Number.isNaN(Number(tokens[2]))) {
        throw new Error('wrong value')
    }
}

function tokenRes(status: boolean, tokens?: string[]): tokenResObj {
    return { status, tokens }
}

export function tokenize(line: string): tokenResObj {
    line = cleanLine(line)

    if (line == "")
        return tokenRes(false)

    const tokens = extractTokens(line)

    if (tokens.length == 1)
        validateOpcode(tokens)
    else if (tokens.length == 3)
        validateStackOpcode(tokens)
    else
        return tokenRes(false)

    return tokenRes(true, tokens)
}