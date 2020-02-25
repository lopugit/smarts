"use strict";

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

var json = {
  function1: function function1() {
    foo = (_readOnlyError("foo"), 5);
  }
};
var foo = "foo";
var string = smarts.stringify(json);
var parsed = smarts.parse(string);