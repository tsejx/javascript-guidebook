## 图案样式 Patterns

`CanvasRenderingContext2D.createPatterns()` 是 Canvas 2D API 使用指定的元素创建模式的方法。元素可以是图片、视频，或者其他 `<canvas>` 元素。

### 语法

```js
context.createPatterns(image, repetition)
```

| 参数       | 说明                           | 类型              | 默认值   |
| ---------- | ------------------------------ | ----------------- | -------- |
| image      | 规定要使用图片、画布或视频元素 | CanvasImageSource | -        |
| repetition | 指定如何图像重复的模式         | DOMString         | 'repeat' |

**参数repetition可选值**

| 值        | 说明                         |
| --------- | ---------------------------- |
| repeat    | 该模式在水平和垂直方向重复。 |
| repeat-x  | 该模式只在水平方向重复。     |
| repeat-y  | 该模式只在垂直方向重复。     |
| no-repeat | 该模式只显示一次（不重复）。 |

### 示例

```html
<canvas id="canvas"></canvas>
```

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = 'https://mdn.mozillademos.org/files/222/Canvas_createpattern.png';
img.onload = function() {
  const pattern = ctx.createPattern(img, 'repeat');
  ctx.fillStyle = pattern;
  ctx.fillRect(0,0,400,400);
};
```

