---
nav:
  title: DOM
  order: 6
group:
  title: Document
  order: 5
title: Document
order: 1
---

# Document

Document 接口表示任何在浏览器中载入的网页，并作为网页内容的入口，也就是 DOM 树。DOM 树包含了像 `<body>`、`<table>` 这样的元素，以及大量其他元素。它向网页文档本身提供了全局操作功能，能解决如何获取页面的 URL ，如何在文档中创建一个新的元素这样的问题。

```
EventTarget <- Node <- Document
```

Document 接口描述了任何类型的文档的通用属性与方法。根据不同的文档类型（例如 HTML、XML、SVG 等等），还能使用更多 API：使用 `"text/html"` 作为内容类型（content type）的 HTML 文档，还实现了 HTMLDocument 接口，而 XML 和 SVG 文档则（额外）实现了 XMLDocument 接口。
