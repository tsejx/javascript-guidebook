---
nav:
  title: 内置对象
  order: 2
group:
  title: Array
  path: /indexed-collections/array/
  order: 11
title: Array.prototype.findIndex
order: 24
---

# Array.prototype.findIndex()

`findIndex()`方法返回数组中满足提供的测试函数的**第一个元素**的**索引**。否则返回-1。

## 语法

```js
arr.findIndex( callbackFunc [, thisArg ])

callbackFunc = function (currentValue, index, array) {
    // do something to
}
```

| 实例方法参数 | 类型                       | 说明     |
| ------------ | -------------------------- | -------- |
| `callback`   | 用于判定数组成员的回调函数 | function |
| `thisArg`    | 执行回调函数的 `this` 值   |          |

| 回调函数参数   | 类型                     | 说明   |
| -------------- | ------------------------ | ------ |
| `currentValue` | 当前遍历的数组成员       | any    |
| `index`        | 当前遍历的数组成员的索引 | number |
| `array`        | 原数组                   | array  |

## 示例

### 代码示例

```js
const arr = [1, 2, 3, 4, 5, 12, 22, 2, 2, 2];

const foo = arr.findIndex(function (currentValue, index, array) {
  return currentValue === 2;
});

console.log(foo);
// 1
```

### 查找质数

查找数组中首个质数元素的索引。

```js
function isPrime(element, index, array) {
  var start = 2;
  while (start <= Math.sqrt(element)) {
    if (element % start++ < 1) {
      return false;
    }
  }
  return element > 1;
}

console.log([4, 6, 8, 12].findIndex(isPrime));
// -1
console.log([4, 6, 7, 12].findIndex(isPrime));
// 2
```
