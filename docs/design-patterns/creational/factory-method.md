---
nav:
  title: 设计模式
  order: 10
group:
  title: 创建型
  order: 2
title: 工厂方法模式
order: 1
---

# 工厂方法模式

工厂方法模式是一种创建型设计模式，它定义了一个用于创建对象的接口，但是由子类决定实例化哪个类。这样，工厂方法模式将类的实例化推迟到子类。

以下是一个简单的 JavaScript 示例，演示了工厂方法模式：

假设我们有一个计算器应用程序，需要支持不同的操作，例如加法和减法。我们可以使用工厂方法模式来实现不同操作的创建。

```typescript
// 抽象产品 - 操作
class Operation {
  getResult() {}
}

// 具体产品 - 加法操作
class AdditionOperation extends Operation {
  constructor(number1, number2) {
    super();
    this.number1 = number1;
    this.number2 = number2;
  }

  getResult() {
    return this.number1 + this.number2;
  }
}

// 具体产品 - 减法操作
class SubtractionOperation extends Operation {
  constructor(number1, number2) {
    super();
    this.number1 = number1;
    this.number2 = number2;
  }

  getResult() {
    return this.number1 - this.number2;
  }
}

// 抽象创建者 - 操作工厂
class OperationFactory {
  createOperation() {}
}

// 具体创建者 - 加法操作工厂
class AdditionOperationFactory extends OperationFactory {
  createOperation(number1, number2) {
    return new AdditionOperation(number1, number2);
  }
}

// 具体创建者 - 减法操作工厂
class SubtractionOperationFactory extends OperationFactory {
  createOperation(number1, number2) {
    return new SubtractionOperation(number1, number2);
  }
}

// 客户端代码
function calculate(factory, number1, number2) {
  const operation = factory.createOperation(number1, number2);
  const result = operation.getResult();
  console.log(`Result: ${result}`);
}

const additionFactory = new AdditionOperationFactory();
calculate(additionFactory, 5, 3);  // 输出：Result: 8

const subtractionFactory = new SubtractionOperationFactory();
calculate(subtractionFactory, 5, 3);  // 输出：Result: 2
```