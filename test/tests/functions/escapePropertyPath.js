let smarts = require(global.smartsPath || '../../../src/index.js')()
let expect = require('chai').expect
let mlog = require('mocha-logger');
let test = it
let fs = require('fs')

describe("Function smarts.escapePropertyPath tests", ()=>{

	// test("should parse a property path with singular escaped property path", ()=>{

	// 	let path = "[\"thing\"]"

	// 	try {
	// 		escaped = smarts.escapePropertyPath(path)
	// 	} catch(e){
	// 		console.error(e)
	// 		err = e
	// 	}
		
	// 	let expected = "[\"[\\\"thing\\\"]\"]"
	// 	expect(escaped).to.equal(expected)
		
	// })
	test("should parse a property path with singular escaped property path", ()=>{

		let path = "[\"thing\"][\"thing\"]"

		try {
			escaped = smarts.escapePropertyPath(path)
		} catch(e){
			console.error(e)
			err = e
		}
		
		let expected = "[\"[\\\"thing\\\"][\\\"thing\\\"]\"]"
		expect(escaped).to.equal(expected)
		
	})
})
