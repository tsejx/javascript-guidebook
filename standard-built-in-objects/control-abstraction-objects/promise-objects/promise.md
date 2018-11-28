## Promise

传统异步编程最大特点是地狱式回调嵌套，一旦嵌套层次过深，项目代码将难以理解和维护。而 Promise 能让我们通过链式调用的方法去解决回调地狱的问题。

Promise 是异步编程的一种解决方案，可以将异步操作队列化，按照期望的顺序执行，返回符合预期的结果。可以在对象之间传递和操作 Promise，帮助我们处理队列。

### 语法

```js
new Promise(function(resolve, reject){...}/* executor */)
```

### 参数

参数  `executor` 是带有 `resolve` 和 `reject` 两个参数的函数。

- Promise 构造函数执行时立即调用 `executor` 函数，`resolve` 和 `reject` 两个函数作为参数传入 `executor` ，`executor` 函数会在 Promise 构造函数返回新建对象前被调用。
- `resolve` 和 `reject` 函数被调用时，分别将 Promise 的状态改为 `fulfilled`（完成）或 `rejected`（失败）。
- `executor` 内部通常会执行一些异步操作，一旦完成，可以调用 `resolve` 函数来将 Promise 状态改成 `fulfilled`，或者在发生错误时将它的状态改为 `rejected`。

### 工作流

Promise 是一个代理对象（代理一个值），被代理的值在 Promise 对象创建时可能是未知的。它允许你为异步操作的成功和失败分别绑定相应的处理方法（handlers）。这让异步方法可以像同步方法那样返回值，但并不是立即返回最终执行结果，而是一个能代表未来出现的结果的 Promise 对象。

由于 `Promise.prototype.then` 和 `Promise.prototype.catch` 方法返回 Promise 对象，所以它们可以被链式调用。

![Promise](../../../images/s/566f8e31-9eb2-4eee-a066-cecf7f3567e8.png)

### 状态

 用 `new Promise` 实例化的 Promise 对象有以下三种状态：

- **"unresolved" Pending**：[待定] 初始状态
- **"has-resolution" Fulfilled**：[实现] 操作成功，此时会调用 `onFulfilled`
- **"has-rejection" Rejected**：[否决] 操作失败，此时会调用 `onRejected`

关于上述三种状态的读法，其中左侧在 [ES6 Promise](http://liubin.org/promises-book/#es6-promises) 规范中定义的术语，而左侧是在 [Promise/A+](http://liubin.org/promises-book/#promises-aplus) 中描述状态的术语。

![Promise state](../../../images/s/9ce037e1-c5ce-485b-9fae-9fa9c65b81ff.png)

⚠️ Promise 的状态，从 *Pending* 转换为 *Fulfilled* 或 *Rejected* 之后，这个 Promise 对象的状态就不会发生任何变化。

而当 Promise 状态一旦发生变化，就会触发 `.then()` 里的响应函数处理后续步骤。

但是，`Promise.then` 参数中的函数只会调用其中一个，调用哪个取决于该 Promise 的状态。

另外，Fulfilled 和 Rejected 这两个中的任何一种状态都可以表示为 **Settled（不变的）**。

### 创建Promise

ES6 规定，`Promise` 对象是一个构造函数，通过 `new` 关键字调用，生成 `Promise` 实例。

`Promise` 构造函数接受一个函数作为参数，该函数的两个参数分别是 `resolve` 和 `reject`。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。

- `resolve`：从「未完成」变为「已成功」，在异步操作成功时调用，并将异步操作的结果，作为参数传递出去。该函数的参数除了正常的值以外，还可能是另一个 Promise 实例。
- `reject`：从「未完成」变为「已失败」，在异步失败时调用，并将异步操作报出的错误，作为参数传递出去。该函数的参数通常是 Error 对象的实例，表示抛出的错误。

```js
new Promise(
	/* 执行器 */
    function(resolve, reject){
        // 异步处理
        
        resolve()	// 数据处理完成
        
        reject()	// 数据处理出错
    }
)
    .then(function A(){
    	// 成功，下一步
	}, function B(){
		// 失败，做相应处理
	})
```

**Promise 特点：**

- 无法取消 Promise，一旦新建它就会立即执行，无法中途取消
- 如果不设置回调函数，Promise 内部抛出错误，不会反应到外部
- 当处于 `pending` 状态时，无法得知目前进展到哪一个阶段

如果某些事件不断地反复发生，一般来说，使用 [Stream](https://nodejs.org/api/stream.html) 模式是比部署 `Promise` 更好的选择。

### 属性

| 属性                | 说明                      |
| ------------------- | ------------------------- |
| `Promise.length`    | 值总是1（构造器参数数目） |
| `Promise.prototype` | 表示 Promise 构造器的原型 |

### 方法

| 方法                     | 说明                                                 |
| ------------------------ | ---------------------------------------------------- |
| `Promise.all(iterable)`  | 用于将多个 Promise 实例，包装成一个新的 Promise 实例 |
| `Promise.race(iterable)` | 用于将多个 Promise 实例，包装成一个新的 Promise 实例 |
| `Promise.reject(reason)` | 返回新的 Promise 实例，该实例的状态为 `rejected`     |
| `Promise.resolve(value)` | 返回新的 Promise 实例，该实例的状态为 `fulfilled`    |

### Promise 原型

#### 属性

| 原型属性                        | 说明                                      |
| ------------------------------- | ----------------------------------------- |
| `Promise.prototype.constructor` | 返回被创建的实例函数，默认为 Promise 函数 |

#### 方法

| 原型方法                                          | 说明                                                         |
| ------------------------------------------------- | ------------------------------------------------------------ |
| `Promise.prototype.catch(onRejected)`             | 相当于 `.then(null, rejection)`，用于指定发生错误时的回调函数 |
| `Promise.prototype.then(onFulfilled, onRejected)` | 添加 `fulfillment` 和 `rejection` 回调到当前 Promise，返回一个新的 Promise，将以回调的返回值来 `resolve` |
| `Promise.prototype.finally(onFinally)`            | 用于指定无论 Promise 对象最后状态如何，都会执行的操作        |

---

参考资料：

- [JavaScript Promise 迷你书](http://liubin.org/promises-book/)