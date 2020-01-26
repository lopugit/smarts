let smarts = require(__dirname+'/../src/index.js')()

let a = {}

let b = { a }

a.b = b

smarts.deepForEach(a, ()=>{})

debug = 1