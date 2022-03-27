---
nav:
  title: 内置对象
  order: 2
group:
  title: Array
  path: /indexed-collections/array/
  order: 11
title: Array.prototype.flat
order: 16
---

# Array.prototype.flat()

⭐️ `ES2019(ES10)新特性`

`Array.prototype.flat()` 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

## 语法

语法：

```js
arr.flat([depth]);
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
  flat<A, D extends number = 1>(this: A, depth?: D): FlatArray<A, D>[];
}

interface Array<T> {
  flat<A, D extends number = 1>(this: A, depth?: D): FlatArray<A, D>[];
}
```

参数说明：

| 参数  | 说明                                                 | 类型   |
| :---- | :--------------------------------------------------- | :----- |
| depth | （可选参数）指定要提取嵌套数组的结构深度，默认值为 1 | number |

返回值：

返回一个包含将数组与子数组种所有元素的新数组。

## 代码示例

### 基本用法

```js
const arr1 = [0, 1, 2, [3, 4]];

console.log(arr1.flat());
// exprected output: [0, 1, 2, 3, 4]

const arr2 = [0, 1, 2, [[[3, 4]]]];

console.log(arr2.flat());
// exprected output: [0, 1, 2, [ 3, 4]];
```

### 扁平化嵌套数组

```js
const arr1 = [1, 2, [3, 4]];
arr1.flat();
// [1, 2, 3, 4]

const arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat();
// [1, 2, 3, 4, [5, 6]]

const arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2);
// [1, 2, 3, 4, 5, 6]

//使用 Infinity，可展开任意深度的嵌套数组
const arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
arr4.flat(Infinity);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

### 扁平化与数组空项

`flat()` 方法将会移除数组中的空项：

```js
connst arr4 = [1, 2, , 4, 5];

arr4.flat();
// [1, 2, 4, 5]
```

## 参考资料

- [MDN: Array.prototype.flat](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)
- [TypeScript: lib.es2019.array.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es2019.array.d.ts)
