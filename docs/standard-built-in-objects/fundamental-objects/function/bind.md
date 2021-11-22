---
nav:
  title: 内置对象
  order: 2
group:
  title: Function
  order: 5
title: Function.prototype.bind
order: 4
---

# Function.prototype.bind

`Function.prototype.bind` 方法创建一个新函数，在 `bind()` 被调用时，这个新函数的 `this` 被指定为 `bind()` 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

## 语法

语法：

```ts
bind(thisArg: any, ...argArray: any[]): any;
```

参数

| 参数          | 说明                                                               | 类型 |
| :------------ | :----------------------------------------------------------------- | :--- |
| thisArg       | 可选参数。调用函数时指向的 `this` 指针。                           | /    |
| arg1,arg2,... | 可选参数。当目标函数被调用时，被预置入绑定函数的参数列表中的参数。 | any  |

## 描述

`Function.prototype.bind` 函数会创建一个新 **绑定函数**（Bound Function，BF）。绑定函数是一个 Exotic Function Object（怪异函数对象，ECMAScript 2015 中的术语），它包装了原函数对象。调用绑定函数通常会导致执行 **包装函数**。

绑定函数具有以下内部属性：

- `[[BoundTargetFunction]]`：包装的函数对象
- `[[BoundThis]]`：在调用包装函数时始终作为 `this` 值传递的值。
- `[[BoundArguments]]`：列表，在对包装函数做任何调用都会优先用列表元素填充参数列表。
- `[[Call]]`：执行与此对象关联的代码。通过函数调用表达式调用。内部方法的参数是一个 `this` 值和一个包含通过调用表达式传递给函数的参数的列表。

当调用绑定函数时，它调用 `[[BoundTargetFunction]]` 上的内部方法 `[[Call]]`，就像这样 `Call(boundThis, args)`。其中，`boundThis` 是 `[[BoundThis]]`，`args` 是 `[[BoundArguments]]` 加上通过函数调用传入的参数列表。

绑定函数也可以使用 `new` 运算符构造，它会表现为目标函数已经被构建完毕。提供的 `this` 值会被忽略，但前置参数仍会提供给模拟函数。

## 示例

### 创建绑定函数

`Function.prototype.bind()` 最简单的用法是创建一个函数，不论怎么调用，这个函数都有同样的 `this` 引用。JavaScript 新手经常犯的一个错误是将一个方法从对象中拿出来，然后再调用，期望方法中的 `this` 是原来的对象（比如在回调中传入这个方法）。如果不做特殊处理的话，一般会丢失原来的对象。基于这个函数，用原始的对象创建一个绑定函数，巧妙地解决了这个问题。

```js
this.a = '100';

const foo = {
  a: '99',
  getA: function () {
    return this.a;
  },
};

foo.getA();
// '99'

const retrieveA = foo.getA;

retrieveA();
// '100'

const boundGetA = retrieveA.bind(foo);

boundGetA();
// '99'
```

### 偏函数

`Function.prototype.bind()` 方法的另一个最简单的用法是使一个函数拥有预设的初始参数。只要将这些参数（如果有的话）作为 `bind()` 的参数写在 `this` 后面。当绑定函数被调用时，这些参数会被插入到目标函数的参数列表的开始位置，传递给绑定函数的参数会跟在它们后面。

```js
const foo = function (a, b, c, d, e, f) {
  console.log(a, b, c, d, e, f);
};

// 预设三个参数 1 2 3 -> 对应 foo 参数 a b c
const bar = foo.bind(null, 1, 2, 3);

bar(4, 5, 6);
// 1 2 3 4 5 6
```

### 配合定时器

默认情况下，使用 [window.setTimeout](../../../../browser-object-model/the-window-object/timers/setTimeOut) 时，`this` 关键字会指向 Window 对象。当类的方法中需要 `this` 指向类的实例时，你可能需要显式地把 `this` 绑定到回调函数，就不会丢失该实例的引用。

```js
function LaterBloomer() {
  this.petalCount = Math.ceil(Math.random() * 12) + 1;
}

LaterBloomer.prototype.bloom = function () {
  window.setTimeout(this.declare.bind(this), 1000);
};

LateBloomer.prototype.declare = function () {
  console.log('I am a beautiful flower with ' + this.petalCount + ' petals!');
};

const flower = new LateBloomer();

flower.bloom();
```

## 兼容实现

关键点：

- 创建新函数
- `bind` 被调用时，新函数的 `this` 被 `bind` 的第一个参数指定

实现步骤：

1. 确保调用 `call` 方法的调用方为 `function` 类型
2. 参数：使用 `Array.prototype.slice.call` 将 `context` 参数去除 ❗️（重点）
3. 当前执行上下文：就是调用 `bind` 的函数 `this`
4. 创建返回的新函数
   - 调用方是 `bind` 函数的执行上下文 `currentContext`
   - 使用 `apply` 实现
   - 执行方看调用新函数的所在上下文是否是新函数的实例，是则 `this` 否则 `context`
   - 参数是 `bind` 的参数与新函数参数的合并
5. 处理原型链
6. 返回新函数

```js
Function.prototype.bind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('当前调用 call 方法的不是函数.');
  }

  // 参数要拼接
  const args = Array.prototype.slice.call(arguments, 1);

  const currentContext = this;

  const fn = function () {
    return currentContext.apply(
      this instanceof fn ? this : context,
      args.concat(Array.prototype.slice.call(arguments))
    );
  };

  const OP = function () {};

  if (this.prototype) {
    OP.prototype = this.prototype;
  }

  // 将 fn.prototype 是 OP 的实例，因此返回 fn 若作为 new 的构造函数
  // new 生成的新对象作为 this 传入 fn，新对象的 __proto__ 就是 OP 的实例
  fn.prototype = new OP();

  return fn;
};
```
