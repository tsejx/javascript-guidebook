## 阴影 Shadows

绘制线段的相关样式属性及方法共有四种：

- [shadowblur](#shadowblur)
- [shadowColor](#shadowcolor)
- [shadowOffsetX](#shadowoffsetx)
- [shadowOffsetY](#shadowoffsety)

### shadowblur

`CanvasRenderingContext2d.shadowBlur` 属性设置或返回阴影的模糊级数。

#### 语法

```js
context.shadowBlur = level;
```

| 值    | 说明                                                         | 类型   | 默认值 |
| ----- | ------------------------------------------------------------ | ------ | ------ |
| level | 描述模糊效果程度的，float 类型的值。负数、 `Infinity` 或者 `NaN` 都会被忽略。 | string | 0      |

#### 示例

```html
<canvas id="canvas"></canvas>
```

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.shadowColor = "black";
ctx.shadowBlur = 10;

ctx.fillStyle = "white";
ctx.fillRect(10, 10, 100, 100);
```

### shadowColor

`CanvasRenderingContext2d.shadowColor` 属性设置或返回用于阴影的颜色。

请将 `shadowColor` 属性与 `shadowBlur` 属性一起使用，来创建阴影。

请通过使用 `shadowOffsetX` 与 `shadowOffsetY` 属性来调节阴影效果。

#### 语法

```js
context.shadowColor = color;
```

| 值    | 说明                                              | 类型   | 默认值 |
| ----- | ------------------------------------------------- | ------ | ------ |
| color | 可以转换成 CSS `<color>` 值的 `DOMString字符串`。 | string | -      |

#### 示例

```html
<canvas id="canvas"></canvas>
```

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.shadowColor = "black";
ctx.shadowOffsetY = 10;
ctx.shadowOffsetX = 10;

ctx.fillStyle = "green";
ctx.fillRect(10, 10, 100, 100);
```
### shadowOffsetX

`CanvasRenderingContext2D.shadowOffsetX` 属性设置或返回形状与阴影的水平距离。

`shadowOffsetX = 0` 指示阴影位于形状的正下方。

`shadowOffsetX = 20` 指示阴影位于形状 left 位置右侧的 20 像素处。

`shadowOffsetX = -20` 指示阴影位于形状 left 位置左侧的 20 像素处。

如需调整距离形状的垂直位置，请使用 [shadowOffsetY](#shadowoffsety) 属性。

#### 语法

```js
context.shadowOffset = offset;
```

| 值     | 说明                                                         | 类型   | 默认值 |
| ------ | ------------------------------------------------------------ | ------ | ------ |
| offset | 正值或负值，定义阴影与形状的水平距离。  `Infinity` 或者 `NaN` 都会被忽略。 | string | 0      |

#### 示例

```html
<canvas id="canvas"></canvas>
```

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.shadowColor = "black";
ctx.shadowOffsetX = 10;
ctx.shadowBlur = 10;

ctx.fillStyle = "green";
ctx.fillRect(10, 10, 100, 100);
```
### shadowOffsetY

`CanvasRenderingContext2D.offsetY` 属性设置或返回形状与阴影的垂直距离。

`shadowOffsetY = 0` 指示阴影位于形状的正下方。

`shadowOffsetY = 20` 指示阴影位于形状 top 位置下方的 20 像素处。

`shadowOffsetY = -20` 指示阴影位于形状 top 位置上方的 20 像素处。

提示：如需调整距离形状的水平位置，请使用 [shadowOffsetX](#shadowoffsetx) 属性。

#### 语法

```js
context.shadowOffsetY = offset;
```

| 值     | 说明                                                         | 类型   | 默认值 |
| ------ | ------------------------------------------------------------ | ------ | ------ |
| offset | 正值或负值，定义阴影与形状的垂直距离。  `Infinity` 或者`NaN` 都会被忽略。 | string | 0      |

#### 示例

```html
<canvas id="canvas"></canvas>
```

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.shadowColor = "black";
ctx.shadowOffsetY = 10;
ctx.shadowBlur = 10;

ctx.fillStyle = "green";
ctx.fillRect(10, 10, 100, 100);
```