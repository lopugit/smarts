let smarts = require('../src/index.js')()

// basic test

let func = {
	func: function(){ console.log('woot woot') }
}

console.log('func ', func)

let sfunc = smarts.stringify(func)

console.log('sfunc ', sfunc)

let pfunc = smarts.parse(sfunc)

console.log('pfunc ', pfunc)

console.log(typeof pfunc.func == 'function')

console.log(typeof pfunc.func == 'function' && pfunc.func())


// Complex Test

// custom test class
class Test1{

	constructor(a1,a2={}){
		
		this.a1 = 'a1 value'
		this.a2 = 'a2 value'
		
		this.a2 = a2
	}


	test1(){
		return 'test1'
	}

	static test2(){
		return this.a2
	}

	static get a1(){
		return this.a1
	}

}

function Test2(b1, b2={}){

	this.b2 = b2

}

Test2.prototype.b1 = 'b1 value'
Test2.prototype.b2 = 'b2 value'

Test2.prototype.test2 = function test2(){ return 'test2' }

let testString = `[1, "2", { "3": 4} ]`
let testObj = JSON.parse(testString)

let origObj = {
	b: function(b1,b2,b3={}){},
	c(c1,c2,c3={}){},
	d: function e(e1,e2,e3={}){},
	f: (f1,f2,f3={})=>{},
	h: {
		test: 'test'
	},

}

origObj.g = origObj.f
origObj.i = origObj.h

origObj.j = new Test1(null, "a2 new value")
origObj.k = new Test2(null, "b2 new value")

console.log("origObj", origObj)


console.log(origObj.g == origObj.f)
console.log(origObj.i == origObj.h)

let string = smarts.stringify(origObj)

console.log("string", string)

let revivedCode = smarts.parse(string)

console.log("revivedCode", revivedCode)

console.log(revivedCode.g == revivedCode.f)
console.log(revivedCode.i == revivedCode.h)

console.log()