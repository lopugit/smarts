let smarts = require(global.smartsPath || '../../../src/index.js')()
let expect = require('chai').expect
let mlog = require('mocha-logger');
let test = it
let fs = require('fs')

describe("Function smarts.stringify tests", ()=>{

	test("should stringify properties with value of undefined", ()=>{

		let test = {}

		let obj = {
			property: undefined
		}
		let stringified = smarts.stringify(obj)
		let expected = '[{"property":"1"},{"type":"2","$js":"2"},"undefined"]'
		expect(stringified).to.equal(expected)
	})
})
