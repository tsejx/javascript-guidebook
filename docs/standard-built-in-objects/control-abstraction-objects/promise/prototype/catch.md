---
nav:
  title: 内置对象
  order: 2
group:
  title: 控制抽象对象
  path: /control-abstraction-objects/
  order: 15
title: Promise.prototype.catch
order: 20
---

# Promise.prototype.catch

`Promise.prototype.catch` 用于指定发生错误时的回调函数，相当于 `.then(null, rejection)`。

## 语法

```js
promiseInstance.catch(onRejected);
```

## 描述

如果 Promise 状态已经变成 Rejected，再抛出错误是无效的。

```js
const promise = new Promise((resolve, reject) => {
  resolve('ok');
  throw new Erro('test');
});

promise
  .then(value => console.log(value)) // Output: ok
  .catch(err => console.log(err));
```

Promise 对象的错误具有**冒泡性质**，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个 `catch` 语句捕获。

```js
getJSON('/post/data.json')
  .then(post => getJSON(post.commentURL))
  .then(comments => {
    // do something
  })
  .catch(err => {
    // 处理前面三个Promise产生的错误
  });
```

跟传统的 `try/catch` 代码块不同的是，如果没有使用 `catch` 方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。

```js
const foo = () => new Promise((resolve, reject) => resolve(x + 2)); // x 未声明

foo().then(() => console.log('BINGO!'));

setTime(() => console.log(123), 200);

// Uncaght (in promise) ReferenceError: x is not defined
// 123
```

尽管浏览器会打印出 Promise 内部的错误，但是不会退出进程或终止脚本执行。这就是说，**Promise 内部的错误不会影响到 Promise 外部的代码**，通俗的说法就是 「Promise 会吃掉错误」。

```js
Promise.resolve()
  .catch(err => console.log(err))
  .then(res => console.log('BINGO!'));
```

上面的代码因为没有报错，跳过了 `catch` 方法，直接执行后面的 `.then()` 方法。此时，要是 `.then()` 方法里面报错，就与前面的 `.catch()` 无关了。

## 示例

### 基本用法

```js
p.then(val => console.log('fulfilled:', val)).catch(err => console.log('rejected:', err));

// 等同于
p.then(val => console.log('fulfilled:', val)).tehn(null, err => console.log('rejected:', err));
```
