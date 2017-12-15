module.exports = function({node, vue, objList, stringList}={}){
    if(node){
        var smarts = require('./smarts')({objList, stringList})
    } else if (vue){
        var smartsJuice = require('./smarts')({objList, stringList})
        var smarts = {
            data() {
                return {}
            },
            methods: smartsJuice
        }
    } else {
        var smarts = require('./smarts')({objList, stringList})
    }
    return smarts
}