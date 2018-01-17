# DOM操作技术

## 动态脚本

使用`<script>`元素可以向页面中插入 JavaScript 代码，一种方式是通过其 src 特性包含外部文件，另一种方式就是用这个元素本身来包含代码。而动态脚本，指的是页面加载时不存在，但将来的某一时刻通过修改DOM动态添加的脚本。跟操作HTML元素一样，创建动态脚本也有两种方式：插入外部文件和直接插入JavaScript代码。

动态加载的外部 JavaScript文件能够立即运行。

```html
<script type='text/javascript' src='client.js'></script>
```

创建这个节点的DOM代码

```javascript
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'client.js';
document.body.appendChild(script);
```

显然，这里的DOM代码如实反映了相应的HTML代码。不过，在执行最后一行代码把 `<script>`元素添加到页面中之前，是不会下载外部文件的。也可以把这个元素添加到`<head>`元素中，效果相同。

整个过程可以使用下面的函数来封装

```javascript
function loadScript(url){
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.body.appendChild(script);
}

loadScript('client.js');
```

另一种指定 JavaScript代码的方式是行内方式

```html
<script type='text/javascript'>
    function sayHi(){
        alert('hi');
    }
</script>
```

从逻辑上讲，下面的DOM代码是有效的:

```javascript
var script = document.createElement('script');
script.type = 'text/javascript';
script.appendChild(document.createTextNode('function sayHi(){alert('hi');}'));
document.body.appendChild(script);
```

兼容版

```javascript
var script = document.createElement('script');
script.type = 'text/javascript';
var codr = 'function sayHi(){alert('hi');}';
try {
    script.appendChild(document.createTextNode('code'));
} catch (ex) {
    script.text = 'code';
}
document.body.appendChild(script);
```

## 动态样式

能够把CSS样式包含到HTML页面中元素有两个。其中，`<link>`元素用于包含来自外部的文件，而`<style>`元素用于指定嵌入的样式。与动态脚本类似，所谓动态样式是指定页面刚加载时不存在的样式；动态样式是在页面加载完成后动态添加到页面中的。

```html
<link rel='stylesheet' type='text/css' href='style.css'></link>
```

使用DOM代码可以很容易地动态创建出这个元素

```javascript
var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'style.css';
var head = document.getElementByTagName('head')[0];
head.appendChild(link);
```

以上代码在所有主流浏览器中都可以正常运行。需要注意的是，必须将`<link>`元素添加到`<head>`而不是`<body>`元素，才能保证在所有浏览器中的行为一致。

```javascript
function loadStyles(url){
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    var head = document.getElementByTagName('head')[0];
    head.appendChild(link);
}

loadStyles("style.css");
```

兼容性

```javascript
function loadStyleString(css){
    var style = document.createElement('style');
    style.type = 'text/css';
    try {
        style.appendChild(document.createTextNode(css));
    } catch (ex) {
        style.styleSheet.cssText = css;
    }
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(style);
}

loadStyleString('body{background-color: red}');
```

[注意] 如果专门针对IE编写代码，务必小心使用 `styleSheet.cssText` 属性。在重用同一个 `<style>` 元素并再次设置这个属性时，有可能会导致浏览器崩溃。同样，将 `cssText` 属性设置为空字符串也可能导致浏览器崩溃。我们希望IE中的这个bug能够在将来被修复。

## 操作表格

HTML DOM为 `<table>`、`<tbody>`、`<tr>`元素添加的属性和方法

属性和方法|描述
:---:|:---:
`caption`|保存着对`<caption>`元素（如果有）的指针
`tBodies`|是一个`<tbody>`元素的HTMLCollection
`tFoot`|保存着对`<tFoot>`元素（如果有）的指针
`tHead`|保存着对`<tHead>`元素（如果有）的指针
`rows`|是一个表格中所有行的HTMLCollection
`createTHead()`|创建`<thead>`元素，将其放到表格中，返回引用
`creatTFoot()`|创建`<tFoot>`元素，将其放到表格中，返回引用
`createCaption()`|创建`<caption>`元素，将其放到表格中，返回引用
`deleteTHead()`|删除`<thead>`元素
`deleteTFoot()`|删除`<tfoot>`元素
`deleteCaption()`|删除`<caption>`元素
`deleteRow(pos)`|删除指定位置的行
`insertRow(pos)`|向rows集合中的指定位置插入一行

为 `<tbody>` 元素添加的属性和方法

属性和方法|描述
:---:|:----:
`rows`|保存着`<tbody>`元素中行的 HTMLCollection
`deleteRow(pos)`|删除指定位置的行
`insertRow(pos)`|想rows集合中的指定位置插入一行，，返回对新输入行和引用。

为`<tr>添加的属性和方法

属性和方法|描述
:---:|:---:
`cells`|保存着`<tr>`元素中单元格的HTMLClloction
`deleteCell(pos)`|删除指定位置的单元格
`insetCell(pos)`|向cells集合中的指定位置插入一个单元格，返回对新输入单元格的引用。

```javascript
// 创建table
var table = document.createElment('table');
table.border = 1;
table.width = '100%';

// 创建tbody
var tbody = document.createElement('tbody');
table.appendChild(tbody);

// 创建第一行
tbody.insettRow(0);
tbody.row[0].insertCell(0);
tbody.row[0].cells[0].appendChild(document.createTextNode('cell 1,1'));
tbody.rows[0].insertCell(1);
tbody.rows[0].cells[1].appendChild(document.createTextNode('cell 2,1'));

// 创建第二行
tbody.insertRow(1);
tbody.rows[1].insertCell(0);
tbody.rows[1].cells[0].appendChild(document.createTextNode("cell 1,2"));
tbody.rows[1].insertCell(1);
tbody.rows[1].cells[1].appendChild(document.createTextNode('cell 2,2'));

// 将表格添加到文档主体中
document.body.appendChild(table);
```

## 小结

DOM是语言中立的API，用于访问和操作HTML和XML文档。DOM1级将HTML和XML文档形象地看作一个层次化的节点树，可以使用JavaScript来操作这个节点树，进而改变底层文档的外观和结构。

- 最基本的节点类型是Node，用于抽象地表示文档中一个独立的部分；所有其他类型都继承自Node
- Document类型表示整个文档，是一组分层节点的根节点。在JavaScript中，document对象是Document的一个实例。使用document对象，有很多种方式可以查询和取得节点。
- Element节点表示文档中的所有HTML或XML元素，可以用来操作这些元素的内容和特性
- 另外还有一些节点类型，分别表示文本类型、注释、文档类型、CDATA区域和文档片段。

