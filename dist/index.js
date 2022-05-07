module.exports = function () {
  let {
    node,
    vue,
    objList,
    stringList,
    that
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  const babel = require('@babel/standalone');

  babel.template = require('@babel/template').default;
  babel.t = require('@babel/types');
  babel.generator = require('@babel/generator').default;
  babel.babylon = require('@babel/parser');
  babel.prettier = require('prettier');
  return require('./loader.js')({
    node,
    vue,
    objList,
    stringList,
    that,
    babel
  });
};