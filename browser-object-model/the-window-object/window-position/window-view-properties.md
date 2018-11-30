## Window 视图属性

这些属性可以hold住整个浏览器窗体大小。微软则将这些API称为“Screenview 接口”。

### 浏览器窗口外层宽高

`window.outerWidth` 和 `window.outerHeight` 表示整个浏览器窗口外层的宽高（以像素为单位），包括侧边栏（如果存在）、窗口镶边（Window Chrome）和窗口调正边框，包含调试窗及浏览器边框。这两者均为只读属性。

![浏览器窗口外层宽高](../../../images/5/b9d971a3-1ff0-44e7-8bc6-ba1afe5eb165.png)

使用如下示例代码：

```js
window.outerHeight
window.outerHeight
```

`outterWidth` 和 `outterHeight` 属性为只读属性，没有默认值。

### 浏览器窗口内层宽高

`window.innerWidth` 和 `window.innerHeight` 表示浏览器窗口的视口宽高，如果存在垂直/水平滚动条，则包括它，不包括调试窗及浏览器边框。

![浏览器窗口内层宽高](../../../images/5/cbf51ef8-3f89-4b31-86c6-676b05d6fe67.png)

使用如下示例代码：

```js
window.innerWidth
window.innerHeight
```

`innerWidth` 和 `innerHeight` 属性为只读属性，没有默认值。

### 浏览器距屏幕边距

`window.screenTop` 和 `window.screenLeft` 表示浏览器窗口的左上角的 X / Y 坐标，该属性为只读属性。（注：在 Firefox 等浏览器中使用的是 `screenX` 和 `screenY` 属性）

使用如下示例代码：

```js
window.screenLeft
window.screenTop
```

### 浏览器窗口内层滚动偏移

`window.pageXOffset` 和 `window.pageYOffset` 表示当前页面相对于窗口显示区左上角的 X / Y 坐标。

使用如下示例代码：

```js
window.pageXOffset
window.pageYOffset
```

### 总结

| 属性               | 说明                       |
| ------------------ | -------------------------- |
| window.outerWidth  | 浏览器窗口外层宽度         |
| window.outerHeight | 浏览器窗口外层高度         |
| window.innerWidth  | 浏览器窗口内层宽度         |
| window.innerHeight | 浏览器窗口内层高度         |
| window.screenTop   | 浏览器距屏幕上边距         |
| window.screenLeft  | 浏览器距屏幕左边距         |
| window.pageXOffset | 当前页面距窗口显示区上边距 |
| window.pageYOffset | 当前页面距窗口显示区左边距 |

