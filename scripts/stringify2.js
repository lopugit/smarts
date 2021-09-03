let fs = require('fs')
let smarts = require('../src/index.js')()

let faz = {
	bar: "far"
}

let obj = {
	faz,
	bar: {
		faz
	}
}

obj.obj = obj
obj.test = obj

fs.writeFileSync(
	'./scripts/stringify2.module.output.js', 
	smarts.stringify2(obj, {
		moduleExport: true
	})
)

fs.writeFileSync(
	'./scripts/stringify2.eval.output.js', 
	smarts.stringify2(obj, {
		wrapInFunction: true
	})
)
