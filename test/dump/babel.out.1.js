let uuid683739 = {
  $scope: {},
  $scoper: func => {
    Object.defineProperty(func, '$scopes', {
      value: [uuid683739.$scope]
    });
    return func;
  },
  uuid: 'uuid683739'
};
Object.defineProperty(uuid683739.$scope, "uuid683739", {
  get: function get() {
    return uuid683739;
  },
  set: function set(val) {
    uuid683739 = val;
  }
});
var $scope = uuid683739;
Object.defineProperty(uuid683739.$scope, "$scope", {
  get: function get() {
    return $scope;
  },
  set: function set(val) {
    $scope = val;
  }
});
let json = {
  'function': uuid683739.$scoper(function (arg1) {
    let uuid717580 = {
      $scope: {},
      $scoper: func => {
        Object.defineProperty(func, '$scopes', {
          value: [uuid717580.$scope]
        });
        return func;
      },
      uuid: 'uuid717580'
    };
    Object.defineProperty(uuid717580.$scope, "uuid717580", {
      get: function get() {
        return uuid717580;
      },
      set: function set(val) {
        uuid717580 = val;
      }
    });
    var $scope = uuid717580;
    Object.defineProperty(uuid717580.$scope, "$scope", {
      get: function get() {
        return $scope;
      },
      set: function set(val) {
        $scope = val;
      }
    });
    return foo;
  }),
  function2: uuid683739.$scoper(function function2(arg1) {
    let uuid725599 = {
      $scope: {},
      $scoper: func => {
        Object.defineProperty(func, '$scopes', {
          value: [uuid725599.$scope]
        });
        return func;
      },
      uuid: 'uuid725599'
    };
    Object.defineProperty(uuid725599.$scope, "uuid725599", {
      get: function get() {
        return uuid725599;
      },
      set: function set(val) {
        uuid725599 = val;
      }
    });
    var $scope = uuid725599;
    Object.defineProperty(uuid725599.$scope, "$scope", {
      get: function get() {
        return $scope;
      },
      set: function set(val) {
        $scope = val;
      }
    });
    return foo;
  })
};
Object.defineProperty(uuid683739.$scope, "json", {
  get: function get() {
    return json;
  },
  set: function set(val) {
    json = val;
  }
});
let foo = {
  bar: 1
};
Object.defineProperty(uuid683739.$scope, "foo", {
  get: function get() {
    return foo;
  },
  set: function set(val) {
    foo = val;
  }
});
let string = smarts.stringify(json);
Object.defineProperty(uuid683739.$scope, "string", {
  get: function get() {
    return string;
  },
  set: function set(val) {
    string = val;
  }
});
let parsed = smarts.parse(string);
Object.defineProperty(uuid683739.$scope, "parsed", {
  get: function get() {
    return parsed;
  },
  set: function set(val) {
    parsed = val;
  }
});