smarts = require('../../../src/index.js')()
let expect = require('chai').expect
let mlog = require('mocha-logger');
let test = it
let fs = require('fs')
iter = 1
describe("Transform tests", ()=>{
	describe("Babel plugin should add scope properties to functions and scope should be retained in a function", ()=>{
		let src = /*javascript*/`
			let json = {
				function1: function(){ return foo },
			}

			let foo = "foo"

			let string = smarts.stringify(json)
			let parsed = smarts.parse(string)
		`
		test("function1", ()=>{
			let code = smarts.transform(src)
			let path = `${__dirname}/../../dump/babel.out.${iter++}.js`
			fs.writeFileSync(path,code.code)

			var $context = smarts.context()

			// require(path)
			eval(code.code)
			let evaldScope = $context.$contexts[0].$closure
			expect(evaldScope.parsed.function1()).to.equal("foo")
		})
	})
	describe("Babel plugin should add scope properties to functions and scope should be retained across multiple functions", ()=>{
		let src = /*javascript*/`
			let json = {
				function1: function(){ return foo },
				function2(){ return foo },
			}

			let foo = "foo"

			let string = smarts.stringify(json)
			let parsed = smarts.parse(string)
		`
		test("function1",()=>{
			let code = smarts.transform(src)
			let path = `${__dirname}/../../dump/babel.out.${iter++}.js`
			fs.writeFileSync(path, code.code)

			eval(code.code)
			let evaldScope = $context.$closure
			expect(evaldScope.parsed.function1()).to.equal("foo")
		})
		test("function2",()=>{
			let code = smarts.transform(src)
			let path = `${__dirname}/../../dump/babel.out.${iter++}.js`
			fs.writeFileSync(path, code.code)

			eval(code.code)
			let evaldScope = $context.$closure
			expect(evaldScope.parsed.function2()).to.equal("foo")
		})
	})
	describe("Babel plugin should add scope properties to functions and scope should be retained and equal across functions", ()=>{
		let src = /*javascript*/`
			let json = {
				function1: function(){ return foo },
				function2: function(){ return foo },
			}

			let foo = { bar: 1 }

			let string = smarts.stringify(json)
			let parsed = smarts.parse(string)
		`
		test("function1() == function2()", ()=>{

			let code = smarts.transform(src)
			let path = `${__dirname}/../../dump/babel.out.${iter++}.js`

			eval(code.code)
			let evaldScope = $context.$closure
			expect(evaldScope.parsed.function1() == evaldScope.parsed.function2()).to.equal(true)
		})
	})
	describe("Babel plugin should inherit state of parent block", ()=>{
		let src = /*javascript*/`
			let json = {
				function1: function(){ return test },
			}

			let foo = "foo"

			let string = smarts.stringify(json)
			let parsed = smarts.parse(string)
		`
		test("parsedFunction.$scopes[1].test == 'foo'", ()=>{

			let code = smarts.transform(src)
			let path = `${__dirname}/../../dump/babel.out.${iter++}.js`
			fs.writeFileSync(path, code.code)

			var $context = smarts.context()
			let test = "foo"
			$context.$add('let', 'test', test)
			
			eval(code.code)
			let evaldScope = $context.$contexts[0].$closure
			let parsedFunction = evaldScope.parsed.function1
			let parsedFunctionsScope = parsedFunction.$scopes[1]
			expect(parsedFunctionsScope.test).to.equal("foo")
		})
		test("parsedFunction() == 'foo'", ()=>{

			let code = smarts.transform(src)
			let path = `${__dirname}/../../dump/babel.out.${iter++}.js`
			fs.writeFileSync(path, code.code)

			var $context = smarts.context()
			let test = "foo"
			$context.$add('let', 'test', test)
			
			eval(code.code)
			let evaldScope = $context.$contexts[0].$closure
			let parsedFunction = evaldScope.parsed.function1
			expect(parsedFunction()).to.equal("foo")
		})
	})
	describe("Parsed function should be replaceable and inherit state of replacing function", ()=>{
		let src = /*javascript*/`
			let json = {
				function1: function(){ return foo },
			}

			let foo = "foo"

			let string = smarts.stringify(json)
			let parsed = smarts.parse(string)
		`
		test("differentFunction()", ()=>{

			let code = smarts.transform(src)
			let path = `${__dirname}/../../dump/babel.out.${iter++}.js`
			fs.writeFileSync(path, code.code)

			eval(code.code)
			let evaldScope = $context.$closure
			
			let originalFunction = evaldScope.json.function1
			let parsedFunction = evaldScope.parsed.function1
			let differentFunction = parsedFunction.$scopedEval(function(){return foo+foo})
			expect(differentFunction()).to.equal("foofoo")
		})
	})
	describe("Variable type should be retained such as const, let, and var", ()=>{
		let src = /*javascript*/`
			let json = {
				function1: function(){ foo = 5 },
			}

			const foo = "foo"

			let string = smarts.stringify(json)
			let parsed = smarts.parse(string)
		`
		test("modifying a const()", ()=>{

			let code = smarts.transform(src)
			let path = `${__dirname}/../../dump/babel.out.${iter++}.js`
			fs.writeFileSync(path, code.code)

			eval(code.code)
			let evaldScope = $context.$closure
			
			let originalFunction = evaldScope.json.function1
			expect(originalFunction).to.throw('Assignment to constant variable.')
		})
	})
})
