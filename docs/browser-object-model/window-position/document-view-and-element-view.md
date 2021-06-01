---
nav:
  title: BOM
  order: 5
group:
  title: 视窗尺寸位置
  order: 5
title: 文档视图和元素视图
order: 4
---

# 文档视图和元素视图

文档视图和元素视图中包含的与元素大小位置相关的方法主要有：

1. `elementFromPoint()`
2. `getClientRects()`
3. `getBoundingClientRect()`
4. `scrollIntoView()`

## elementFromPoint

根据坐标获取元素

`elementFromPoint()` 根据文档上横纵坐标，获取当前文档上该坐标点上位置最顶层的 DOM 元素，该坐标是相对于文档的浏览器窗口左上角为原点来计算的，通常横纵坐标为正数。

```js
const foo = document.elementFromPoint(offsetX, offsetY);
```

> ⚠️ 参数 offsetX 和 offsetY 为坐标数值，不需要单位（比如像素单位 px）

```jsx | inline
import React from 'react';
import img from '../../assets/document-view-and-element-view/element-from-point.png';

export default () => <img alt="elementFromPoint" src={img} width={800} />;
```

使用如下示例代码：

```js
const foo = document.elementFromPoint(offsetX, offsetY);

console.log(foo); // <div id="foo"></foo>
```

> 此方法可以用于检测元素是否发生重叠或是碰撞

## getClientRects() 获取元素占据页面的所有矩形区域

`getClientRects()` 方法返回一组元素相关的只读属性的矩形集合 DOMRectList。包括当前元素相对于浏览器视口左上角的顶端（top）、底端（bottom）、左端（left）、右端（right）的**偏移量**，元素自身的宽度（width）和高度（height）属性，以及元素自身的横（x）纵（y）坐标。

```js
const rectCollection = ele.getClientRects();
```

> ⚠️ 当元素发生滚动时，顶端（top）、底端（bottom）、左端（left） 和 右端（right） 的偏移量也会发生改变。

```jsx | inline
import React from 'react';
import img from '../../assets/document-view-and-element-view/get-client-rects.png';

export default () => <img alt="getClientRects" src={img} width={720} />;
```

- top：元素左上角距浏览器页面顶端的距离
- left：元素左上角距浏览器页面左端的距离
- bottom：元素右下角距浏览器页面的顶端的距离
- right：元素右下角距浏览器页面的左端的距离
- width：元素宽度（包括内容、边距和边框）
- height：元素高度（包括内容、边距和边框）

> 浏览器页面指文档整体宽高组成的区域，通常通过滚动条查看未在可视区域内显示的页面内容。

使用如下示例代码：

```js
const foo = document.getElementById('foo');

const fooRects = foo.getClientRects();

console.log(fooRects);

// 输出内容如下：
DOMRectList[
  {
    top: 100,
    left: 100,
    right: 200, // => (left + width)
    bottom: 200, // => (top + height)
    x: 100,
    y: 100,
  }
];
```

## getBoundingClientRect() 获取元素位置

`getBoundingClientRect()` 方法放回一组元素的左、上、右及下分别**相对**浏览器可视窗口的位置的集合 DOMRect。

`getBoundingClientRect` 是 `DOM` 元素到浏览器可视范围的距离（不包含文档卷起的部分）。

```js
const rectObject = ele.getBoundingClientRect();
```

```jsx | inline
import React from 'react';
import img from '../../assets/document-view-and-element-view/get-bounding-client-rect.png';

export default () => <img alt="getBoundingClientRect" src={img} width={720} />;
```

- top：元素左上角距浏览器可视区域顶端的距离
- left：元素左上角距浏览器可视区域左端的距离
- bottom：元素右下角距浏览器可视区域的顶端的距离
- right：元素右下角距浏览器可视区域的左端的距离
- width：元素宽度（包括内容、边距和边框）
- height：元素高度（包括内容、边距和边框）

使用如下示例代码：

```js
const foo = document.getElementById('foo');

const fooBoundingRect = ele.getBoundingClientRect();

console.log(foo);

// 输出内容如下：
DOMRect {
    top: 100,
    left: 100,
    right: 200,			// => (left + width)
    bottom: 200,		// => (top + height)
    width: 100,
    height: 100,
    x: 100,
    y: 100,
}
```

## scrollIntoView()

> ⚗️ 这是一个实验中的功能

`scrollView()` 方法让当前的元素滚动到浏览器窗口的可视区域内。

```js
element.scrollIntoView(alignToTop || options);
```

| 参数       | 说明                                                                                                                               | 类型    |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------- |
| alignToTop | <ol><li> `true`：元素顶端和其所在滚动区的可视区域的顶端对齐</li><li> `false`：元素底端和其所在滚动区的可视区域的底端对齐</li></ol> | boolean |
| options    | 一个带有选项的配置对象，详细参数查看下表                                                                                           | object  |

**options**

| 参数     | 说明                                                    | 类型   | 默认值    |
| -------- | ------------------------------------------------------- | ------ | --------- |
| behavior | 定义缓慢函数，可选值为 `auto` `instant` `smooth`        | string | `auto`    |
| block    | 定义块级元素对齐方式，可选值为 `center` `end` `nearest` | string | `center`  |
| inline   | 定义行内元素对齐方式，可选值为 `center` `end` `nearest` | string | `nearest` |
