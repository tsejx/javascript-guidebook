---
nav:
  title: 设计模式
  order: 10
group:
  title: 创建型
  order: 2
title: 抽象工厂模式
order: 2
---

# 抽象工厂模式

抽象工厂模式（Abstract Factory Pattern）是一种创建型设计模式，它提供了一种接口，用于创建一系列相关或相互依赖的对象，而无需指定它们的具体类。抽象工厂模式是工厂方法模式的进一步扩展，它将一组相关的工厂封装在一个接口中，使客户端代码可以与具体工厂的实现分离。

关键组成部分：

1. 抽象工厂（Abstract Factory）： 定义了一组创建相关对象的方法，每个方法对应一个具体工厂。
2. 具体工厂（Concrete Factory）： 实现了抽象工厂的接口，负责创建一组相关的产品。
3. 抽象产品（Abstract Product）： 定义了一组相关产品的接口。
4. 具体产品（Concrete Product）： 实现了抽象产品的接口，是由具体工厂创建的对象。

抽象工厂模式的关键思想在于将一组相关的产品的创建封装在一个工厂中，使得客户端代码可以通过工厂接口来创建产品，而不需要直接关心具体产品的实现。

以下是一个简单的抽象工厂模式的例子，假设我们有两种风格的按钮和文本框：Windows 风格和 Mac 风格。

```typescript
// 抽象产品 - 按钮
class Button {
  click() {}
}

// 具体产品 - Windows 风格按钮
class WindowsButton extends Button {
  click() {
    console.log("Windows button clicked");
  }
}

// 具体产品 - Mac 风格按钮
class MacButton extends Button {
  click() {
    console.log("Mac button clicked");
  }
}

// 抽象产品 - 文本框
class TextBox {
  input() {}
}

// 具体产品 - Windows 风格文本框
class WindowsTextBox extends TextBox {
  input() {
    console.log("Windows text box input");
  }
}

// 具体产品 - Mac 风格文本框
class MacTextBox extends TextBox {
  input() {
    console.log("Mac text box input");
  }
}

// 抽象工厂
class UIFactory {
  createButton() {}
  createTextBox() {}
}

// 具体工厂 - Windows 风格工厂
class WindowsUIFactory extends UIFactory {
  createButton() {
    return new WindowsButton();
  }

  createTextBox() {
    return new WindowsTextBox();
  }
}

// 具体工厂 - Mac 风格工厂
class MacUIFactory extends UIFactory {
  createButton() {
    return new MacButton();
  }

  createTextBox() {
    return new MacTextBox();
  }
}

```

使用抽象工厂模式，客户端代码可以通过抽象工厂接口来创建按钮和文本框，而不需要直接关心具体产品的实现。例如：

```typescript
// 客户端代码
function createUI(factory) {
  const button = factory.createButton();
  const textBox = factory.createTextBox();

  return { button, textBox };
}

const windowsUI = createUI(new WindowsUIFactory());
windowsUI.button.click();  // 输出：Windows button clicked
windowsUI.textBox.input(); // 输出：Windows text box input

const macUI = createUI(new MacUIFactory());
macUI.button.click();      // 输出：Mac button clicked
macUI.textBox.input();     // 输出：Mac text box input
```

通过使用抽象工厂模式，我们可以轻松切换不同风格的 UI，而不需要修改客户端代码。这使得系统更加灵活，并易于扩展和维护。