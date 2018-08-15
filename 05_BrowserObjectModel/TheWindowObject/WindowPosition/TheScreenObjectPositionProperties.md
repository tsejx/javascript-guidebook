## Screen 对象位置尺寸属性

### 屏幕分辨率宽高

`screen.width` 和 `screen.height` 分别表示当前浏览器的屏幕的宽高，以像素计算。这两个只读属性，一般用来了解设备的分辨率。除非调整显示器的分辨率，否则这两个值可以看作常量，不会发生变化。显示器的分辨率与浏览器设置无关，缩放网页并不会改变分辨率。

- **`sreen.width` 屏幕的像素宽度**

```js
screen.width		// 1389
```

- **`screen.height` 屏幕的像素高度**

```js
screen.height		// 877
```

#### 实践用例

可以根据屏幕分辨率，将用户导向不同网页

```js
if ((screen.width <= 800) && (screen.height <= 600)) {
	window.location.replace('small.html');
} else {
	window.location.replace('wide.html');
}
```

### 屏幕可用工作区宽高

`screen.availWidth` 和 `screen.availHeight` 分别表示显示浏览器的屏幕的可用宽高，以像素计算。屏幕可用高度除去浏览器底部任务栏的屏幕高度。这两个**只读**属性均为屏幕的像素高度减去系统部件高度之后的值。

- **`screen.availWidth` 屏幕可用宽度**

```js
screen.availWidth;		// 1536
```

- **`screen.availHeight` 屏幕可用高度**

```js
screen.availHeight;		// 864
```

### 总结

| 属性                 | 说明         |
| -------------------- | ------------ |
| `screen.width`       | 屏幕像素宽度 |
| `screen.height`      | 屏幕像素高度 |
| `screen.availWidth`  | 屏幕可用宽度 |
| `screen.availHeight` | 屏幕可用高度 |

