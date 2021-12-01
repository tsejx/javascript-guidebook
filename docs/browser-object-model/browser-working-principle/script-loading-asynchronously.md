---
nav:
  title: BOM
  order: 5
group:
  title: 浏览器工作原理
  order: 20
title: 脚本异步加载
order: 5
---

# 脚本异步加载

现代浏览器总是并行加载资源。脚本文件互相不会阻塞，但是会阻塞其他资源（例如图片、字体等）的下载。

后来为了用户体验，有了 `async` 和 `defer` ，脚本标记为异步，不会阻塞其他线程解析和执行。

当 HTML 解析器被 JavaScript 脚本阻塞时，解析器虽然会停止构建 DOM，但仍会识别该脚本后面的资源，并进行预加载。

1. 默认情况下，CSS 被视为阻塞渲染的资源，这意味着看浏览器将不会渲染任何已处理的内容，直至 CSSOM 构建完毕
2. JavaScript 不仅可以读取和修改 DOM 属性，还可以读取和修改 CSSOM 属性

存在阻塞的 CSS 资源时，浏览器会延迟 JavaScript 的执行和 DOM 构建

1. 当浏览器遇到一个 `<script>` 标记时，DOM 构建将暂停，直至脚本完成执行。
2. JavaScript 可以查询和修改 DOM 与 CSSOM。
3. CSSOM 构建时，JavaScript 执行将暂停，直至 CSSOM 就绪。

`<script>` 标签为止很重要。实际使用时，遵循下面两个原则：

1. CSS 优先：引入顺序上，CSS 资源先于 JavaScript 资源
2. JavaScript 应尽量少影响 DOM 的构建，例如把 JavaScript 脚本文件引入放在文档底部或使用异步加载

## 异步加载

- 标注为 `defer` 的 JavaScript 脚本文件不会停止 HTML 文档解析，而是等到解析结束才执行
- 标注为 `async` 只能引用外部脚本，下载完马上执行，但是不能保证加载顺序。

### 普通脚本

```html
<script src="foo.js"></script>
```

浏览器会做如下处理

- 同步加载，停止解析 document
- 请求 `foo.js`
- 执行 `foo.js` 中的脚本
- 继续解析 document

### defer

```html
<script src="foo.js" defer></script>
<script src="bar.js" defer></script>
```

`defer` 属性规定是否对异步加载的脚本延迟执行，直到页面加载为止。

- 不阻止解析 document，并行下载 `foo.js`、`bar.js`
- 即使下载完 `foo.js` 和 `bar.js` 仍继续解析 document
- 按照页面中出现的顺序，在其他同步脚本执行后，`DOMContentLoaded` 事件前依次执行 `foo.js` 和 `bar.js`

### async

```html
<script src="foo.js" async></script>
<script src="bar.js" async></script>
```

`async` 属性规定异步加载脚本并且立即执行，则会异步执行。

- 不阻止解析 document，并行下载 `foo.js` 和 `bar.js`
- 当脚本下载完成后立即执行
- 两者执行顺序不确定，执行阶段不确定，可能在 `DOMContentLoaded` 事件前或者后
- 第二个脚本文件可能会在第一个脚本文件之前执行，因此确保两者之间互不依赖非常重要
- 目的是不让页面等待两个脚本下载和执行，从而异步加载页面其他内容

### 综合运用

- 如果使用 `async`：脚本相对于页面的其余部分异步地执行
- 如果不使用 `async` 但使用 `defer`：脚本将在页面完成解析时执行
- 如果既不使用 `async` 也不使用 `defer`：在浏览器继续解析页面之前，立即读取并执行脚本

如果 `<script>` 无 `src` 属性，则 `defer` 和 `async` 会被忽略

动态添加的 `<script>` 标签隐含 `async` 属性

**图解脚本的异步加载**

```jsx | inline
import React from 'react';
import img from '../../assets/browser-working-principle/parse-javascript.png';

export default () => <img alt="JavaScript解析" src={img} width={720} />;
```

- 两者都不会阻止 document 的解析
- `defer` 会在 DOMContentLoaded 前依次执行
- `async` 则是下载完立即执行，不一定是在 DOMContentLoaded 前
- `async` 因为乱序，所以很适合像 Google Analytics 这样的无依赖脚本

## 加载事项

- `<link>`：加载外部 CSS 样式文件 。异步加载，继续解析 HTML。
- `<script src='url'>`：加载 JavaScript 脚本文件，同步加载并阻塞解析 HTML，加载完马上执行。
- `<script src='url' async>`：加载 JavaScript 脚本文件。异步加载，继续解析 HTML，加载完马上执行。
- `<script src='url' defer>`：加载 JavaScript 脚本文件。异步加载，继续解析 HTML，加载完延迟执行。
- `<img src='url' />`：加载图片，异步加载，继续解析 HTML；但是需要等待 CSS 解析完才解码，所以 CSS 阻塞图片呈现。

DOMContentLoaded 标识着程序从同步脚本执行转化为事件驱动阶段。

- CSSOM 树和 DOM 树是互不关联的两个过程
- CSS 不会阻塞 DOM 的解析，但会阻塞 DOM 渲染
- JavaScript 阻塞 DOM 解析，但浏览器会"偷看"DOM，提前下载资源
- 平时我们把 `<link>` 标签放部头而 `<script>` 放 `<body>` 尾部，是因为 JavaScript 阻塞阻塞 DOM 树的构建
- 但是 JavaScript 需要查询 CSS 信息，所以 JavaScript 还要等待 CSSOM 树构建完才可以执行
- 这就造成 CSS 阻塞了 JavaScript，JavaScript 阻塞了 DOM 树构建

* 浏览器遇到 `<script>` 且没有 `defer` 或 `async` 属性的标签时，会触发页面渲染，因而如果前面 CSS 资源尚未加载完毕时，浏览器会等待它加载完毕在执行脚本。

## 参考资料

- [📝 浏览器原理](https://juejin.im/post/5b0a6f1af265da0ddb63ecd9#heading-28)
- [📝 浅谈 script 标签的 defer 和 async](https://segmentfault.com/a/1190000006778717)
- [📝 JavaScript 和 CSS 的位置对资源加载顺序的影响](https://zhuanlan.zhihu.com/p/24944905)
