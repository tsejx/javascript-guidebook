---
nav:
  title: DOM
  order: 6
group:
  title: 动态集合
  order: 7
title: NodeList
order: 1
---

# NodeList

NodeList 实例对象是一个类数组对象，它的成员是节点对象，包括 `childNodes` 和 `querySelectorAll()` 方法返回值。

DOM 将 HTML 页面解析成一个由多层次节点构成的结构。节点是页面结构的基础，而所有节点继承自 Node 类型，因此所有节点共享着基本的属性和方法。Node 类型有一个 `childNodes` 属性，所以所有节点都拥有这个属性。而通过这个属性就可以得到一个保存着本节点的子节点组成的 NodeList 对象。

NodeList 可以通过方括号表达式来访问，也可以通过 `item()` 方法来访问。

通过 `length` 属性，可以访问元素个数。虽然 JavaScript 中的数组可以修改 `length` 属性。但 NodeList 集合并不是数组，而且它是页面一片区域的 DOM 结构映射。所以请不要修改 NodeList 对象的 `length` 值。

```js
// 获取第一个元素
const firstChild = someNode.childNodes[0];

// 获取第二个元素
const secondChild = someNode.childNodes.item[1];

// 获取集合长度
const count = someNode.childNodes.length;
```

> NodeList 不是一个数组，是一个类似数组的对象（Like Array Object）。虽然 NodeList 不是一个数组，但是可以使用 `forEach()` 来迭代。你还可以使用 `Array.from()` 将其转换为数组。
>
> 不过，有些浏览器较为过时，没有实现 `NodeList.forEach()` 和 `Array.from()`。你可以用 `Array.prototype.forEach()` 来规避这一问题。

在一些情况下，NodeList 是一个实时集合，也就是说，如果文档中的节点树发生变化，NodeList 也会随之变化。例如，Node.childNodes 是实时的：

```js
const parent = document.getElementById('parent');
const childNodes = parent.childNodes;

console.log(childNodes.length);
// 假设为 2

parent.appendChild(document.createElement('div'));

console.log(childNodes.length);
// 3
```

在其他情况下，NodeList 是一个静态集合，也就意味着随后对文档对象模型的任何改动都不会影响集合的内容。比如 `document.querySelectorAll` 就会返回一个静态 NodeList。

最好牢记这种不同，尤其是在当你选择 NodeList 中所有项遍历的方式，或缓存它的长度的时候。

---

**参考资料：**

- [MDN：NodeList](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList)
