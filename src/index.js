module.exports = function({node, vue, objList, stringList, that, clientSide}={}){
	
	/**
	 * @param objList is a @type {String} representing a dot delimited path for the default 
	 * object based getters and setters and searches
	 * @param stringList is a @type {String} representing a dot delimited path for the default 
	 * array of strings based getters and setters and searches
	 */
	
	var smarts

	if(node){
		smarts = require('./smarts')({objList, stringList, clientSide})
	} else if (vue){
		var smartsJuice = require('./smarts')({objList, stringList, vue, clientSide})
		smarts = {
			data() {
					return {}
			},
			methods: {},
			computed: {}
		}
		let keys = Object.keys(smartsJuice)
		keys.forEach(key=>{
			if(typeof smartsJuice[key] == 'function'){
				smarts.methods[key] = smartsJuice[key]
			}
			if(smartsJuice[key] instanceof Object){
				if(typeof smartsJuice[key].get == 'function' || typeof smartsJuice[key].set == 'function')
				smarts.computed[key] = smartsJuice[key]
			}
		})
	} else {
		smarts = require('./smarts')({objList, stringList, clientSide})
	}
	if(that) Object.assign(that, smarts)
	
	return smarts
}