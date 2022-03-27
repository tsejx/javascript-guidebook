---
nav:
  title: 内置对象
  order: 2
group:
  title: Array
  path: /indexed-collections/array/
  order: 11
title: Array.prototype.splice
order: 46
---

# Array.prototype.splice()

`Array.prototype.splice()` 方法用于从当前数组中移除一部分连续的元素。如有必要，还可以在所移除元素的位置上插入一个或多个新的元素。该函数以数组形式返回从当前数组中被移除的元素。

## 语法

语法：

```js
arr.splice( start, deleteCount [,items... ] )
```

类型声明：

```ts
interface Array<T> {
  splice(start: number, deleteCount?: number): T[];

  splice(start: number, deleteCount: number, ...items: T[]): T[];
}
```

参数说明：

| 参数        | 说明                                               | 类型   |
| :---------- | :------------------------------------------------- | :----- |
| start       | 数组中移除元素操作的起点索引，从 0 开始。          | number |
| deleteCount | （可选）需要移除的元素个数。                       | number |
| items       | 要添加到数组中元素被移除位置的新元素，可以有多个。 | any    |

返回值：

返回从当前数组中被移除的元素所组成的新的数组。

如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。

当移除数组中的元素时，数组的 `length` 属性也会随之改变。一般而言，数组的 `length` 属性将会减 N（N 为**实际移除**的元素个数）。

## 方法说明

如果添加进数组的元素个数不等于被删除的元素个数，数组的长度会发生相应的改变。

**注意**：请注意，`splice()`方法与 `slice()` 方法的作用是不同的，`splice()` 方法会直接对数组进行修改。

- `start` 开始索引
  - 如果 `start` 是负值，则视为从 `arr.length + start` 位开始
  - 如果 `start` 超出了数组长度，则返回空数组
  - 如果只是用 `start` 参数而不使用 `deleteCount` 和 `items`，表示删除所有元素，返回空数组
- `deleteCount` 删除数组元素数量
  - 如果 `deleteCount` 为 0 或负数，则不会移除任何元素，并返回一个空数组
  - 如果 `deleteCount` 被省略，则其相当于删除从开始索引到数组末尾的元素
- `items` 填补的数组元素
  - 如果 `items` 参数为 `Array` 类型，仍会被当作一个元素看待，插入到当前数组中
  - 如果不指定 `items` 参数，则 `splice()` 将只删除数组元素

## 代码示例

在索引为 2 的位置插入 `e`。

```js
const foo = ['a', 'b', 'c', 'd'];

foo.splice(2, 0, 'e');

console.log(foo);
// ["a", "b", "e", "c", "d"]
```

从索引为 2 的位置删除一项（也就是 `e` 这一项）。

```js
foo.splice(2, 1);

console.log(foo);
// ["a", "b", "c", "d"]
```

```js
var foo = ['a', 'b', 'c', 'd'];

// 从第 2 位开始删除 0 个元素，插入 "e"
var removed = foo.splice(2, 0, 'e');
// 运算后的 foo:["a", "b", "e", "c", "d"]
// 被删除元素数组：[]，没有元素被删除

// 从第 3 位开始删除 1 个元素
removed = foo.splice(3, 1);
// 运算后的 foo：["a", "b", "c",]
// 被删除元素数组：["d"]

// 从第 2 位开始删除 1 个元素，然后插入 "f"
removed = foo.splice(2, 1, 'f');
// 运算后的 foo: ["a", "b", "f", "d"]
// 被删除元素数组：["e"]

// 从第 0 位开始删除 2 个元素，然后插入 "x", "y" 和 "z"
removed = foo.splice(0, 2, 'x', 'y', 'z');
// 运算后的 foo：["x", "y", "z", "f", "d"]
// 被删除元素的数组：["a", "b"]

// 从第 3 位开始删除 2 个元素
removed = foo.splice(3, Number.MAX_VALUE);
// 运算后的 foo: ["x", "y", "z"]
// 被删除元素的数组：["f", "d"]

// 从第1位开始删除其后所有即[1，end]的元素
removed = foo.splice(1);
// 运算后的 foo: ["x"]
// 被删除元素的数组：["y","z"]
```

## 参考资料

- [MDN: Array.prototype.splice](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
- [TypeScript: lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)
