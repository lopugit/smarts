let node
let vue
if(node){
    var smarts = require('./smarts')
} else if (vue){
    var smartsJuice = require('./smarts')
    var smarts = {
        data() {
            return {}
        },
        methods: smartsJuice
    }
} else {
    var smarts = require('./smarts')
}

module.exports = smarts