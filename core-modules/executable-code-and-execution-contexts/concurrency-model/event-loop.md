# 事件循环

为了协调事件、用户交互、脚本、UI 渲染、网络请求，用户代理必须使用事件循环机制（Event Loop）。

这种事件循环机制是由 JavaScript 的宿主环境来实现的，在浏览器运行环境中由浏览器内核引擎实现，而在 NodeJS 中则由 [libuv](<https://github.com/libuv/libuv>) 引擎实现。

主线程运行时候，产生堆（Heap）和栈（Stack），栈中的代码调用各种外部 API，它们在任务队列中加入各种事件（Click、Load 和 Done）。只要栈中的代码执行完毕，主线程就会通过事件循环机制读取任务队列，依次执行那些事件所对应的回调函数。

## 浏览器环境

JavaScript 的异步任务根据事件分类分为两种：宏任务（MacroTask）和微任务（MicroTask）

- **宏任务**：main script、setTimeout、setInterval、setImmediate、I/O（Mouse Events、Keyboard Events、Network Events）、UI Rendering（HTML Parsing）
- **微任务**：Promise.then（非 new Promise）、process.nextTick、MutationObserver

宏任务与微任务的区别在于队列中事件的执行优先级。进入整体代码（宏任务）后，开始首次事件循环，当执行上下文栈清空后，事件循环机制会优先检测微任务队列中的事件并推至主线程执行，当微任务队列清空后，又会去检测宏任务队列中的事件，再将事件推至主线程中执行，而当执行上下文栈再次清空后，事件循环机制又会检测微任务队列，如此反复循环。

**宏任务与微任务的优先级**

* 宏任务的优先级高于微任务
* 每个宏任务执行完毕后都必须将当前的微任务队列清空
* 第一个 `<script>` 标签的代码是第一个宏任务
* `process.nextTick` 优先级高于 `Promise.then`

![事件循环机制中宏任务和微任务图解](../../../images/3/c531f7ee-008a-407c-b315-29f3092e3165.jpg)

🌰 **标准示例：**

```js
console.log(1);
    
setTimeout(() => {
  console.log(2);
}, 0);

let promise = new Promise(res => {
  console.log(3);
  resolve();
}).then(res => {
  console.log(4);
}).then(res => {
  console.log(5);
});
    
console.log(6);

// 1 3 6 4 5 2
```

## Node 环境

在 Node 中，事件循环表现出的状态与浏览器中大致相同。不同的是 Node 中有一套自己的模型。Node 中事件循环的实现是依靠的 [libuv](<https://github.com/libuv/libuv>) 引擎。我们知道 Node 选择 Chrome V8 引擎作为 JavaScript 解释器，V8 引擎将 JavaScript 代码分析后去调用对应的 Node API，而这些 API 最后则由 libuv 引擎驱动，执行对应的任务，并把不同的事件放在不同的队列中等待主线程执行。 因此实际上 Node 中的事件循环存在于 libuv 引擎中。

```
   ┌───────────────────────┐
┌─>│        timers         │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     I/O callbacks     │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     idle, prepare     │
│  └──────────┬────────────┘      ┌───────────────┐
│  ┌──────────┴────────────┐      │   incoming:   │
│  │         poll          │<──connections───     │
│  └──────────┬────────────┘      │   data, etc.  │
│  ┌──────────┴────────────┐      └───────────────┘
│  │        check          │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
└──┤    close callbacks    │
   └───────────────────────┘
```

* 外部输入数据
* 轮询阶段（Poll）：等待新的 I/O 事件，Node 在一些特殊情况下会阻塞在这里
* 检查阶段（Check）：`setImmediate` 的回调会在这个阶段执行
* 关闭事件回调阶段（Close Callback）
* 定时器检测阶段（Timer）：这个阶段执行定时器队列中的回调
* I/O 事件回调阶段（I/O Callbacks）：这个阶段执行几乎所有的回调，但是不包括 `close` 事件、定时器和 `setImmediate()` 的回调
* 闲置阶段（Idle Prepare）：仅在内部使用，不必理会

## 缺陷

当一个消息需要太长时间才能处理完毕时，Web 应用就无法处理用户的交互，例如点击或滚动。浏览器用程序需要过长时间运行的对话框来缓解这个问题。一个很好的做法是缩短消息处理，并在可能的情况下将一个消息裁剪成多个消息。

---

**参考资料：**

* [📖 HTML Standard: Processing model](<https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model>)
* [📖 MDN: EventLoop](<https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop>)
* [📝 The JavaScript Event Loop: Explained](<https://blog.carbonfive.com/2013/10/27/the-javascript-event-loop-explained/>)
* [📝 详解 JavaScript 中的 Event Loop（事件循环）机制](<https://zhuanlan.zhihu.com/p/33058983>)
* [📝 不要混淆 Node.js 和浏览器中的 Event Loop](<https://cnodejs.org/topic/5a9108d78d6e16e56bb80882>)
* [🎥 Further Adventure of the Event Loop](<https://www.youtube.com/watch?v=u1kqx6AenYw>)

