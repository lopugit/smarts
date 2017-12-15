if(node){
    let smarts = require('./node-smarts')
} else if (vue){
    let smarts = require('./vue-smarts')
} else {
    let smarts = require('./node-smarts')
}

module.exports = smarts