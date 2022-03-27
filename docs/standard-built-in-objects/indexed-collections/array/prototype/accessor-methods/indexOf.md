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

语法：

```js
arr.indexOf( searchElement [, fromIndex] )
```

类型声明：

```ts
interface Array<T> {
  indexOf(searchElement: T, fromIndex?: number): number;
}
```

参数说明：

| 参数            | 说明                                         | 类型   |
| :-------------- | :------------------------------------------- | :----- |
| `searchElement` | 要查找的数组元素                             | any    |
| `fromIndex`     | 可选，在当前字符串中查找的起始索引，默认为 0 | number |

返回值：

返回数组元素在当前数组中第一次查找到的起始位置（索引）

## 方法说明

该方法使用 Strict Equality（无论是绝对相等 `===`，还是 Triple-equals 操作符都基于同样的方法）进行判断查找的元素与数组中包含的元素之间的关系。

## 代码示例

### 基本用法

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

## 参考资料

- [MDN: Array.prototype.indexOf](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
- [TypeScript: lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)
