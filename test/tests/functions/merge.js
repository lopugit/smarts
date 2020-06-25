let smarts = require(global.smartsPath || '../../../src/index.js')()
let expect = require('chai').expect
let mlog = require('mocha-logger');
let test = it
let fs = require('fs')

describe("Function smarts.merge tests", ()=>{

	test("should merge circular objects without error", ()=>{

		let obj1 = {
			self: {
				hmm: 'ok'
			}
		}

		let obj2 = {
			prop1: {
				prop2: 'val1'
			},
			test: 'hey'
		}

		obj2.self = obj2

		let err = false

		try {
			smarts.merge(obj1, obj2, {clone:false})
		} catch(e){
			console.error(e)
			err = e
		}
		
		expect(err).to.equal(false)
		
	})
	test("should clone circular merged objects without error", ()=>{

		let obj1 = {
			self: {
				hmm: 'ok'
			}
		}

		let obj2 = {
			test: 'hey'
		}

		obj2.self = obj2

		let err = false

		try {
			smarts.merge(obj1, obj2, {clone:true})
		} catch(e){
			console.error(e)
			err = e
		}
		
		expect(err).to.equal(false)
		
	})
})
