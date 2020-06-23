let uuidd07b32f8d3424808b187b189706c169d = {
  $$uuid: 'uuidd07b32f8d3424808b187b189706c169d',
  $closure: {},
  $variableMap: {},
  $functionScoper: func => {
    Object.defineProperty(func, '$scopes', {
      value: function (arr) {
        for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
          arr2[i] = arr[i];
        }

        return arr2;
      }(typeof uuidd07b32f8d3424808b187b189706c169d != 'undefined' ? uuidd07b32f8d3424808b187b189706c169d.$scopes : []),
      enumerable: true
    });
    Object.defineProperty(func, '$context', {
      value: uuidd07b32f8d3424808b187b189706c169d
    });
    return func;
  },
  $add: (type, name, value) => {
    uuidd07b32f8d3424808b187b189706c169d.$closure[name] = value;
    uuidd07b32f8d3424808b187b189706c169d.$variableMap[name] = type;
  },
  $scopes: function (arr) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }(typeof $context == 'object' ? $context.$scopes : []),
  $variableMaps: function (arr) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }(typeof $context == 'object' ? $context.$variableMaps : []),
  $contexts: {},
  $contextsList: [],
  $parentContexts: [],
  $contextStatus: "var",
  $mode: (eval("var uuidd07b32f8d3424808b187b189706c169d1 = null"), typeof uuidd07b32f8d3424808b187b189706c169d1 === "undefined") ? "strict" : "non-strict"
};
Object.defineProperty(uuidd07b32f8d3424808b187b189706c169d.$closure, ["uuidd07b32f8d3424808b187b189706c169d"], {
  get: function get() {
    return uuidd07b32f8d3424808b187b189706c169d;
  },
  set: function set(val) {
    uuidd07b32f8d3424808b187b189706c169d = val;
  },
  enumerable: true
}) && (uuidd07b32f8d3424808b187b189706c169d.$variableMap["uuidd07b32f8d3424808b187b189706c169d"] = "let");
uuidd07b32f8d3424808b187b189706c169d.$functionScoper = uuidd07b32f8d3424808b187b189706c169d.$functionScoper(uuidd07b32f8d3424808b187b189706c169d.$functionScoper);
uuidd07b32f8d3424808b187b189706c169d.$scopes.splice(0, 0, uuidd07b32f8d3424808b187b189706c169d.$closure);
uuidd07b32f8d3424808b187b189706c169d.$variableMaps.splice(0, 0, uuidd07b32f8d3424808b187b189706c169d.$variableMap);
var globalThis = globalThis || global || window || {};
uuidd07b32f8d3424808b187b189706c169d.$contextStatus = uuidd07b32f8d3424808b187b189706c169d.$mode == 'strict' ? '' : 'var';

try {
  eval("".concat(uuidd07b32f8d3424808b187b189706c169d.$contextStatus, " $context = $context || uuidd07b32f8d3424808b187b189706c169d"));
} catch (err) {
  uuidd07b32f8d3424808b187b189706c169d.$contextStatus = '';
}

eval("".concat(uuidd07b32f8d3424808b187b189706c169d.$contextStatus, " $context = $context || uuidd07b32f8d3424808b187b189706c169d"));

if (typeof $context == 'object' && $context != uuidd07b32f8d3424808b187b189706c169d && $context.$contexts instanceof Object) {
  $context.$contexts[uuidd07b32f8d3424808b187b189706c169d.$$uuid] = $context.$contexts[uuidd07b32f8d3424808b187b189706c169d.$$uuid] || [];
  uuidd07b32f8d3424808b187b189706c169d.$$instance = $context.$contexts[uuidd07b32f8d3424808b187b189706c169d.$$uuid].push(uuidd07b32f8d3424808b187b189706c169d) - 1;
  uuidd07b32f8d3424808b187b189706c169d.$parentContexts.push($context);
  $context.$contextsList.push(uuidd07b32f8d3424808b187b189706c169d);
}

if (!globalThis.$contexts) {
  globalThis.$contexts = {};
  globalThis.$contexts[uuidd07b32f8d3424808b187b189706c169d.$$uuid] = [uuidd07b32f8d3424808b187b189706c169d];
  globalThis.$contextsList = [uuidd07b32f8d3424808b187b189706c169d];
  uuidd07b32f8d3424808b187b189706c169d.$$instance = 0;
} else if (globalThis.uuidd07b32f8d3424808b187b189706c169ds instanceof Object && uuidd07b32f8d3424808b187b189706c169d.$parentContexts.length == 0 && typeof uuidd07b32f8d3424808b187b189706c169d.$$instance == 'undefined') {
  globalThis.uuidd07b32f8d3424808b187b189706c169ds[uuidd07b32f8d3424808b187b189706c169d.$$uuid] = globalThis.$contexts[uuidd07b32f8d3424808b187b189706c169d.$$uuid] || [];
  uuidd07b32f8d3424808b187b189706c169d.$$instance = globalThis.$contexts[uuidd07b32f8d3424808b187b189706c169d.$$uuid].push(uuidd07b32f8d3424808b187b189706c169d) - 1;
  globalThis.$contextsList.push(uuidd07b32f8d3424808b187b189706c169d);
}

{
  let $context = uuidd07b32f8d3424808b187b189706c169d;
  Object.defineProperty(uuidd07b32f8d3424808b187b189706c169d.$closure, ["$context"], {
    get: function get() {
      return $context;
    },
    set: function set(val) {
      $context = val;
    },
    enumerable: true
  }) && (uuidd07b32f8d3424808b187b189706c169d.$variableMap["$context"] = "let");

  let bar = require('../resources/required module.js');

  Object.defineProperty(uuidd07b32f8d3424808b187b189706c169d.$closure, ["bar"], {
    get: function get() {
      return bar;
    },
    set: function set(val) {
      bar = val;
    },
    enumerable: true
  }) && (uuidd07b32f8d3424808b187b189706c169d.$variableMap["bar"] = "let");
}