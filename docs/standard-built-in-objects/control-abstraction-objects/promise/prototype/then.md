---
nav:
  title: 内置对象
  order: 2
group:
  title: 控制抽象对象
  path: /control-abstraction-objects/
  order: 15
title: Promise.prototype.then
order: 20
---

# Promise.prototype.then

`Promise.prototype.then()` 用于 Promise 实例添加状态改变时执行的函数。

## 语法

语法：

```js
promiseInstance.then(onfulfilled, onrejected);
```

类型声明：

```ts
interface Promise<T> {
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
  ): Promise<TResult1 | TResult2>;
}
```

参数说明：

| 参数        | 说明                                                                                                                                                                                                                     |
| :---------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onfulfilled | 当 Promise 变成 Fulfilled 状态时，该参数作为回调函数被调用。<br/>该函数有一个参数，即接受的最终结果。如果传入 `onfulfilled` 作为参数的参数类型不是函数，则会被内部转换为 `(x) => x`，即原样返回 Promise 最终结果的函数。 |
| onrejected  | 当 Promise 变成 Rejected 状态时，该参数作为回调函数被调用。<br/>该函数有一个参数，即拒绝的原因。                                                                                                                         |

## 代码示例

### 基本用法

```js
const promise = new Promise((resolve, reject) => {
  resolve('Fulfilled');
});

promise.then(
  (res) => console.log(res), // Output: 'Fulfilled'
  (rej) => console.log(rej)
);
```

### 链式调用

采用链式调用的 `.then()`，可以指定一组按照次序调用的回调函数。这时，前一个回调函数，有可能返回的还是一个 Promise 对象（即有异步操作），这时后面紧跟的回调函数，就会等待该 Promise 对象的状态发生变化，才会被调用。

```js
getJSON('/post/1.json')
  .then((post) => getJSON(post.commentURL))
  .then(
    (comments) => console.log('resolved: ', comments),
    (err) => console.log('rejected: ', err)
  );
```

### 参数传递

链式调用中，一个 `.then()` 执行完成后返回新创建的 Promise 对象，并继续执行下一个 `.then()` 方法，当上一个 `.then()` 需要传递参数到下一个参数时，可以这样操作。

```js
// Example
function foo(value) {
  return value * 2;
}

function bar(value) {
  return value + 5;
}

function baz(value) {
  console.log(value);
}

const promise = Promise.resolve(1);

promise
  .then(foo)
  .then(bar)
  .then(baz)
  .catch((error) => console.log(err));
```

执行流程分析：

1. 这段代码的入口函数是 `Promise.resolve(1)`
2. `Promise.resolve(1)` 传递参数 `1` 给 `foo` 函数
3. 函数 `foo` 对接收的参数进行操作并返回
4. 这时参数为 `2` 传递给函数 `bar`
5. 最后在函数 `baz` 中打印结果 `7`

每个方法中 `return` 的值不仅只局限于字符串或者数值类型，也可以是对象或者 Promise 对象等复杂类型。

`return` 的值会由 [Promise.resolve](../properties-of-the-promise-constructor/resolve) 进行相应的包装处理，因此不管回调函数中会返回一个什么样的值，最终 `.then()` 的结果都是返回一个新创建的 Promise 对象。
