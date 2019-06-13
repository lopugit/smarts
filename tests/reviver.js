let smarts = require('../src/index.js')()

let json = {
	name: 'parent'
}
json.self = json

console.log('json ', json)

let sjson = smarts.stringify(json)

console.log('sjson ', sjson)

let pjson = JSON.parse(sjson, smarts.parse)

console.log('pjson ', pjson)
