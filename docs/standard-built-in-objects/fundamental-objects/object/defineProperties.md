---
nav:
  title: 内置对象
  order: 2
group:
  title: Object
  order: 4
title: Object.defineProperties
order: 4
---

# Object.defineProperties

`Object.defineProperties()` 方法用于为一个对象定义 Properties 和/或修改已有的 Properties 的 Attributes。

## 语法

```js
Object.defineProperties(O, Properties);
```

| 参数       | 说明                                       | 类型   |
| ---------- | ------------------------------------------ | ------ |
| O          | 添加或修改 Properties 的目标对象           | object |
| Properties | 要定义其可枚举属性或修改的属性描述符的对象 | object |

| Attributes   | 默认值      |
| ------------ | ----------- |
| configurable | `false`     |
| enumerable   | `false`     |
| value        | `undefined` |
| writable     | `false`     |
| get          | `undefined` |
| set          | `undefined` |

返回变更后的对象。

## 示例

```js
const abc = { a: 1, b: 2, c: 3 };

Object.defineProperties(abc, {
  a: {
    value: 'One',
    writable: false,
    enumerable: false,
    configurable: false,
  },
  e: {
    value: 4,
  },
  f: {
    value: 5,
  },
});

console.log(abc);
// {
// b: "Two",
// c: 3,
// a: "One",
// d: "Three",
// e: 4,
// f: 5,
// }

abc.a = 10;

console.log(abc.a);
// 'One'
```
