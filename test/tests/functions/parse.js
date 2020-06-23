let smarts = require(global.smartsPath || '../../../src/index.js')()
let expect = require('chai').expect
let mlog = require('mocha-logger');
let test = it
let fs = require('fs')

describe("Function smarts.parse tests", ()=>{

	test("should parse basic circular object without error", ()=>{

		let string = '[{"test":"1","self":"0"},"hey"]'
		let obj = null
		let err = false

		try {
			obj = smarts.parse(string)
		} catch(e){
			console.error(e)
			err = e
		}
		
		expect(err).to.equal(false)
		
	})
})
