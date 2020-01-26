
let expect = require('chai').expect
let mlog = require('mocha-logger');

// local test data
let variables = require(__dirname+'/test.target.js')
let smarts = require(__dirname+'/../../src/index.js')()

describe("Save/Load tests", ()=>{
	let string
	describe("Serialise test", ()=>{
		context('Stringifying function should create special object with $scopes', ()=>{
			it(`typeof string should be 'string'`, (done)=>{
				string = smarts.stringify(variables.b1)
				let stringSize = KB(string)
				expect(typeof string).to.equal('string')
				mlog.log("string is: "+string)			
				done()
			})
			// it(`smarts.`)
			// after(()=>{)
		})
	})
	describe("Parse test", ()=>{
		context('parsing and executing should restore scopes', ()=>{
			it('should return '+variables.a1, ()=>{
				let parsed = smarts.parse(string)
				expect(parsed()).to.equal(variables.a1)
			})
		})
	})
})
function KB(s){
	return ((byteCount(s))/ 1000).toFixed(2) + " KB"
	function byteCount(s) {
			return encodeURI(s).split(/%..|./).length - 1;
	}
}
