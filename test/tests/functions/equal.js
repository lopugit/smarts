let smarts = require(global.smartsPath || '../../../src/index.js')()
let expect = require('chai').expect
let mlog = require('mocha-logger');
let test = it
let fs = require('fs')

describe("Function smarts.equal tests", ()=>{

	test("should work with properties that equal undefined", ()=>{

		let object1 = {
			property: undefined
		}
		let object2 = {
			property: undefined
		}
		let result = smarts.equal(object1, object2)
		expect(result).to.equal(true)
	})

})
