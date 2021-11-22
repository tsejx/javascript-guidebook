---
nav:
  title: 内置对象
  order: 2
group:
  title: 控制抽象对象
  path: /control-abstraction-objects/
  order: 15
title: Promise
order: 2
---

# Promise

传统异步编程最大特点是地狱式回调嵌套，一旦嵌套层级过深，项目代码将难以理解和维护。而 Promise 能让我们通过 <strong style="color:red">链式调用</strong> 的方法去解决回调地狱的问题。

Promise 是异步编程的一种解决方案，可以将异步操作队列化，按照期望的顺序执行，返回符合预期的结果。可以在对象之间传递和操作 Promise，帮助我们处理队列。

语法：

```js
new Promise(executor);
```

`executor` 函数参数语法：

```js
function(resolve, reject){...}
```

Promise 的参数 `executor` 是带有 `resolve` 和 `reject` 两个参数的函数。而这两个参数也是函数。

- `resolve`：从 Pending（待定） 变为 Fullfilled（实现），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去。该函数的参数除了**正常的值**以外，还可能是**另一个 Promise 实例**。
- `reject`：从 Pending（待定） 变为 Rejected（否决），在异步失败时调用，并将异步操作报出的错误，作为参数传递出去。该函数的参数通常是 **Error 对象**的实例，表示抛出的错误。

类型声明：

```ts
constructor(executor: (resolve: (result: R) => void, reject: (error: any) => void) => void): Promise

constructor(executor: (resolve: (thenable: Thenable<R>) => void, reject: (error: any) => void) => void): Promise
```

## 描述

- Promise 构造函数执行时**立即调用** `executor` 函数，`resolve` 和 `reject` 两个函数作为参数传入 `executor` （`executor` 函数会在 Promise 构造函数返回新建对象前被调用）。
- `executor` 内部通常会执行一些异步操作，一旦完成，可以调用 `resolve` 函数来将 Promise 状态改成 Fulfilled，或者在发生错误时将它的状态改为 Rejected
- 无法取消 Promise，一旦新建它就会立即执行，**无法中途取消**
- 如果不设置回调函数（executor），Promise 内部抛出错误，不会反应到外部
- 当处于 Pending 状态时，无法得知目前进展到哪一个阶段

如果某些事件不断地反复发生，一般来说，使用  [Stream](https://nodejs.org/api/stream.html)  模式是比部署 Promise 更好的选择。

🌰 **代码示例**

```js
new Promise(
  /* 执行器 */
  function (resolve, reject) {
    // 异步处理

    // 数据处理完成后执行
    resolve();

    // 数据处理出错时执行
    reject();
  }
).then(
  function A() {
    /* 成功，下一步 */
  },
  function B() {
    /* 失败，做相应处理 */
  }
);
```

## 工作流

Promise 是一个代理对象（代理一个值），被代理的值在 Promise 对象创建时可能是未知的。它允许你为异步操作的 **Fulfilled** 和 **Rejected** 分别绑定相应的处理方法（handlers）。这让异步方法可以像同步方法那样返回值，但**并不是立即返回**最终执行结果，而是一个能代表**未来出现**的结果的 Promise 对象。

由于 `Promise.prototype.then` 和 `Promise.prototype.catch` 方法返回 Promise 对象，所以它们可以被 [链式调用](../../../core-modules/ecmascript-function-objects/function-types/cascade-function)。

```jsx | inline
import React from 'react';
import img from '../../../assets/promise/workflow.png';

export default () => <img alt="Promise Workflow" src={img} width={720} />;
```

## 状态

用 `new` 实例化的 Promise 对象有以下三种状态：

| 状态      | 含义 | 描述                               |
| :-------- | :--- | :--------------------------------- |
| Pending   | 待定 | 初始状态                           |
| Fulfilled | 实现 | 操作成功，此时会调用 `onFulfilled` |
| Rejected  | 否决 | 操作失败，此时会调用 `onRejected`  |

```jsx | inline
import React from 'react';
import img from '../../../assets/promise/state.png';

export default () => <img alt="Promise State" src={img} width={720} />;
```

⚠️ **注意**：Promise 的状态，从 <span style="font-weight:bold;color:red">Pending</span>转换为 <span style="font-weight:bold;color:red">Fulfilled</span> 或 <span style="font-weight:bold;color:red">Rejected</span> 之后，这个 Promise 对象的状态就不会发生任何变化。

而当 Promise 状态一旦发生变化，就会触发 `.then()` 里的响应函数处理后续步骤。

但是，`.then()` 参数中的函数只会调用其中一个，调用哪个取决于该 Promise 的状态。

另外，**Fulfilled** 和 **Rejected** 这两个中的任何一种状态都可以表示为 **Settled（不变的）**。

## 静态方法

| 方法                                                                    | 说明                                                                                              |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [Promise.all(iterable)](properties-of-the-promise-constructor/all)      | 将多个 Promise 实例包装成一个新的 Promise 实例。全部成员 Fulfilled 或某个成员 Rejected 时触发回调 |
| [Promise.race(iterable)](properties-of-the-promise-constructor/race)    | 将多个 Promise 实例包装成一个新的 Promise 实例。某个成员状态变更后触发回调                        |
| [Promise.reject(reason)](properties-of-the-promise-constructor/reject)  | 返回新的 Promise 实例，该实例的状态为 Rejected                                                    |
| [Promise.resolve(value)](properties-of-the-promise-constructor/resolve) | 返回新的 Promise 实例，该实例的状态为 Fulfilled                                                   |

## 原型对象

### 属性

| 原型属性                        | 说明                                      |
| ------------------------------- | ----------------------------------------- |
| `Promise.prototype.constructor` | 返回被创建的实例函数，默认为 Promise 函数 |

### 方法

| 原型方法                                                                                           | 说明                                                                                                     |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [Promise.prototype.catch(onRejected)](properties-of-the-promise-prototype-object/catch)            | 相当于 `.then(null, rejection)`，用于指定发生错误时的回调函数                                            |
| [Promise.prototype.then(onFulfilled, onRejected)](properties-of-the-promise-prototype-object/then) | 添加 `fulfillment` 和 `rejection` 回调到当前 Promise，返回一个新的 Promise，将以回调的返回值来 `resolve` |
| `Promise.prototype.finally(onFinally)`                                                             | 用于指定无论 Promise 对象最后状态如何，都会执行的操作                                                    |

## 最佳实践

### 多任务串行

```js
const Task = function (result, isSuccess = true) {
  return () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (isSuccess) {
          resolve(result);
        } else {
          reject(result);
        }
      }, 1000);
    });
};

execute([Task('A'), Task('B'), Task('C', false), Task('D')]).then((resultList) => {
  // do something
});
```

注意事项：

1. 每个 Task 无论成功与否，都不能阻断下个 Task 的执行
2. 最后的 `then` 需要把每个 Task 的执行结果 `决议` 出去

实现思路：

1. 每个 Task 外层包装一层 Promise，捕获 Task 的 `rejected` 状态
2. 可以利用中间变量，缓存所有 Task 的输出结果，然后在最后一个 Promise 的 `then` 里把中间变量 `决议` 出去

```js
function execute(tasks) {
  return;
  task.reduce(
    (previousPromise, currentPromise) =>
      previousPromise.then((resultList) => {
        return new Promise((resolve) => {
          currentPromise()
            .then((result) => {
              resolve(resultList.concat(result));
            })
            .catch(() => {
              resolve(resultList.concat(null));
            });
        });
      }),
    []
  );
}
```

### 同步并发

### 异步并发

## 参考资料

- [📚 JavaScript Promise 迷你书](http://liubin.org/promises-book/)
- [📝 Promise 原理讲解(遵循 Promise/A+ 规范)](https://juejin.im/post/5aa7868b6fb9a028dd4de672)
- [📝 Promise 串行](https://zhuanlan.zhihu.com/p/90850451)
