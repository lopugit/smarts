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
	'./scripts/toJavascript.module.output.js', 
	smarts.toJavascript(obj, {
		moduleExport: true
	})
)

fs.writeFileSync(
	'./scripts/toJavascript.eval.output.js', 
	smarts.toJavascript(obj, {
		wrapInFunction: true
	})
)
