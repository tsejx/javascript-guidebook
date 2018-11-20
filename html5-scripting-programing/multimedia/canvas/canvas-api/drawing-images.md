## 图像绘制

### drawImage()

#### 语法

```js
// 在画布上定位图像
context.drawImage(img, x, y)

// 在画布上定位图像，并规定图像的宽度和高度
context.drawImage(img, x, y, width, height)

// 剪切图像，并在画布上定位被剪切的部分
context.drawImage(img, sx, sy, sWidth, sHeight, x, y, width, height)
```

| 参数    | 说明                                         | 类型   |
| ------- | -------------------------------------------- | ------ |
| img     | 规定要使用的图像、画布或视频。               | number |
| sx      | 可选。开始剪切的 x 坐标位置。                | number |
| sy      | 可选。开始剪切的 y 坐标位置。                | number |
| sWidth  | 可选。被剪切图像的宽度。                     | number |
| sHeight | 可选。被剪切图像的高度。                     | number |
| x       | 在画布上放置图像的 x 坐标位置。              | number |
| y       | 在画布上放置图像的 y 坐标位置。              | number |
| width   | 可选。要使用的图像的宽度。（伸展或缩小图像） | number |
| height  | 可选。要使用的图像的高度。（伸展或缩小图像） | number |

#### 示例

##### 基本绘图

```html
<canvas id="canvas"></canvas>
```

```js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const img = document.getElementById('img');
ctx.drawingImage(img, 10, 10, 240, 160);
```

##### 剪切绘图

```html
<canvas id="canvas"></canvas>
```

```js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const img = document.getElementById('img');
ctx.drawImage(img,90,130,90,80,20,20,90,80);
```

##### 绘制视频

```html
<canvas id="canvas"></canvas>
```

```js
var video = document.getElementById('viedo');
var canvas = document.getElementById('canvas');
context = canvas.getContext('2d');

video.addEventListener('play',function() {
    var i = window.setInterval(function() {
        ctx.drawImage(v,0,0,270,135)},20);
},false);

video.addEventListener('pause',function() {
    window.clearInterval(i);
},false);
video.addEventListener('ended',function() {
    clearInterval(i);
},false);
```

