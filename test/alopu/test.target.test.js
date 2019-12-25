
let expect = require('chai').expect

// local test data
let variables = require(__dirname+'/test.target.js')
let smarts = require(__dirname+'/../../src/index.js')()


describe("#de/serialise", ()=>{
	context('stringifying then parsing and executing should restore scopes', ()=>{
		it('should return '+variables.a1, ()=>{
			let string = smarts.stringify(variables.b1)
			let stringSize = KB(string)
			let parsed = smarts.parse(string)
			expect(parsed()).to.equal(variables.a1)
		})
	})
})

function KB(s){
	return ((byteCount(s))/ 1000).toFixed(2) + " KB"
	function byteCount(s) {
			return encodeURI(s).split(/%..|./).length - 1;
	}
}

