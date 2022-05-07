module.exports = function () {
  let {
    node,
    vue,
    objList,
    stringList,
    that
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return require('../loader.js')({
    node,
    vue,
    objList,
    stringList,
    that
  });
};