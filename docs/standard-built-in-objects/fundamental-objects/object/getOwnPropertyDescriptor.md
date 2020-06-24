---
nav:
  title: 内置对象
  order: 2
group:
  title: Object
  order: 4
title: Object.getOwnPropertyDescriptor
order: 8
---

# Object.getOwnPropertyDescriptor

`Object.getOwnPropertyDescriptor()` 方法可以获取对象自有 Property 的某个 Attributes。

## 语法

```js
Object.getOwnPropertyDescriptor(O, Property);
```

| 参数     | 说明                | 类型   |
| -------- | ------------------- | ------ |
| O        | 需要查找的目标对象  | object |
| Property | 目标对象的 Property | string |

## 示例

```js
const foo = { a: 1 };

Object.getOwnPropertyDescriptor(foo, 'a');
// Object {
// 	value: "a",
// 	writable: true,
// 	enumerable: true,
// 	configurable: true,
// }
```
