---
nav:
  title: 内置对象
  order: 2
group:
  title: Object
  order: 4
title: Object.isExtensible
order: 14
---

# Object.isExtensible

`Object.isExtensible()` 方法用于检测指定对象是否可扩展。

## 语法

```js
Object.isExtensible(O);
```

| 参数 | 说明               | 类型   |
| ---- | ------------------ | ------ |
| O    | 指定用于检测的对象 | object |

返回 Boolean 类型的值表示用于检测的对象是否可扩展。

## 描述

默认情况下，对象是可扩展的：即可以为他们添加新的属性。

[Object.preventExtensions](./preventExtensions)、[Object.seal](./seal) 或 [Object.freeze](./freeze) 方法都可以标记一个对象为不可扩展（non-extensible）。

## 示例

```js
let foo = {
  a: 1,
};
console.log(Object.isExtensible(foo));
// true

foo.b = 2;

console.log(foo);
// {a: 1, b: 2}

console.log(Object.preventExtensions(foo));
// { a: 1, b: 2}

// 由于对象 foo 禁止扩展，所以该赋值语句静默失败
foo.c = 3;

console.log(Object.isExtensible(foo));
// false

console.log(foo);
// { a: 1, b: 2}
```
