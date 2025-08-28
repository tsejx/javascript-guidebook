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

语法：

```js
Object.getOwnPropertySymbols(o);
```

类型声明：

```ts
interface ObjectConstructor {
  getOwnPropertySymbols(o: any): symbol[];
}
```

参数说明：

| 参数 | 说明                                    | 类型   |
| :--- | :-------------------------------------- | :----- |
| O    | 用于获取 Symbol Property 键名的目标对象 | object |

返回值：

返回目标对象 Symbol 组成的数组。

## 代码示例

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

## 参考资料

- [MDN: Object.getOwnPropertySymbols](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols)
- [TypeScript: lib.es2015.core.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es2015.core.d.ts)
