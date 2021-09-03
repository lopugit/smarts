;(function () {
	let bar2 = "far"
	let faz = {
		bar: bar2,
	}
	let bar = {
		faz,
	}
	let obj = {
		faz,
		bar,
		obj,
		test: obj,
	}
	return obj
})()
