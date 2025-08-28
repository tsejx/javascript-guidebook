---
nav:
  title: 设计模式
  order: 10
group:
  title: 结构型
  order: 3
title: 桥接模式
order: 2
---

# 桥接模式

桥接模式（Bridge Pattern）是一种结构型设计模式，它将抽象部分与实现部分分离，使它们可以独立变化，而不影响彼此。桥接模式主要用于处理具有多层次继承结构的情况，通过将抽象部分和实现部分分开，使得系统更加灵活。

在桥接模式中，有两个关键的角色：

1. **抽象类（Abstraction）**： 定义了抽象部分的接口，并维护一个指向实现部分的引用。
2. **实现类（Implementor）**： 定义了实现部分的接口，被抽象类引用。
3. **具体抽象类（Concrete Abstraction）**： 继承自抽象类，实现抽象类定义的接口。
4. **具体实现类（Concrete Implementor）**： 继承自实现类，实现实现类定义的接口。

以下是一个通俗易懂的 JavaScript 示例，假设我们要设计一个绘制不同形状的图形的系统：

```typescript
// 实现类接口
class DrawingAPI {
  drawCircle(x, y, radius) {}
  drawSquare(x, y, side) {}
}

// 具体实现类 - SVG 绘制
class SVGDrawingAPI extends DrawingAPI {
  drawCircle(x, y, radius) {
    console.log(`Drawing a circle at (${x},${y}) with radius ${radius} using SVG`);
  }

  drawSquare(x, y, side) {
    console.log(`Drawing a square at (${x},${y}) with side ${side} using SVG`);
  }
}

// 具体实现类 - Canvas 绘制
class CanvasDrawingAPI extends DrawingAPI {
  drawCircle(x, y, radius) {
    console.log(`Drawing a circle at (${x},${y}) with radius ${radius} using Canvas`);
  }

  drawSquare(x, y, side) {
    console.log(`Drawing a square at (${x},${y}) with side ${side} using Canvas`);
  }
}

// 抽象类
class Shape {
  constructor(drawingAPI) {
    this.drawingAPI = drawingAPI;
  }

  draw() {}

  resize() {}
}

// 具体抽象类 - 圆
class Circle extends Shape {
  constructor(x, y, radius, drawingAPI) {
    super(drawingAPI);
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  draw() {
    this.drawingAPI.drawCircle(this.x, this.y, this.radius);
  }

  resize(radius) {
    this.radius = radius;
  }
}

// 具体抽象类 - 正方形
class Square extends Shape {
  constructor(x, y, side, drawingAPI) {
    super(drawingAPI);
    this.x = x;
    this.y = y;
    this.side = side;
  }

  draw() {
    this.drawingAPI.drawSquare(this.x, this.y, this.side);
  }

  resize(side) {
    this.side = side;
  }
}

// 客户端代码
const svgDrawingAPI = new SVGDrawingAPI();
const canvasDrawingAPI = new CanvasDrawingAPI();

const circle = new Circle(1, 2, 3, svgDrawingAPI);
const square = new Square(4, 5, 6, canvasDrawingAPI);

circle.draw();
square.draw();

circle.resize(4);
circle.draw();
```

在这个例子中，`DrawingAPI` 是实现类的接口，`SVGDrawingAPI` 和 `CanvasDrawingAPI` 是具体的实现类。`Shape` 是抽象类，`Circle` 和 `Square` 是具体的抽象类。通过这种设计，我们可以方便地切换不同的实现类，例如从 `SVG` 切换到 `Canvas` 绘制，而不需要修改 `Circle` 和 `Square` 类的代码。这样的设计使得抽象部分和实现部分可以独立演化，提高了系统的灵活性和可维护性。