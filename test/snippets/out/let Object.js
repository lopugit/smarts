"use strict";

let uuidcae2bcdeb3c149e5899abd900b1ece9f = {
  $$uuid: 'uuidcae2bcdeb3c149e5899abd900b1ece9f',
  $closure: {},
  $variableMap: {},
  $functionScoper: func => {
    Object.defineProperty(func, '$scopes', {
      value: function (arr) {
        for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
          arr2[i] = arr[i];
        }

        return arr2;
      }(typeof uuidcae2bcdeb3c149e5899abd900b1ece9f != 'undefined' ? uuidcae2bcdeb3c149e5899abd900b1ece9f.$scopes : []),
      enumerable: true
    });
    Object.defineProperty(func, '$context', {
      value: uuidcae2bcdeb3c149e5899abd900b1ece9f
    });
    return func;
  },
  $add: (type, name, value) => {
    uuidcae2bcdeb3c149e5899abd900b1ece9f.$closure[name] = value;
    uuidcae2bcdeb3c149e5899abd900b1ece9f.$variableMap[name] = type;
  },
  $scopes: function (arr) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }(typeof $context != 'undefined' ? $context.$scopes : []),
  $variableMaps: function (arr) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }(typeof $context != 'undefined' ? $context.$variableMaps : []),
  $contexts: {},
  $contextsList: [],
  $parentContexts: []
};
Object.defineProperty(uuidcae2bcdeb3c149e5899abd900b1ece9f.$closure, ["uuidcae2bcdeb3c149e5899abd900b1ece9f"], {
  get: function get() {
    return uuidcae2bcdeb3c149e5899abd900b1ece9f;
  },
  set: function set(val) {
    uuidcae2bcdeb3c149e5899abd900b1ece9f = val;
  },
  enumerable: true
}) && (uuidcae2bcdeb3c149e5899abd900b1ece9f.$variableMap["uuidcae2bcdeb3c149e5899abd900b1ece9f"] = "let");
uuidcae2bcdeb3c149e5899abd900b1ece9f.$functionScoper = uuidcae2bcdeb3c149e5899abd900b1ece9f.$functionScoper(uuidcae2bcdeb3c149e5899abd900b1ece9f.$functionScoper);
uuidcae2bcdeb3c149e5899abd900b1ece9f.$scopes.splice(0, 0, uuidcae2bcdeb3c149e5899abd900b1ece9f.$closure);
uuidcae2bcdeb3c149e5899abd900b1ece9f.$variableMaps.splice(0, 0, uuidcae2bcdeb3c149e5899abd900b1ece9f.$variableMap);

try {
  eval("var $context = $context || uuidcae2bcdeb3c149e5899abd900b1ece9f");
} catch (err) {}

if (typeof $context != 'undefined' && $context != uuidcae2bcdeb3c149e5899abd900b1ece9f && $context.$contexts instanceof Object) {
  $context.$contexts[uuidcae2bcdeb3c149e5899abd900b1ece9f.$$uuid] = $context.$contexts[uuidcae2bcdeb3c149e5899abd900b1ece9f.$$uuid] || [];
  uuidcae2bcdeb3c149e5899abd900b1ece9f.$$instance = $context.$contexts[uuidcae2bcdeb3c149e5899abd900b1ece9f.$$uuid].push(uuidcae2bcdeb3c149e5899abd900b1ece9f) - 1;
  uuidcae2bcdeb3c149e5899abd900b1ece9f.$parentContexts.push($context);
  $context.$contextsList.push(uuidcae2bcdeb3c149e5899abd900b1ece9f);
}

var globalThis = globalThis || global || window || {};

if (!globalThis.$contexts) {
  globalThis.$contexts = {};
  globalThis.$contexts[uuidcae2bcdeb3c149e5899abd900b1ece9f.$$uuid] = [uuidcae2bcdeb3c149e5899abd900b1ece9f];
  globalThis.$contextsList = [uuidcae2bcdeb3c149e5899abd900b1ece9f];
  uuidcae2bcdeb3c149e5899abd900b1ece9f.$$instance = 0;
} else if (globalThis.uuidcae2bcdeb3c149e5899abd900b1ece9fs instanceof Object && uuidcae2bcdeb3c149e5899abd900b1ece9f.$parentContexts.length == 0 && typeof uuidcae2bcdeb3c149e5899abd900b1ece9f.$$instance == 'undefined') {
  globalThis.uuidcae2bcdeb3c149e5899abd900b1ece9fs[uuidcae2bcdeb3c149e5899abd900b1ece9f.$$uuid] = globalThis.$contexts[uuidcae2bcdeb3c149e5899abd900b1ece9f.$$uuid] || [];
  uuidcae2bcdeb3c149e5899abd900b1ece9f.$$instance = globalThis.$contexts[uuidcae2bcdeb3c149e5899abd900b1ece9f.$$uuid].push(uuidcae2bcdeb3c149e5899abd900b1ece9f) - 1;
  globalThis.$contextsList.push(uuidcae2bcdeb3c149e5899abd900b1ece9f);
}

{
  let $context = uuidcae2bcdeb3c149e5899abd900b1ece9f;
  Object.defineProperty(uuidcae2bcdeb3c149e5899abd900b1ece9f.$closure, ["$context"], {
    get: function get() {
      return $context;
    },
    set: function set(val) {
      $context = val;
    },
    enumerable: true
  }) && (uuidcae2bcdeb3c149e5899abd900b1ece9f.$variableMap["$context"] = "let");
  let foo = {};
  Object.defineProperty(uuidcae2bcdeb3c149e5899abd900b1ece9f.$closure, ["foo"], {
    get: function get() {
      return foo;
    },
    set: function set(val) {
      foo = val;
    },
    enumerable: true
  }) && (uuidcae2bcdeb3c149e5899abd900b1ece9f.$variableMap["foo"] = "let");
}