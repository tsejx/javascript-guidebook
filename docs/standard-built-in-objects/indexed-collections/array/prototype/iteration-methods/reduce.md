---
nav:
  title: 内置对象
  order: 2
group:
  title: Array
  path: /indexed-collections/array/
  order: 11
title: Array.prototype.reduce
order: 28
---

# Array.prototype.reduce

`Array.prototype.reduce()` 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。对空数组时不会执行回调函数。

## 语法

语法：

```js
arr.reduce(callbackfn [, initialValue]);
```

类型声明

```ts
interface Array<T> {
  reduce(
    callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: readonly T[]) => T
  ): T;

  reduce(
    callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: readonly T[]) => T,
    initialValue: T
  ): T;

  reduce<U>(
    callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U,
    initialValue: U
  ): U;
}
```

参数说明：

| 参数         | 说明                                                                                                                                               | 类型     |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------- | :------- |
| callbackfn   | 回调函数，用于遍历数组成员时执行                                                                                                                   | function |
| initialValue | （可选）累加器初始值，用作第一个调用回调函数的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用将报错。 | any      |

`callbackfn` 函数的参数：

- `previousValue`：累加器累加回调的返回值，它是上一次调用回调时返回的累积值，或 `initialValue`
- `currentValue`：当前数组中处理的元素
- `index`：数组中正处理的当前元素的索引
- `array`：被调用的数组

返回值：

返回函数累计处理的结果。

## 方法说明

`reduce()` 方法为数组中的每一个元素依次执行 `callback` 回调函数，不包括数组中被删除或从未被赋值的元素。

回调函数第一次执行时，`acc` 和 `currentValue` 的取值有两种情况：

- 回调函数参数取值问题
  - 提供 `initialValue`，累加器 `acc` 取值为 `initialValue`，`currentValue` 取数组中的第一个值
  - 没有提供 `initialValue`，累加器 `acc` <strong style="color:red">取数组中的第一个值作为初始值</strong>，`currentValue` 取数组中的第二个值。
- 回调函数调用问题
  - 如果提供 `initialValue`，从索引 0 开始执行回调函数。
  - 如果没有提供 `initialValue`，`reduce` 会从索引 1 的地方开始执行回调函数，跳过第一个索引。
  - 如果数组为空且没有提供 `initialValue`，会抛出 `TypeError` 。
  - 如果数组仅有一个元素（无论位置如何）并且没有提供 `initialValue`， 或者有提供 `initialValue` 但是数组为空，那么此唯一值将被返回并且 `callback` 不会被执行。

假如运行下段代码：

```js
[0, 1, 2, 3, 4].reduce((acc, val, index, arr) => acc + val);
```

回调函数被调用四次，每次调用的参数和返回值如下表所示。

| callback 回调函数 | acc 累加器 | val 当前值 | index 当前索引 | arr             | 返回值 |
| :---------------- | :--------- | :--------- | :------------- | :-------------- | :----- |
| first call        | 0          | 1          | 1              | [0, 1, 2, 3, 4] | 1      |
| second call       | 1          | 2          | 2              | [0, 1, 2, 3, 4] | 3      |
| third call        | 3          | 3          | 3              | [0, 1, 2, 3, 4] | 6      |
| fourth call       | 6          | 4          | 4              | [0, 1, 2, 3, 4] | 10     |

`reduce()` 方法最终的返回值为 10。

如果你打算提供一个初始值作为 `reduce` 方法的第二个参数，以下是运行过程及结果。

```js
[0, 1, 2, 3, 4].reduce((acc, val, index, arr) => accumulator + currentValue, 10);
```

| callback 回调函数 | acc 累加器 | val 当前值 | index 当前索引 | arr             | 返回值 |
| :---------------- | :--------- | :--------- | :------------- | :-------------- | :----- |
| first call        | 10         | 0          | 0              | [0, 1, 2, 3, 4] | 10     |
| second call       | 10         | 1          | 1              | [0, 1, 2, 3, 4] | 11     |
| third call        | 11         | 2          | 2              | [0, 1, 2, 3, 4] | 13     |
| fourth call       | 13         | 3          | 3              | [0, 1, 2, 3, 4] | 16     |
| fifth call        | 16         | 4          | 4              | [0, 1, 2, 3, 4] | 20     |

`reduce()` 方法最终的返回值为 20。

## 代码示例

- 将数组转为对象
- 展开更大的数组
- 在一次遍历中进行两次计算
- 将映射和过滤函数组合
- 按顺序运行异步函数

### 聚合为数字

数组成员为数字类型时。

```js
const res = [1, 2, 3, 4, 5].reduce((acc, item) => acc + item, 0);

console.log(res);
// 15
```

数组成员为对象类型时。

```js
const arr = [{ total: 1 }, { total: 2 }, { total: 3 }, { total: 4 }, { total: 5 }];

const res = arr.reduce((acc, { total }) => acc + total, 0);

console.log(res);
// 15
```

### 聚合为字符串

将数组的每项转换为固定格式的字符串，每项直接以分号作为分隔。

```js
const arr = [
  { key: 'foo', value: 1 },
  { key: 'bar', value: 2 },
  { key: 'baz', value: 3 },
];

const res = arr.reduce((acc, { key, value }) => acc + `${key}=${value}&`, '?');

console.log(res);
// "?foo=1&bar=2&baz=3&"
```

### 聚合为对象

只要目标是将数组聚合为唯一的元素时，都可以考虑使用 reduce

```js
const arr = [
  { id: 1, type: 'a', name: 'foo' },
  { id: 2, type: 'b', name: 'bar' },
  { id: 3, type: 'c', name: 'baz' },
];

const res = arr.reduce((acc, { id, type, name }) => {
  acc[id] = { type, name };
  return acc;
}, {});

console.log(res);
// { 1: { name: 'foo', type: 'a'}, 2: { name: 'bar', type: 'b'}, { name: 'baz', type: 'c' }}
```

### 初始值的必要性

提供初始值通常更安全。

没有提供初始值。

```js
const maxCallback = ( pre, current ) => Math.max( pre.x, current.x )

[{ x: 22}, { x: 42}].reduce(maxCallback)
// 42

[{ x: 22}].reduce(maxCallback)
// { x: 22 }

[].reduce(maxCallback)
// TypeError
```

提供初始值。

```js
const maxCallback = ( max, current ) => Math,max( max, current )

[{ x: 22 }, { x: 42 }].map( el => el.x ).reduce( maxCallback2, -Infinity );
```

### 数组求和、求积和最大值

```js
// 数组求和
const sum = [0, 1, 2, 3].reduce((acc, cur) => acc + cur, 0);
// 6

// 数组求积
const product = [1, 2, 3, 4, 5].reduce((a, b) => a * b, 1);
// 120

// 数组最大值
const max = [1, 2, 3, 4, 5].reduce((a, b) => (a > b ? a : b));
// 5
```

### 数组元素

找出长度最长的数组元素。

```js
const findLongest = (entries) =>
  entries.reduce((prev, cur) => (cur.length > prev.length ? cur : prev), '');

console.log(findLongest([1, 2, 3, 'ab', 4, 'bcd', 5, 6785, 4]));
// 'bcd'
```

### 二维数组扁平化

```js
const arr = [
  [0, 1],
  [2, 3],
  [4, 5],
];

const res = arr.reduce((a, b) => a.concat(b), []);

console.log(res);
// [0, 1, 2, 3, 4, 5]
```

你也可以写成箭头函数的形式：

```js
var flattened = [
  [0, 1],
  [2, 3],
  [4, 5],
].reduce((acc, cur) => acc.concat(cur), []);
```

### 计算数组成员次数

```js
const names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

const countedNames = names.reduce((allNames, name) => {
  if (name in allNames) {
    allNames[name]++;
  } else {
    allNames[name] = 1;
  }
  return allNames;
}, {});

// { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }
```

### 单次遍历多次计算

```js
const arr = [0.3, 1.2, 3.4, 0.2, 3.2, 5.5, 0.4];

function reduceMaxMin(acc, value) {
  reuturn {
    min: Math.min(acc.min, value),
    max: Math.max(acc.max, value)
  }
}

const initMinMax = {
  min: Number.MIN_VALUE,
  max: Number.MAX_VALUE
}

const minMax = arr.reduce(reduceMaxMin, initMinMax);

console.log(minMax);
// { min: 0.2, max: 5.5}
```

## 兼容性代码

```js
if (!Array.prototype.reduce) {
  Object.defineProperty(Array.prototype, 'reduce', {
    value: function (callback) {
      if (this === null) {
        throw new TypeError('Array.prototype.reduce called on null or undefined');
      }

      if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
      }

      // 将数组对象化
      const obj = Object(this);

      const len = obj.length >>> 0;

      let index = 0;
      let accumulator;

      // 处理累加器（也就是 reduce 方法第二个参数）
      if (arguments.length >= 2) {
        // 累加器
        accumulator = arguments[1];
      } else {
        while (index < len && !(index in obj)) {
          index++;
        }

        if (index >= len) {
          throw new TypeError('Reduce of empty array with no initial value');
        }

        accumulator = obj[index++];
      }

      // 走有累加器的那种实现
      while (index < len) {
        if (index in obj) {
          accumulator = callback(accumulator, obj[index], index, obj);
        }

        index++;
      }

      return accumulator;
    },
  });
}
```

## 参考资料

- [MDN: Array.prototype.reduce](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
- [TypeScript: lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)
