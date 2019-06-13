"use strict";

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.promise");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.regexp.match");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.regexp.constructor");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var f = require('flatted');

var _merge = require('deepmerge');

module.exports = function () {
  var _ref16;

  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      objList = _ref.objList,
      stringList = _ref.stringList,
      reactiveSetter = _ref.reactiveSetter,
      vue = _ref.vue;

  var local = {
    objList: objList,
    stringList: stringList,
    reactiveSetter: reactiveSetter,
    vue: vue
  };
  return _ref16 = {
    stringify: function stringify(obj, supplemental) {
      return f.stringify(obj, supplemental || this.stringifyFunc);
    },
    parse: function parse(string, supplemental) {
      return f.parse(string, supplemental || this.parseFunc);
    },
    stringifyFunc: function stringifyFunc(key, val) {
      if (val instanceof Function && typeof val.toString === 'function') {
        return "Function " + val.toString();
      } else if (val instanceof RegExp && typeof val.toString === 'function') {
        return "RegExp " + val.toString();
      }

      return val;
    },
    parseFunc: function parseFunc(key, val) {
      if (typeof val === 'string') {
        if (val.indexOf('Function ') == 0 // ||
        // val[val.length-1] == '}' && 
        // ( 
        // 	val.slice(0,8) === 'function' || 
        // 	val.slice(0,2) === '()' || 
        // 	val.slice(0,5) === 'async'
        // ) 
        ) {
            var ret = val;

            try {
              ret = eval("(" + val.split('Function ')[1] + ")");
            } catch (err) {}

            return ret;
          } else if (val.indexOf('RegExp ') == 0) {
          var _ret = val;

          try {
            var regex = val.split('RegExp ')[1].match(/\/(.*)\/(.*)?/);
            _ret = new RegExp(regex[1], regex[2] || "");
          } catch (err) {}

          return _ret;
        }
      }

      return val;
    },
    dupe: function dupe(obj) {
      return f.parse(f.stringify(obj));
    },
    schema: function schema(obj1, obj2, opts) {
      return Object.assign(obj1, _merge(obj2, obj1, opts || {
        arrayMerge: function arrayMerge(store, saved) {
          return saved;
        },
        clone: true
      }));
    },
    merge: function merge(obj1, obj2, opts) {
      return Object.assign(obj1, _merge(obj1, obj2, opts || {
        arrayMerge: function arrayMerge(store, saved) {
          return saved;
        },
        clone: true
      }));
    },
    mod: function mod(args, _mod) {
      return _mod(args) || args;
    },
    popThing: function popThing() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          option = _ref2.option,
          _ref2$list = _ref2.list,
          list = _ref2$list === void 0 ? this.getsmart(stringList) : _ref2$list,
          _ref2$obj = _ref2.obj,
          obj = _ref2$obj === void 0 ? true : _ref2$obj,
          _ref2$keys = _ref2.keys,
          keys = _ref2$keys === void 0 ? ['uuid', '_id', 'id'] : _ref2$keys,
          keymatchtype = _ref2.keymatchtype,
          _ref2$defaultValue = _ref2.defaultValue,
          defaultValue = _ref2$defaultValue === void 0 ? undefined : _ref2$defaultValue,
          _ref2$vue = _ref2.vue,
          vue = _ref2$vue === void 0 ? vue : _ref2$vue;

      if (_typeof(list) == 'object' && this.thingIn({
        option: option,
        list: list,
        obj: obj,
        keys: keys,
        keymatchtype: keymatchtype
      })) {
        return list[this.thingIndex({
          option: option,
          list: list,
          obj: obj,
          keys: keys,
          keymatchtype: keymatchtype
        })];
      } else {
        return defaultValue;
      }
    },
    setThing: function setThing() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          option = _ref3.option,
          _ref3$list = _ref3.list,
          list = _ref3$list === void 0 ? this.getsmart(objList) : _ref3$list,
          _ref3$obj = _ref3.obj,
          obj = _ref3$obj === void 0 ? true : _ref3$obj,
          _ref3$keys = _ref3.keys,
          keys = _ref3$keys === void 0 ? ['uuid', '_id', 'id'] : _ref3$keys,
          keymatchtype = _ref3.keymatchtype,
          push = _ref3.push,
          strings = _ref3.strings,
          targets = _ref3.targets,
          _ref3$vue = _ref3.vue,
          vue = _ref3$vue === void 0 ? vue : _ref3$vue;

      var index = this.thingIndex({
        option: option,
        list: list,
        obj: obj,
        keys: keys,
        keymatchtype: keymatchtype,
        strings: strings
      });

      if (obj == "debug") {
        console.log('index');
        console.log(index);
        console.log('list');
        console.log(list);
      }

      if (index >= 0 && list) {
        if (targets && targets.length && typeof targets.length == 'number') {
          for (var i = 0; i < targets.length; i++) {
            var value = this.getsmart(option, targets[i], undefined);

            if (value) {
              this.setsmart(list[index], targets[i], value);
            }
          }
        } else {
          list.splice(index, 1, option);

          if (this.getsmart(local.vue, 'reactiveSetter', false) && this.$set) {
            if (!localStorage.getItem('vuexWriteLock') && typeof this.getsmart(window, '$store.commit', undefined) == 'function') {
              window.$store.commit('thing');
            }
          } else if (this.getsmart(local.vue, 'store', false) && !localStorage.getItem('vuexWriteLock') && typeof this.getsmart(window, '$store.commit', undefined) == 'function') {
            window.$store.commit('thing');
          }
        } // list[index] = option

      } else if (push && list) {
        if (this.getsmart(local.vue, 'reactiveSetter', false) || this.getsmart(local.vue, 'store', false)) {
          list.splice(list.length, 0, option);

          if (!localStorage.getItem('vuexWriteLock') && typeof this.getsmart(window, '$store.commit', undefined) == 'function') {
            window.$store.commit('thing');
          }
        } else {
          list.push(option);
        }

        index = list.length - 1;
      }

      return index;
    },
    setThings: function setThings() {
      var _this = this;

      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          options = _ref4.options,
          _ref4$list = _ref4.list,
          list = _ref4$list === void 0 ? this.getsmart(objList) : _ref4$list,
          _ref4$obj = _ref4.obj,
          obj = _ref4$obj === void 0 ? true : _ref4$obj,
          _ref4$keys = _ref4.keys,
          keys = _ref4$keys === void 0 ? ['uuid', '_id', 'id'] : _ref4$keys,
          keymatchtype = _ref4.keymatchtype,
          push = _ref4.push,
          async = _ref4.async,
          _ref4$vue = _ref4.vue,
          vue = _ref4$vue === void 0 ? vue : _ref4$vue;

      if (options && options instanceof Array && list) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          var _loop = function _loop() {
            var option = _step.value;

            if (async) {
              new Promise(function (resolve, reject) {
                _this.setThing({
                  option: option,
                  list: list,
                  obj: obj,
                  keys: keys,
                  keymatchtype: keymatchtype,
                  push: push
                });
              });
            } else {
              _this.setThing({
                option: option,
                list: list,
                obj: obj,
                keys: keys,
                keymatchtype: keymatchtype,
                push: push
              });
            }
          };

          for (var _iterator = options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            _loop();
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      return list;
    },
    optIn: function optIn(option) {
      var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getsmart(stringList);
      var obj = arguments.length > 2 ? arguments[2] : undefined;
      var keys = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ['uuid', '_id', 'id'];
      var keymatchtype = arguments.length > 4 ? arguments[4] : undefined;
      var index = arguments.length > 5 ? arguments[5] : undefined;

      if (_typeof(option) === 'object') {
        obj = true;
      }

      if (!obj && list && list.indexOf && list.indexOf(option) >= 0) {
        return index ? list.indexOf(option) : true;
      } else if (obj && list && typeof list.length == 'number') {
        for (var i = 0; i < list.length; i++) {
          if (!(keys && typeof keys.length == 'number')) return;

          for (var indKey = 0; indKey < keys.length; indKey++) {
            if (keymatchtype == 'broad') {
              if (list[i] && this.getsmart(list[i], keys[indKey], undefined) == this.getsmart(option, keys[indKey], undefined) && this.getsmart(list[i], keys[indKey], undefined) !== undefined) {
                return index ? i : true;
              } else if (list[i] && typeof list[i] == 'string' && list[i] == this.getsmart(option, keys[indKey], undefined) && this.getsmart(option, keys[indKey], undefined) !== undefined) {
                return index ? i : true;
              }
            } else {
              if (list[i] && this.getsmart(list[i], keys[indKey], undefined) == this.getsmart(option, keys[indKey], undefined) && this.getsmart(list[i], keys[indKey], undefined) !== undefined) {
                if (indKey == keys.length - 1) {
                  return index ? i : true;
                }
              } else if (list[i] && typeof list[i] == 'string' && list[i] == this.getsmart(option, keys[indKey], undefined) && this.getsmart(option, keys[indKey], undefined) !== undefined) {
                if (indKey == keys.length - 1) {
                  return index ? i : true;
                }
              }
            }
          }
        }
      }

      return index ? -1 : false;
    },
    thingIn: function thingIn() {
      var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          option = _ref5.option,
          _ref5$list = _ref5.list,
          list = _ref5$list === void 0 ? this.getsmart(objList) : _ref5$list,
          _ref5$obj = _ref5.obj,
          obj = _ref5$obj === void 0 ? true : _ref5$obj,
          _ref5$keys = _ref5.keys,
          keys = _ref5$keys === void 0 ? ['uuid', '_id', 'id'] : _ref5$keys,
          keymatchtype = _ref5.keymatchtype,
          strings = _ref5.strings,
          retIndex = _ref5.retIndex,
          _ref5$vue = _ref5.vue,
          vue = _ref5$vue === void 0 ? vue : _ref5$vue;

      if (_typeof(option) === 'object') {
        obj = true;
      }

      if (!obj && list && list.indexOf && list.indexOf(option) >= 0) {
        if (retIndex) {
          return list.indexOf(option);
        } else {
          return true;
        }
      } else if (obj && list && typeof list.length == 'number') {
        for (var i = 0; i < list.length; i++) {
          if (!(keys && typeof keys.length == 'number')) return;

          for (var indKey = 0; indKey < keys.length; indKey++) {
            if (keymatchtype == 'broad') {
              if (list[i] && this.getsmart(list[i], keys[indKey], undefined) == this.getsmart(option, keys[indKey], undefined) && this.getsmart(list[i], keys[indKey], undefined) !== undefined) {
                if (retIndex) {
                  return i;
                } else {
                  return true;
                }
              } else if (list[i] && typeof list[i] == 'string' && list[i] == this.getsmart(option, keys[indKey], undefined) && this.getsmart(option, keys[indKey], undefined) !== undefined) {
                if (retIndex) {
                  return i;
                } else {
                  return true;
                }
              }
            } else {
              if (list[i] && this.getsmart(list[i], keys[indKey], undefined) == this.getsmart(option, keys[indKey], undefined) && this.getsmart(list[i], keys[indKey], undefined) !== undefined) {
                if (indKey == keys.length - 1) {
                  if (retIndex) {
                    return i;
                  } else {
                    return true;
                  }
                }
              } else if (list[i] && typeof list[i] == 'string' && list[i] == this.getsmart(option, keys[indKey], undefined) && this.getsmart(option, keys[indKey], undefined) !== undefined) {
                if (indKey == keys.length - 1) {
                  if (retIndex) {
                    return i;
                  } else {
                    return true;
                  }
                }
              }
            }
          }
        }
      }

      if (retIndex) {
        return -1;
      } else {
        return false;
      }
    },
    optsIn: function optsIn(options) {
      var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getsmart(stringList);
      var obj = arguments.length > 2 ? arguments[2] : undefined;
      var keys = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ['uuid', '_id', 'id'];
      var keymatchtype = arguments.length > 4 ? arguments[4] : undefined;
      if (!(options instanceof Array)) return true;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = options[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var option = _step2.value;

          // if(typeof option === 'object'){
          //   obj = true
          // }
          if (!obj && list && list.indexOf && list.indexOf(option) >= 0) {// return true
          } else if (obj && list) {
            for (var i = 0; i < list.length; i++) {
              if (!this.optIn(option, list[i], obj, keys, keymatchtype)) {
                return false;
              }
            }
          } else {
            return false;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return true;
    },
    thingsIn: function thingsIn() {
      var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          options = _ref6.options,
          _ref6$list = _ref6.list,
          list = _ref6$list === void 0 ? this.getsmart(stringList) : _ref6$list,
          obj = _ref6.obj,
          _ref6$keys = _ref6.keys,
          keys = _ref6$keys === void 0 ? ['uuid', '_id', 'id'] : _ref6$keys,
          keymatchtype = _ref6.keymatchtype,
          _ref6$vue = _ref6.vue,
          vue = _ref6$vue === void 0 ? vue : _ref6$vue;

      if (!(options instanceof Array)) return true;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = options[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var option = _step3.value;

          // if(typeof option === 'object'){
          //   obj = true
          // }
          if (!obj && list && list.indexOf && list.indexOf(option) >= 0) {// return true
          } else if (obj && list && typeof list.length == 'number') {
            for (var i = 0; i < list.length; i++) {
              if (!this.optIn(option, list[i], obj, keys, keymatchtype)) {
                return false;
              }
            }
          } else {
            return false;
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return true;
    },
    anyOptsIn: function anyOptsIn(options) {
      var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getsmart(stringList);
      var obj = arguments.length > 2 ? arguments[2] : undefined;
      var keys = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ['uuid', '_id', 'id'];
      var keymatchtype = arguments.length > 4 ? arguments[4] : undefined;
      if (!(options instanceof Array)) return false;
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = options[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var option = _step4.value;

          // if(typeof option === 'object'){
          //   obj = true
          // }
          if (!obj && list && list.indexOf && list.indexOf(option) >= 0) {
            return true;
          } else if (obj && list && typeof list.length == 'number') {
            for (var i = 0; i < list.length; i++) {
              if (this.optIn(option, list[i], obj, keys, keymatchtype)) {
                return true;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return false;
    },
    anyThingsIn: function anyThingsIn() {
      var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          options = _ref7.options,
          _ref7$list = _ref7.list,
          list = _ref7$list === void 0 ? this.getsmart(stringList) : _ref7$list,
          obj = _ref7.obj,
          _ref7$keys = _ref7.keys,
          keys = _ref7$keys === void 0 ? ['uuid', '_id', 'id'] : _ref7$keys,
          keymatchtype = _ref7.keymatchtype,
          _ref7$vue = _ref7.vue,
          vue = _ref7$vue === void 0 ? vue : _ref7$vue;

      if (!(options instanceof Array)) return false;
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = options[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var option = _step5.value;

          // if(typeof option === 'object'){
          //   obj = true
          // }
          if (!obj && list && list.indexOf && list.indexOf(option) >= 0) {
            return true;
          } else if (obj && list && typeof list.length == 'number') {
            for (var i = 0; i < list.length; i++) {
              if (this.optIn(option, list[i], obj, keys, keymatchtype)) {
                return true;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
            _iterator5["return"]();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      return false;
    },
    optIndex: function optIndex(option) {
      var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getsmart(stringList);
      var obj = arguments.length > 2 ? arguments[2] : undefined;
      var keys = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ['uuid', '_id', 'id'];
      var keymatchtype = arguments.length > 4 ? arguments[4] : undefined;

      if (_typeof(option) === 'object') {
        obj = true;
      }

      if (obj && list && keys && typeof list.length == 'number') {
        for (var i = 0; i < list.length; i++) {
          if (this.optIn(option, list, obj, keys, keymatchtype)) {
            return i;
          }
        }
      } else if (list) {
        return list.indexOf(option);
      }

      return -1;
    },
    thingIndex: function thingIndex() {
      var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          option = _ref8.option,
          list = _ref8.list,
          obj = _ref8.obj,
          _ref8$keys = _ref8.keys,
          keys = _ref8$keys === void 0 ? ['uuid', '_id', 'id'] : _ref8$keys,
          keymatchtype = _ref8.keymatchtype,
          strings = _ref8.strings,
          _ref8$vue = _ref8.vue,
          vue = _ref8$vue === void 0 ? vue : _ref8$vue;

      if (_typeof(option) === 'object') {
        obj = true;
      }

      if (obj && list && keys) {
        var index = this.thingIn({
          option: option,
          list: list,
          obj: obj,
          keys: keys,
          keymatchtype: keymatchtype,
          strings: strings,
          retIndex: true
        });
        return index;
      } else if (list) {
        return list.indexOf(option);
      }

      return -1;
    },
    pushOpt: function pushOpt(option) {
      var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getsmart(stringList);
      var obj = arguments.length > 2 ? arguments[2] : undefined;
      var keys = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ['uuid', '_id', 'id'];
      var keymatchtype = arguments.length > 4 ? arguments[4] : undefined;
      var index = arguments.length > 5 ? arguments[5] : undefined;

      if (_typeof(list) == 'object' && !this.optIn(option, list, obj, keys, keymatchtype)) {
        if (this.getsmart(local.vue, 'reactiveSetter', false) || this.getsmart(local.vue, 'store', false)) {
          list.splice(list.length, 0, option);

          if (!localStorage.getItem('vuexWriteLock') && typeof this.getsmart(window, '$store.commit', undefined) == 'function') {
            window.$store.commit('thing');
          }
        } else {
          list.push(option);
        }
      }

      return index ? this.optIn(option, list, obj, keys, keymatchtype, index) : this.optIn(option, list, obj, keys, keymatchtype, index);
    },
    pushThing: function pushThing() {
      var _ref9 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          option = _ref9.option,
          _ref9$list = _ref9.list,
          list = _ref9$list === void 0 ? this.getsmart(stringList) : _ref9$list,
          obj = _ref9.obj,
          _ref9$keys = _ref9.keys,
          keys = _ref9$keys === void 0 ? ['uuid', '_id', 'id'] : _ref9$keys,
          keymatchtype = _ref9.keymatchtype,
          _ref9$vue = _ref9.vue,
          vue = _ref9$vue === void 0 ? vue : _ref9$vue;

      if (_typeof(list) == 'object' && !this.thingIn({
        option: option,
        list: list,
        obj: obj,
        keys: keys,
        keymatchtype: keymatchtype
      })) {
        if (this.getsmart(local.vue, 'reactiveSetter', false) || this.getsmart(local.vue, 'store', false)) {
          list.splice(list.length, 0, option);

          if (!localStorage.getItem('vuexWriteLock') && typeof this.getsmart(window, '$store.commit', undefined) == 'function') {
            window.$store.commit('thing');
          }
        } else {
          list.push(option);
        }
      }
    },
    pushOpts: function pushOpts(options) {
      var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getsmart(stringList);
      var obj = arguments.length > 2 ? arguments[2] : undefined;
      var keys = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ['uuid', '_id', 'id'];
      var keymatchtype = arguments.length > 4 ? arguments[4] : undefined;
      if (!(options instanceof Array)) return;
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = options[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var option = _step6.value;
          this.pushOpt(option, list, obj, keys, keymatchtype);
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
            _iterator6["return"]();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }
    },
    pushThings: function pushThings() {
      var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          options = _ref10.options,
          _ref10$list = _ref10.list,
          list = _ref10$list === void 0 ? this.getsmart(stringList) : _ref10$list,
          obj = _ref10.obj,
          _ref10$keys = _ref10.keys,
          keys = _ref10$keys === void 0 ? ['uuid', '_id', 'id'] : _ref10$keys,
          keymatchtype = _ref10.keymatchtype,
          _ref10$vue = _ref10.vue,
          vue = _ref10$vue === void 0 ? vue : _ref10$vue;

      if (!(options instanceof Array)) return;
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = options[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var option = _step7.value;
          this.pushThing({
            option: option,
            list: list,
            obj: obj,
            keys: keys,
            keymatchtype: keymatchtype
          });
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
            _iterator7["return"]();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }
    },
    popOpt: function popOpt(option) {
      var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getsmart(stringList);
      var obj = arguments.length > 2 ? arguments[2] : undefined;
      var keys = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ['uuid', '_id', 'id'];
      var keymatchtype = arguments.length > 4 ? arguments[4] : undefined;

      if (_typeof(list) == 'object' && this.optIn(option, list, obj, keys, keymatchtype)) {
        list.splice(this.optIndex(option, list, obj, keys, keymatchtype), 1);

        if (this.getsmart(local.vue, 'reactiveSetter', false) || this.getsmart(local.vue, 'store', false)) {
          if (!localStorage.getItem('vuexWriteLock') && typeof this.getsmart(window, '$store.commit', undefined) == 'function') {
            window.$store.commit('thing');
          }
        }
      }
    }
  }, _defineProperty(_ref16, "popThing", function popThing() {
    var _ref11 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        option = _ref11.option,
        _ref11$list = _ref11.list,
        list = _ref11$list === void 0 ? this.getsmart(stringList) : _ref11$list,
        _ref11$obj = _ref11.obj,
        obj = _ref11$obj === void 0 ? true : _ref11$obj,
        _ref11$keys = _ref11.keys,
        keys = _ref11$keys === void 0 ? ['uuid', '_id', 'id'] : _ref11$keys,
        keymatchtype = _ref11.keymatchtype,
        _ref11$vue = _ref11.vue,
        vue = _ref11$vue === void 0 ? vue : _ref11$vue;

    if (_typeof(list) == 'object' && this.thingIn({
      option: option,
      list: list,
      obj: obj,
      keys: keys,
      keymatchtype: keymatchtype
    })) {
      list.splice(this.thingIndex({
        option: option,
        list: list,
        obj: obj,
        keys: keys,
        keymatchtype: keymatchtype
      }), 1);

      if (this.getsmart(local.vue, 'reactiveSetter', false) || this.getsmart(local.vue, 'store', false)) {
        if (!localStorage.getItem('vuexWriteLock') && typeof this.getsmart(window, '$store.commit', undefined) == 'function') {
          window.$store.commit('thing');
        }
      }
    }
  }), _defineProperty(_ref16, "popOpts", function popOpts(options) {
    var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getsmart(stringList);
    var obj = arguments.length > 2 ? arguments[2] : undefined;
    var keys = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ['uuid', '_id', 'id'];
    var keymatchtype = arguments.length > 4 ? arguments[4] : undefined;
    if (!(options instanceof Array)) return;
    var _iteratorNormalCompletion8 = true;
    var _didIteratorError8 = false;
    var _iteratorError8 = undefined;

    try {
      for (var _iterator8 = options[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
        var option = _step8.value;
        this.popOpt(option, list, obj, keys, keymatchtype);
      }
    } catch (err) {
      _didIteratorError8 = true;
      _iteratorError8 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
          _iterator8["return"]();
        }
      } finally {
        if (_didIteratorError8) {
          throw _iteratorError8;
        }
      }
    }
  }), _defineProperty(_ref16, "popThings", function popThings() {
    var _ref12 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        options = _ref12.options,
        _ref12$list = _ref12.list,
        list = _ref12$list === void 0 ? this.getsmart(stringList) : _ref12$list,
        _ref12$obj = _ref12.obj,
        obj = _ref12$obj === void 0 ? true : _ref12$obj,
        _ref12$keys = _ref12.keys,
        keys = _ref12$keys === void 0 ? ['uuid', '_id', 'id'] : _ref12$keys,
        keymatchtype = _ref12.keymatchtype,
        _ref12$vue = _ref12.vue,
        vue = _ref12$vue === void 0 ? vue : _ref12$vue;

    if (!(options instanceof Array)) return;
    var _iteratorNormalCompletion9 = true;
    var _didIteratorError9 = false;
    var _iteratorError9 = undefined;

    try {
      for (var _iterator9 = options[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
        var option = _step9.value;
        this.popOpt(option, list, obj, keys, keymatchtype);
      }
    } catch (err) {
      _didIteratorError9 = true;
      _iteratorError9 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
          _iterator9["return"]();
        }
      } finally {
        if (_didIteratorError9) {
          throw _iteratorError9;
        }
      }
    }
  }), _defineProperty(_ref16, "toggleOpt", function toggleOpt(option) {
    var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getsmart(stringList);
    var obj = arguments.length > 2 ? arguments[2] : undefined;
    var keys = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ['uuid', '_id', 'id'];
    var keymatchtype = arguments.length > 4 ? arguments[4] : undefined;

    if (this.optIn(option, list, obj, keys, keymatchtype)) {
      this.popOpt(option, list, obj, keys, keymatchtype);
    } else {
      this.pushOpt(option, list, obj, keys, keymatchtype);
    }
  }), _defineProperty(_ref16, "toggleThing", function toggleThing() {
    var _ref13 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        option = _ref13.option,
        _ref13$list = _ref13.list,
        list = _ref13$list === void 0 ? this.getsmart(stringList) : _ref13$list,
        _ref13$obj = _ref13.obj,
        obj = _ref13$obj === void 0 ? true : _ref13$obj,
        _ref13$keys = _ref13.keys,
        keys = _ref13$keys === void 0 ? ['uuid', '_id', 'id'] : _ref13$keys,
        keymatchtype = _ref13.keymatchtype,
        _ref13$vue = _ref13.vue,
        vue = _ref13$vue === void 0 ? vue : _ref13$vue;

    if (this.optIn(option, list, obj, keys, keymatchtype)) {
      this.popOpt(option, list, obj, keys, keymatchtype);
    } else {
      this.pushOpt(option, list, obj, keys, keymatchtype);
    }
  }), _defineProperty(_ref16, "toggleOpts", function toggleOpts(options) {
    var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getsmart(stringList);
    var obj = arguments.length > 2 ? arguments[2] : undefined;
    var keys = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ['uuid', '_id', 'id'];
    var keymatchtype = arguments.length > 4 ? arguments[4] : undefined;
    if (!(options instanceof Array)) return;

    for (var option in options) {
      this.toggleOpt(option, list, obj, keys, keymatchtype);
    }
  }), _defineProperty(_ref16, "toggleThings", function toggleThings() {
    var _ref14 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        options = _ref14.options,
        _ref14$list = _ref14.list,
        list = _ref14$list === void 0 ? this.getsmart(stringList) : _ref14$list,
        _ref14$obj = _ref14.obj,
        obj = _ref14$obj === void 0 ? true : _ref14$obj,
        _ref14$keys = _ref14.keys,
        keys = _ref14$keys === void 0 ? ['uuid', '_id', 'id'] : _ref14$keys,
        keymatchtype = _ref14.keymatchtype,
        _ref14$vue = _ref14.vue,
        vue = _ref14$vue === void 0 ? vue : _ref14$vue;

    if (!(options instanceof Array)) return;

    for (var option in options) {
      if (this.optIn(option, list, obj, keys, keymatchtype)) {
        this.popOpt(option, list, obj, keys, keymatchtype);
      } else {
        this.pushOpt(option, list, obj, keys, keymatchtype);
      }
    }
  }), _defineProperty(_ref16, "ratchetOpt", function ratchetOpt(option, list, obj) {// find(obj, property, equals){
    // 	if(this.getsmart(obj, 'constructor', undefined) == Array){
    // 		for(var i=0; i<obj.length; i++){
    // 			find(obj[i], )
    // 		}
    // 	}
    // },

    var keys = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ['uuid', '_id', 'id'];
    var keymatchtype = arguments.length > 4 ? arguments[4] : undefined;
  }), _defineProperty(_ref16, "getsmart", function getsmart(obj, property, defaultValue, context) {
    if (!property && obj && typeof obj == 'string') {
      property = obj.split(".");

      try {
        obj = eval(property[0]);
      } catch (err) {
        // console.error(err)
        obj = property[0];
      }

      property = property.slice(1, property.length);
    }

    if (!property) {
      if (context) {
        return {
          value: defaultValue,
          undefined: true
        };
      } else {
        return defaultValue;
      }
    } // If the property list is in dot notation, convert to array


    if (typeof property == "string") {
      property = property.split(".");
    } else if (this.getsmart(property, 'constructor', false) !== Array) {
      if (context) {
        return {
          value: defaultValue,
          undefined: true,
          err: 'properties path @property argument was not passed properly'
        };
      } else {
        return defaultValue;
      }
    } // In order to avoid constantly checking the type of the property
    // we separate the real logic out into an inner function.


    var deepGetByArray = function deepGetByArray(obj, propsArray, defaultValue) {
      // If we have reached an undefined/null property
      // then stop executing and return the default value.
      // If no default was provided it will be undefined.
      if (!propsArray || typeof obj == 'undefined' || obj == null) {
        if (context) {
          return {
            value: defaultValue,
            undefined: true
          };
        } else {
          return defaultValue;
        }
      } // If the path array has no more elements, we've reached
      // the intended property and return its value


      if (propsArray.length === 0) {
        if (context) {
          return {
            value: obj,
            undefined: false
          };
        } else {
          return obj;
        }
      } // Prepare our found property and path array for recursion


      var nextObj = obj[propsArray[0]];
      var remainingProps = propsArray.slice(1);
      return deepGetByArray(nextObj, remainingProps, defaultValue);
    };

    return deepGetByArray(obj, property, defaultValue);
  }), _defineProperty(_ref16, "setsmart", function setsmart(obj, property, value, context) {
    if (!property && typeof obj == 'string') {
      property = obj.split(".");

      try {
        obj = eval(property[0]);
      } catch (err) {
        // console.error(err)
        obj = property[0];
      }

      property = property.slice(1, property.length);
    } // If the property list is in dot notation, convert to array


    if (typeof property == "string") {
      property = property.split(".");
    } else if (this.getsmart(property, 'constructor', false) !== Array) {
      if (context) {
        return {
          value: value,
          undefined: true,
          err: 'properties path @property argument was not passed properly'
        };
      } else {
        return value;
      }
    } // if no obj make obj


    if (!obj) obj = {}; // switch contexts

    var that = this; // In order to avoid constantly checking the type of the property
    // we separate the real logic out into an inner function.

    var deepGetByArray = function deepGetByArray(obj, propsArray, value) {
      // If the path array has only 1 more element, we've reached
      // the intended property and set its value
      if (propsArray.length == 1) {
        if (that.getsmart(vue, 'reactiveSetter', false) && that.$set && obj) {
          that.$set(obj, propsArray[0], value);

          if (typeof that.getsmart(window, '$store.commit', undefined) == 'function') {
            window.$store.commit('thing');
          }
        } else {
          obj[propsArray[0]] = value;

          if (that.getsmart(vue, 'store', false) && typeof that.getsmart(window, '$store.commit', undefined) == 'function') {
            window.$store.commit('thing');
          }
        }

        if (context) {
          return {
            value: obj[propsArray[0]],
            undefined: false
          };
        } else {
          return obj[propsArray[0]];
        }
      } // Prepare our path array for recursion


      var remainingProps = propsArray.slice(1); // check if next prop is 

      if (_typeof(obj[propsArray[0]]) !== 'object') {
        // If we have reached an undefined/null property
        if (that.getsmart(vue, 'reactiveSetter', false) && that.$set && obj) {
          that.$set(obj, propsArray[0], {});

          if (typeof that.getsmart(window, '$store.commit', undefined) == 'function') {
            window.$store.commit('thing');
          }
        } else {
          obj[propsArray[0]] = {};

          if (that.getsmart(vue, 'store', false) && typeof that.getsmart(window, '$store.commit', undefined) == 'function') {
            window.$store.commit('thing');
          }
        }
      }

      return deepGetByArray(obj[propsArray[0]], remainingProps, value);
    };

    if (property) {
      return deepGetByArray(obj, property, value);
    } else {
      if (that.getsmart(vue, 'reactiveSetter', false) && that.$set && obj) {
        that.$set(obj, undefined, value);

        if (typeof that.getsmart(window, '$store.commit', undefined) == 'function') {
          window.$store.commit('thing');
        }
      } else {
        obj = value;

        if (that.getsmart(vue, 'store', false) && typeof that.getsmart(window, '$store.commit', undefined) == 'function') {
          window.$store.commit('thing');
        }
      }

      if (context) {
        return {
          value: obj,
          undefined: false,
          err: 'there were no properties passed'
        };
      } else {
        return obj;
      }
    }
  }), _defineProperty(_ref16, "gosmart", function gosmart(obj, property, value, context) {
    // stands for get or set smart
    var get = this.getsmart(obj, property, value, true);

    if (get.undefined) {
      get = this.setsmart(obj, property, get.value, context);
    } // return value from property path, either gotten or smartly set


    if (context) {
      return get;
    } else {
      return this.getsmart(get, 'value', get);
    }
  }), _defineProperty(_ref16, "vgosmart", function vgosmart(obj, property, value, context) {
    var _this2 = this;

    // stands for v-model get or set smart
    // return value from property path, either gotten or smartly set
    return {
      get: function get() {
        var get = _this2.getsmart(obj, property, value, true);

        if (get.undefined) {
          get = _this2.setsmart(obj, property, get.value, context);
        }

        if (context) {
          return get;
        } else {
          return _this2.getsmart(get, 'value', get);
        }
      },
      set: function set(val) {
        _this2.setsmart(obj, property, val);
      }
    };
  }), _defineProperty(_ref16, "getsmartval", function getsmartval(obj, property, defaultValue) {
    // get the value of a property path based off its type
    var target = this.getsmart(obj, property, defaultValue);

    if (target && target.type) {
      if (target[target.type]) {
        return target[target.type];
      } else {
        return defaultValue;
      }
    } else if (target) {
      return target;
    }

    return defaultValue;
  }), _defineProperty(_ref16, "safestring", function safestring(something) {
    return this.jsmart.stringify(something || '');
  }), _defineProperty(_ref16, "safeparse", function safeparse(something) {
    return this.jsmart.parse(something || '');
  }), _defineProperty(_ref16, "mapsmart", function mapsmart(list) {
    var _this3 = this;

    var keyProperty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'title';
    var returnExistant = arguments.length > 2 ? arguments[2] : undefined;
    var populate = arguments.length > 3 ? arguments[3] : undefined;
    return new Promise(function (resolve, reject) {
      if (!keyProperty) {
        reject();
      } else if (list && typeof list.length == 'number') {
        if (list.length == 0) {
          if (returnExistant && _this3.getsmart(list, 'mapped.' + returnExistant, false) || !returnExistant) {
            resolve(true);
          } else if (returnExistant) {
            resolve(false);
          } else {
            resolve();
          }
        }

        if (!list.mapped || typeof list.mapped === 'boolean') {
          if (_this3.getsmart(local.vue, 'reactiveSetter', false) && _this3.$set && list) {
            _this3.$set(list, 'mapped', {});
          } else {
            list['mapped'] = {};
          }
        }

        for (var i = 0; i < list.length; i++) {
          if (typeof list[i] !== 'string') {
            if (_this3.getsmart(local.vue, 'reactiveSetter', false) && _this3.$set && list.mapped) {
              _this3.$set(list.mapped, list[i][keyProperty], list[i]);
            } else {
              list['mapped'][list[i][keyProperty]] = list[i];
            }

            if (i == list.length - 1) {
              if (returnExistant && _this3.getsmart(list, 'mapped.' + returnExistant, false) || !returnExistant) {
                resolve(true);
              } else if (returnExistant) {
                resolve(false);
              } else {
                resolve();
              }
            }
          } // else if(populate){
          //   var funCounter = this.funCounter
          //   this.funCounter = this.funCounter + 1
          //   this.getThing({
          //     thing: list[i],
          //     clientId: this._uid,
          //     funCounter
          //   })
          //   this.$options.sockets['giveThing'] = data => {
          //     if(this._uid == data.clientId && data.funCounter == funCounter){
          //       this.$set(list, i.toString(), data.thing)
          //       this.$set(list.mapped, list[i][keyProperty], list[i])
          //     }
          //     if(i==list.length-1){
          //       if((returnExistant && this.getsmart(list, 'mapped.'+returnExistant, false)) || !returnExistant){
          //         resolve(true)
          //       } else if(returnExistant) {
          //         resolve(false)
          //       } else {
          //         resolve()
          //       }
          //     }
          //   } 
          // } 
          else if (i == list.length - 1) {
              if (returnExistant && _this3.getsmart(list, 'mapped.' + returnExistant, false) || !returnExistant) {
                resolve(true);
              } else if (returnExistant) {
                resolve(false);
              } else {
                resolve();
              }
            }
        } // if(list.mapped && !list.mapped['agora-client-mapped']){
        //   this.$set(list.mapped, 'agora-client-mapped', true)
        // }

      }
    });
  }), _defineProperty(_ref16, "domval", function domval(thing) {
    return this.getsmart(thing, 'properties.description', '');
  }), _defineProperty(_ref16, "getThing", function getThing() {
    var _ref15 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        option = _ref15.option,
        _ref15$list = _ref15.list,
        list = _ref15$list === void 0 ? this.getsmart(objList) : _ref15$list,
        _ref15$obj = _ref15.obj,
        obj = _ref15$obj === void 0 ? true : _ref15$obj,
        _ref15$keys = _ref15.keys,
        keys = _ref15$keys === void 0 ? ['uuid', '_id', 'id'] : _ref15$keys,
        keymatchtype = _ref15.keymatchtype,
        strings = _ref15.strings,
        _ref15$defaultValue = _ref15.defaultValue,
        defaultValue = _ref15$defaultValue === void 0 ? undefined : _ref15$defaultValue,
        _ref15$vue = _ref15.vue,
        vue = _ref15$vue === void 0 ? vue : _ref15$vue;

    var index = this.thingIn(_objectSpread({}, arguments[0], {
      retIndex: true
    }));

    if (index >= 0) {
      return list[index];
    } else {
      return defaultValue;
    }
  }), _defineProperty(_ref16, "equal", function equal(obj1, obj2) {
    if (obj1 && obj2 && _typeof(obj1) == 'object' && _typeof(obj2) == 'object') {
      //Loop through properties in object 1
      for (var p in obj1) {
        //Check property exists on both objects
        if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;

        switch (_typeof(obj1[p])) {
          //Deep compare objects
          case 'object':
            if (!this.equal(obj1[p], obj2[p])) return false;
            break;
          //Compare function code

          case 'function':
            if (typeof obj2[p] == 'undefined' || p != 'compare' && obj1[p].toString() != obj2[p].toString()) return false;
            break;
          //Compare values

          default:
            if (obj1[p] != obj2[p]) return false;
        }
      } //Check object 2 for any extra properties


      for (var p in obj2) {
        if (typeof obj1[p] == 'undefined') return false;
      }

      return true;
    }
  }), _ref16;
};