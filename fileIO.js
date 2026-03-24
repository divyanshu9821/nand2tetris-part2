const fs = require('fs')

function readFile() {
    const inputFile = process.argv[2]
    
    if (!inputFile) return console.log('please provide input file')

    const content = fs.readFileSync(inputFile, 'utf8')

    return content.split('\n')
}

function writeFile() {

}

module.exports = { readFile, writeFile }