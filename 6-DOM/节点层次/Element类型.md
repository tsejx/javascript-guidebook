## Element 类型

除了 Document 类型之外，Element 类型就要算是 Web编程中最常用的类型了。Element 类型用于表现XML或HTML元素，提供了对元素标签名、子节点及特性的访问。Element 节点具有以下特征：

- nodeType的值为 1
- nodeName 的值为元素的标签名
- nodeValue 的值为 `null`
- parentNode可能是Document或Element
- 其他子节点可能是Element、Text、Comment、ProcessingInstruction、EntityReference

要访问元素的标签名，可以使用 `nodeName` 属性，也可以使用 `tagName` 属性；这两个属性会返回相同的值（使用后者主要是为了清晰起见）

```html
<div id='myDiv'></div>
```

可以像下面这样取得这个元素及其标签名

```javascript
var div = document.getElementById('myDiv');
alert(div.tagName); // 'DIV'
alert(div.tagName === div.noadeName); // true
```

在HTML，标签名始终都以全部大写表示；而在XML中，标签名则始终会与源代码中的保持一致，假如你不确定自己的脚本将会在HTML还是XML文档中执行，最好是在比较之前将标签名转换为相同的大小写形式。

```javascript
if (element.tagName === 'div') {
    // do something
}

if (element.tagName.toLowerCase() == 'div') { // 这样最好（适用于任何文档）
    // do something
}
```

### HTML 元素

所有HTML元素都由HTMLElement类型表示，不是直接通过这个类型，也是通过它的子类型来表示。HTMLElement类型直接继承自Element并添加了一些属性。添加的这些属性分别对应于每个HTML元素中都存在的下列标准特性。

 - id，元素在文档中的唯一标识符
 - title，有关元素的附加说明信息，一般通过工具提示条显示出来
 - lang，元素内容的语言代码，很少使用
 - dir，语言的方向，值为'ltr'(left-to-right,从左至右)或'rtl'(right-to-left,从右至左)，也很少使用
 - className，与元素的class特性对应，即为元素指定的CSS类。没有将这个属性命名为class，是因为class是ECMAScript保留字

```html
<div id='myDiv' class='bd' title='Body text' lang='en' dir='ltr'></div>
```

```javascript
// 元素中指定的所有信息，都可以通过下列JavaScript代码取得
var div = document.getElementById('myDiv');

console.log(div.id); // 'myDiv'
console.log(div.className); // 'bd'
console.log(div.title); // 'Body text'
console.log(div.lang); // 'en'
console.log(div.dir); // 'ltr'

// 可通过为每个属性赋予新的值，修改对应的每个特性
div.id = 'someOtherId';
div.className = 'ft';
div.title = 'Some other text';
div.lang = 'fr';
div.dir = 'rtl';
```

### 取得特性

操作特性的DOM方法主要有三个：`getAttribute()`、`setAttribute()`、`removeAttribute()`

```javascript
var div = document.getElementById('myDiv');
console.log(div.getAttribute('id')); // 'myDiv'
console.log(div.getAttribute('class')); // 'bd'
console.log(div.getAttribute('lang')); // 'en'
console.log(div.getAttribute('dir')); // 'ltr'
```

[注意] 传递给`getAttribute()`的特性名与实际的特性名相同。因此要得到 `class` 特性值，应该传入 `class` 而不是 `className`，后者只有在通过对象属性访问特性时采用。如果给定名称的特性不存在，`getAttribute()`返回`null`

通过 `getAttribute()`方法也可以取得自定义特性(即标准HTML语言中没有的特性)的值，不过，特性的名称是不区分大小写的，即 ID 和 id 代表的都是同一个特性。另外，根据HTML5规范，自定义特性应该加上`data-`前缀以便验证。

任何元素的所有特性，也都可以通过DOM元素本身的属性来访问。当然，HTMLElement也会有5个属性与相应的特性一一对应。不过，只有公认的（非自定义的）特性才会以属性的形式添加到DOM对象中。

```html
<div id='myDiv' align='left' my_special_attribute='hello!'></div>
```

```javascript
console.log(div.id); // 'myDiv'
console.log(div.my_special_attribute); // undefined(IE除外)
console.log(div.align); // 'left'
```

有两类特殊的特性，它们虽然有对应的属性名，但属性的值与通过`getAttribute()`返回的值并不相同。

第一类特性是 `style`，在通过 `getAttribute()` 访问时，返回的 `style` 特性值中包含的是 CSS文本，而通过属性来访问它则会返回一个对象。由于 `style` 属性是用于编程方式访问元素样式的，因此并没有直接映射到 style 特性。

第二类是onclick这样的事件处理程序。当在元素上使用时，onclick特性中包含的是JavaScript代码，如果通过 `getAttribute()` 访问，则会返回相应代码的字符串。而在访问onclik属性时，则会返回一个JavaScript函数（如果未在元素中指定相应特性，则返回`null`）。这是因为 onclick 及其他事件处理程序属性本身就应该被赋予函数值。

由于存在这些差别，在通过 JavaScript 以编程方式操作 DOM时，开发人员经常不使用 `getAttribute()`，而是只使用对象的属性。只有在取得自定义特性值的情况下，才会使用`getAttribute()`方法。

### 设置特性

```javascript
div.setAttribute('id', 'someOtherId');
div.setAttribute('class', 'ft');
div.setAttribute('title', 'Some other text');
div.setAttribute('lang', 'fr');
div.setAttribute('dir', 'rtl');
```

通过 `setAttribute()` 方法既可以操作HTML特性也可以操作自定义特性。通过这个方法设置的特性名会被统一转换为小写形式，即 ID 最终会变成 id。

因为所有特性都是属性，所以直接给属性赋值可以设置特性的值

```javascript
div.id = 'someOtherId';
div.align = 'left';
```

不过，像下面这样为DOM元素添加一个自定义的属性，该属性不会自动成为元素的特性。

```javascript
div.mycolor = 'red';
console.log(div.getAttribute('mycolor')); // null(IE除外)
```

**removeAttribute()**

调用 `removeAttribute()` 方法可清除特性的值，同时会从元素中完全删除特性

```javascript
div.removeAttribute('class');
```

### attributes 属性

Element类型是使用 `attributes` 属性的唯一一个DOM节点类型。`attributes`属性中包含一个NamedNodeMap，与NodeList类似，也是一个“动态”的集合。元素的每一个特性都由一个Attr节点表示，每个节点都保存在NamedNodeMap对象中。NamedNodeMap对象有下列方法：

 - getNamedItem(name)：返回nodeName属性等于name的节点
 - removeNamedItem(name)：从列表中移除nodeName属性等于name的节点
 - setNamedItem(node)：向列表中添加节点，以节点的nodeName属性为索引
 - item(pos)：返回位于数字pos位置处的节点

attributes属性中包含一系列节点，每个节点的 nodeName 就是特性的名称，而节点的 nodeValue 就是特性的值。要取得元素的 id 特性，可以使用以下代码

```javascript
var id = element.attributes.getNamedItem('id').nodeValue;

// 方括号语法节点访问
var id = element.attributes['id'].nodeValue;
```

### 创建元素

使用 `document.createElement()` 方法可以创建元素。这个方法只接受一个参数，即要创建元素的标签名。这个标签名在HTML文档中不区分大小写，而在XML（包括HTML）文档中，则是区分大小写的。

```javascript
var div = document.createElement('div');
```

在使用 `createElement()` 方法创建新元素的同时，也为新元素设置了 ownDocument 属性。此时，还可以操作元素的特性，为它添加更多子节点，以及执行其他操作。

```javascript
div.id = 'myNewDiv';
div.className = 'box';
```

在新元素上设置这些特性知识给它们赋予了相应的信息。由于新元素尚未被添加到文档树中，因此设置这些特性不会影响浏览器的显示。要把新元素添加到文档树，可以使用 `appendChild()`、`insertBefore()`、`replaceChild()` 方法。下面的代码会把新创建的元素添加到文档的`<body>`元素中。

```javascript
document.body.appendChild(div);
```

### 元素的子节点

元素可以有任意数目的子节点和后代节点，因为元素可以是其他元素的子节点。元素的 `childNodes` 属性中包含了它的所有子节点，这些子节点有可能是元素、文本节点、注释或处理指令。不同浏览器在看待这些节点方面存在显著的不同。

```html
<ul id='myList'>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>
```

 - IE解释：`<ul>`元素会有3个子节点，分别是3个`<li>`元素
 - 其他浏览器：`<ul>`元素都会有7个元素，包括3个`<li>`元素和4个文本节点（表示`<li>`元素之间的空白符）。如果像下面这样将元素的空白符删除，呢么所有浏览器都会返回相同数目的子节点。

```html
<ul id='myList'><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>
```

对于这段代码，`<ul>`元素在任何浏览器中都会包含3个子节点。如果需要通过 `childNodes` 属性遍历子节点，那么一定不要忘记浏览器间的这一差别。这意味着在执行某项操作以前，通常都要先检查一下 `nodeType` 属性

```javascript
for (var i=0, len = element.childNodes.length;i < len;i++){
    if (element.childNodes[i].nodeType == 1){
        // do something
    }
}
```

这个例子会循环遍历特定元素的每一个子节点，然后只在子节点的 `nodeType` 等于1（表示是元素节点）的情况下，才会执行某些操作。

**获取子节点或后代节点 getElementByTagName()**

在通过元素调用这个方法时，除了搜索起点是当前元素之外，其他方面都跟通过 document 调用这个方法相同，因此结果只会返回当前元素的后代。例如，要想取得前面 `<ul>`元素中包含的所有 `<li>` 元素，可以使用下列代码。

```javascript
var ul = document.getElementById('myList');
var items = ul.getElemntByTagName('li');
```