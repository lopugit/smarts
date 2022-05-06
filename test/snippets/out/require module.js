let uuid41fe057c06344722b6f2806c98db6f42 = {
  $$uuid: 'uuid41fe057c06344722b6f2806c98db6f42',
  $closure: {},
  $variableMap: {},
  $functionScoper: func => {
    Object.defineProperty(func, '$scopes', {
      value: function (arr) {
        for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
          arr2[i] = arr[i];
        }

        return arr2;
      }(typeof uuid41fe057c06344722b6f2806c98db6f42 != 'undefined' ? uuid41fe057c06344722b6f2806c98db6f42.$scopes : []),
      enumerable: true
    });
    Object.defineProperty(func, '$context', {
      value: uuid41fe057c06344722b6f2806c98db6f42
    });
    return func;
  },
  $add: (type, name, value) => {
    uuid41fe057c06344722b6f2806c98db6f42.$closure[name] = value;
    uuid41fe057c06344722b6f2806c98db6f42.$variableMap[name] = type;
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
  $mode: (eval("var uuid41fe057c06344722b6f2806c98db6f421 = null"), typeof uuid41fe057c06344722b6f2806c98db6f421 === "undefined") ? "strict" : "non-strict"
};
Object.defineProperty(uuid41fe057c06344722b6f2806c98db6f42.$closure, ["uuid41fe057c06344722b6f2806c98db6f42"], {
  get: function get() {
    return uuid41fe057c06344722b6f2806c98db6f42;
  },
  set: function set(val) {
    uuid41fe057c06344722b6f2806c98db6f42 = val;
  },
  enumerable: true
}) && (uuid41fe057c06344722b6f2806c98db6f42.$variableMap["uuid41fe057c06344722b6f2806c98db6f42"] = "let");
uuid41fe057c06344722b6f2806c98db6f42.$functionScoper = uuid41fe057c06344722b6f2806c98db6f42.$functionScoper(uuid41fe057c06344722b6f2806c98db6f42.$functionScoper);
uuid41fe057c06344722b6f2806c98db6f42.$scopes.splice(0, 0, uuid41fe057c06344722b6f2806c98db6f42.$closure);
uuid41fe057c06344722b6f2806c98db6f42.$variableMaps.splice(0, 0, uuid41fe057c06344722b6f2806c98db6f42.$variableMap);
var globalThis = globalThis || global || window || {};
uuid41fe057c06344722b6f2806c98db6f42.$contextStatus = uuid41fe057c06344722b6f2806c98db6f42.$mode == 'strict' ? '' : 'var';

try {
  eval(`${uuid41fe057c06344722b6f2806c98db6f42.$contextStatus} $context = $context || uuid41fe057c06344722b6f2806c98db6f42`);
} catch (err) {
  uuid41fe057c06344722b6f2806c98db6f42.$contextStatus = '';
}

eval(`${uuid41fe057c06344722b6f2806c98db6f42.$contextStatus} $context = $context || uuid41fe057c06344722b6f2806c98db6f42`);

if (typeof $context == 'object' && $context != uuid41fe057c06344722b6f2806c98db6f42 && $context.$contexts instanceof Object) {
  $context.$contexts[uuid41fe057c06344722b6f2806c98db6f42.$$uuid] = $context.$contexts[uuid41fe057c06344722b6f2806c98db6f42.$$uuid] || [];
  uuid41fe057c06344722b6f2806c98db6f42.$$instance = $context.$contexts[uuid41fe057c06344722b6f2806c98db6f42.$$uuid].push(uuid41fe057c06344722b6f2806c98db6f42) - 1;
  uuid41fe057c06344722b6f2806c98db6f42.$parentContexts.push($context);
  $context.$contextsList.push(uuid41fe057c06344722b6f2806c98db6f42);
}

if (!globalThis.$contexts) {
  globalThis.$contexts = {};
  globalThis.$contexts[uuid41fe057c06344722b6f2806c98db6f42.$$uuid] = [uuid41fe057c06344722b6f2806c98db6f42];
  globalThis.$contextsList = [uuid41fe057c06344722b6f2806c98db6f42];
  uuid41fe057c06344722b6f2806c98db6f42.$$instance = 0;
} else if (globalThis.uuid41fe057c06344722b6f2806c98db6f42s instanceof Object && uuid41fe057c06344722b6f2806c98db6f42.$parentContexts.length == 0 && typeof uuid41fe057c06344722b6f2806c98db6f42.$$instance == 'undefined') {
  globalThis.uuid41fe057c06344722b6f2806c98db6f42s[uuid41fe057c06344722b6f2806c98db6f42.$$uuid] = globalThis.$contexts[uuid41fe057c06344722b6f2806c98db6f42.$$uuid] || [];
  uuid41fe057c06344722b6f2806c98db6f42.$$instance = globalThis.$contexts[uuid41fe057c06344722b6f2806c98db6f42.$$uuid].push(uuid41fe057c06344722b6f2806c98db6f42) - 1;
  globalThis.$contextsList.push(uuid41fe057c06344722b6f2806c98db6f42);
}

{
  let $context = uuid41fe057c06344722b6f2806c98db6f42;
  Object.defineProperty(uuid41fe057c06344722b6f2806c98db6f42.$closure, ["$context"], {
    get: function get() {
      return $context;
    },
    set: function set(val) {
      $context = val;
    },
    enumerable: true
  }) && (uuid41fe057c06344722b6f2806c98db6f42.$variableMap["$context"] = "let");

  let bar = require('../resources/required module.js');

  Object.defineProperty(uuid41fe057c06344722b6f2806c98db6f42.$closure, ["bar"], {
    get: function get() {
      return bar;
    },
    set: function set(val) {
      bar = val;
    },
    enumerable: true
  }) && (uuid41fe057c06344722b6f2806c98db6f42.$variableMap["bar"] = "let");
}