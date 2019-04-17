const standardBuiltInObject = [
  {
    title: '全局值属性',
    link: 'the-global-object/value-properties',
    children: [
      { title: 'Infinity', link: 'infinity' },
      { title: 'NaN', link: 'NaN' },
      { title: 'undefined', link: 'undefined' },
    ],
  },
  {
    title: '全局函数属性',
    link: 'the-global-object/function-properties',
    children: [
      { title: 'eval', link: 'eval' },
      { title: 'isFinite', link: 'isFinite' },
      { title: 'isNaN', link: 'isNaN' },
      { title: 'parseFloat', link: 'parseFloat' },
      { title: 'parseInt', link: 'parseInt' },
      { title: 'decodeURI', link: 'decodeURI' },
      { title: 'decodeURIComponent', link: 'decodeURIComponent' },
      { title: 'encodeURI', link: 'encodeURI' },
      { title: 'encodeURIComponent', link: 'encodeURIComponent' },
    ],
  },
  {
    title: '基本对象',
    link: 'fundamental-objects',
    children: [
      { title: 'Object', link: 'object-objects/object-objects' },
      { title: 'Function', link: 'function-objects/function-objects' },
      { title: 'Boolean', link: 'boolean-objects' },
      { title: 'Symbol', link: 'symbol-objects/symbol-objects' },
      { title: 'Error', link: 'error-objects' },
    ],
  },
  {
    title: '数字和日期',
    link: 'numbers-and-dates',
    children: [
      { title: 'Date', link: 'date-objects/date-objects' },
      { title: 'Math', link: 'math-objects/math-objects' },
      { title: 'Number', link: 'number-objects/number-objects' },
    ],
  },
  {
    title: '字符处理',
    link: 'text-processing',
    children: [
      { title: 'String', link: 'string-objects/string-objects' },
      { title: 'RegExp', link: 'regexp-objects/regexp-objects' },
    ],
  },
  {
    title: '索引集合',
    link: 'indexed-collections',
    children: [
      { title: 'Array', link: 'array-objects/array-objects' },
      { title: 'TypedArrays', link: 'typed-array-objects/typed-array-objects' },
    ],
  },
  {
    title: '键值集合',
    link: 'keyed-collections',
    children: [
      { title: 'Map', link: 'map-objects/map-objects' },
      { title: 'Set', link: 'set-objects/set-objects' },
      { title: 'WeakMap', link: 'weak-map-objects/weak-map-objects' },
      { title: 'WeakSet', link: 'weak-set-objects/weak-set-objects' },
    ],
  },
  {
    title: '结构化数据',
    link: 'structured-data',
    children: [
      { title: 'ArrayBuffer', link: 'array-buffer-objects/array-buffer-objects' },
      { title: 'JSON', link: 'the-json-object/the-json-object' },
    ],
  },
  {
    title: '控制抽象对象',
    link: 'control-abstraction-objects',
    children: [
      { title: 'Iterator', link: 'iterator-objects/iterator' },
      { title: 'Promise', link: 'promise-objects/promise' },
      { title: 'Generator', link: 'generator-objects/generator'}
    ],
  },
];

module.exports = {
  standardBuiltInObject,
};
