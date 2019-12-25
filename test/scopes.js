let testObj = {
	func1: function func2(){ return this.a.b.c }
}

try {
	testObj.func1()
} catch(err){ console.error(err) }

let testString = testObj.func1.toString()

func3 = eval(`( ${testString} )`)
testObj.func3 = func3
testObj.func4 = eval(`( ${testString} )`)

try {
	testObj.func3()
} catch(err){ console.error(err) }

try {
	testObj.func4()
} catch(err){ console.error(err) }

debug=1