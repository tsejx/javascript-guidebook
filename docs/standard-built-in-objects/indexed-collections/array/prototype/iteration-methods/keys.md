---
nav:
  title: 内置对象
  order: 2
group:
  title: Array
  path: /indexed-collections/array/
  order: 11
title: Array.prototype.keys
order: 26
---

# Array.prototype.keys()

`Array.prototype.keys()` 方法用于获取一个新的 Iterator 对象，它包含数组中每个索引的键。

## 语法

语法：

```js
arr.keys();
```

类型声明：

```ts
interface IteratorYieldResult<TYield> {
  done?: false;
  value: TYield;
}

interface IteratorReturnResult<TReturn> {
  done: true;
  value: TReturn;
}

type IteratorResult<T, TReturn = any> = IteratorYieldResult<T> | IteratorReturnResult<TReturn>;

interface Iterator<T, TReturn = any, TNext = undefined> {
  // NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.
  next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
  return?(value?: TReturn): IteratorResult<T, TReturn>;
  throw?(e?: any): IteratorResult<T, TReturn>;
}

interface IterableIterator<T> extends Iterator<T> {
  [Symbol.iterator](): IterableIterator<T>;
}

interface Array<T> {
  keys(): IterableIterator<number>;
}
```

返回值：

返回 一个新的 Array Iterator 对象。

## 代码示例

```js
let arr = ['a', 'b', 'c'];

let iterator = arr.keys();
// undefined

console.log(iterator);
// Array Iterator {}

console.log(iterator.next());
// Object {value: 0, done: false}

console.log(iterator.next());
// Object {value: 1, done: false}

console.log(iterator.next());
// Object {value: 2, done: false}

console.log(iterator.next());
// Object {value: undefined, done: true}
```

索引迭代器会包含那些没有对应元素的索引。

```js
const arr = ['a', , 'c'];
const sparseKeys = Object.keys(arr);
const denseKeys = [...arr.keys()];

console.log(sparseKeys); // ['0', '2']

console.log(denseKeys); // [0, 1, 2]
```

## 参考资料

- [MDN: Array.prototype.keys](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/keys)
- [TypeScript: lib.es2015.iterable.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es2015.iterable.d.ts)
