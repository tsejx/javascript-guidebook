---
nav:
  title: DOM
  order: 6
group:
  title: Element
  order: 6
title: 动态集合
order: 3
---

## 动态集合

动态集合是指 DOM 结构的变化能够自动反映到所保存的对象中的集合。

### NodeList

NodeList 实例对象是一个类数组对象，它的成员是节点对象，包括 `childNodes` 和 `querySelectorAll()` 方法返回值。

DOM 将 HTML 页面解析成一个由多层次节点构成的结构。节点是页面结构的基础，而所有节点继承自 Node 类型，因此所有节点共享着基本的属性和方法。Node 类型有一个 childNodes 属性，所以所有节点都拥有这个属性。而通过这个属性就可以得到一个保存着本节点的子节点组成的 NodeList 对象。

NodeList 可以通过方括号表达式来访问，也可以通过 `item()` 方法来访问。通过 length 属性，可以访问元素个数。虽然 JavaScript 中的数组可以修改 length 属性。但 NodeList 集合并不是数组，而且它是页面一片区域的 DOM 结构映射。所以请不要修改 NodeList 对象的 length 值。

```js
const firstChild = someNode.childNodes[0]; // 获取第一个元素
const secondChild = someNode.childNodes.item[1]; // 获取第二个元素
const count = someNode.childNodes.length; // 获取集合长度
```

#### 描述

##### 动态集合

大多数情况下，NodeList 对象是个动态集合，即如果文档中的节点树发生变化，则已经存在的 NodeList 对象也可能变化。

```html
<div id="parent">
  <div></div>
  <div></div>
</div>
```

```js
const parent = document.getElementById('parent');
const child_nodes = parent.childNodes;
console.log(child_nodes.length); // 2
parent.appendChild(document.createElement('div'));
console.log(child_nodes.length); // 3
```

在另一些情况下，NodeList 是一个静态集合，也就意味着随后对文档对象模型的任何改动都不会影响集合的内容。方法 `document.querySelectorAll()` 返回的是静态 NodeList。

特别当你选择如何遍历 NodeList 中所有项，或缓存列表长度的时候，最好牢记这种区分。

##### 转换数组

有时候用类似数组的方法来处理  NodeList  里的内容会更加方便。这里有一种技术为了将  NodeList  对象转换为数组：

```js
const divList = document.querySelectorAll('div'); // 返回 NodeList
const divArray = Array.prototype.slice.call(divList); // 将 NodeList 转换为数组

//ES6 - Array.from();
const divArrayFrom = Array.from(divList); // 将 NodeList 转换为数组
```

### HTMLCollection

HTMLCollection 对象与 NodeList 对象类似，也是节点的集合，返回一个类数组对象。但二者有不同之处在于 NodeList 集合主要是 Node 节点（包括元素节点、文本节点和注释节点等）的集合，而 HTMLCollection 集合主要是 Element 元素节点的集合。Node 节点共有 12 种，Element 元素节点只是其中一种。

HTMLCollection 是元素节点的集合可以通过 `getElementsByTagName()` 方法、`getElementsByClassName()` 方法、`getElementsByName()` 方法、document 的 anchors 属性（包括 name 特性的 `<a>` 元素）、forms 属性（包含文档所有 `<form>` 元素）、images 属性（包含文档所有 `<img>` 元素）、links 属性（文档所有带 href 特性的 `<a>` 元素）。

### NamedNodeMap

Element 类型这种 DOM 节点是唯一拥有 `attributes` 属性的一种节点类型。而 `attribute` 属性中就包含 NamedNodeMap 集合。它由元素的特性组成。所以只要是元素节点，调用 `attributes` 属性就可以得到 NamedNodeMap 集合。

## 注意事项

动态集合是个很实用的概念，但在使用循环时一定要千万小心。可能会因为忽略集合的动态性，造成死循环

```javascript
var divs = document.getElementsByTagName('div');
for (var i = 0; i < divs.length; i++) {
  document.body.appendChild(document.createElement('div'));
}
```

在上面代码中，由于 `divs` 是一个 HTMLElement 集合，`divs.length` 会随着 `appendChild()` 方法，而一直增加，于是变成一个死循环。

为了避免此情况，一般地，可以写为下面形式

```javascript
var divs = document.getElementsByTagName('div');
for (var i = 0, len = divs.length; i < len; i++) {
  document.body.appendChild(document.createElement('div'));
}
```

一般地，要尽量减少访问 NodeList、HTMLCollection、NamedNodeMap 的次数。因为每次访问它们，都会运行一次基于文档的查询。所以，可以考虑将它们的值缓存起来

---

参考资料：

- [JavaScript 学习笔记：动态集合](https://www.w3cplus.com/javascript/dom-dynamic-collection.html)
