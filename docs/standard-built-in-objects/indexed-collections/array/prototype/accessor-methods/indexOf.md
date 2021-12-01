---
nav:
  title: 内置对象
  order: 2
group:
  title: Array
  path: /indexed-collections/array/
  order: 11
title: Array.prototype.indexOf
order: 12
---

# Array.prototype.indexOf()

`Array.prototype.indexOf()` 方法用于查找数组成员第一次出现指定字符的位置。

## 语法

```js
arr.indexOf( searchValue [, fromIndex] )
```

| 参数          | 说明                                           | 类型   |
| ------------- | ---------------------------------------------- | ------ |
| `searchValue` | 要查找的数组元素                               | any    |
| `fromIndex`   | 可选，在当前字符串中查找的起始索引，默认为 0。 | number |

**返回值：** 数组元素在当前数组中第一次查找到的起始位置（索引）。

## 描述

该方法使用 Strict Equality（无论是绝对相等 `===`，还是 Triple-equals 操作符都基于同样的方法）进行判断查找的元素与数组中包含的元素之间的关系。

## 示例

### 代码示例

```js
var arr = [1, 2, 3, 4, 5];

arr.indexOf(1);
// 0
arr.indexOf(7);
// -1
arr.indexOf(4, 2);
// 3
arr.indexOf(3, -1);
// -1
arr.indexOf(3, -3);
// 2
```

### 找出指定元素出现的所有位置

```js
// 存放指定元素出现的位置的数组
var indices = [];
// 被查找的数组
const array = ['a', 'b', 'a', 'c', 'a', 'd'];
// 查找的元素
var element = 'a';

var idx = array.indexOf(element);

while (idx != -1) {
  indices.push(idx);
  idx = array.indexOf(element, idx + 1);
}

console.log(indices);
// [0, 2, 4]
```
