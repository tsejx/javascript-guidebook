## Promise.all

`Promise.all` 接收一个以 Promise 实例为成员的可迭代对象作为参数，当全部成员变为 Resolve 或某个成员变为 Reject 状态的时候，才会调用相应的回调函数。

### 语法

```js
Promise.all(iterable)
```

### 参数

参数 `iterable` 必须具备 Iterator 接口，且每个成员都是 Promise 实例。

如果 `iterable` 内每个成员都不是 Promise 实例，会先调用 `Promise.resolve` 将每个成员转化为 Promise 实例，再进一步处理。

| 参数                         | 返回值                  |
| ---------------------------- | ----------------------- |
| 空的具备 Iterator 接口的对象 | Resolved 状态的 Promise |
| 不包含任何 Promise           | 异步完成的 Promise      |
| 其他情况                     | Pending 状态的 Promise  |

### 描述

`Promise.all` 执行后返回一个新创建的 Promise 实例，该实例状态由 `Promise.all` 参数成员决定，可以分为两种情况：

* 当参数每个 Promise 实例成员均为 *Resolved*，返回值才会变为 *Resolved* 状态。此时参数每个 Promise 实例成员的返回值会组成一个数组，传递给回调函数。
* 只要参数每个 Promise 实例成员之中有一个为 *Rejected*，`Promise.all` 返回值就会变成 *Rejected*，此时第一个被 `reject` 的实例的返回值，会传递给回调函数。

⚠️ 注意，作为参数的 Promise 实例，自身定义的 `catch` 方法，那么它一旦被 `rejected`，并不会触发 `Promise.all` 的 `catch` 方法。

```js
const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
.then(result => result)
.catch(e => e);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
.then(result => result)
.catch(e => e);

Promise.all([p1, p2])
.then(result => console.log(result))	// ["hello", Error: 报错了]
.catch(e => console.log(e));
```

### 示例

#### 基本用法

Promise 等待所有 Promise 实例都完成（或首个拒绝）。

```js
const p1 = Promise.resolve('3')
const p2 = 1234
const p3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'foo')
})

Promise.all([p1, p2, p3]).then(v => console.log(v));		// ['3', 1234, 'foo']
```

#### 快速返回失败行为

`Promise.all` 在任意一个传入的 Promise 失败时返回失败。例如，如果你传入的 Promise 中，有四个 Promise 实例在一定的时间之后调用成功函数，有一个立即调用失败函数，那么 `Promise.all` 将立即变为 *Rejected* 状态。

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

//You can also use .catch
Promise.all([p1, p2, p3, p4, p5])
    .then(values => { 
  		console.log(values);
	}).catch(reason => { 
  		console.log(reason)
	});
```



