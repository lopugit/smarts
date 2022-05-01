let smarts = require(global.smartsPath || '../../../src/index.js')()
let expect = require('chai').expect
let mlog = require('mocha-logger');
let test = it
let fs = require('fs')

describe("Function smarts.load tests", ()=>{

	test("should load properties with value of undefined", ()=>{

		const string = '[{"array":"1"},{"type":"2","js":"3","uuid":"4"},"Array",[1,"5",3],"test",{"test":"6"},"hey"]'

		let loaded = smarts.load(string)

		expect(loaded.array instanceof Array).to.equal(true)
		expect(loaded.array.uuid).to.equal('test')
	})
	test("should load properties with value of undefined", ()=>{

		const string = '[{"func":"1"},{"type":"2","js":"3","$scopes":"4","$context":"4","uuid":"5"},"function","function(){}",{"type":"6","js":"6"},"test","undefined"]'

		let loaded = smarts.load(string)

		expect(loaded.func instanceof Function).to.equal(true)
		expect(loaded.func.uuid).to.equal('test')
	})
})
