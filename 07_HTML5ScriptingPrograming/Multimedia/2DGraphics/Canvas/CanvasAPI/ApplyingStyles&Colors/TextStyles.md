## 文本 TextStyles

绘制文本的相关样式属性共有四种：

- [font](#font)
- [textAlign](#textalign)
- [textBaseline](#textbaseline)
- [direction](#direction)

### font

`CanvasRenderingContext2D.font` 用以设置文本中字体属性。

### 语法

```js
context.font = value
```

| 值    | 说明                                  | 类型   | 默认值              |
| ----- | ------------------------------------- | ------ | ------------------- |
| value | 符合 CSS font 语法的 DOMString 字符串 | string | `"10px sans-serif"` |

#### 示例

```html
<canvas id="canvas"></canvas>
```

```js
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// 设置文本字体
ctx.font = "48px serif";

ctx.strokeText("Hello world", 50, 100);
```

### textAlign

`CanvasRenderingContext2D.textAlign` 用以设置绘制文本时文本的对齐方式。

### 语法

```js
context.textAlign = "left" || "center" || "right" || "start" || "end"
```

| 值     | 说明                           | 类型   |
| ------ | ------------------------------ | ------ |
| left   | 文本左对齐。                   | string |
| center | 文本的中心被放置在指定的位置。 | string |
| right  | 文本右对齐。                   | string |
| start  | 文本在指定的位置开始。默认值。 | stri g |
| end    | 文本在指定的位置结束。         | stirng |

> `direction` 属性会对此属性产生影响。如果 `direction` 属性设置为 `ltr`，则 `left` 和 `start` 的效果相同，`right` 和 `end` 的效果相同；如果 `direction` 属性设置为 `rtl`，则 `left` 和 `end` 的效果相同，`right` 和 `start` 的效果相同。

#### 示例

```html
<canvas id="canvas"></canvas>
```

```js
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.font = "48px serif";

// 设置文本对齐方式
ctx.textAlign = "left"

ctx.strokeText("Hello world", 50, 100);
```
### textBaseline

`CanvasRenderingContext2D.textBaseline` 用以设置绘制文本时基线对齐方式。

### 语法

```js
context.textBaseline = value
```

| 值          | 说明                                                         | 类型      |
| ----------- | ------------------------------------------------------------ | --------- |
| top         | 文本基线在文本块的顶部。                                     | DOMString |
| hanging     | 文本基线是悬挂基线。                                         | DOMString |
| middle      | 文本基线在文本块的中间。                                     | DOMString |
| alphabetic  | 文本基线是标准的字母基线。默认值                             | DOMString |
| ideographic | 文字基线是表意字基线；如果字符本身超出了`alphabetic` 基线，那么 `ideograhpic` 基线位置在字符本身的底部。 | DOMString |
| bottom      | 文本基线在文本块的底部。 与  `ideographic` 基线的区别在于 `ideographic` 基线不需要考虑下行字母。 | DOMString |

#### 示例

```html
<canvas id="canvas"></canvas>
```

```js
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.font = "48px serif";

// 设置文本基线
ctx.textBaseline = "hanging";

ctx.strokeText("Hello world", 0, 100);
```
### direction

`CanvasRenderingContext2D.direction` 用以设置绘制文本时文本方向的属性。

### 语法

```js
context.direction = value
```

| 值      | 说明                                            | 类型      |
| ------- | ----------------------------------------------- | --------- |
| value   | 文本方向从左向右。                              | DOMString |
| rtl     | 文本方向从右向左。                              | DOMString |
| inherit | 根据情况继承 Canvas 元素或者 Document。默认值。 | DOMString |

#### 示例

```html
<canvas id="canvas"></canvas>
```

```js
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.font = "48px serif";

// 设置文本方向
ctx.direction = "ltr";

ctx.strokeText("Hello world", 0, 100);
```