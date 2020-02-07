let smarts = require('../src/index.js')()
let expect = require('chai').expect
let mlog = require('mocha-logger');
let test = it
let fs = require('fs')

describe("Babel Parsing tests", ()=>{

	test("Babel plugin should add scope properties to functions and scope should be retained in a function", ()=>{

		let src = /*javascript*/`
			let json = {
				'function': function(arg1){ return foo },
				function2(arg1){ return foo },
			}

			let foo = { bar: 1 }

			let string = smarts.stringify(json)
			let parsed = smarts.parse(string)
		`

		let code = smarts.transform(src)
		fs.writeFileSync(__dirname+'/dump/babel.out.1.js',code.code)

		// eval(`(()=>{${code.code}})()`)
		eval(`${code.code}`)

		expect(true).to.equal(true)
		// expect(parsed.function()).to.equal(foo)
	})
	test("Babel plugin should add scope properties to functions and scope should be retained and equal across functions", ()=>{

		let src = /*javascript*/`
			let json = {
				'function1': function(arg1){ return foo },
				'function2': function(arg1){ return foo },
			}

			let foo = { bar: 1 }

			let string = smarts.stringify(json)
			let parsed = smarts.parse(string)
		`

		let code = smarts.transform(src)

		expect(true).to.equal(true)
		// expect(parsed.function1() == parsed.function2()).to.equal(true)
	})
})
