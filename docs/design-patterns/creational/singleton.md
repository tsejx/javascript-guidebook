---
nav:
  title: 设计模式
  order: 10
group:
  title: 创建型
  order: 2
title: 单例模式
order: 5
---

# 单例模式

单例模式（Singleton Pattern） 是一种创建型设计模式，其主要目的是确保一个类只有一个实例，并提供一个全局访问点以获取该实例。

单例模式通常在以下情况下使用：

1. 一个全局对象负责协调系统的操作。
2. 一个共享的资源，例如配置信息，需要在系统中的多个部分之间共享。

单例模式的关键特点包括：

1. 私有构造函数（Private Constructor）： 单例类通常会将其构造函数设为私有，以防止直接通过 new 关键字创建多个实例。
2. 静态方法或属性提供访问点： 单例类通常提供一个静态方法或属性，用于获取该类的唯一实例。
3. 延迟实例化（Lazy Instantiation）： 实例的创建通常是延迟的，即在第一次请求实例时才进行创建。

下面是一个简单的 JavaScript 实现单例模式的示例：

```typescript
class Singleton {
  // 私有变量，用于存储唯一实例
  static instance = null;

  // 私有构造函数
  constructor() {
    if (!Singleton.instance) {
      // 如果实例不存在，则创建实例
      Singleton.instance = this;
    }

    // 返回唯一实例
    return Singleton.instance;
  }

  // 公共方法
  showMessage() {
    console.log("Hello, I am a Singleton!");
  }
}

// 使用单例模式
const singleton1 = new Singleton();
singleton1.showMessage();  // 输出：Hello, I am a Singleton!

const singleton2 = new Singleton();
console.log(singleton1 === singleton2);  // 输出：true，因为它们是同一个实例
```

在这个例子中，通过构造函数的私有性和静态属性来确保只有一个实例，并通过 `showMessage` 方法来验证单例的存在。使用单例模式可以确保在整个应用程序中只有一个实例，避免了不必要的资源浪费和复杂性。