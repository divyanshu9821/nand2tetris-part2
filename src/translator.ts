export function translate(tokens: string[]): string {
    let output = 'started working';
    return "// " + tokens.join(' ') + '\n' + output + "\n\n"
}