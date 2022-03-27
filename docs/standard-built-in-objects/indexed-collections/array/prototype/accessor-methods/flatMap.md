---
nav:
  title: 内置对象
  order: 2
group:
  title: Array
  path: /indexed-collections/array/
  order: 11
title: Array.prototype.flatMap
order: 17
---

# Array.prototype.flatMap()

⭐️ `ES2019(ES10)新特性`

`Array.prototype.flatMap()` 方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。它与 [Array.prototype.map()](./map) 连着深度值为 1 的 [Array.prototype.flat()](./flat) 几乎相同，但该方法通常在合并成一种方法的效率稍微高一些。

## 语法

语法：

```js
arr.flatMap(callback, [thisArg]);
```

类型声明：

```ts
type FlatArray<Arr, Depth extends number> = {
  done: Arr;
  recur: Arr extends ReadonlyArray<infer InnerArr>
    ? FlatArray<
        InnerArr,
        [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20][Depth]
      >
    : Arr;
}[Depth extends -1 ? 'done' : 'recur'];

interface ReadonlyArray<T> {
  flatMap<U, This = undefined>(
    callback: (this: This, value: T, index: number, array: T[]) => U | ReadonlyArray<U>,
    thisArg?: This
  ): U[];
}

interface Array<T> {
  flatMap<U, This = undefined>(
    callback: (this: This, value: T, index: number, array: T[]) => U | ReadonlyArray<U>,
    thisArg?: This
  ): U[];
}
```

参数说明：

| 参数     | 说明                                                 | 类型     |
| :------- | :--------------------------------------------------- | :------- |
| callback | 可以生成一个新数组中的元素的函数                     | Function |
| thisArg  | （可选参数）执行 `callback` 函数时，使用的 `this` 值 |          |

`callback` 函数的参数：

- `currentValue`：当前数组中处理的元素
- `index`：（可选的）数组中正处理的当前元素的索引
- `array`：（可选的）被调用的数组

## 代码示例

### 基本用法

```js
const arr1 = [1, 2, 3, 4];

arr1.map((x) => [x * 2]);
// [[2], [4], [6], [8]];

arr1.flatMap((x) => [x * 2]);
// [2, 4, 6, 8]

// 只会扁平化一层
arr1.flatMap((x) => [[x * 2]]);
// [[2], [4], [6], [8]]
```

## 参考资料

- [MDN: Array.prototype.flatMap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)
- [TypeScript: lib.es2019.array.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es2019.array.d.ts)
