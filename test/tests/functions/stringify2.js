let smarts = require(global.smartsPath || '../../../src/index.js')()
let expect = require('chai').expect
let mlog = require('mocha-logger');
let test = it
let fs = require('fs')

describe("Function smarts.toJavascript tests", ()=>{

	test("should toJavascript properties with value of undefined", ()=>{

		let foo = {
			baz: 'fiz'
		}

		let obj = {
			foo,
			bar: {
				foo
			}
		}
		let stringified = smarts.toJavascript(obj, {
			wrapInFunction: true
		})
		let expected = `;(function () {
	let baz = "fiz"
	let foo = {
		baz,
	}
	let bar = {
		foo,
	}
	let obj = {
		foo,
		bar,
	}
	return obj
})()
`
		// let expectedAst = smarts.getBabel().template.ast(expected)
		// let expectedStringified = smarts.getBabel().t.program(expectedAst)
		// fs.writeFileSync("tmp/tests/toJavascript.target.json", JSON.stringify(expectedStringified, null, 2))
		// fs.writeFileSync("tmp/tests/toJavascript.target.regenerated.js", smarts.getBabel().prettier.format(smarts.getBabel().generator(expectedStringified).code, { semi: false, parser: "babel"}))
		// fs.writeFileSync("tmp/tests/toJavascript.actual.json", JSON.stringify(stringified, null, 2))
		// fs.writeFileSync("tmp/tests/toJavascript.actual.regenerated.js", stringified)
		expect(stringified).to.equal(expected)
	})

	test("should toJavascript properties with value of undefined", ()=>{

		let foo = {
			baz: 'fiz'
		}

		let obj = {
			foo,
			bar: {
				foo
			}
		}
		let stringified = smarts.toJavascript(obj, {
			wrapInFunction: false,
			moduleExport: true
		})
		let expected = `let baz = "fiz"
let foo = {
	baz,
}
let bar = {
	foo,
}
let obj = {
	foo,
	bar,
}
module.exports = obj
`
		// let expectedAst = smarts.getBabel().template.ast(expected)
		// let expectedStringified = smarts.getBabel().t.program(expectedAst)
		// fs.writeFileSync("tmp/tests/toJavascript.target.json", JSON.stringify(expectedStringified, null, 2))
		// fs.writeFileSync("tmp/tests/toJavascript.target.regenerated.js", smarts.getBabel().prettier.format(smarts.getBabel().generator(expectedStringified).code, { semi: false, parser: "babel"}))
		// fs.writeFileSync("tmp/tests/toJavascript.actual.json", JSON.stringify(stringified, null, 2))
		// fs.writeFileSync("tmp/tests/toJavascript.actual.regenerated.js", stringified)
		expect(stringified).to.equal(expected)
	})

	test("should toJavascript properties with value of undefined", ()=>{

		let foo = {
			baz: 'fiz'
		}

		let obj = {
			foo,
			bar: {
				foo
			}
		}

		obj.test = obj

		let stringified = smarts.toJavascript(obj, {
			wrapInFunction: false,
			moduleExport: true
		})
		let expected = `let baz = "fiz"
let foo = {
	baz,
}
let bar = {
	foo,
}
let obj = {
	foo,
	bar,
}
obj.test = obj
module.exports = obj
`
		expect(stringified).to.equal(expected)
	})

	test("should toJavascript properties with value of undefined", ()=>{

		let foo = {
			baz: 'fiz'
		}

		let obj = {
			foo,
			bar: {
				foo
			}
		}

		obj.bar.faz = obj.bar
		
		let stringified = smarts.toJavascript(obj, {
			wrapInFunction: false,
			moduleExport: true
		})
		let expected = `let baz = "fiz"
let foo = {
	baz,
}
let bar = {
	foo,
}
let obj = {
	foo,
	bar,
}
bar.faz = bar
module.exports = obj
`
		expect(stringified).to.equal(expected)
	})

	test("should toJavascript properties with value of undefined", ()=>{

		let foo = {
			baz: 'fiz'
		}

		let obj = {
			foo,
			bar: {
				foo
			}
		}

		obj.bar.obj = obj
		
		let stringified = smarts.toJavascript(obj, {
			wrapInFunction: false,
			moduleExport: true
		})
		let expected = `let baz = "fiz"
let foo = {
	baz,
}
let bar = {
	foo,
}
let obj = {
	foo,
	bar,
}
bar.faz = bar
module.exports = obj
`
		let expectedAst = smarts.getBabel().template.ast(expected)
		let expectedStringified = smarts.getBabel().t.program(expectedAst)
		fs.writeFileSync("tmp/tests/toJavascript.target.json", JSON.stringify(expectedStringified, null, 2))
		fs.writeFileSync("tmp/tests/toJavascript.target.regenerated.js", smarts.getBabel().prettier.format(smarts.getBabel().generator(expectedStringified).code, { semi: false, parser: "babel"}))
		fs.writeFileSync("tmp/tests/toJavascript.actual.json", JSON.stringify(stringified, null, 2))
		fs.writeFileSync("tmp/tests/toJavascript.actual.regenerated.js", stringified)
		expect(stringified).to.equal(expected)
	})

})
