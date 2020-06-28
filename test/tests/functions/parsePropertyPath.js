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
	test("should parse a property path with standard paths and ending singular escaped property path", ()=>{

		let path = "test1.test2[\"thing\"]"

		try {
			escaped = smarts.parsePropertyPath(path)
		} catch(e){
			console.error(e)
			err = e
		}
		
		expect(escaped[2]).to.equal("thing")
		expect(escaped.length).to.equal(3)
		
	})
	test("should parse a property path with two escaped property path", ()=>{

		let path = "test1[\"test2\"][\"thing\"]"

		try {
			escaped = smarts.parsePropertyPath(path)
		} catch(e){
			console.error(e)
			err = e
		}
		
		expect(escaped[2]).to.equal("thing")
		expect(escaped.length).to.equal(3)
		
	})
	test("should parse a property path with singular escaped property path followed by a dot delimited path", ()=>{

		let path = "test1[\"thing\"].test2"

		try {
			escaped = smarts.parsePropertyPath(path)
		} catch(e){
			console.error(e)
			err = e
		}
		
		expect(escaped[2]).to.equal("test2")
		expect(escaped.length).to.equal(3)
		
	})
})
