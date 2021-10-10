---
nav:
  title: 内置对象
  order: 2
group:
  title: 控制抽象对象
  path: /control-abstraction-objects/
  order: 15
title: Promise.all
order: 4
---

# Promise.all

`Promise.all` 接收一个以 Promise 实例为成员的可迭代对象作为参数，当所有输入的 Promise 成员全部变为 Fulfilled 状态时才会继续执行后续的 `Promise.prototype.then`，如果某个成员变为 Rejected 的时候，函数后续的 `Promise.prototype.catch` 会被执行。

## 语法

```js
Promise.all(iterable)

Promise.all([promise1, promise2, ..., promiseN])
```

### 参数

参数 `iterable` 必须具备 [Iterator](../../iterator-objects/iterator) 接口，且每个成员都是 Promise 实例。

如果 `iterable` 内每个成员都不是 Promise 实例，会先调用 [Promise.resolve](resolve) 将每个成员转化为 Promise 实例，再进一步处理。

|             参数             |          返回值          |
| :--------------------------: | :----------------------: |
| 空的具备 Iterator 接口的对象 | Fulfilled 状态的 Promise |
|      不包含任何 Promise      |    异步完成的 Promise    |
|           其他情况           |  Pending 状态的 Promise  |

### 描述

`Promise.all` 执行后返回一个新创建的 Promise 实例，该实例状态由 `Promise.all` 参数成员决定，可以分为两种情况：

- 当参数每个 Promise 实例成员均为 **_Resolved_**，返回值才会变为 **_Resolved_** 状态。此时参数每个 Promise 实例成员的返回值会组成一个数组，传递给回调函数。
- 只要参数每个 Promise 实例成员之中有一个为 **_Rejected_**，`Promise.all` 返回值就会变成 **_Rejected_**，此时第一个 Rejected 状态的 Promise 实例的返回值，会传递给回调函数。

⚠️ **注意**：作为参数的 Promise 实例，自身定义的 `catch` 方法，那么它的状态一旦变更为 Rejected，并不会触发 `Promise.all` 的 `catch` 方法。

🌰 **代码示例**：

```js
const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
  .then((result) => result)
  .catch((err) => err);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
  .then((result) => result)
  .catch((err) => err);

Promise.all([p1, p2])
  .then((result) => console.log(result)) // ["hello", Error: 报错了]
  .catch((err) => console.log(err));
```

## 示例

### 基本用法

Promise 等待所有 Promise 实例都 Fulfilled（或首个 Rejected）。

```js
const p1 = Promise.resolve('3');
const p2 = 1234;
const p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([p1, p2, p3]).then((v) => console.log(v));
// ['3', 1234, 'foo']
```

### 快速返回否决行为

`Promise.all` 在任意一个传入的 Promise 否决时返回新的 Rejected 状态的 Promise 实例。

例如，如果你传入的 Promise 中，有四个 Promise 实例在一定的时间之后调用成功函数，有一个立即调用失败函数，那么 `Promise.all` 将立即变为 _Rejected_ 状态。

```js
var p1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, 'one');
});

var p2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 2000, 'two');
});

var p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, 'three');
});

var p4 = new Promise((resolve, reject) => {
  setTimeout(resolve, 4000, 'four');
});

var p5 = new Promise((resolve, reject) => {
  reject('reject');
});

// You can also use .catch
Promise.all([p1, p2, p3, p4, p5])
  .then((values) => {
    console.log(values);
  })
  .catch((reason) => {
    console.log(reason);
  });
```

### 完成时回调 Hack

如果你需要在所有的 Promise 都结束之后执行某些操作，而不论他们是否 Fulfilled，Promise.all 的这种机制就会成为一种限制，有个比较 Trick 的办法是给 `.then` 和 `.catch` 传入相同的回调，显然，这会让代码的可读性大打折扣。

```js
Promise.all(promises.map((p) => p.catch(() => undefined)));
```

如果 Promise 的 `.catch` 回调返回了 `undefined`，那么 Promise 的失败就会被当做成功来处理。

🌰 **代码示例**：

```js
Promise.all(
  [
    // Fulfilled
    Promise.resolve(1),
    // Rejects after 2 seconds
    new Promise((resolve, reject) => setTimeout(() => reject(1), 2000)),
  ].map((p) => p.catch(() => undefined))
).then(() => console.log('done!'));

// >> done!
```

---

**参考资料：**

- [📝 Promise.all 处理 Rejection 的技巧](https://zhuanlan.zhihu.com/p/26920718)
