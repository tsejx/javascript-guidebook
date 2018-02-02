## Document 类型

JavaScript 通过 Document 类型表示文档。在浏览器中,document 对象是 HTMLDocument(继承自Document类型)的一个实例,表示整个HTML页面。而且,document 对象是 window 对象的一个属性,因此可以将其作为全局对象来访问。Document节点具有下列特征：

- nodeType 的值为9
- nodeName 的值为 '#document'
- nodeValue 的值为 `null`
- parentNode 的值为 `null`
- ownerDocument 的值为 `null`
- 其字节点可能是一个DocumentType(最多一个)、Element(最多一个)、ProcessingInstruction或Comment

### 文档的子节点

```html
<html>
    <body>

    </body>
</html>
```

**document.documentElement**

这个页面经过解析后，其文档中只包含一个字节点，即 `<html>` 元素。可以通过 `documentElement` 或 `childNodes` 列表来访问这个元素。

```javascript
var html = document.documentElement; // 取得对<html>的引用
alert(html === document.childNodes[0]); // true
alert(html === document.firstChild); // true
```

**document.body**

```javascript
var body = document.body; // 取得<body>的引用
```

作为 `HTMLDocument` 的实例，document 对象还有一个body属性，直接指向 `<body>` 元素。

**document.doctype**

```javascript
var doctype = document.doctype; // 取得<!DOCTYPE>的引用
```

可以将 `<!DOCTYPE>` 标签看成一个与文档其他部分不同的实体，可以通过 `doctype` 属性(在浏览器中是document.doctype) 来访问它