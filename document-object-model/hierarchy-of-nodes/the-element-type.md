## Element 类型

除了 Document 类型之外，Element 类型就要算是 Web编程中最常用的类型了。Element 类型用于表现XML或HTML元素，提供了对元素标签名、子节点及特性的访问。

要访问元素的标签名，可以使用 `nodeName` 属性，也可以使用 `tagName` 属性，这两个属性会返回相同的值（使用后者主要是为了清晰起见）。

```html
<div id='myDiv'></div>
```

可以像下面这样取得这个元素及其标签名

```javascript
var div = document.getElementById('myDiv');

alert(div.tagName); // 'DIV'

alert(div.tagName === div.noadeName); // true
```

在 HTML，标签名始终都以全部大写表示；而在XML中，标签名则始终会与源代码中的保持一致，假如你不确定自己的脚本将会在 HTML 还是 XML 文档中执行，最好是在比较之前将标签名转换为相同的大小写形式。

```javascript
if (element.tagName === 'div') {
    // do something
}

if (element.tagName.toLowerCase() == 'div') { // 这样最好（适用于任何文档）
    // do something
}
```

### HTML 元素

所有HTML元素都由 HTMLElement 类型表示，不是直接通过这个类型，也是通过它的子类型来表示。HTMLElement 类型直接继承自 Element 并添加了一些属性。添加的这些属性分别对应于每个 HTML 元素中都存在的下列标准特性。

| 属性      | 说明                                                         |
| --------- | ------------------------------------------------------------ |
| id        | 元素在文档中的唯一标识符                                     |
| title     | 有关元素的附加说明信息，一般通过工具提示条显示出来           |
| lang      | 元素内容的语言代码，很少使用                                 |
| dir       | 语言的方向，值为 `ltr`（从左至右）或 `rtl`（从右至左），也很少使用 |
| className | 与元素的 class 特性对应，即为元素指定的 CSS 类。没有将这个属性命名为 class，是因为 class 是 ECMAScript 保留字 |

### 操作特性

操作特性的 DOM 方法主要有三个：

- `getAttribute()`：获取元素或其内容的附加信息
  - style：通过该方法获取的是 CSS 文本，通过属性获取的是对象
  - onclick：该方法获取的是相应代码的字符串，通过属性获取的是一个 JavaScript 函数
- `setAttribute()`：设置特性名及其值，如果特性已经存在，会修改特性值，如果不存在则会创建新的特性
- `removeAttribute()`：彻底删除元素的特性，IE6 及之前的版本不支持此方法

### 创建元素

使用 `document.createElement()` 方法可以创建元素。这个方法只接受一个参数，即要创建元素的标签名。这个标签名在 HTML 文档中不区分大小写，而在 XML（包括 HTML）文档中，则是区分大小写的。

```javascript
var div = document.createElement('div');
```
