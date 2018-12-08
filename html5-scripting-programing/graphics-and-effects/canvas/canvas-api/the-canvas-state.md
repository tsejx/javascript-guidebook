## Canvas 状态操作

CanvasRenderingContext2D 渲染环境包含了多种绘图的样式状态（属性有线的样式、填充样式、阴影样式、文本样式）。通过下面的方法能帮助你使用这些状态：

- [save()](#save)
- [restore](#restore)

### Canvas 状态的保存和恢复

Canvas 的 API 提供了两个名叫 `save()` 和 `restore()` 的方法，用于保存及恢复当前 Canvas 绘画环境的所有属性。其中 `save()` 可以保存当前状态，而 `restore()` 可以还原之前保存的状态。

这两个方法在绘图中有着重要的作用，比如我们在绘图的时候需要使用多种颜色，颜色需要不时的切换。那么使用 `save()` 和 `restore()` 方法即可比较方便地实现此功能。

### save()

`CanvasRenderingContxt2D.save()` 是 Canvas 2D API 通过将当前状态放入栈中，保存 Canvas 全部状态的方法。

#### 语法

```js
ctx.save()
```

#### 示例

```html
<canvas id="canvas"></canvas>
```

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.save(); 	// 保存默认的状态

ctx.fillStyle = "green";
ctx.fillRect(10, 10, 100, 100);

ctx.restore(); 	// 还原到上次保存的默认状态
ctx.fillRect(150, 75, 100, 100);
```

### restore()

`CanvasRenderingContxt2D.restore()` 是 Canvas 2D API 通过在绘图状态栈中弹出顶端的状态，将 canvas 恢复到最近的保存状态的方法。 如果没有保存状态，此方法不做任何改变。

#### 语法

```js
ctx.restore()
```

#### 示例

```html
<canvas id="canvas"></canvas>
```

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.save();			// 保存默认的状态

ctx.fillStyle = "green";
ctx.fillRect(10, 10, 100, 100);

ctx.restore();		// 还原到上次保存的默认状态
ctx.fillRect(150, 75, 100, 100);
```

### Canvas 中的状态和非状态

在Canvas环境中绘图时，可以利用所谓的绘图堆栈状态。每个状态随时存储Canvas上下文数据。下面是存储在状态堆栈的数据列表。

- 当前的坐标变换（变换矩阵）信息，比如旋转或平移时使用的 `rotate()` 和 `setTransform()` 方法
- 当前剪贴区域
- 图形上下文对象（`CanvasRenderingContext2D`）的当前属性值

`CanvasRenderingConext2D` 的当前属性值主要包括：

| 属性                     | 描述                                                         |
| ------------------------ | ------------------------------------------------------------ |
| canvas                   | 取得画布 `<canvas>` 元素                                     |
| fillStyle                | 填充路径的当前的颜色、模式或渐变                             |
| globalCompositeOperation | 指定颜色如何与画布上已有颜色组合（合成）                     |
| lineCap                  | 指定线段端点的绘制方式                                       |
| lineJoin                 | 指定线段端点的绘制方式                                       |
| lineWidth                | 绘制线段的宽度                                               |
| miterLimit               | 当 lineJoin 为 miter 时，这个属性指定斜连接长度和二分之一线宽的最大比率 |
| shadowBlur               | 指定阴影模糊度                                               |
| shadowColor              | 指定阴影颜色                                                 |
| shadowOffsetX            | 指定阴影水平偏移值                                           |
| shadowOffsetY            | 指定阴影垂直偏移值                                           |
| strokeStyle              | 指定线段颜色                                                 |

上面是 Canvas 绘图中的状态，那么什么情形不属于 Canvas 状态。

在 Canvas 中当前路径和当前位图受 Canvas 环境控制，不属于保存状态。这个重要的功能允许在画布上对单个对象进行绘画和制作动画。

> `save()` 和 `restore()` 方法允许你保存和恢复一个 `CanvasRenderingContext2D` 对象的状态。`save()` 把当前状态推入到绘图堆栈中，而 `restore()` 从绘图堆栈中的顶端弹出最近保存的状态，并且根据这些存储的值来设置当前绘图状态。

简单来说，`save()` 主要用来保存目前 Canvas 的状态，例如 `lineWidth`、`fillStyle` 、`lineJoin` 等，通过 `save()` 函数它会将目前 Canvas 的状态推到绘图堆栈中；而 `restore()` 函数就是从绘图堆栈中弹出上一个 Canvas 的状态。

### 实例：制作一个扇形

在实际使用当中，`save()` 和 `restore()` 的使用还是非常广泛的，特别是涉及到坐标系统的变换和图形变换方面。

```js
// ctx: Canvs绘图环境
// x,y: 位移目标点
// r: 圆弧半径
// sDeg: 旋转起始角度
// eDeg: 旋转终点角度

function drawSector(ctx, x, y, r, sDeg, eDeg) {
    // 初始保存
    ctx.save()
    
    // 位移到目标点
    ctx.translate(x, y);
    ctx.beginPath();
    
    // 画出圆弧
    ctx.arc(0, 0, r, sDeg, eDeg);
    
    // 再次保存以备旋转
    ctx.save();
    
    // 旋转至起始角度
    ctx.rotate(eDeg);
    
    // 移动到终点，准备连接终点与圆心
    ctx.moveTo(r, 0)
    
    // 连接到圆心
    ctx.lineTo(0, 0)
    
    // 还原
    ctx.restore();
    
    //旋转至起点角度
    ctx.rotate(sDeg);
  
    // 从圆心连接到起点
    ctx.lineTo(r, 0);
    
    ctx.cloasePath();
    
    // 还原到最初保存的状态
    ctx.restore();
}
```

然后调用这个封装函数：

```js
function drawScreen () { 
    var deg = Math.PI / 180; 
    var obj = { 
        x: 300, 
        y: 150, 
        r: 80, 
        sDeg: [30, 111, 190, 233, 280, 345], 
        eDeg: [111, 190, 233, 280, 345, 30], 
        style: ['#f00', '#0f0', '#00f', '#789', '#abcdef'] 
    } 
    for (var i = 0; i < obj.sDeg.length; i++) { 
        drawSector(ctx,obj.x, obj.y, obj.r, obj.sDeg[i] * deg, obj.eDeg[i] * deg); 
        ctx.fill(); 
        ctx.fillStyle = obj.style[i]; 
    } 
}
```

---

参考资料：

- [Canvas学习：save()和restore()](https://www.w3cplus.com/canvas/canvas-states.html)