---
nav:
  title: DOM
  order: 6
group:
  title: 文档对象模型
  order: 1
title: 节点层次
order: 3
---

# 节点层次

DOM 可以将任何 HTML 描绘成一个由多层节点构成的结构。节点分为 12 种不同类型，每种类型分别表示文档中不同的信息及标记。每个节点都拥有各自的特点、数据和方法，也与其他节点存在某种关系。节点之间的关系构成了层次，而所有页面标记则表现为一个以特定节点为根节点的树形结构。

```jsx | inline
import React from 'react';
import img from '../../assets/hierarchy-of-nodes/dom.jpeg';

export default () => <img alt="DOM结构" src={img} width={720} />;
```

先看看下面代码：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>DOM</title>
  </head>
  <body>
    <h2><a href="https://github.com">javascript DOM</a></h2>
    <p>对HTML元素进行操作，可添加、改变或移除css样式等</p>
    <ul>
      <li>JavaScript</li>
      <li>DOM</li>
      <li>CSS</li>
    </ul>
  </body>
</html>
```

将 HTML 代码分解为 DOM 节点层次图：

```jsx | inline
import React from 'react';
import img from '../../assets/hierarchy-of-nodes/dom-structure.jpeg';

export default () => <img alt="DOM结构图" src={img} width={720} />;
```

HTML 文档可以说由节点构成的集合，DOM 节点由：

1. 元素节点：上图中 `<html>`、`<body>`、`<p>` 等都是元素节点，即标签
2. 文本节点：向用户展示的内容，如 `<li>...</li>` 中的 JavaScript、DOM、CSS 等文本
3. 属性节点：元素属性，如 `<a>` 标签的链接属性 `href="https://github.com"`

文档节点是每个文档的根节点。在这个例子中，文档节点只有一个字节点，即 `<html>` 元素，我们称之为文档元素。文档元素是文档的最外层元素，文档中的其他所有元素都包含在文档元素中。每个文档只能有一个文档元素。在 HTML 页面中，文档元素始终都是 `<html>`元素。在 XML 中，没有预定义的元素，因此任何元素都可能成为文档元素。

## DOM 节点类型

每一段标记都可以通过树中的一个节点来表示： HTML 元素通过元素节点表示，特性（Attribute）通过特性节点表示，文档类型通过文档类型节点表示，而注释则通过注释节点表示。总共 12 种节点类型，这些类型都继承自一个基类型。

| 数值常量 | 节点类型              | 说明             | nodeName        | nodeValue  |
| -------- | --------------------- | ---------------- | --------------- | ---------- |
| 1        | Element               | 元素节点         | 元素名          | null       |
| 2        | Attr                  | 属性节点         | 属性名称        | 属性值     |
| 3        | Text                  | 文本节点         | \#text          | 节点的内容 |
| 4        | CDATASection          | CDATA 节点       | \#cdata-section | 节点的内容 |
| 5        | EntityReference       | 实体引用名称节点 | 实体引用名称    | null       |
| 6        | Entity                | 实体名称节点     | 实体名称        | null       |
| 7        | ProcessingInstruction | 处理指令节点     | target          | 节点的内容 |
| 8        | Comment               | 注释节点         | \#comment       | 注释文本   |
| 9        | Document              | 文档节点         | \#document      | null       |
| 10       | DocumentType          | 文档类型节点     | 文档类型名称    | null       |
| 11       | DocumentFragment      | 文档片段节点     | \#document      | null       |
| 12       | Notation              | DTD 声明节点     | 符号名称        | null       |
