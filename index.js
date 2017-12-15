if(node){
    let smarts = require('./smarts')
} else if (vue){
    let smartsJuice = require('./smarts')
    let smarts = {
        data() {
            return {}
        },
        methods: smartsJuice
    }
} else {
    let smarts = require('./smarts')
}

module.exports = smarts