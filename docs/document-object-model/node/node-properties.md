---
nav:
  title: DOM
  order: 6
group:
  title: Node
  order: 4
title: 节点属性
order: 2
---

# 节点属性

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

## API

### Node.nodeName

获取当前节点的名称

```js
const list = document.getElementById('list');
const item = list.firstElementChild;

console.log(list.nodeName);
// "UL"
console.log(item.nodeName);
// "LI"
```

### Node.nodeType

获取当前节点类型的常数值

[节点类型对应的常数值](node.md)

```js
const app = document.getElementById('app');

const text = app.firstChild;
console.log(text);
// #text

const ele = app.firstElementChild;
console.log(ele);
// <ul id="list">...</ul>

console.log(app.nodeType);
// 1
console.log(text.nodeType);
// 3
console.log(document.nodeType);
// 9
```

### Node.nodeValue

> DOM Level 2 Core: Node.nodeValue

获取或设置当前节点的值

对于**注释**和**文本**节点来说，会返回文本内容，其他均返回 `null`。

```js
const app = document.getElementById('app');

console.log(app.firstChild.nodeValue);
// 'Hello World！'
```

### Node.textContent

获取或设置当前节点及其所有后代节点的文本内容

如果 node 为 Document、DocumentType 或者 Notation 类型节点，则 textContent 返回 `null`。

如果要获取整个文档的文本以及 CDATA 数据，可以使用 `document.documentElement.textContent`。

如果节点是 CDATA 片段、Comment 注释节点、ProcessingInstruction 节点或文本节点，则返回节点内部的文本节点（即 `nodeValue`）。

对于其他节点类型，`textContent` 将所有子节点的 `textContent` 合并后返回（除注释节点）。如果该子节点没有子节点，则返回空字符串。

在节点上设置 `textContent` 属性的话，会删除它的所有子节点，并替换为一个具有给定值的文本节点。

```html
<div class="app">Hello world!</div>

<script>
  const text = document.getElementById('app').textContent;

  console.log(text);
  // 'Hello world!'

  document.getElementById('app').textContent = 123;

  console.log(text);
  // 123
</script>
```

### Node.baseURI

获取当前网页的绝对路径

```js
const app = document.getElmentById('app');

console.log(app.baseURI)``; // "https://www.baidu.com/"
```

## 最佳实践

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
