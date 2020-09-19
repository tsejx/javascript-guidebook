---
nav:
  title: DOM
  order: 6
group:
  title: Element
  order: 6
title: Element 属性
order: 2
---

# Element 属性

## 元素信息

### tagName

获取元素的大写标签名。

```html
<body>
  <span>Hello world!</span>

  <script type="text/javascript">
    const span = document.querySelector('span');

    console.log(span.tagName);
    // SPAN
  </script>
</body>
```

### attributes

通过 `Element.attributes` 获取元素节点的所有属性节点（[NamedNodeMap](../node/named-node-map)）。

```html
<body>
  <div id="foo" class="bar" name="baz">Hello world!</div>

  <script type="text/javascript">
    const foo = document.querySelector('#foo');
    const attr = foo.attributes;

    console.log(attr);
    // NamedNodeMap {0: id, 1: class, 2: name, id: id, class: class, name: name, length: 3}
  </script>
</body>
```

### id

获取元素的 id 属性

### style

获取元素节点的行内样式

### className

获取元素的 class 属性

### classList

获取元素节点的所有 class 属性集合（[DOMTokenList](../node/dom-token-list)）。

```html
<body>
  <div class="foo bar baz">Hello world!</div>

  <script type="text/javascript">
    const foo = document.querySelector('.foo');
    const classList = foo.classList;

    console.log(classList);
    // DOMTokenList(3) ["foo", "bar", "baz", value: "foo bar baz"]
  </script>
</body>
```

### dataset

获取元素节点中所有的 `data-*` 自定义属性（[DOMStringMap]()）。

```html
<body>
  <div class="foo" data-name="Amy" data-age="18" data-gender="female">Hello world!</div>

  <script type="text/javascript">
    const foo = document.querySelector('.foo');
    const dataset = foo.dataset;

    console.log(dataset);
    // DOMStringMap { name: "Amy", age: "18", gender: "female" }
  </script>
</body>
```

### innerHTML

获取或设置元素 HTML 语法表示的元素后代

### outerHTML

获取元素及其后代的序列化 HTML 片段

## 坐标尺寸型属性

### clientWidth

获取元素节点可视部分的宽度

### clientHeight

获取元素节点可视部分的高度

### clientLeft

获取元素节点 offsetLeft 属性值和到当前窗口左边真实值之间的距离

### clientTop

获取元素节点 offsetTop 属性值和到当前窗口上边真实值之间的距离

### scrollWidth

取元素节点的总宽度，包括由于溢出导致视图不可见内容

### scrollHeight

获取元素节点的总高度，包括由于溢出导致视图不可见内容

### scrollLeft

获取或设置元素水平滚动条到元素左边的距离

### scrollTop

获取或设置元素垂直滚动条到元素顶部的距离

### offsetHeight

获取元素的像素高度（包括元素垂直内边距和边框）

### offsetWidth

获取元素的像素宽度（包括元素水平内边距和边框）

### offsetLeft

获取元素左上角相对于父元素左边界偏移的像素值

### offsetTop

获取元素左上角相对于父元素上边界偏移的像素值

## 关系型属性

### offsetParent

获取元素节点的最近的、并且 CSS 的 position 属性不等于 static 的父元素

### previousElementSibling

获取元素元素节点的下一个兄弟 HTML 元素节点

### nextElementSibling

获取元素元素节点的上一个兄弟 HTML 元素节点

### children

获取元素节点的所有子元素节点

### childElementCount

获取元素节点包含的子 HTML 元素节点的个数

### firstElementChild

获取元素节点的第一个 Element 子节点

### lastElementChild

获取元素节点的最后一个 Element 子节点
