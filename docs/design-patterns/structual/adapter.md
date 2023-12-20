---
nav:
  title: 设计模式
  order: 10
group:
  title: 结构型
  order: 3
title: 适配器模式
order: 1
---

# 适配器模式

适配器模式（Adapter Pattern）是一种结构型设计模式，它允许将一个类的接口转换成客户端期望的另一个接口。适配器模式主要用于使原本由于接口不匹配而无法一起工作的两个类能够协同工作。

适配器模式涉及以下几个关键角色：

1. **目标接口（Target Interface）**： 客户端所期望的接口，适配器通过实现这个接口，使得客户端可以调用适配器的方法。
2. **适配器（Adapter）**： 实现目标接口并包装一个或多个被适配者对象，以便将调用转发给被适配者。
3. **被适配者（Adaptee）**： 需要被适配的类或接口，它定义了客户端不知道的方法，适配器通过调用被适配者的方法来完成适配。
4. **客户端（Client）**： 使用目标接口的对象，与适配器交互。

适配器模式主要有两种形式：类适配器和对象适配器。

## 类适配器

在类适配器中，适配器类继承了目标接口，并且同时持有一个被适配者对象。通过继承目标接口，适配器可以将被适配者的方法暴露给客户端。

```typescript
// 目标接口
class Target {
  request() {}
}

// 被适配者
class Adaptee {
  specificRequest() {
    console.log("Adaptee's specific request");
  }
}

// 类适配器
class Adapter extends Target {
  constructor(adaptee) {
    super();
    this.adaptee = adaptee;
  }

  request() {
    this.adaptee.specificRequest();
  }
}

// 客户端
const adaptee = new Adaptee();
const adapter = new Adapter(adaptee);
adapter.request();  // 输出：Adaptee's specific request
```

## 对象适配器

在对象适配器中，适配器类持有一个被适配者对象的实例，并实现了目标接口。通过委托，适配器将客户端的请求传递给被适配者。

```typescript
// 对象适配器
class Adapter {
  constructor(adaptee) {
    this.adaptee = adaptee;
  }

  request() {
    this.adaptee.specificRequest();
  }
}

// 客户端
const adaptee = {
  specificRequest: function() {
    console.log("Adaptee's specific request");
  }
};

const adapter = new Adapter(adaptee);
adapter.request();  // 输出：Adaptee's specific request
```

适配器模式的使用场景包括：

- 当需要使用一个已经存在的类，而它的接口与你所需要的不匹配时。
- 当你想创建一个可复用的类，该类可以与其他不相关的类或不可预见的类（即接口不一致的类）协同工作时。

适配器模式使得不同接口的类能够协同工作，使系统更加灵活，同时能够保持类的独立性和可复用性。

## 代码示例

假设我们有两个不同的日志库，一个是新日志库 NewLogger，一个是旧日志库 OldLogger，它们的接口不同。我们想要在应用程序中统一使用新日志库，但是现有的代码仍然使用旧日志库。这时候就可以使用适配器模式。

```typescript
// 新日志库接口
class NewLogger {
  log(message) {
    console.log(`New Logger: ${message}`);
  }
}

// 旧日志库接口
class OldLogger {
  logMessage(msg) {
    console.log(`Old Logger: ${msg}`);
  }
}

// 适配器 - 将旧日志库适配成新日志库接口
class OldLoggerAdapter extends NewLogger {
  constructor(oldLogger) {
    super();
    this.oldLogger = oldLogger;
  }

  log(message) {
    // 调用旧日志库的方法
    this.oldLogger.logMessage(message);
  }
}

// 客户端代码，使用新日志库接口
const newLogger = new NewLogger();
newLogger.log("This is a message from the new logger.");

// 适配器让旧日志库适应新日志库接口
const oldLogger = new OldLogger();
const adaptedLogger = new OldLoggerAdapter(oldLogger);
adaptedLogger.log("This is a message from the old logger, adapted to the new logger interface.");
```

在这个例子中，`OldLoggerAdapter` 充当适配器的角色，它继承了新日志库的接口，并持有一个旧日志库的实例。在适配器中，它的 `log` 方法调用了旧日志库的 `logMessage` 方法，从而实现了旧日志库适配到新日志库的接口。客户端代码使用新日志库接口，而适配器在内部负责将旧日志库的调用适配到新日志库的接口。

