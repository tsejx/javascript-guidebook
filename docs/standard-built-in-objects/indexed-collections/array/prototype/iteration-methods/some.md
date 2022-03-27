---
nav:
  title: 内置对象
  order: 2
group:
  title: Array
  path: /indexed-collections/array/
  order: 11
title: Array.prototype.some
order: 30
---

# Array.prototype.some()

`Array.prototype.some()` 方法用于判定数组中是否存在一个成员符合判定函数判定条件。

## 语法

语法：

```js
arr.some( callback [, thisArg ] )
```

类型声明：

```ts
interface Array<T> {
  some(
    predicate: (value: T, index: number, array: readonly T[]) => unknown,
    thisArg?: any
  ): boolean;
}
```

参数说明：

| 参数     | 说明                       | 类型     |
| :------- | :------------------------- | :------- |
| callback | 用于判定数组成员的回调函数 | function |
| thisArg  | 执行回调函数的 `this` 值   |          |

`callback` 函数的参数：

- `currentValue`：当前数组中处理的元素
- `index`：数组中正处理的当前元素的索引
- `array`：被调用的数组

## 方法说明

- 执行该方法会为数组每个成员执行一次回调函数，回调函数需要通过判断代码块后，返回布尔值作为该成员是否通过检测的凭证。当执行回调函数时遇到第一个判定为 `true` 的，则立即跳出迭代，返回 `true`，否则，全部数组成员都执行一次回调函数，没有数组成员通过判定，则返回 `false`。
- 回调函数只会为那些已经被赋值的索引调用，不会为那些被删除或从来没有被赋值的索引调用。
- 如果为实例方法提供一个 `thisArg` 参数，则该参数为调用回调函数时的 `this` 值。如果省略该参数，则为回调函数被调用时的 `this` 值，在非严格模式下为全局对象，在严格模式下传入 `undefined`。
- 遍历的数组成员范围在第一次调用回调函数之前就已确定了。在调用 `some()` 之后添加到数组中的成员不会被回调函数访问到。如果数组中存在的成员被更改，则他们传入回调函数的值是 `some()` 访问到他们那一刻的值。那些被删除的成员或未被赋值的成员将不会被访问到。

## 代码示例

```js
function isBigEnough(element, index, array) {
  return element >= 10;
}

[2, 5, 8, 1, 4].some(isBigEnough)[
  // false

  (12, 5, 8, 1, 4)
].some(isBigEnough);
// true
```

## 参考资料

- [MDN: Array.prototype.some](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
- [TypeScript: lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)
