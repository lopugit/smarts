let Mocha = require('mocha'),
	fs = require('fs'),
	path = require('path')

var walk = function(dir) {
  var results = [];
  list = fs.readdirSync(dir) 
	var pending = list.length;
	if (!pending) return;
	list.forEach(function(file) {
		file = path.resolve(dir, file);
		let stat = fs.statSync(file)
		if (stat && stat.isDirectory()) {
			let res = walk(file)
			results = results.concat(res);
		} else {
			results.push(file);
		}
	});
	return results
};

let files = walk(__dirname+'/')

let smarts = require(__dirname+'/../../src/index.js')()
let smartsCode = fs.readFileSync(__dirname+'/../../src/index.js')
let parsedSmartsCode = smarts.transform(smartsCode)
fs.writeFileSync(__dirname+'/../snippets/out/parsedSmartsCode.js', parsedSmartsCode.code)
// global.smartsPath = __dirname+'/../snippets/out/parsedSmartsCode.js'
function runMochaTests() {
	return new Promise((res,rej)=>{
    Object.keys( require.cache ).forEach( function( file ) {
        delete require.cache[ file ];
    } );

    let mocha = new Mocha(
			{
				ui: 'bdd',
				reporter: 'list',
			}
		);
		mocha.useColors(true)

		files.forEach((file)=>{
			if(file.indexOf('meta-tester') < 0){
				mocha.addFile(
					file
				)
			}
		})
		try {
			console.log("Running mocha")
			mocha.run(()=>{
				res()
			});
		} catch(err){
			console.error(err)
			res()
		}
	})
		
}
(async function(){
	await runMochaTests()
	// global.smartsPath = __dirname+'/../snippets/out/parsedSmartsCode.js'
	// await runMochaTests()
})()