module.exports = function setPrefix(prefix, arr) {
  return arr.map(r => `${prefix}/${r}`);
};
