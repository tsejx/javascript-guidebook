---
nav:
  title: 内置对象
  order: 2
group:
  title: Array
  path: /indexed-collections/array/
  order: 11
title: Array.prototype.reduceRight
order: 29
---

# Array.prototype.reduceRight

`Array.prototype.reduceRight()` 方法接收一个函数作为累加器和数组的每个值（从右到左）将其减少为单个值。

## 语法

语法：

```js
arr.reduceRight( callback [, initialValue])
```

类型声明：

```ts
interface Array<T> {
  reduceRight(
    callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T
  ): T;
  reduceRight(
    callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T,
    initialValue: T
  ): T;
  reduceRight<U>(
    callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U,
    initialValue: U
  ): U;
}
```

参数说明：

| 参数         | 说明                                                                                                                                               | 类型     |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------- | :------- |
| callback     | 回调函数，用于遍历数组成员时执行                                                                                                                   | function |
| initialValue | （可选）累加器初始值，用作第一个调用回调函数的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用将报错。 | any      |

`callbackfn` 函数的参数：

- `previousValue`：累加器累加回调的返回值，它是上一次调用回调时返回的累积值，或 `initialValue`
- `currentValue`：当前数组中处理的元素
- `index`：数组中正处理的当前元素的索引
- `array`：被调用的数组

返回值：

返回函数累计处理的结果。

## 代码示例

### 数组求和

```js
const total = [0, 1, 2, 3].reduceRight(function (a, b) {
  return a + b;
});

console.log(total); // 6
```

### 二维数组扁平化

```js
const flattened = [
  [0, 1],
  [2, 3],
  [4, 5],
].reduceRight(function (a, b) {
  return a.concat(b);
}, []);

console.log(flattend); // [4, 5, 2, 3, 0, 1]
```

### reduce 和 reduceRight 区别

```js
const a = ['1', '2', '3', '4', '5'];
const left = a.reduce((prev, cur) => {
  return prev + cur;
});
const right = a.reduceRight((prev, cur) => {
  return prev + cur;
});

console.log(left);
// "12345"
console.log(right);
// "54321"
```

## 参考资料

- [MDN: Array.prototype.reduceRight](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight)
- [TypeScript: lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)
