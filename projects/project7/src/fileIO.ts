import fs from 'fs'
import path from 'path'

const inputFile = process.argv[2]

export function fileNameWithoutExt() {
    if (!inputFile) throw new Error('Input file is missing')
    return path.parse(inputFile).name
}

export function inputFileRead(): string[] {
    if (!inputFile) throw new Error('Input file is missing')
    const content = fs.readFileSync(inputFile, 'utf8')
    return content.split('\n')
}

export function outputFileAppend(string: string): void {
    if (!inputFile) throw new Error('Input file is missing')
    const f = path.parse(inputFile)
    const outputFile = `${f.dir}/${f.name}.asm`
    fs.appendFileSync(outputFile, string)
}