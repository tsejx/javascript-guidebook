---
nav:
  title: 核心模块
  order: 3
group:
  title: 并发模型
  order: 5
title: 并发模型
order: 1
---

# 并发模型

## 名词解释

在了解 JavaScript 单线程、非阻塞机制之前，先了解几组易混淆的概念。

进程和线程的概念以及关系：

- **进程（Process）**：进程是系统资源分配和调度的单元。一个运行着的程序就对应了一个进程。一个进程包括了运行中的程序和程序所使用到的内存和系统资源。
- **线程（Thread）**：线程是进程下的执行者，一个进程至少开启一个线程（主线程），也可以开启多个线程。

并行和并发的概念：

- **并行（Parallelism）**：指程序的运行状态，在同一时间内有几件事情并行在处理。由于一个线程在同一时间只能处理一件事情，所以并行需要多个线程在同一时间执行多件事情。
- **并发（Concurrency）**：指程序的设计结构，在同一时间内多件事情能被交替地处理。重点是，在某个时间内只有一件事情在执行。比如单核 CPU 能实现多任务运行的过程就是并发。

阻塞和非阻塞的概念：

- **阻塞（Blocking）**：阻塞是指调用在等待的过程中线程被挂起（CPU 资源被分配到其他地方去）
- **非阻塞（Non-blocking）**：非阻塞是指等待的过程 CPU 资源还在该线程中，线程还能做其他的事情

再来区分单线程和多线程的区别：

- **单线程**：从头执行到尾，逐行执行，如果其中一行代码报错，那么剩下代码将不再执行。同时容易代码阻塞。
- **多线程**：代码运行的环境不同，各线程独立，互不影响，避免阻塞。

同步与异步的概念：

- **同步（Synchronous）**：程序发出调用的时候，一直等待直到返回结果，没有结果之前不会返回。也就是，同步时调用者主动等待调用过程，且能立即得到结果的。
- **异步（Asynchronous）**：程序发出调用之后，无法立即得到结果，需要额外的操作才能得到预期的结果是为异步。

## 运行环境

JavaScript 的运行通常是在浏览器环境中进行的，具体由 JavaScript 引擎去解析和运行。

### 浏览器线程

目前最为流行的浏览器为：Chrome、IE、Safari、Firefox、Opera。浏览器的内核是多线程的，通常由以下几个常驻的线程组成：

- **渲染引擎线程**：负责页面的渲染
- **JavaScript 引擎线程**：负责 JavaScript 的解析和执行
- **定时触发器线程**：处理定时事件，比如 `setTimeout`、`setInterval`
- **浏览器事件触发线程**：处理 DOM 事件
- **异步 HTTP 请求线程**：处理 HTTP 请求

⚠️ 需要注意的是，渲染线程和 JavaScript 引擎线程是 <strong style="color: red">互斥</strong> 的。渲染线程在执行任务的时候，JavaScript 引擎线程会被挂起。因为 JavaScript 可以操作 DOM，若在渲染中 JavaScript 处理了 DOM，浏览器可能会不知所措了。

### 内核引擎

通常讲到浏览器的时候，我们会说到两个浏览器的核心组件：**渲染引擎**（Rendering Engine）和 **JavaScript 解释器**（JavaScript Interpreter）。

| 浏览器厂商        | 渲染引擎             | JavaScript 解释器（引擎）                |
| :---------------- | :------------------- | :--------------------------------------- |
| Chrome            | Webkit => Blink      | V8                                       |
| Safari            | Webkit               | Nitro                                    |
| Firefox           | Gecko                | SpiderMonky / TraceMonkey / JaegerMonkey |
| Opera             | Presto => Blink      | Linear A / Linear B / Futhark / Carakan  |
| Internet Explorer | Trident => EdgeHTML  | JScript / Chakra（9+）                   |
| Edge              | EdgeHTML => Chromium | Chakra                                   |

> 注：Webkit 引擎包含 WebCore 排版引擎及 JavaScript Core 解析引擎

不同的渲染引擎对同一个样式的实现不一致，就导致了经常被人诟病的浏览器样式兼容性问题。

JavaScript 解释器可以说是 JavaScript 虚拟机，负责 JavaScript 代码的解析和执行。这里 [编译阶段](../compilation/compilation) 有详细解读。

## 单线程

JavaScript 的**单线程**，与它的用途有关。作为浏览器脚本语言，JavaScript 的主要用途是与用户互动，以及操作 DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定 JavaScript 同时有两个线程，一个线程在某个 DOM 节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准呢？

所以，为了避免复杂性，从诞生之初以来，JavaScript 运行环境就是单线程，这已经成了这门语言的核心特征，将来也不会改变。

为了利用多核 CPU 的计算能力，HTML5 提出 Web Worker 标准，允许 JavaScript 脚本创建多个线程，但是子线程完全受主线程控制，且不得操作 DOM。所以，这个新标准并没有改变 JavaScript 单线程的本质。

⚠️ **注意**： 需要注意的是，JavaScript 的单线程是指一个程序进程（在浏览器运行环境中运行的就是浏览器进程）中只有一个 JavaScript 的执行线程，同一时刻内只会有一段 JavaScript 代码在执行。而异步机制是运行环境的两个或以上常驻线程共同完成的。

## 任务队列

JavaScript 中的程序任务可以分为两种：

- **同步任务（Synchronous）**：同步任务在主线程上调用之后需要一直等待，只有当前任务执行完毕后，才能执行下一个任务
- **异步任务（Asynchronous）**：异步任务会在主线程先执行一部分，然后退出主线程至专用线程中执行。在异步任务准备就绪后，会被推进任务队列等待（Task Queue），当主线程空闲时，JavaScript 解释器会执行一次事件循环（EventLoop）将事件队列中首个事件推进主线程执行

具体来说，**异步执行的运行机制** 如下：

1. 所有同步任务及异步任务按照 [编译原理](../compilation/compilation#编译原理) 在主线程上执行，形成一个 [执行上下文栈](../execution/execution-context-stack)（Execution Context Stack）
2. 同步任务执行完成并返回结果后退出执行上下文栈；异步任务执行一部分后，退出主线程的执行上下文栈，推进至运行环境的专用线程中继续执行
3. 当运行环境的专用线程中的异步任务准备就绪后，将被推至任务队列（Task Queue）中等待执行
4. 主线程的执行上下文栈中的所有任务执行完毕后，JavaScript 解释器就会通过事件循环机制检查任务队列中是否存在等待执行的事件。如果存在，则队首的异步任务将结束等待状态，进入执行上下文执行
5. JavaScript 主线程运行期间将不断重复上面第四步

<br/>

```jsx | inline
import React from 'react';
import img from '../../../assets/concurrency-model/workflow.png';

export default () => <img alt="异步任务执行机制图解" src={img} width={640} />;
```

## 参考资料

- [📝 聊聊 JavaScript 与浏览器的那些事：引擎与线程](https://hijiangtao.github.io/2018/01/08/JavaScript-and-Browser-Engines-with-Threads/)
- [📝 JavaScript 单线程异步的背后——事件循环机制](https://zhuanlan.zhihu.com/p/27035708)
- [📝 JavaScript 运行机制详解：再谈 Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)
- [🎥 Philip Roverts: What the heck is the event loop anyway](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
