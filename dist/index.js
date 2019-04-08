"use strict";

module.exports = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      node = _ref.node,
      vue = _ref.vue,
      objList = _ref.objList,
      stringList = _ref.stringList;

  if (node) {
    var smarts = require('./smarts')({
      objList: objList,
      stringList: stringList
    });
  } else if (vue) {
    var smartsJuice = require('./smarts')({
      objList: objList,
      stringList: stringList,
      vue: vue
    });

    var smarts = {
      data: function data() {
        return {};
      },
      methods: smartsJuice
    };
  } else {
    var smarts = require('./smarts')({
      objList: objList,
      stringList: stringList
    });
  }

  return smarts;
};