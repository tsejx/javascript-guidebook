---
nav:
  title: DOM
  order: 6
group:
  title: 文档对象模型
  order: 1
title: 文档对象模型
order: 2
---

# 文档对象模型

文档对象模型（Document Object Model，简称 DOM），是 W3C 组织推荐的处理可扩展置标语言的标准编程接口。DOM 把整个页面映射为一个多层的节点结构，HTML 或 XML 页面中的每个组成部分都是某种类型的节点，这些节点又包含着不同类型的数据。

W3C DOM 由以下三部分组成：

- 核心 DOM - 针对任何结构化文档的标准模型
- XML DOM - 针对 XML 文档的标准模型
- HTML DOM - 针对 HTML 文档的标准模型

通过 DOM 接口，应用程序可以在任何时候访问文档中的任何一部分数据，因此，这种利用 DOM 接口的机制也被称作随机访问机制。

## DOM 级别

### DOM0

DOM0（即第 0 级 DOM），实际上指的是未形成标准的试验性质的初级阶段的 DOM。由于 DOM0 在 W3C 进行标准备化之前出现，还处于未形成标准的初期阶段，这时 Netscape 和 Microsoft 各自推出自己的第四代浏览器，自此 DOM 便开始出现各种问题。

### DHTML

DHTML 是 Dynamic HTML（动态 HTML）的简称。DHTML 并不是一项新技术，而是将 HTML、CSS、JavaScript 技术组合的一种描述。即：

- 利用 HTML 把网页标记为各种元素
- 利用 CSS 设置元素样式及其显示位置
- 利用 JavaScript 操控页面元素和样式

利用 DHTML，看起来可以很容易的控制页面元素，并实现原本很复杂的效果（如：通过改变元素位置实现动画）。但事实并非如此，因为没有规范和标准，两种浏览器对相同功能的实现的确完全不一样。为了保持程序的兼容性，程序员必须写一些探查代码以检测 JavaScript 是运行于哪种浏览器之下，并提供与之对应的脚本。JavaScript 陷入了前所未有的混乱，DHTML 也因此在人们心中留下了很差的印象。

### DOM1

在浏览器厂商进行浏览器大战的同时，W3C 结合各厂商的优点推出了一个标准化的 DOM，并于 1998 年 10 月完成了第一级 DOM，即：DOM1。W3C 将 DOM 定义为一个与平台和编程语言无关的接口，通过这个接口程序和脚本可以动态的访问和修改文档的内容、结构和样式。

DOM1 级主要定义了 HTML 和 XML 文档的底层结构。在 DOM1 中，DOM 由两个模块组成：

- DOM Core（DOM 核心）：规定了基于 XML 的文档结构标准，通过这个标准简化了对文档中任意部分的访问和操作。
- DOM HTML：则在 DOM 核心的基础上加以扩展，添加了针对 HTML 的对象和方法，如：JavaScript 中的 Document 对象。

### DOM2

在 DOM1 的基础上 DOM2 引入了更多的交互能力，也支持了更高级的 XML 特性。DOM2 将 DOM 分为更多具有联系的模块。DOM2 级在原来 DOM 的基础上又扩充了鼠标、用户界面事件、范围、遍历等细分模块，而且通过对象接口增加了对 CSS 的支持。DOM1 级中的 DOM 核心模块也经过扩展开始支持 XML 命名空间。在 DOM2 中引入了下列模块，在模块包含了众多新类型和新接口：

- DOM 视图（DOM Views）：定义了跟踪不同文档视图的接口
- DOM 事件（DOM Events）：定义了事件和事件处理的接口
- DOM 样式（DOM Style）：定义了基于 CSS 为元素应用样式的接口
- DOM 遍历和范围（DOM Traversal and Range）：定义了遍历和操作文档树的接口

### DOM3

DOM3 级：进一步扩展了 DOM，引入了以统一方式加载和保存文档的方法，它在 DOM Load And Save 这个模块中定义；同时新增了验证文档的方法，是在 DOM Validation 这个模块中定义的。
DOM3 进一步扩展了 DOM，在 DOM3 中引入了以下模块：

- DOM 加载和保存模块（DOM Load and Save）：引入了以统一方式加载和保存文档的方法
- DOM 验证模块（DOM Validation）：定义了验证文档的方法
- DOM 核心的扩展（DOM Style）：支持 XML 1.0 规范，涉及 XML Infoset、XPath 和 XML Base

## 文档类型

我们说 DOM 文档对象模型是从文档中抽象出来的，DOM 操作的对象也是文档，因此我们有必要了解一下文档的类型。文档随着历史的发展演变为多种类型，如下:

```jsx | inline
import React from 'react';
import img from '../../assets/dom/document-type-history.jpeg';

export default () => <img alt="文档类型发展史" src={img} width={800} />;
```

### GML

GML（Generalized Markup Language，通用标记语言）是 1960 年代的一种 IBM 文档格式化语言，用于描述文档的组织结构、各部件及其相互关系。GML 在文档具体格式方面，为文档员提供了一些方便，他们不必再为 IBM 的打印机格式化语言 SCRIPT 要求的字体规范、行距以及页面设计等浪费精力。这个 IBM 的 GML 包括 1960 年代的 GML 和 1980 年代的 ISIL。

### SGML

SGML（Standard Generalized Markup Language，标准通用标记语言）是 1986 年基于 IBM 的 GML 制定 ISO 标准（ISO 8879）。SGML 是现时常用的超文本格式的最高层次标准，是可以定义标记语言的元语言，甚至可以定义不必采用 `"<>"` 的常规方式。由于 SGML 的复杂，因而难以普及。HTML 和 XML 同样衍生于 SGML，XML 可以被认为是 SGML 的一个子集，而 HTML 是 SGML 的一个应用。

### HTML

HTML（HyperText Markup Language，超文本标记语言）是为“网页创建和其它可在网页浏览器中看到的信息”设计的一种标记语言。HTML 被用来结构化信息——例如标题、段落和列表等等，也可用来在一定程度上描述文档的外观和语义。1982 年，蒂姆·伯纳斯-李为使世界各地的物理学家能够方便的进行合作研究，创建了使用于其系统的 HTML。之后 HTML 又不断地扩充和发展，成为国际标准，由万维网联盟（W3C）维护。第一个正式标准是 1995 年发布的 RFC 1866（HTML 2.0）。

### XML

XML（eXtensible Markup Language，可扩展标记语言）是专家们使用 SGML 精简制作，并依照 HTML 的发展经验，产生出一套使用上规则严谨，但是简单的描述数据语言。XML 在 1995 年开始有雏形，在 1998 二月发布为 W3C 的标准（XML1.0）

### XHTML

XHTML（eXtensible HyperText Markup Language，可扩展超文本标记语言)的表现方式与超文本标记语言（HTML）类似，不过语法上更加严格。从继承关系上讲，HTML 是一种基于标准通用标记语言（SGML）的应用，是一种非常灵活的置标语言，而 XHTML 则基于可扩展标记语言（XML），XML 是 SGML 的一个子集。XHTML 1.0 在 2000 年 1 月 26 日成为 W3C 的推荐标准。

---

**参考资料：**

- [📖 W3C DOM 规范](https://www.w3.org/TR/dom/)
- [📝 深入浅出 DOM 基础——《DOM 探索之基础详解篇》学习笔记](https://github.com/jawil/blog/issues/9)
