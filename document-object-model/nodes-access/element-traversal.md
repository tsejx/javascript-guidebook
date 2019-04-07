## 元素遍历

对于元素间的空格，IE9 及之前版本不会返回文本节点，而其他所有浏览器都会返回文本节点。这样，就导致了在使用 childNodes 和 firstChild 等属性时的行为不一致。为了弥补这一差异，而同时又保持 DOM 规范不变，[Element Traversal 规范](https://www.w3.org/TR/ElementTraversal/) 新定义了一组属性。

Element Traversal API 为 DOM 元素添加了以下5个属性：

- ParentNode.childElementCount：返回子元素（不包括文本节点和注释）的个数
- ParentNode.firstElementChild：指向第一个子元素
- ParentNode.lastElementChild：指向最后一个子元素
- Node.previousElementSibling：指向上一个同胞元素（Node 不能为 Document）
- Node.lastElementSibling：指向下一个同胞元素（Node 不能为 Document）

支持 Element Traversal 规范的浏览器有 IE9+、Firefox3.5+、Safari4+、Chrome 和 Opera10+。