## 节点关系

文档中所有节点之间都存在着这样或那样的关系。节点间的各种关系可以用传统的家族关系来描述，相当于把文档树比喻成家谱。在 HTML 中，可以将 `<body>` 元素看成是 `<html>` 元素的子元素；相应地，也就可以将 `<html>` 元素看成是 `<body>` 元素的父元素。而 `<head>` 元素，则可以看成是 `<body>` 元素的同胞元素，因为它们都是同一个父元素 `<html>` 的直接子元素。

每个节点都有一个 childNodes 属性，其中保存着一个 NodeList 对象。NodeList 是一种类数组对象。NodeList 是一种类数组对象，用于保存一组有序的节点，可以通过位置来访问这些节点。请注意，虽然可以通过方括号语法来访问 NodeList 的值，而且这个对象也有 length 属性，但它并不是 Array 的实例。NodeList 对象的独特之处在于，它实际上是基于 DOM 结构动态执行查询的结果，因此 DOM 结构的变化能够自动反映在 NodeList 对象中。

- Node.parentNode：获取节点的父节点（父节点只有 `Element`、`Document`、`DocumentFragment`）
- Node.parentElement：获取节点的父元素节点
- Node.childNodes：获取节点的子节点列表（NodeList）
- Node.children：获取节点的子元素节点列表（HTMLCollection）
- Node.firstChild：获取节点的第一个子节点
- Node.lastChild：获取节点的最后一个子节点
- Node.nextSibling：获取节点的下一个兄弟节点
- Node.previousSibling：获取节点的上一个兄弟节点