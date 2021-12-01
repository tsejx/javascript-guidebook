---
nav:
  title: 内置对象
  order: 2
group:
  title: Object
  order: 4
title: Object.values
order: 20
---

# Object.values

`Object.values()` 方法用于指定对象自身的所有可枚举 Property 值的数组。

## 语法

```js
Object.values(O);
```

| 参数 | 说明     | 类型   |
| ---- | -------- | ------ |
| O    | 指定对象 | object |

返回对象可枚举 Property 值的数组集合。

## 描述

返回的数组中键值的顺序与使用循环语句获取的键值组合一致。

## 示例

```js
const foo = { a: '1', b: '2', c: '3' };

console.log(Object.values(foo));
// ['1', '2', '3']
```
