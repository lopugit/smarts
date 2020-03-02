"use strict";

let uuid0cfa731fe55242d389177f223156ac0d = {
  $$uuid: 'uuid0cfa731fe55242d389177f223156ac0d',
  $closure: {},
  $variableMap: {},
  $functionScoper: func => {
    Object.defineProperty(func, '$scopes', {
      value: function (arr) {
        for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
          arr2[i] = arr[i];
        }

        return arr2;
      }(typeof uuid0cfa731fe55242d389177f223156ac0d != 'undefined' ? uuid0cfa731fe55242d389177f223156ac0d.$scopes : []),
      enumerable: true
    });
    Object.defineProperty(func, '$context', {
      value: uuid0cfa731fe55242d389177f223156ac0d
    });
    return func;
  },
  $add: (type, name, value) => {
    uuid0cfa731fe55242d389177f223156ac0d.$closure[name] = value;
    uuid0cfa731fe55242d389177f223156ac0d.$variableMap[name] = type;
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
Object.defineProperty(uuid0cfa731fe55242d389177f223156ac0d.$closure, ["uuid0cfa731fe55242d389177f223156ac0d"], {
  get: function get() {
    return uuid0cfa731fe55242d389177f223156ac0d;
  },
  set: function set(val) {
    uuid0cfa731fe55242d389177f223156ac0d = val;
  },
  enumerable: true
}) && (uuid0cfa731fe55242d389177f223156ac0d.$variableMap["uuid0cfa731fe55242d389177f223156ac0d"] = "let");
uuid0cfa731fe55242d389177f223156ac0d.$functionScoper = uuid0cfa731fe55242d389177f223156ac0d.$functionScoper(uuid0cfa731fe55242d389177f223156ac0d.$functionScoper);
uuid0cfa731fe55242d389177f223156ac0d.$scopes.splice(0, 0, uuid0cfa731fe55242d389177f223156ac0d.$closure);
uuid0cfa731fe55242d389177f223156ac0d.$variableMaps.splice(0, 0, uuid0cfa731fe55242d389177f223156ac0d.$variableMap);

try {
  eval("var $context = $context || uuid0cfa731fe55242d389177f223156ac0d");
} catch (err) {}

if (typeof $context != 'undefined' && $context != uuid0cfa731fe55242d389177f223156ac0d && $context.$contexts instanceof Object) {
  $context.$contexts[uuid0cfa731fe55242d389177f223156ac0d.$$uuid] = $context.$contexts[uuid0cfa731fe55242d389177f223156ac0d.$$uuid] || [];
  uuid0cfa731fe55242d389177f223156ac0d.$$instance = $context.$contexts[uuid0cfa731fe55242d389177f223156ac0d.$$uuid].push(uuid0cfa731fe55242d389177f223156ac0d) - 1;
  uuid0cfa731fe55242d389177f223156ac0d.$parentContexts.push($context);
  $context.$contextsList.push(uuid0cfa731fe55242d389177f223156ac0d);
}

var globalThis = globalThis || global || window || {};

if (!globalThis.$contexts) {
  globalThis.$contexts = {};
  globalThis.$contexts[uuid0cfa731fe55242d389177f223156ac0d.$$uuid] = [uuid0cfa731fe55242d389177f223156ac0d];
  globalThis.$contextsList = [uuid0cfa731fe55242d389177f223156ac0d];
  uuid0cfa731fe55242d389177f223156ac0d.$$instance = 0;
} else if (globalThis.uuid0cfa731fe55242d389177f223156ac0ds instanceof Object && uuid0cfa731fe55242d389177f223156ac0d.$parentContexts.length == 0 && typeof uuid0cfa731fe55242d389177f223156ac0d.$$instance == 'undefined') {
  globalThis.uuid0cfa731fe55242d389177f223156ac0ds[uuid0cfa731fe55242d389177f223156ac0d.$$uuid] = globalThis.$contexts[uuid0cfa731fe55242d389177f223156ac0d.$$uuid] || [];
  uuid0cfa731fe55242d389177f223156ac0d.$$instance = globalThis.$contexts[uuid0cfa731fe55242d389177f223156ac0d.$$uuid].push(uuid0cfa731fe55242d389177f223156ac0d) - 1;
  globalThis.$contextsList.push(uuid0cfa731fe55242d389177f223156ac0d);
}

{
  let $context = uuid0cfa731fe55242d389177f223156ac0d;
  Object.defineProperty(uuid0cfa731fe55242d389177f223156ac0d.$closure, ["$context"], {
    get: function get() {
      return $context;
    },
    set: function set(val) {
      $context = val;
    },
    enumerable: true
  }) && (uuid0cfa731fe55242d389177f223156ac0d.$variableMap["$context"] = "let");

  let bar = require('../resources/required module.js');

  Object.defineProperty(uuid0cfa731fe55242d389177f223156ac0d.$closure, ["bar"], {
    get: function get() {
      return bar;
    },
    set: function set(val) {
      bar = val;
    },
    enumerable: true
  }) && (uuid0cfa731fe55242d389177f223156ac0d.$variableMap["bar"] = "let");
}