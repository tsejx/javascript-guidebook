---
nav:
  title: BOM
  order: 5
group:
  title: 监视 API
  order: 16
title: IntersectionObserver API
order: 1
---

# IntersectionObserver API

网页开发时，常常需要了解某个元素是否进入了「视口」（Viewport），即用户能不能看到它。

传统的实现方法是，监听到 `scroll` 事件后，调用目标元素的 `getBoundingClientRect()` 方法，得到它对应于视口左上角的坐标，再判断是否在视口之内。这种方法的缺点是，由于 `scroll` 事件密集发生，计算量很大，容易造成性能问题。

目前有个新的 IntersectionObserver API，可以自动观察元素是否可见，Chrome 51+ 已经支持。由于可见（visible）的本质是，目标元素与视口产生一个交叉区，所以这个 API 叫做 **交叉视察器**。

## API

```js
const io = new IntersectionObserver(callback, option);
```

IntersectionObserver 是浏览器原生提供的构造函数，接受两个参数：

- `callback`：可见性变化时的回调函数
- `option`：配置对象（可选）

构造函数的返回值是一个观察器实例，实例的 `observe` 方法可以指定观察哪个 DOM 节点。

```js
// 开始观察
io.observe(document.getElementById('example'));

// 停止观察
io.unobserve();

// 关闭观察器
io.disconnect();
```

上图代码中，`observe` 的参数是一个 DOM 节点对象。如果要观察多个节点，就要多次调用这个方法。

```js
io.observe(elementA);
io.observe(elementB);
```

## callback 参数

目标元素的可见性变化时，就会调用观察器的回调函数 `callback`。

`callback` 一般会出发两次。一次是目标元素刚刚进入视口（开始可见），另一次是完全离开视口（开始不可见）。

```js
const io = new IntersectionObserver(entries => console.log(entries));
```

上述代码中，回调函数采用的是箭头函数的写法。`callback` 函数的参数（`entries`）是一个数组，每个成员都是一个 IntersectionObserverEntry 对象。举例来说，如果同时有两个被观察的对象的可见性发生变化，`entries` 数组就会有两个成员。

## IntersectionObserverEntry 对象

IntersectionObserverEntry 对象提供目标元素的信息，一共有六个属性。

```js
{
  time: 3893.92,
  rootBounds: ClientRect {
    bottom: 920,
    height: 1024,
    left: 0,
    right: 1024,
    top: 0,
    width: 920
  },
  boundingClientRect: ClientRect {
    // ...
  },
  intersectionRect: ClientRect {
    // ...
  },
  intersectionRatio: 0.54,
  target: element
}
```

每个属性的含义如下：

- `time`：可见性发生变化的时间，是一个高精度时间戳，单位为毫秒
- `target`：被观察的目标元素，是一个 DOM 节点对象
- `rootBounds`：根元素的矩形区域的信息，`getBoundingClientRect()` 方法的返回值，如果没有根元素（即直接相对于视口滚动），则返回 `null`
- `boundingClientRect`：目标元素的矩形区域的信息
- `intersectionRect`：目标元素与视口（或根元素）的交叉区域的信息
- `intersectionRatio`：目标元素的可见比例，即 intersectionRect 占 boundingClientRect 的比例，完全可见时为 1，完全不可见时小于等于 0

```jsx | inline
import React from 'react';
import img from '../../assets/observer/intersection-observer-viewport.png';

export default () => <img alt="clientX/clientY" src={img} width={800} />;
```

## 应用

### 惰性加载

静态资源当用户向下滚动时，进入视口才加载，这样可以节省带宽，提高网页性能。这就叫做 **惰性加载**。

```js
function query(selector) {
  return Array.from(document.querySelectorAll(selector));
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(function(entry) {
    // 观察对象
    const container = entry.target;
    const content = container.querySelector('template').content;
    container.appendChild(content);
    observer.unobserve(container);
  });
});

query('.lazy-loaded').forEach(function(item) {
  observer.observe(item);
});
```

上述代码，当目标区域可见时，才会将模版内容给你插入真实 DOM，从而引发静态资源的加载。

### 无限滚动

```js
const io = new IntersectionObserver(entries => {
  // 如果不可见，就返回
  if (entries[0].intersectionRatio <= 0) return;

  loadItems(10);

  console.log('Loaded new items');
});

// 开始观察
intersectionObserver.observe(document.querySelector('.scrollFooter'));
```

无限滚动时，最好在页面底部有个页尾栏（又称 sentinels）。一旦页尾栏可见，就表示用户到达了页面底部，从而加载新的条目放在页尾栏前面。这样做的好处是，不需要再次调用 `observe()` 方法，现有的 IntersectionObserver 可以保持使用。

## Option 对象

IntersectionObserver 构造函数的第二个参数是个配置对象，它可以设置以下属性。

### threshold 属性

`threshold` 属性决定了什么时候出发回调函数。它是一个数组，每个成员都是一个门槛值，默认为 `[0]`，即交叉比例（`intersectionRatio`）达到 0 时触发回调函数。

```js
new IntersectionObserver(entries => {}, {
  threshold: [0, 0.25, 0.5, 0.75, 1],
});
```

用户可以自定义个数组。比如 `[0, 0.25, 0.5, 0.75, 1]` 就表示当目标元素 0%、25%、50%、75%、100% 可见时，会触发回调函数。

### root 和 rootMargin 属性

很多时候，目标元素不仅会随着窗口滚动，还会在容器里面滚动（比如在 iframe 窗口里滚动）。容器内滚动也会影响目标元素的可见性，参见本文开始时的那张示意图。

IntersectionObserver API 支持容器内滚动。`root` 属性指定目标元素所在的容器节点（即根元素）。注意，容器元素必须是目标元素的祖先节点。

```js
const opts = {
  root: document.querySelector('.container'),
  rootMargin: '500px 0px',
};

const observer = new IntersectionObserver(callback, opts);
```

上面代码中，除了 `root` 属性，还有 `rootMargin` 属性。后者定义根元素的 `margin`，用来扩展或缩小 `rootBounds` 这个矩形的大小，从而影响 `intersectionRect` 交叉区域的大小。它使用 CSS 的定义方法，比如 `10px 20px 30px 40px`，表示 top、right、bottom 和 left 四个方向的值。

这样设置以后，不管是窗口滚动或者容器内滚动，只要目标元素可见性变化，都会触发观察器。

## 注意点

IntersectionObserver API 是异步的，不随着目标元素的滚动同步触发。

规格写明，IntersectionObserver 的实现，应该采用 `requestIdleCallback()`，即只有线程空闲下来，才会执行观察器。这意味着，这个观察器的优先级非常低，只有其他任务执行完，浏览器有了空闲才会执行。

---

**参考资料：**

- [IntersectionObserver API 使用教程](http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html)
- [📝 IntersectionObserver 是什么](https://segmentfault.com/a/1190000021069054)
