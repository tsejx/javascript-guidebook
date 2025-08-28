---
nav:
  title: 设计模式
  order: 10
group:
  title: 创建型
  order: 2
title: 原型模式
order: 4
---

# 原型模式

原型模式（Prototype Pattern）是一种创建型设计模式，其主要目的是通过复制现有对象来创建新对象，而无需显式地使用构造函数。原型模式通常用于创建复杂的对象，其中的构造过程相对昂贵或者复杂，而新对象的创建可以通过复制现有对象的状态来更高效地实现。

关键组成部分：

1. 原型接口（Prototype Interface）： 定义了克隆方法的接口，具体的原型类将实现这个接口。
2. 具体原型类（Concrete Prototype）： 实现了原型接口，负责实现克隆方法，以便通过复制自身来创建新对象。
3. 客户端（Client）： 使用原型模式的代码，通过克隆来创建新对象。

下面是一个简单的 JavaScript 实现原型模式的例子：

```typescript
// 原型接口
class Animal {
  clone() {}
  makeSound() {}
}

// 具体原型类 - 狗
class Dog extends Animal {
  clone() {
    return Object.create(this); // 通过原型链复制自身
  }

  makeSound() {
    console.log("Woof!");
  }
}

// 具体原型类 - 猫
class Cat extends Animal {
  clone() {
    return Object.create(this); // 通过原型链复制自身
  }

  makeSound() {
    console.log("Meow!");
  }
}

// 客户端代码
const originalDog = new Dog();
const clonedDog = originalDog.clone();
console.log(originalDog === clonedDog); // 输出：false，虽然内容相同但是不是同一个实例

originalDog.makeSound(); // 输出：Woof!
clonedDog.makeSound();   // 输出：Woof!

const originalCat = new Cat();
const clonedCat = originalCat.clone();
console.log(originalCat === clonedCat); // 输出：false

originalCat.makeSound(); // 输出：Meow!
clonedCat.makeSound();   // 输出：Meow!
```

在这个例子中，`Dog` 和 `Cat` 类都实现了 `Animal` 接口的 `clone` 方法，通过调用 `Object.create(this)` 来创建一个新对象，该对象继承自当前对象。客户端代码可以通过调用 `clone` 方法来创建新的狗和猫实例。

原型模式的优势在于通过复制现有对象来创建新对象，避免了昂贵的构造过程。这对于那些创建过程复杂或者需要大量资源的对象来说是非常有用的。