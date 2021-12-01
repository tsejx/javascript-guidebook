---
nav:
  title: 内置对象
  order: 2
group:
  title: Array
  path: /indexed-collections/array/
  order: 11
title: Array.prototype.filter
order: 22
---

# Array.prototype.filter()

`Array.prototype.filter()` 方法创建一个新数组，其包含通过所提供函数实现的测试的所有元素。

## 语法

```js
arr.filter( callback = function (currentValue, index, arr) {} [, thisArg ] )
```

| 实例方法参数 | 说明                       | 类型     |
| ------------ | -------------------------- | -------- |
| `callback`   | 用于判定数组成员的回调函数 | function |
| `thisArg`    | 执行回调函数的 `this` 值   |          |

| 回调函数参数   | 说明                     | 类型   |
| -------------- | ------------------------ | ------ |
| `currentValue` | 当前遍历的数组成员       | any    |
| `index`        | 当前遍历的数组成员的索引 | number |
| `arr`          | 原数组                   | array  |

**返回值：** 返回一个新的通过测试的成员的集合的数组。

## 描述

- 该方法为数组中的每个成员调用一次回调函数，并利用所有使得回调函数返回 `true` 或 等价于 `true` 的值的成员创建一个新数组。回调函数只会在已经赋值的索引上被调用，对于那些已经被删除或者从未被赋值的索引不会被调用。那些没有通过回调函数测试的元素会被跳过，不会被包含在新数组中。
- 如果提供 `thisArg` 参数，则它会被作为回调函数被调用时的 `this` 值。否则，回调函数的 `this` 值在非严格模式下将是全局对象，严格模式下为 `undefined`。
- 遍历的元素范围在第一次调用回调函数之前就已经确定了。在调用该方法之后被添加到数组中的元素不会被 遍历到。如果已经存在的元素被改变了，则他们传入回调函数的值是遍历到它们那一刻的值。被删除或从来未被赋值的元素不会被遍历到。

## 示例

### 代码示例

```js
const isBigEnough = (value) => value >= (10)[(12, 5, 8, 130, 44)].filter(isBigEnough);
// false
```

### 排除偶数保留奇数

```js
let arr = [1, 2, 3, 5, 6, 9, 10];

arr.filter((value) => value % 2 !== 0);
// [1, 3, 5, 9]
```

### 清除数组空字符

```js
let arr = ['A', '', 'B', null, undefined, 'c', ' '];

arr.filter((value) => value && value.trim());
// ['A', 'B', 'C']
```
