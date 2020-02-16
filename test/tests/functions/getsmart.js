let smarts = require('../../../src/index.js')()
let expect = require('chai').expect
let mlog = require('mocha-logger');
let test = it
let fs = require('fs')

describe("Function smarts.getsmart tests", ()=>{

	test("should return shallow properties", ()=>{

		let object = {
			property: {
				foo: 'bar'
			}
		}

		expect(smarts.getsmart(object, 'property', null)).to.equal(object.property)
	})
	test("should return deep properties", ()=>{

		let object = {
			property: {
				foo: 'bar'
			}
		}

		expect(smarts.getsmart(object, 'property.foo', null)).to.equal(object.property.foo)
	})
	test("should resort to default value when deep property paths aren't fulfilled", ()=>{

		let object = {
			property: {}
		}
		let defaultValue = {}
		
		expect(smarts.getsmart(object, 'property.foo', defaultValue)).to.equal(defaultValue)
	})
	test("should be able to return array indexes", ()=>{

		let object = {
			property: [1]
		}
		
		expect(smarts.getsmart(object, 'property.0', null)).to.equal(1)
	})
})
