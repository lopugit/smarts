module.exports = function ({
  node,
  vue,
  objList,
  stringList,
  that
} = {}) {
  return require('../loader.js')({
    node,
    vue,
    objList,
    stringList,
    that
  });
};