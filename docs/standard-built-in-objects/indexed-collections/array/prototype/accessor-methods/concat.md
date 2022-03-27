---
nav:
  title: 内置对象
  order: 2
group:
  title: Array
  path: /indexed-collections/array/
  order: 11
title: Array.prototype.concat
order: 10
---

# Array.prototype.concat()

`Array.prototype.concat()` 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

## 语法

语法：

```js
const new_array = old_array.concat( item1[, itemN ] )
```

类型声明：

```ts
interface ConcatArray<T> {
  readonly length: number;
  readonly [n: number]: T;
  join(separator?: string): string;
  slice(start?: number, end?: number): T[];
}

interface Array<T> {
  concat(...items: ConcatArray<T>[]): T[];

  concat(...items: (T | ConcatArray<T>)[]): T[];
}
```

参数说明：

| 参数  | 描述                                         | 类型 |
| :---- | :------------------------------------------- | :--- |
| item1 | 添加到当前数组末尾处的数据项                 | any  |
| itemN | 要添加到当前数组末尾处的其他项，可以有多个。 | any  |

返回值：

返回合并后新的 `Array` 实例。

## 方法说明

`concat` 方法创建一个新的数组，它由被调用的对象中的元素组成，每个参数的顺序依次是该参数的元素（如果参数是数组）或参数本身（如果参数不是数组）。它不会递归到嵌套数组参数中。

`concat` 方法不会改变 `this` 或任何作为参数提供的数组，而是返回一个**浅拷贝**，它包含与原始数组相结合的相同元素的副本。 原始数组的元素将复制到新数组中，如下所示：

- 对象引用（而不是实际对象）：`concat` 将对象引用复制到新数组中。**原始数组和新数组都引用相同的对象**。 也就是说，如果引用的对象被修改，则更改对于新数组和原始数组都是可见的。这包括也是数组的数组参数的元素。
- 数据类型如字符串，数字和布尔（不是 `String`，`Number` 和 `Boolean` 对象）：`concat` 将字符串和数字的值复制到新数组中。

**注意**：数组/值在连接时保持不变。此外，对于新数组的任何操作（仅当元素不是对象引用时）都不会对原始数组产生影响，反之亦然。

## 代码示例

### 连接两个数组

以下代码将两个数组合并为一个新数组。

```js
const alpha = ['a', 'b', 'c'];
const numeric = [1, 2, 3];

alpha.concat(numeric);
// Outputs: ['a', 'b', 'c', 1, 2, 3]
```

### 连接三个数组

以下代码将三个数组合并为一个新数组。

```js
const num1 = [1, 2, 3],
  num2 = [4, 5, 6],
  num3 = [7, 8, 9];

const nums = num1.concat(num2, num3);

console.log(nums);
// Outputs: [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### 将值连接到数组

以下代码将三个值连接到数组。

```js
var alpha = ['a', 'b', 'c'];

var alphaNumeric = alpha.concat(1, [2, 3]);

console.log(alphaNumeric);
// Outputs: ['a', 'b', 'c', 1, 2, 3]
```

### 合并嵌套数组

以下代码合并数组并保留引用。

```js
var num1 = [[1]];
var num2 = [2, [3]];

var nums = num1.concat(num2);

console.log(nums);
// Outputs: [[1], 2, [3]]

// modify the first element of num1
num1[0].push(4);

console.log(nums);
// Outputs: [[1, 4], 2, [3]]
```

### 将对象合并为数组

```js
var newArray = Array.prototype.concat.call({ a: 1 }, { b: 2 });

console.log(newArray);
// [{ a: 1 }, { b: 2 }]

console.log(newArray[0].a);
// 1
```

## 参考资料

- [MDN: Array.prototype.concat](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
- [TypeScript: lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)
