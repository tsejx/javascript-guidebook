## Window 对象的位置尺寸属性

### 浏览器窗口外层宽高

`window.outerWidth` 和 `window.outerHeight` 表示整个浏览器窗口外层的宽高（以像素为单位），包括侧边栏（如果存在）、窗口镶边（Window Chrome）和窗口调正边框，包含调试窗及浏览器边框。这两者均为只读属性。

![浏览器窗口外层宽高](../../../Image/05/b9d971a3-1ff0-44e7-8bc6-ba1afe5eb165.png)

- `window.outerHeight` 浏览器窗口外层高度

```js
window.outerHeight
```

- `window.outerWidth` 浏览器窗口外层宽度

```js
window.outerHeight
```

### 浏览器窗口内层宽高

`window.innerWidth` 和 `window.innerHeight` 表示浏览器窗口的视口宽高，如果存在垂直/水平滚动条，则包括它，不包括调试窗及浏览器边框。

![浏览器窗口内层宽高](../../../Image/05/cbf51ef8-3f89-4b31-86c6-676b05d6fe67.png)

- `window.innerWidth` 浏览器窗口内层宽度

```js
window.innerWidth
```

- `window.innerHeight` 浏览器窗口内层高度

```js
window.innerHeight
```


### 浏览器距屏幕边距

`window.screenTop` 和 `window.screenLeft` 表示浏览器窗口的左上角的 X / Y 坐标，该属性为只读属性。（注：在 Firefox 等浏览器中使用的是 screenX 和 screenY 属性）

![浏览器距屏幕边距](/Users/mrsingsing/Desktop/32e4770f-1d13-4415-b07e-2a51c5232042.png)

- `window.screenTop` 浏览器距屏幕上边距

```js
window.screenTop
```

- `window.screenLeft` 浏览器距屏幕左边距

```js
window.screenTop
```

### 总结

| 属性               | 说明               |
| ------------------ | ------------------ |
| window.outerWidth  | 浏览器窗口外层宽度 |
| window.outerHeight | 浏览器窗口外层高度 |
| window.innerWidth  | 浏览器窗口内层宽度 |
| window.innerHeight | 浏览器窗口内层高度 |
| window.screenTop   | 浏览器距屏幕上边距 |
| window.screenLeft  | 浏览器距屏幕左边距 |

