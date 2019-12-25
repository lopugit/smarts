let fs = require('fs')
let parser = require('@babel/parser')

let source = fs.readFileSync(__dirname+'/value.thing', 'utf-8')
let ast = parser.parse(source)

console.log('ast', ast)

debug = 1