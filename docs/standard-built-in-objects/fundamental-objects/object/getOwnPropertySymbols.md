---
nav:
  title: 内置对象
  order: 2
group:
  title: Object
  order: 4
title: Object.getOwnPropertySymbols
order: 11
---

# Object.getOwnPropertySymbols

`Object.getOwnPropertySymbols()` 方法用于获取一个给定对象自身的所有 Symbol Property 的数组。

## 语法

```js
Object.getOwnPropertySymbols(O);
```

| 参数 | 说明                                    | 类型   |
| ---- | --------------------------------------- | ------ |
| O    | 用于获取 Symbol Property 键名的目标对象 | object |

返回目标对象 Symbol 组成的数组

## 示例

```js
const foo = {};
const a = Symbol('a');
const b = Symbol('b');

foo[a] = 'localSymbol';
foo[b] = 'globalSymbol';

const bar = Object.getOwnPropertySymbols(foo);

console.log(bar.length);
// 2
console.log(bar);
// [Symbol(a), Symbol(b)]
console.log(bar[0]);
// Symbol(a)
```
