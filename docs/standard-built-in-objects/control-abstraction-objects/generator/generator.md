---
nav:
  title: 内置对象
  order: 2
group:
  title: 控制抽象对象
  path: /control-abstraction-objects/
  order: 15
title: Generator
order: 30
---

# Generator

Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。

> 本篇着重介绍 语法及 API，异步编程应用参考 [Generator 函数的异步应用](./generator-async)

## 状态机

Generator 函数有多种理解角度。语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。

执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个 [遍历器对象](../iterator-objects/iterator) 生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

### 函数特征

形式上，Generator 函数是一个普通函数，但是有两个特征

- `function` 关键字与函数名之间有一个星号（`*`）
- 函数体内部使用 `yield`（中文 `生产/产出` 的意思）表单式，定义不同的内部状态

```js
function* helloWorldGenerator() {
  yield 'Hello';
  yield 'World';
  return 'Ending';
}

const hw = helloWorldGenerator();
```

代码定义了一个 Generator 函数 `helloWorldGenerator`，它内部有两个 `yield` 表达式（`hello` 和 `world`），即该函数有三个状态：`hello`、`world` 和 `return` 语句（结束执行）。

### 调用方法

Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，调用 Generator 函数后，该函数并**不执行**，返回的也不是函数运行结果，而是一个**指向内部状态的指针对象**，也就是 [遍历器对象](../iterator-objects/iterator)（Iterator Object）。

下一步，必须调用遍历器对象的 `next` 方法，使得指针移向下一个状态。也就是说，每次调用 `next` 方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个 `yield` 表达式（或 `return` 语句）为止。换言之，Generator 函数是分段执行的，`yield` 表达式是暂停执行的标记，而 `next` 方法可以恢复执行。

```js
hw.next();
// { value: 'Hello', done: false }

hw.next();
// { value: 'World', done: false }

hw.next();
// { value: 'Ending', done: true }

hw.next();
// { value: undefined, done: true }
```

上面代码一共调用了四次`next`方法。

第一次调用，Generator 函数开始执行，直到遇到第一个 `yield` 表达式为止。`next` 方法返回一个对象，它的`value` 属性就是当前 `yield` 表达式的值 `Hello`，`done` 属性的值 `false`，表示遍历还没有结束。

第二次调用，Generator 函数从上次 `yield` 表达式停下的地方，一直执行到下一个 `yield` 表达式。`next` 方法返回的对象的 `value` 属性就是当前 `yield` 表达式的值 `World`，`done` 属性的值 `false`，表示遍历还没有结束。

第三次调用，Generator 函数从上次 `yield` 表达式停下的地方，一直执行到 `return` 语句（如果没有 `return` 语句，就执行到函数结束）。`next` 方法返回的对象的 `value` 属性，就是紧跟在 `return` 语句后面的表达式的值（如果没有 `return` 语句，则 `value` 属性的值为 `undefined`），`done` 属性的值 `true`，表示遍历已经结束。

第四次调用，此时 Generator 函数已经运行完毕，`next` 方法返回对象的 `value` 属性为 `undefined`，`done` 属性为 `true`。以后再调用 `next` 方法，返回的都是这个值。

总结一下，调用 Generator 函数，返回一个遍历器对象，代表 Generator 函数的内部指针。以后，每次调用遍历器对象的 `next` 方法，就会返回一个有着 `value` 和 `done` 两个属性的对象。`value`属性表示当前的内部状态的值，是 `yield` 表达式后面那个表达式的值；`done` 属性是一个布尔值，表示是否遍历结束。

## yield 表达式

由于 Generator 函数返回的遍历器对象，只有调用 `next` 方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。`yield` 表达式就是暂停标志。

遍历器对象的 `next` 方法的运行逻辑如下。

1. 遇到 `yield` 表达式，就暂停执行后面的操作，并将紧跟在 `yield` 后面的那个表达式的值，作为返回的对象的 `value` 属性值。

2. 下一次调用 `next` 方法时，再继续往下执行，直到遇到下一个 `yield` 表达式。

3. 如果没有再遇到新的 `yield` 表达式，就一直运行到函数结束，直到 `return` 语句为止，并将 `return` 语句后面的表达式的值，作为返回的对象的 `value` 属性值。

4. 如果该函数没有 `return` 语句，则返回的对象的 `value` 属性值为 `undefined`。

需要注意的是，`yield` 表达式后面的表达式，只有当调用 `next` 方法、内部指针指向该语句时才会执行，因此等于为 JavaScript 提供了手动的“**惰性求值**”（Lazy Evaluation）的语法功能。

```js
function* gen() {
  yield 123 + 456;
}
```

上面代码中，`yield` 后面的表达式 `123 + 456`，不会立即求值，只会在`next`方法将指针移到这一句时，才会求值。

### yield 与 return

`yield` 表达式与 `return` 语句既有相似之处，也有区别。

- 相似

  - 两种语句表达式都能返回紧跟在语句后面的那个表达式的值。

- 区别
  - **记忆功能**：每次遇到 `yield`，函数暂停执行，下一次再从该位置继续向后执行，而 `return` 语句不具备位置记忆的功能。
  - **执行次数**：一个函数里面，只能执行一次（或者说一个）`return` 语句，但是可以执行多次（或者说多个）`yield` 表达式。
  - **返回次数**：正常函数只能返回一个值，因为只能执行一次 `return` ；Generator 函数可以返回一系列的值，因为可以有任意多个`yield`。从另一个角度看，也可以说 Generator 生成了一系列的值，这也就是它的名称的来历。

### 暂缓执行函数

Generator 函数可以不用 `yield` 表达式，这时就变成了一个单纯的**暂缓执行函数**。

```js
function* fn() {
  console.log('执行了！');
}

var generator = fn();

setTimeout(function() {
  generator.next();
}, 2000);
```

上面代码中，函数 `fn` 如果是普通函数，在为变量 `generator` 赋值时就会执行。但是，函数 `fn` 是一个 Generator 函数，就变成只有调用 `next` 方法时，函数 `fn` 才会执行。

### 表达式规范

另外需要注意，**`yield`表达式只能用在 Generator 函数里面**，用在其他地方都会报错。

```js
(function (){
  yield 1;
})()
// SyntaxError: Unexpected number
```

上面代码在一个普通函数中使用 `yield` 表达式，结果产生一个句法错误。

### 嵌套表达式

`yield` 表达式如果用在另一个表达式之中，必须放在**圆括号**里面。

```js
function* demo() {
  console.log('Hello' + yield); // SyntaxError
  console.log('Hello' + yield 123); // SyntaxError

  console.log('Hello' + (yield)); // OK
  console.log('Hello' + (yield 123)); // OK
}
```

`yield` 表达式用作**函数参数**或放在**赋值表达式**的右边，可以不加括号。

```js
function* demo() {
  foo(yield 'a', yield 'b'); // OK
  let input = yield; // OK
}
```

## 原型方法

- [Generator.prototype.next](properties-of-the-promise-prototype-object/next)
- [Generator.prototype.return](properties-of-the-promise-prototype-object/return)
- [Generator.prototype.throw](properties-of-the-promise-prototype-object/throw)

**原型方法共同点**

三者的作用都是让 Generator 函数恢复执行，并且使用不同的语句替换 `yield` 表达式。

`next()` 是将 `yield` 表达式替换成一个值。

```js
const generator = function*(x, y) {
  let result = yield x + y;
  return result;
};

const gen = generator(1, 2);

gen.next(); // Object {value: 3, done: false}

gen.next(1); // Object {value: 1, done: true}

// 相当于将 let result = yield x + y
// 替换成 let result = 1;
```

上面代码中，第二个 `next(1)` 方法就相当于将 `yield` 表达式替换成一个值 `1`。如果 `next` 方法没有参数，就相当于替换成 `undefined`。

`throw()` 是将 `yield` 表达式替换成一个 `throw` 语句。

```js
gen.throw(new Error('出错了')); // Uncaught Error: 出错了

// 相当于将 let result = yield x + y
// 替换成 let result = throw(new Error('出错了'));
```

`return()` 是将 `yield` 表达式替换成一个 `return` 语句。

```js
gen.return(2); // Object {value: 2, done: true}

// 相当于将 let result = yield x + y
// 替换成 let result = return 2;
```

## 作为对象的函数

如果一个对象的属性是 Generator 函数，可以简写成下面的形式。

```js
let obj = {
  *generator() {
    // ···
  },
};
```

上面代码中，`generator` 属性前面有一个星号，表示这个属性是一个 Generator 函数。

它的完整形式如下，与上面的写法是等价的。

```js
let obj = {
  myGeneratorMethod: function*() {
    // ···
  },
};
```

## 判断方法

**生成器对象的判断方法**

```js
function isGenerator(obj) {
  return obj && typeof obj.next === 'function' && typeof obj.throw === 'function';
}
```

**生成器函数的判断方法**

```js
function isGeneratorFunction() {
  var constructor = obj.constructor;
  if (!constructor) return false;
  if ('GeratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName)
    return true;
  return isGenerator(constructor.prototype);
}
```

利用函数的 `constructor` 构造器的名字来判断，为了兼容性使用 `name` 与 `displayName` 两个属性来进行判断. 这里递归调用 `isGenerator` 判断 `constructor` 的原型是因为有自定义迭代器的存在。

---

**参考书籍：**

- [《ECMAScript 6 入门》阮一峰著](http://es6.ruanyifeng.com/#docs/generator)
