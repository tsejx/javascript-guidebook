---
nav:
  title: 内置对象
  order: 2
group:
  title: Array
  path: /indexed-collections/array/
  order: 11
title: Array.prototype.includes
order: 11
---

# Array.prototype.includes()

⭐️ `ES2016(ES7)新特性`

`Array.prototype.includes()` 方法用于判断数组是否包含指定的值。

## 语法

语法：

```js
arr.includes(searchElement [, fromIndex])
```

类型声明：

```ts
interface Array<T> {
  includes(searchElement: T, fromIndex?: number): boolean;
}
```

参数说明：

| 参数          | 说明               | 类型   |
| :------------ | :----------------- | :----- |
| searchElement | 需要查找的元素值   | any    |
| fromIndex     | 查找数组开始的索引 | number |

返回值：

如果存在指定值则返回 `true`，否则返回 `false`。

## 代码示例

```js
const arr = [1, 2, 3];

arr.includes(2);
// true

arr.includes(4);
// false

arr.includes(3, 3);
// false

arr.includes(3, -1);
// true

const arr2 = [1, 2, NaN];

arr2.includes(NaN);
// true
```

### 参数值为 NaN

`Array.prototype.indexOf()` 无法查找出数组中的 NaN，而该方法可以判断出数组中是否包含 NaN。

```js
const arr = [1, 2, 3, 4, NaN, 6, NaN];

arr.includes(NaN);
// true
```

### 开始索引超限

如果 `fromIndex` 大于等于 **数组长度** ，则返回 `false` 。该数组不会被搜索。

```js
var arr = ['a', 'b', 'c'];

arr.includes('c', 3);
// false
arr.includes('c', 100);
// false
```

### 开始索引为负值

如果 `fromIndex` 为负值，计算出的索引将作为开始搜索 `searchElement` 的位置。如果计算出的索引小于 0，则整个数组都会被搜索。

```js
// 数组长度是 3
// fromIndex 是 -100
// computed index 是 3 + (-100) = -97

var arr = ['a', 'b', 'c'];

arr.includes('a', -100);
// true
arr.includes('b', -100);
// true
arr.includes('c', -100);
// true
```

### 类数组通用方法

`Array.prototype.includes()` 方法有意设计为通用方法。它不要求 `this` 值是数组对象，所以它可以被用于其他类型的对象（比如类数组对象）。

下面的例子展示了 在函数的 `arguments` 对象上调用的 `includes()` 方法。

```js
(function () {
  console.log([].includes.call(arguments, 'a'));
  // true
  console.log([].includes.call(arguments, 'd'));
  // false
})('a', 'b', 'c');
```

## 参考资料

- [MDN: Array.prototype.includes](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
- [TypeScript: lib.es2016.array.include.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es2016.array.include.d.ts)
