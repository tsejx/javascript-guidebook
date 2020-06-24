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

## Element 属性

### 特性属性

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

### 尺寸属性

| 属性                 | 说明                                                           | 是否只读 |
| -------------------- | -------------------------------------------------------------- | -------- |
| Element.clientHeight | 获取元素节点可视部分的高度                                     | ✔        |
| Element.clientWidth  | 获取元素节点可视部分的宽度                                     | ✔        |
| Element.clientLeft   | 获取元素节点 offsetLeft 属性值和到当前窗口左边真实值之间的距离 | ✔        |
| Element.clientTop    | 获取元素节点 offsetTop 属性值和到当前窗口上边真实值之间的距离  | ✔        |
| Element.scrollHeight | 获取元素节点的总高度，包括由于溢出导致视图不可见内容           | ✔        |
| Element.scrollWidth  | 获取元素节点的总宽度，包括由于溢出导致视图不可见内容           | ✔        |
| Element.scrollLeft   | 获取或设置元素水平滚动条到元素左边的距离                       |          |
| Element.scrollTop    | 获取或设置元素垂直滚动条到元素顶部的距离                       |          |
| Element.offsetHeight | 获取元素的像素高度（包括元素垂直内边距和边框）                 | ✔        |
| Element.offsetWidth  | 获取元素的像素宽度（包括元素水平内边距和边框）                 | ✔        |
| Element.offsetLeft   | 获取元素左上角相对于父元素左边界偏移的像素值                   | ✔        |
| Element.offsetTop    | 获取元素左上角相对于父元素上边界偏移的像素值                   | ✔        |
| Element.style        | 获取元素节点的行内样式                                         |          |

### 节点相关属性

| 属性                           | 说明                                                                  |
| ------------------------------ | --------------------------------------------------------------------- |
| Element.children               | 获取元素节点的所有子元素节点                                          |
| Element.childElementCount      | 获取元素节点包含的子 HTML 元素节点的个数                              |
| Element.firstElementChild      | 获取元素节点的第一个 Element 子节点                                   |
| Element.lastElementChild       | 获取元素节点的最后一个 Element 子节点                                 |
| Element.nextElementSibling     | 获取元素元素节点的下一个兄弟 HTML 元素节点                            |
| Element.previousElementSibling | 获取元素元素节点的上一个兄弟 HTML 元素节点                            |
| Element.offsetParent           | 获取元素节点的最近的、并且 CSS 的 position 属性不等于 static 的父元素 |

## Element 方法

### 位置方法

| 方法                             | 说明                                               |
| -------------------------------- | -------------------------------------------------- |
| Element. getBoundingClientRect() | 获取元素的大小及其相对于视口的位置                 |
| Element.getClientRects()         | 获取一个指向客户端中每一个盒子的边界矩形的矩形集合 |

### 属性方法

| 方法                      | 说明                       |
| ------------------------- | -------------------------- |
| Element.getAttribute()    | 获取元素中指定属性         |
| Element.setAttribute()    | 设置元素中指定属性         |
| Element.hasAttribute()    | 判断元素中是否存在置顶属性 |
| Element.removeAttribute() | 移除元素中指定属性         |

### 事件方法

| 方法                          | 说明     |
| ----------------------------- | -------- |
| Element.addEventListener()    | 注册事件 |
| Element.removeEventListener() | 注销事件 |
| Element.dispatchEvent()       | 触发事件 |

| 事件对象                                         | 说明           |
| ------------------------------------------------ | -------------- |
| `var event = window.event || event;`             | Event 对象     |
| `var target = event.target || event.srcElement;` | 事件的目标节点 |

# Element

除了 Document 类型之外，Element 类型就要算是 Web 编程中最常用的类型了。Element 类型用于表现 XML 或 HTML 元素，提供了对元素标签名、子节点及特性的访问。

要访问元素的标签名，可以使用 `nodeName` 属性，也可以使用 `tagName` 属性，这两个属性会返回相同的值（使用后者主要是为了清晰起见）。

```html
<div id="app"></div>
```

可以像下面这样取得这个元素及其标签名

```js
const app = document.getElementById('app');

console.log(app.tagName);
// 'DIV'

console.log(app.tagName === app.noadeName);
// true
```

在 HTML，标签名始终都以全部大写表示；而在 XML 中，标签名则始终会与源代码中的保持一致，假如你不确定自己的脚本将会在 HTML 还是 XML 文档中执行，最好是在比较之前将标签名转换为相同的大小写形式。

```js
const app = document.getElementById('app');

if (app.tagName === 'DIV') {
  // do something
}

if (app.tagName.toLowerCase() == 'div') {
  // 这样最好（适用于任何文档）
  // do something
}
```

## HTML 元素

所有 HTML 元素都由 HTMLElement 类型表示，不是直接通过这个类型，也是通过它的子类型来表示。HTMLElement 类型直接继承自 Element 并添加了一些属性。添加的这些属性分别对应于每个 HTML 元素中都存在的下列标准特性。

|   属性    |                                                     说明                                                      |
| :-------: | :-----------------------------------------------------------------------------------------------------------: |
|    id     |                                           元素在文档中的唯一标识符                                            |
|   title   |                              有关元素的附加说明信息，一般通过工具提示条显示出来                               |
|   lang    |                                         元素内容的语言代码，很少使用                                          |
|    dir    |                      语言的方向，值为 `ltr`（从左至右）或 `rtl`（从右至左），也很少使用                       |
| className | 与元素的 class 特性对应，即为元素指定的 CSS 类。没有将这个属性命名为 class，是因为 class 是 ECMAScript 保留字 |

## 操作特性

操作特性的 DOM 方法主要有三个：

- `getAttribute()`：获取元素或其内容的附加信息
  - `'style'`：通过该方法获取的是 CSS 文本，通过属性获取的是对象
  - `'onclick'`：该方法获取的是相应代码的字符串，通过属性获取的是一个 JavaScript 函数
- `setAttribute()`：设置特性名及其值，如果特性已经存在，会修改特性值，如果不存在则会创建新的特性
- `removeAttribute()`：彻底删除元素的特性，IE6 及之前的版本不支持此方法

```html
<body>
  <div id="app" style="color: red"></div>
</body>
```

```js
const app = document.getElementById('app')
console.log(app.getAttribute('style'))
// 'color: red'

app.setAttribute('style', 'color: blue')
console.log(app.getAttribute('style'))
// 'color: blue'

app.removeAttribute('style')
console.log(app.getAttribute('style'))
// null
```

## 创建元素

使用 `document.createElement()` 方法可以创建元素。这个方法只接受一个参数，即要创建元素的标签名。这个标签名在 HTML 文档中不区分大小写，而在 XML（包括 HTML）文档中，则是区分大小写的。

```js
var div = document.createElement('div');
```
