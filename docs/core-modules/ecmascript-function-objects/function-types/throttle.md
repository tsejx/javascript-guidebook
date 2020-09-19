---
nav:
  title: 核心模块
  order: 3
group:
  title: 函数类型
  order: 10
title: 函数节流
order: 8
---

# 函数节流

**函数节流**：规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。

🏕 **生活中的实例：**

我们知道目前的一种说法是当 1 秒内连续播放 24 张以上的图片时，在人眼的视觉中就会形成一个连贯的动画，所以在电影的播放中基本是以每秒 24 张的速度播放的，为什么不是 100 张或更多呢，主要是因为 24 张就可以满足人类视觉需求的时候，100 张就会显得很浪费资源。

## 目的

从字面上就可以理解，函数节流就是用来节流函数从而一定程度上优化性能的。

例如，DOM  操作比起非 DOM  交互需要占用更多的内存空间和消耗更多的 CPU  时间。连续尝试进行过多的 DOM  相关操作可能会导致浏览器卡顿，有时候甚至会崩溃。尤其在 IE  中使用 `onresize`  事件处理程序的时候容易发生，当调整浏览器大小的时候，该事件会连续触发。在 `onresize`  事件处理程序内部如果尝试进行 DOM  操作，其高频率的更改可能会让浏览器崩溃。

## 代码实现

### 时间戳实现

```js
/**
 * 实现函数的节流（目的是频繁触发中缩减频率）
 * @param func {Function} 实际要执行的函数
 * @param wait {Number} 执行间隔，单位是毫秒(ms)，默认100ms
 * @return {Function} 可被调用执行的函数
 */

function throttle(func, wait = 500) {
  // 利用闭包保存定时器和上次执行时间
  let timer = null;

  // 上次执行时间
  let prev = Date.now();

  return function(...params) {
    const now = Date.now();

    if (now - prev > wait) {
      prev = now;
      func.apply(this, params);
    }
  };
}
```

### 定时器实现

```js
function throttle(func, wait = 500) {
  let timer = null;

  return function(...params) {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, params);
        timer = null;
      }, wait);
    }
  };
}
```

## 具体应用

### 原生实现应用

首次点击按钮触发 `trigger` 函数，在 1000 毫秒内频繁点击按钮也不会再次执行 `trigger` 函数，直到 1000 毫秒之后再次点击才会再次执行 `trigger` 函数。

```js
const button = document.getElementById('button');

function trigger() {
  console.log('click');
}

button.addEventListener('click', throttle(trigger, 1000));
```

### React 应用

在 React 中使用，下面监听窗口的 `resize` 和输入框的 `onChange` 事件：

```jsx | pure
import React, { Component } from 'react';
import { throttle } from '@utils/throttle';

export default class Invoke extends Component {
  constructor() {
    super();
    this.change = throttle(e => {
      console.log(e.target.value);
      console.log('throttle');
    }, 100);
  }
  handleWindowResize() {
    console.log('resize');
  }
  componentDidMount() {
    window.addEventListener('resize', throttle(this.handleWindowResize, 100));
  }
  componentWillUnmount() {
    window.removeEvenetListener('resize', throttle(this.handleWindowResize), 100);
  }
  handleInputChange = e => {
    // 持久化
    e.persist();
    this.change(e);
  };

  render() {
    return <input type="text" onChange={this.handleInputChange} />;
  }
}
```

其他框架库的实现：

- [Lodash - throttle](https://github.com/lodash/lodash/blob/master/throttle.js)
- [Underscore - throttle](https://underscorejs.org/#throttle)

### 应用场景

常见的高频触发监听事件的应用场景：

- 动画场景：避免短时间内多次触发动画引起性能问题
- 拖拽场景：固定时间内只执行一次，防止超高频次触发位置变动（`mousemove`）
- 缩放场景：监控浏览器窗口大小（`resize`）
- 滚轮场景：鼠标滚轮事件（`wheel`）
- Canvas 画笔功能

> 总结：适合大量事件按时间做平均分配触发

## 应用实践

### 页面滚动事件

这里以判断页面是否滚动到底部为例，普通的做法就是监听 Window 对象的 `scroll` 事件，然后在函数体中写入判断是否滚动到底部的逻辑。

```js
$(window).on('scroll', function() {
  // 判断是否滚动到底部的逻辑
  let pageHeight = $('body').height(),
    scrollTop = $(window).scrollTop(),
    winHeight = $(window).height(),
    thresold = pageHeight - scrollTop - winHeight;

  if (thresod > -100 && thresold <= 20) {
    console.log('The end');
  }
});
```

这样做的一个缺点就是比较消耗性能，因为当在滚动的时候，浏览器会无时无刻地在计算判断是否滚动到底部的逻辑，而在实际场景中是不需要这么做的，在实际场景中可能是这样的：在滚动过程中，每隔一段时间再去计算这个判断逻辑。而函数节流所做的工作就是每隔一段时间去执行一次原本需要无时无刻地在执行的函数，所以在滚动事件中引入函数的节流是一个非常好的实践。

```js
$(window).on(
  'scroll',
  throttle(function() {
    // 判断是否滚动到底部的逻辑
    let pageHeight = $('body').height(),
      scrollTop = $(window).scrollTop(),
      winHeight = $(window).height(),
      thresold = pageHeight - scrollTop - winHeight;
    if (thresold > -100 && thresold <= 20) {
      console.log('end');
    }
  }, 300)
);
```

加入函数节流之后，当页面再滚动的时候，每隔 300ms 才会执行一次判断逻辑。

简单来说，函数的节流就是通过闭包保存一个标记（通常是定时器标识），在函数的开头判断这个标记是否为 `true` ，如果为 `true` 的话就继续执行函数，否则则 `return` 掉，判断完标记后立即把这个标记设为 `false` ，然后把外部传入的函数的执行包在一个 `setTimeout` 中，最后在 `setTimeout` 执行完毕后再把标记设置为 `true` （这里很关键），表示可以执行下一次的循环了。当 `setTimeout` 还未执行的时候，`canRun` 这个标记始终为 `false`，在开头的判断中被 `return` 掉。

```js
function throttle(fn, interval = 300) {
  let canRun = true;
  return function() {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      fn.apply(this.arguments);
      canRun = true;
    }, interval);
  };
}
```

---

**参考资料：**

- [📝 函数节流和函数防抖的可视化区别](http://demo.nimius.net/debounce_throttle/)
- [📝 轻松理解 JavaScript 函数节流和函数防抖](https://juejin.im/post/5a35ed25f265da431d3cc1b1)
