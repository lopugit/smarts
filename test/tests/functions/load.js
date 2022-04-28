let smarts = require(global.smartsPath || '../../../src/index.js')()
let expect = require('chai').expect
let mlog = require('mocha-logger');
let test = it
let fs = require('fs')

describe("Function smarts.load tests", ()=>{

	test("should load properties with value of undefined", ()=>{

		const string = '[{"array":"1"},{"type":"2","$js":"3","uuid":"4"},"Array",[1,"5",3],"test",{"test":"6"},"hey"]'

		let loaded = smarts.load(string)

		expect(loaded.array instanceof Array).to.equal(true)
		expect(loaded.array.uuid).to.equal('test')
	})
})
