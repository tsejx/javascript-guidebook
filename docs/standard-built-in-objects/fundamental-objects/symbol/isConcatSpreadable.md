---
nav:
  title: 内置对象
  order: 2
group:
  title: Symbol
  order: 6
title: Symbol.isConcatSpreadable
order: 3
---

# Symbol.isConcatSpreadable

`Symbol.isConcatSpreadable` 用于配置某对象作为 `Array.prototype.concat()` 方法的参数时是否展开其数组元素。

```js
let s1 = ['c', 'd'][('a', 'b')].concat(s1, 'e'); // ['a', 'b', 'c', 'd', 'e']
s1[Symbol.isConcatSpreadable]; // undefined

let s2 = ['c', 'd'];
s2[Symbol.isConcatSpreadable] = false[('a', 'b')].concat(s2, 'e'); // ['a', 'b', ['c', 'd'], 'e']
```

上面代码说明，数组的默认行为时可以展开，`Symbol.isConcatSpreadable` 默认等于 `undefined`。该属性等于 `ture` 时，也有展开的效果。

类似数组的对象正好相反，默认不展开。它的 `Symbol.isConcatSpreadable` 属性设为 `true`，才可以展开。

```js
let obj = { length: 2, 0: 'c', 1: 'd' };
['a', 'b'].concat(obj, 'e'); // ['a', 'b', obj, 'e']

obj[Symbol.isConcatSpreadable] = true;
['a', 'b'].concat(obj, 'e'); // ['a', 'b', 'c', 'd', 'e']
```
