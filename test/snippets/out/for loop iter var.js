let uuidf9e41bd5f2a6425ab2e4927784468a00 = {
  $$uuid: 'uuidf9e41bd5f2a6425ab2e4927784468a00',
  $closure: {},
  $variableMap: {},
  $functionScoper: func => {
    Object.defineProperty(func, '$scopes', {
      value: function (arr) {
        for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
          arr2[i] = arr[i];
        }

        return arr2;
      }(typeof uuidf9e41bd5f2a6425ab2e4927784468a00 != 'undefined' ? uuidf9e41bd5f2a6425ab2e4927784468a00.$scopes : []),
      enumerable: true
    });
    Object.defineProperty(func, '$context', {
      value: uuidf9e41bd5f2a6425ab2e4927784468a00
    });
    return func;
  },
  $add: (type, name, value) => {
    uuidf9e41bd5f2a6425ab2e4927784468a00.$closure[name] = value;
    uuidf9e41bd5f2a6425ab2e4927784468a00.$variableMap[name] = type;
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
  $mode: (eval("var uuidf9e41bd5f2a6425ab2e4927784468a001 = null"), typeof uuidf9e41bd5f2a6425ab2e4927784468a001 === "undefined") ? "strict" : "non-strict"
};
Object.defineProperty(uuidf9e41bd5f2a6425ab2e4927784468a00.$closure, ["uuidf9e41bd5f2a6425ab2e4927784468a00"], {
  get: function get() {
    return uuidf9e41bd5f2a6425ab2e4927784468a00;
  },
  set: function set(val) {
    uuidf9e41bd5f2a6425ab2e4927784468a00 = val;
  },
  enumerable: true
}) && (uuidf9e41bd5f2a6425ab2e4927784468a00.$variableMap["uuidf9e41bd5f2a6425ab2e4927784468a00"] = "let");
uuidf9e41bd5f2a6425ab2e4927784468a00.$functionScoper = uuidf9e41bd5f2a6425ab2e4927784468a00.$functionScoper(uuidf9e41bd5f2a6425ab2e4927784468a00.$functionScoper);
uuidf9e41bd5f2a6425ab2e4927784468a00.$scopes.splice(0, 0, uuidf9e41bd5f2a6425ab2e4927784468a00.$closure);
uuidf9e41bd5f2a6425ab2e4927784468a00.$variableMaps.splice(0, 0, uuidf9e41bd5f2a6425ab2e4927784468a00.$variableMap);
var globalThis = globalThis || global || window || {};
uuidf9e41bd5f2a6425ab2e4927784468a00.$contextStatus = uuidf9e41bd5f2a6425ab2e4927784468a00.$mode == 'strict' ? '' : 'var';

try {
  eval(`${uuidf9e41bd5f2a6425ab2e4927784468a00.$contextStatus} $context = $context || uuidf9e41bd5f2a6425ab2e4927784468a00`);
} catch (err) {
  uuidf9e41bd5f2a6425ab2e4927784468a00.$contextStatus = '';
}

eval(`${uuidf9e41bd5f2a6425ab2e4927784468a00.$contextStatus} $context = $context || uuidf9e41bd5f2a6425ab2e4927784468a00`);

if (typeof $context == 'object' && $context != uuidf9e41bd5f2a6425ab2e4927784468a00 && $context.$contexts instanceof Object) {
  $context.$contexts[uuidf9e41bd5f2a6425ab2e4927784468a00.$$uuid] = $context.$contexts[uuidf9e41bd5f2a6425ab2e4927784468a00.$$uuid] || [];
  uuidf9e41bd5f2a6425ab2e4927784468a00.$$instance = $context.$contexts[uuidf9e41bd5f2a6425ab2e4927784468a00.$$uuid].push(uuidf9e41bd5f2a6425ab2e4927784468a00) - 1;
  uuidf9e41bd5f2a6425ab2e4927784468a00.$parentContexts.push($context);
  $context.$contextsList.push(uuidf9e41bd5f2a6425ab2e4927784468a00);
}

if (!globalThis.$contexts) {
  globalThis.$contexts = {};
  globalThis.$contexts[uuidf9e41bd5f2a6425ab2e4927784468a00.$$uuid] = [uuidf9e41bd5f2a6425ab2e4927784468a00];
  globalThis.$contextsList = [uuidf9e41bd5f2a6425ab2e4927784468a00];
  uuidf9e41bd5f2a6425ab2e4927784468a00.$$instance = 0;
} else if (globalThis.uuidf9e41bd5f2a6425ab2e4927784468a00s instanceof Object && uuidf9e41bd5f2a6425ab2e4927784468a00.$parentContexts.length == 0 && typeof uuidf9e41bd5f2a6425ab2e4927784468a00.$$instance == 'undefined') {
  globalThis.uuidf9e41bd5f2a6425ab2e4927784468a00s[uuidf9e41bd5f2a6425ab2e4927784468a00.$$uuid] = globalThis.$contexts[uuidf9e41bd5f2a6425ab2e4927784468a00.$$uuid] || [];
  uuidf9e41bd5f2a6425ab2e4927784468a00.$$instance = globalThis.$contexts[uuidf9e41bd5f2a6425ab2e4927784468a00.$$uuid].push(uuidf9e41bd5f2a6425ab2e4927784468a00) - 1;
  globalThis.$contextsList.push(uuidf9e41bd5f2a6425ab2e4927784468a00);
}

Object.defineProperty(uuidf9e41bd5f2a6425ab2e4927784468a00.$closure, ["loopVar"], {
  get: function get() {
    return loopVar;
  },
  set: function set(val) {
    loopVar = val;
  },
  enumerable: true
}) && (uuidf9e41bd5f2a6425ab2e4927784468a00.$variableMap["loopVar"] = "var");
{
  let $context = uuidf9e41bd5f2a6425ab2e4927784468a00;
  Object.defineProperty(uuidf9e41bd5f2a6425ab2e4927784468a00.$closure, ["$context"], {
    get: function get() {
      return $context;
    },
    set: function set(val) {
      $context = val;
    },
    enumerable: true
  }) && (uuidf9e41bd5f2a6425ab2e4927784468a00.$variableMap["$context"] = "let");

  for (var loopVar = 0; loopVar < 10; loopVar++) {
    let uuid878cdd909cf54d3a8cd57dd523b8520f = {
      $$uuid: 'uuid878cdd909cf54d3a8cd57dd523b8520f',
      $closure: {},
      $variableMap: {},
      $functionScoper: func => {
        Object.defineProperty(func, '$scopes', {
          value: function (arr) {
            for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
              arr2[i] = arr[i];
            }

            return arr2;
          }(typeof uuid878cdd909cf54d3a8cd57dd523b8520f != 'undefined' ? uuid878cdd909cf54d3a8cd57dd523b8520f.$scopes : []),
          enumerable: true
        });
        Object.defineProperty(func, '$context', {
          value: uuid878cdd909cf54d3a8cd57dd523b8520f
        });
        return func;
      },
      $add: (type, name, value) => {
        uuid878cdd909cf54d3a8cd57dd523b8520f.$closure[name] = value;
        uuid878cdd909cf54d3a8cd57dd523b8520f.$variableMap[name] = type;
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
      $mode: (eval("var uuid878cdd909cf54d3a8cd57dd523b8520f1 = null"), typeof uuid878cdd909cf54d3a8cd57dd523b8520f1 === "undefined") ? "strict" : "non-strict"
    };
    Object.defineProperty(uuid878cdd909cf54d3a8cd57dd523b8520f.$closure, ["uuid878cdd909cf54d3a8cd57dd523b8520f"], {
      get: function get() {
        return uuid878cdd909cf54d3a8cd57dd523b8520f;
      },
      set: function set(val) {
        uuid878cdd909cf54d3a8cd57dd523b8520f = val;
      },
      enumerable: true
    }) && (uuid878cdd909cf54d3a8cd57dd523b8520f.$variableMap["uuid878cdd909cf54d3a8cd57dd523b8520f"] = "let");
    uuid878cdd909cf54d3a8cd57dd523b8520f.$functionScoper = uuid878cdd909cf54d3a8cd57dd523b8520f.$functionScoper(uuid878cdd909cf54d3a8cd57dd523b8520f.$functionScoper);
    uuid878cdd909cf54d3a8cd57dd523b8520f.$scopes.splice(0, 0, uuid878cdd909cf54d3a8cd57dd523b8520f.$closure);
    uuid878cdd909cf54d3a8cd57dd523b8520f.$variableMaps.splice(0, 0, uuid878cdd909cf54d3a8cd57dd523b8520f.$variableMap);
    var globalThis = globalThis || global || window || {};
    uuid878cdd909cf54d3a8cd57dd523b8520f.$contextStatus = uuid878cdd909cf54d3a8cd57dd523b8520f.$mode == 'strict' ? '' : 'var';

    try {
      eval(`${uuid878cdd909cf54d3a8cd57dd523b8520f.$contextStatus} $context = $context || uuid878cdd909cf54d3a8cd57dd523b8520f`);
    } catch (err) {
      uuid878cdd909cf54d3a8cd57dd523b8520f.$contextStatus = '';
    }

    eval(`${uuid878cdd909cf54d3a8cd57dd523b8520f.$contextStatus} $context = $context || uuid878cdd909cf54d3a8cd57dd523b8520f`);

    if (typeof $context == 'object' && $context != uuid878cdd909cf54d3a8cd57dd523b8520f && $context.$contexts instanceof Object) {
      $context.$contexts[uuid878cdd909cf54d3a8cd57dd523b8520f.$$uuid] = $context.$contexts[uuid878cdd909cf54d3a8cd57dd523b8520f.$$uuid] || [];
      uuid878cdd909cf54d3a8cd57dd523b8520f.$$instance = $context.$contexts[uuid878cdd909cf54d3a8cd57dd523b8520f.$$uuid].push(uuid878cdd909cf54d3a8cd57dd523b8520f) - 1;
      uuid878cdd909cf54d3a8cd57dd523b8520f.$parentContexts.push($context);
      $context.$contextsList.push(uuid878cdd909cf54d3a8cd57dd523b8520f);
    }

    if (!globalThis.$contexts) {
      globalThis.$contexts = {};
      globalThis.$contexts[uuid878cdd909cf54d3a8cd57dd523b8520f.$$uuid] = [uuid878cdd909cf54d3a8cd57dd523b8520f];
      globalThis.$contextsList = [uuid878cdd909cf54d3a8cd57dd523b8520f];
      uuid878cdd909cf54d3a8cd57dd523b8520f.$$instance = 0;
    } else if (globalThis.uuid878cdd909cf54d3a8cd57dd523b8520fs instanceof Object && uuid878cdd909cf54d3a8cd57dd523b8520f.$parentContexts.length == 0 && typeof uuid878cdd909cf54d3a8cd57dd523b8520f.$$instance == 'undefined') {
      globalThis.uuid878cdd909cf54d3a8cd57dd523b8520fs[uuid878cdd909cf54d3a8cd57dd523b8520f.$$uuid] = globalThis.$contexts[uuid878cdd909cf54d3a8cd57dd523b8520f.$$uuid] || [];
      uuid878cdd909cf54d3a8cd57dd523b8520f.$$instance = globalThis.$contexts[uuid878cdd909cf54d3a8cd57dd523b8520f.$$uuid].push(uuid878cdd909cf54d3a8cd57dd523b8520f) - 1;
      globalThis.$contextsList.push(uuid878cdd909cf54d3a8cd57dd523b8520f);
    }

    {
      let $context = uuid878cdd909cf54d3a8cd57dd523b8520f;
      Object.defineProperty(uuid878cdd909cf54d3a8cd57dd523b8520f.$closure, ["$context"], {
        get: function get() {
          return $context;
        },
        set: function set(val) {
          $context = val;
        },
        enumerable: true
      }) && (uuid878cdd909cf54d3a8cd57dd523b8520f.$variableMap["$context"] = "let");
      Object.defineProperty(uuid878cdd909cf54d3a8cd57dd523b8520f.$closure, ["loopVar"], {
        get: function get() {
          return loopVar;
        },
        set: function set(val) {
          loopVar = val;
        },
        enumerable: true
      }) && (uuid878cdd909cf54d3a8cd57dd523b8520f.$variableMap["loopVar"] = "var");
    }
  }
}