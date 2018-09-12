## 合成

### globalCompositeOperation

globalCompositeOperation 属性指定图形、图像的合成方法。即：在现有的图形上怎样呈现另一图形。使用 globalAlpha，不会影响图形对当前合成方式的使用。该属性能够指定各种合成方式。值见下表。以原有图形、添加图形分别代表要合成的图形两方。所有的值必须使用小写字母。

源图像 = 您打算放置到画布上的绘图。

目标图像 = 您已经放置在画布上的绘图。

#### 语法

```js
context.globalCompositeOperation = 'source-in'
```

| 值               | 说明                                                         |
| ---------------- | ------------------------------------------------------------ |
| source-over      | 默认。在目标图像上显示源图像。                               |
| source-atop      | 在目标图像顶部显示源图像。源图像位于目标图像之外的部分是不可见的。 |
| source-in        | 在目标图像中显示源图像。只有目标图像内的源图像部分会显示，目标图像是透明的。 |
| source-out       | 在目标图像之外显示源图像。只会显示目标图像之外源图像部分，目标图像是透明的。 |
| destination-over | 在源图像上方显示图像。                                       |
| destination-atop | 在源图像顶部显示目标图像。源图像之外的目标图像部分不会被显示。 |
| destination-in   | 在源图像中显示目标图像。只有源图像内的目标图像部分会被显示，源图像是透明的。 |
| destination-out  | 在源图像外显示目标图像。只有源图像外的目标图像部分会被显示，源图像是透明的。 |
| lighter          | 显示源图像 + 目标图像。                                      |
| copy             | 显示源图像。忽略目标图像。                                   |
| source-over      | 使用异或操作对源图像与目标图像进行组合。                     |

#### 示例

```html
<canvas id='canvas'></canvas>
```

##### 示例1：source-over

```js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'blue';	//	原有图形
ctx.fillRect(20, 20, 70, 50);

ctx.fillStyle = 'red';	// 添加图形
ctx.globalCompositeOperation = 'soucre-over';
ctx.fillRect(40, 40, 70, 50);
```

##### 示例2：source-atop

```js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'blue';	//	原有图形
ctx.fillRect(20, 20, 70, 50);

ctx.fillStyle = 'red';	// 添加图形
ctx.globalCompositeOperation = 'soucre-atop';
ctx.fillRect(40, 40, 70, 50);
```



