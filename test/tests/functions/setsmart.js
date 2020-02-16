let smarts = require('../../../src/index.js')()
let expect = require('chai').expect
let mlog = require('mocha-logger');
let test = it
let fs = require('fs')

describe("Function smarts.setsmart tests", ()=>{

	test("should set shallow properties", ()=>{

		let object = {
			property: {
				foo: 'bar'
			}
		}

		let newValue = {}
		smarts.setsmart(object, 'property', newValue)

		expect(object.property).to.equal(newValue)

	})
	test("should set deep properties", ()=>{

		let object = {
			property: {
				foo: 'bar'
			}
		}

		let newValue = {}
		smarts.setsmart(object, 'property.foo', newValue)
		
		expect(object.property.foo).to.equal(newValue)
		
	})
	describe("should create new objects when deep property paths aren't fulfilled", ()=>{
		test("deep broken property path completion should complete missing links with objects", ()=>{
			let object = {
				property: {}
			}
			let newValue = {}
			smarts.setsmart(object, 'property.deep.foo', newValue)
			expect(typeof object.property.deep).to.equal('object')
		})
		test("deep broken property path completion should set the last property in path to the new value", ()=>{
			let object = {
				property: {}
			}
			let newValue = {}
			smarts.setsmart(object, 'property.deep.foo', newValue)
			expect(object.property.deep.foo).to.equal(newValue)
		})
	})
})
