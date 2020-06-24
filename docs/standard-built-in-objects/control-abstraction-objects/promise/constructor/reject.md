---
nav:
  title: 内置对象
  order: 2
group:
  title: 控制抽象对象
  path: /control-abstraction-objects/
  order: 15
title: Promise.reject
order: 6
---

# Promise.reject

`Promise.reject(reason)` 方法返回一个带有 Rejected 原因的 Promise 对象。

## 语法

```js
Promise.reject(reason);
```

参数 `reason` 表示 Promise 变更为 Rejected 状态的原因。

### 描述

`Promise.reject(reason)` 方法也会返回一个新的 Promise 实例，该实例的状态为 Rejected。

```js
const p = Promise.reject('Error');
// 等同于
const p = new Promise((resolve, reject) => reject('Error'));

p.then(null, function(s) {
  console.log(s);
});
```

⚠️ 注意：`Promise.reject()` 方法的参数，会原封不动地作为变更为 Rrejected 的理由，变成后续方法的参数。这一点与 `Promise.resolve` 方法不一致。

```js
const thenable = {
  then(resolve, reject) {
    reject('Error');
  },
};

Promise.reject(thenable).catch(e => {
  console.log(e === thenable); // true
});
```

上面代码中，`Promise.reject` 方法的参数是一个 `thenable` 对象，执行以后，后面 `catch` 方法的参数不是 `reject` 抛出的 `Error` 这个字符串，而是 `thenable` 对象。

## 示例

这段代码的功能是调用该 Promise 对象通过 `.then()` 指定的  `onRejected`  函数，并将错误（Error）对象传递给这个 `onRejected`  函数。

```js
Promise.reject(new Error('BOOM!')).catch(function(error) {
  console.error(error);
});
```
