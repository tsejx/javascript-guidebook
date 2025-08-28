---
nav:
  title: 设计模式
  order: 10
group:
  title: 行为型
  order: 4
title: 命令模式
order: 2
---

# 命令模式

命令模式（Command Pattern）是一种行为型设计模式，其主要目的是将请求封装成对象，以便对请求的参数化、排队、操作、以及日志记录等进行处理。这使得我们能够在不同的请求发送者和接收者之间解耦，同时也能够轻松地添加新的命令，实现撤销和恢复操作。

在命令模式中，通常涉及以下几种角色：

1. **命令（Command）**： 定义了执行操作的接口。具体的命令类实现了这个接口，并包含了执行该操作所需的具体逻辑。
2. **具体命令（Concrete Command）**： 实现了命令接口，封装了对接收者的调用。具体命令负责调用接收者的相应操作。
3. **接收者（Receiver）**： 知道如何执行与请求相关的操作。实际的业务逻辑将在接收者中执行。
4. **调用者/请求者（Invoker）**： 请求的发送者，负责向命令对象发起请求。调用者不需要知道命令的具体实现，只需要知道如何发起请求。
5. **客户端（Client）**： 创建具体命令对象并将其与接收者关联，构建命令和调用者之间的关系。

下面是一个简单的 JavaScript 伪代码示例，演示了命令模式的基本结构：

```typescript
// 命令接口
class Command {
  execute() {
    throw new Error("This method should be overridden by concrete commands");
  }
}

// 具体命令
class ConcreteCommand extends Command {
  constructor(receiver) {
    super();
    this.receiver = receiver;
  }

  execute() {
    this.receiver.action();
  }
}

// 接收者
class Receiver {
  action() {
    console.log("Receiver: Performing action");
  }
}

// 请求者
class Invoker {
  constructor(command) {
    this.command = command;
  }

  setCommand(command) {
    this.command = command;
  }

  executeCommand() {
    console.log("Invoker: Executing command");
    this.command.execute();
  }
}

// 客户端
const receiver = new Receiver();
const concreteCommand = new ConcreteCommand(receiver);
const invoker = new Invoker(concreteCommand);

// 客户端发起请求
invoker.executeCommand();
```

在这个示例中，`Command` 是命令接口，`ConcreteCommand` 是具体的命令类，`Receiver` 是接收者，实际业务逻辑将在这里执行。`Invoker` 是请求者，负责发起命令的执行。客户端创建了一个具体的命令对象，并将其与接收者关联，然后通过请求者发起了命令的执行。这种方式使得命令的发起者和执行者解耦，同时也为实现撤销、恢复等操作提供了方便。