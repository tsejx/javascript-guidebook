---
nav:
  title: BOM
  order: 5
group:
  title: 视窗尺寸位置
  order: 5
title: Element 文档元素视图属性
order: 3
---

# Element 文档元素视图属性

**目录：**

- [偏移量](#偏移量)
- [边距偏移量](#边距偏移量-offsetleft-和-offsettop)
  - [offsetLeft](#offsetleft)
  - [offsetTop](#offsettop)
- [宽高偏移量](#宽高偏移量-offsetwidth-和-offsetheight)
  - [offsetWidth](#offsetwidth)
  - [offsetHeight](#offsetheight)
- [内容可视区](#内容可视区)
  - [内容可视区宽高](#内容可视区宽高-clientwidth-和-clientheight)
- [内容滚动区](#内容滚动区)
  - [内容滚动区宽高](#内容滚动区宽高-scrollwidth-和-scrollheight)
  - [内容滚动区边距](#内容滚动区边距-scrollleft-和-scrolltop)

## 偏移量

偏移量（Offset Dimension）是 JavaScript 中的一个重要概念。

涉及到偏移量的主要是

- `offsetWdith`
- `offsetHeight`
- `offsetLeft`
- `offsetTop`

当然，还有一个偏移参照量——定位父级 `offsetParent`。

```jsx | inline
import React from 'react';
import img from '../../assets/element-view-properties/offset.png';

export default () => <img alt="偏移量" src={img} width={800} />;
```

### 定位父级 offsetParent

DOM 元素的 `offsetParent` 属性返回一个**对象的引用**，这个对象是距离调用 `offsetParent` 元素最近的（**在包含层次中最靠近的**），并且是**已进行过 CSS 定位**（`position` 不为 `static` ）的**容器元素**。

#### 元素固定定位

- 元素自身为 `fixed` 固定定位，`offsetParent` 的结果为 `null`

⚠️ **注意**： 当元素自身为 `fixed` 固定定位时，固定定位的元素相对于视口进行定位，此时没有父级。

```html
<div id="foo" style="position: fixed"></div>
<script>
  // Firefox 并没有考虑固定定位的问题，返回 body 元素，其他浏览器都返回 null
  const foo = document.getElementById('foo');
  console.log(foo.offsetParent); // null
</script>
```

> ⚠️ Firefox 浏览器有兼容性问题

#### 元素非固定定位，最近父元素未定位

- 元素自身无 `fixed` 固定定位，且父级元素都未经过定位，`offsetParent` 的结果为 `<body>` 根元素

```html
<div id="foo"></div>
<script>
  const foo = document.getElementById('foo');
  console.log(foo.offsetParent); // <body>
</script>
```

#### 元素非固定定位，父元素已定位

- 元素自身无 `fixed` 固定定位，且父级元素存在经过定位的元素，`offsetParent` 的结果为离自身元素最近的经过定位的父级元素

```html
<div id="div0" style="position:absolute;">
    <div id="div1" style="position:absolute;">
        <div id='foo'
 nm             </div>
    </div>
</div>
<script>
     const foo = document.getElementById('foo');
    console.log(foo.offsetParent);		//<div id="div1">
</script>
```

#### 根元素

- `body` 根元素的 `parentNode` 是 `null`

```js
console.log(document.body.offsetParent); // null
```

## 边距偏移量 offsetLeft 和 offsetTop

DOM 元素的 `offsetLeft` 和 `offsetTop` 这两个**只读属性**与 `offsetParent` 属性有关。要确定这两个属性的值，首先得确定元素的 `offsetParent`。确定了 `offsetParent`，`offsetLeft` 指的是元素左侧偏移 `offsetParent` 的距离，同理 `offsetTop` 指的是上侧偏移的距离。

```jsx | inline
import React from 'react';
import img from '../../assets/element-view-properties/offset-left-and-offset-right.png';

export default () => <img alt="边距偏移量" src={img} width={720} />;
```

### offsetLeft

`offsetLeft` 指**当前元素左外边界**与**包含元素的 `offsetParent` 节点的左内边界**的像素距离。

```js
offsetLeft = (offsetParent 的 padding-left) + (中间元素的 offsetWidth) + (当前元素的 margin-left)
```

使用方法：

```js
const offsetLeft = element.offsetLeft;
```

### offsetTop

而 `offsetTop` 指**当前元素上外边界**与**包含元素的 `offsetParent` 节点的上边界**的像素值。

```js
offsetTop = (offsetParent 的 padding-top) + (中间元素的 offsetHeight) + (当前元素的 margin-top)
```

使用方法：

```js
const offsetTop = element.offsetTop;
```

但通过上面的例子我们可以看到，当 `offsetParent` 为 `body` 时情况比较特殊。

在 IE8/8/10 及 Chrome 中，`offsetLeft = (body 的 margin-left) + (body 的 border-width) + (body 的 padding-left) + (当前元素的 margin-left)`

在 Firefox 中，`offsetLeft = (body 的 margin-left) + (body 的 padding-left) + (当前元素的 margin-left)`

- 元素的 `padding` 会影响边距偏移量，而父元素的 `padding` 不会影响当前元素的 `offsetLeft`，父元素的 `margin` 会影响。

## 宽高偏移量 offsetWidth 和 offsetHeight

DOM 元素的 `offsetWidth` 和 `offsetHeight` 是一种 CSS 宽度和高度的衡量标准，包括**元素的边框、内边距和元素的滚动条（如果存在且渲染的话）**，不包括 `:before` 或 `:after` 等伪类元素的高度，分别返回当前元素的布局宽度和当前元素的布局高度。

经过测试可以发现，即使元素加上水平或垂直滚动条，`offsetWidth` 和 `offsetHeight` 的值是不会更改的，因为浏览器渲染时把滚动条的宽度（或高度）算在了元素本身的宽度（或高度）中了。

`offsetWidth` 和 `offsetHeight` 这两个属性的值只与该元素有关，与周围元素（父级和子级元素都无关）。

```jsx | inline
import React from 'react';
import img from '../../assets/element-view-properties/offset-width-and-offset-height.png';

export default () => <img alt="宽高偏移量" src={img} width={720} />;
```

### offsetWidth

`offsetWidth` 表示元素在水平方向所占用的空间大小，即元素宽度、（可见的）垂直滚动条的宽度、内边距和边框四者的总和。

```js
offsetWidth =
  border - left - width + padding - left + width + padding - right + border - right - width;
```

使用方法：

```js
const offsetWidth = element.offsetWidth;
```

### offsetHeight

`offsetHeight` 表示元素在垂直方向所占用的空间大小，即元素宽度、（可见的）水平滚动条的宽度、内边距和边框四者的总和。

```js
offsetHeight =
  border - top - width + padding - top + width + padding - bottom + border - bottom - width;
```

使用方法：

```js
const offsetHeight = element.offsetHeight;
```

> ⚠️ 如果存在垂直滚动条，`offsetWidth` 也包括垂直滚动条的宽度；如果存在水平滚动条，`offsetHeight` 也包括水平滚动条的高度。

> ⚠️ 这两个属性值会被四舍五入为正数值，如果你需要一个浮点数值请用 `element.getBoundingClientRect()`。

### 偏移量注意事项

- **所有偏移量均为只读属性**
- 元素样式设置 `display: none` 则它的偏移量为 0
- 每次访问偏移量属性都需要重新计算

重复访问偏移量属性需要耗费大量的性能，所以要尽量避免重复访问这些属性。如果需要重复访问，则把它们的值保存在变量中，以提高性能。

## 内容可视区

内容可视区，顾名思义，就是用户可视可操作区的大小。在一个 Windows 窗口中，内容可视区又是工作区，其实就是用户可以看到的，并且能利用的区域。在浏览器中，客户区表达了元素可以渲染的区域，显然，这个区域就是元素所占空间，但是边框和滚动条是不算的，所以内容可视区大小需加上内边距。故 `clientWidth` 与 `offsetWidth` 的差别就在于边框与滚动条上。

```jsx | inline
import React from 'react';
import img from '../../assets/element-view-properties/content-view.png';

export default () => <img alt="内容可视区" src={img} width={720} />;
```

### 内容可视区宽高 clientWidth 和 clientHeight

`clientWidth` 和 `clientHeight` 表示元素内容可视区的宽度和高度，包括边距大小（padding），但是不包括边框（border）和滚动条（scroll bar）。

```js
clientWidth = padding - left + width + padding - right;
clientHeight = padding - top + width + padding - bottom;
```

### 内容可视区边距 clientLeft 和 clientTop

`clientLeft` 和 `clientTop` 分别表示内容可视区的左上角相对于整个元素左上角的位置（包括边框）

```js
clientLeft = border - left - width;
clientTop = border - top - width;
```

### 兼容性

获取 `<body>` 标签 DOM 对象宽高

```js
document.body.clientWidth || document.documentElement.clientWidth;
document.body.clientHeight || document.documentElement.clientHeight;
```

## 内容滚动区

滚动有关的属性都因滚动条而起。滚动条是常见的延长显示策略，也是电子媒体特有的优势。浏览器必须考虑滚动条本身的高度和宽度，于是便出现了 `scrollWidth` 和 `scrollLeft` 等属性，以支持对滚动条高宽的控制。

由于滚动相关属性都是为滚动条而设计，那么，在没有滚动时，这些属性将失去意义，可不必考虑，或用其他属性代替。

```jsx | inline
import React from 'react';
import img from '../../assets/element-view-properties/content-scroll.png';

export default () => <img alt="内容滚动区" src={img} width={720} />;
```

### 内容滚动区宽高 scrollWidth 和 scrollHeight

`scrollWidth` 和 `scrollHeight` 分别表示元素内容的宽度和元素内容的高度。

`scrollWidth` 是滚动宽度，当出现了水平滚动条，元素真实的宽度是看不出来的，此时元素在页面上所占据的宽度依然是 `offsetWidth`，而其整个内容区的宽度会因为出现了滚动条而遮住。此时，为了得到元素内容的真实大小，就需要用 `scrollWidth`，就像是将滚动的内容全部铺开，此时呈现出来的宽度就是 `scrollWidth`，而不包含边框和 Y 轴滚动条的宽度，就像是铺开的 `clientWidth`。同理可得 `scrollHeight` 为滚动高度。

使用如下示例代码：

```js
const foo = document.getElementById('foo');

const scrollWidth = foo.scrollWidth;
const scrollHeight = foo.scrollHeight;
```

> 如果元素没有隐藏的部分，则相关的值应该等于 `clientWidth` 或 `clientHeight`
>
> 当你向下滚动滚动条的时候，`scrollHeight` 应该等用于 `scrollTop + clientHeight`

### 内容滚动区边距 scrollLeft 和 scrollTop

`scrollTop` 可设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离。

`scrollLeft` 可设置或获取位于对象左边界和窗口中目前可见内容的最左端之间的距离。

获取滚动条到元素左边界和上边界距离：

```js
const scrollLeft = element.scrollLeft;
const scrollTop = element.scrollTop;
```

设置滚动条滚动的距离：

```js
element.scrollLeft = 10;
element.scrollTop = 10;
```

`scrollLeft` 和 `scrollTop` 可以是任意整数，然而：

- 如果元素无滚动轴（如：元素无溢出），那么 `scrollLeft` 的值是 0
- 如果给 `scrollLeft` 设置的值小于 0，那么 `scrollLeft` 的值将变为 0
- 如果给 `scrollLeft` 设置的值大于元素内容最大宽度，那么 `scrollLeft` 的值将被设为元素最大宽度

---

**参考资料：**

- [CSSOM 视图模式(CSSOM View Module)相关整理](https://www.zhangxinxu.com/wordpress/2011/09/cssom%E8%A7%86%E5%9B%BE%E6%A8%A1%E5%BC%8Fcssom-view-module%E7%9B%B8%E5%85%B3%E6%95%B4%E7%90%86%E4%B8%8E%E4%BB%8B%E7%BB%8D/)
