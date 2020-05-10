"use strict"

eval(` eval(\` var $test = $test || {} \`) `)

console.log($test)
