let smarts = require(global.smartsPath || '../../../src/index.js')()
let expect = require('chai').expect
let mlog = require('mocha-logger');
let test = it
let fs = require('fs')

describe("Function smarts.merge tests", ()=>{

	test("obj1 basic values should not be overwritten by obj2 values", ()=>{

		let obj1 = {
			foo: 'bar1'
		}

		let obj2 = {
			foo: 'bar2'
		}

		let err = false

		try {
			smarts.merge(obj1, obj2)
		} catch(e){
			console.error(e)
			err = e
		}
		
		expect(obj1.foo).to.equal('bar1')
		expect(err).to.equal(false)
		
	})
	test("obj1 basic values should be overwritten by obj2 values when overwrite option is passed", ()=>{

		let obj1 = {
			foo: 'bar1'
		}

		let obj2 = {
			foo: 'bar2'
		}

		let err = false

		try {
			smarts.merge(obj1, obj2, {
				overwrite: true
			})
		} catch(e){
			console.error(e)
			err = e
		}
		
		expect(obj1.foo).to.equal('bar2')
		expect(err).to.equal(false)
		
	})
	test("obj2 basic values should be added if not present", ()=>{

		let obj1 = {
		}

		let obj2 = {
			foo: 'bar2'
		}

		let err = false

		try {
			smarts.merge(obj1, obj2, {
				overwrite: true
			})
		} catch(e){
			console.error(e)
			err = e
		}
		
		expect(obj1.foo).to.equal('bar2')
		expect(err).to.equal(false)
		
	})
	test("obj1 objects should only have obj2 properties added, not overwritten in any case", ()=>{

		let obj1 = {
			foo: {
				bar: 'bar2'
			}
		}

		let obj2 = {
			foo: {
				bar: 'bar3'
			}
		}

		let err = false

		try {
			smarts.merge(obj1, obj2)
		} catch(e){
			console.error(e)
			err = e
		}
		
		expect(obj1.foo).to.not.equal(obj2.foo)
		expect(err).to.equal(false)
		
	})
	test("obj1 objects should only have obj2 properties added, not overwritten in any case", ()=>{

		let obj1 = {
			foo: {
				bar: 'bar2'
			}
		}

		let obj2 = {
			foo: {
				bar: 'bar3'
			}
		}

		let err = false

		try {
			smarts.merge(obj1, obj2)
		} catch(e){
			console.error(e)
			err = e
		}
		
		expect(obj1.foo).to.not.equal(obj2.foo)
		expect(err).to.equal(false)
		
	})
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
			smarts.merge(obj1, obj2)
		} catch(e){
			console.error(e)
			err = e
		}
		
		expect(obj1.prop1).to.equal(obj2.prop1)
		expect(obj1.test).to.equal(obj2.test)
		expect(err).to.equal(false)
		
	})
	test("should clone circular merged objects without error", ()=>{

		let obj1 = {
			foo1: 'bar1'
		}

		obj1.self = obj1

		let obj2 = {
			foo2: 'bar2'
		}

		obj2.self = obj2

		let err = false

		try {
			smarts.merge(obj1, obj2, {clone:true})
		} catch(e){
			console.error(e)
			err = e
		}

		expect(obj1.self).to.equal(obj1)
		expect(err).to.equal(false)
		
	})
	test("should clone circular merged objects without error", ()=>{

		let obj1 = {
			pointer1: {
				foo: 'bar1'
			}
		}

		obj1.pointer2 = obj1.pointer1

		let obj2 = {
			pointer1: {
				foo: 'bar2'
			}
		}

		obj2.pointer2 = obj2.pointer1

		let err = false

		// let obj3 = smarts.schema(obj1, obj2)

		try {
			smarts.merge(obj1, obj2)
		} catch(e){
			console.error(e)
			err = e
		}
		
		expect(obj1.pointer1).to.equal(obj1.pointer2)
		
	})
})
