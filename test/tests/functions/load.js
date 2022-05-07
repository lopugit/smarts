let smarts = require(global.smartsPath || '../../../src/index.js')()
let expect = require('chai').expect
let mlog = require('mocha-logger');
let test = it
let fs = require('fs')

describe("Function smarts.load tests", ()=>{

	test("should load properties with value of undefined", ()=>{

		const string = '[{"array":"1"},{"type":"2","js":"3","uuid":"4"},"Array",[1,"5",3],"test",{"test":"6"},"hey"]'

		let loaded = smarts.load(string)

		expect(loaded.array instanceof Array).to.equal(true)
		expect(loaded.array.uuid).to.equal('test')
	})
	test("should load properties with value of undefined", ()=>{

		const string = '[{"func":"1"},{"type":"2","js":"3","$scopes":"4","$context":"4","uuid":"5"},"function","function(){}",{"type":"6","js":"6"},"test","undefined"]'

		let loaded = smarts.load(string)

		expect(loaded.func instanceof Function).to.equal(true)
		expect(loaded.func.uuid).to.equal('test')
	})
	test("Should not error", () => {

		const string = '[{"_id":"1","uuid":"2","js":"3"},"6275200ba46970f84e2f9946","3782df1e-25da-489c-be2f-ec76fbbd9f02",{"uuid":"2","components":"4","datas":"5"},{"uuid":"6","root":"7"},{"uuid":"8","obj":"9"},"3f3648f3-4044-4314-9db9-eb61bd2ac704",{"uuid":"10","template":"11"},"425d3bc7-9258-4006-8644-d66cc4a5287c",{"uuid":"12","string":"13","number":123,"boolean":true,"tmp":"14","array":"15"},"679e084c-a2b4-4181-adad-6edd20d9a542","<div>Hello ThingTime World!</div>","2e7f38a3-3839-403d-9b71-607e1ae0eba8","Hello World!","some Value",{"type":"16","js":"17","uuid":"18"},"Array",[1,2,3],{"type":"19","js":"19"},"undefined"]'

		let caughtError

		try {
			smarts.load(string)
		} catch (err) {
			caughtError = err
		}

		expect(caughtError).to.equal(undefined)
		
	})
})
