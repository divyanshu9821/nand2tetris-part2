import fs from 'fs'

export function inputFileRead(): string[] {
    const inputFile: string = process.argv[2] || ""

    if (!inputFile) throw new Error('Input file is missing')

    const content: string = fs.readFileSync(inputFile, 'utf8')

    return content.split('\n')
}

const outputFile = 'output.asm'

export function outputFileCreate() {
    fs.writeFileSync(outputFile, "")
}

export function outputFileAppend(string: string) {
    fs.appendFileSync(outputFile, string)
}