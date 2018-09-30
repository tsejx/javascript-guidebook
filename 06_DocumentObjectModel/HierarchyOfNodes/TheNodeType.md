## Node 类型

DOM1级定义了 Node 接口，该接口由 DOM 中的所有节点类型实现。这个接口在 JavaScript 中是作为 Node 类型实现的。因此 JavaScript 中所有的节点类型都继承 Node 类型，所有的类型都共享着相同的基本属性和方法。

### 节点类型

每一个节点都有一个 nodeType 属性，用于表明节点的类型。节点类型由在 Node 类型中定义的下列12个数值常量来表示，任何节点类型必居其一。

#### 常用节点

|   节点名称   |             字符常量             | 数值常量 |
| :----------: | :------------------------------: | :------: |
|   元素节点   |        Node.ELEMENT_NODE         |    1     |
|   文本节点   |          Node.TEXT_NODE          |    3     |
| 处理指令节点 | Node.PROCESSING_INSTRUCTION_NODE |    7     |
|   注释节点   |        Node.COMMENT_NODE         |    8     |
|   文档节点   |        Node.DOCUMENT_NODE        |    9     |
| 文档类型节点 |     Node.DOCUMENT_TYPE_NODE      |    10    |
| 文档片段节点 |   Node.DOCUMENT_FRAGMENT_NODE    |    11    |

#### 废弃节点

|     节点名称     |          字符常量           | 数值常量 |
| :--------------: | :-------------------------: | :------: |
|     属性节点     |    Node. ATTRIBUTE_NODE     |    2     |
|    CDATA节点     |  Node. CDATA_SECTION_NODE   |    4     |
| 实体引用名称节点 | Node. ENTITY_REFERENCE_NODE |    5     |
|   实体名称节点   |      Node.ENTITY_NODE       |    6     |
|   DTD声明节点    |     Node.NOTATION_NODE      |    12    |

#### 节点类型判断

```js
if (someNode.nodeType == Node.ELEMENT_NODE){	// 在IE中无效
    alert('Node is an element.')
}
```

如果两者相等，则意味着 someNode 确实是一个元素。然而，由于 IE 没有公开 Node 类型的构造函数，因此上面的代码在 IE 中会导致错误。为了确保跨浏览器兼容性，最好还是将 nodeType 属性与数值常量进行比较。

```js
if (someNode.nodeType == 1){
	alert('Node is an element.')
}
```

### 节点关系

文档中所有节点相互之间都有关系，包括父子关系、同胞关系等。

- parentNode：节点的父节点
- nextSibling：节点的下一个同胞节点
- previousSibling：节点的上一个同胞节点
- firstChild：节点的第一个子节点
- lastChild：节点的最后一个子节点

详情可查看 [节点关系](../NodesAccess/NodesRelationships.md)

### 节点操作

- `appendChild()` 方法：添加新节点到子节点列表的末尾
- `insertBefore()` 方法：插入节点到指定节点前面
- `replaceChild()` 方法：替换节点
- `removeChild()` 方法：移除节点
- `cloneNode()` 方法：克隆节点
- `hasChildNodes()` 方法：判定一个节点是否有子节点

详情可查看 [节点操作](../ManipulatingNodes/README.md)