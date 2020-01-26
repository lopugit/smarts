let smarts = require('../src/index.js')()
let expect = require('chai').expect
let mlog = require('mocha-logger');
let test = it
describe("serialisation tests", ()=>{

	let json = {
		'function': function(){}
	}

	Object.defineProperty(json.function, '$scopes', {
		value: [{}]
	})

	// circular reference
	json.circular = json

	// some value
	json.foo = 'foo'

	let string = smarts.stringify(json)
	let parsed = smarts.parse(string)


	let definiteString = `[{"function":"1","circular":"0","foo":"2"},{"$function":"3","$scopes":"4"},"foo","function(){}",["5"],{}]`
	test('should equal this string '+definiteString, ()=>{
		expect(string).to.equal(definiteString)
	})
	test('parsed should be equivalent to original json', ()=>{
		expect(smarts.equal(parsed, json)).to.equal(true)
	})
	test("circular equality test original json.circular == json", ()=>{
		expect(json.circular == json).to.equal(true)
	})
	test("circular equality test parsed.circular.circular == parsed.circular", ()=>{
		expect(parsed.circular.circular == parsed.circular).to.equal(true)
	})
	test("circular equality test parsed.circular == parsed", ()=>{
		expect(parsed.circular == parsed).to.equal(true)
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