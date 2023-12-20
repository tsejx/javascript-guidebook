---
nav:
  title: 设计模式
  order: 10
group:
  title: 结构型
  order: 3
title: 装饰者模式
order: 4
---

# 装饰者模式

装饰者模式（Decorator Pattern）是一种结构型设计模式，它允许你通过将对象放入包含行为的特殊包装类中来给对象动态地添加新的行为。装饰者模式提供了一种灵活的方式，使得客户端可以单独扩展对象的功能，而不需要修改其结构。

在装饰者模式中，有几个关键角色：

1. **组件接口（Component）**： 定义了具体组件和装饰者共用的接口，确保它们是可互换的。
2. **具体组件（Concrete Component）**： 实现了组件接口，是被装饰的原始对象。
3. **装饰者（Decorator）**： 实现了组件接口并持有一个具体组件的引用，在其上可以添加额外的行为。
4. **具体装饰者（Concrete Decorator）**： 扩展了装饰者接口，实现了具体的装饰行为。

假设我们有一杯咖啡，我们可以动态地给它添加调料（如牛奶、糖等）：

```typescript
// 组件接口
class Coffee {
  cost() {
    return 5; // 基础咖啡价格
  }
}

// 具体组件
class SimpleCoffee extends Coffee {}

// 装饰者
class CoffeeDecorator extends Coffee {
  constructor(coffee) {
    super();
    this._coffee = coffee;
  }

  cost() {
    return this._coffee.cost();
  }
}

// 具体装饰者 - 牛奶
class MilkDecorator extends CoffeeDecorator {
  constructor(coffee) {
    super(coffee);
  }

  cost() {
    return super.cost() + 2; // 加牛奶的价格
  }
}

// 具体装饰者 - 糖
class SugarDecorator extends CoffeeDecorator {
  constructor(coffee) {
    super(coffee);
  }

  cost() {
    return super.cost() + 1; // 加糖的价格
  }
}

// 客户端代码
const simpleCoffee = new SimpleCoffee();
console.log(`Cost of Simple Coffee: $${simpleCoffee.cost()}`);

const milkCoffee = new MilkDecorator(simpleCoffee);
console.log(`Cost of Coffee with Milk: $${milkCoffee.cost()}`);

const sugarMilkCoffee = new SugarDecorator(milkCoffee);
console.log(`Cost of Coffee with Milk and Sugar: $${sugarMilkCoffee.cost()}`);
```

在这个例子中，`Coffee` 是组件接口，`SimpleCoffee` 是具体组件。`CoffeeDecorator` 是装饰者，`MilkDecorator` 和 `SugarDecorator` 是具体装饰者。通过装饰者模式，我们可以动态地将调料添加到咖啡中，而不需要修改咖啡类本身。客户端可以根据需要组合不同的装饰者，实现了灵活的行为扩展。

