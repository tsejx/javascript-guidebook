---
nav:
  title: 内置对象
  order: 2
group:
  title: 控制抽象对象
  path: /control-abstraction-objects/
  order: 15
title: Promise.prototype.finally
order: 22
---

# Promise.prototype.finally

⭐️ `ES2018(ES9)新特性`

`Promise.prototype.finally` 方法用于指定 Promise 实例状态变更结束后，无论状态为 Fulfilled 或是 Rejected，都会执行的函数。

这为 Promise 是否成功完成后都需要执行的代码提供了一种方式。这避免了同样的语句需要在 `then()` 和 `catch()` 中各写一遍的情况。

## 语法

语法：

```js
promiseInstance.finally(onfinally);
```

类型声明：

```ts
interface Promise<T> {
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}
```

参数说明：

| 参数      | 说明                     | 类型     |
| :-------- | :----------------------- | :------- |
| onfinally | Promise 结束后调用的函数 | Function |

## 方法说明

如果项在 Promise 执行完毕后无论其结果如何都做一些处理时，`finally()` 方法可能是有用的。

`finally` 虽然与 `.then(onfulfilled, onrejected)` 类似，它们不同的是：

- 调用内联函数时，不需要多次声明该函数或为该函数创建一个变量保存它
- 由于无法知道 Promise 的最终状态，所以 `finally` 的回调函数中不接收任何参数，它仅用于无论最终结果如何都要执行的情况

## 代码示例

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
  }, 1000);
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    console.log('finally');
  });
```

## 兼容性代码

```js
MockPromise.prototyp.finally = function (onFinally) {
  return this.then(
    function (value) {
      return MockPromise.resolve(onFinally()).then(function () {
        return value;
      });
    },
    function (err) {
      return MockPromise.resolve(onFinally()).then(function () {
        throw err;
      });
    }
  );
};
```

## 参考资料

- [TypeScript - lib.es2018.promise.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es2018.promise.d.ts)
