## 绘制文本

绘制矩形的相关方法共有三种：

- [fillText()](#fillText())
- [strokeText()](#strokeText())
- [measureText()](#measureText())

### fillText()

`CanvasRenderingContext2D.fillText()` 用以在 `(x, y)` 位置绘制填充文本的方法。

#### 语法

```js
void ctx.fillText(text, x, y [, maxWidth]);
```

| 参数     | 说明                                                         | 类型   |
| -------- | ------------------------------------------------------------ | ------ |
| text     | 绘制的文本值                                                 | string |
| x        | 绘制文本的横坐标                                             | number |
| y        | 绘制文本的纵坐标                                             | number |
| maxWidth | 绘制的最大宽度， 如果指定了值，并且经过计算字符串的值比最大宽度还要宽，字体为了适应会水平缩放（如果通过水平缩放当前字体，可以进行有效的或者合理可读的处理）或者使用小号的字体。 | number |

> ⚠️如果选项的第四个参数提供了最大宽度，文本会进行缩放以适应最大宽度。

#### 示例

```html
<canvas id="canvas"></canvas>
```

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.font = "48px serif";
ctx.fillText("Hello world", 50, 100);
```

### strokeText()

`CanvasRenderingContext2D.stokeText()` 用以在 `(x, y)` 位置绘制无填充文本的方法。

#### 语法

```js
void ctx.stokeText(text, x, y [, maxWidth]);
```

| 参数     | 说明                                                         | 类型   |
| -------- | ------------------------------------------------------------ | ------ |
| text     | 绘制的文本值                                                 | string |
| x        | 绘制文本的横坐标                                             | number |
| y        | 绘制文本的纵坐标                                             | number |
| maxWidth | 绘制的最大宽度， 如果指定了值，并且经过计算字符串的值比最大宽度还要宽，字体为了适应会水平缩放（如果通过水平缩放当前字体，可以进行有效的或者合理可读的处理）或者使用小号的字体。 | number |

> ⚠️如果选项的第四个参数提供了最大宽度，文本会进行缩放以适应最大宽度。

#### 示例

```html
<canvas id="canvas"></canvas>
```

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.font = "48px serif";
ctx.stokeText("Hello world", 50, 100);
```


### measureText()

`CanvasRenderingContext2D.measureText` 方法用以获取一个包含文本尺寸信息的 TextMetrics 对象。

#### 语法

```js
void ctx.measureText(text)
```

| 属性 | 说明           | 类型   |
| ---- | -------------- | ------ |
| text | 需要测量的文本 | string |

#### 示例

```html
<canvas id="canvas"></canvas>
```

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var text = ctx.measureText("foo");		// TextMetrics object
text.width;								// 16
```