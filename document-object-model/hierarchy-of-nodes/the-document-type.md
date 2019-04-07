## Document 类型

Document 对象是 HTMLDocument（继承自 Document 类型）的一个实例，表示整个 HTML 页面或其他基于 XML 的文档。并且 `document` 是 `window` 对象的一个属性，可以将其当做全局对象来访问。

### 文档的子节点

Document 的子节点可以是 DocumentType、Element、ProcessingInstruction 或 Comment，有两个访问节点的快捷方式：

- `documentElement`：该属性一直指向页面中的 HTML 元素
- `childNodes`：直接访问文档元素
- `document.body`：直接指向 `<body>` 元素
- `document.doctype`：取得标签 `<!DOCTYPE>` 的信息

文档类型是只读的，而且它只有一个元素节点，通常早已存在。

### 文档信息

Document 对象有一些标准的 Document 对象所没有的属性，提供了 document 对象所表现的网页的一些信息。

| 属性                       | 说明                           |
| -------------------------- | ------------------------------ |
| document.title             | 获取文档标题                   |
| document.URL               | 获取文档所在URL                |
| document.domain            | 获取文档域名                   |
| document.referrer          | 获取来源页面的URL              |
| document.bgColor           | 设置页面背景色                 |
| document.fgColor           | 设置前景色（文本颜色）         |
| document.linkColor         | 未点击过的链接颜色             |
| document.alinkColor        | 激活（焦点在链接上）链接的颜色 |
| document.vlinkColor        | 已访问过的链接颜色             |
| document. fileCreatedDate  | 文档建立日期，只读属性         |
| document. fileModifiedDate | 文档最后修改日期，只读属性     |
| document.fileSize          | 文档大小，只读属性             |
| document.cookie            | 设置和读出cookie               |
| document.charset           | 设置字符集                     |

### 查找元素

Document 类型提供六种常用访问元素的方法：

- getElementById()
- getElementByName()
- getElementByTagName()
- getElementByClassName()
- querySelector()
- querySelectorAll()

🔍详情可查看 [节点访问](../nodes-access/nodes-access.md)

### 文档写入

对文档的写入操作主要通过 `document.write()` 方法。该方法主要用在两方面：

- 页面载入过程中用实时脚本创建页面内容
- 用延时脚本创建本窗口或新窗口的内容

> 只有当页面被加载的时候 document.write() 函数才会被执行



