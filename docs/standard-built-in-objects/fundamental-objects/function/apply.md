---
nav:
  title: 内置对象
  order: 2
group:
  title: Function
  order: 5
title: Function.prototype.apply
order: 2
---

# Function.prototype.apply

`Function.prototype.apply` 方法用于指定函数调用指向的 `this` 指针，并提供类数组类型的参数列表作为指定函数的参数。

## 语法

语法：

```ts
apply(thisArg: any, argArray?: any): any;
```

参数：

| 参数     | 说明                                     | 类型                |
| -------- | ---------------------------------------- | ------------------- |
| thisArg  | 可选参数。调用函数时指向的 `this` 指针。 | /                   |
| argArray | 可选参数。调用函数参数列表。             | Array \| TypedArray |

## 描述

`Function.prototype.apply` 与 `Function.prototype.call` 非常相似，不同之处在于提供参数的方式，`apply` 使用参数数组而非一组参数列表。

你可以使用 `arguments` 对象作为 `argArray` 参数。`arguments` 是一个函数的局部变量，它可以被用作被调用对象的所有未指定的参数。这样，你在使用 `apply` 方法时就不需要知道被调用的对象的所有参数。你可以使用 `arguments` 来把所有的参数传递给被调用对象。 被调用对象接下来就负责处理这些参数。

## 示例

### 数组元素添加

使用 [Array.prototype.push](../../../indexed-collections/array-objects/properties-of-the-array-prototype-object/mutator-methods/push) 能将元素追加到数组中，并且，该方法可以接受可变数量的参数。

但是如果，我们需要传递一个数组追加到数组中，它实际上会将该数组作为单个元素添加，而不是单独添加元素，因此我们最终得到一个数组内的数组。

这种情况下，虽然可以通过 [Array.prototype.concat](../../../indexed-collections/array-objects/properties-of-the-array-prototype-object/mutator-methods/concat) 实现我们想要的行为，但它实际上不是附加到原有数组中，而是创建并返回新的数组。

而我们可以通过 `Function.prototype.apply` 实现该需求。

```js
const foo = [];
const bar = [1, 2, 3, 4];

foo.push.apply(foo, bar);

console.log(foo);
// [1, 2, 3, 4]
```

### 内置函数使用

可以使用 `Function.prototype.apply` 实现本来需要遍历数组变量的任务中使用内建的的函数。

以下例子使用 `Math.max` 和 `Math.min` 来找出一个数组中的最大 / 最小值。

```js
const foo = [2, 4, 6, 8, 10];

const max = Math.max.apply(null, foo);
const min = Math.min.apply(null, foo);
```

⚠️ **注意**：使用上述方式调用 `Function.prototype.apply`，会有超出 JavaScript 引擎的参数长度限制的风险。当对一个函数传入非常多的参数（比如一万个）时，就非常有可能会导致越界问题，这个临界值是根据不同的 JavaScript 引擎而定的（JavaScript 核心中已经做了硬编码 [参数个数限制在 65536](https://bugs.webkit.org/show_bug.cgi?id=80797)），因为这个限制（实际上也是任何用到超大栈空间的行为的自然表现）是未指定的，有些引擎会抛出异常。更糟糕的是其他引擎会直接限制传入到方法的参数个数，导致参数丢失。

如果参数数组可能很大，可以使用以下策略处理：将参数数组切块后循环传入目标方法。

```js
function minOfArray(arr) {
  var min = Infinity;
  var QUANTUM = 32768;

  for (var i = 0, len = arr.length; i < len; i += QUANTUM) {
    var submin = Math.min.apply(null, arr.slice(i, Math.min(i + QUANTUM, len)));
    min = Math.min(submin, min);
  }

  return min;
}

var min = minOfArray([5, 6, 2, 3, 7]);
```

## 兼容实现

实现步骤：

1. 确保调用 `call` 方法的调用方为 `function` 类型
2. 参数：将参数数组转化为数组形式 ❗️（重点）
3. 执行上下文：确保 `context` 执行上下文，用 `window` 全局变量兜底
4. 将 `this`（调用方函数）赋值到执行上下文上，用 `Symbol` 创建属性键名以防冲突
5. 执行调用方函数，并保存调用结果 ❗️（重点）
6. 删除调用方（执行上下文）的键值对
7. 返回结果

与 [Function.prototype.call](./call) 实现仅获取参数的区别。

```js
Function.prototype.call = function (context) {
  // context 是调用 call 的时候参数中的第一个参数

  // 先判断当前的调用方是不是一个函数
  if (typeof this !== 'function') {
    throw new TypeError('当前调用 call 方法的不是函数.');
  }

  // 保存调用方给的参数
  const args = arguments[1];

  // 确定执行方的类型，因为可以传 null 和 undefined
  context = context || window;

  // 将调用方的内容保存为执行方的一个属性，为了保证不与执行方中的 key 键名重复
  const fn = Symbol('fn');

  context[fn] = this;

  // 执行保存的函数，这个时候作用域就是在调用方的对象的作用域下执行，改变 this 的指向
  const result = context[fn](...args);

  // 执行完删除刚才新增的属性值
  delete context[fn];

  // 返回执行结果
  return result;
};
```
