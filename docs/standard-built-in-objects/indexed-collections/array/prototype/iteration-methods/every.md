---
nav:
  title: 内置对象
  order: 2
group:
  title: Array
  path: /indexed-collections/array/
  order: 11
title: Array.prototype.every
order: 21
---

# Array.prototype.every()

`every()` 方法遍历数组中每个成员，通过回调函数判断是否所有成员都满足特定条件。

## 语法

语法：

```js
arr.every( predicate [, thisArg ] )
```

类型声明：

```ts
interface Array<T> {
  every<S extends T>(
    predicate: (value: T, index: number, array: T[]) => value is S,
    thisArg?: any
  ): this is S[];

  every(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;
}
```

参数说明：

| 参数      | 说明                       | 类型     |
| :-------- | :------------------------- | :------- |
| predicate | 用于判定数组成员的回调函数 | function |
| thisArg   | 执行回调函数的 `this` 值   |          |

`callback` 函数的参数：

- `currentValue`：当前数组中处理的元素
- `index`：数组中正处理的当前元素的索引
- `array`：被调用的数组

返回值：

返回当所有数组元素满足回调函数的判断时返回 `true`，否则返回 `false`。

## 方法说明

- 执行该方法会为数组每个成员执行一次回调函数，回调函数需要通过判断代码块后，返回布尔值作为该成员是否通过检测的凭证，如果通过则再为下一个数组成员执行回调函数，直到遇到第一个判断为 `false` 的数组成员则立即给实例方法返回 `false`，否则全部成员都通过检测的回调函数，则返回 `true`。
- 回调函数只会为那些已经被赋值的索引调用，不会为那些被删除或从来没有被赋值的索引调用。
- 如果为实例方法提供一个 `thisArg` 参数，则该参数为调用回调函数时的 `this` 值。如果省略该参数，则为回调函数被调用时的 `this` 值，在非严格模式下为全局对象，在严格模式下传入 `undefined`。
- 遍历的数组成员范围在第一次调用回调函数之前就已确定了。在调用 `every()` 之后添加到数组中的成员不会被回调函数访问到。如果数组中存在的成员被更改，则他们传入回调函数的值是 `every()` 访问到他们那一刻的值。那些被删除的成员或未被赋值的成员将不会被访问到。

## 代码示例

下例检测数组中的所有元素是否都大于 10。

```js
const isBigEnough = (element, index, array) =>
  (element >= 10)[(12, 5, 8, 130, 44)].every(isBigEnough)[
    // false

    (12, 54, 18, 130, 44)
  ].every(isBigEnough);
// true
```

## 参考资料

- [MDN: Array.prototype.every](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
- [TypeScript: lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)
