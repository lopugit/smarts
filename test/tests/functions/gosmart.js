let smarts = require('../../../src/index.js')()
let expect = require('chai').expect
let mlog = require('mocha-logger');
let test = it
let fs = require('fs')

describe("Function smarts.gosmart tests", ()=>{

	test("should return shallow properties", ()=>{

		let object = {
			property: {
				foo: 'bar'
			}
		}

		expect(smarts.gosmart(object, 'property', null)).to.equal(object.property)
	})
	test("should return deep properties", ()=>{

		let object = {
			property: {
				foo: 'bar'
			}
		}

		expect(smarts.gosmart(object, 'property.foo', null)).to.equal(object.property.foo)
	})
	test("should resort to default value when deep property paths aren't fulfilled", ()=>{

		let object = {
			property: {}
		}
		let defaultValue = {}
		
		expect(smarts.gosmart(object, 'property.foo', defaultValue)).to.equal(defaultValue)
	})
	test("should be able to return array indexes", ()=>{

		let object = {
			property: [1]
		}
		
		expect(smarts.gosmart(object, 'property.0', null)).to.equal(1)
	})
	test("shouldn't overwrite shallow properties that already exist", ()=>{

		let object = {
			property: {
				foo: 'bar'
			}
		}

		let newValue = {}
		smarts.gosmart(object, 'property', newValue)

		expect(object.property).to.not.equal(newValue)

	})
	test("shouldn't overwrite deep properties that already exist", ()=>{

		let object = {
			property: {
				foo: 'bar'
			}
		}

		let newValue = {}
		smarts.gosmart(object, 'property.foo', newValue)
		
		expect(object.property.foo).to.not.equal(newValue)
		
	})
	describe("should create new objects when deep property paths aren't fulfilled", ()=>{
		test("deep broken property path completion should complete missing links with objects", ()=>{
			let object = {
				property: {}
			}
			let newValue = {}
			smarts.gosmart(object, 'property.deep.foo', newValue)
			expect(typeof object.property.deep).to.equal('object')
		})
		test("deep broken property path completion should set the last property in path to the new value", ()=>{
			let object = {
				property: {}
			}
			let newValue = {}
			smarts.gosmart(object, 'property.deep.foo', newValue)
			expect(object.property.deep.foo).to.equal(newValue)
		})
	})
})
