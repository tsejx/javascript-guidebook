## 绘制路径

绘制路径的相关方法共有四种：

- [fill()](#fill)
- [stroke()](#stroke)
- [drawFocusIfNeeded()](#drawfocusIfneeded)
- [scrollPathIntoView()](#scrollpathIntoview)
- [clip()](#clip)
- [isPointInPath()](#ispointInpath)
- [isPointInStroke()](#ispointInstroke)

### fill()

`CanvasRenderingContext2D.fill()` 方法用以根据当前的填充样式，填充当前或已存在的路径的方法。采取非零环绕或者奇偶环绕规则。

#### 语法

```js
void ctx.fill()
void ctx.fill(fillRule)
void ctx.fill(path, fillRule)
```

| 参数     | 说明                                                         | 类型          |
| -------- | ------------------------------------------------------------ | ------------- |
| fillRule | 一种决定点在路径内还是路径外的算法：`nonzero`（非零环绕规则，默认规则）`evenodd`（奇偶环绕规则） | string        |
| path     | 需要填充的 Path2D 路径                                       | Path2D object |

#### 示例

```html
<canvas id="canvas"></canvas>
```

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.rect(10, 10, 100, 100);

// 填充路径
ctx.fill();
```

### stroke()

`CanvasRenderingContext2D.stroke()` 使用非零环绕规则，根据当前的画线样式，绘制当前或已经存在的路径的方法。

#### 语法

```js
void ctx.stroke()
void ctx.stroke(path)
```

| 属性 | 说明              | 类型          |
| ---- | ----------------- | ------------- |
| path | 绘制的路径 Path2D | Path2D object |

#### 示例

```html
<canvas id="canvas"></canvas>
```

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.rect(10, 10, 100, 100);
ctx.stroke();
```
### drawFocusIfNeeded()

`CanvasRenderingContext2D.drawFocusIfNedded()` 用以给当前路径或特定路径绘制焦点的方法，如果给定的元素获取了焦点。

#### 语法

```js
void ctx.drawFocusIfNeeded(element);
void ctx.drawFocusIfNeeded(path, element);
```

| 属性    | 说明                   | 类型          |
| ------- | ---------------------- | ------------- |
| element | 是否需要设置焦点的元素 | HTMLElement   |
| path    | Path2D 路径            | Path2D object |

#### 示例

```html
<canvas id="canvas">
	<input id="button" type="range" min="1" max="12" />
</canvas>
```

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const button = document.getElementById("button");

button.focus();

ctx.beginPath();
ctx.rect(10, 10, 30, 30);
ctx.drawFocusIfNeeded(button);
```

### scrollPathIntoView()

> ⚗️这是一个实验中的功能

`CanvasRenderingContext2D.scrollPathIntoView()` 方法用以将当前或给定的路径滚动到窗口。

#### 语法

```js
void ctx.scrollPathIntoView()
void ctx.scrollPathIntoView(path)
```

| 参数 | 说明        | 类型          |
| ---- | ----------- | ------------- |
| path | Path2D 路径 | Path2D object |

#### 示例

``` html
<canvas id="canvas"></canvas>
```

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.fillRect(10, 10, 30, 30);
ctx.scrollPathIntoView();
```

#### clip()

`CanvasRenderingContext2D.clip()` 用以将当前创建的路径设置为当前剪切路径的方法。

#### 语法

```js
void ctx.clip();
void ctx.clip(fillRule);
void ctx.clip(path, fillRule);
```

| 参数     | 说明                                                         | 类型          |
| -------- | ------------------------------------------------------------ | ------------- |
| fillRule | 一种决定点在路径内还是路径外的算法：`nonzero`（非零环绕规则，默认规则）`evenodd`（奇偶环绕规则） | string        |
| path     | 需要剪切的 Path2D 路径                                       | Path2D object |

#### 示例

```html
<canvas id="canvas"></canvas>
```

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Create clipping region
ctx.arc(100, 100, 75, 0, Math.PI*2, false);
ctx.clip();

ctx.fillRect(0, 0, 100,100);
```

### isPointInPath()

`CanvasRenderingContext2D.isPointInPath()` 用以判断在当前路径中是否包含检测点的方法**。**

#### 语法

```js
boolean ctx.isPointInPath(x, y);
boolean ctx.isPointInPath(x, y, fillRule);

boolean ctx.isPointInPath(path, x, y);
boolean ctx.isPointInPath(path, x, y, fillRule);
```

| 参数     | 说明                                                         | 类型          |
| -------- | ------------------------------------------------------------ | ------------- |
| x        | 监测点的横坐标                                               | number        |
| y        | 监测点的纵坐标                                               | number        |
| fillRule | 一种决定点在路径内还是路径外的算法：`nonzero`（非零环绕规则，默认规则）`evenodd`（奇偶环绕规则） | fillRule      |
| path     | Path2d 应用的对象                                            | Path2D object |

返回值：布尔值，当检测点包含在当前或指定的路径内，返回 `true`；否则返回 `false`。

#### 示例

```html
<canvas id="canvas"></canvas>
```

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.rect(10, 10, 100, 100);
ctx.stroke();
console.log(ctx.isPointInPath(10, 10)); // true
```

### isPointInStroke()

`CanvasRenderingContext.isPointInStroke()` 用于检测某点是否在路径的描边线上的方法。

#### 语法

```js
boolean ctx.isPointInStroke(x, y);
boolean ctx.isPointInStroke(path, x, y);
```

| 参数 | 说明           | 类型          |
| ---- | -------------- | ------------- |
| x    | 监测点的横坐标 | number        |
| y    | 监测点的纵坐标 | number        |
| path | Path2D 的路径  | Path2D object |

#### 示例

```html
<canvs id="canvas"></canvas>
```

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.rect(10, 10, 100, 100);
ctx.stroke();
console.log(ctx.isPointInStroke(10, 10)); // true
```

