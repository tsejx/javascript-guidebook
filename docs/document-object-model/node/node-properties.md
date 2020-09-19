---
nav:
  title: DOM
  order: 6
group:
  title: Node
  order: 4
title: Node 属性
order: 2
---

# Node 属性

通过暴露的 Node 节点属性，可以获取相关 Node 节点的属性信息。

```html
<body>
  <div id="app">
    Hello World！
    <ul id="list">
      <li id="item"></li>
    </ul>
  </div>
</body>
```

## 节点类型

每一个节点都有一个 `nodeType` 属性，用于表明节点的类型。节点类型由在 Node 类型中定义的下列 12 个数值常量来表示，任何节点类型必居其一。

### 常用节点类型

| 节点名称     | 字符常量                         | 数值常量 |
| :----------- | :------------------------------- | :------- |
| 元素节点     | Node.ELEMENT_NODE                | 1        |
| 文本节点     | Node.TEXT_NODE                   | 3        |
| 处理指令节点 | Node.PROCESSING_INSTRUCTION_NODE | 7        |
| 注释节点     | Node.COMMENT_NODE                | 8        |
| 文档节点     | Node.DOCUMENT_NODE               | 9        |
| 文档类型节点 | Node.DOCUMENT_TYPE_NODE          | 10       |
| 文档片段节点 | Node.DOCUMENT_FRAGMENT_NODE      | 11       |

### 废弃节点类型

| 节点名称         | 字符常量                    | 数值常量 |
| :--------------- | :-------------------------- | :------- |
| 属性节点         | Node. ATTRIBUTE_NODE        | 2        |
| CDATA 节点       | Node. CDATA_SECTION_NODE    | 4        |
| 实体引用名称节点 | Node. ENTITY_REFERENCE_NODE | 5        |
| 实体名称节点     | Node.ENTITY_NODE            | 6        |
| DTD 声明节点     | Node.NOTATION_NODE          | 12       |

### 节点类型判断

```js
const app = document.querySelector('.app');

if (app.nodeType == Node.ELEMENT_NODE) {
  // 在IE中无效
  console.log('Node is an element.');
}
```

如果两者相等，则意味着 app 确实是一个元素。然而，由于 IE 没有公开 Node 类型的构造函数，因此上面的代码在 IE 中会导致错误。为了确保跨浏览器兼容性，最好还是将 nodeType 属性与数值常量进行比较。

```js
const app = document.querySelector('.app');

if (app.nodeType == 1) {
  console.log('Node is an element.');
}
```

## 节点信息

### Node.baseURI

获取当前网页的绝对路径

```js
const app = document.getElmentById('app');

console.log(app.baseURI);
// ‘https://www.baidu.com/’
```

### Node.nodeName

获取当前节点的名称（就是标签名，返回的是大写英文）。

```js
const list = document.getElementById('list');
const item = list.firstElementChild;

console.log(list.nodeName);
// ‘UL’
console.log(item.nodeName);
// ‘LI’
```

### Node.nodeValue

> DOM Level 2 Core: Node.nodeValue

获取或设置当前节点的值

对于 **注释** 和 **文本** 节点来说，会返回文本内容，其他均返回 `null`。

```html
<div id="app">Hello world!</div>
<script type="text/javascript">
  const app = document.getElementById('app');

  console.log(app.nodeValue);
  // null
  console.log(app.firstChild.nodeValue);
  // 'Hello world!'
</script>
```

### Node.textContent

获取或设置当前节点及其所有后代节点的文本内容。

- 如果节点是 CDATA 片段、Comment 注释节点、ProcessingInstruction 节点或文本节点，则返回节点内部的文本节点（即 `nodeValue`）
- 如果是 Document、DocumentType 或者 Notation 类型节点，则 textContent 返回 `null`
- 如果要获取整个文档的文本以及 CDATA 数据，可以使用 `document.documentElement.textContent`
- 对于其他节点类型，`textContent` 将所有子节点的 `textContent` 合并后返回（除注释节点）。如果该子节点没有子节点，则返回空字符串

在节点上设置 `textContent` 属性的话，会删除它的所有子节点，并替换为一个具有给定值的文本节点。

```html
<div class="app">Hello world!</div>
<script>
  const app = document.getElementById('app');
  const text = app.textContent;
  console.log(text);
  // 'Hello world!'

  app.textContent = 12345;
  console.log(text);
  // 12345
</script>
```

## 节点关系

文档中所有节点之间都存在着这样或那样的关系。节点间的各种关系可以用传统的家族关系来描述，相当于把文档树比喻成家谱。

在 HTML 中，可以将 `<body>` 元素看成是 `<html>` 元素的子元素；相应地，也就可以将 `<html>` 元素看成是 `<body>` 元素的父元素。而 `<head>` 元素，则可以看成是 `<body>` 元素的同胞元素，因为它们都是同一个父元素 `<html>` 的直接子元素。

每个节点都有一个 `childNodes` 属性，其中保存着一个 NodeList 对象。NodeList 是一种类数组对象。NodeList 是一种类数组对象，用于保存一组有序的节点，可以通过位置来访问这些节点。请注意，虽然可以通过方括号语法来访问 NodeList 的值，而且这个对象也有 length 属性，但它并不是 Array 的实例。NodeList 对象的独特之处在于，它实际上是基于 DOM 结构动态执行查询的结果，因此 DOM 结构的变化能够自动反映在 NodeList 对象中。

下面以下面的 DOM 树为例阐述节点间的关系。

```html
<body>
  <div class="bar"></div>
  <div class="foo">
    <div class="foo-1">
      <div></div>
    </div>
    <div class="foo-2"></div>
    <div class="foo-3"></div>
  </div>
  <ul class="list">
    <li></li>
    <li></li>
    <li></li>
  </ul>
</body>
```

### Node.ownerDocument

获取当前节点所在的顶层文档对象。

如果在文档节点自身上使用此属性，则结果是 `null`。

```js
const foo = document.querySelector('.foo');

console.log(foo.ownerDocument);
// document
```

### Node.paretnNode

获取节点的父节点（Node）。

父节点只有 `Element`、`Document`、`DocumentFragment`。

```js
const foo = document.querySelector('.foo');

console.log(foo.parentElement);
// <body>...</body>
```

### Node.parentElement

获取节点的父元素节点（Element）。

```js
const foo = document.querySelector('.foo');

console.log(foo.parentElement);
// <body>...</body>
```

### Node.previousSibling

获取当前节点前面的第一个兄弟节点（Node）。

```js
const foo = document.querySelector('.foo');

console.log(foo.previousSibling);
// #text
```

### Node.previousElementSibiling

获取当前节点前面的第一个兄弟元素节点（Element）。

```js
const foo = document.querySelector('.foo');

console.log(foo.previousSibling);
// <div class="bar"></div>
```

### Node.nextSibiling

获取当前节点后面的第一个兄弟节点（Node）。

```js
const foo = document.querySelector('.foo');

console.log(foo.previousSibling);
// #text
```

### Node.nextElementSibiling

获取当前节点后面的第一个兄弟元素节点（Element）。

```js
const foo = document.querySelector('.foo');

console.log(foo.previousSibling);
// <ul class="list">...</ul>
```

### Node.firstChild

获取节点的第一个子节点（Node）。

```js
const foo = document.querySelector('.foo');

console.log(foo.firstChild);
// #text
```

### Node.firstElementChild

获取节点的第一个子元素节点（Element）。

```js
const foo = document.querySelector('.foo');

console.log(foo.firstElementChild);
// <div class="foo-1"></div>
```

### Node.lastChild

获取节点的最后一个子节点（Node）。

```js
const foo = document.querySelector('.foo');

console.log(foo.lastChild);
// #text
```

### Node.lastElementChild

获取节点的最后一个元素节点（Element）。

```js
const foo = document.querySelector('.foo');

console.log(foo.lastElementChild);
// <div class="foo-3"></div>
```

### Node.childNodes

获取节点的子节点列表（NodeList）。

```js
const foo = document.querySelector('.foo');

console.log(foo.childNodes);
// NodeList(7) [text, div.foo-1, text, div.foo-2, text, div.foo-3, text]
```

### Node.children

获取节点的子元素节点列表（HTMLCollection）。

```js
const foo = document.querySelector('.foo');

console.log(foo.children);
// HTMLCollection(3) [div.foo-1, div.foo-2, div.foo-3]
```

### Node.childElementCount

获取当前节点的所有子元素节点的数目。

```js
const foo = document.querySelector('.foo');

console.log(foo.childElementCount);
// 3
```
