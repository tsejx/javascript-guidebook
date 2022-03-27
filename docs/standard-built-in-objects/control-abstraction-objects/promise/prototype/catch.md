---
nav:
  title: 内置对象
  order: 2
group:
  title: 控制抽象对象
  path: /control-abstraction-objects/
  order: 15
title: Promise.prototype.catch
order: 21
---

# Promise.prototype.catch

`Promise.prototype.catch` 用于指定 Promise 实例发生错误时执行的函数，相当于 `.then(null, onrejected)`。

## 语法

语法：

```js
promiseInstance.catch(onrejected);
```

类型声明：

```ts
interface Promise<T> {
  catch<TResult = never>(
    onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
  ): Promise<T | TResult>;
}

interface PromiseLike<T> {
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult>) | undefined | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
  ): PromiseLike<TResult1 | TResult2>;
}
```

参数说明：

| 参数       | 说明                                          | 类型     |
| :--------- | :-------------------------------------------- | :------- |
| onrejected | 当 Promise 实例状态变为 Rejected 时执行的函数 | Function |

该函数拥有一个参数 `reason`（即 Rejected 的原因）。如果 `onrejected` 抛出一个错误或返回一个本身失败的 Promise，通过 `catch()` 返回的 Promise 状态将会变为 Rejected；否则，它将显示为成功 Fulfilled。

## 方法说明

如果 Promise 状态已经变成 Rejected，再抛出错误是无效的。

```js
const promise = new Promise((resolve, reject) => {
  resolve('ok');
  throw new Erro('test');
});

promise
  .then((value) => {
    // Output: 'ok'
    console.log(value);
  })
  .catch((err) => console.log(err));
```

Promise 对象的错误具有**冒泡性质**，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个 `catch` 语句捕获。

```js
getJSON('/post/data.json')
  .then((post) => getJSON(post.commentURL))
  .then((comments) => {
    // do something
  })
  .catch((err) => {
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
  .catch((err) => console.log(err))
  .then((res) => console.log('BINGO!'));
```

上面的代码因为没有报错，跳过了 `catch` 方法，直接执行后面的 `.then()` 方法。此时，要是 `.then()` 方法里面报错，就与前面的 `.catch()` 无关了。

## 代码示例

### 基本用法

```js
promise.then((val) => console.log('fulfilled:', val)).catch((err) => console.log('rejected:', err));

// 等同于
promise
  .then((val) => console.log('fulfilled:', val))
  .tehn(null, (err) => console.log('rejected:', err));
```

### 函数中抛出错误

```js
const promise = new Promise((resolve, rejected) => rejected(123));

promise
  .catch((e) => {
    console.log(e);
    // Output: 123
    throw new Error(456);
  })
  .then((res) => {
    console.log(res);
    // No Output
  })
  .catch((e) => {
    console.log(e);
    // Output: 456
  });
```

## 参考资料

- [TypeScript - lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)
