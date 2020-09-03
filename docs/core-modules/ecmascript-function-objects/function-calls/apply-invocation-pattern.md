---
nav:
  title: 核心模块
  order: 3
group:
  title: 函数调用
  order: 8
title: 间接调用模式
order: 4
---

# 间接调用模式

JavaScript 中函数也是对象，函数对象也可以包含方法。`call()` 和 `apply()` 方法可以用来间接地调用函数。

这两个方法都允许显式指定调用所需的 `this` 值，也就是说，任何函数可以作为任何对象的方法来调用，哪怕这个函数不是那个对象的方法。两个方法都可以指定调用的实参。`call()` 方法使用它自有的实参列表作为函数的实参，`apply()` 方法则要求以数组的形式传入参数。

```js
var obj = {};

function sum(x, y) {
  return x + y;
}

console.log(sum.call(obj, 1, 2));
// 3

console.log(sum.apply(obj, [1, 2]));
// 3
```