## Canvas

Canvas （画布）用于在网页实时生成图像，并且可以操作图像内容，基本上它是一个可以用 JavaScript 操作的位图（bitmap）。

使用方法

1. **布置画布**：通过 `<canvas>`  标签，添加 canvas 元素

```html
<canvas id="foo" width="100" height="100">A drawing of something</canvas>
```

与其他元素一样，`<canvas>` 元素对应的 DOM 元素对象也有 width 和 height 属性，可以随意修改。而且，也能通过 CSS 为该元素添加样式，如果不添加任何样式或者不绘制任何图形，在页面中是看不到该元素的。

2. **获取画布**：通过 `<canvas>` 标签的 ID，获得绘图上下文对象

```js
const foo = document.getElementById('foo');
```

3. **获得画布**：通过 canvas 对象 `getContext('2d')` 方法，获得 2D 环境（`2d` 为生成2D平面图案，`webgl` 表示生成3D立体图案）

```js
// 检测浏览器支持<canvas>元素
if (foo.getContext){
	const ctx = foo.getContext('2d');
    // more code
}
```

### CanvasAPI 目录

- 绘制方法
  - [绘制矩形](CanvasAPI/DrawingMethods/DrawingRetangles.md)
  - [绘制路径](CanvasAPI/DrawingMethods/DrawingPaths.md)
  - [绘制文本](CanvasAPI/DrawingMethods/DrawingText.md)
- 设置样式
  - [线段样式](CanvasAPI/ApplyingStyles&Colors/LineStyles.md)
  - [文本样式](CanvasAPI/ApplyingStyles&Colors/TextStyles.md)
  - [颜色样式](CanvasAPI/ApplyingStyles&Colors/Colors.md)
  - [图案样式]( CanvasAPI/ApplyingStyles&Colors/Patterns.md)
  - [透明度](CanvasAPI/ApplyingStyles&Colors/Transparency.md)
  - [渐变](CanvasAPI/ApplyingStyles&Colors/Shadow.md)
  - [阴影](CanvasAPI/ApplyingStyles&Colors/Shadow.md)
  - [填充规则](CanvasAPI/ApplyingStyles&Colors/CanvasFillRules.md)
- [状态操作](CanvasAPI/TheCanvasState.md)
- [变换](CanvasAPI/Transform.md)
- [图像绘制](CanvasAPI/DrawingImages.md)
- [像素控制](CanvasAPI/PixelManipulation.md)
- [合成](CanvasAPI/Compositing.md)

---

参考资料：

- [一个少女心满满的例子带你入门 canvas](https://segmentfault.com/p/1210000010536257/read)