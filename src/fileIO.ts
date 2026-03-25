import fs from 'fs'

export function readFile(): string[] {
    const inputFile: string = process.argv[2] || ""
    
    if (!inputFile) throw new Error('Input file is missing')

    const content: string = fs.readFileSync(inputFile, 'utf8')

    return content.split('\n')
}

export function writeFile() {

}