## 色彩 Colors

Canvas 中使用样式与颜色通过两种属性设置：

- [fillStyle](#fillstyle)
- [strokeStyle](#strokestyle)

### fillStyle

`CanvasRenderingContext2D.fillStyle` 属性用于设置填充图形的颜色、渐变或模式。

#### 语法

```js
context.fillStyle = color || gradient || pattern;
```

| 值       | 说明                                                         | 类型           | 默认值    |
| -------- | ------------------------------------------------------------ | -------------- | --------- |
| color    | 指示绘画笔触的 CSS 颜色值。                                  | DOMString      | `#000000` |
| gradient | 用于填充绘画的渐变对象（[线性](gradients.md)或[放射性](gradients.md))。 | CanvasGradient | -         |
| pattern  | 用于创建 Pattern 笔触的 Pattern 对象。                       | CanvasPattern  | -         |

#### 示例

`fillStyle` 需要在 `fillRect()` 之前设置，可以理解为，先选好颜色再画图（就像画画要先选好画笔颜色才能开始画图）。

```html
<canvas id="canvas"></canvas>
```

```js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = "blue";
ctx.fillRect(10, 10, 100, 100);
```

#### 实例：绘制方格列阵

```js
function draw() {
  const ctx = document.getElementById('canvas').getContext('2d');
  for (let i = 0; i < 6; i++){
    for (let j = 0;j < 6; j++){
      ctx.fillStyle = 'rgb(' + Math.floor(255-42.5*i) + ',' +
                       Math.floor(255-42.5*j) + ',0)';
      ctx.fillRect(j*25,i*25,25,25);
    }
  }
}
```

### strokeStyle

`CanvasRenderingContext2D.strokeStyle` 属性用于设置笔触的颜色、渐变或模式。

#### 语法

```js
context.strokeStyle = color || gradient || pattern;
```

| 值       | 说明                                                         | 类型           | 默认值    |
| -------- | ------------------------------------------------------------ | -------------- | --------- |
| color    | 指示绘画笔触的 CSS 颜色值。                                  | DOMString      | `#000000` |
| gradient | 用于填充绘画的渐变对象（[线性](gradients.md)或[放射性](gradients.md))。 | CanvasGradient | -         |
| pattern  | 用于创建 Pattern 笔触的 Pattern 对象。                       | CanvasPattern  | -         |


> ⚠️注意：一旦您设置了 `strokeStyle` 或者 `fillStyle` 的值，那么这个新值就会成为新绘制的图形的默认值。如果你要给每个图形上不同的颜色，你需要重新设置 `fillStyle` 或 `strokeStyle` 的值。


#### 示例

```html
<canvas id="canvas"></canvas>
```

```js
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.strokeStyle = "blue";
ctx.strokeRect(10, 10, 100, 100);
```

#### 实例：绘制圆形方格列阵

```js
function draw() {
    const ctx = document.getElementById('canvas').getContext('2d');
    for (let i = 0; i < 6; i++){
      for (let j = 0; j < 6; j++){
        ctx.strokeStyle = 'rgb(0,' + Math.floor(255-42.5*i) + ',' +
                         Math.floor(255-42.5*j) + ')';
        ctx.beginPath();
        ctx.arc(12.5+j*25,12.5+i*25,10,0,Math.PI*2,true);
        ctx.stroke();
      }
    }
  }
```