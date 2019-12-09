# Function.prototype.bind

`Function.prototype.bind` 方法创建一个新函数，在 `bind()` 被调用时，这个新函数的 `this` 被指定为 `bind()` 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

## 语法

```js
Function.prototype.bind(thisArg [, arg1 [, arg2 [, ...argN]]])
```

| 参数          | 说明                                                               | 类型 |
| ------------- | ------------------------------------------------------------------ | ---- |
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
  getA: function() {
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
function a() {
  return Array.prototype.slice.call(arguments);
}

function b(arg1, arg2) {
  return arg1 + arg2;
}

const a1 = a(1, 2, 3);
// [1, 2, 3]

var b1 = b(1, 2);
// 3

// 创建一个函数，它拥有预设参数列表。
const leadingThirtysevenList = a.bind(null, 37);

// 创建一个函数，它拥有预设的第一个参数
const addThirtySeven = b.bind(null, 37);

const a2 = leadingThirtysevenList();
// [37]

const a3 = leadingThirtysevenList(1, 2, 3);
// [37, 1, 2, 3]

const b2 = addThirtySeven(5);
// 37 + 5 = 42

const b3 = addThirtySeven(5, 10);
// 37 + 5 = 42 ，第二个参数被忽略
```

### 配合定时器

默认情况下，使用 [window.setTimeout](../../../../browser-object-model/the-window-object/timers/setTimeOut.md) 时，`this` 关键字会指向 Window 对象。当类的方法中需要 `this` 指向类的实例时，你可能需要显式地把 `this` 绑定到回调函数，就不会丢失该实例的引用。

```js
function LaterBloomer() {
  this.petalCount = Math.ceil(Math.random() * 12) + 1;
}

LaterBloomer.prototype.bloom = function() {
  window.setTimeout(this.declare.bind(this), 1000);
};

LateBloomer.prototype.declare = function() {
  console.log('I am a beautiful flower with ' + this.petalCount + ' petals!');
};

const flower = new LateBloomer();

flower.bloom();
```
