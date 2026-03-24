const expression = require('./expression.js')
const buffer = require('./buffer.js')
const state = require('./state.js')

function onChar(ch) {
    if (ch == ' ') {
        let token = buffer.get();
        
        if (token == '' || token == ' ' || state.isComment()) { } // donot do anything
        else if (state.isOpcode()) {
            expression.setOp(token)
            state.segment()
        } else if (state.isSegment()) {
            expression.setSeg(token)
            state.value()
        }

        buffer.clear()
    }
    else if (ch == '\n') {
        let token = buffer.get();
        
        if (token == '' || token == ' ') { } // donot do anything
        else if (state.isOpcode()) {
            expression.setOp(token)
        } else if (state.isValue()) {
            expression.setVal(token)
        }

        state.reset()
        buffer.clear()
    }
    else if (ch == '/') {
        state.comment()
    }
    else {
        if (ch == '\r') return;
        if (state.isComment()) return;
        buffer.append(ch)
    }
}