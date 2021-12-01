---
nav:
  title: 内置对象
  order: 2
group:
  title: 控制抽象对象
  path: /control-abstraction-objects/
  order: 15
title: Generator.prototype.throw
order: 34
---

# Generator.prototype.throw

Generator 函数返回的遍历器对象，都有一个 `throw` 方法，可以在**函数体外抛出错误**，然后在 Generator **函数体内捕获**。

```js
const geratorgenerator = function* () {
  try {
    yield;
  } catch (e) {
    console.log('内部捕获', e);
  }
};

const iterator = generator();
iterator.next();

try {
  iterator.throw('a');
  iterator.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}

// 内部捕获 a
// 外部捕获 b
```

上面代码中，遍历器对象 `iterator` 连续抛出两个错误。

- 第一个错误被 Generator 函数体内的 `catch` 语句捕获。

- `iterator` 第二次抛出错误，由于 Generator 函数内部的 `catch` 语句已经执行过了，不会再捕捉到这个错误了，所以这个错误就被抛出了 Generator 函数体，被函数体外的 `catch` 语句捕获。

## 可接收参数

💡 `throw` 方法可以接受一个参数，该参数会被 `catch` 语句接收，建议抛出 `Error` 对象的实例。

```js
const generator = function* () {
  try {
    yield;
  } catch (e) {
    console.log(e);
  }
};

const iterator = generator();

iterator.next();

iterator.throw(new Error('出错了！'));
// Error: 出错了！(…)
```

⚠️ **注意**：不要混淆遍历器对象的 `throw` 方法和全局的 `throw` 命令。

上面代码的错误，是用遍历器对象的 `throw` 方法抛出的，而不是用 [throw](../../../../basic-concept/statements-and-declarations/the-throw-statement) 命令抛出的。后者只能被函数体外的 `catch` 语句捕获。

```js
const generator = function* () {
  while (true) {
    try {
      yield;
    } catch (e) {
      if (e != 'a') throw e;
      console.log('内部捕获', e);
    }
  }
};

const iterator = generator();

iterator.next();

try {
  throw new Error('a');
  throw new Error('b');
} catch (e) {
  console.log('外部捕获', e);
}

// 外部捕获 [Error: a]
```

上面代码之所以只捕获了 `a`，是因为函数体外的 `catch` 语句块，捕获了抛出的 `a` 错误以后，就不会再继续 `try` 代码块里面剩余的语句了。

## 外部捕获

如果 Generator 函数内部没有部署 `try...catch` 代码块，那么 `throw` 方法抛出的错误，将被外部 `try...catch` 代码块捕获。

```js
const generator = function* () {
  while (true) {
    yield;
    console.log('内部捕获', e);
  }
};

const iterator = generator();
iterator.next();

try {
  iterator.throw('a');
  iterator.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}
// 外部捕获 a
```

上面代码中，Generator 函数 `gerator` 内部没有部署 `try...catch` 代码块，所以抛出的错误直接被外部 `catch` 代码块捕获。

## 中断执行

如果 Generator 函数内部和外部，都没有部署 `try...catch` 代码块，那么程序将报错，直接中断执行。

```js
const gen = function* gen() {
  yield console.log('Hello');
  yield console.log('World');
};

const generator = gen();

generator.next();

generator.throw();
// Hello
// Uncaught undefined
```

上面代码中，`generator.throw` 抛出错误以后，没有任何 `try...catch` 代码块可以捕获这个错误，导致程序报错，中断执行。

## 内部捕获的前提条件

`throw` 方法抛出的错误要被内部捕获，前提是必须至少执行过一次 `next` 方法。

```js
function* gen() {
  try {
    yield 1;
  } catch (e) {
    console.log('内部捕获');
  }
}

const generator = gen();

generator.throw(1);
// Uncaught 1
```

上面代码中，`generator.throw(1)` 执行时，`next` 方法一次都没有执行过。这时，抛出的错误不会被内部捕获，而是直接在外部抛出，导致程序出错。这种行为其实很好理解，因为第一次执行 `next` 方法，等同于启动执行 Generator 函数的内部代码，否则 Generator 函数还没有开始执行，这时 `throw` 方法抛错只可能抛出在函数外部。

## 附带执行

`throw` 方法被捕获以后，会附带执行下一条 `yield` 表达式。也就是说，会附带执行一次 `next` 方法。

```js
const gen = function* gen() {
  try {
    yield console.log('a');
  } catch (e) {
    // ...
  }
  yield console.log('b');
  yield console.log('c');
};

const generator = gen();

generator.next(); // a
generator.throw(); // b
generator.next(); // c
```

上面代码中，`generator.throw` 方法被捕获以后，自动执行了一次 `next` 方法，所以会打印 `b`。另外，也可以看到，只要 Generator 函数内部部署了 `try...catch` 代码块，那么遍历器的 `throw` 方法抛出的错误，不影响下一次遍历。

## 独立状态

另外，`throw` 命令与 `generator.throw` 方法是无关的，两者互不影响。

```js
const gen = function* gen() {
  yield console.log('hello');
  yield console.log('world');
};

const gerator = gen();

gerator.next();

try {
  throw new Error();
} catch (e) {
  gerator.next();
}

// hello
// world
```

上面代码中，`throw` 命令抛出的错误不会影响到遍历器的状态，所以两次执行 `next` 方法，都进行了正确的操作。

## 总结归纳

这种函数体内捕获错误的机制，大大方便了对错误的处理。多个 `yield` 表达式，可以只用一个 `try...catch` 代码块来捕获错误。如果使用回调函数的写法，想要捕获多个错误，就不得不为每个函数内部写一个错误处理语句，现在只在 Generator 函数内部写一次 `catch` 语句就可以了。

Generator 函数体外抛出的错误，可以在函数体内捕获；反过来，Generator 函数体内抛出的错误，也可以被函数体外的 `catch` 捕获。

🌰 **代码示例**：

```js
function* foo() {
  var x = yield 3;
  var y = x.toUpperCase();
  yield y;
}

var it = foo();

it.next(); // { value:3, done:false }

try {
  it.next(42);
} catch (err) {
  console.log(err);
}
```

上面代码中，第二个 `next` 方法向函数体内传入一个参数 42，数值是没有 `toUpperCase` 方法的，所以会抛出一个 TypeError 错误，被函数体外的 `catch` 捕获。

一旦 Generator 执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。如果此后还调用 `next` 方法，将返回一个 `value` 属性等于 `undefined`、`done` 属性等于 `true` 的对象，即 JavaScript 引擎认为这个 Generator 已经运行结束了。

```js
function* g() {
  yield 1;
  console.log('throwing an exception');
  throw new Error('generator broke!');
  yield 2;
  yield 3;
}

function log(generator) {
  var v;
  console.log('starting generator');
  try {
    v = generator.next();
    console.log('第一次运行next方法', v);
  } catch (err) {
    console.log('捕捉错误', v);
  }
  try {
    v = generator.next();
    console.log('第二次运行next方法', v);
  } catch (err) {
    console.log('捕捉错误', v);
  }
  try {
    v = generator.next();
    console.log('第三次运行next方法', v);
  } catch (err) {
    console.log('捕捉错误', v);
  }
  console.log('caller done');
}

log(g());
// starting generator
// 第一次运行next方法 { value: 1, done: false }
// throwing an exception
// 捕捉错误 { value: 1, done: false }
// 第三次运行next方法 { value: undefined, done: true }
// caller done
```

上面代码一共三次运行 `next` 方法，第二次运行的时候会抛出错误，然后第三次运行的时候，Generator 函数就已经结束了，不再执行下去了。

---

**参考书籍：**

- [《ECMAScript 6 入门》阮一峰著](http://es6.ruanyifeng.com/#docs/generator#Generator-prototype-throw)
