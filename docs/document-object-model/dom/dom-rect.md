---
nav:
  title: DOM
  order: 6
group:
  title: 文档对象模型
  order: 3
title: DOMRect
order: 10
---

# DOMRect

DOMRect 表示的盒子的类型由返回它的方法或属性指定。例如，WebVR API 的 `VREyeParameters.renderRect` 指定了头戴式显示器的一只眼睛应该呈现的影像所在的 Canvas 的视口。

它继承自它的父类，DOMRectReadOnly。

```
DOMRectReadOnly <- DOMRect
```

## 接口属性

### DOMRect.x

矩形盒子原点的 x 坐标。

### DOMRect.y

矩形盒子原点的 y 坐标。

### DOMRect.width

矩形盒子自身的宽度。

### DOMRect.height

矩形盒子自身的高度。

### DOMRect.top

矩形盒子顶坐标值（与 `y` 同值，如果 `height` 为负值，则为 `y + height` 的值）。

### DOMRect.right

矩形盒子右坐标值（与 `x + width` 同值，如果 `width` 为负值，则为 `x` 的值）。

### DOMRect.bottom

矩形盒子底坐标值（与 `y + height` 同值，如果 `height` 为负值，则为 `y` 的值）。

### DOMRect.left

矩形盒子右坐标值（与 `x` 同值，如果 `width` 为负值，则为 `x + width` 的值）。
