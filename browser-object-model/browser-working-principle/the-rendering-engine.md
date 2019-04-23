# 渲染引擎

渲染引擎的职责就是渲染，即在浏览器窗口中显示所请求的内容。默认情况下，渲染引擎可以显示 HTML、XML 文档及图片，它也可以借助插件（一种浏览器扩展）显示其他类型数据，例如使用 PDF 阅读器插件，可以显示 PDF 格式。渲染引擎最主要的用途是显示应用了 CSS 之后的 HTML 及图片。

## 种类

不同的浏览器有不同的渲染引擎，对于渲染引擎的使用总结如下：

- Webkit 内核：Safari / Chrome 等
- Gecko 内核：Netscape6 及以上版本 / Firefox / MozillaSuite / SeaMonkey 等
- Trident（MSHTML）内核：IE9- / MaxThon / TT / The World / 360 / 搜狗浏览器 / 腾讯浏览器等
- Presto 内核：Opera7 及以上
- Edge 内核：Win10 以上 IE 浏览器
- Blink 内核：Chromium

JavaScript 解析器：

- V8 引擎：Google Chrome
- spiderMonkey 引擎：Mozilla Firefox
- JScript 引擎：IE 系列浏览器
- linear b/futhark 引擎：Opera

## 基本流程

渲染引擎首先通过网络获得所请求文档的内容，通常以 8k 分块的方式完成。

下面是渲染引擎在获取文档内容之后的基本流程：

![渲染引擎基本流程](../../images/5/273fa38f-7637-46c9-a5fc-54a28a8fff9e.png)

1. **解析 HTML**：渲染引擎开始解析 HTML，并将标签转化为 DOM 节点树，即内容树
2. **解析 CSS**：同时，它也会解析外部 CSS 文件及 `<style>` 标签中的样式数据，生成 CSS 规则树
3. **构建渲染树**：这样样式信息以及 HTML 中的可见性指令将被用来构建另一个棵树——渲染树。渲染树由一些包含有颜色和大小属性的矩形组成，它们将按照正确的顺序显示到屏幕上
4. **布局**：渲染树构建好之后，将会执行布局过程，它将确定每个节点在屏幕上的确切坐标
5. **绘制**：再下一步就是绘制，即遍历渲染树，并使用 UI 后端层绘制每个节点

值得注意的是，这个过程是逐步完成的，为了更好的用户体验，渲染引擎将会尽可能早地将内容呈现到屏幕上，并不会等到所有 HTML 都解析完成之后再去构建和布局渲染树，它是解析完一部分内容就显示一部分内容，同时，可能还在通过网络下载其余内容。

## 渲染主流程

**Webkit 主流程**

![Webkit主流程](../../images/5/01908eec-19c7-4676-8c6f-fe574a7364b4.png)

**Gecko 主流程**

![Gecko主流程](../../images/5/205dae2d-835d-4e31-9592-c6ee9abe039a.png)

- Gecko 将视觉格式化元素组成的树称为 **框架树**（Frame）。每个元素都是一个框架。Webkit 使用的术语是 **渲染树**（Render），它由 **渲染对象** 组成。
- 对于元素的放置，Webkit 使用的术语是 **布局**（Layout），而 Gecko 称之为 **重排**（Reflow）。
- Webkit 称利用 DOM 节点及样式信息去构建渲染树的过程为 Attachment，Gecko 在 HTML 和 DOM 树之间附加了一层，这层称为内容接收器，相当制造 DOM 元素的工厂。

## 渲染引擎的线程

渲染引擎是单线程的，除了网络操作以外，几乎所有的事情都在单一的线程中处理，在 Firefox 和 Safari 中，该线程就是浏览器的主线程，而在 Chrome 中，该线程是标签页（Tab）的主线程。

网络操作可由多个并行线程执行，并行连接的个数是受限的（通常是 2 至 6 个，以 Firefox 3 为例是 6 个）。

UI 线程和 JavaScript 线程并不是同一个线程，浏览器中一般会先运行 UI 线程、JavaScript 线程以及事件触发线程。

UI 线程与 JavaScript 线程是互斥的，因为 JavaScript 运行结果会影响到 UI 线程的结果，当 JavaScript 线程运行的时候，UI 线程处于冻结状态。（现在浏览器可能对某些事件做了特殊处理，比如监听了 `scroll` 事件，在滚动时还是能够流畅的播放动画）。

互斥的实现方式大概是当 JavaScript 引擎执行时，GUI 线程会被挂起，GUI 更新会被保存在一个队列中等到 JavaScript 引擎空闲时立即被执行。

---

**参考资料：**

- [📝 浏览器渲染引擎到底做了什么](https://www.jianshu.com/p/281b574ee3f8)
- [📝 浅析渲染引擎与前端优化](https://blog.csdn.net/john1337/article/details/53579506)
