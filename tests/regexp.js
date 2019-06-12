let smarts = require('../src/index.js')()

let regex = {
	regex: new RegExp(/woo/, 'gi')
}

console.log('regex ', regex)

let sregex = smarts.stringify(regex)

console.log('sregex ', sregex)

let pregex = smarts.parse(sregex)

console.log('pregex ', pregex)