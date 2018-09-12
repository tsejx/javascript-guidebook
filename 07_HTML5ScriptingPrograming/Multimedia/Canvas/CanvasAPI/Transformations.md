## 变换 Transformations

Canvas 中变换的相关方法共有四种：

- [translate](#fill)
- [rotate](#rotate)
- [scale](#scale)
- [transform](#transform)
- [setTransform](#settransform)
- [resetTransform](resettransform)

### translate

`CanvasRenderingContext2D.translate()` 是 Canvas 2D API 通过在网格中移动 Canvas 和 Canvas 原点水平方向、原点垂直方向，添加平移变换的方法。

#### 语法

```js
context.translate(x, y);
```

| 参数 | 说明               | 类型   |
| ---- | ------------------ | ------ |
| x    | 水平方向的移动距离 | number |
| y    | 垂直方向的移动距离 | number |

#### 示例

```html
<canvas id="canvas"></canvas>
```

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.translate(50, 50);
ctx.fillRect(0,0,100,100);

// reset current transformation matrix to the identity matrix
ctx.setTransform(1, 0, 0, 1, 0, 0);
```

### rotate

`CanvasRenderingContext2D.rotate()` 是 Canvas 2D API 在变换矩阵中增加旋转的方法。角度变量表示一个顺时针旋转角度并且用弧度表示。

#### 语法

```js
context.rotate(angle);
```

| 参数  | 说明                                                         | 类型   |
| ----- | ------------------------------------------------------------ | ------ |
| angle | 顺时针旋转的弧度。如果你想通过角度值计算，可以使用公式： `degree * Math.PI / 180` 。 | number |

旋转中心点一直是 Canvas 的起始点。 如果想改变中心点，我们可以通过 [translate()](#translate) 方法移动 Canvas 。

#### 示例

```html
<cavans id="canvas"></cavans>
```

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.rotate(45 * Math.PI / 180);
ctx.fillRect(70,0,100,30);

// reset current transformation matrix to the identity matrix
ctx.setTransform(1, 0, 0, 1, 0, 0);
```

### scale

`CanvasRenderingContext2D.scale()` 是 Canvas 2D API 根据水平方向和垂直方向，为Canvas 单位添加缩放变换的方法。

默认的， 在 Canvas 中一个单位实际上就是一个像素。例如，如果我们将0.5作为缩放因子，最终的单位会变成0.5像素，并且形状的尺寸会变成原来的一半。相似的方式，我们将2.0作为缩放因子，将会增大单位尺寸变成两个像素。形状的尺寸将会变成原来的两倍。

#### 语法

```js
context.scale(scaleWidth, scaleHeight)
```

| 参数        | 说明                                              | 类型   |
| ----------- | ------------------------------------------------- | ------ |
| scaleWidth  | 缩放当前绘图的宽度 (1=100%，0.5=50%，2=200%，etc) | number |
| scaleHeight | 缩放当前绘图的高度 (1=100%，0.5=50%，2=200%，etc) | number |

如果您对绘图进行缩放，所有之后的绘图也会被缩放。定位也会被缩放。如果您 `scale(2,2)`，那么绘图将定位于距离画布左上角两倍远的位置。

#### 示例

```html
<canvas id="canvas"></canvas>
```

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.scale(10, 3);
ctx.fillRect(10,10,10,10);

// reset current transformation matrix to the identity matrix
ctx.setTransform(1, 0, 0, 1, 0, 0);
```

### transform

`CanvasRenderingContext2D.transform()` 是 Canvas 2D API 使用矩阵多次叠加当前变换的方法，矩阵由方法的参数进行描述。你可以缩放、旋转、移动和倾斜上下文。

#### 语法

```js
context.transform(a, b, c, d, e, f)
```

| 参数 | 说明     | 类型   |
| ---- | -------- | ------ |
| a    | 水平缩放 | number |
| b    | 水平倾斜 | number |
| c    | 垂直倾斜 | number |
| d    | 垂直缩放 | number |
| e    | 水平移动 | number |
| f    | 垂直移动 | number |

画布上的每个对象都拥有一个当前的变换矩阵。

`transform()` 方法替换当前的变换矩阵。它以下面描述的矩阵来操作当前的变换矩阵：

```
a  c  e
b  d  f
0  0  1
```

换句话说，`transform()` 允许您缩放、旋转、移动并倾斜当前的环境。

注释：该变换只会影响 `transform()` 方法调用之后的绘图。

注释：`transform()` 方法的行为相对于由 `rotate()`，`scale()`，`translate()`，`transform()` 完成的其他变换。

例如：如果您已经将绘图设置为放到两倍，则 `transform()` 方法会把绘图放大两倍，您的绘图最终将放大四倍。

#### 示例

```html
<canvas id="canvas"></canvas>
```

```js
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.transform(1,1,0,1,0,0);
ctx.fillRect(0,0,100,100);
```

### setTransform

`CanvasRenderingContext2D.setTransform()` 是 Canvas 2D API 使用单位矩阵重新设置（覆盖）当前的变换并调用变换的方法，此变换由方法的变量进行描述。

#### 语法

```js
context.setTransform(a, b, c, d, e, f)
```

| 参数 | 说明         | 类型   |
| ---- | ------------ | ------ |
| a    | 水平旋转绘图 | number |
| b    | 水平倾斜绘图 | number |
| c    | 垂直倾斜绘图 | number |
| d    | 垂直缩放绘图 | number |
| e    | 水平移动绘图 | number |
| f    | 垂直移动绘图 | number |

#### 示例

```html
<canvas id="canvas"></canvas>
```

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.setTransform(1,1,0,1,0,0);
ctx.fillRect(0,0,100,100);
```

### resetTransform

`CanvasRenderingContext2D.resetTransform()` 是 Canvas 2D API 使用单位矩阵重新设置当前变形的方法。

#### 语法

```js
context.resetTransform()
```

#### 示例

```html
<canvas id="canvas"></canvas>
```

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.rotate(45 * Math.PI / 180);
ctx.fillRect(70,0,100,30);

// reset current transformation matrix to the identity matrix
ctx.resetTransform();
```