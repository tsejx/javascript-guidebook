---
nav:
  title: DOM
  order: 6
group:
  title: Document
  order: 5
title: DocumentFragment
order: 5
---

# DocumentFragment

DocumentFragment（文档片段接口）一个没有父对象的最小文档对象。

我们经常使用 JavaScript 进行 DOM 操作，比如像页面中插入元素，每次插入元素的时候，浏览器都会发生重绘，都需要重新渲染页面，如果做大量这样的操作，非常影响性能，影响用户体验。

我们知道每一次插入都会引起重新渲染（计算元素的尺寸，显示内容等），会重新重绘页面，因此会影响性能的，我们最常见还有一种方法是将创建的元素写到一个字符串上，然后一次性写到 `innerHTML` 上，这种使用浏览器对 `innerHTML` 的解析比上面多次插入快很多，但是构造字符串灵活性比较差，很难符合创建各种各样的 DOM 元素。

但是使用 DocumentFragment，可以弥补上面两种方法的不足。DocumentFragment 是没有父节点的最小文档对象，常用于存储 HTML 和 XML 文档，它继承了 Node，因此它有 Node 的所有属性和方法，完全可以操作 Node 那样操作 DocumentFragment。

DocumentFragment 文档片段是存在于内存中的，没有在 DOM 中，所以将子元素插入到文档片段中不会引起页面回流，因此使用 DocumentFragment 可以起到 **性能优化** 作用。

```js
// 创建文档片段
const frag = Document.createDocumentFragment()

// DocumentFragment 实际上像一个伪 DOM 节点
for (let i = 0; i < 10; i++) {
  const li = document.createElement('li');
  li.innerHTML = 'List item' + i;
  frag.appendChild(li);
}

// 往 DocumentFragment 中添加元素与操作普通 DOM 节点一样
// 一旦页面 DOM 加载完成，就可以访问了
listNode.appendChild(frag);

```

---

**参考资料：**

- [📖 DOM Living Standard: Interface DocumentFragment](https://dom.spec.whatwg.org/#interface-documentfragment)
- [📖 MDN：DocumentFragment](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment)
