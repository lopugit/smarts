
let a1 = 'a2'
var a3 = 'a4'
const a5 = 'a6'

function b1(c1){
	return a1
}

let d1 = (e1)=>{
	return b1()
}

let f1 = {
	g1(){
		return d1()
	}
}

debug = 1

module.exports = {
	a1,a3,a5,b1,d1,f1
}