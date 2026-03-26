import fs from 'fs'
import path from 'path'

const inputFile = process.argv[2]
const outputFile = 'output.asm'

export function inputFileRead(): string[] {
    if (!inputFile) throw new Error('Input file is missing')
    const content = fs.readFileSync(inputFile, 'utf8')
    return content.split('\n')
}

export function outputFileCreate(): void {
    fs.writeFileSync(outputFile, "")
}

export function outputFileAppend(string: string): void {
    fs.appendFileSync(outputFile, string)
}

export function fileNameWithoutExt() {
    if (!inputFile) throw new Error('Input file is missing')
    return path.parse(inputFile).name
}