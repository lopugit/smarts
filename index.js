module.exports = function({node, vue, objList, stringList, reactiveSetter}={}){
    if(node){
        var smarts = require('./smarts')({objList, stringList})
    } else if (vue){
        var smartsJuice = require('./smarts')({objList, stringList, reactiveSetter})
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