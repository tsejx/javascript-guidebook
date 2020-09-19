---
nav:
  title: DOM
  order: 6
group:
  title: Element
  order: 6
title: Element
order: 1
---

# Element

Element 是一个通用性非常强的基类，所有 [Document](../document/document) 对象下的对象都继承自它。这个接口描述了所有相同种类的元素所普遍具有的方法和属性。

一些接口继承自 Element 并且增加了一些额外功能的接口描述了具体的行为。例如，HTMLElement 接口是所有 HTML 元素的基本接口，而 SVGElement 接口是所有 SVG 元素的基础。大多数功能是在这个类的更深层级（hierarchy）的接口中被进一步制定的。

在 Web 平台的领域以外的语言，比如 XUL，通过 XULElement 接口，同样也实现了 Element 接口。

```plain
EventTarget <- Node <- Element
```
