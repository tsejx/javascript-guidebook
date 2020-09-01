---
nav:
  title: 内置对象
  order: 2
group:
  title: 控制抽象对象
  path: /control-abstraction-objects/
  order: 15
title: Promise.race
order: 5
---

# Promise.race

`Promise.race` 接收一个以 Promise 实例为成员的可迭代对象作为参数，当某个成员 Promise 状态变更后（无论是 Fulfilled 状态还是 Rejected 状态），立即调用相应的回调函数。

## 语法

```js
Promise.race(iterator)

Promise.race([promise1, promise2, ..., promiseN])
```

与 [Promise.all](./all) 相似，`Promise.race` 的 `iterator` 参数必须是 [Iterator](../../iterator-objects/iterator)。

只要参数 `iterator` 的其中某个 Promise 实例成员的状态变更，那么 `Promise.race` 会立即返回一个新创建的 Promise 实例，并将返回值传递给回调函数。

`Promise.race` 方法的参数与 `Promise.all` 方法一样，如果不是 Promise 实例，就会先调用 [Promise.resolve](./resolve) 方法，将参数转为 Promise 实例，再进一步处理。

## 示例

下面例子中，如果 5 秒之内 `fetch` 方法无法返回结果，变量 `p` 的状态就会变为 Rejected，从而触发 `.catch` 方法指定的回调函数。

```js
const p = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function(resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000);
  }),
]);

p.then(console.log).catch(console.error);
```
