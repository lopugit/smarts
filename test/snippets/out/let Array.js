"use strict";

let uuid51abde43f5724bb888c48e33ed2c58b2 = {
  $$uuid: 'uuid51abde43f5724bb888c48e33ed2c58b2',
  $closure: {},
  $variableMap: {},
  $functionScoper: func => {
    Object.defineProperty(func, '$scopes', {
      value: function (arr) {
        for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
          arr2[i] = arr[i];
        }

        return arr2;
      }(typeof uuid51abde43f5724bb888c48e33ed2c58b2 != 'undefined' ? uuid51abde43f5724bb888c48e33ed2c58b2.$scopes : []),
      enumerable: true
    });
    Object.defineProperty(func, '$context', {
      value: uuid51abde43f5724bb888c48e33ed2c58b2
    });
    return func;
  },
  $add: (type, name, value) => {
    uuid51abde43f5724bb888c48e33ed2c58b2.$closure[name] = value;
    uuid51abde43f5724bb888c48e33ed2c58b2.$variableMap[name] = type;
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
Object.defineProperty(uuid51abde43f5724bb888c48e33ed2c58b2.$closure, ["uuid51abde43f5724bb888c48e33ed2c58b2"], {
  get: function get() {
    return uuid51abde43f5724bb888c48e33ed2c58b2;
  },
  set: function set(val) {
    uuid51abde43f5724bb888c48e33ed2c58b2 = val;
  },
  enumerable: true
}) && (uuid51abde43f5724bb888c48e33ed2c58b2.$variableMap["uuid51abde43f5724bb888c48e33ed2c58b2"] = "let");
uuid51abde43f5724bb888c48e33ed2c58b2.$functionScoper = uuid51abde43f5724bb888c48e33ed2c58b2.$functionScoper(uuid51abde43f5724bb888c48e33ed2c58b2.$functionScoper);
uuid51abde43f5724bb888c48e33ed2c58b2.$scopes.splice(0, 0, uuid51abde43f5724bb888c48e33ed2c58b2.$closure);
uuid51abde43f5724bb888c48e33ed2c58b2.$variableMaps.splice(0, 0, uuid51abde43f5724bb888c48e33ed2c58b2.$variableMap);

try {
  eval("var $context = $context || uuid51abde43f5724bb888c48e33ed2c58b2");
} catch (err) {}

if (typeof $context != 'undefined' && $context != uuid51abde43f5724bb888c48e33ed2c58b2 && $context.$contexts instanceof Object) {
  $context.$contexts[uuid51abde43f5724bb888c48e33ed2c58b2.$$uuid] = $context.$contexts[uuid51abde43f5724bb888c48e33ed2c58b2.$$uuid] || [];
  uuid51abde43f5724bb888c48e33ed2c58b2.$$instance = $context.$contexts[uuid51abde43f5724bb888c48e33ed2c58b2.$$uuid].push(uuid51abde43f5724bb888c48e33ed2c58b2) - 1;
  uuid51abde43f5724bb888c48e33ed2c58b2.$parentContexts.push($context);
  $context.$contextsList.push(uuid51abde43f5724bb888c48e33ed2c58b2);
}

var globalThis = globalThis || global || window || {};

if (!globalThis.$contexts) {
  globalThis.$contexts = {};
  globalThis.$contexts[uuid51abde43f5724bb888c48e33ed2c58b2.$$uuid] = [uuid51abde43f5724bb888c48e33ed2c58b2];
  globalThis.$contextsList = [uuid51abde43f5724bb888c48e33ed2c58b2];
  uuid51abde43f5724bb888c48e33ed2c58b2.$$instance = 0;
} else if (globalThis.uuid51abde43f5724bb888c48e33ed2c58b2s instanceof Object && uuid51abde43f5724bb888c48e33ed2c58b2.$parentContexts.length == 0 && typeof uuid51abde43f5724bb888c48e33ed2c58b2.$$instance == 'undefined') {
  globalThis.uuid51abde43f5724bb888c48e33ed2c58b2s[uuid51abde43f5724bb888c48e33ed2c58b2.$$uuid] = globalThis.$contexts[uuid51abde43f5724bb888c48e33ed2c58b2.$$uuid] || [];
  uuid51abde43f5724bb888c48e33ed2c58b2.$$instance = globalThis.$contexts[uuid51abde43f5724bb888c48e33ed2c58b2.$$uuid].push(uuid51abde43f5724bb888c48e33ed2c58b2) - 1;
  globalThis.$contextsList.push(uuid51abde43f5724bb888c48e33ed2c58b2);
}

{
  let $context = uuid51abde43f5724bb888c48e33ed2c58b2;
  Object.defineProperty(uuid51abde43f5724bb888c48e33ed2c58b2.$closure, ["$context"], {
    get: function get() {
      return $context;
    },
    set: function set(val) {
      $context = val;
    },
    enumerable: true
  }) && (uuid51abde43f5724bb888c48e33ed2c58b2.$variableMap["$context"] = "let");
  let foo = [];
  Object.defineProperty(uuid51abde43f5724bb888c48e33ed2c58b2.$closure, ["foo"], {
    get: function get() {
      return foo;
    },
    set: function set(val) {
      foo = val;
    },
    enumerable: true
  }) && (uuid51abde43f5724bb888c48e33ed2c58b2.$variableMap["foo"] = "let");
}