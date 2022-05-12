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
		let expected = '[{"array":"1"},{"type":"2","js":"3","uuid":"4"},"Array",[1,"5",3],"test",{"test":"6"},"hey"]'

		expect(serialized).to.equal(expected)
	})
	test("should serialize properties with value of undefined", ()=>{

		let obj = {
			func: function(){}
		}
		obj.func.uuid = 'test'

		let serialized = smarts.serialize(obj)
		let expected = '[{"func":"1"},{"type":"2","js":"3","$scopes":"4","$context":"4","uuid":"5"},"function","function(){}",{"type":"6","js":"6"},"test","undefined"]'


		expect(serialized).to.equal(expected)
	})
	test("Function should Serialize and Load correctly", ()=>{

		let obj = {
			test(){ return 'hello' }
		}

		obj.test.uuid = 'a uuid'

		const serialized = smarts.serialize(obj)
		const loaded = smarts.load(serialized)

		expect(typeof loaded.test).to.equal('function')
		
	})
})
