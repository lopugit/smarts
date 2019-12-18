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

console.log("typeof origObj.j", typeof origObj.j)

console.log(origObj.g == origObj.f)
console.log(origObj.i == origObj.h)


console.log("strict stringification")
let string1 = smarts.stringify(origObj)

console.log("string1", string1)

console.log('strict parsing')
let revivedCode1 = smarts.parse(string1)

console.log("revivedCode1", revivedCode1)

console.log(revivedCode1.g == revivedCode1.f)
console.log(revivedCode1.i == revivedCode1.h)


console.log("not strict stringification")
let string2 = smarts.stringify(origObj, {strictFunctions: false})

console.log("string2", string2)

console.log("strict parsing")
let revivedCode2 = smarts.parse(string2)

console.log("revivedCode2", revivedCode2)

console.log(revivedCode2.g == revivedCode2.f)
console.log(revivedCode2.i == revivedCode2.h)

console.log("not strict parsing")
let revivedCode3 = smarts.parse(string2, {strictFunctions: false})

console.log("revivedCode3", revivedCode3)

console.log(revivedCode3.g == revivedCode3.f)
console.log(revivedCode3.i == revivedCode3.h)

console.log()