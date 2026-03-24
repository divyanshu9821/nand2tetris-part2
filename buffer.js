let buffer = null;

function clear() {
    buffer = ''
}

function isEmpty() {
    buffer != ''
}

function append(ch) {
    if (ch != ' ' || ch != '') {
        buffer += ch
    }
}

function get() {
    return buffer;
}

module.exports = { clear, isEmpty, append, get }