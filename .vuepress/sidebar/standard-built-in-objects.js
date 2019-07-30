const setPrefix = require('../utils/setPrefix');
const cons = b => `constructor/${b}`;
const prop = b => `prototype/${b}`;

const fundamental = 'fundamental-objects';
const number = 'numbers-and-dates';
const string = 'text-processing';
const indexed = 'indexed-collections';
const keyed = 'keyed-collections';
const structure = 'structured-data';
const control = 'control-abstraction-objects';

const standard = [
  {
    title: '全局值属性',
    collapsable: false,
    children: setPrefix('the-global-object/value-properties', ['infinity', 'NaN', 'undefined']),
  },
  {
    title: '全局函数属性',
    collapsable: false,
    children: setPrefix('the-global-object/function-properties', [
      'eval',
      'isFinite',
      'isNaN',
      'parseFloat',
      'parseInt',
      'decodeURI',
      'decodeURIComponent',
      'encodeURI',
      'encodeURIComponent',
    ]),
  },
  {
    title: '基本对象',
    collapsable: false,
    children: [
      {
        title: 'Object',
        collapsable: false,
        children: setPrefix(`${fundamental}/object`, [
          'object',
          cons('assign'),
          cons('create'),
          cons('defineProperties'),
          cons('defineProperty'),
          cons('entries'),
          cons('freeze'),
          cons('getOwnPropertyDescriptor'),
          cons('getOwnPropertyDescriptors'),
          cons('getOwnPropertyNames'),
          cons('getOwnPropertySymbols'),
          cons('getPrototypeOf'),
          cons('is'),
          cons('isExtensible'),
          cons('isFrozen'),
          cons('isSealed'),
          cons('keys'),
          cons('preventExtensions'),
          cons('seal'),
          cons('setPrototypeOf'),
          cons('values'),
          prop('hasOwnProperty'),
          prop('isPrototypeOf'),
          prop('propertyIsEnumerable'),
          prop('toString'),
        ]),
      },
      {
        title: 'Function',
        collapsable: false,
        children: setPrefix(`${fundamental}/function`, [
          'function',
          prop('apply'),
          prop('call'),
          prop('bind'),
        ]),
      },
      {
        title: 'Symbol',
        collapsable: false,
        children: setPrefix(`${fundamental}/symbol`, [
          'symbol',
          cons('hasInstance'),
          cons('isConcatSpreadable'),
          cons('iterator'),
          cons('match'),
          cons('replace'),
          cons('search'),
          cons('species'),
          cons('split'),
          cons('toPrimitive'),
          cons('toStringTag'),
          cons('unscopables'),
        ]),
      },
      {
        title: 'Boolean',
        collapsable: false,
        path: `${fundamental}/boolean`,
      },
      {
        title: 'Error',
        collapsable: false,
        path: `${fundamental}/error`,
      },
    ],
  },
  {
    title: '数字和日期',
    collapsable: false,
    children: [
      {
        title: 'Date',
        collapsable: false,
        path: `${number}/date/date`,
      },
      {
        title: 'Math',
        collapsable: false,
        path: `${number}/math/math`,
      },
      {
        title: 'Number',
        collapsable: false,
        path: `${number}/number/number`,
      },
    ],
  },
  {
    title: '字符处理',
    collapsable: false,
    children: [
      {
        title: 'String',
        collapsable: false,
        children: setPrefix(`${string}/string`, [
          'string',
          prop('charAt'),
          prop('charCodeAt'),
          prop('codePointAt'),
          prop('concat'),
          // prop('includes'),
          // prop('endsWith'),
          prop('indexOf'),
          prop('lastIndexOf'),
          // prop('localCompare'),
          prop('match'),
          // prop('normalize'),
          // prop('padEnd'),
          // prop('padStart'),
          // prop('repeat'),
          prop('replace'),
          prop('search'),
          prop('slice'),
          prop('split'),
          // prop('startsWith'),
          prop('substr'),
          prop('substring'),
          // prop('toLocaleLowerCase'),
          // prop('toLocaleUpperCase'),
          prop('toLowerCase'),
          // prop('toSource'),
          prop('toUpperCase'),
          prop('trim'),
          // prop('trimLeft'),
          // prop('trimRight'),
          // prop('valueOf'),
        ]),
      },
      {
        title: 'RegExp',
        collapsable: false,
        children: setPrefix(`${string}/regexp`, [
          'regexp',
          'regexp-rule',
          prop('exec'),
          prop('test'),
        ]),
      },
    ],
  },
  {
    title: '索引集合',
    collapsable: false,
    children: [
      {
        title: 'Array',
        collapsable: false,
        children: setPrefix(`${indexed}/array`, [
          'array',
          'array-detection',
          cons('from'),
          cons('of'),
          cons('isArray'),
          // prop('mutator-methods/copyWithin'),
          prop('mutator-methods/fill'),
          prop('mutator-methods/pop'),
          prop('mutator-methods/push'),
          prop('mutator-methods/reverse'),
          prop('mutator-methods/shift'),
          prop('mutator-methods/sort'),
          prop('mutator-methods/splice'),
          prop('mutator-methods/unshift'),
          prop('accessor-methods/indexOf'),
          prop('accessor-methods/lastIndexOf'),
          prop('accessor-methods/concat'),
          prop('accessor-methods/includes'),
          prop('accessor-methods/join'),
          prop('accessor-methods/slice'),
          prop('iteration-methods/forEach'),
          prop('iteration-methods/entries'),
          prop('iteration-methods/every'),
          prop('iteration-methods/some'),
          prop('iteration-methods/filter'),
          prop('iteration-methods/find'),
          prop('iteration-methods/findIndex'),
          prop('iteration-methods/keys'),
          prop('iteration-methods/map'),
          prop('iteration-methods/reduce'),
          // prop('iteration-methods/reduceReight'),
        ]),
      },
      {
        title: 'TypedArrays',
        collapsable: false,
        children: setPrefix(`${indexed}/typed-array`, ['typed-array']),
      },
    ],
  },
  {
    title: '键值集合',
    collapsable: false,
    children: [
      {
        title: 'Map',
        collapsable: false,
        children: setPrefix(`${keyed}/map`, ['map', 'prototype']),
      },
      {
        title: 'Set',
        collapsable: false,
        path: `${keyed}/set/set`,
      },
      {
        title: 'WeakMap',
        collapsable: false,
        path: `${keyed}/weak-map/weak-map`,
      },
      {
        title: 'WeakSet',
        collapsable: false,
        path: `${keyed}/weak-set/weak-set`,
      },
    ],
  },
  {
    title: '控制抽象对象',
    collapsable: false,
    children: [
      {
        title: 'ArrayBuffer',
        collapsable: false,
        path: `${structure}/array-buffer/array-buffer`,
      },
      {
        title: 'JSON',
        collapsable: false,
        children: setPrefix(`${structure}/json`, ['json', 'json-parse', 'json-stringify']),
      },
    ],
  },
  {
    title: '控制抽象对象',
    collapsable: false,
    children: [
      {
        title: 'Iterator',
        collapsable: false,
        path: `${control}/iterator/iterator`,
      },
      {
        title: 'Promise',
        collapsable: false,
        children: setPrefix(`${control}/promise`, [
          'promise',
          'promise-standard',
          cons('resolve'),
          cons('reject'),
          cons('all'),
          cons('race'),
          prop('then'),
          prop('catch'),
        ]),
      },
      {
        title: 'Generator',
        collapsable: false,
        children: setPrefix(`${control}/generator`, [
          'generator',
          'generator-async',
          prop('next'),
          prop('return'),
          prop('throw'),
        ]),
      },
    ],
  },
];

module.exports = {
  standard,
};
