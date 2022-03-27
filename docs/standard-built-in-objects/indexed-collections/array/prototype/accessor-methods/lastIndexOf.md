---
nav:
  title: 内置对象
  order: 2
group:
  title: Array
  path: /indexed-collections/array/
  order: 11
title: Array.prototype.lastIndexOf
order: 14
---

# Array.prototype.lastIndexOf()

`Array.prototype.lastIndexOf()` 方法用于查找指定数组成员在数组中最后一次出现的位置。

## 语法

语法：

```js
arr.lastIndexOd( searchElement [, fromIndex ] )
```

类型声明：

```ts
interface Array<T> {
  lastIndexOf(searchElement: T, fromIndex?: number): number;
}
```

参考资料：

| 参数          | 说明                                               | 类型  |
| :------------ | :------------------------------------------------- | :---- |
| searchElement | 需要查找的数组元素                                 | any   |
| fromIndex     | 在当前数组中查找的起始索引，默认为 `arr.lengt - 1` | numer |

返回值：

返回值为 `Number` 类型，返回数组元素在当前数组中最后一次查找到的起始位置（索引）。

## 代码示例

### 基本用法

```js
const arr = [2, 5, 9, 2];

const index = arr.lastIndexOf(2);
// 3

index = arr.lastIndexOf(7);
// -1

index = arr.lastIndexOf(2, 3);
// 3

index = arr.lastIndexOf(2, 2);
// 0

index = arr.lastIndexOf(2, -2);
// 0

index = arr.lastIndexOf(2, -1);
// 3
```

### 查找所有元素

下例使用 `lastIndexOf` 查找到一个成员在数组中所有的索引（下标），并使用 `push` 将所有添加到另一个数组中。

```js
var indices = [];
var arr = ['a', 'b', 'a', 'c', 'a', 'd'];
var element = 'a';
var idx = arr.lastIndexOf(element);

while (idx != -1) {
  indices.push(idx);
  idx = idx > 0 ? arr.lastIndexOf(element, idx - 1) : -1;
}

console.log(indices); // Outputs: [4, 2, 0];
```

注意：我们要单独处理 `idx == 0` 时的情况，因为如果是第一个元素，忽略了`fromIndex` 参数则第一个元素总会被查找。这不同于 `indexOf` 方法。

## 参考资料

- [MDN: Array.prototype.lastIndexOf](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)
- [TypeScript: lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)
