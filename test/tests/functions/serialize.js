let smarts = require(global.smartsPath || '../../../src/index.js')()
let expect = require('chai').expect
let mlog = require('mocha-logger');
let test = it
let fs = require('fs')

describe("Function smarts.serialize tests", ()=>{

	test("should serialize properties with value of undefined", ()=>{

		let obj = {
			array: [1,{ test: 'hey' },3]
		}
		obj.array.uuid = 'test'

		let serialized = smarts.serialize(obj)
		let expected = '[{"array":"1"},{"type":"2","$js":"3","uuid":"4"},"Array",[1,"5",3],"test",{"test":"6"},"hey"]'

		expect(serialized).to.equal(expected)
	})
})