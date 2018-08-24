## 绘制矩形

绘制矩形的相关方法共有四种：

- [rect()](#rect)
- [fillRect()](#fillRect)
- [strokeRect()](#strokeRect)
- [clearRect()](#clearRect)

### rect()

`CanvasRenderingContext2D.rect` 通过设置矩形起点`(x, y)`，尺寸 `width` 和 `height` ，以创建矩形路径的方法。此方法仅绘制矩形，调用 `stoke()` 或 `fill()` 后才会真正作用于画布。

### 语法

```js
void ctx.rect(x, y, width, height);
```

| 参数   | 说明             | 类型   |
| ------ | ---------------- | ------ |
| x      | 矩形起点的横坐标 | number |
| y      | 矩形起点的纵坐标 | number |
| width  | 矩形的宽度       | number |
| height | 矩形的高度       | number |

#### 示例

```js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.rect(10, 10, 100, 100);
ctx.fill();
```

### fillRect()

`CanvasRenderingContext2D.fillRect()` 通过设置矩形起点`(x, y)` ，尺寸 `width` 和 `height` ，以创建矩形路径的方法。绘制出一个有填充颜色的矩形框（默认为黑色）。

#### 语法

```js
void ctx.fiilRect(x, y, width, height);
```

| 参数   | 说明             | 类型   |
| ------ | ---------------- | ------ |
| x      | 矩形起点的横坐标 | number |
| y      | 矩形起点的纵坐标 | number |
| width  | 矩形的宽度       | number |
| height | 矩形的高度       | number |

#### 示例

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "green";
ctx.fillRect(10, 10, 100, 100);
```

### strokeRect()

`CanvasRenderingContext2D.strokeRect()` 方法绘制矩形（不填色），笔触的默认颜色是黑色。

#### 语法

```js
void ctx.strokeRect(x, y, width, height)
```

| 参数   | 说明             | 类型   |
| ------ | ---------------- | ------ |
| x      | 矩形起点的横坐标 | number |
| y      | 矩形起点的纵坐标 | number |
| width  | 矩形的宽度       | number |
| height | 矩形的高度       | number |

#### 示例

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.strokeStyle = "green";
ctx.strokeRect(10, 10, 100, 100);
```

### clearRect()

``CanvasRenderingContext2D.clearRect()` 方法删除一个画布的矩形区域。

#### 语法

```js
void ctx.clearRect(x, y, width, height)
```

| 参数   | 说明             | 类型   |
| ------ | ---------------- | ------ |
| x      | 矩形起点的横坐标 | number |
| y      | 矩形起点的纵坐标 | number |
| width  | 矩形的宽度       | number |
| height | 矩形的高度       | number |

#### 示例

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.moveTo(20,20);
ctx.lineTo(200,20);
ctx.lineTo(120,120);
ctx.closePath(); // draws last line of the triangle
ctx.stroke();

ctx.clearRect(10, 10, 100, 100);
```


