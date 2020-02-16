let smarts = require('../../src/index.js')()
let expect = require('chai').expect
let mlog = require('mocha-logger');
let test = it

describe("Serialisation tests", ()=>{

	test('parsed should be equivalent to original json - object oriented', ()=>{
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
	test('parsed should be equivalent to original json - primitive types oriented', ()=>{
		let json = {
			yes: true,
			no: 'false',
			high: 99999
		}

		let string = smarts.stringify(json)
		let parsed = smarts.parse(string)

		expect(smarts.equal(parsed, json)).to.equal(true)
	})
	test('parsed should be equivalent to original json - circular structure oriented', ()=>{
		let json = {
		}

		json.circular = json

		let string = smarts.stringify(json)
		let parsed = smarts.parse(string)

		expect(smarts.equal(parsed, json)).to.equal(true)
	})
	test('parsed should be equivalent to original json - anonymous function property oriented', ()=>{
		let json = {
			function1: function(){},
		}

		json.function1.$scopes = []

		json.function2 = json.function1

		let string = smarts.stringify(json)
		let parsed = smarts.parse(string)

		expect(smarts.equal(parsed, json)).to.equal(true)
	})
	test('parsed should be equivalent to original json - named function oriented', ()=>{
		let json = {
			function1: function function2(){},
		}

		json.function1.$scopes = []

		let string = smarts.stringify(json)
		let parsed = smarts.parse(string)

		expect(smarts.equal(parsed, json)).to.equal(true)
	})
	test('parsed should be equivalent to original json - object method function oriented', ()=>{
		let json = {
			function1(){},
		}

		json.function1.$scopes = []

		json.function2 = json.function1

		let string = smarts.stringify(json)
		let parsed = smarts.parse(string)

		expect(smarts.equal(parsed, json)).to.equal(true)
	})
	test('functions should not be serialized if strictFunctions is true and they have no $scopes property', ()=>{
		let json = {
			function1(){},
		}

		let string = smarts.stringify(json)
		let parsed = smarts.parse(string)

		expect(typeof parsed.function1 == 'undefined').to.equal(true)
	})
	test('functions should be serialized if strictFunctions is false and they have no $scopes property', ()=>{
		let json = {
			function1(){},
		}

		let string = smarts.stringify(json, {strictFunctions:false})
		let parsed = smarts.parse(string)

		expect(typeof parsed.function1 == 'function').to.equal(true)
	})
	test('parsed should be equivalent to original json - function oriented', ()=>{
		let json = {
			function1(){},
		}
		json.function1.$scopes = []
		json.function2 = json.function1

		json.nested = {
			function1(){},
			function2: json.function1
		}
		json.nested.function1.$scopes = []

		let string = smarts.stringify(json)
		let parsed = smarts.parse(string)

		expect(smarts.equal(parsed, json)).to.equal(true)
	})
	test("scope should be retained in a function", ()=>{

		let json = {
			'function': function(){ return foo }
		}
		
		let $context = smarts.context()
		
		Object.defineProperty($context, "json", {
			get(){
				return json
			},
			set(val){
				json = val
			},
			enumerable: true
		})
		
		$context.$variableMap.json = 'let'
		
		Object.defineProperty(json.function, '$scopes', {
			value: [$context]
		})
		
		Object.defineProperty(json.function, '$context', {
			value: $context
		})

		let foo = 1

		Object.defineProperty($context, "foo", {
			get(){
				return foo
			},
			set(val){
				foo = val
			},
			enumerable: true
		})
		$context.$variableMaps[0].foo = 'let'

		let string = smarts.stringify(json)
		let parsed = smarts.parse(string)
		
		expect(parsed.function()).to.equal(foo)
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
	test('Infinity Test', ()=>{
		let json = {
			infinity: Infinity
		}

		let string = smarts.stringify(json)
		let parsed = smarts.parse(string)

		expect(parsed.infinity == Infinity).to.equal(true)
	})
})

describe("nested function tests", ()=>{
	
	test('parsed.function1 should equal parsed.nested.function3', ()=>{
		let json = {
			function1(){},
			nested: {
				function2(){}
			}
		}

		json.function1.$scopes = []
		json.nested.function2.$scopes = []

		json.nested.function3 = json.function1
		let string = smarts.stringify(json)
		let parsed = smarts.parse(string)
		expect(parsed.function1 == parsed.nested.function3).to.equal(true)
		expect(typeof parsed.function1).to.equal('function')
		expect(typeof parsed.nested.function3).to.equal('function')
	})
	test('parsed.function1 should not equal parsed.nested.function2', ()=>{
		let json = {
			function1(){},
			nested: {
				function2(){}
			}
		}
		json.function1.$scopes = []
		json.nested.function2.$scopes = []

		json.nested.function3 = json.function1

		let string = smarts.stringify(json)
		let parsed = smarts.parse(string)
		expect(parsed.function1 == parsed.nested.function2).to.equal(false)
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