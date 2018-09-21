## 整体工作流程

从耗时的角度，浏览器请求、加载、渲染一个页面，时间花在下面五件事情上：

1. DNS 查询
2. TCP 连接
3. HTTP 请求即响应
4. 服务器响应
5. 客户端渲染

浏览器渲染的大致工作流程：

1. [渲染引擎（The Rendering Engine）](TheRenderingEngine.md)
2. [解析过程（Parsing）](Parsing.md)
3. [渲染树构建（Render Tree Construction）](RenderTreeConstruction.md)
4. [布局（Layout）](Layout.md)
5. [绘制（Painting）](Painting.md)
6. 动态变化和渲染引擎的线程
7. CSS2可视模型（CSS2 Visual Model）

### 主流浏览器

根据 StarCounter 统计的全球浏览器市场份额排名：

- Chrome
- Safari
- Firefox
- Opera
- Internet Explorer

### 浏览器的主要组成部分

1. 用户界面（User Interface）：包括地址栏、后退/前进按钮、书签目录等，也就是你所看到的除了用来你所请求页面的主窗口之外的其他部分。
2. 浏览器引擎（Browser Engine）：在用户界面和呈现引擎之间传送指令。
3. 渲染引擎（Rendering Engine）：负责显示请求的内容。如果请求的内容是 HTML，它就负责解析 HTML 和 CSS 内容，并将解析后的内容显示在屏幕上。
4. 网络（Networking）：用于网络调试，例如 HTTP 请求，它具有平台无关的接口，并为所有平台提供底层实现。
5. UI后端（UI Backed）：用来绘制类似组合选择框及对话框等基本组件，具有不特定于某个平台的通用接口，底层使用操作系统的用户接口。
6. JavaScript解释器（Javascript Interpreter）：用于解析和执行 JavaScript 代码。
7. 数据存储（Data Persistence）：属于持久层，浏览器需要在硬盘中保存类似 Cookie 的各种数据，HTML5 定义了 Web Database技术，这是一种轻量级完整的客户端存储技术。

需要注意的是，不同于大部分浏览器，Chrome 为每个 Tab 分配了各自的渲染引擎实例，每个 Tab 就是一个独立的进程。

### 浏览器的工作流程

![浏览器工作大致流程](../../Image/05/743418c6-cb11-416e-bccc-688afae04b01.jpg)

1. 浏览器解析过程

   - HTML/SVG/XHTML：渲染引擎通过三个 C++ 的类对应这三类文档。解析这三种文件会生成 DOM树（DOM Tree）
   - CSS：渲染引擎解析 CSS 生成 CSS规则树（ CSS Rule Tree）
   - JavaScript：JavaScript 通过 DOM API 和 CSSOM API 来操作 DOM树 和 CSS规则树

2. 构建渲染树（Rendering Tree）

   - 解析完成后，浏览器引擎会通过 DOM 树和 CSS 规则树来构造渲染树 

   - 渲染树并不等同于 DOM 树，因为一些像 Header 或 `display: none` 的东西就没必要放到渲染树中
   - CSS 的 Rule Tree主要是为了完成匹配并把CSS Rule附加上渲染树上的每个Element，也就是所谓的Frame（Firefox 将渲染树中的元素称为frame，WebKit 的是呈现器或呈现对象，其实就是DOM节点，别以为是什么高大上的东西。 呈现器知道如何布局并将自身及其子元素绘制出来 ）。然后，计算每个Frame的位置，这通常是layout和reflow过程中发生。
   - 一旦渲染树构建完成，浏览器会把树里面的内容绘制在屏幕上。

3. 布局（Layout）：定位坐标和大小，是否换行，`position`、`overflow` 之类的属性。确定了每个 DOM 元素的样式规则后，计算每个 DOM 元素最终在屏幕上显示的大小和位置。Web 页面中元素的布局是相对的，因此一个元素的布局发生变化，会联动地引发其他元素的布局发生变化。比如 `body` 元素的 `width` 变化会影响其后代元素的宽度。因此，布局过程是经常发生的。

4. 绘制（Paint）：绘制文字、颜色、图像、边框和阴影等，也就是一个DOM元素所有的可视效果。一般来说，这个绘制过程是在多个层上完成的。

5. 渲染层合并（Composite）：页面中DOM元素的绘制是在多个层上进行的，在每个层上完成绘制过程之后，浏览器会将所有层按照合理的顺序合并成一个图层，然后在屏幕上呈现。

6. 最后通过调用操作系统 NativeGUI API 进行绘制

---

参考资料：

- [前端必读：浏览器内部工作原理](https://www.cnblogs.com/wjlog/p/5744753.html#chapter8)
- [浏览器的渲染：过程与原理](https://zhuanlan.zhihu.com/p/29418126)