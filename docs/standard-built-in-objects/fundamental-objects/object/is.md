---
nav:
  title: 内置对象
  order: 2
group:
  title: Object
  order: 4
title: Object.is
order: 13
---

# Object.is

`Object.is()` 方法用于判断两个值是否是相同的值。

## 语法

```js
Object.is(value1, value2);
```

| 参数   | 说明     | 类型 |
| ------ | -------- | ---- |
| value1 | 比较值 1 | any  |
| value2 | 比较值 2 | any  |

返回判断表达式的结果。

## 描述

判断下列任何一项成立，则两个值相同：

- 两个值均为 `undefined`
- 两个值均为 `null`
- 两个值都是 `true` 或 `false`
- 两个值是由相同个数的字符按照相同顺序组成的字符串
- 两个值指向同一个对象
- 两个值都是数字并且
  - 都是正零 `+0`
  - 都是负零 `-0`
  - 都是 `NaN`
  - 都是除零和 `NaN` 外的其他同一个数字

这种相等性判断逻辑和传统的 `==` 运算不同，`==` 运算符会对它两边的操作数做**隐式类型转换**，然后才进行相等性比较，（所以才会有类似 `"" == false` 等于 `true` 的现象），但 `Object.is` 不会做这种类型转换。

这与 `===` 运算符的判定方式也不一样。`===` 运算符（和 `==` 运算符）将数字值 `-0` 和 `+0` 视为相等，并认为 `Number.NaN` 不等于 `NaN`。

## 示例

```js
Object.is(undefined, undefined);
// true

Object.is(null, null);
// true

Object.is(true, true);
// true

Object.is(100, 100);
// true

Object.is('foo', 'bar');
// false

Object.is([], []);
// false

Object.is(0, -0);
// false
Object.is(-0, -0);
// true
Object.is(NaN, 0 / 0);
// true
```
