---
nav:
  title: 内置对象
  order: 2
group:
  title: 控制抽象对象
  path: /control-abstraction-objects/
  order: 15
title: Generator.prototype.return
order: 33
---

# Generator.prototype.return

Generator 函数返回的遍历器对象，还有一个 `return` 方法，可以返回给定的值，并且终结遍历 Generator 函数。

```js
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

const generator = gen();

generator.next()          // { value: 1, done: false }
generator.return('foo')   // { value: "foo", done: true }
generator.next()          // { value: undefined, done: true }
```

上面代码中，遍历器对象 `generator` 调用 `return` 方法后，返回值的 `value` 属性就是 `return` 方法的参数 `foo`。并且，Generator 函数的遍历就终止了，返回值的 `done` 属性为 `true`，以后再调用 `next` 方法，`done` 属性总是返回 `true`。

如果 `return` 方法调用时，不提供参数，则返回值的 `value` 属性为 `undefined`。

```js
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var generator = gen();

generator.next()        // { value: 1, done: false }
generator.return()      // { value: undefined, done: true }
```

如果 Generator 函数内部有 `try...finally` 代码块，且正在执行 `try` 代码块，那么 `return` 方法会推迟到 `finally` 代码块执行完再执行。

```js
function* numbers () {
  yield 1;
  try {
    yield 2;
    yield 3;
  } finally {
    yield 4;
    yield 5;
  }
  yield 6;
}
var generator = numbers();
generator.next()       // { value: 1, done: false }
generator.next()       // { value: 2, done: false }
generator.return(7)    // { value: 4, done: false }
generator.next()       // { value: 5, done: false }
generator.next()       // { value: 7, done: true }
```

上面代码中，调用 `return` 方法后，就开始执行 `finally` 代码块，然后等到 `finally` 代码块执行完，再执行 `return` 方法。

---

**参考书籍：**

- [《ECMAScript 6 入门》阮一峰著](<http://es6.ruanyifeng.com/#docs/generator#Generator-prototype-throw>)