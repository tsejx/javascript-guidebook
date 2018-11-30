## 渐变 Gradient

渐变的相关样式属性及方法共有两种，分为线性渐变和径向渐变：

- [createLinearGradient](#createlineargradient)
- [createRadialGradient](#createradialgradient)

### createLinearGradient()

`CanvasRenderingContext2D.createLinearGradient()` 方法用于创建线性的渐变对象。

渐变可用于填充矩形、圆形、线条、文本等等。

- 请使用该对象作为 [`strokeStyle`](Colors.md) 或 [`fillStyle`](Colors.md) 属性的值。
- 请使用 [`addColorStop()`](#addcolorstop) 方法规定不同的颜色，以及在 [CanvasGradient](#canvasgradient) 对象中的何处定位颜色。

#### 语法

```js
context.createLinearGradient(x0, y0, x1, y1);
```

| 参数 | 说明              | 类型   |
| ---- | ----------------- | ------ |
| x0   | 渐变起点的 x 坐标 | number |
| y0   | 渐变起点的 y 坐标 | number |
| x1   | 渐变终点的 x 坐标 | number |
| y1   | 渐变终点的 y 坐标 | number |

通过 `createLinearGradient()` 创建了 `CanvasGradient` 对象，但并没有渐变的颜色，需要通过使用 `CanvasGradient` 对象的唯一一个方法 [`addColorStop`](#addcolorstop) 来定义渐变的颜色。

在 Canvas 中线性渐变常见的有三种：水平的线性渐变、垂直的线性渐变和角度的线性渐变。但不管哪种线性渐变，都是依靠起点 `(x0, y0)` 和终点 `(x1, y1)` 来决定：

- 当起点 `x0` 和终点 `x1` 不同时，将会构造出水平的线性渐变
- 当起点 `y0` 和终点 `y1` 不同时，将会构造出垂直的线性渐变
- 当 `x0` 和 `x1` 以及 `y0` 和 `y1` 都不同时，将会构造出角度的线性渐变，这一点和 CSS 不一样，在 Canvas 中并没有类似 `deg` 这样的方法决定角度线性渐变。

#### 示例

```html
<canvas id="canvas"></canvas>
```

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// 创建线性渐变对象
const gradient = ctx.createLinearGradient(0,0,200,0);

 gradient.addColorStop(0, '#E55D87'); 
 gradient.addColorStop(1, '#5FC3E4');

 context.fillStyle = gradient;
 context.fillRect(0, 0, 400, 300);
```

[🔎在 CodePen 中打开](https://codepen.io/mrsingsing/pen/JaZRmW?editors=1010)

### createRadialGradient()

`CanvasRenderingContext2D.createRadialGradient()` 方法用于创建放射状/圆形渐变对象。

渐变可用于填充矩形、圆形、线条、文本等等。

- 请使用该对象作为 [`strokeStyle`](Colors.md) 或 [`fillStyle`](Colors.md) 属性的值。
- 请使用 [`addColorStop()`](#addcolorstop) 方法规定不同的颜色，以及在 gradient 对象中的何处定位颜色。

#### 语法

```js
context.createRadialGradient(x0, y0, r0, x1, y1, r1);
```

| 参数 | 说明                | 类型   |
| ---- | ------------------- | ------ |
| x0   | 发散开始圆心 x 坐标 | number |
| y0   | 发散开始圆心 y 坐标 | number |
| r0   | 发散开始圆心的半径  | number |
| x1   | 发散结束圆心 x 坐标 | number |
| y1   | 发散结束圆心 y 坐标 | number |
| r1   | 发散结束圆心的半径  | number |

前三个参数描述一个圆（开始圆），后三个参数描述另一个圆（结束圆）。这两个圆本身不仅描述了方向及渐变的起止位置，还描述了渐变的形状。用于描述每个圆有三个参数，`(x,y) `表示圆心位置，`r` 表示圆的半径。

实际的渐变效果时连接两个圆周的锥体，其中开始圆之前的锥体部分显示偏移值 `0` 的颜色，而结束圆之后的锥体部分则显示偏移值为 1 的颜色。

![createRadialGradient](../../../../../images/7/a1e92534-0807-4d2b-b4a2-02bfce5f2710.png)

#### 使用方法

1. 使用 `beginPath()` 宣布开始绘制路径
2. 使用 `createRadialGradient(x0, y0, r0, x1, y1, r1)` 指定圆形渐变
3. 使用 `addColorStop(offset, color)` 追加必要的渐变颜色
4. 使用 `fillStyle()` 方法，把以上指定的渐变内容作为接下来要填充的样式
5. 使用 `arc()` 方法，制作圆
6. 使用 `fill()` 方法填充现有路径

#### 示例

##### 基本用法

```html
<canvas id="canvas"></canvas>
```

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// 创建径向渐变对象
const gradient = ctx.createRadialGradient(100,100,100,100,100,0);

gradient.addColorStop(0,"white");
gradient.addColorStop(1,"green");

ctx.fillStyle = gradient;
ctx.fillRect(0,0,200,200);
```

##### 同心圆径向渐变

```html
<canvas id="canvas"></canvas>
```

```js
 const gradient = context.createRadialGradient(200, 150, 0, 200, 150, 200);

 gradient.addColorStop(0.1, '#F09819');
 gradient.addColorStop(1, '#EDDE5D');

 context.fillStyle = gradient;
 context.beginPath();
 context.arc(200, 150, 100, 0, Math.PI * 2, true);
 context.closePath();
 context.fill();
```

##### 不同圆心的径向渐变

```html
<canvas id="canvas"></canvas>
```

```js
 const gradient = context.createRadialGradient(100, 150, 10, 300, 150, 80);
 gradient.addColorStop(0.1, '#F09819');
 gradient.addColorStop(0.8, 'red');
 gradient.addColorStop(1, '#EDDE5D');

 context.fillStyle = gradient;
 context.fillRect(0, 0, 300, 500);
```

[🔎在 CodePen 中打开](https://codepen.io/mrsingsing/pen/MqXjda?editors=1010)

### CanvasGradient对象

`CanvasGradient` 接口表示描述渐变的不透明对象。

#### 属性

不透明对象，没有透露的属性。

#### 方法

##### addColorStop()

`CanvasGradient.addColorStop()` 方法添加一个由偏移值和颜色值指定的断点到渐变。如果偏移值不在0到1之间，将抛出 `INDEX_SIZE_ERR` 错误，如果颜色值不能被解析为有效的 CSS 颜色值，将抛出 `SYNTAX_ERR` 错误。

```js
void gradient.addColorStop(offset, color);
```

| 参数   | 说明                                | 类型     |
| ------ | ----------------------------------- | -------- |
| offset | 设定的颜色离渐变结束点的偏移量(0~1) | number   |
| color  | 绘制时要使用的颜色                  | CSSColor |

```html
<canvas id="canvas"></canvas>
```

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const gradient = ctx.createLinearGradient(0,0,200,0);

gradient.addColorStop(0,"green");
gradient.addColorStop(1,"white");

ctx.fillStyle = gradient;
ctx.fillRect(10,10,200,100);
```

---

参考资料：

- <a href='https://www.w3cplus.com/canvas/gradient.html' target='_blank'>Canvas学习：渐变</a>
- <a href='https://segmentfault.com/p/1210000010536257/read#top' target='_blank'>一个少女心满满的例子带你入门 canvas</a>