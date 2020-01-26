
let $scope = {
}
Object.defineProperty($scope, 'uuid', {
	value: require('uuid/v4')(),
	enumerable: true
})

if(!globalThis.$scopes) globalThis.$scopes = []
globalThis.$scopes.push($scope)

let a1 = 'a2'
Object.defineProperty($scope, "a1", {
	get(){
		return a1
	},
	set(val){
		a1 = val
	},
	enumerable: true
})

var a3 = 'a4'
Object.defineProperty($scope, "a3", {
	get(){
		return a3
	},
	set(val){
		a3 = val
	},
	enumerable: true
})

const a5 = 'a6'
Object.defineProperty($scope, "a5", {
	get(){
		return a5
	},
	set(val){
		a5 = val
	},
	enumerable: true
})

function b1(c1){
	return a1
}

Object.defineProperty($scope, "b1", {
	get(){
		return b1
	},
	set(val){
		b1 = val
	},
	enumerable: true
})

Object.defineProperty(b1, '$scopes', {
	enumerable: true,
	value: [$scope, globalThis]
})

var d1 = (e1)=>{
	return b1()
}

Object.defineProperty($scope, "d1", {
	get(){
		return d1
	},
	set(val){
		d1 = val
	},
	enumerable: true
})

Object.defineProperty(d1, '$scopes', {
	enumerable: true,
	value: [$scope, globalThis]
})

var f1 = {
	g1(){
		return d1()
	}
}

Object.defineProperty(f1, '$scopes', {
	enumerable: true,
	value: [$scope, globalThis]
})

Object.defineProperty(f1.g1, '$scopes', {
	enumerable: true,
	value: [f1, $scope, globalThis]
})

console.log($scope)
console.log($scope.a1)
console.log($scope.a3)
console.log($scope.b1)
console.log($scope.d1)

console.log(a1)
console.log(a3)
console.log(b1)
console.log(d1)

debug = 1

module.exports = {
	a1,a3,a5,b1,d1,f1
}