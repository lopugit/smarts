let smarts = require('../src/index.js')()

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