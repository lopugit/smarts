let uuid0248ee522cfa48c8b84908cbeacda3db = {
  $$uuid: 'uuid0248ee522cfa48c8b84908cbeacda3db',
  $closure: {},
  $variableMap: {},
  $functionScoper: func => {
    Object.defineProperty(func, '$scopes', {
      value: function (arr) {
        for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
          arr2[i] = arr[i];
        }

        return arr2;
      }(typeof uuid0248ee522cfa48c8b84908cbeacda3db != 'undefined' ? uuid0248ee522cfa48c8b84908cbeacda3db.$scopes : []),
      enumerable: true
    });
    Object.defineProperty(func, '$context', {
      value: uuid0248ee522cfa48c8b84908cbeacda3db
    });
    return func;
  },
  $add: (type, name, value) => {
    uuid0248ee522cfa48c8b84908cbeacda3db.$closure[name] = value;
    uuid0248ee522cfa48c8b84908cbeacda3db.$variableMap[name] = type;
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
  $mode: (eval("var uuid0248ee522cfa48c8b84908cbeacda3db1 = null"), typeof uuid0248ee522cfa48c8b84908cbeacda3db1 === "undefined") ? "strict" : "non-strict"
};
Object.defineProperty(uuid0248ee522cfa48c8b84908cbeacda3db.$closure, ["uuid0248ee522cfa48c8b84908cbeacda3db"], {
  get: function get() {
    return uuid0248ee522cfa48c8b84908cbeacda3db;
  },
  set: function set(val) {
    uuid0248ee522cfa48c8b84908cbeacda3db = val;
  },
  enumerable: true
}) && (uuid0248ee522cfa48c8b84908cbeacda3db.$variableMap["uuid0248ee522cfa48c8b84908cbeacda3db"] = "let");
uuid0248ee522cfa48c8b84908cbeacda3db.$functionScoper = uuid0248ee522cfa48c8b84908cbeacda3db.$functionScoper(uuid0248ee522cfa48c8b84908cbeacda3db.$functionScoper);
uuid0248ee522cfa48c8b84908cbeacda3db.$scopes.splice(0, 0, uuid0248ee522cfa48c8b84908cbeacda3db.$closure);
uuid0248ee522cfa48c8b84908cbeacda3db.$variableMaps.splice(0, 0, uuid0248ee522cfa48c8b84908cbeacda3db.$variableMap);
var globalThis = globalThis || global || window || {};
uuid0248ee522cfa48c8b84908cbeacda3db.$contextStatus = uuid0248ee522cfa48c8b84908cbeacda3db.$mode == 'strict' ? '' : 'var';

try {
  eval("".concat(uuid0248ee522cfa48c8b84908cbeacda3db.$contextStatus, " $context = $context || uuid0248ee522cfa48c8b84908cbeacda3db"));
} catch (err) {
  uuid0248ee522cfa48c8b84908cbeacda3db.$contextStatus = '';
}

eval("".concat(uuid0248ee522cfa48c8b84908cbeacda3db.$contextStatus, " $context = $context || uuid0248ee522cfa48c8b84908cbeacda3db"));

if (typeof $context == 'object' && $context != uuid0248ee522cfa48c8b84908cbeacda3db && $context.$contexts instanceof Object) {
  $context.$contexts[uuid0248ee522cfa48c8b84908cbeacda3db.$$uuid] = $context.$contexts[uuid0248ee522cfa48c8b84908cbeacda3db.$$uuid] || [];
  uuid0248ee522cfa48c8b84908cbeacda3db.$$instance = $context.$contexts[uuid0248ee522cfa48c8b84908cbeacda3db.$$uuid].push(uuid0248ee522cfa48c8b84908cbeacda3db) - 1;
  uuid0248ee522cfa48c8b84908cbeacda3db.$parentContexts.push($context);
  $context.$contextsList.push(uuid0248ee522cfa48c8b84908cbeacda3db);
}

if (!globalThis.$contexts) {
  globalThis.$contexts = {};
  globalThis.$contexts[uuid0248ee522cfa48c8b84908cbeacda3db.$$uuid] = [uuid0248ee522cfa48c8b84908cbeacda3db];
  globalThis.$contextsList = [uuid0248ee522cfa48c8b84908cbeacda3db];
  uuid0248ee522cfa48c8b84908cbeacda3db.$$instance = 0;
} else if (globalThis.uuid0248ee522cfa48c8b84908cbeacda3dbs instanceof Object && uuid0248ee522cfa48c8b84908cbeacda3db.$parentContexts.length == 0 && typeof uuid0248ee522cfa48c8b84908cbeacda3db.$$instance == 'undefined') {
  globalThis.uuid0248ee522cfa48c8b84908cbeacda3dbs[uuid0248ee522cfa48c8b84908cbeacda3db.$$uuid] = globalThis.$contexts[uuid0248ee522cfa48c8b84908cbeacda3db.$$uuid] || [];
  uuid0248ee522cfa48c8b84908cbeacda3db.$$instance = globalThis.$contexts[uuid0248ee522cfa48c8b84908cbeacda3db.$$uuid].push(uuid0248ee522cfa48c8b84908cbeacda3db) - 1;
  globalThis.$contextsList.push(uuid0248ee522cfa48c8b84908cbeacda3db);
}

{
  let $context = uuid0248ee522cfa48c8b84908cbeacda3db;
  Object.defineProperty(uuid0248ee522cfa48c8b84908cbeacda3db.$closure, ["$context"], {
    get: function get() {
      return $context;
    },
    set: function set(val) {
      $context = val;
    },
    enumerable: true
  }) && (uuid0248ee522cfa48c8b84908cbeacda3db.$variableMap["$context"] = "let");

  let bar = require('../resources/required module.js');

  Object.defineProperty(uuid0248ee522cfa48c8b84908cbeacda3db.$closure, ["bar"], {
    get: function get() {
      return bar;
    },
    set: function set(val) {
      bar = val;
    },
    enumerable: true
  }) && (uuid0248ee522cfa48c8b84908cbeacda3db.$variableMap["bar"] = "let");
}