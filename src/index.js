module.exports = function({node, vue, objList, stringList, that}={}){
	
	/**
	 * @param objList is a @type {String} representing a dot delimited path for the default 
	 * object based getters and setters and searches
	 * @param stringList is a @type {String} representing a dot delimited path for the default 
	 * array of strings based getters and setters and searches
	 */
	
	if(node){
			var smarts = require('./smarts')({objList, stringList})
	} else if (vue){
			var smartsJuice = require('./smarts')({objList, stringList, vue})
			var smarts = {
					data() {
							return {}
					},
					methods: smartsJuice
			}
	} else {
			var smarts = require('./smarts')({objList, stringList})
	}
	if(that) Object.assign(that, smarts)
	
	return smarts
}