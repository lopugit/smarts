let smarts = require(global.smartsPath || '../../../src/index.js')()
let expect = require('chai').expect
let mlog = require('mocha-logger');
let test = it
let fs = require('fs')

describe("Function smarts.stringify2 tests", ()=>{

	test("should stringify2 properties with value of undefined", ()=>{

		let test = {}

		let foo = {
			bar: 'fiz'
		}

		let obj = {
			foo
		}
		let stringified = smarts.stringify2(obj)
		let expected = `
			let foo = {
				bar: 'fiz'
			}

			let obj = {
				foo
			}
		`
		let expectedStringified = smarts.getBabel().babylon.parse(expected)
		fs.writeFileSync("test/tests/functions/stringify2.target.json", JSON.stringify(expectedStringified, null, 2))
		fs.writeFileSync("test/tests/functions/stringify2.target.regenerated.js", smarts.getBabel().generator(expectedStringified).code)
		fs.writeFileSync("test/tests/functions/stringify2.actual.json", JSON.stringify(stringified, null, 2))
		fs.writeFileSync("test/tests/functions/stringify2.actual.regenerated.js", smarts.getBabel().generator(stringified).code)
		expect(stringified).to.equal(expected)
	})

	// test("should stringify2 properties with value of undefined", ()=>{

	// 	let test = {}

	// 	let foo = {
	// 		bar: 'fiz'
	// 	}

	// 	let obj = {
	// 		foo,
	// 		baz: {
	// 			waz: 'haz',
	// 			foo
	// 		}
	// 	}
	// 	let stringified = smarts.stringify2(obj)
	// 	let expected = `
	// 		let foo = {
	// 			bar: 'fiz'
	// 		}

	// 		let obj = {
	// 			foo,
	// 			baz: {
	// 				waz: 'haz',
	// 				foo
	// 			}
	// 		}
	// 	`
	// 	fs.writeFileSync("test/tests/functions/stringify2.target.json", JSON.stringify(smarts.getBabel().template.ast(expected), null, 2))
	// 	fs.writeFileSync("test/tests/functions/stringify2.actual.json", JSON.stringify(stringified, null, 2))
	// 	fs.writeFileSync("test/tests/functions/stringify2.regenerated.json", smarts.getBabel().generator(stringified).code)
	// 	expect(stringified).to.equal(expected)
	// })

})
