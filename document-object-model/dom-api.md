## DOM API

### Node

Node 是一个接口，许多 DOM 类型从这个接口继承，并允许类似地处理（或测试）这些各种类型。

以下接口都从 Node 继承其方法和属性：

- Document
- Element
- CharacterData（Text、Comment、CDATASection）
- DocumentFragment
- DocumentType

#### 节点属性

| 属性                         | 说明                                         | 是否只读 |
| ---------------------------- | -------------------------------------------- | -------- |
| Node.nodeName                | 获取当前节点的名称                           | ✔        |
| Node.nodeType                | 获取当前节点类型的常数值                     | ✔        |
| Node.nodeValue               | 获取或设置当前节点的值                       |          |
| Node.textContent             | 获取或设置当前节点及其所有后代节点的文本内容 |          |
| Node.baseURI                 | 获取当前网页的绝对路径                       | ✔        |
| Node.ownerDocument           | 获取当前节点所在的顶层文档对象               | ✔        |
| Node.nextSibling             | 获取当前节点后面的第一个兄弟节点             | ✔        |
| Node.previousSibling         | 获取当前节点前面的第一个兄弟节点             | ✔        |
| Node.parentNode              | 获取当前节点的父节点                         | ✔        |
| Node.parentElement           | 获取当前节点的父元素节点                     | ✔        |
| Node.childNodes              | 获取当前节点的所有子节点                     | ✔        |
| Node.firstChild              | 获取当前节点的第一个子节点                   | ✔        |
| Node.lastChild               | 获取当前节点的最后一个子节点                 | ✔        |
| ParentNode.children          | 获取当前节点的包含所有子元素节点的列表       | ✔        |
| ParentNode.firstElementChild | 获取当前节点的第一个子元素节点               | ✔        |
| ParentNode.lastElementChild  | 获取当前节点的最后一个子元素节点             | ✔        |
| ParentNode.childElementCount | 获取当前节点的所有子元素节点的数目           | ✔        |

#### 节点操作

| 方法                                 | 说明                                                 |
| ------------------------------------ | ---------------------------------------------------- |
| Node.appendChild(node)               | 添加节点到当前节点的子节点列表中的末尾               |
| Node.hasChildNodes()                 | 判断当前节点是否含有子节点                           |
| Node.cloneNode(true)                 | 克隆节点到当前节点的子节点列表（及其属性和后代节点） |
| Node.insertBefore(newNode,oldNode)   | 插入节点到当前节点的某个指定子节点前面               |
| Node.removeChild(node)               | 删除当前节点的某个指定子节点                         |
| Node.replaceChild(newChild,oldChild) | 替换当前节点的某个指定子节点为指定的节点             |
| Node.compareDocumentPosition(node)   | 比较当前节点与任意文档中的另一节点的位置关系         |
| Node.isEqualNode(node)               | 判断两个节点是否相等                                 |
| Node.normalize()                     | 规范化当前节点及其后代节点                           |
| ChildNode.remove()                   | 从文档中移除当前节点                                 |
| ChildNode.before()                   | 插入节点到当前节点前面                               |
| ChildNode.after()                    | 插入节点到当前节点后面                               |
| ChildNode.replaceWith()              | 替换当前节点为另一节点                               |

### Document

#### Document节点的属性

| 属性                     | 说明                                        |
| ------------------------ | ------------------------------------------- |
| document.doctype         | 获取当前文档的文档定义类型                  |
| document.documentElement | 获取当前文档的根节点                        |
| document.defaultView     | 获取 document 对象所在的 window 对象        |
| document.body            | 获取当前文档的 `<body>` 节点                |
| document.head            | 获取当前文档的 `<head>` 节点                |
| document.activeElement   | 获取当前文档中获得焦点的那个元素            |
| document.links           | 获取当前文档的所有 `<a>` 元素               |
| document.forms           | 获取当前文档的所有表单元素                  |
| document.images          | 获取当前文档的所有图片元素                  |
| document.embeds          | 获取当前文档中所有嵌入对象                  |
| document.scripts         | 获取当前文档的所有脚本                      |
| document.styleSheets     | 获取当前文档的所有样式表                    |
| document.documentURI     | 获取当前文档的网址                          |
| document.URL             | 获取当前文档的网址                          |
| document.domain          | 获取当前文档的域名                          |
| document.lastModified    | 获取当前文档最后修改的时间戳                |
| document.location        | 获取 location 对象，提供当前文档的 URL 信息 |
| document.referrer        | 获取当前文档的访问来源                      |
| document.title           | 获取当前文档的标题                          |
| document.characterSet    | 获取渲染当前文档的字符集                    |
| document.readyState      | 获取当前文档的状态                          |
| document.designMode      | 控制当前文档是否可编辑，可对写              |
| document.compatMode      | 获取浏览器处理文档的模式                    |
| document.cookie          | 获取 Cookie                                 |

#### Document节点的方法

##### 读写方法

| 方法               | 说明                               |
| ------------------ | ---------------------------------- |
| document.open()    | 打开一个要写入的文档               |
| document.close()   | 关闭一个要写入的文档               |
| document.write()   | 向当前文档写入内容                 |
| document.writeIn() | 向当前文档写入内容，尾部添加换行符 |

##### 查找节点

| 方法                                       | 说明                                         |
| ------------------------------------------ | -------------------------------------------- |
| document.querySelector(selectors)          | 获取文档中与CSS选择器匹配的第一个元素节点    |
| document.querySelectorAll(selectors)       | 获取文档中与CSS选择器匹配的所有元素节点      |
| document.getElementsByTagName(tagName)     | 获取文档中与指定标签名匹配的所有元素节点     |
| document.getElementsByClassName(className) | 获取文档中与指定类名匹配的所有元素节点       |
| document.getElementsByName(name)           | 获取文档中与指定 name 属性匹配的所有元素节点 |
| document.getElementById(id)                | 获取文档中与指定 id 属性的元素节点           |
| document.elementFromPoint(x,y)             | 获取文档中位于页面指定位置最上层的子元素节点 |

##### 生成节点

| 方法                              | 说明                       |
| --------------------------------- | -------------------------- |
| document.createElement(tagName)   | 创建元素节点               |
| document.createTextNode(text)     | 创建文本节点               |
| document.createAttribute(name)    | 创建属性节点               |
| document.createDocumentFragment() | 创建 DocumentFragment 对象 |

##### 事件方法

| 方法                                                | 说明                                                         |
| --------------------------------------------------- | ------------------------------------------------------------ |
| document.addEventListener(type,listener,capture)    | 注册事件                                                     |
| document.removeEventListener(type,listener,capture) | 注销事件                                                     |
| document.dispatchEvent(event)                       | 触发事件                                                     |

##### 其他

| 方法                                    | 说明                                                         |
| --------------------------------------- | ------------------------------------------------------------ |
| document.hasFocus()                     | 表示当前文档之中是否有元素被激活或获得焦点                   |
| document.adoptNode(externalNode)        | 将某个节点，从其原来所在的文档移除，插入当前文档，并返回插入后的新节点 |
| document.importNode(externalNode, deep) | 从外部文档拷贝指定节点，插入当前文档                         |

### Element

#### Element节点的属性

##### 特性属性

| 属性               | 说明                                     |
| ------------------ | ---------------------------------------- |
| Element.attributes | 获取元素节点的所有属性节点               |
| Element.id         | 获取元素的 id 属性                       |
| Element.tagName    | 获取元素的大写标签名                     |
| Element.innerHTML  | 获取或设置元素 HTML 语法表示的元素后代   |
| Element.outerHTML  | 获取元素及其后代的序列化 HTML 片段       |
| Element.className  | 获取元素的 class 属性                    |
| Element.classList  | 获取元素节点的所有 class 属性集合        |
| Element.dataset    | 获取元素节点中所有的 `data-*` 自定义属性 |

##### 尺寸属性

| 属性                 | 说明                                                         | 是否只读 |
| -------------------- | ------------------------------------------------------------ | -------- |
| Element.clientHeight | 获取元素节点可视部分的高度                                   | ✔        |
| Element.clientWidth  | 获取元素节点可视部分的宽度                                   | ✔        |
| Element.clientLeft   | 获取元素节点 offsetLeft 属性值和到当前窗口左边真实值之间的距离 | ✔        |
| Element.clientTop    | 获取元素节点 offsetTop 属性值和到当前窗口上边真实值之间的距离 | ✔        |
| Element.scrollHeight | 获取元素节点的总高度，包括由于溢出导致视图不可见内容         | ✔        |
| Element.scrollWidth  | 获取元素节点的总宽度，包括由于溢出导致视图不可见内容         | ✔        |
| Element.scrollLeft   | 获取或设置元素水平滚动条到元素左边的距离                     |          |
| Element.scrollTop    | 获取或设置元素垂直滚动条到元素顶部的距离                     |          |
| Element.offsetHeight | 获取元素的像素高度（包括元素垂直内边距和边框）               | ✔        |
| Element.offsetWidth  | 获取元素的像素宽度（包括元素水平内边距和边框）               | ✔        |
| Element.offsetLeft   | 获取元素左上角相对于父元素左边界偏移的像素值                 | ✔        |
| Element.offsetTop    | 获取元素左上角相对于父元素上边界偏移的像素值                 | ✔        |
| Element.style        | 获取元素节点的行内样式                                       |          |

##### 节点相关属性

| 属性                           | 说明                                                         |
| ------------------------------ | ------------------------------------------------------------ |
| Element.children               | 获取元素节点的所有子元素节点                                 |
| Element.childElementCount      | 获取元素节点包含的子 HTML 元素节点的个数                     |
| Element.firstElementChild      | 获取元素节点的第一个 Element 子节点                          |
| Element.lastElementChild       | 获取元素节点的最后一个 Element 子节点                        |
| Element.nextElementSibling     | 获取元素元素节点的下一个兄弟 HTML 元素节点                   |
| Element.previousElementSibling | 获取元素元素节点的上一个兄弟 HTML 元素节点                   |
| Element.offsetParent           | 获取元素节点的最近的、并且 CSS 的 position 属性不等于 static 的父元素 |

#### Element节点的方法

##### 位置方法

| 方法                             | 说明                                               |
| -------------------------------- | -------------------------------------------------- |
| Element. getBoundingClientRect() | 获取元素的大小及其相对于视口的位置                 |
| Element.getClientRects()         | 获取一个指向客户端中每一个盒子的边界矩形的矩形集合 |

##### 属性方法

| 方法                      | 说明                       |
| ------------------------- | -------------------------- |
| Element.getAttribute()    | 获取元素中指定属性         |
| Element.setAttribute()    | 设置元素中指定属性         |
| Element.hasAttribute()    | 判断元素中是否存在置顶属性 |
| Element.removeAttribute() | 移除元素中指定属性         |

##### 事件方法

| 方法                          | 说明     |
| ----------------------------- | -------- |
| Element.addEventListener()    | 注册事件 |
| Element.removeEventListener() | 注销事件 |
| Element.dispatchEvent()       | 触发事件 |

| 事件对象                                         | 说明           |
| ------------------------------------------------ | -------------- |
| `var event = window.event || event;`             | Event 对象     |
| `var target = event.target || event.srcElement;` | 事件的目标节点 |
