---
nav:
  title: 内置对象
  order: 2
group:
  title: 控制抽象对象
  path: /control-abstraction-objects/
  order: 15
title: Promise/A+ 规范
order: 3
---

# Promise/A+ 规范

Promise 表示一个异步操作的最终结果，与之进行交互的方式主要是 `.then` 方法，该方法注册了两个回调函数，用于接收 Promise 的终值或本 Promise 不能执行的原因。

本规范详细列出了 `.then` 方法的执行过程，所有遵循 Promises/A+ 规范实现的 Promise 均可以本标准作为参照基础来实施 `.then` 方法。因而本规范是十分稳定的。尽管 Promise/A+ 组织有时可能会修订本规范，但主要是为了处理一些特殊的边界情况，且这些改动都是微小且向下兼容的。如果我们要进行大规模不兼容的更新，我们一定会在事先进行谨慎地考虑、详尽的探讨和严格的测试。

从历史上说，本规范实际上是把之前 Promise/A 规范 中的建议明确成为了行为标准：我们一方面扩展了原有规范约定俗成的行为，一方面删减了原规范的一些特例情况和有问题的部分。

最后，核心的 Promises/A+ 规范不设计如何创建、解决和拒绝 Promise，而是专注于提供一个通用的 `.then` 方法。上述对于 Promises 的操作方法将来在其他规范中可能会提及。

## 规范术语

- **解决（fulfill）**：指一个 Promise 成功时进行的一系列操作，如状态的改变、回调的执行。虽然规范中用 fulfill 来表示解决，但在后世的 Promise 实现多以 resolve 来指代之。
- **拒绝（reject）**：指一个 Promise 失败时进行的一系列操作。
- **终值（eventual value）**：所谓终值，指的是 Promise 被解决时传递给解决回调的值，由于 Promise 有一次性的特征，因此当这个值被传递时，标志着 Promise 等待态的结束，故称之终值，有时也直接简称为值（value）。
- **拒因（reason）**：也就是拒绝原因，指在 Promise 被拒绝时传递给拒绝回调的值。

## 术语

- **Promise**：Promise 是一个拥有 `.then` 方法的对象或函数，其行为符合本规范；
- **thenable**：是一个定义了 `.then` 方法的对象或函数，文中译作"拥有 `.then` 方法"；
- **值（value）**：指任何 JavaScript 的合法值（包括 undefined、thenable 和 Promise）；
- **异常（exception）**：是使用 `throw` 语句抛出的一个值。
- **拒因（reason）**：表示一个 Promise 的拒绝原因。

## 状态

一个 Promise 的当前状态必须为以下三种状态中的一种：等待态（Pending）、执行态（Fulfilled）和拒绝态（Rejected）。

### 等待态（Pending）

处于等待态时，Promise 需满足以下条件：

- 可以迁移至执行态或拒绝态

### 执行态（Fulfilled）

处于执行态时，Promise 需满足以下条件：

- 不能迁移至其他任何状态
- 必须拥有一个不可变的终值

### 拒绝态（Rejected）

处于拒绝态时，Promise 需满足以下条件：

- 不能迁移至其他任何状态
- 必须拥有一个不可变的拒因

这里的不可变指的是恒等（即可用 `===` 判断相等），而不是意味着更深层次的不可变（译者注：盖指当 value 或 reason 不是基本数据类型时，只要求其引用地址相等，但属性值可被更改）。

## Then 方法

一个 Promise 必须提供一个 `then` 方法以访问其**当前值**、**终值**和**拒因**。

Promise 的 then 方法接受两个参数：

```js
Promise.then(onFulfilled, onRejected);
```

### 参数可选

onFulfilled 和 onRejected 都是可选参数。

- 如果 onFulfilled 不是函数，其必须被忽略
- 如果 onRejected 不是函数，其必须被忽略

### onFulfilled 特性

如果 onFulfilled 是函数：

- 当 Promise 执行结束后其必须被调用，其第一个参数为 Promise 的终值
- 在 Promise 执行结束前其不可被调用
- 其调用次数不可超过一次

### onRejected 特性

如果 onRejected 是函数：

- 当 Promise 被拒绝执行后其必须被调用，其第一个参数为 Promise 的拒因
- 在 Promise 被拒绝执行前其不可被调用
- 其调用次数不可超过一次

### 调用时机

onFulfilled 和 onRejected 只有在执行环境堆栈仅包含平台代码时才可被调用。[注 1](#注1)

### 调用要求

onFulfilled 和 onRejected 必须被作为函数调用（即没有 this 值）[注 2](#注2)

### 多次调用

`then` 方法可以被同一个 Promise 调用多次

- 当 Promise 成功执行时，所有 onFulfilled 需按照其注册顺序依次回调
- 当 Promise 被拒绝执行时，所有的 onRejected 需按照其注册顺序依次回调

### 返回

`then` 方法必须返回一个 Promise 对象[注 3](#注3)

```js
promise2 = promise1.then(onFulfilled, onRejected);
```

- 如果 onFulfilled 或者 onRejected 返回一个值 `x` ，则运行下面的 Promise 解决过程：`[[Resolve]](Promise2, x)`
- 如果 onFulfilled 或者 onRejected 抛出一个异常 `e` ，则 promise2 必须拒绝执行，并返回拒因 `e`
- 如果 onFulfilled 不是函数且 promise1 成功执行， promise2 必须成功执行并返回相同的值
- 如果 onRejected 不是函数且 promise1 拒绝执行， promise2 必须拒绝执行并返回相同的拒因

**译者注**：理解上面的"返回"部分非常重要，即：**不论 `promise1` 被 reject 还是被 resolve 时 `promise2` 都会被 resolve，只有出现异常时才会被 rejected。**

## 解决过程

**Promise 解决过程**是一个抽象的操作，其需输入一个 Promise 和一个值，我们表示为 `[[Resolve]](Promise, x)`，如果 `x` 有 `then` 方法且看上去像一个 Promise ，解决程序即尝试使 Promise 接受 `x` 的状态；否则其用 `x` 的值来执行 Promise 。

这种 thenable 的特性使得 Promise 的实现更具有通用性：只要其暴露出一个遵循 Promise/A+ 协议的 `then` 方法即可；这同时也使遵循 Promise/A+ 规范的实现可以与那些不太规范但可用的实现能良好共存。

运行 `[[Resolve]](Promise, x)` 需遵循以下步骤：

### x 与 Promise 相等

如果 Promise 和 x 指向同一对象，以 TypeError 为拒因拒绝执行 Promise

### x 为 Promise

如果 x 为 Promise ，则使 Promise 接受 x 的状态 [注 4](#注4)：

- 如果 x 处于等待态，Promise 需保持为等待态直至 x 被执行或拒绝
- 如果 x 处于执行态，用相同的值执行 Promise
- 如果 x 处于拒绝态，用相同的拒因拒绝 Promise

### x 为对象或函数

如果 x 为对象或者函数：

- 把 `x.then` 赋值给 `then` [注 5](#注5)
- 如果取 `x.then` 的值时抛出错误 `e` ，则以 `e` 为拒因拒绝 Promise
- 如果 `then` 是函数，将 `x` 作为函数的作用域 `this` 调用之。传递两个回调函数作为参数，第一个参数叫做 `resolvePromise` ，第二个参数叫做 `rejectPromise`:
  - 如果 `resolvePromise` 以值 `y` 为参数被调用，则运行 [[Resolve]](Promise, y)
  - 如果 `rejectPromise` 以拒因 r 为参数被调用，则以拒因 r 拒绝 Promise
  - 如果 `resolvePromise` 和 `rejectPromise` 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
  - 如果调用 `then` 方法抛出了异常 `e`：
    - 如果 `resolvePromise` 或 `rejectPromise` 已经被调用，则忽略之
    - 否则以 `e` 为拒因拒绝 Promise
  - 如果 then 不是函数，以 x 为参数执行 Promise
- 如果 x 不为对象或者函数，以 x 为参数执行 Promise

如果一个 Promise 被一个循环的 thenable 链中的对象解决，而 `[[Resolve]](Promise, thenable)` 的递归性质又使得其被再次调用，根据上述的算法将会陷入无限递归之中。算法虽不强制要求，但也鼓励施者检测这样的递归是否存在，若检测到存在则以一个可识别的 TypeError 为拒因来拒绝 Promise [注 6](#注6)。

## 注释

### 注 1

这里的**平台代码**指的是引擎、环境以及 promise 的实施代码。实践中要确保 onFulfilled 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。这个事件队列可以采用 **宏任务（macro-task）** 机制或者 **微任务（micro-task）** 机制来实现。由于 Promise 的实施代码本身就是平台代码（**译者注**：即都是 JavaScript），故代码自身在处理在处理程序时可能已经包含一个任务调度队列。

**译者注**：这里提及了 `macrotask` 和 `microtask` 两个概念，这表示异步任务的两种分类。在挂起任务时，JavaScript 引擎会将所有任务按照类别分到这两个队列中，首先在 `macrotask` 的队列（这个队列也被叫做 `task queue` 任务队列）中取出第一个任务，执行完毕后取出 `microtask` 队列中的所有任务顺序执行；之后再取 `macrotask` 任务，周而复始，直至两个队列的任务都取完。

两个类别的具体分类如下：

- **macro-task**: script（整体代码）、`setTimeout`、`setInterval`、setImmediate、I/O、UI rendering
- **micro-task**: process.nextTick、Promise（这里指浏览器实现的原生 Promise）、Object.observe、MutationObserver

### 注 2

在严格模式（`strict`）中，函数 `this` 的值为 `undefined`；在非严格模式中其为全局对象。

### 注 3

代码实现在满足所有要求的情况下可以允许 `promise2 === promise1` 。每个实现都要文档说明其是否允许以及在何种条件下允许 `promise2 === promise1`。

### 注 4

总体来说，如果 `x` 符合当前实现，我们才认为它是真正的 Promise 。这一规则允许那些特例实现接受符合已知要求的 Promise 状态。

### 注 5

这步我们先是存储了一个指向 `x.then` 的引用，然后测试并调用该引用，以避免多次访问 `x.then` 属性。这种预防措施确保了该属性的一致性，因为其值可能在检索调用时被改变。

### 注 6

实现不应该对 thenable 链的深度设限，并假定超出本限制的递归就是无限循环。只有真正的循环递归才应能导致 TypeError 异常；如果一条无限长的链上 thenable 均不相同，那么递归下去永远是正确的行为。

## 参考资料

- [📖 Promise/A+ 规范原文](https://Promisesaplus.com/)
- [📖 Promise/A+ 规范译文](http://www.ituring.com.cn/article/66566)
- [📝 手写一个 Promise/A+，完美通过官方 872 个测试用例](https://juejin.im/post/6844904116913700877)
- [📝 手写 Promise 核心原理](https://juejin.im/post/6856213486633304078)
