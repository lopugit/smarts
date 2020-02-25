"use strict";

var json = {
  function1: function function1() {
    return foo;
  },
  function2: function function2() {
    return foo;
  }
};
var foo = "foo";
var string = smarts.stringify(json);
var parsed = smarts.parse(string);