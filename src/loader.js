module.exports = function({node, vue, objList, stringList, that, babel}={}){
	
	/**
	 * @param objList is a @type {String} representing a dot delimited path for the default 
	 * object based getters and setters and searches
	 * @param stringList is a @type {String} representing a dot delimited path for the default 
	 * array of strings based getters and setters and searches
	 */
	
	var smarts

	if(node){
		smarts = require('./javascript/smarts')({objList, stringList, babel, vue})
	} else if (vue && !vue.standalone){
		var smartsJuice = require('./javascript/smarts')({objList, stringList, vue, babel})
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
		smarts = require('./javascript/smarts')({objList, stringList, babel, vue})
	}
	if(that) Object.assign(that, smarts)
	
	return smarts
}