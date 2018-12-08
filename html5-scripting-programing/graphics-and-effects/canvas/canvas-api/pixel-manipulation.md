## 像素控制

Canvas 中像素控制的相关方法共有三种：

- [createImageData()](#createimagedata)
- [getImageData()](getimagedata)
- [putImageData()](putimagedata)

### createImageData()

`CanvasRenderingContext.createImageData()` 方法创建新的空白 ImageData 对象。新对象的默认像素值 transparent black。

#### 语法

- 以指定的尺寸（以像素计）创建新的 ImageData 对象：

```js
ctx.createImageData(width, height)
```

- 创建与制定的有另一个 ImageData 对象尺寸相同的新 ImageData 对象（不会复制图像数据）：

```js
ctx.createImageData(imagedata)
```

| 参数      | 说明                           | 类型   |
| --------- | ------------------------------ | ------ |
| width     | ImageData 对象的宽度，以像素计 | number |
| height    | ImageData 对象的高度，以像素计 | number |
| imageData | 另一个 ImageData 对象          | object |

通过 `createImageData()` 创建的是一个空的 ImageData 对象，必须要针对其像素进行赋值才能显示到 Canvas 画板上。

对于 ImageData 对象中的每个像素，都存在着四方面的信息，即 RGBA 值：

R - 红色（0-255）

G - 绿色（0-255）

B - 蓝色（0-255）

A - alpha 通道（0-255；0 是透明，255是完全可见）

color/alpha 信息以数组形式存在，并且由于数组白喊了每个像素的四条信息，所以数组的大小是 ImageData 对象的四倍：`width*height*4`。（获得数组大小有更简单的办法，就是使用 ImageDataObject.data.length）

包含 color/alpha 信息的数组存储于 ImageData 对象的 data 属性中。

提示：在操作完成数组中的 color/alpha 信息之后，您可以使用 [putImageData()](#putimagedata) 方法将图像数据拷贝回画布上。

#### 示例

```html
<canvas id='canvas'></canvas>
```

```js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const imgData = ctx.createImageData(100, 100);

for(let i = 0;i < imgData.data.length; i+=4){
    imgData.data[i+0] = 255;
    imgData.data[i+1] = 0;
    imgData.data[i+2] = 0;
    imgData.data[i+3= = 255;
}

ctx.putImage(imgData, 10, 10)
```

### getImageData()

`CanvasRenderingContext.getImageData()` 方法获取 ImageData 对象，该对象包含指定的 ImageData 对象的图像数据。

#### 语法

```js
ctx.getImageData(x, y, width, height)
```

| 参数   | 说明                                              | 类型   |
| ------ | ------------------------------------------------- | ------ |
| x      | 将要被提取的图像数据矩形区域的左上角位置的 x 坐标 | number |
| y      | 将要被提取的图像数据矩形区域的左上角位置的 y 坐标 | number |
| width  | 将要被提取的图像数据矩形区域的宽度                | number |
| height | 将要被提取的图像数据矩形区域的高度                | number |

返回一个 ImageData 对象，包含 Canvas 给定的矩形图像数据。

当宽度或高度为0，则抛出错误。

#### 示例

```html
<canvas id='canvas'></canvas>
```

```js
const canvas = docuemnt.getElementById('canvas');
const ctx = canvas.getContext('2d');
const img = document.getElementById("tulip");

ctx.drawImage(img,0,0);
var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

// 反转颜色
for (var i = 0; i < imgData.data.length; i+=4){
  imgData.data[i] = 255 - imgData.data[i];
  imgData.data[i+1] = 255 - imgData.data[i+1];
  imgData.data[i+2] = 255 - imgData.data[i+2];
  imgData.data[i+3] = 255;
}
ctx.putImageData(imgData,0,0);
```

### putImageData()

`CanvasRenderingContext.putImageData()` 方法可将 ImageData 对象绘制到画布上。

#### 语法

```js
context.putImageData(imgData, x, y, dirtyX, dirtyY, dirtyWidth, dirtyHeight)
```

| 参数        | 说明                                                         | 类型             |
| ----------- | ------------------------------------------------------------ | ---------------- |
| imgData     | 包含图像数据的 ImageData 对象                                | ImageData object |
| x           | 源图像数据在目标画布中的水平偏移量                           | number           |
| y           | 源图像数据在目标画布中的垂直偏移量                           | number           |
| dirtyX      | 可选。 在源图像数据中，矩形区域左上角的位置。默认是整个图像数据的左上角的 x 坐标。 | number           |
| dirtyY      | 可选。在源图像数据中，矩形区域左上角的位置。默认是整个图像数据的左上角的 y 坐标。 | number           |
| dirtyWdith  | 可选。 在源图像数据中，矩形区域的宽度。默认是图像数据的宽度。 | number           |
| dirtyHeight | 可选。 在源图像数据中，矩形区域的高度。默认是图像数据的高度。 | number           |

**抛出错误**

- `NotSupportError`：如果任何一个变量被设置成无穷大，则会抛出此错误
- `InvalidStateError`：如果图像数据对象的数据被分离，会抛出此错误