---
nav:
  title: 内置对象
  order: 2
group:
  title: Array
  path: /indexed-collections/array/
  order: 11
title: Array.prototype.entries
order: 20
---

# Array.prototype.entries()

`Array.prototype.entries()` 方法返回一个新的 Array Iterator 对象，该对象包含数组中每个索引的键值对。

## 语法

语法：

```js
arr.entries();
```

类型声明：

```ts
interface IterableIterator<T> extends Iterator<T> {
  [Symbol.iterator](): IterableIterator<T>;
}

interface Array<T> {
  entries(): IterableIterator<[number, T]>;
}
```

返回值：

返回一个新的 Array 迭代器对象。Array Iterator 是对象，它的原型上有一个 `next()` 方法，可用于便利迭代器取得原数组的键值对。详情请查询 [Iterator 对象](../../control-abstraction-objects/iterator)

## 代码示例

### 基本用法

```js
const arr = ['a', 'b', 'c'];

const iterator = arr.entries();
const result = [];

// 注意是 length + 1，比数组的长度大
for (let i = 0; i < arr.length + 1; i++) {
  // 每次迭代更新 next
  const item = iterator.next();
  // 这里可以看到更新后的 done 都是 false
  console.log(item.done);
  // 遍历迭代器结束 done 才是 true
  if (item.done !== true) {
    console.log(item.value);
    result[i] = item.value;
  }
}

console.log(result);
// Output: ['a', 'b', 'c']
```

### 二维数组排序

```js
function sortArr(arr) {
  let goNext = true;
  let entries = arr.entries();
  while (goNext) {
    let result = entries.next();
    if (result.done !== true) {
      result.value[1].sort((a, b) => a - b);
      goNext = true;
    } else {
      goNext = false;
    }
  }
  return arr;
}

const arr = [
  [1, 34],
  [456, 2, 3, 44, 234],
  [4567, 1, 4, 5, 6],
  [34, 78, 23, 1],
];

sortArr(arr);

/*(4) [Array(2), Array(5), Array(5), Array(4)]
  0:(2) [1, 34]
  1:(5) [2, 3, 44, 234, 456]
  2:(5) [1, 4, 5, 6, 4567]
  3:(4) [1, 23, 34, 78]
  length:4
  __proto__:Array(0)
*/
```

### 使用 for-of 循环

```js
const arr = ['a', 'b', 'c'];
const iterator = arr.entries();

for (let item of iterator) {
  console.log(item);
}
// [0, 'a']
// [1, 'b']
// [2, 'c']
```

## 参考资料

- [MDN: Array.prototype.entries](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)
- [TypeScript: lib.es2015.iterable.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es2015.iterable.d.ts)
