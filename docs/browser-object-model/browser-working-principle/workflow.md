---
nav:
  title: BOM
  order: 5
group:
  title: 浏览器工作原理
  order: 10
title: 工作流程
order: 1
---

# 工作流程

从耗时的角度，浏览器请求、加载、渲染一个页面，时间花在下面五件事情上：

1. DNS 查询
2. TCP 连接
3. HTTP 请求
4. 服务端响应
5. 客户端渲染

客户端渲染的大致工作流程：

1. [渲染引擎（The Rendering Engine）](the-rendering-engine.md)
2. [构建对象模型（Contructing the Object Model）](constructing-the-object-model.md)
3. [脚本加载](script-loads.md)
4. [渲染树构建（Render Tree Construction）](render-tree-construction.md)
5. [布局（Layout）](layout.md)
6. [绘制（Painting）](painting.md)
7. [CSS2 可视模型](css2-visual-module.md)
8. [渲染层合并](composite.md)

## 浏览器的主要组成部分

1. 用户界面（User Interface）：包括地址栏、后退 / 前进按钮、书签目录等，也就是你所看到的除了用来你所请求页面的主窗口之外的其他部分。
2. 浏览器引擎（Browser Engine）：在用户界面和呈现引擎之间传送指令。
3. 渲染引擎（Rendering Engine）：负责显示请求的内容。如果请求的内容是 HTML，它就负责解析 HTML 和 CSS 内容，并将解析后的内容显示在屏幕上。
4. 网络（Networking）：用于网络调试，例如 HTTP 请求，它具有平台无关的接口，并为所有平台提供底层实现。
5. UI 后端（UI Backed）：用来绘制类似组合选择框及对话框等基本组件，具有不特定于某个平台的通用接口，底层使用操作系统的用户接口。
6. JavaScript 解释器（Javascript Interpreter）：用于解析和执行 JavaScript 代码。
7. 数据存储（Data Persistence）：属于持久层，浏览器需要在硬盘中保存类似 Cookie 的各种数据，HTML5 定义了 Web Database 技术，这是一种轻量级完整的客户端存储技术。

需要注意的是，不同于大部分浏览器，Chrome 为每个 Tab 分配了各自的渲染引擎实例，每个 Tab 就是一个独立的进程。

## 浏览器的工作流程

```jsx | inline
import React from 'react';
import img from '../../assets/browser-working-principle/browser-working-process.jpg';

export default () => <img alt="浏览器工作大致流程" src={img} width={720} />;
```

1. **浏览器解析过程**
   - HTML / SVG / XHTML：渲染引擎通过三个 C++ 的类对应这三类文档，解析这三种文件构建 **DOM 树**（DOM Tree）
   - CSS：渲染引擎解析 CSS 文件构建 **CSS 规则树**（ CSS Rule Tree）
   - JavaScript：JavaScript 通过 DOM API 和 CSSOM API 来操作 DOM Tree 和 CSS Rule Tree
2. **构建渲染树（Rendering Tree）**
   - 解析完成后，浏览器引擎会通过 DOM 树和 CSS 规则树来构造**渲染树**
   - 渲染树并不等同于 DOM 树，因为一些像 `<header>` 或 `display: none` 的东西就没必要放到渲染树中
   - CSS 的 Rule Tree 主要是为了完成匹配并把 CSS Rule 附加至渲染树上的每个 Element 上。然后，计算每个渲染对象的位置，这通常是 布局（Layout） 和 重排（Reflow） 过程中发生
   - 一旦渲染树构建完成，浏览器会把树里面的内容绘制在屏幕上。
3. **布局（Layout）**：定位坐标和大小，是否换行，`position`、`overflow` 之类的属性。确定每个 DOM 元素的样式规则后，计算每个 DOM 元素最终在屏幕上显示的大小和位置。Web 页面中元素的布局是相对的，因此一个元素的布局发生变化，会联动地引发其他元素的布局发生变化。比如 `body` 元素的 `width` 变化会影响其后代元素的宽度
4. **绘制（Paint）**：绘制文字、颜色、图像、边框和阴影等，也就是一个 DOM 元素所有的**可视效果**。一般来说，这个绘制过程是在多个层上完成的
5. **渲染层合并（Composite）**：页面中 DOM 元素的绘制是在多个层上进行的，在每个层上完成绘制过程之后，浏览器会将所有层按照合理的顺序合并成一个图层，然后在屏幕上呈现
6. 最后通过调用操作系统 NativeGUI API 进行绘制

---

**参考资料：**

- [前端必读：浏览器内部工作原理](https://www.cnblogs.com/wjlog/p/5744753.html#chapter8)
- [浏览器的渲染：过程与原理](https://zhuanlan.zhihu.com/p/29418126)
- [浏览器工作员：Webkit 内核研究](https://juejin.im/entry/5a9a379af265da239d48c027)