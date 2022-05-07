let uuidf3c278f2799d4f08b9d37fc1ec6ab360 = {
  $$uuid: 'uuidf3c278f2799d4f08b9d37fc1ec6ab360',
  $closure: {},
  $variableMap: {},
  $functionScoper: func => {
    Object.defineProperty(func, '$scopes', {
      value: function (arr) {
        for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
          arr2[i] = arr[i];
        }

        return arr2;
      }(typeof uuidf3c278f2799d4f08b9d37fc1ec6ab360 != 'undefined' ? uuidf3c278f2799d4f08b9d37fc1ec6ab360.$scopes : []),
      enumerable: true
    });
    Object.defineProperty(func, '$context', {
      value: uuidf3c278f2799d4f08b9d37fc1ec6ab360
    });
    return func;
  },
  $add: (type, name, value) => {
    uuidf3c278f2799d4f08b9d37fc1ec6ab360.$closure[name] = value;
    uuidf3c278f2799d4f08b9d37fc1ec6ab360.$variableMap[name] = type;
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
  $mode: (eval("var uuidf3c278f2799d4f08b9d37fc1ec6ab3601 = null"), typeof uuidf3c278f2799d4f08b9d37fc1ec6ab3601 === "undefined") ? "strict" : "non-strict"
};
Object.defineProperty(uuidf3c278f2799d4f08b9d37fc1ec6ab360.$closure, ["uuidf3c278f2799d4f08b9d37fc1ec6ab360"], {
  get: function get() {
    return uuidf3c278f2799d4f08b9d37fc1ec6ab360;
  },
  set: function set(val) {
    uuidf3c278f2799d4f08b9d37fc1ec6ab360 = val;
  },
  enumerable: true
}) && (uuidf3c278f2799d4f08b9d37fc1ec6ab360.$variableMap["uuidf3c278f2799d4f08b9d37fc1ec6ab360"] = "let");
uuidf3c278f2799d4f08b9d37fc1ec6ab360.$functionScoper = uuidf3c278f2799d4f08b9d37fc1ec6ab360.$functionScoper(uuidf3c278f2799d4f08b9d37fc1ec6ab360.$functionScoper);
uuidf3c278f2799d4f08b9d37fc1ec6ab360.$scopes.splice(0, 0, uuidf3c278f2799d4f08b9d37fc1ec6ab360.$closure);
uuidf3c278f2799d4f08b9d37fc1ec6ab360.$variableMaps.splice(0, 0, uuidf3c278f2799d4f08b9d37fc1ec6ab360.$variableMap);
var globalThis = globalThis || global || window || {};
uuidf3c278f2799d4f08b9d37fc1ec6ab360.$contextStatus = uuidf3c278f2799d4f08b9d37fc1ec6ab360.$mode == 'strict' ? '' : 'var';

try {
  eval(`${uuidf3c278f2799d4f08b9d37fc1ec6ab360.$contextStatus} $context = $context || uuidf3c278f2799d4f08b9d37fc1ec6ab360`);
} catch (err) {
  uuidf3c278f2799d4f08b9d37fc1ec6ab360.$contextStatus = '';
}

eval(`${uuidf3c278f2799d4f08b9d37fc1ec6ab360.$contextStatus} $context = $context || uuidf3c278f2799d4f08b9d37fc1ec6ab360`);

if (typeof $context == 'object' && $context != uuidf3c278f2799d4f08b9d37fc1ec6ab360 && $context.$contexts instanceof Object) {
  $context.$contexts[uuidf3c278f2799d4f08b9d37fc1ec6ab360.$$uuid] = $context.$contexts[uuidf3c278f2799d4f08b9d37fc1ec6ab360.$$uuid] || [];
  uuidf3c278f2799d4f08b9d37fc1ec6ab360.$$instance = $context.$contexts[uuidf3c278f2799d4f08b9d37fc1ec6ab360.$$uuid].push(uuidf3c278f2799d4f08b9d37fc1ec6ab360) - 1;
  uuidf3c278f2799d4f08b9d37fc1ec6ab360.$parentContexts.push($context);
  $context.$contextsList.push(uuidf3c278f2799d4f08b9d37fc1ec6ab360);
}

if (!globalThis.$contexts) {
  globalThis.$contexts = {};
  globalThis.$contexts[uuidf3c278f2799d4f08b9d37fc1ec6ab360.$$uuid] = [uuidf3c278f2799d4f08b9d37fc1ec6ab360];
  globalThis.$contextsList = [uuidf3c278f2799d4f08b9d37fc1ec6ab360];
  uuidf3c278f2799d4f08b9d37fc1ec6ab360.$$instance = 0;
} else if (globalThis.uuidf3c278f2799d4f08b9d37fc1ec6ab360s instanceof Object && uuidf3c278f2799d4f08b9d37fc1ec6ab360.$parentContexts.length == 0 && typeof uuidf3c278f2799d4f08b9d37fc1ec6ab360.$$instance == 'undefined') {
  globalThis.uuidf3c278f2799d4f08b9d37fc1ec6ab360s[uuidf3c278f2799d4f08b9d37fc1ec6ab360.$$uuid] = globalThis.$contexts[uuidf3c278f2799d4f08b9d37fc1ec6ab360.$$uuid] || [];
  uuidf3c278f2799d4f08b9d37fc1ec6ab360.$$instance = globalThis.$contexts[uuidf3c278f2799d4f08b9d37fc1ec6ab360.$$uuid].push(uuidf3c278f2799d4f08b9d37fc1ec6ab360) - 1;
  globalThis.$contextsList.push(uuidf3c278f2799d4f08b9d37fc1ec6ab360);
}

{
  let $context = uuidf3c278f2799d4f08b9d37fc1ec6ab360;
  Object.defineProperty(uuidf3c278f2799d4f08b9d37fc1ec6ab360.$closure, ["$context"], {
    get: function get() {
      return $context;
    },
    set: function set(val) {
      $context = val;
    },
    enumerable: true
  }) && (uuidf3c278f2799d4f08b9d37fc1ec6ab360.$variableMap["$context"] = "let");
  let json = {
    function1: uuidf3c278f2799d4f08b9d37fc1ec6ab360.$functionScoper(function () {
      let uuid6a46a9e54d5440fda37130c7c79c4cd6 = {
        $$uuid: 'uuid6a46a9e54d5440fda37130c7c79c4cd6',
        $closure: {},
        $variableMap: {},
        $functionScoper: func => {
          Object.defineProperty(func, '$scopes', {
            value: function (arr) {
              for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
              }

              return arr2;
            }(typeof uuid6a46a9e54d5440fda37130c7c79c4cd6 != 'undefined' ? uuid6a46a9e54d5440fda37130c7c79c4cd6.$scopes : []),
            enumerable: true
          });
          Object.defineProperty(func, '$context', {
            value: uuid6a46a9e54d5440fda37130c7c79c4cd6
          });
          return func;
        },
        $add: (type, name, value) => {
          uuid6a46a9e54d5440fda37130c7c79c4cd6.$closure[name] = value;
          uuid6a46a9e54d5440fda37130c7c79c4cd6.$variableMap[name] = type;
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
        $mode: (eval("var uuid6a46a9e54d5440fda37130c7c79c4cd61 = null"), typeof uuid6a46a9e54d5440fda37130c7c79c4cd61 === "undefined") ? "strict" : "non-strict"
      };
      Object.defineProperty(uuid6a46a9e54d5440fda37130c7c79c4cd6.$closure, ["uuid6a46a9e54d5440fda37130c7c79c4cd6"], {
        get: function get() {
          return uuid6a46a9e54d5440fda37130c7c79c4cd6;
        },
        set: function set(val) {
          uuid6a46a9e54d5440fda37130c7c79c4cd6 = val;
        },
        enumerable: true
      }) && (uuid6a46a9e54d5440fda37130c7c79c4cd6.$variableMap["uuid6a46a9e54d5440fda37130c7c79c4cd6"] = "let");
      uuid6a46a9e54d5440fda37130c7c79c4cd6.$functionScoper = uuid6a46a9e54d5440fda37130c7c79c4cd6.$functionScoper(uuid6a46a9e54d5440fda37130c7c79c4cd6.$functionScoper);
      uuid6a46a9e54d5440fda37130c7c79c4cd6.$scopes.splice(0, 0, uuid6a46a9e54d5440fda37130c7c79c4cd6.$closure);
      uuid6a46a9e54d5440fda37130c7c79c4cd6.$variableMaps.splice(0, 0, uuid6a46a9e54d5440fda37130c7c79c4cd6.$variableMap);
      var globalThis = globalThis || global || window || {};
      uuid6a46a9e54d5440fda37130c7c79c4cd6.$contextStatus = uuid6a46a9e54d5440fda37130c7c79c4cd6.$mode == 'strict' ? '' : 'var';

      try {
        eval(`${uuid6a46a9e54d5440fda37130c7c79c4cd6.$contextStatus} $context = $context || uuid6a46a9e54d5440fda37130c7c79c4cd6`);
      } catch (err) {
        uuid6a46a9e54d5440fda37130c7c79c4cd6.$contextStatus = '';
      }

      eval(`${uuid6a46a9e54d5440fda37130c7c79c4cd6.$contextStatus} $context = $context || uuid6a46a9e54d5440fda37130c7c79c4cd6`);

      if (typeof $context == 'object' && $context != uuid6a46a9e54d5440fda37130c7c79c4cd6 && $context.$contexts instanceof Object) {
        $context.$contexts[uuid6a46a9e54d5440fda37130c7c79c4cd6.$$uuid] = $context.$contexts[uuid6a46a9e54d5440fda37130c7c79c4cd6.$$uuid] || [];
        uuid6a46a9e54d5440fda37130c7c79c4cd6.$$instance = $context.$contexts[uuid6a46a9e54d5440fda37130c7c79c4cd6.$$uuid].push(uuid6a46a9e54d5440fda37130c7c79c4cd6) - 1;
        uuid6a46a9e54d5440fda37130c7c79c4cd6.$parentContexts.push($context);
        $context.$contextsList.push(uuid6a46a9e54d5440fda37130c7c79c4cd6);
      }

      if (!globalThis.$contexts) {
        globalThis.$contexts = {};
        globalThis.$contexts[uuid6a46a9e54d5440fda37130c7c79c4cd6.$$uuid] = [uuid6a46a9e54d5440fda37130c7c79c4cd6];
        globalThis.$contextsList = [uuid6a46a9e54d5440fda37130c7c79c4cd6];
        uuid6a46a9e54d5440fda37130c7c79c4cd6.$$instance = 0;
      } else if (globalThis.uuid6a46a9e54d5440fda37130c7c79c4cd6s instanceof Object && uuid6a46a9e54d5440fda37130c7c79c4cd6.$parentContexts.length == 0 && typeof uuid6a46a9e54d5440fda37130c7c79c4cd6.$$instance == 'undefined') {
        globalThis.uuid6a46a9e54d5440fda37130c7c79c4cd6s[uuid6a46a9e54d5440fda37130c7c79c4cd6.$$uuid] = globalThis.$contexts[uuid6a46a9e54d5440fda37130c7c79c4cd6.$$uuid] || [];
        uuid6a46a9e54d5440fda37130c7c79c4cd6.$$instance = globalThis.$contexts[uuid6a46a9e54d5440fda37130c7c79c4cd6.$$uuid].push(uuid6a46a9e54d5440fda37130c7c79c4cd6) - 1;
        globalThis.$contextsList.push(uuid6a46a9e54d5440fda37130c7c79c4cd6);
      }

      {
        let $context = uuid6a46a9e54d5440fda37130c7c79c4cd6;
        Object.defineProperty(uuid6a46a9e54d5440fda37130c7c79c4cd6.$closure, ["$context"], {
          get: function get() {
            return $context;
          },
          set: function set(val) {
            $context = val;
          },
          enumerable: true
        }) && (uuid6a46a9e54d5440fda37130c7c79c4cd6.$variableMap["$context"] = "let");
        return foo;
      }
    })
  };
  Object.defineProperty(uuidf3c278f2799d4f08b9d37fc1ec6ab360.$closure, ["json"], {
    get: function get() {
      return json;
    },
    set: function set(val) {
      json = val;
    },
    enumerable: true
  }) && (uuidf3c278f2799d4f08b9d37fc1ec6ab360.$variableMap["json"] = "let");
  let foo = "foo";
  Object.defineProperty(uuidf3c278f2799d4f08b9d37fc1ec6ab360.$closure, ["foo"], {
    get: function get() {
      return foo;
    },
    set: function set(val) {
      foo = val;
    },
    enumerable: true
  }) && (uuidf3c278f2799d4f08b9d37fc1ec6ab360.$variableMap["foo"] = "let");
  let string = smarts.stringify(json);
  Object.defineProperty(uuidf3c278f2799d4f08b9d37fc1ec6ab360.$closure, ["string"], {
    get: function get() {
      return string;
    },
    set: function set(val) {
      string = val;
    },
    enumerable: true
  }) && (uuidf3c278f2799d4f08b9d37fc1ec6ab360.$variableMap["string"] = "let");
  let parsed = smarts.parse(string);
  Object.defineProperty(uuidf3c278f2799d4f08b9d37fc1ec6ab360.$closure, ["parsed"], {
    get: function get() {
      return parsed;
    },
    set: function set(val) {
      parsed = val;
    },
    enumerable: true
  }) && (uuidf3c278f2799d4f08b9d37fc1ec6ab360.$variableMap["parsed"] = "let");
}