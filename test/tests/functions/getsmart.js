let smarts = require(global.smartsPath || '../../../src/index.js')()
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
		
		let gotten = smarts.getsmart(object, 'property.foo', defaultValue)
		
		expect(gotten).to.equal(defaultValue)
	})
	test("should be able to detect when a property was not defined at all via broken path during traversal rather than simply had a value of undefined", ()=>{

		let object = {
			property: {
				property: {

				}
			}
		}

		let gotten = smarts.getsmart(object, 'property.property.property.property.property', undefined, true)
		
		expect(gotten.undefined).to.equal(true)
	})
	test("should be able to detect when a property was not defined at all rather than simply had a value of undefined", ()=>{

		let object = {
		}

		let gotten = smarts.getsmart(object, 'foo', undefined, true)
		
		expect(gotten.undefined).to.equal(true)
	})
	test("should be able to detect when a property was defined but had value of undefined but the property existed", ()=>{

		let object = {
			foo: undefined
		}

		let gotten = smarts.getsmart(object, 'foo', undefined, true)
		
		expect(gotten.undefined).to.equal(false)
	})
	test("should be able to return array indexes", ()=>{

		let object = {
			property: [1]
		}
		
		expect(smarts.getsmart(object, 'property.0', null)).to.equal(1)
	})
	test("should be able to use array of property path as input with only 1 value in array", ()=>{

		let test = {}

		let object = {
			test
		}
		let gotten = smarts.getsmart(object, ['test'], undefined)
		expect(gotten).to.equal(test)
	})
	test("should be able to use array of property path as input", ()=>{

		let test = {}

		let object = {
			property: {
				property: {
					property: {
						test
					}
				}
			}
		}
		let gotten = smarts.getsmart(object, ['property','property','property','test'], undefined)
		expect(gotten).to.equal(test)
	})
	test("should be able to access an escaped escaped path based property", ()=>{

		let test = {}

		let object = {
			"[\\\"foo\\\"]": 'bar'
		}
		let gotten = smarts.getsmart(object, smarts.epp(`[\"foo\"]`), undefined)
		let expected = object["[\\\"foo\\\"]"]
		expect(gotten).to.equal(expected)
	})
})
