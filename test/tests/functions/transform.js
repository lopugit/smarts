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
			let evaldScope = $context.$contextsList[0].$closure
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
			globalThis.smartErrors = true
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
			let evaldScope = $context.$contextsList[0].$closure
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
			let evaldScope = $context.$contextsList[0].$closure
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
	describe("Should transform any source code", ()=>{
		let mainPath = `${__dirname}/../../snippets/`
		let inPath = mainPath+'in/'
		let outPath = mainPath+'out/'
		let files = fs.readdirSync(`${inPath}`, 'utf-8')
		for(let file of files){
			test(`${file} should not error when transformed`, ()=>{
				let code = smarts.transform(fs.readFileSync(`${inPath}${file}`, `utf-8`))
				fs.writeFileSync(`${outPath}${file}`, code.code)
			})
		}
	})
	describe("Should eval any transformed source code", ()=>{
		let mainPath = `${__dirname}/../../snippets/`
		let inPath = mainPath+'in/'
		let outPath = mainPath+'out/'
		let files = fs.readdirSync(`${inPath}`, 'utf-8')
		for(let file of files){
			if(file.indexOf('require') < 0){
				test(`${file} should not error when eval'd`, ()=>{
					let code = smarts.transform(fs.readFileSync(`${inPath}${file}`, `utf-8`))
					eval(code.code)
					debug=1
				})
			}
		}
	})
	describe("Any self-contained transformed source code should run without error", ()=>{
		let mainPath = `${__dirname}/../../snippets/`
		let outPath = mainPath+'out/'
		let files = fs.readdirSync(`${outPath}`, 'utf-8')
		for(let file of files){
			test(`${file} should not error when run after being transformed`, ()=>{
				require(`${outPath}${file}`)
			})
		}
	})
	// describe("manual testing", ()=>{
	// 	test("manual testing", ()=>{
	// 		let code = smarts.transform(fs.readFileSync(__dirname+"/../../snippets/in/for loop iter const.js", 'utf-8'))
	// 		fs.writeFileSync(__dirname+"/../../snippets/out/for loop iter const.js", code.code)
	// 		require(__dirname+"/../../snippets/out/for loop iter const.js")
	// 		// let code = smarts.transform(fs.readFileSync(__dirname+"/../../snippets/in/require module.js", 'utf-8'))
	// 		// fs.writeFileSync(__dirname+"/../../snippets/out/require module.js", code.code)
	// 	})
	// })
})
