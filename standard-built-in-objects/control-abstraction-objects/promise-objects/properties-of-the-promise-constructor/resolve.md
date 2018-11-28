## Promise.resolve

`Promise.resolve()` 方法返回一个以给定值解析后的 Promise 对象。

### 语法

```js
Promise.resolve(value)
```

### 参数

#### Promise 实例

如果参数是 Promise 实例，那么 `Promise.resolve` 将不做任何修改、原封不动地返回这个实例。

#### Thenable 对象

`thenable` 对象指的是具有 `then` 方法的对象，比如下面这个对象。

```js
let thenable = {
    then: (resolve, reject) => resolve(100)
}
```

`Promise.resolve` 方法会将这个对象转为 Promise 对象，然后就立即执行 `thenable` 对象的 `then` 方法。

 ```js
let thenable = {
  then: (resolve, reject) => resolve(100)
}

let promise = Promise.resolve(thenable)

promise.then((value) => console.log(value))		// 100
 ```

上述代码中，当 `thenable` 对象的 `then` 方法执行后，对象 `promise` 的状态就变为 `resolved`，从而立即执行最后那个 `then` 方法指定的回调函数。

#### 非Thenable对象

如果参数是一个原始值，或者是一个不具有 `then` 方法的对象，则 `Promise.resolve` 方法返回一个新的 Promise 对象，状态为 `resolved`。

```js
const promise = Promise.resolve('Hello')

promise.then(v => console.log(v))		// 'Hello'
```

由于传入 `Promise.resolve` 方法的参数非具有 `then` 方法的对象，因此判断该参数不属于异步操作，返回状态为 Resolve 的 Promise 实例，并且立即执行回调函数。`Promise.resolve` 方法的参数，会同时传给回调函数。

#### 不带参数

`Promise.resolve` 方法允许调用时不带参数，直接返回一个 `resolved` 状态的 Promise 对象。

如果希望得到一个 Promise 对象，比较方便的方法就是直接调用 `Promise.resolve` 方法。

需要注意的是，立即 `resolve` 的 Promise 对象，是在本轮“事件循环”（Event Loop）的结束时，而不是在下一轮“事件循环”的开始时。

### 示例

#### 基本用法

静态方法 `Promise.resolve(value)` 可以认为是 `new Promise()` 方法的快捷方式。返回的 Promise 对象将立即进入 Resolve 状态。

```js
Promise.resolve('Success')
    .then((value) => {
    	console.log(value)		// 'Success'
	}, (value) => {
    	console.log(value)		// 不会调用
	})
```

#### 数组作参数

```js
const promise = Promise.resolve([0, 1, 2])

promise.then((v) => {
    console.log(v[0])		// 0
})
```

#### Promise作参数

```js
const foo = new Promise('foo')

const bar = Promise.resolve(foo)

bar.then((value) => {
    console.log(value)		// 2. Output: 'foo'
})

console.log(foo === bar)	// 1. Output: true

// 这里有同步异步先后执行的区别
```

