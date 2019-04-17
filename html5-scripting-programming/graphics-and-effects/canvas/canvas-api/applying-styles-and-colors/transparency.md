## 透明度 Transparency

除了可以绘制实色图形，我们还可以用 Canvas 来绘制半透明的图形。通过设置 `globalAlpha` 属性或者使用一个半透明颜色作为轮廓或填充的样式。

### 语法

```js
context.globalAlpha = value
```

| 值    | 说明                                                       | 类型   | 默认值 |
| ----- | ---------------------------------------------------------- | ------ | ------ |
| value | 透明值。取值在必须介于0.0（完全透明）到1.0（不透明）之间。 | number | 1.0    |

因为 `fillStyle` 和 `strokeStyle` 属性接受 CSS3 规范的颜色值，那我们可以用下面的写法来设置有透明的的颜色。

```js
ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
```

### 示例

```html
<canvas id="canvas"></canvas>
```

```js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.globalAlpha = 0.5;

ctx.fillStyle = 'blue';
ctx.fillRect(10, 10, 100, 100);

ctx.fillStyle = 'red';
ctx.fillRect(50, 50, 100, 100);
```