## Promise.race

`Promise.race` 接收一个以 Promise 实例为成员的可迭代对象作为参数，当某个成员 Promise 状态变更后，即调用相应的回调函数。

### 语法

```js
Promise.race(iterator)
```

与 `Promise.all` 相似，`Promise.race` 的 `iterator` 参数须是可迭代的对象。

只要参数 `iterator` 的其中某个 Promise 实例成员的状态变更，那么 `Promise.race` 会立即返回一个新创建的 Promise 实例，并将返回值传递给回调函数。

`Promise.race` 方法的参数与 `Promise.all` 方法一样，如果不是 Promise 实例，就会先调用下面讲到的 `Promise.resolve` 方法，将参数转为 Promise 实例，再进一步处理。

### 示例

以下例子中，如果5秒之内 `fetch` 方法无法返回结果，变量 `promise` 的状态就会变为 `rejected`，从而触发 `catch` 方法指定的回调函数。

```js
const promise = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
]);

promise
	.then(console.log)
	.catch(console.error);
```

