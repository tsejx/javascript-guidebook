---
nav:
  title: 核心模块
  order: 3
group:
  title: 并发模型
  order: 5
title: 定时器机制
order: 3
---

# 定时器机制

```jsx | inline
import React from 'react';
import img from '../../../assets/timers-mechanism/timer.png';

export default () => <img alt="定时器机制" src={img} width={720} />;
```

让我们看看这里发生了什么事情：

1. 首先在 `0` 毫秒的时候有一个持续 `18` 毫秒的 JavaScript 代码块要执行。
2. 然后在 `0` 毫秒的时候设了两个 `10` 毫秒延迟的定时器，`setTimeout` 以及 `setInterval` ，`setTimeout` 先设定。
3. 在第 `6` 毫秒的时候有一个发生了鼠标单击事件。

## 事件排队

同时发生了这么多事情，由于 JavaScript 的单线程特性，**当主线程正在执行状态，有异步事件触发时，它就会退出主线程，进入宿主环境中用于处理定时器的线程，当准备就绪后会进入事件队列，并且在主线程空闲时才推入执行**。

这里的异步事件包括：鼠标单击、定时器触发、Ajax 请求、Promise 等事件。

示例中首先有一个 `18` 毫秒的代码块要执行，在这 `18` 毫秒中只能执行这段代码块，**其他事件触发了之后只能在事件队列中排队等待执行**。

在代码块还在运行期间，第 `6` 毫秒的时候，发生了一个鼠标单击事件，以及第 10 毫秒时的 `setTimeout` 和 `setInterval` 两个处理程序，这三个事件不能立即执行，而是**被添加到等待执行的事件队列**中。

## 先进先出原则

`18` 毫秒的时候代码块结束执行，有三个任务在排队等待执行，根据**先进先出的原则，此时会先执行 click 鼠标点击事件**，`setTimeout` 和 `setInterval` 将继续排队等待执行。先进先出原则可以理解为先排队的先执行。

## 间歇调用定时器调用被废弃

在鼠标点击事件执行时，第 20 毫秒处，第二个`setInterval`也到期了，因为此时已经 `click` 事件占用了线程，所以 `setInterval` 还是不能被执行，并且因为此时队列中已经有一个 `setInterval` 正在排队等待执行，所以这一次的 `setInterval` 的调用将被废弃。

⚠️ **注意**：浏览器不会对同一个 `setInterval` 处理程序多次添加到待执行队列。

## 定时器无法保证准时执行回调函数

鼠标点击事件在第 28 毫秒处结束执行，有两个任务（`setTimeout` 和 `setInterval`）正在等待执行，遵循先进先出的原则，`setTimeout` 早于 `setInterval` 设定，所以先执行 `setTimeout`。

因此我们期望在第 10 毫秒处执行的 `setTimeout` 处理程序，最终会在第 28 毫秒处才开始执行，这就是上文提到的`setTimeout`/`setInterval`无法保证准时执行回调函数。

在 30 毫秒处，`setInterval` 又触发了，因为队列中已经有 `setInterval` 在排队，所以这次的触发又作废了。

## 间歇调用定时器的连续执行

`setTimeout` 执行结束，在第 36 毫秒处，队列中的 `setInterval` 处理程序才开始执行，`setInterval` 需要执行 6 毫秒。

在第 40 毫秒的时候 `setInterval` 再次触发，因为此时**上一个 `setInterval` 正在执行期间，队列中并没有 `setInterval` 在排队，这次触发的 `setInterval` 将进入队列等候**。

因此，`setInterval` 的处理时长不能比设定的间隔长，否则 `setInterval` 将会没有间隔地重复执行。

第 42 毫秒的时候，**第一个 `setInterval` 结束，然后队列中的 `setInterval` 立即开始执行**，在 48 毫秒的时候完成执行。然后 50 毫秒的时候再次触发 `setInterval`，此时没有任务在排队，将会立即执行。

## 超时调用定时器按固定间隔触发周期性定时器

上文说了，`setInterval` 的处理时长不能比设定的间隔长，否则 `setInterval` 将会没有间隔的重复执行。

但是对这个问题，很多情况下，我们并不能清晰的把控处理程序所消耗的时长，为了我们能按照一定的间隔周期性的触发定时器。

```js
// 实际上我不止在忍者秘籍中见过，在很多地方都见过这种技术。
setTimeout(function repeatMe() {
  // do something
  setTimeout(repeatMe, 10);
  // 执行完处理程序的内容后，在末尾再间隔10毫秒来调用该程序，这样就能保证一定是10毫秒的周期调用
}, 10);
```

- 定时器不能非常细粒化的控制执行的时间，书中建议在 15ms 以上。
- 可以使用定时器来分解长时间运行的任务，这里可以自行谷歌。

函数 `setTimeout` 接受两个参数：待加入队列的消息和一个延迟（可选，默认为 0）。这个延迟代表了消息被实际加入到队列的最小延迟时间。如果队列中没有其它消息，在这段延迟时间过去之后，消息会被马上处理。但是，如果有其它消息，`setTimeout` 消息必须等待其它消息处理完。因此第二个参数仅仅表示最少延迟时间，而非确切的等待时间。

---

参考资料：

- [你真的了解 setTimeout 和 setInterval 吗？](http://qingbob.com/difference-between-settimeout-setinterval/)
- [How JavaScript Timers Work](https://johnresig.com/blog/how-javascript-timers-work/)
