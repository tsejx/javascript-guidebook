# Node

DOM1 级定义了 Node 接口，该接口由 DOM 中的所有节点类型实现。这个接口在 JavaScript 中是作为 Node 类型实现的。因此 JavaScript 中所有的节点类型都继承 Node 类型，所有的类型都共享着相同的基本属性和方法。

以下接口都从 Node 继承其方法和属性：

- Document
- Element
- CharacterData（Text、Comment、CDATASection）
- DocumentFragment
- DocumentType

## 节点类型

每一个节点都有一个 nodeType 属性，用于表明节点的类型。节点类型由在 Node 类型中定义的下列 12 个数值常量来表示，任何节点类型必居其一。

### 常用节点

|   节点名称   |             字符常量             | 数值常量 |
| :----------: | :------------------------------: | :------: |
|   元素节点   |        Node.ELEMENT_NODE         |    1     |
|   文本节点   |          Node.TEXT_NODE          |    3     |
| 处理指令节点 | Node.PROCESSING_INSTRUCTION_NODE |    7     |
|   注释节点   |        Node.COMMENT_NODE         |    8     |
|   文档节点   |        Node.DOCUMENT_NODE        |    9     |
| 文档类型节点 |     Node.DOCUMENT_TYPE_NODE      |    10    |
| 文档片段节点 |   Node.DOCUMENT_FRAGMENT_NODE    |    11    |

### 废弃节点

|     节点名称     |          字符常量           | 数值常量 |
| :--------------: | :-------------------------: | :------: |
|     属性节点     |    Node. ATTRIBUTE_NODE     |    2     |
|    CDATA 节点    |  Node. CDATA_SECTION_NODE   |    4     |
| 实体引用名称节点 | Node. ENTITY_REFERENCE_NODE |    5     |
|   实体名称节点   |      Node.ENTITY_NODE       |    6     |
|   DTD 声明节点   |     Node.NOTATION_NODE      |    12    |
