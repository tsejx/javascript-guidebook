---
nav:
  title: DOM
  order: 6
group:
  title: Node
  order: 4
title: Node
order: 1
---

# Node

DOM1 级定义了 Node 接口，该接口由 DOM 中的所有节点类型实现。这个接口在 JavaScript 中是作为 Node 类型实现的。因此 JavaScript 中所有的节点类型都继承 Node 类型，所有的类型都共享着相同的基本属性和方法。

```plain
EventTarget <- Node
```

以下接口（DOM 对象）都从 Node 继承其方法和属性：

- Document
- Element
- CharacterData（Text、Comment、CDATASection）
- ProcessingInstruction
- DocumentFragment
- DocumentType
- Notation
- Entity
- EntityReference
