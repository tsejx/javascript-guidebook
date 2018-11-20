## 浏览器加载的时间线

这是补充前面的 HTML 解析为 DOM 部分的内容。

1. 创建 document 对象，解析 HTML，将元素对象和文本内容添加到文档中，此时 `document.readyState = 'loading'`
2. 遇到 `<link>` 标签连接加载外部 CSS 的时候，创建新的线程异步加载，继续解析 HTML
3. 遇到有 src 的 `<scripts>` 标签（没有 `async` 和 `defer` 标记）加载外部的 JS 脚本时，同步加载并阻塞解析 HTML，而且加载完马上执行
4. 遇到设置 `async` 和 `defer` 的 `<script>`，创建新的线程异步加载，继续解析 HTML。`async` 加载完马上执行，`defer` 在 DOMContentLoaded 前执行
5. 遇到带有 src 的 `<img>`，解析 DOM 结构，再异步加载 src 的图片资源，不会等待 `<img>` 加载完成继续解析文档。另外，`<img>` 要等待 CSS 加载完才解码，所以 CSS 阻塞图片的呈现，类似于 JavaScript 阻塞 HTML 解析一样。可以想一下，如果 CSS 被设置为 `display：none`，还有意义吗？所以此时虽然对后台有请求但不解码
6. 文档**解析**完毕，`document.readyState = 'interactive'`
7. 此时带有 `defer` 的 JS 脚本开始按顺序执行
8. DOMContentLoaded 触发，程序从同步脚本执行转化为事件驱动阶段（类似 `ele.onclick = handel` 已经开始生效）
9. 当所有的 `<script>` 加载完成并且成功执行、`<img>` 和 CSS 加载完毕，`document.readyState = 'completed'`，触发 onload 事件
10. 异步响应 UI 行为，开始交互

### 补充：script和link标签的问题

明显，CSSOM 树和 DOM 树是互不关联的两个过程。平时我们把 `<link>` 标签放部头而 `<script>` 放 `<body>` 尾部，因为 JS 阻塞阻塞 DOM 树的构建。但是 JS 需要查询 CSS 信息，所以 JS 还要等待 CSSOM 树构建完才可以执行。这就造成 CSS 阻塞了 JS，JS 阻塞了 DOM 树构建。所以我们只要设置 `<link>` 的 preload 来预加载 CSS 文件，解决了 JS 执行时 CSSOM 树还没构建好的阻塞问题。当然，`<script>` 异步加载也是另外的方法。

总的来说，参考一下很多人说过的规律：

- CSS 不会阻塞 DOM 的解析，但会阻塞 DOM 渲染。
- JS 阻塞 DOM 解析，但浏览器会"偷看"DOM，提前下载资源。
- 浏览器遇到 `<script>` 且没有 `defer` 或 `async` 属性的标签时，会触发页面渲染，因而如果前面 CSS 资源尚未加载完毕时，浏览器会等待它加载完毕在执行脚本。

---

参考资料：

- [掘金：浏览器原理](https://juejin.im/post/5b0a6f1af265da0ddb63ecd9#heading-27)

 

 

 