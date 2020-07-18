let smarts = require(global.smartsPath || '../../../src/index.js')()
let expect = require('chai').expect
let mlog = require('mocha-logger');
let test = it
let fs = require('fs')

describe("Function smarts.parse tests", ()=>{

	// test("should parse basic circular object without error", ()=>{

	// 	let string = '[{"test":"1","self":"0"},"hey"]'
	// 	let obj = null
	// 	let err = false

	// 	try {
	// 		obj = smarts.parse(string)
	// 	} catch(e){
	// 		console.error(e)
	// 		err = e
	// 	}
		
	// 	expect(err).to.equal(false)
	// 	expect(obj.self).to.equal(obj)
	// })

	// test("should parse nested basic circular object without error", ()=>{

	// 	let string = '[{"test":"1","nested":"2"},"hey",{"self": "0"}]'
	// 	let obj = null
	// 	let err = false

	// 	try {
	// 		obj = smarts.parse(string)
	// 	} catch(e){
	// 		console.error(e)
	// 		err = e
	// 	}
		
	// 	expect(err).to.equal(false)
	// 	expect(obj.nested.self).to.equal(obj)
	// })

	// test("should parse circular object that points to nested object without error", ()=>{

	// 	let string = '[{"test":"1","nested":"2"},"hey",{"self": "2"}]'
	// 	let obj = null
	// 	let err = false

	// 	try {
	// 		obj = smarts.parse(string)
	// 	} catch(e){
	// 		console.error(e)
	// 		err = e
	// 	}
		
	// 	expect(err).to.equal(false)
	// 	expect(obj.nested.self).to.equal(obj.nested)
	// })

	// test("Should parse property of value that was undefined", ()=>{
		
	// 	let string = '[{"property":"1"},{"type":"2","$js":"2"},"undefined"]'
	// 	let obj = { property: '' }
	// 	let err = false
	// 	'[{"nested":"1"},{"property":"2"},{"type":"3","$js":"3"},"undefined"]'
	// 	try {
	// 		obj = smarts.parse(string)
	// 	} catch(e){
	// 		console.error(e)
	// 		err = e
	// 	}
		
	// 	expect(err).to.equal(false)
	// 	expect(obj.property).to.equal(undefined)
		
	// })
	// test("Should parse property of nested property of value that was undefined", ()=>{
		
	// 	let string = '[{"nested":"1"},{"property":"2"},{"type":"3","$js":"3"},"undefined"]'
	// 	let obj = { property: '' }
	// 	let err = false
		
	// 	try {
	// 		obj = smarts.parse(string)
	// 	} catch(e){
	// 		console.error(e)
	// 		err = e
	// 	}
		
	// 	expect(err).to.equal(false)
	// 	expect(obj.nested.property).to.equal(undefined)
		
	// })
	// test("Should parse property of nested property of value that was undefined", ()=>{
		
	// 	let string = '[{"nested":"1"},{"property":"2"},{"type":"3","$js":"3"},"undefined"]'
	// 	let obj = { property: '' }
	// 	let err = false
		
	// 	try {
	// 		obj = smarts.parse(string)
	// 	} catch(e){
	// 		console.error(e)
	// 		err = e
	// 	}
		
	// 	expect(err).to.equal(false)
	// 	expect(obj.nested.property).to.equal(undefined)
		
	// })
	test("Should parse nested nested property that has value of undefined", ()=>{
		
		let string = '[{"nested":"1"},{"nested":"2"},{"property":"3"},{"type":"4","$js":"4"},"undefined"]'
		let obj = { property: '' }
		let err = false
		
		try {
			obj = smarts.parse(string)
		} catch(e){
			console.error(e)
			err = e
		}
		
		expect(err).to.equal(false)
		expect(obj.nested.property).to.equal(undefined)
		
	})
})
