let smarts = require(global.smartsPath || '../../../src/index.js')()
let expect = require('chai').expect
let mlog = require('mocha-logger');
let test = it
let fs = require('fs')

describe("Function smarts.deletesmart tests", ()=>{

	test("should delete shallow property", ()=>{

		let object = {
			property: {
				foo: {
					bar: 'hey'
				}
			}
		}

		smarts.deletesmart(object, "property")

		expect("property" in object).to.equal(false)
	})
	test("should delete deep property", ()=>{

		let subObj = {
			bar: 'hey'
		}

		let object = {
			property: {
				foo: subObj
			}
		}

		smarts.deletesmart(object, "property.foo.bar")

		expect("bar" in subObj).to.equal(false)
	})
})
