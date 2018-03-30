# CanvasRenderingContext2D

`CanvasRenderingContext2D` 接口提供的2D渲染背景用来绘制 `<canvas>` 元素，为了获得这个接口的对象，需要在 `<canvas>` 上调用 `getContext()`，并提供一个 "2d" 的参数：

```javascript
const canvas = document.getElementById('tutorial');
const ctx = canvas.getContext('2d');
```

一旦你得到 2D 渲染背景后，你可以像下面一样绘制：

```javascript
ctx.fillStyle = 'rgba(200, 0, 0)';
ctx.fillRect(10, 10, 55, 50);
```

## 绘制矩形

 - `CanvasRenderingContext2D.clearRect(x, y, width, height)`

设置指定矩形区域内（以点(x, y)为起点，范围是(width, height)）所有像素变成透明，并擦除之前绘所有内容。

  - `CanvasRenderingContext2D.fillRect(x, y, width, height)`

绘制填充矩形，矩形的起点在(x, y)位置，矩形的尺寸是 width 和 height

  - `CanvasRenderingContext2D.strokeRect(x, y, width, height)`

在 canvas 中，使用当前的绘画样式，描绘一个起点在(x, y)，宽度为 width，高度为height 的矩形。

## 绘制文本

 - `CanvasRenderingContext2D.fillText(text, x, y [, maxWidth])`

在 (x, y) 位置绘制（填充）文本 text，可对文本进行缩放以适应最大宽度 maxWidth

 - `CanvasRenderingContext2D.strokeText(text, x, y [, maxWidth])`
     
在 (x, y) 位置绘制（描边）文本 text，可对文本进行缩放以适应最大宽度 maxWidth

 - `CanvasRenderingContext2D.mesureText(text)`

返回一个 `TextMetrics` 对象，包含关于文本尺寸的信息（例如文本的宽度）。
 
## 线型

 - `CanvasRenderingContext2D.lineWidth`
线的宽度，默认为1

 - `CanvasRenderingContext2D.lineCap`
线末端的类ing，允许值：`butt`（默认）,`round`,`square`

 - `CanvaseRenderinfContext2D.lineJoin`
定义两线相交拐点的类型，允许值：`round`,`bevel`,`miter`（默认）

 - `CanvasRenderingContext2D.miterLimit`
斜截面限制比例，默认为10

 - `CanvasRenderingContext2D.getLineDash()`
获取当前线段样式的数组，数组包含一组数量为偶数的非负数数字。

 - `CanvasRenderingContext2D.setLineDash(segments)`
设置当前的线段样式

 - `CanvasRenderingContext2D.lineDashOffset`
 描述在哪里开始绘制线段


## 文本样式

 - `CanvasRenderingContext2D.font`
字体设置，默认 `10px sans-serif`

 - `CanvasRenderingContext2D.textAlign`
文本对齐设置。允许值：`start`（默认）,`end`,`left`,`right`或`center`

 - `CanvasRenderingContext2D.textBaseline`
基线对齐设置。允许值：`top`,`hanging`,`middle`,`alphabetic`（默认）,`ideographic`,`bottom`

 - `CanvasRenderingContext2D.direction`
文本的方向。允许值：`ltr`,`rtl`,`inherit`（默认）


## 填充和描边样式

 - `CanvasRenderingContext2D.fillStyle`
图形内部的颜色和样式。默认 `#000`（黑色）

 - `CanvasRenderingContext2D.strokeStyle`
图形边线的颜色和样式。默认 `#000`（黑色）


## 渐变和图案

 - `CanvasRenderingContext2D.createLinearGradiernt(x0, y0, x1, y1)`
创建一个沿着参数坐标指定的线的线性渐变。x0为起点的x轴坐标，y0为起点的y轴坐标，x1为终点的x轴坐标，y1为终点的y轴坐标。

 - `CanvasRenderingContext2D.createRadialGradient(x0, y0, r0, x1, y1, r1)`
创建一个沿着参数坐标指定的线的放射性渐变。x0为开始圆形的x轴坐标，y0为开始圆形的y轴坐标，r0为开始圆形的半径，x1为结束圆形的x轴坐标，y1为结束圆形的y轴坐标，r1为结束圆形的半径。

 - `CanvasRenderingContext2D.createPattern(image, repetition)`
使用指定的图片（`CanvasImageSource`）创建图案。通过 repetition 变量指定的方向上重复源图片。此方法返回 `CanvasPattern` 对象。


## 阴影

 - `CanvasRenderingContext.shadowBlur`
描述模糊效果。默认 0

 - `CanvasRenderingContext.shadowColor`
 阴影的颜色。默认 `full-transparent black`

 - `CanvasRenderingContext.shadowOffsetX`
阴影水平方向的偏移量。默认 0

 - `CanvasRenderingContext.shdowOffsetY`
阴影垂直方向的偏移量。默认 0

  
## 路径

 - `CanvasRenderingContext2D.beginPath()`
清空子路径列表开始一个新的路径。当你想创建一个新的路径时，调用此方法。

 - `CanvasRenderingContext2D.closePath()`
使笔点返回到当前子路径的起始点。它尝试从从当前点到起始点绘制一条直线。如果图形已经是封闭或者只有一个点，那么此方法不会做任何操作。

 - `CanvasRenderingContext2D.moveTo(x, y)`
将一个新的子路径的起始点移动到 (x, y) 坐标。

 - `CanvasRenderingContext2D.lineTo(x, y)`
使用直线连接子路径的最后的点到 x,y 坐标。

 - `CanvasRenderingContext2D.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)`
添加一个3次贝赛尔曲线路径。该方法需要三个点。 第一(cp1x, cp1y)、第二个点(cp2x, cp2y)是控制点，第三个点是结束点 (x, y)。起始点是当前路径的最后一个点，绘制贝赛尔曲线前，可以通过调用 `moveTo()` 进行修改。

 - `CanvasRenderingContext2D.quadraticCurveTo(cpx, cpy, x, y)`
添加一个2次贝塞尔曲线路径。（cpx和cpy分别为控制点x y坐标；x和y分别为终点的x y坐标）

 - `CanvasRenderingContext2D.arc(x, y, radius, startAngle, endAngle, anticlockwise)`
绘制一段圆弧路径，圆弧路径的圆心在(x, y)位置，半径为 r，根据 anticlockwise （默认为顺时针`false`）指定的方向从 startAngle 开始绘制，到 endAngle 结束。

 - `CanvasRenderingContext2D.arcTo(x1, y1, x2, y2, radius)`
根据控制点和半径绘制圆弧路径，使用当前的描点(前一个moveTo或lineTo等函数的止点)。根据当前描点与给定的控制点1连接的直线，和控制点1与控制点2连接的直线，作为使用指定半径的圆的切线，画出两条切线之间的弧线路径。

 - `CanvasRenderingContext2D.ellipse(x1, y1, x2, y2, radius)`
根据控制点和半径绘制圆弧路径，椭圆的圆心在 (x, y) 位置，半径分别是 radiusX 和 radiusY，按照 anticlockwise （默认顺时针）指定的方向，从 startAngle 开始绘制，到 endAngle 结束。

 - `CanvasRenderingContext2D.rect(x, y, width, height)`
创建一个矩形路径，矩形起点位置是 (x, y)，尺寸为 width和height。

  
## 绘制路径

 - `CanvasRenderingContext2D.fill(path, fillRule)`
根据当前的填充样式，填充当前或已存在的路径的方法。采取非零环绕或者奇偶环绕规则。path为需要填充的 Path2D路径，fillRule为一种算法，决定点是在路径内还是在路径外。

 - `CanvasRenderingContext2D.stroke(path)`
使用非零环绕规则，根据当前的画线样式，绘制当前或已存在的路径的方法。

 - `CanvasRenderingContext2D.drawFocusIfNeeded(path, element)`
如果给定的元素获取了焦点，那么此方法会在当前的路径绘制一个焦点。

 - `CanvasRenderingContext2D.scrollPathIntoView()`
将当前或给定的路径滚动到窗口。

 - `CanvasRenderingContext2D.clip(path, fullRule)`
从当前路径创建一个剪切路径。在 `Clip()` 调用之后，绘制的所有信息只会出现在剪切路径内部。

 - `CanvasRenderingContext2D.isPointInPath(path, x, y, fillRule)`
用于判断在当前路径中是否包含检测点的方法。

 - `CanvasRenderingContext2D.isPointInStroke(path, x, y)`
用于检测某点是否在路径的描边线上的方法。x和y是监测点的横纵坐标，path为Path2D路径


## 变换

在 CanvasRenderingContext2D 渲染背景中的对象会有一个当前的变换矩阵，一些方法可以对其进行控制。当创建当前的默认路径，绘制文本、图形和 `Path2D` 对象的时候，会应用此变换矩阵。下面列出的方法保持历史和兼容性的原因，是为了 `SVGMatrix` 对象现在能够应用于大部分 API ，将来会被替换。

 - `CanvasRenderingContext2D.currentTransform`
当前的变换矩阵 (SVGMatrix 对象)。

 - `CanvasRenderingContext2D.rotate(angle)`
在变换矩阵中增加旋转，angle角度变量表示一个顺时针旋转角度并且用弧度表示(`degree * Math.PI / 180`)。旋转中心一直是canvas的起始点，如果想改变中心点，我们可以通过`translate()`方法移动canvas。

 - `CanvasRenderingContext2D.scale(x, y)`
根据 x 水平方向和 y 垂直方向，为canvas 单位添加缩放变换的方法。

 - `CanvasRenderingContext2D.translate(x, y)`
通过在网格中移动 canvas 和 canvas 原点 x 水平方向、原点 y 垂直方向，添加平移变换

 - `CanvasRenderingContext2D.transform(a, b, c, d, e, f)`
使用矩阵多次叠加当前变换的方法，矩阵由方法的参数进行描述。你可以缩放、旋转、移动和倾斜上下文。a为水平缩放，b为水平倾斜，c为垂直倾斜，d为垂直缩放，e为水平移动，f为垂直移动。

 - `CanvasRenderingContext2D.setTransform(a, b, c, d, e, f)`
重新设置当前的变换为单位矩阵，并使用同样的变量调用 `transform()` 方法。a为水平缩放，b为水平倾斜，c为垂直倾斜，d为垂直缩放，e为水平移动，f为垂直移动。

 - `CanvasRenderingContext2D.resetTransform()`
使用单位矩阵重新设置当前的变换。


## 合成

 - `CanvasRenderingContext2D.globalAlpha`
在合成到 canvas 之前，设置图形和图像透明度的值。默认 1（不透明）

 - `CanvasRenderingContext2D.globalCompositeOperation`
通过 `globalAlpha` 应用，设置如何在已经存在的位图上绘制图形和图像。


## 绘制图像

 - `CanvasRenderingContext2D.drawImage(image, dx, dy)`
 - `CanvasRenderingContext2D.drawImage(image, dx, dy, dWidth, dHeight)`
 - `CavansRenderingContext2D.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)`
绘制指定的图片。该方法有多种格式，提供了很大的使用灵活性。image为绘制到上下文的元素，允许任何的canvas图像源：HTMLImageElement、HEMLVideoElement或者HTMLCanvasElement；dx和dy为目标画布的左上角在目标canvas上X轴和Y轴的位置；dWidth和dHeight为在目标画布上绘制图像的宽度和高度；sx和sy分别为需要绘制到目标上下文中的，源图像的矩形选择框的左上角X坐标和Y坐标；sWidth和sHeight分别为需要绘制到目标上下文的，源图像的矩形选择框的宽度和高度，如果不说明，整个矩形从坐标的sx和sy开始，到图像的右下角结束。


## 像素控制

参见 `ImageData` 对象

 - `CanvasRenderingContext2D.createImageData(width, height)`
 - `CanvasRenderingContext2D.createImageData(imagedata)`
使用指定的尺寸，创建一个新的、空白的 `ImageData` 对象。所有的像素在新对象中都是透明的。width为ImageData新对象的宽度；height为ImageData新对象的高度；imagedata为从现有的ImageData对象中，复制一个和其宽度和高度相同的对象。图像自身不允许被复制。

 - `CanvasRenderingContext2D.getImgaeData(sx, sy, sw, sh)`
返回一个 `ImageData`对象，用来描述 Canvas区域隐含的像素数据，这个区域通过矩形表示，起始点为 (sx, sy)、宽为sw、高为sh。

 - `CanvasRenderingContext2D.putImageData(iamgedata, dx, dy)`
 - `CanvasRenderingContext2D.putImageData(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight)`
将数据从已有的 `ImageData` 绘制到位图上。如果提供了脏矩形，只能绘制矩形的像素。imageData包含像素值的数组对象；dx和dy为源图像数据在目标画布中的位置偏移量，X轴和Y轴方向的偏移量；dirtyX和dirtyY为在源图像数据中，矩形区域左上角的位置，默认是整个图像数据的左上角X坐标和Y坐标；dirtyWidth和dirtyHeight为在源图像数据中，矩形区域的宽度和高度，默认是图像数据的宽度和高度。
 

## 图像平滑

 - `CanvasRenderingContext2D.imageSmoothingEnabled`
图像平滑的方式；如果禁用，缩放时，图像不会被平滑处理。

## 状态

CanvasRenderingContext2D渲染环境包含了多种绘图的样式状态（属性有线的样式、填充样式、阴影样式、文本样式）。下面的方法会帮助你使用这些状态：

 - `CanvasRenderingContext2D.save()`
使用栈保存当前的绘画样式状态，你可以使用 `restore()` 恢复任何改变。

 - `CanvasRenderingContext2D.restore()`
恢复到最近的绘制样式状态，此状态是通过 `save()` 保存到”状态栈“中最新的元素。

 - `CanvasRenderingContext2D.canvas`
对 HTMLCanvasElement 只读的反向引用。如果和 `<canvas>` 元素没有联系，可能为 `null`。

## 点击区域

 - `CanvasRenderingContext2D.addHitRegion()`
 给 canvas 添加点击区域。

 - `CanvasRenderingContext2D.removeHitRegion()`
 从 canvas 中删除指定 id 的点击区域。

 - `CanvasRenderingContext2D.clearHitRegion()`
 从 canvas 中删除所有的点击区域。