let smarts = require('../../../src/index.js')()
let expect = require('chai').expect
let mlog = require('mocha-logger');
let test = it
let fs = require('fs')

describe("Function smarts.schema Parsing tests", ()=>{

	test("schema shouldn't overwrite objects", ()=>{

		let schema = {
			property: {}
		}
		let object = {
			property: {
				foo: 'bar'
			}
		}

		smarts.schema(object, schema)
		
		expect(object.property.foo).to.equal('bar')
	})
	test("schema should add new properties deeply", ()=>{

		let schema = {
			property: {
				newProperty: {}
			}
		}
		let object = {
			property: {
				oldProperty: {}
			}
		}

		smarts.schema(object, schema)
		
		expect(object.property.hasOwnProperty('newProperty')).to.equal(true)
	})
	test("schema should not merge arrays", ()=>{

		let schema = {
			property: [1]
		}
		let object = {
			property: [2]
		}

		smarts.schema(object, schema)
		
		expect(object.property.indexOf(1) == 0).to.equal(false)
	})
	test("schema should not merge arrays, especially with functions in them", ()=>{

		let schema = {
			property: [function(){}]
		}
		let object = {
			property: [2]
		}

		smarts.schema(object, schema)
		
		expect(object.property.indexOf(1) == 0).to.equal(false)
	})
	test("schema should add new scoped functions", ()=>{

		let schema = {
			function1(){}
		}
		schema.function1.$scopes = []
		
		let object = {}

		smarts.schema(object, schema)
		
		expect(object.hasOwnProperty('function1')).to.equal(true)
		expect(typeof object.function1 == 'function').to.equal(true)
	})
	test("schema should not overwrite functions", ()=>{

		let schema = {
			function1(){}
		}
		schema.function1.$scopes = []
		
		let object = {
			function1(foo){}
		}
		object.function1.$scopes = []

		smarts.schema(object, schema)
		let string = object.function1.toString()
		expect(object.function1.toString() == string).to.equal(true)
	})
	test("schema should add new properties", ()=>{

		let schema = {
			foo: 'bar'
		}
		
		let object = {}

		smarts.schema(object, schema)
		
		expect(object.hasOwnProperty('foo')).to.equal(true)
		expect(object.foo == 'bar').to.equal(true)
	})
	test("schema should clone schema values", ()=>{

		let schema = {
			foo: {}
		}
		
		let object = {}

		smarts.schema(object, schema)
		
		expect(object.hasOwnProperty('foo')).to.equal(true)
		expect(object.foo != schema.foo).to.equal(true)
	})
	
})
