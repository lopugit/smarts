let smarts = require(global.smartsPath || '../../../src/index.js')()
let expect = require('chai').expect
let mlog = require('mocha-logger');
let test = it
let fs = require('fs')

describe("Function smarts.parsePropertyPath tests", ()=>{

	test("should parse a property path with singular escaped property path", ()=>{

		let path = "[\"thing\"]"

		try {
			escaped = smarts.parsePropertyPath(path)
		} catch(e){
			console.error(e)
			err = e
		}
		
		expect(escaped[0]).to.equal("thing")
		expect(escaped.length).to.equal(1)
		
	})
})
