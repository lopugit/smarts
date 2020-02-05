let smarts = require('../src/index.js')()
let expect = require('chai').expect
let mlog = require('mocha-logger');
let test = it

describe("serialisation tests", ()=>{

	test('parsed should be equivalent to original json function oriented', ()=>{
		let json = {
			function1(){},
		}

		json.function2 = json.function1

		json.nested = {
			function1(){},
			function2: json.function1
		}

		let string = smarts.stringify(json)
		let parsed = smarts.parse(string)

		expect(smarts.equal(parsed, json)).to.equal(true)
	})
	test('parsed should be equivalent to original json object oriented', ()=>{
		let json = {
			nested: {
				object: {
					that: {
						is: {
							deep: {
							}
						}
					}
				}
			}
		}

		let string = smarts.stringify(json)
		let parsed = smarts.parse(string)

		expect(smarts.equal(parsed, json)).to.equal(true)
	})
	test('parsed should be equivalent to original json primitive types oriented', ()=>{
		let json = {
			yes: true,
			no: 'false',
			high: 99999
		}

		let string = smarts.stringify(json)
		let parsed = smarts.parse(string)

		expect(smarts.equal(parsed, json)).to.equal(true)
	})
	test('parsed should be equivalent to original json circular structure oriented', ()=>{
		let json = {
		}

		json.circular = json

		let string = smarts.stringify(json)
		let parsed = smarts.parse(string)

		expect(smarts.equal(parsed, json)).to.equal(true)
	})
	test('parsed should be equivalent to original json function oriented', ()=>{
		let json = {
			function1(){},
		}

		// json.circular = json
		json.function2 = json.function1

		json.nested = {
			function1(){},
			function2: json.function1
		}

		let string = smarts.stringify(json)
		let parsed = smarts.parse(string)

		expect(smarts.equal(parsed, json)).to.equal(true)
	})
	test('Infinity Test', ()=>{
		let json = {
			infinity: Infinity
		}

		let string = smarts.stringify(json)
		let parsed = smarts.parse(string)

		expect(smarts.equal(parsed, json)).to.equal(true)
	})
	test("circular equality test original json.circular == json", ()=>{
		let json = {}

		json.circular = json

		expect(json.circular == json).to.equal(true)
	})
	test("circular equality test parsed.circular.circular == parsed.circular", ()=>{
		let json = {}

		json.circular = json

		let string = smarts.stringify(json)
		let parsed = smarts.parse(string)
		
		expect(parsed.circular.circular == parsed.circular).to.equal(true)
	})
	test("circular equality test parsed.circular == parsed", ()=>{
		let json = {}

		json.circular = json

		let string = smarts.stringify(json)
		let parsed = smarts.parse(string)

		expect(parsed.circular == parsed).to.equal(true)
	})
	test("scope should be retained in a function", ()=>{
		globalThis.$scopes = globalThis.$scopes || []

		let $scope = {}
		globalThis.$scopes.push($scope)
		let json = {
			'function': function(){ return foo }
		}

		Object.defineProperty($scope, "json", {
			get(){
				return json
			},
			set(val){
				json = val
			},
			enumerable: true
		})

		Object.defineProperty(json.function, '$scopes', {
			value: [$scope]
		})

		let foo = 1

		Object.defineProperty($scope, "foo", {
			get(){
				return foo
			},
			set(val){
				foo = val
			},
			enumerable: true
		})
		
		let string = smarts.stringify(json)
		let parsed = smarts.parse(string)
		
		expect(parsed.function()).to.equal(foo)
	})
	test("scope should be retained and equal across functions", ()=>{
		globalThis.$scopes = globalThis.$scopes || []

		let $scope = {}
		globalThis.$scopes.push($scope)
		let json = {
			'function1': function(){ return foo },
			'function2': function(){ return foo },
		}

		Object.defineProperty($scope, "json", {
			get(){
				return json
			},
			set(val){
				json = val
			},
			enumerable: true
		})

		Object.defineProperty(json.function1, '$scopes', {
			value: [$scope]
		})
		Object.defineProperty(json.function2, '$scopes', {
			value: json.function1.$scopes
		})

		let foo = { bar: 1 }

		Object.defineProperty($scope, "foo", {
			get(){
				return foo
			},
			set(val){
				foo = val
			},
			enumerable: true
		})
		
		let string = smarts.stringify(json)
		let parsed = smarts.parse(string)
		
		expect(parsed.function1() == parsed.function2()).to.equal(true)
	})
	test('should equal a constant string ', ()=>{
		globalThis.$scopes = globalThis.$scopes || []

		let $scope = {}
		globalThis.$scopes.push($scope)

		let json = {
			foo: 'bar',
			zar: 1,
			nested: {
				foo: 'bar',
				doo: 'dar',
				function1(){}
			},
			function2(){},
			function3(){},
		}

		json.circular = json
		json.function4 = json.function2
		json.nested.function5 = json.function2

		Object.defineProperty($scope, "json", {
			get(){
				return json
			},
			set(val){
				json = val
			},
			enumerable: true
		})

		Object.defineProperty(json.function2, '$scopes', {
			value: [$scope]
		})

		let foo = 1

		Object.defineProperty($scope, "foo", {
			get(){
				return foo
			},
			set(val){
				foo = val
			},
			enumerable: true
		})
		

		let string = smarts.stringify(json)
		let parsed = smarts.parse(string)
		
		let definiteString = `[{"foo":"1","zar":1,"nested":"2","function2":"3","function3":"4","circular":"0","function4":"3"},"bar",{"foo":"1","doo":"5","function1":"6","function5":"3"},{"type":"7","$js":"8","$scopes":"9"},{"type":"7","$js":"10"},"dar",{"type":"7","$js":"11"},"function","function2(){}",["12"],"function3(){}","function1(){}",{"json":"0","foo":1}]`
		expect(string).to.equal(definiteString)
	})
})

describe("nested function tests", ()=>{
	
	test('parsed.function1 should equal parsed.nested.function2', ()=>{
		let json = {
			function1(){},
			nested: {
				function3(){}
			}
		}

		json.nested.function2 = json.function1

		let string = smarts.stringify(json)
		let parsed = smarts.parse(string)
		
		expect(parsed.function1 == parsed.nested.function2).to.equal(true)
		expect(typeof parsed.function1).to.equal('function')
		expect(typeof parsed.nested.function2).to.equal('function')
	})
	test('parsed.function1 should not equal parsed.nested.function3', ()=>{
		let json = {
			function1(){},
			nested: {
				function3(){}
			}
		}

		json.nested.function2 = json.function1

		let string = smarts.stringify(json)
		let parsed = smarts.parse(string)
		expect(parsed.function1 == parsed.nested.function3).to.equal(false)
	})
})

describe("circular function tests", ()=>{
	test('parsed.function1 should equal parsed.function2', ()=>{
		let json = {
			function1(){}
		}

		json.function2 = json.function1

		let string = smarts.stringify(json)
		let parsed = smarts.parse(string)
		expect(parsed.function1 == parsed.function2).to.equal(true)
	})
})

describe("object equality test", ()=>{
	test("objects should not be equal", ()=>{
		expect(smarts.equal({a:'a'}, { b:'b'})).to.equal(false)
	})

	test("objects should be equal", ()=>{
		expect(smarts.equal({a:'a'}, { a:'a'})).to.equal(true)
	})
})