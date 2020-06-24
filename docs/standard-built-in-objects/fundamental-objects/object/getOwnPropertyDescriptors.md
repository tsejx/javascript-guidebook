---
nav:
  title: 内置对象
  order: 2
group:
  title: Object
  order: 4
title: Object.getOwnPropertyDescriptors
order: 9
---

# Object.getOwnPropertyDescriptors

`Object.getOwnPropertyDescriptors()` 方法用于获取一个对象的所有自身 Property 的 Attributes。

## 语法

```js
Object.getOwnPropertyDescriptors(O);
```

| 参数 | 说明                                   | 类型   |
| ---- | -------------------------------------- | ------ |
| O    | 用于获取 Property 的 Attributes 的对象 | object |

## 示例

```js
const a = {
  name: 'Ben',
  get age() {
    return '18';
  },
};

Object.getOwnPropertyDescriptors(a);
// {
//   age: {
//     configurable: true,
//     enumerable: true,
//     get: function age(){}, //the getter function
//     set: undefined
//   },
//   name: {
//     configurable: true,
//     enumerable: true,
//		value: "Ben",
//		writable:true
//   }
// }
```
