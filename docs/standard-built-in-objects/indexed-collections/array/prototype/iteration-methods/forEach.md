---
nav:
  title: 内置对象
  order: 2
group:
  title: Array
  path: /indexed-collections/array/
  order: 11
title: Array.prototype.forEach
order: 25
---

# Array.prototype.forEach()

`Array.prototype.forEach()` 方法用于迭代数组的每项成员。

## 语法

语法：

```js
arr.forEach( callbackfn [, thisArg ] )
```

类型声明：

```ts
interface Array<T> {
  forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
}
```

参数说明：

| 参数       | 说明                             | 类型     |
| :--------- | :------------------------------- | :------- |
| callbackfn | 用于遍历数组成员时执行的回调函数 | function |
| thisArg    | 执行回调函数的 `this` 值         |          |

`callbackfn` 函数的参数：

- `currentValue`：当前数组中处理的元素
- `index`：数组中正处理的当前元素的索引
- `array`：被调用的数组

返回值：

返回 `undefined`。

## 方法说明

- 该方法按升序为数组中含有效值的每一项执行一次回调函数，那些已删除（使用 `delete` 方法等情况）或者未初始化的项将被跳过（但不包括那些值为 `undefined` 的项，例如在稀疏数组中）。
- 该方法遍历的范围在第一次调用回调函数前就会确定。调用 `forEach()` 后添加到数组中的项不会被 `callbackfn` 访问到。如果已经存在的值被改变，则传递给 `callbackfn` 的值是 `forEach` 遍历到他们那一刻的值。已删除的项不会被遍历到。如果已访问的元素在迭代时被删除了（例如使用 `shift()` ） ，之后的元素将被跳过。
- `forEach()` 为每个数组元素执行 `callbackfn` 函数；不像 `map()` 或者 `reduce()` ，它总是返回 `undefined` 值，并且不可链式调用。典型用例是在一个链的最后执行副作用。

**注意**： 没有办法中止或者跳出 `forEach` 循环，除了抛出一个异常。如果你需要这样，使用 `forEach()` 函数是错误的，你可以用一个简单的循环作为替代。如果您正在测试一个数组里的元素是否符合某条件，且需要返回一个布尔值，那么可使用 `every()` 或 `some()`。如果可用，新方法 `find()` 或者 `findIndex()` 也可被用于真值测试的提早终止。

## 代码示例

```js
const arr = ['a', 'b', 'c'];

arr.forEach(function (element) {
  console.log(element);
});

arr.forEach((element) => console.log(element));
// a b c
```

## 参考资料

- [MDN: Array.prototype.forEach](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
- [TypeScript: lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)
