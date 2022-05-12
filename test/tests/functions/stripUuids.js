let smarts = require(global.smartsPath || '../../../src/index.js')()
let expect = require('chai').expect
let mlog = require('mocha-logger');
let test = it

describe("Test stripUuids", ()=>{

	test("Uuid's should be stripped", () => {

		const obj = {
			uuid: 'foo',
			func: () => {},
			array: [1,2,3],
			str: 'string',
			obj: {
				func: () => {},
				array: [1,2,3],
				str: 'string',
				uuid: 'bar',
				foo: {
					uuid: 'baz'
				}
			}
		}

		obj.func.uuid = 'foo'
		obj.array.uuid = 'foo'
		obj.str.uuid = 'foo'
		obj.obj.func.uuid = 'foo'
		obj.obj.array.uuid = 'foo'
		obj.obj.str.uuid = 'foo'

		smarts.stripUuids(obj)

		expect(obj.uuid).to.equal(undefined)
		expect(obj.obj.uuid).to.equal(undefined)
		expect(obj.obj.foo.uuid).to.equal(undefined)
		expect(obj.func.uuid).to.equal(undefined)
		expect(obj.array.uuid).to.equal(undefined)
		expect(obj.str.uuid).to.equal(undefined)
		expect(obj.obj.func.uuid).to.equal(undefined)
		expect(obj.obj.array.uuid).to.equal(undefined)
		expect(obj.obj.str.uuid).to.equal(undefined)
		
	})
})
