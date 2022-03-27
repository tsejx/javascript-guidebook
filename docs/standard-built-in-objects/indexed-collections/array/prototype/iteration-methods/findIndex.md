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

语法：

```js
arr.findIndex( callback [, thisArg ])
```

类型声明：

```ts
interface Array<T> {
  findIndex(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): number;
}
```

参数说明：

| 参数     | 类型                       | 说明     |
| :------- | :------------------------- | :------- |
| callback | 用于判定数组成员的回调函数 | function |
| thisArg  | 执行回调函数的 `this` 值   |          |

`callback` 函数的参数：

- `currentValue`：当前数组中处理的元素
- `index`：数组中正处理的当前元素的索引
- `array`：被调用的数组

## 代码示例

### 基本用法

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

## 参考资料

- [MDN: Array.prototype.findIndex](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
- [TypeScript: lib.es2015.core.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es2015.core.d.ts)
