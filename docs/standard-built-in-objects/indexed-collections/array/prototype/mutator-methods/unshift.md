---
nav:
  title: 内置对象
  order: 2
group:
  title: Array
  path: /indexed-collections/array/
  order: 11
title: Array.prototype.unshift
order: 47
---

# Array.prototype.unshift()

`Array.prototype.unshift()` 方法用于向当前数组的开头位置插入一个或多个指定的元素，并返回插入后的数组长度。

## 语法

语法：

```js
arr.unshift( item1 [, items... ] )
```

类型声明：

```ts
interface Array<T> {
  unshif(...items: T[]): number;
}
```

参数说明：

| 参数  | 说明                                         | 类型 |
| :---- | :------------------------------------------- | :--- |
| item1 | 添加到当前数组开头处的元素                   | any  |
| itemN | 要添加到当前数组开头处的其他项，可以有多个。 | any  |

返回值：

返回插入元素后的当前数组的长度。

## 方法说明

当向数组中添加新的元素时，数组的 `length` 属性也会随之改变（如果数组中有元素的话），一般而言，数组的 `length` 属性将会加 `N` （ `N` 为添加的元素个数）。

## 代码示例

```js
let arr = [1, 2];

arr.unshift(0);
// 3

console.log(arr);
// [0, 1, 2]

arr.unshift(-2, -1);
// 5

console.log(arr);
// [-2, -1, 0, 1, 2]

arr.unshift([-3]);
// 6

console.log(arr);
// [[-3], -2, -1, 0, 1, 2]
```

## 参考资料

- [MDN: Array.prototype.unshift](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)
- [TypeScript: lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)
