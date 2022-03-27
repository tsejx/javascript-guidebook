---
nav:
  title: 内置对象
  order: 2
group:
  title: 控制抽象对象
  path: /control-abstraction-objects/
  order: 15
title: Promise.resolve
order: 7
---

# Promise.resolve

`Promise.resolve()` 方法返回一个以给定值解析后的 Promise 对象。

## 语法

语法：

```js
Promise.resolve(value);
```

类型声明：

```ts
interface PromiseConstructor {
  resolve(): Promise<void>;

  resolve<T>(value: T | PromiseLike<T>): Promise<T>;
}
```

参数说明：

| 参数  | 说明   | 类型 |
| :---- | :----- | :--- |
| value | 见下方 | any  |

根据传入参数的不同，会有不同的响应效果。

- **Promise 实例**：返回传入的 Promise 实例
- **Thenable 对象**：将该 Thenable 对象转化为 Promise 对象，然后立即执行 `.then()` 方法
- **非 Thenable 对象**：返回新的 Fulfilled 状态的 Promise 实例
- **不带参数**：返回新的 Fulfilled 状态的 Promise 实例

### Promise 实例

如果参数是 Promise 实例，那么 `Promise.resolve` 将不做任何修改、原封不动地返回这个实例。

### Thenable 对象

`thenable` 对象指的是具有 `then` 方法的对象，比如下面这个对象。

```js
let thenable = {
  then: (resolve, reject) => resolve(100),
};
```

`Promise.resolve` 方法会将这个对象转为 Promise 对象，然后就立即执行 `thenable` 对象的 `.then()` 方法。

```js
let thenable = {
  then: (resolve, reject) => resolve(100),
};

let promise = Promise.resolve(thenable);

promise.then((value) => console.log(value)); // 100
```

上述代码中，当 `thenable` 对象的 `then` 方法执行后，对象 `promise` 的状态就变为 Fulfilled，从而立即执行最后那个 `.then()` 方法指定的回调函数。

### 非 Thenable 对象

如果参数是一个原始值，或者是一个不具有 `then` 方法的对象，则 `Promise.resolve` 方法返回一个新的 Promise 对象，状态为 Fulfilled。

```js
const promise = Promise.resolve('Hello');

promise.then((v) => console.log(v));
// 'Hello'
```

由于传入 `Promise.resolve` 方法的参数非具有 `then` 方法的对象，因此判断该参数不属于异步操作，返回状态为 Resolve 的 Promise 实例，并且立即执行回调函数。`Promise.resolve` 方法的参数，会同时传给回调函数。

### 不带参数

`Promise.resolve` 方法允许调用时不带参数，直接返回一个 Fulfilled 状态的 Promise 对象。

如果希望得到一个 Promise 对象，比较方便的方法就是直接调用 `Promise.resolve` 方法。

需要注意的是，状态为 Fulfilled 的 Promise 对象，是在本轮 [事件循环](../../../../core-modules/executable-code-and-execution-contexts/concurrency-model/event-loop)（Event Loop）的结束时，而不是在下一轮事件循环的开始时。

## 代码示例

### 基本用法

`Promise.resolve(value)` 可以认为是 `new Promise()` 的快捷方式。返回的 Promise 对象将立即进入 Fulfilled 状态。

```js
Promise.resolve('Fulfilled').then(
  (res) => {
    console.log(res); // 'Fulfilled'
  },
  (rej) => {
    console.log(rej); // 不会调用
  }
);
```

### 数组作参数

如果传入的参数为数组，则参数为非 Thenable 对象，会返回新的 Fulfilled 状态的 Promise 实例。

```js
const promise = Promise.resolve([0, 1, 2]);

promise.then((v) => {
  console.log(v[0]); // 0
});
```

### Promise 作为参数

如果传入的参数为 Promise 的实例对象，那么会直接返回该 Promise 的实力对象。

```js
const foo = new Promise('foo');

const bar = Promise.resolve(foo);

bar.then((value) => {
  console.log(value);
  // 2. 输出: 'foo'
});

console.log(foo === bar);
// 1. 输出: true

// 这里有同步异步先后执行的区别
```

## 参考资料

- [TypeScript - lib.es2015.promise.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es2015.promise.d.ts)
