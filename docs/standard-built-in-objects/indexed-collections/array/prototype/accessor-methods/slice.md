---
nav:
  title: 内置对象
  order: 2
group:
  title: Array
  path: /indexed-collections/array/
  order: 11
title: Array.prototype.slice
order: 15
---

# Array.prototype.slice()

`Array.prototype.slice()` 方法用于浅拷贝指定区间的数组成员。

## 语法

语法：

```js
arr.slice( start [, end ] );
```

类型声明：

```ts
interface Array<T> {
  slice(start?: number, end?: number): T[];
}
```

参数说明：

| 参数  | 说明                                           | 类型   |
| :---- | :--------------------------------------------- | :----- |
| start | 浅拷贝区间的开始索引                           | number |
| end   | 浅拷贝区间的结束索引，浅拷贝不包括该索引所得值 | number |

返回值：

返回一个含有提取元素的新数组。

## 方法说明

`slice` 方法不修改原数组，只会返回浅拷贝原数组的新数组。

原数组的元素会按照下述规则拷贝：

- 如果该元素是个对象引用 （不是实际的对象），`slice` 会拷贝这个对象引用到新的数组里。两个对象引用都引用了同一个对象。如果被引用的对象发生改变，则新的和原来的数组中的这个元素也会发生改变。
- 对于字符串、数字及布尔值来说，`slice` 会拷贝这些值到新的数组里。在别的数组里修改这些字符串或数字或是布尔值，将不会影响另一个数组。
  如果向两个数组任一中添加了新元素，则另一个不会受到影响。

`slice()` 方法涉及到 `Number()` 转型函数的隐式类型转换，当 `start` 被转换为 `NaN` 时，相当于 `start` 为 0；当 `end` 被转换为 `NaN` 时（`end` 为 `undefined` 除外），则输出空数组。

## 代码示例

### 基本用法

```js
const arr = [1, 2, 3, 4, 5];

arr.slice(1);
// [2, 3, 4, 5]

arr.slice(0, 2);
// [1, 2]

arr.slice(1, 2);
// [2]

arr.slice(NaN);
// [1, 2, 3, 4, 5]

arr.slice(0, NaN);
// []

arr.slice(true, [3]);
// [2, 3]

arr.slice(null, undefined);
// [1, 2,  3,4, 5]

arr.slice({});
// [1, 2, 3, 4, 5]

arr.slice('2', [5]);
// [3, 4, 5]
```

### 截取数组成员

```js
var fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];
var citrus = fruits.slice(1, 3);

// fruits contains ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango']
// citrus contains ['Orange','Lemon']
```

### 类数组对象

`slice` 方法可以用来将一个类数组对象转换成一个真正的数组。你只需将该方法绑定到这个对象上。

```js
function list() {
  return Array.prototype.slice.call(arguments);
}

const arr = list(1, 2, 3);
// [1, 2, 3]
```

除了使用 `Array.prototype.slice.call(arguments)`，你也可以简单的使用 `[].slice.call(arguments)` 来代替。另外，你可以使用 `bind` 来简化该过程。

```js
const unboundSlice = Array.prototype.slice;
const slice = Function.prototype.call.bind(unboundSlice);

function list() {
  return slice(arguments);
}

const arr = list(1, 2, 3);
// [1, 2, 3]
```

## 参考资料

- [MDN: Array.prototype.slice](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
- [TypeScript: lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)
