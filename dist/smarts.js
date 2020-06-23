let merge = require('deepmerge');

let babel = require('@babel/core');

babel.generator = require('@babel/generator').default;

let uuid = require('uuid/v4');

module.exports = ({
  objList,
  stringList,
  reactiveSetter,
  vue
} = {}) => {
  var local = {
    objList,
    stringList,
    reactiveSetter,
    vue
  };
  var smarts = {
    getBabel() {
      return smarts.getBabel();
    },

    uuid,

    pause(value, opts) {
      return smarts.stringify(value, opts);
    },

    save(value, opts) {
      return smarts.stringify(value, opts);
    },

    stringify(value, opts = {}) {
      smarts.schema(opts, {
        stringifier: smarts.stringifier,

        // replace: eval('(function '+smarts.replace.toString().replace()+')'),
        replace(key, value) {
          if (opts.firstRun) {
            opts.firstRun = !opts.firstRun;
            return value;
          }

          var after = opts.stringifier(key, value, opts);

          switch (typeof after.value) {
            case 'object':
              if (after === null || after.value === null) {
                let ret = after.value;
                return ret;
              }

            // excluding the break; line makes object cases continue to the string case

            case 'string':
              let ret = opts.known.get(after.key) || smarts.setKnown(opts.known, opts.input, after);
              return ret;
          }

          return after.value;
        },

        strictFunctions: true,
        firstRun: undefined,
        known: new Map(),
        input: [],
        output: []
      }, {
        noSchemaClone: true
      });
      opts.virtual = opts.stringifier('', value, opts);

      for (i = parseInt(smarts.setKnown(opts.known, opts.input, opts.virtual)); i < opts.input.length; i++) {
        opts.firstRun = true;

        try {
          opts.output[i] = JSON.stringify(opts.input[i], opts.replace, opts.space);
          debug = 1;
        } catch (err) {
          console.error(err);
        }
      }

      return '[' + opts.output.join(',') + ']';
    },

    replace(key, value) {
      if (opts.firstRun) {
        opts.firstRun = !opts.firstRun;
        return value;
      }

      var after = opts.stringifier(key, value, opts);

      switch (typeof after.value) {
        case 'object':
          if (after === null) {
            let ret = after.value;
            return ret;
          }

        case 'string':
          let ret = opts.known.get(after.key) || smarts.setKnown(opts.known, opts.input, after);
          return ret;
      }

      return after.value;
    },

    setKnown(known, input, virtual) {
      var index = String(input.push(virtual.value) - 1);
      known.set(virtual.key, index);
      return index;
    },

    stringifier(key, val, opts) {
      let ret = {
        value: val,
        key: val
      };

      if (val instanceof Function && typeof val.toString === 'function' && (!opts.strictFunctions || typeof val.$scopes != 'undefined')) {
        let known = opts.known.get(ret.key);
        ret = {
          value: known || {
            type: 'function',
            $js: val.toString(),
            $scopes: val.$scopes,
            $context: val.$context
          },
          key: val
        };
        if (ret.value.$js == "function () { [native code] }") return;
        if (typeof known == "undefined") smarts.setKnown(opts.known, opts.input, ret);
      } else if (ret.value == Infinity && typeof ret.value != 'string') {
        let known = opts.known.get(ret.key);
        ret = {
          value: known || {
            type: 'number',
            $js: "Infinity",
            $scopes: [],
            $context: {}
          },
          key: val
        };
        if (typeof known == "undefined") smarts.setKnown(opts.known, opts.input, ret);
      }

      return ret;
    },

    primitives(value) {
      return value instanceof String ? String(value) : value;
    },

    Primitives(key, value) {
      return typeof value === "string" ? new String(value) : value;
    },

    play(text, opts) {
      return smarts.parse(text, opts);
    },

    load(text, opts) {
      return smarts.parse(text, opts);
    },

    parse(text, opts = {}) {
      smarts.schema(opts, {
        // parser: eval('(function '+smarts.parser+')'),
        parser: smarts.parser(opts),
        value: {},
        strictFunctions: true,
        firstPass: true,
        output: new Map()
      },
      /*opts*/
      {
        noSchemaClone: true
      });
      let altOpts = opts; // opts.parser = opts.parser.bind(opts)

      opts.input = JSON.parse(text, smarts.Primitives);
      opts.firstPass = false;
      opts.input = opts.input.map(smarts.primitives);
      opts.value = opts.input[0];
      let isObject = typeof opts.value === 'object' && opts.value;
      var tmp = isObject ? smarts.revive(opts.input, opts.output, opts.value, opts.parser, opts) : opts.value;
      opts.replaceMode = true;
      let ret = smarts.revive(opts.input, opts.output, tmp, opts.parser, opts);
      ret = opts.parser('', tmp, opts);
      return ret;
    },

    createScopedEval(uuid) {
      let ret =
      /*javascript*/
      "\n\t\t\t\tfunction createScopedEval(".concat(uuid, "){\n\t\t\t\t\t\n\t\t\t\t\t// scopeCode\n\t\t\t\t\t").concat(uuid, ".scopeCode = ").concat(uuid, ".scopeCode || ").concat(uuid, ".smarts.getBabel().template.ast('try{}catch(err){console.log(err)}')\n\t\t\t\t\t").concat(uuid, ".previousScopeCode = ").concat(uuid, ".currentScopeCode || ").concat(uuid, ".scopeCode\n\t\t\t\t\t").concat(uuid, ".currentScopeCode = ").concat(uuid, ".scopeCode.block.body.length ? ").concat(uuid, ".smarts.getBabel().template.ast('try{}catch(err){console.log(err)}') : ").concat(uuid, ".scopeCode\n\t\t\t\t\tif(").concat(uuid, ".previousScopeCode != ").concat(uuid, ".currentScopeCode){\n\t\t\t\t\t\t").concat(uuid, ".previousScopeCode.block.body.push(\n\t\t\t\t\t\t\t").concat(uuid, ".currentScopeCode\n\t\t\t\t\t\t)\n\t\t\t\t\t}\n\t\t\t\t\t").concat(uuid, ".closureIndex = ").concat(uuid, ".closureIndex || 0\n\t\t\t\t\t").concat(uuid, ".closure = ").concat(uuid, ".smarts.getsmart.bind(this)(").concat(uuid, ", ",
      /*javascript*/
      "`val.$scopes.${".concat(uuid, ".closureIndex}`"), ", {})\n\t\t\t\t\t").concat(uuid, ".variableKeys = Object.keys(").concat(uuid, ".closure)\n\t\t\t\t\t").concat(uuid, ".variableMap = ").concat(uuid, ".smarts.getsmart.bind(this)(").concat(uuid, ", ",
      /*javascript*/
      "`val.$context.$variableMaps.${".concat(uuid, ".closureIndex}`"), ", [])\n\t\t\t\t\t").concat(uuid, ".allowedIdentifiers = ['let','var','const']\n\t\t\t\t\t").concat(uuid, ".variableKeys.forEach((key)=>{\n\t\t\t\t\t\tif(\n\t\t\t\t\t\t\ttypeof ").concat(uuid, ".variableMap[key] == 'string' \n\t\t\t\t\t\t\t&& ").concat(uuid, ".allowedIdentifiers.indexOf(").concat(uuid, ".variableMap[key]) >= 0\n\t\t\t\t\t\t){\n\t\t\t\t\t\t\ttry{\n\t\t\t\t\t\t\t\t").concat(uuid, ".currentScopeCode.block.body.push(\n\t\t\t\t\t\t\t\t\t").concat(uuid, ".smarts.getBabel().template.ast(\n\t\t\t\t\t\t\t\t\t\t",
      /*javascript*/
      "`\n\t\t\t\t\t\t\t\t\t\t\t${".concat(uuid, ".variableMap[key]} ${key} = ").concat(uuid, ".val.$scopes[${").concat(uuid, ".closureIndex}]['${key}']\n\t\t\t\t\t\t\t\t\t\t`"), "\n\t\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t}catch(err){console.log(1,err)}\n\t\t\t\t\t\t\ttry{\n\t\t\t\t\t\t\t\t").concat(uuid, ".currentScopeCode.block.body.push(\n\t\t\t\t\t\t\t\t\t").concat(uuid, ".smarts.getBabel().template.ast(\n\t\t\t\t\t\t\t\t\t\t",
      /*javascript*/
      "`\n\t\t\t\t\t\t\t\t\t\t\tObject.defineProperty(\n\t\t\t\t\t\t\t\t\t\t\t\t".concat(uuid, ".val.$scopes[${").concat(uuid, ".closureIndex}],\n\t\t\t\t\t\t\t\t\t\t\t\t${smarts.stringify(key)},\n\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\tget(){\n\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn ${key}\n\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\tset(val){\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t${key} = val\n\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\tenumerable: true\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t\t\t\t`"), "\n\t\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t}catch(err){console.log(2,err)}\n\t\t\t\t\t\t}\n\t\t\t\t\t\t// console.log(").concat(uuid, ".scopeCode)\n\t\t\t\t\t})\n\t\t\t\t\t// console.log(").concat(uuid, ".scopeCode)\n\t\t\t\t\t").concat(uuid, ".closureIndex++\n\t\t\t\t\tif(").concat(uuid, ".closureIndex >= ").concat(uuid, ".smarts.getsmart.bind(this)(").concat(uuid, ", 'val.$scopes.length', -1)){\n\t\t\t\t\t\t// console.log(").concat(uuid, ".scopeCode)\n\t\t\t\t\t\ttry{\n\t\t\t\t\t\t\t").concat(uuid, ".currentScopeCode.block.body.push(\n\t\t\t\t\t\t\t\t").concat(uuid, ".smarts.getBabel().template.ast(\n\t\t\t\t\t\t\t\t\t",
      /*javascript*/
      "`\n\t\t\t\t\t\t\t\t\t\treturn ${".concat(uuid, ".smarts.scopedEval('").concat(uuid, "')}\n\t\t\t\t\t\t\t\t\t`"), "\n\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t}catch(err){console.log(3,err)}\n\t\t\t\t\t\ttry{\n\t\t\t\t\t\t\t").concat(uuid, ".wrapper = ").concat(uuid, ".smarts.getBabel().template.ast(\n\t\t\t\t\t\t\t\t",
      /*javascript*/
      "`\n\t\t\t\t\t\t\t\t\tfunction anonymous(){}\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t`", "\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t}catch(err){console.log(4,err)}\n\t\t\t\t\t\t// console.log(").concat(uuid, ".wrapper)\n\t\t\t\t\t\t// console.log(").concat(uuid, ".scopeCode)\n\t\t\t\t\t\t").concat(uuid, ".wrapper.body.body.push(").concat(uuid, ".scopeCode)\n\t\t\t\t\t\t").concat(uuid, ".scopeCode = ").concat(uuid, ".wrapper\n\t\t\t\t\t\t").concat(uuid, ".scopeCode = ").concat(uuid, ".smarts.getBabel().generator(\n\t\t\t\t\t\t\t").concat(uuid, ".scopeCode\n\t\t\t\t\t\t).code\n\t\t\t\t\t\t// console.log(").concat(uuid, ".scopeCode)\n\t\t\t\t\t\t").concat(uuid, ".scopeCode = eval(\"(\"+").concat(uuid, ".scopeCode+\")\")\n\t\t\t\t\t\t// console.log(").concat(uuid, ".scopeCode.toString())\n\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\t").concat(uuid, ".val.$scopedEval = ").concat(uuid, ".scopeCode()\n\t\t\t\t\t\t}catch(err){console.log(5,err)}\n\t\t\t\t\t\t// console.log(").concat(uuid, ".val.$scopedEval)\n\t\t\t\t\t\t// return ").concat(uuid, ".scopeCode.toString()\n\t\t\t\t\t\treturn ").concat(uuid, ".val.$scopedEval\n\t\t\t\t\t} else {\n\t\t\t\t\t\treturn eval(",
      /*javascript*/
      "`(${".concat(uuid, ".smarts.createScopedEval('").concat(uuid, "')})`"), ")(").concat(uuid, ")\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t");
      return ret;
    },

    defineVariable(uuid) {
      return (
        /*javascript*/
        "\n\t\t\t\t".concat(uuid.variableType, "\t").concat(uuid.variableKey, " = ").concat(uuid, ".$scope[").concat(uuid, ".variableKey]\n\t\t\t\tObject.defineProperty(\n\t\t\t\t\t").concat(uuid, ".$scope, \n\t\t\t\t\t").concat(uuid, ".variableKey, \n\t\t\t\t\t{\n\t\t\t\t\t\tget(){\n\t\t\t\t\t\t\treturn ").concat(uuid.variableKey, "\n\t\t\t\t\t\t},\n\t\t\t\t\t\tset(val){\n\t\t\t\t\t\t\t").concat(uuid.variableKey, " = val\n\t\t\t\t\t\t},\n\t\t\t\t\t\tenumerable: true\n\t\t\t\t\t}\n\t\t\t\t)\n\t\t\t")
      );
    },

    scopedEval(uuid) {
      let ret =
      /*javascript*/
      "function scopedEval(".concat(uuid, "){\n\t\t\t\t\tif(typeof ").concat(uuid, " == 'string'){\n\t\t\t\t\t\t").concat(uuid, " = {\n\t\t\t\t\t\t\tval: {\n\t\t\t\t\t\t\t\t$js: ").concat(uuid, "\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t} else if(typeof ").concat(uuid, " == 'function' && typeof ").concat(uuid, ".toString == 'function'){\n\t\t\t\t\t\t").concat(uuid, " = {\n\t\t\t\t\t\t\tval: {\n\t\t\t\t\t\t\t\t$js: ").concat(uuid, ".toString()\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\ttry {\n\t\t\t\t\t\t").concat(uuid, ".ret = eval('('+").concat(uuid, ".val.$js+')')\n\t\t\t\t\t} catch(err1){\n\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\t").concat(uuid, ".ret = eval('({'+").concat(uuid, ".val.$js+'})')\n\t\t\t\t\t\t\t").concat(uuid, ".keys = Object.keys(").concat(uuid, ".ret)\n\t\t\t\t\t\t\t").concat(uuid, ".ret = ").concat(uuid, ".ret[").concat(uuid, ".keys[0]]\n\t\t\t\t\t\t} catch(err2){\n\t\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\t\t").concat(uuid, ".ret = eval('({b:'+ ").concat(uuid, ".val.$js +'})').b\n\t\t\t\t\t\t\t} catch(err3){\n\t\t\t\t\t\t\t\tconsole.error(err1)\n\t\t\t\t\t\t\t\tconsole.error(err2)\n\t\t\t\t\t\t\t\tconsole.error(err3)\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\treturn ").concat(uuid, ".ret\n\t\t\t\t}\n\t\t\t");
      return ret;
    },

    parser(opts) {
      return function (key, val) {
        if (val.$js && opts.replaceMode) {
          let ret = opts.input[opts.output.get(val)];
          if (typeof ret == val.type) return ret;
          let uuid = smarts.jsUUID();
          var fn;
          var scopedEval;

          if (val.$scopedEval && typeof val.$scopedEval == 'function') {
            scopedEval = val.$scopedEval;
          } else {
            var fns = smarts.createScopedEval(uuid);
            fn = eval("(".concat(fns, ")"));
            var input = {
              val,
              smarts
            };

            try {
              scopedEval = fn(input);
            } catch (err) {
              console.log(err);
            }
          }

          ret = scopedEval({
            val
          });

          try {
            Object.defineProperty(ret, '$scopes', {
              value: val.$scopes,
              enumerable: true
            });
          } catch (err) {
            if (opts.verbose) console.error(err);
          }

          try {
            Object.defineProperty(ret, '$context', {
              value: val.$context,
              enumerable: true
            });
          } catch (err) {
            if (opts.verbose) console.error(err);
          }

          try {
            Object.defineProperty(ret, '$scopedEval', {
              value: scopedEval,
              enumerable: true
            });
          } catch (err) {
            if (opts.verbose) console.error(err);
          }

          opts.input[opts.output.get(val)] = ret;
          return ret;
        }

        return smarts.Primitives(key, val);
      };
    },

    revive(input, parsed, output, parser, opts) {
      return Object.keys(output).reduce((output, key) => {
        var value = output[key]; // if the value hasn't been revived yet

        if (value instanceof String) {
          var tmp = input[value];

          if (typeof tmp === 'object' && !parsed.get(tmp)) {
            parsed.set(tmp, value);
            output[key] = smarts.primitives(parser(key, smarts.revive(input, parsed, tmp, parser, opts)));
          } else {
            try {
              output[key] = smarts.primitives(parser(key, tmp));
            } catch (err) {
              delete output[key];
            }
          }
        } else {
          try {
            if (opts.replaceMode) {
              // output[key] = smarts.primitives(parser(key, smarts.revive(input, parsed, value, parser, opts)))
              value = parser(key, value);

              if (typeof value === 'object' // && !parsed.get(value)
              ) {
                  // parsed.set(value, value)
                  output[key] = smarts.primitives(parser(key, smarts.revive(input, parsed, value, parser, opts)));
                } else {
                try {
                  output[key] = smarts.primitives(value);
                } catch (err) {
                  delete output[key];
                }
              }
            } else {
              output[key] = smarts.primitives(parser(key, value));
            }
          } catch (err) {
            delete output[key];
          }
        }

        return output;
      }, output);
    },

    jsUUID(prefix = 'uuid') {
      return prefix + smarts.uuid().replace(/-/g, '');
    },

    context(opts) {
      let uuid = smarts.gosmart.bind(this)(opts, 'path.context.scope.uuid', smarts.jsUUID());
      return eval(
      /*javascript*/
      "\n\t\t\t\t(\n\t\t\t\t\tfunction(){\n\t\t\t\t\t\t".concat(smarts.contextObject(uuid), "\n\t\t\t\t\t\treturn ").concat(uuid, "\n\t\t\t\t\t}\n\t\t\t\t)()\n\t\t\t"));
    },

    contextObject(uuid) {
      return (
        /*javascript*/
        "\n\t\t\t\tlet ".concat(uuid, " = {\n\t\t\t\t\t$$uuid: '").concat(uuid, "',\n\t\t\t\t\t$closure: {},\n\t\t\t\t\t$variableMap: {},\n\t\t\t\t\t$functionScoper: (func)=>{\n\t\t\t\t\t\tObject.defineProperty(\n\t\t\t\t\t\t\tfunc,\n\t\t\t\t\t\t\t'$scopes', \n\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\tvalue: (function(arr){\n\t\t\t\t\t\t\t\t\tfor (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { \n\t\t\t\t\t\t\t\t\t\tarr2[i] = arr[i]; \n\t\t\t\t\t\t\t\t\t} \n\t\t\t\t\t\t\t\t\treturn arr2\n\t\t\t\t\t\t\t\t})((typeof ").concat(uuid, " != 'undefined') ? ").concat(uuid, ".$scopes : []),\n\t\t\t\t\t\t\t\tenumerable: true\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t)\n\t\t\t\t\t\tObject.defineProperty(\n\t\t\t\t\t\t\tfunc,\n\t\t\t\t\t\t\t'$context',\n\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\tvalue: ").concat(uuid, "\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t)\n\t\t\t\t\t\treturn func\n\t\t\t\t\t},\n\t\t\t\t\t$add: (type, name, value)=>{\n\t\t\t\t\t\t").concat(uuid, ".$closure[name] = value\n\t\t\t\t\t\t").concat(uuid, ".$variableMap[name] = type\n\t\t\t\t\t},\n\t\t\t\t\t$scopes: (function(arr){\n\t\t\t\t\t\tfor (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { \n\t\t\t\t\t\t\tarr2[i] = arr[i]; \n\t\t\t\t\t\t} \n\t\t\t\t\t\treturn arr2\n\t\t\t\t\t})((typeof $context == 'object') ? $context.$scopes : []),\n\t\t\t\t\t$variableMaps: (function(arr){\n\t\t\t\t\t\tfor (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { \n\t\t\t\t\t\t\tarr2[i] = arr[i]; \n\t\t\t\t\t\t} \n\t\t\t\t\t\treturn arr2\n\t\t\t\t\t})((typeof $context == 'object') ? $context.$variableMaps : []),\n\t\t\t\t\t$contexts: {},\n\t\t\t\t\t$contextsList: [],\n\t\t\t\t\t$parentContexts: [],\n\t\t\t\t\t$contextStatus: \"var\",\n\t\t\t\t\t$mode: (eval(\"var ").concat(uuid, "1 = null\"), (typeof ").concat(uuid + "1", " === \"undefined\")) ? \"strict\" : \"non-strict\",\n\t\t\t\t}\n\t\t\t\t").concat(uuid, ".$functionScoper = ").concat(uuid, ".$functionScoper(").concat(uuid, ".$functionScoper)\n\t\t\t\t").concat(uuid, ".$scopes.splice(0,0,").concat(uuid, ".$closure)\n\t\t\t\t").concat(uuid, ".$variableMaps.splice(0,0,").concat(uuid, ".$variableMap)\n\t\t\t\tvar globalThis = globalThis || global || window || {}\n\t\t\t\t").concat(uuid, ".$contextStatus = ").concat(uuid, ".$mode == 'strict' ? '' : 'var'\n\t\t\t\ttry { \n\t\t\t\t\teval(",
        /*javascript*/
        "`${".concat(uuid, ".$contextStatus} $context = $context || ").concat(uuid, "`"), ")\n\t\t\t\t} catch(err){\n\t\t\t\t\t").concat(uuid, ".$contextStatus = ''\n\t\t\t\t}\n\t\t\t\teval(",
        /*javascript*/
        "`${".concat(uuid, ".$contextStatus} $context = $context || ").concat(uuid, "`"), ")\n\t\t\t\tif(typeof $context == 'object' && $context != ").concat(uuid, " && $context.$contexts instanceof Object){\n\t\t\t\t\t$context.$contexts[").concat(uuid, ".$$uuid] = $context.$contexts[").concat(uuid, ".$$uuid] || []\n\t\t\t\t\t").concat(uuid, ".$$instance = $context.$contexts[").concat(uuid, ".$$uuid].push(").concat(uuid, ")-1\n\t\t\t\t\t").concat(uuid, ".$parentContexts.push($context)\n\t\t\t\t\t$context.$contextsList.push(").concat(uuid, ")\n\t\t\t\t}\n\t\t\t\tif(!globalThis.$contexts){\n\t\t\t\t\tglobalThis.$contexts = {}\n\t\t\t\t\tglobalThis.$contexts[").concat(uuid, ".$$uuid] = [").concat(uuid, "]\n\t\t\t\t\tglobalThis.$contextsList = [").concat(uuid, "]\n\t\t\t\t\t").concat(uuid, ".$$instance = 0\n\t\t\t\t} else if(\n\t\t\t\t\tglobalThis.").concat(uuid, "s instanceof Object \n\t\t\t\t\t&& ").concat(uuid, ".$parentContexts.length == 0\n\t\t\t\t\t&& typeof ").concat(uuid, ".$$instance == 'undefined'\n\t\t\t\t){\n\t\t\t\t\tglobalThis.").concat(uuid, "s[").concat(uuid, ".$$uuid] = globalThis.$contexts[").concat(uuid, ".$$uuid] || []\n\t\t\t\t\t").concat(uuid, ".$$instance = globalThis.$contexts[").concat(uuid, ".$$uuid].push(").concat(uuid, ")-1\n\t\t\t\t\tglobalThis.$contextsList.push(").concat(uuid, ")\n\t\t\t\t}\n\t\t\t\t{\n\t\t\t\t\tlet $context = ").concat(uuid, "\n\t\t\t\t}\n\t\t\t")
      );
    },

    createContext(opts) {
      smarts.schema(opts, {
        wrapBody: true
      });
      let node = opts.aster(
      /*javascript*/
      "\n\t\t\t\t".concat(smarts.contextObject(opts.uuid), "\n\t\t\t"));
      node[0].declarations[0].contextDeclaration = true; // so the $functionScoper function doesn't get wrapped or have $context inserted

      let property3 = node[0].declarations[0].init.properties[3];
      property3.value.scoperWrapped = true;
      property3.value.body.scopeInitialized = true;
      let property3ScopesValue = property3.value.body.body[0].expression.arguments[2].properties[0].value;
      property3ScopesValue.callee.scoperWrapped = true;
      property3ScopesValue.callee.body.scopeInitialized = true;
      let property3ForStatement = property3ScopesValue.callee.body.body[0];
      property3ForStatement.body.scopeInitialized = true;
      property3ForStatement.init.declarations[0].inScope = true;
      property3ForStatement.init.declarations[1].inScope = true; // so the $add function doesn't get wrapped or have $context inserted

      let property4 = node[0].declarations[0].init.properties[4];
      property4.value.scoperWrapped = true;
      property4.value.body.scopeInitialized = true; // so the $scopes self-invoking function doesn't get wrapped or have $context inserted

      let property5 = node[0].declarations[0].init.properties[5];
      property5.value.callee.scoperWrapped = true;
      property5.value.callee.body.scopeInitialized = true;
      let property5ForStatement = property5.value.callee.body.body[0];
      property5ForStatement.body.scopeInitialized = true;
      property5ForStatement.init.declarations[0].inScope = true;
      property5ForStatement.init.declarations[1].inScope = true; // so the $variableMaps self-invoking function doesn't get wrapped or have $context inserted

      let property6 = node[0].declarations[0].init.properties[6];
      property6.value.callee.scoperWrapped = true;
      property6.value.callee.body.scopeInitialized = true;
      let property6ForStatement = property6.value.callee.body.body[0];
      property6ForStatement.body.scopeInitialized = true;
      property6ForStatement.init.declarations[0].inScope = true;
      property6ForStatement.init.declarations[1].inScope = true;
      node6 = node[6]; // make sure try statement block doesn't get scoped either

      node6.block.scopeInitialized = true; // make sure catch statement block doesn't get scoped either

      node6.handler.body.scopeInitialized = true;
      node8 = node[8]; // make sure if statement block doesn't get scoped either

      node8.consequent.scopeInitialized = true;
      node9 = node[9]; // make sure if statement block doesn't get scoped either

      node9.consequent.scopeInitialized = true; // make sure else if statement block doesn't get scoped either

      node9.alternate.consequent.scopeInitialized = true;
      node10 = node[10];
      node10.scopeInitialized = true;
      node10.inheritScope = true;
      node[node.length - 1].lastContextNode = true;

      if (opts.wrapBody) {
        let bodyWrapper = node[node.length - 1];
        bodyWrapper.body.push(...opts.path.node.body);
      }

      smarts.addBindingsToContext({ ...opts,
        node
      }); // let addContextToScopeNode = smarts.scopeVar({
      // 	uuid,
      // 	key: '$context',
      // 	type: 'let',
      // 	aster
      // })
      // wrapper.body.splice(1,0,addContextToScopeNode)	

      return node;
    },

    createInlineContext(opts) {
      let wrapperString =
      /*javascript*/
      "\n\t\t\t\tfor(let ".concat(opts.uuid, " = function(){\n\t\t\t\t\t// node goes here\n\t\t\t\t\treturn ").concat(opts.uuid, "\n\t\t\t\t}() ; a<1;a++){}\n\t\t\t");
      let inlineContextNode = opts.aster(wrapperString).init.declarations[0];
      let contextBody = smarts.createContext({ ...opts,
        wrapBody: false
      });
      inlineContextNode.init.callee.body.body.splice(0, 0, ...contextBody);
      inlineContextNode.contextDeclaration = true;
      return inlineContextNode;
    },

    addBindingsToContext(opts) {
      for (let key in opts.path.scope.bindings) {
        let binding = opts.path.scope.bindings[key];

        if (binding.kind == 'var') {
          let newNode = smarts.scopeVar({ ...opts,
            key,
            type: binding.kind
          });
          opts.node.splice(opts.node.length - 1, 0, newNode);
        }
      }
    },

    scopeVarCode(opts) {
      let ret =
      /*javascript*/
      "\n\t\t\t\tObject.defineProperty(\n\t\t\t\t\t".concat(opts.uuid, ".$closure,\n\t\t\t\t\t").concat(smarts.stringify(opts.key), ",\n\t\t\t\t\t{\n\t\t\t\t\t\tget(){\n\t\t\t\t\t\t\treturn ").concat(opts.key, "\n\t\t\t\t\t\t},\n\t\t\t\t\t\tset(val){\n\t\t\t\t\t\t\t").concat(opts.key, " = val\n\t\t\t\t\t\t},\n\t\t\t\t\t\tenumerable: true\n\t\t\t\t\t}\n\t\t\t\t) &&\n\t\t\t\t(").concat(opts.uuid, ".$variableMap[\"").concat(opts.key, "\"] = \"").concat(opts.type, "\")\n\t\t\t");
      return ret;
    },

    scopeVarInlineCode(opts) {
      let ret =
      /*javascript*/
      "\n\t\t\t\tlet ".concat(smarts.jsUUID(), " = (\n\t\t\t\t\t").concat(smarts.scopeVarCode(opts), "\n\t\t\t\t)\n\t\t\t");
      return ret;
    },

    scopeVar(opts = {}) {
      let string;
      let thirdArg;
      let node;

      if (opts.inline) {
        string = smarts.scopeVarInlineCode(opts);
        node = opts.aster(string);
        thirdArg = node.declarations[0].init.left.arguments[2];
        node.declarations[0].inScope = true;
      } else {
        string = smarts.scopeVarCode(opts);
        node = opts.aster(string);
        thirdArg = node.expression.left.arguments[2];
      }

      let getter = thirdArg.properties[0];
      let setter = thirdArg.properties[1];
      getter.body.scopeInitialized = true;
      setter.body.scopeInitialized = true;
      getter.body.scoperWrapped = true;
      setter.body.scoperWrapped = true;
      getter.scoperWrapped = true;
      setter.scoperWrapped = true;
      if (opts.inline) return node.declarations[0];
      return node;
    },

    functionWrapper(uuid, path, aster) {
      let wrapper = aster(
      /*javascript*/
      "\n\t\t\t\t".concat(uuid, ".$functionScoper()\n\t\t\t"));
      wrapper.expression.arguments.push(path.node);
      return wrapper;
    },

    bodyInsert(index, body, aster, ...things) {
      body.splice(index, 0, ...things);
      return things.length;
    },

    initBlock(path, aster) {
      if (!path.node.scopeInitialized) {
        path.node.scopeInitialized = true;
        let uuid = smarts.getPathUUID({
          path
        });
        let contextNode = smarts.createContext({
          uuid,
          aster,
          path
        });
        path.node.body = contextNode;
      }
    },

    getNodeUUID(opts) {
      if (opts.node && opts.node.type != 'BlockStatement' && opts.node.type != 'Program') return smarts.getNodeUUID({ ...opts,
        node: opts.node.body || opts.node.block
      });
      return smarts.gosmart.bind(this)(opts.node, 'uuid', smarts.jsUUID());
    },

    getPathUUID(opts) {
      if (opts.path.context.scope.path.node.inheritScope || opts.path.scope.path.node.inheritScope) return smarts.getPathUUID({ ...opts,
        path: opts.path.parentPath
      });
      return smarts.getNodeUUID({ ...opts,
        node: opts.path.context.scope.path.node
      });
    },

    babelPlugin(babel) {
      const t = babel.types;
      const aster = babel.template.ast;
      let metaVisitor = {
        Program(path) {
          smarts.initBlock(path, aster);
        },

        BlockStatement(path) {
          smarts.initBlock(path, aster);
        },

        ForInStatement(path) {
          path = path;
        },

        ObjectMethod(path) {
          let name = path.node.key.name;
          let replacement = aster(
          /*javascript*/
          "\n\t\t\t\t\t\tlet a = {\n\t\t\t\t\t\t\t".concat(name, ": function ").concat(name, "(){}\n\t\t\t\t\t\t}\n\t\t\t\t\t"));
          replacement = replacement.declarations[0].init.properties[0];
          replacement.value.body = path.node.body;
          replacement.value.params = path.node.params;
          path.replaceWith(replacement);
        },

        Function(path) {
          if (path.type != 'FunctionDeclaration' && !path.node.scoperWrapped && !path.node.body.scoperWrapped) {
            path.node.scoperWrapped = true;
            path.node.body.scoperWrapped = true;
            let uuid = smarts.getPathUUID({
              path
            });
            let replacement = smarts.functionWrapper(uuid, path, aster);
            path.replaceWith(replacement);
          }
        },

        FunctionDeclaration(path) {
          if (!path.node.scoped) {
            path.node.scoped = true;
            parentBlock = path.scope.parent;

            try {
              parentBlock.block.body.forEach((node, index) => {
                if (node.lastContextNode) {
                  let uuid = smarts.getPathUUID({
                    path
                  });
                  let newNode = aster(
                  /*javascript*/
                  "\n\t\t\t\t\t\t\t\t\t\t".concat(uuid, ".$functionScoper(").concat(path.node.id.name, ")\n\t\t\t\t\t\t\t\t\t"));
                  node.body.splice(1, 0, newNode);
                  throw new Error('break foreach');
                }
              });
            } catch (err) {}
          }
        },

        VariableDeclarator(path) {
          if (!path.node.inScope) {
            path.node.inScope = true;
            let parentPath = smarts.getsmart.bind(this)(path, 'parentPath', undefined);

            if ( // this is for inline let and const declarations in normal
            // js blocks
            (parentPath.node.kind == "let" || parentPath.node.kind == "const") && // we check the length of declarations because we only have to do inline replacement
            // if there's a chance another declaration might use a former one
            parentPath.node.declarations.length > 1 && !(parentPath.parentPath.node.type == 'ForInStatement' || parentPath.parentPath.node.type == 'ForOfStatement' || parentPath.parentPath.node.type == 'ForStatement')) {
              let uuid = smarts.getPathUUID({
                path
              });

              if (uuid) {
                let indexInParent = parentPath.node.declarations.indexOf(path.node);
                let newDeclaration = smarts.scopeVar({
                  aster,
                  inline: true,
                  uuid,
                  key: parentPath.node.declarations[indexInParent].id.name,
                  type: parentPath.node.kind
                });
                parentPath.node.declarations.splice(indexInParent + 1, 0, newDeclaration);
              }
            } else if ( // 
            (parentPath.node.kind == "let" || parentPath.node.kind == "var" || parentPath.node.kind == "const") && // only do this for singular declarations
            parentPath.node.declarations.length < 2 // and check if variable is declared inside a ForX statement
            && (parentPath.parentPath.node.type == 'ForInStatement' || parentPath.parentPath.node.type == 'ForOfStatement' || parentPath.parentPath.node.type == "ForStatement")) {
              let uuid = smarts.getPathUUID({
                path
              });

              if (uuid) {
                let indexInParent = parentPath.node.declarations.indexOf(path.node);
                let newNode = smarts.scopeVar({
                  aster,
                  uuid,
                  key: parentPath.node.declarations[indexInParent].id.name,
                  type: parentPath.node.kind
                });
                parentPath.parentPath.node.body.body.splice(0, 0, newNode);
              }
            } else if ( // this is a special case for when ForStatements get their own scope
            (parentPath.node.kind == "let" || parentPath.node.kind == "const") && // we check the length of declarations because we only have to do inline replacement
            // if there's a chance another declaration might use a former one
            parentPath.node.declarations.length > 1 && parentPath.parentPath.node.type == 'ForStatement') {
              // if the first declaration isn't our context declaration, insert one
              let uuid = smarts.gosmart.bind(this)(path, 'scope.uuid', smarts.jsUUID());

              if (!parentPath.node.declarations[0].contextDeclaration) {
                let inlineContextDeclaration = smarts.createInlineContext({
                  path,
                  uuid,
                  aster
                });
                parentPath.node.declarations.splice(0, 0, inlineContextDeclaration);
              }

              if (uuid) {
                let indexInParent = parentPath.node.declarations.indexOf(path.node);
                let newDeclaration = smarts.scopeVar({
                  aster,
                  inline: true,
                  uuid,
                  key: parentPath.node.declarations[indexInParent].id.name,
                  type: parentPath.node.kind
                });
                parentPath.node.declarations.splice(indexInParent + 1, 0, newDeclaration);
              }
            } else if (parentPath.node.kind == "let" || parentPath.node.kind == "const") {
              let uuid = smarts.getPathUUID({
                path
              });

              if (uuid) {
                let indexInParent = parentPath.node.declarations.indexOf(path.node);
                let newNode = smarts.scopeVar({
                  aster,
                  uuid,
                  key: parentPath.node.declarations[indexInParent].id.name,
                  type: parentPath.node.kind
                });
                parentPath.insertAfter(newNode);
              }
            } else if (false) {} else if (false) {} else {// let uuid = smarts.getPathUUID({path})
              // if(uuid){
              // 	let indexInParent = parentPath.node.declarations.indexOf(path.node)
              // 	let newNode = smarts.scopeVar({
              // 		aster, 
              // 		uuid,
              // 		key: parentPath.node.declarations[indexInParent].id.name,
              // 		type: parentPath.node.kind
              // 	})
              // 	parentPath.insertAfter(newNode)
              // }
            }
          }
        }

      };
      let ret = {
        visitor: metaVisitor // visitor: {
        // 	Program(path){
        // 		path.traverse(metaVisitor)
        // 	}
        // } 

      };
      return ret;
    },

    transform(src, opts = {}) {
      return smarts.getBabel().transform(src, {
        plugins: [smarts.babelPlugin],
        ...opts
      });
    },

    dupe(obj, opts = {}) {
      return smarts.parse(smarts.stringify(obj));
    },

    schema(obj1, obj2, opts = {}) {
      if (!opts.noSchemaClone) {
        obj2 = smarts.dupe(obj2, opts);
      }

      return smarts.create(obj1, obj2, {
        clone: false,
        ...opts
      });
    },

    create(obj1, obj2, opts) {
      /**
      	Object.assign just puts the properties of the object returned by merge() 
      	back into obj1 because merge() is not in-place
      	we use merge(obj2, obj1) so that obj1 properties are preferenced
       */
      return Object.assign(obj1, merge(obj2, obj1, {
        arrayMerge: function (store, saved) {
          return saved;
        },
        clone: true,
        // this clones properties and values // the return is always a cloned root object
        ...opts
      }));
    },

    merge(obj1, obj2, opts) {
      if (obj1 instanceof Array && typeof obj2 instanceof Array) {
        return smarts.arrayMerge(obj1, obj2, opts);
      } else {
        return Object.assign(obj1, merge(obj1, obj2, {
          arrayMerge: function (store, saved) {
            return saved;
          },
          clone: true,
          ...opts
        }));
      }
    },

    mergeArray(obj1, obj2, opts) {
      return merge(obj1, obj2, {
        arrayMerge: function (store, saved) {
          return saved;
        },
        clone: true,
        ...opts
      });
    },

    mod(args, mod) {
      return mod(args) || args;
    },

    // transform(value, fn, path, ret={}){
    // 	return smarts.forEach(value, fn, path, ret)
    // },
    deepForEach(value, fn, path, ret = {}, seens = {
      originals: [],
      clones: []
    }) {
      path = path || '';
      value = {
        '': value
      }; // if(!(typeof value == 'string' || typeof value == 'boolean' || typeof value == 'number')){
      // 	seens.originals.push(value)
      // }

      if (Array.isArray(value)) {
        smarts.forEachArray(value, fn, path, ret, seens);
      } else if (typeof value == 'object') {
        smarts.forEachObject(value, fn, path, ret, seens);
      }

      return ret[''];
    },

    forEachObject(obj, fn, path, ret, seens) {
      for (const key in obj) {
        const deepPath = path ? "".concat(path, ".").concat(key) : key;
        let primitive = typeof obj[key] == 'string' || typeof obj[key] == 'boolean' || typeof obj[key] == 'number';

        if (primitive || seens.originals.indexOf(obj[key]) < 0) {
          if (!primitive) {
            seens.originals.push(obj[key]);
          } // Note that we always use obj[key] because it might be mutated by forEach


          fn(obj[key], key, obj, deepPath, ret, seens);
          smarts.deepForEach(obj[key], fn, deepPath, ret, seens);
        }
      }
    },

    forEachArray(array, fn, path, ret = {}, seens) {
      array.forEach((value, index, arr) => {
        let primitive = typeof obj[key] == 'string' || typeof obj[key] == 'boolean' || typeof obj[key] == 'number';

        if (primitive || seens.originals.indexOf(value) < 0) {
          if (!primitive) {
            seens.originals.push(value);
          }

          const deepPath = "".concat(path, ".").concat(index);
          fn(value, index, arr, deepPath, ret, seens); // Note that we use arr[index] because it might be mutated by forEach

          smarts.deepForEach(arr[index], fn, deepPath, ret, seens);
        }
      });
    },

    popThing({
      option,
      list = smarts.getsmart.bind(this)(stringList),
      obj = true,
      keys = ['uuid', '_id', 'id'],
      keymatchtype,
      defaultValue = undefined,
      vue = vue
    } = {}) {
      if (typeof list == 'object' && smarts.thingIn({
        option,
        list,
        obj,
        keys,
        keymatchtype
      })) {
        return list[smarts.thingIndex({
          option,
          list,
          obj,
          keys,
          keymatchtype
        })];
      } else {
        return defaultValue;
      }
    },

    setThing({
      option,
      list = smarts.getsmart.bind(this)(objList),
      obj = true,
      keys = ['uuid', '_id', 'id'],
      keymatchtype,
      push,
      strings,
      targets,
      vue = vue
    } = {}) {
      let index = smarts.thingIndex({
        option,
        list,
        obj,
        keys,
        keymatchtype,
        strings
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
            let value = smarts.getsmart.bind(this)(option, targets[i], undefined);

            if (value) {
              smarts.setsmart.bind(this)(list[index], targets[i], value);
            }
          }
        } else {
          list.splice(index, 1, option);

          if (smarts.getsmart.bind(this)(local.vue, 'reactiveSetter', false) && smarts.getsmart.bind(this)(this, '$set', false)) {
            if (!localStorage.getItem('vuexWriteLock') && typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function') {
              window.$store.commit('graph/thing');
            }
          } else if (smarts.getsmart.bind(this)(local.vue, 'store', false) && !localStorage.getItem('vuexWriteLock') && typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function') {
            window.$store.commit('graph/thing');
          }
        } // list[index] = option

      } else if (push && list) {
        if (smarts.getsmart.bind(this)(local.vue, 'reactiveSetter', false) || smarts.getsmart.bind(this)(local.vue, 'store', false)) {
          list.splice(list.length, 0, option);

          if (!localStorage.getItem('vuexWriteLock') && typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function') {
            window.$store.commit('graph/thing');
          }
        } else {
          list.push(option);
        }

        index = list.length - 1;
      }

      return index;
    },

    setThings({
      options,
      list = smarts.getsmart.bind(this)(objList),
      obj = true,
      keys = ['uuid', '_id', 'id'],
      keymatchtype,
      push,
      async,
      vue = vue
    } = {}) {
      if (options && options instanceof Array && list) {
        for (let option of options) {
          if (async) {
            new Promise((resolve, reject) => {
              smarts.setThing({
                option,
                list,
                obj,
                keys,
                keymatchtype,
                push
              });
            });
          } else {
            smarts.setThing({
              option,
              list,
              obj,
              keys,
              keymatchtype,
              push
            });
          }
        }
      }

      return list;
    },

    optIn(option, list = smarts.getsmart.bind(this)(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype, index) {
      if (typeof option === 'object') {
        obj = true;
      }

      if (!obj && list && list.indexOf && list.indexOf(option) >= 0) {
        return index ? list.indexOf(option) : true;
      } else if (obj && list && typeof list.length == 'number') {
        for (var i = 0; i < list.length; i++) {
          if (!(keys && typeof keys.length == 'number')) return;

          for (var indKey = 0; indKey < keys.length; indKey++) {
            if (keymatchtype == 'broad') {
              if (list[i] && smarts.getsmart.bind(this)(list[i], keys[indKey], undefined) == smarts.getsmart.bind(this)(option, keys[indKey], undefined) && smarts.getsmart.bind(this)(list[i], keys[indKey], undefined) !== undefined) {
                return index ? i : true;
              } else if (list[i] && typeof list[i] == 'string' && list[i] == smarts.getsmart.bind(this)(option, keys[indKey], undefined) && smarts.getsmart.bind(this)(option, keys[indKey], undefined) !== undefined) {
                return index ? i : true;
              }
            } else {
              if (list[i] && smarts.getsmart.bind(this)(list[i], keys[indKey], undefined) == smarts.getsmart.bind(this)(option, keys[indKey], undefined) && smarts.getsmart.bind(this)(list[i], keys[indKey], undefined) !== undefined) {
                if (indKey == keys.length - 1) {
                  return index ? i : true;
                }
              } else if (list[i] && typeof list[i] == 'string' && list[i] == smarts.getsmart.bind(this)(option, keys[indKey], undefined) && smarts.getsmart.bind(this)(option, keys[indKey], undefined) !== undefined) {
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

    thingIn({
      option,
      list = smarts.getsmart.bind(this)(objList),
      obj = true,
      keys = ['uuid', '_id', 'id'],
      keymatchtype,
      strings,
      retIndex,
      vue = vue
    } = {}) {
      if (typeof option === 'object') {
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
              if (list[i] && smarts.getsmart.bind(this)(list[i], keys[indKey], undefined) == smarts.getsmart.bind(this)(option, keys[indKey], undefined) && smarts.getsmart.bind(this)(list[i], keys[indKey], undefined) !== undefined) {
                if (retIndex) {
                  return i;
                } else {
                  return true;
                }
              } else if (list[i] && typeof list[i] == 'string' && list[i] == smarts.getsmart.bind(this)(option, keys[indKey], undefined) && smarts.getsmart.bind(this)(option, keys[indKey], undefined) !== undefined) {
                if (retIndex) {
                  return i;
                } else {
                  return true;
                }
              }
            } else {
              if (list[i] && smarts.getsmart.bind(this)(list[i], keys[indKey], undefined) == smarts.getsmart.bind(this)(option, keys[indKey], undefined) && smarts.getsmart.bind(this)(list[i], keys[indKey], undefined) !== undefined) {
                if (indKey == keys.length - 1) {
                  if (retIndex) {
                    return i;
                  } else {
                    return true;
                  }
                }
              } else if (list[i] && typeof list[i] == 'string' && list[i] == smarts.getsmart.bind(this)(option, keys[indKey], undefined) && smarts.getsmart.bind(this)(option, keys[indKey], undefined) !== undefined) {
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

    optsIn(options, list = smarts.getsmart.bind(this)(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype) {
      if (!(options instanceof Array)) return true;

      for (let option of options) {
        // if(typeof option === 'object'){
        //   obj = true
        // }
        if (!obj && list && list.indexOf && list.indexOf(option) >= 0) {// return true
        } else if (obj && list) {
          for (var i = 0; i < list.length; i++) {
            if (!smarts.optIn(option, list[i], obj, keys, keymatchtype)) {
              return false;
            }
          }
        } else {
          return false;
        }
      }

      return true;
    },

    thingsIn({
      options,
      list = smarts.getsmart.bind(this)(stringList),
      obj,
      keys = ['uuid', '_id', 'id'],
      keymatchtype,
      vue = vue
    } = {}) {
      if (!(options instanceof Array)) return true;

      for (let option of options) {
        // if(typeof option === 'object'){
        //   obj = true
        // }
        if (!obj && list && list.indexOf && list.indexOf(option) >= 0) {// return true
        } else if (obj && list && typeof list.length == 'number') {
          for (var i = 0; i < list.length; i++) {
            if (!smarts.optIn(option, list[i], obj, keys, keymatchtype)) {
              return false;
            }
          }
        } else {
          return false;
        }
      }

      return true;
    },

    anyOptsIn(options, list = smarts.getsmart.bind(this)(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype) {
      if (!(options instanceof Array)) return false;

      for (let option of options) {
        // if(typeof option === 'object'){
        //   obj = true
        // }
        if (!obj && list && list.indexOf && list.indexOf(option) >= 0) {
          return true;
        } else if (obj && list && typeof list.length == 'number') {
          for (var i = 0; i < list.length; i++) {
            if (smarts.optIn(option, list[i], obj, keys, keymatchtype)) {
              return true;
            }
          }
        }
      }

      return false;
    },

    anyThingsIn({
      options,
      list = smarts.getsmart.bind(this)(stringList),
      obj,
      keys = ['uuid', '_id', 'id'],
      keymatchtype,
      vue = vue
    } = {}) {
      if (!(options instanceof Array)) return false;

      for (let option of options) {
        // if(typeof option === 'object'){
        //   obj = true
        // }
        if (!obj && list && list.indexOf && list.indexOf(option) >= 0) {
          return true;
        } else if (obj && list && typeof list.length == 'number') {
          for (var i = 0; i < list.length; i++) {
            if (smarts.optIn(option, list[i], obj, keys, keymatchtype)) {
              return true;
            }
          }
        }
      }

      return false;
    },

    optIndex(option, list = smarts.getsmart.bind(this)(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype) {
      if (typeof option === 'object') {
        obj = true;
      }

      if (obj && list && keys && typeof list.length == 'number') {
        for (var i = 0; i < list.length; i++) {
          if (smarts.optIn(option, list, obj, keys, keymatchtype)) {
            return i;
          }
        }
      } else if (list) {
        return list.indexOf(option);
      }

      return -1;
    },

    thingIndex({
      option,
      list,
      obj,
      keys = ['uuid', '_id', 'id'],
      keymatchtype,
      strings,
      vue = vue
    } = {}) {
      if (typeof option === 'object') {
        obj = true;
      }

      if (obj && list && keys) {
        let index = smarts.thingIn({
          option,
          list,
          obj,
          keys,
          keymatchtype,
          strings,
          retIndex: true
        });
        return index;
      } else if (list) {
        return list.indexOf(option);
      }

      return -1;
    },

    pushOpt(option, list = smarts.getsmart.bind(this)(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype, index) {
      if (typeof list == 'object' && !smarts.optIn(option, list, obj, keys, keymatchtype)) {
        if (smarts.getsmart.bind(this)(local.vue, 'reactiveSetter', false) || smarts.getsmart.bind(this)(local.vue, 'store', false)) {
          list.splice(list.length, 0, option);

          if (!localStorage.getItem('vuexWriteLock') && typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function') {
            window.$store.commit('graph/thing');
          }
        } else {
          list.push(option);
        }
      }

      return index ? smarts.optIn(option, list, obj, keys, keymatchtype, index) : smarts.optIn(option, list, obj, keys, keymatchtype, index);
    },

    addOpt(option, list = smarts.getsmart.bind(this)(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype, index) {
      if (typeof list == 'object') {
        if (smarts.getsmart.bind(this)(local.vue, 'reactiveSetter', false) || smarts.getsmart.bind(this)(local.vue, 'store', false)) {
          list.splice(list.length, 0, option);

          if (!localStorage.getItem('vuexWriteLock') && typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function') {
            window.$store.commit('graph/thing');
          }
        } else {
          list.push(option);
        }
      }

      return index ? smarts.optIn(option, list, obj, keys, keymatchtype, index) : smarts.optIn(option, list, obj, keys, keymatchtype, index);
    },

    pushThing({
      option,
      list = smarts.getsmart.bind(this)(stringList),
      obj,
      keys = ['uuid', '_id', 'id'],
      keymatchtype,
      vue = vue
    } = {}) {
      if (typeof list == 'object' && !smarts.thingIn({
        option,
        list,
        obj,
        keys,
        keymatchtype
      })) {
        if (smarts.getsmart.bind(this)(local.vue, 'reactiveSetter', false) || smarts.getsmart.bind(this)(local.vue, 'store', false)) {
          list.splice(list.length, 0, option);

          if (!localStorage.getItem('vuexWriteLock') && typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function') {
            window.$store.commit('graph/thing');
          }
        } else {
          list.push(option);
        }
      }
    },

    pushOpts(options, list = smarts.getsmart.bind(this)(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype) {
      if (!(options instanceof Array)) return;

      for (let option of options) {
        smarts.pushOpt(option, list, obj, keys, keymatchtype);
      }
    },

    pushThings({
      options,
      list = smarts.getsmart.bind(this)(stringList),
      obj,
      keys = ['uuid', '_id', 'id'],
      keymatchtype,
      vue = vue
    } = {}) {
      if (!(options instanceof Array)) return;

      for (let option of options) {
        smarts.pushThing({
          option,
          list,
          obj,
          keys,
          keymatchtype
        });
      }
    },

    popOpt(option, list = smarts.getsmart.bind(this)(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype) {
      if (typeof list == 'object' && smarts.optIn(option, list, obj, keys, keymatchtype)) {
        list.splice(smarts.optIndex(option, list, obj, keys, keymatchtype), 1);

        if (smarts.getsmart.bind(this)(local.vue, 'reactiveSetter', false) || smarts.getsmart.bind(this)(local.vue, 'store', false)) {
          if (!localStorage.getItem('vuexWriteLock') && typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function') {
            window.$store.commit('graph/thing');
          }
        }
      }
    },

    popThing({
      option,
      list = smarts.getsmart.bind(this)(stringList),
      obj = true,
      keys = ['uuid', '_id', 'id'],
      keymatchtype,
      vue = vue
    } = {}) {
      if (typeof list == 'object' && smarts.thingIn({
        option,
        list,
        obj,
        keys,
        keymatchtype
      })) {
        list.splice(smarts.thingIndex({
          option,
          list,
          obj,
          keys,
          keymatchtype
        }), 1);

        if (smarts.getsmart.bind(this)(local.vue, 'reactiveSetter', false) || smarts.getsmart.bind(this)(local.vue, 'store', false)) {
          if (!localStorage.getItem('vuexWriteLock') && typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function') {
            window.$store.commit('graph/thing');
          }
        }
      }
    },

    popOpts(options, list = smarts.getsmart.bind(this)(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype) {
      if (!(options instanceof Array)) return;

      for (let option of options) {
        smarts.popOpt(option, list, obj, keys, keymatchtype);
      }
    },

    popThings({
      options,
      list = smarts.getsmart.bind(this)(stringList),
      obj = true,
      keys = ['uuid', '_id', 'id'],
      keymatchtype,
      vue = vue
    } = {}) {
      if (!(options instanceof Array)) return;

      for (let option of options) {
        smarts.popOpt(option, list, obj, keys, keymatchtype);
      }
    },

    toggleOpt(option, list = smarts.getsmart.bind(this)(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype) {
      if (smarts.optIn(option, list, obj, keys, keymatchtype)) {
        smarts.popOpt(option, list, obj, keys, keymatchtype);
      } else {
        smarts.pushOpt(option, list, obj, keys, keymatchtype);
      }
    },

    toggleThing({
      option,
      list = smarts.getsmart.bind(this)(stringList),
      obj = true,
      keys = ['uuid', '_id', 'id'],
      keymatchtype,
      vue = vue
    } = {}) {
      if (smarts.optIn(option, list, obj, keys, keymatchtype)) {
        smarts.popOpt(option, list, obj, keys, keymatchtype);
      } else {
        smarts.pushOpt(option, list, obj, keys, keymatchtype);
      }
    },

    toggleOpts(options, list = smarts.getsmart.bind(this)(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype) {
      if (!(options instanceof Array)) return;

      for (let option in options) {
        smarts.toggleOpt(option, list, obj, keys, keymatchtype);
      }
    },

    toggleThings({
      options,
      list = smarts.getsmart.bind(this)(stringList),
      obj = true,
      keys = ['uuid', '_id', 'id'],
      keymatchtype,
      vue = vue
    } = {}) {
      if (!(options instanceof Array)) return;

      for (let option in options) {
        if (smarts.optIn(option, list, obj, keys, keymatchtype)) {
          smarts.popOpt(option, list, obj, keys, keymatchtype);
        } else {
          smarts.pushOpt(option, list, obj, keys, keymatchtype);
        }
      }
    },

    // no use right now
    ratchetOpt(option, list, obj, keys = ['uuid', '_id', 'id'], keymatchtype) {// find(obj, property, equals){
      // 	if(smarts.getsmart.bind(this)(obj, 'constructor', undefined) == Array){
      // 		for(var i=0; i<obj.length; i++){
      // 			find(obj[i], )
      // 		}
      // 	}
      // },
    },

    getsmart(obj, property, defaultValue, context) {
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
        property = smarts.parsePropertyPath(property);
      } else if (smarts.getsmart.bind(this)(property, 'constructor', false) !== Array) {
        if (context) {
          return {
            value: defaultValue,
            undefined: true,
            err: 'properties path @property argument was not passed properly'
          };
        } else {
          return defaultValue;
        }
      }

      let deepGetByArray = deepGetByArrayUnbound.bind(this);
      return deepGetByArray(obj, property, defaultValue); // In order to avoid constantly checking the type of the property
      // we separate the real logic out into an inner function.

      function deepGetByArrayUnbound(obj, propsArray, defaultValue) {
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
      }
    },

    escapePropertyPath(path = "") {
      return "[\"" + path + "\"]";
    },

    epp(path = "") {
      return smarts.escapePropertyPath(path);
    },

    parsePropertyPath(path = "") {
      let array = [""];
      let readingArrayBasedPath = false;
      let i = 0;
      let push = false;

      while (i < path.length) {
        if (readingArrayBasedPath) {
          // we found the end of an array delimited path
          if (path[i] == "\"" && path[i + 1] == "]") {
            i += 1;
            readingArrayBasedPath = false;
            push = true;
          } else {
            array[array.length - 1] += path[i];
          }
        } else if (path[i] == '.') {
          push = true;
        } // we found the start of an array delimited path
        else if (path[i] == '[' && path[i + 1] == "\"") {
            readingArrayBasedPath = true;
            push = true;
            i += 1;
          } else {
            array[array.length - 1] += path[i];
          }

        i++;

        if (push && i < path.length) {
          array.push("");
          push = false;
        }
      }

      return array;
    },

    setsmart(obj, property, value, context) {
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
        property = smarts.parsePropertyPath(property);
      } else if (smarts.getsmart.bind(this)(property, 'constructor', false) !== Array) {
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


      if (!obj) obj = {};
      let deepSetByArray = deepSetByArrayUnbound.bind(this);

      if (property) {
        return deepSetByArray(obj, property, value);
      } else {
        if (smarts.getsmart.bind(this)(vue, 'reactiveSetter', false) && smarts.getsmart.bind(this)(this, '$set', false) && obj) {
          this.$set(obj, undefined, value);

          if (typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function') {
            window.$store.commit('graph/thing');
          }
        } else {
          obj = value;

          if (smarts.getsmart.bind(this)(vue, 'store', false) && typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function') {
            window.$store.commit('graph/thing');
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
      } // In order to avoid constantly checking the type of the property
      // we separate the real logic out into an inner function.


      function deepSetByArrayUnbound(obj, propsArray, value) {
        // If the path array has only 1 more element, we've reached
        // the intended property and set its value
        if (propsArray.length == 1) {
          if (smarts.getsmart.bind(this)(vue, 'reactiveSetter', false) && smarts.getsmart.bind(this)(this, '$set', false) && obj) {
            this.$set(obj, propsArray[0], value);

            if (typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function') {
              window.$store.commit('graph/thing');
            }
          } else {
            obj[propsArray[0]] = value;

            if (smarts.getsmart.bind(this)(vue, 'store', false) && typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function') {
              window.$store.commit('graph/thing');
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

        if (typeof obj[propsArray[0]] !== 'object') {
          // If we have reached an undefined/null property
          if (smarts.getsmart.bind(this)(vue, 'reactiveSetter', false) && smarts.getsmart.bind(this)(this, '$set', false) && obj) {
            this.$set(obj, propsArray[0], {});

            if (typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function') {
              window.$store.commit('graph/thing');
            }
          } else {
            obj[propsArray[0]] = {};

            if (smarts.getsmart.bind(this)(vue, 'store', false) && typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function') {
              window.$store.commit('graph/thing');
            }
          }
        }

        return deepSetByArray(obj[propsArray[0]], remainingProps, value);
      }
    },

    gosmart(obj, property, value, context) {
      // stands for get or set smart
      var get = smarts.getsmart.bind(this)(obj, property, value, true);

      if (get.undefined) {
        get = smarts.setsmart.bind(this)(obj, property, get.value, context);
      } // return value from property path, either gotten or smartly set


      if (context) {
        return get;
      } else {
        return smarts.getsmart.bind(this)(get, 'value', get);
      }
    },

    vgosmart(obj, property, value, context) {
      // stands for v-model get or set smart
      // return value from property path, either gotten or smartly set
      return {
        get: () => {
          var get = smarts.getsmart.bind(this)(obj, property, value, true);

          if (get.undefined) {
            get = smarts.setsmart.bind(this)(obj, property, get.value, context);
          }

          if (context) {
            return get;
          } else {
            return smarts.getsmart.bind(this)(get, 'value', get);
          }
        },
        set: val => {
          smarts.setsmart.bind(this)(obj, property, val);
        }
      };
    },

    getsmartval(obj, property, defaultValue) {
      // get the value of a property path based off its type
      let target = smarts.getsmart.bind(this)(obj, property, defaultValue);

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
    },

    safestring(something) {
      return smarts.jsmart.stringify(something || '');
    },

    safeparse(something) {
      return smarts.jsmart.parse(something || '');
    },

    flatten(arrays, func = i => i) {
      const flat = [];
      arrays.forEach(array => {
        if (Array.isArray(array)) {
          flat.push(...smarts.flatten(array));
        } else {
          flat.push(func(array));
        }
      });
      return flat;
    },

    mapsmart(list, keyProperty = 'title', returnExistant, populate) {
      return new Promise((resolve, reject) => {
        if (!keyProperty) {
          reject();
        } else if (list && typeof list.length == 'number') {
          if (list.length == 0) {
            if (returnExistant && smarts.getsmart.bind(this)(list, 'mapped.' + returnExistant, false) || !returnExistant) {
              resolve(true);
            } else if (returnExistant) {
              resolve(false);
            } else {
              resolve();
            }
          }

          if (!list.mapped || typeof list.mapped === 'boolean') {
            if (smarts.getsmart.bind(this)(local.vue, 'reactiveSetter', false) && smarts.getsmart.bind(this)(this, '$set', false) && list) {
              this.$set(list, 'mapped', {});
            } else {
              list['mapped'] = {};
            }
          }

          for (var i = 0; i < list.length; i++) {
            if (typeof list[i] !== 'string') {
              if (smarts.getsmart.bind(this)(local.vue, 'reactiveSetter', false) && smarts.getsmart.bind(this)(this, '$set', false) && list.mapped) {
                this.$set(list.mapped, list[i][keyProperty], list[i]);
              } else {
                list['mapped'][list[i][keyProperty]] = list[i];
              }

              if (i == list.length - 1) {
                if (returnExistant && smarts.getsmart.bind(this)(list, 'mapped.' + returnExistant, false) || !returnExistant) {
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
            //   smarts.getThing({
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
            //       if((returnExistant && smarts.getsmart.bind(this)(list, 'mapped.'+returnExistant, false)) || !returnExistant){
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
                if (returnExistant && smarts.getsmart.bind(this)(list, 'mapped.' + returnExistant, false) || !returnExistant) {
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
    },

    domval(thing) {
      return smarts.getsmart.bind(this)(thing, 'properties.description', '');
    },

    getThing({
      option,
      list = smarts.getsmart.bind(this)(objList),
      obj = true,
      keys = ['uuid', '_id', 'id'],
      keymatchtype,
      strings,
      defaultValue = undefined,
      vue = vue
    } = {}) {
      var index = smarts.thingIn({ ...arguments[0],
        retIndex: true
      });

      if (index >= 0) {
        return list[index];
      } else {
        return defaultValue;
      }
    },

    equal(obj1, obj2, seen = []) {
      if (obj1 && obj2 && typeof obj1 == 'object' && typeof obj2 == 'object') {
        seen.push(obj1, obj2); //Loop through properties in object 1

        for (var p in obj1) {
          //Check property exists on both objects
          if (typeof obj1.hasOwnProperty == 'function' && typeof obj2.hasOwnProperty == 'function' && obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;

          switch (typeof obj1[p]) {
            //Deep compare objects
            case 'object':
              if (seen.indexOf(obj1[p]) < 0 && !smarts.equal(obj1[p], obj2[p], seen)) return false;
              break;
            //Compare function code

            case 'function':
              if (typeof obj2[p] == 'undefined' || obj1[p].toString() != obj2[p].toString()) return false;
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
    }

  };
  return smarts;
};