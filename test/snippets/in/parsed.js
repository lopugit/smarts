let uuid139c3e6e3a78498eb5305abb093bb765 = {
  $$uuid: 'uuid139c3e6e3a78498eb5305abb093bb765',
  $closure: {},
  $variableMap: {},
  $functionScoper: func => {
    Object.defineProperty(func, '$scopes', {
      value: [...uuid139c3e6e3a78498eb5305abb093bb765.$scopes],
      enumerable: true
    });
    Object.defineProperty(func, '$context', {
      value: uuid139c3e6e3a78498eb5305abb093bb765
    });
    return func;
  },
  $add: (type, name, value) => {
    uuid139c3e6e3a78498eb5305abb093bb765.$closure[name] = value;
    uuid139c3e6e3a78498eb5305abb093bb765.$variableMap[name] = type;
  },
  $scopes: [...(typeof $context != 'undefined' ? $context.$scopes : [])],
  $variableMaps: [...(typeof $context != 'undefined' ? $context.$variableMaps : [])],
  $contexts: [],
  $parentContexts: []
};
Object.defineProperty(uuid139c3e6e3a78498eb5305abb093bb765.$closure, "uuid139c3e6e3a78498eb5305abb093bb765", {
  get: function get() {
    return uuid139c3e6e3a78498eb5305abb093bb765;
  },
  set: function set(val) {
    uuid139c3e6e3a78498eb5305abb093bb765 = val;
  },
  enumerable: true
});
uuid139c3e6e3a78498eb5305abb093bb765.$variableMap["uuid139c3e6e3a78498eb5305abb093bb765"] = "let";
uuid139c3e6e3a78498eb5305abb093bb765.$functionScoper = uuid139c3e6e3a78498eb5305abb093bb765.$functionScoper(uuid139c3e6e3a78498eb5305abb093bb765.$functionScoper);
uuid139c3e6e3a78498eb5305abb093bb765.$scopes.splice(0, 0, uuid139c3e6e3a78498eb5305abb093bb765.$closure);
uuid139c3e6e3a78498eb5305abb093bb765.$variableMaps.splice(0, 0, uuid139c3e6e3a78498eb5305abb093bb765.$variableMap);
var $context = $context;
Object.defineProperty(uuid139c3e6e3a78498eb5305abb093bb765.$closure, "$context", {
  get: function get() {
    return $context;
  },
  set: function set(val) {
    $context = val;
  },
  enumerable: true
});
uuid139c3e6e3a78498eb5305abb093bb765.$variableMap["$context"] = "var";

if (typeof $context == 'undefined') {
  $context = uuid139c3e6e3a78498eb5305abb093bb765;
} else if ($context && $context.$contexts instanceof Array) {
  $context.$contexts.push(uuid139c3e6e3a78498eb5305abb093bb765);
  uuid139c3e6e3a78498eb5305abb093bb765.$parentContexts.push($context);
}

var globalThis = globalThis;
Object.defineProperty(uuid139c3e6e3a78498eb5305abb093bb765.$closure, "globalThis", {
  get: function get() {
    return globalThis;
  },
  set: function set(val) {
    globalThis = val;
  },
  enumerable: true
});
uuid139c3e6e3a78498eb5305abb093bb765.$variableMap["globalThis"] = "var";

if (!globalThis.$contexts) {
  globalThis.$contexts = [$context];
} else if (globalThis.$contexts instanceof Array && $context.$parentContexts.length == 0 && globalThis.$contexts.indexOf($context) == -1) {
  globalThis.$contexts.push($context);
}

let foo = [];
Object.defineProperty(uuid139c3e6e3a78498eb5305abb093bb765.$closure, "foo", {
  get: function get() {
    return foo;
  },
  set: function set(val) {
    foo = val;
  },
  enumerable: true
});
uuid139c3e6e3a78498eb5305abb093bb765.$variableMap["foo"] = "let";