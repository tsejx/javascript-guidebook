---
nav:
  title: 内置对象
  order: 2
group:
  title: Array
  path: /indexed-collections/array/
  order: 11
title: Array.prototype.map
order: 27
---

# Array.prototype.map()

`Array.prototype.map()` 根据传递的转换函数，更新给定数组中的每个值，并返回一个相同长度的新数组。它接受一个回调函数作为参数，用以执行转换过程。

## 语法

语法：

```js
const new_arr = old_arr.map(callback = function(currentValue, index, array){} [, thisArg])
```

类型声明：

```ts
interface Array<T> {
  map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
}
```

参数说明：

| 参数         | 说明                             | 类型     |
| :----------- | :------------------------------- | :------- |
| callbackFunc | 用于遍历数组成员时执行的回调函数 | function |
| thisArg      | 执行回调函数的 `this` 值         |          |

`callback` 函数的参数：

- `currentValue`：当前数组中处理的元素
- `index`：数组中正处理的当前元素的索引
- `array`：被调用的数组

返回值：

返回回调函数的结果，如果未设定返回值，则返回当前遍历的数组成员。

## 方法说明

- 该方法按升序为数组中含有效值的每一项执行一次回调函数，那些已删除（使用 `delete` 方法等情况）或者未初始化的项将被跳过（但不包括那些值为 `undefined` 的项，例如在稀疏数组中）。
- 使用 `map` 方法处理数组时，数组元素的范围是在 `callback` 方法第一次调用之前就已经确定了。在 `map` 方法执行的过程中：原数组中新增加的元素将不会被 `callback` 访问到；若已经存在的元素被改变或删除了，则它们的传递到 `callback` 的值是 `map` 方法遍历到它们的那一时刻的值；而被删除的元素将不会被访问到。

## 代码示例

下面的代码创建了一个新数组，值为原数组中对应数字的平方根。

```js
const numbers = [1, 4, 9];
const roots = numbers.map(Math.sqrt);

// Math.sqrt(x)

console.log(numbers);
// [1, 4, 9]
console.log(roots);
// [1, 2, 3],
```

### 格式化对象数组

以下代码将一个包含对象的数组用以创建一个包含新重新格式化对象的新数组。

```js
const kvArray = [
  {
    key: 1,
    value: 10,
  },
  {
    key: 2,
    value: 20,
  },
  {
    key: 3,
    value: 30,
  },
];

const reformattedArray = kvArray.map(function (obj) {
  let rObj = {};
  rObj[obj.key] = obj.value;
  return rObj;
});

// reformattedArray 数组为： [{1: 10}, {2: 20}, {3: 30}],

// kvArray 数组未被修改:
// [{key: 1, value: 10},
//  {key: 2, value: 20},
//  {key: 3, value: 30}]
```

### 回调函数参数

经典面试题。

```js
const answer = ['1', '2', '3'].map(parseInt);

console.log(answer);
// [1, NaN, NaN]
```

## 参考资料

- [MDN: Array.prototype.map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [TypeScript: lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)
