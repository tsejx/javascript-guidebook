---
nav:
  title: 内置对象
  order: 2
group:
  title: Object
  order: 4
title: Object.seal
order: 18
---

# Object.seal

`Object.seal` 方法用于标识指定对象为不可扩展，且所有现有 Property 均不可配置。

## 语法

语法：

```js
Object.seal(o);
```

类型声明：

```ts
interface ObjectConstructor {
  seal<T>(o: T): T;
}
```

参数说明

| 参数 | 说明             | 类型   |
| :--- | :--------------- | :----- |
| o    | 将要被密封的对象 | object |

返回值：

返回处理后的对象。

## 代码示例

`Object.seal` 处理后的对象将不可扩展。

同时，现有的所有 Property 也不可配置（也就是不能修改 `configurable`、`enumerable`、`writable`）。

```js
const foo = { a: 1, b: 2 };

console.log(Object.getOwnPropertyDescriptors(foo));
// {
// a: { configurable: true, enumerable: true, writable: true }
// b: { configurable: true, enumerable: true, writable: true }
// }

Object.seal(foo);

foo.c = 3;

console.log(foo);
// { a: 1, b: 2}
console.log(Object.isExtensible(foo));
// false

console.log(Object.getOwnPropertyDescriptors(foo));
// {
// a: { configurable: false, enumerable: true, writable: true }
// b: { configurable: false, enumerable: true, writable: true }
// }

console.log(Object.isSealed(foo));
// true
```

## 参考资料

- [MDN: Object.seal](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)
- [TypeScript: lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)
