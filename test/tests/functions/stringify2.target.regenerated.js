let baz = "fiz"
let foo = {
  baz,
}
let bar = {
  foo,
}
let obj = {
  foo,
  bar,
}
obj.test = obj
module.exports = obj