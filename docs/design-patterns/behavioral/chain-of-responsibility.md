---
nav:
  title: 设计模式
  order: 10
group:
  title: 行为型
  order: 4
title: 职责链模式
order: 1
---

# 职责链模式

职责链模式（Chain of Responsibility Pattern）是一种行为型设计模式，它允许你构建一个对象链，每个对象都包含了请求的一部分处理逻辑，并且请求沿着这条链传递，直到有一个对象处理它为止。这种模式使得一个请求发送者无需知道是哪个对象处理了请求，而只需要知道请求会被处理。

在职责链模式中，通常涉及三种主要角色：

1. **请求类（Request）**： 表示需要被处理的请求，包含了请求的信息和状态。在实际应用中，请求类通常包含了与具体业务相关的数据。
2. **处理者基类（Handler）**： 定义了一个处理请求的接口或抽象类，具体的处理者类继承自这个基类。处理者基类通常包含一个指向下一个处理者的引用，形成了一个链条。
3. **具体处理者（Concrete Handler）**： 继承自处理者基类，实现了处理请求的具体逻辑。具体处理者决定了它能够处理的请求类型，如果无法处理，则将请求传递给下一个处理者。

在一些实现中，还可能包含以下两个角色：

1. **客户端（Client）**： 创建请求对象并将请求提交给处理者链的起始点。客户端通常不需要知道具体的处理者，只需通过处理者基类与处理者链交互。
2. **具体客户端（Concrete Client）**： 实现了客户端接口，负责创建具体的请求对象并将其提交给处理者链。这个角色在一些场景中可能会省略，因为客户端的工作通常是由系统的其他部分来完成。

这些角色共同协作，使得请求在处理者链上传递，每个处理者负责判断自己是否能够处理请求，如果能够处理，则处理之；如果不能处理，则将请求传递给下一个处理者。这种方式实现了请求的解耦和责任的分担，提高了系统的灵活性和可维护性。

假设我们有一个报销审批的场景，有不同级别的审批人（经理、副总裁、总裁），每个审批人有不同的审批权限，如果一个审批人无法处理该报销请求，请求将被传递给下一个级别的审批人。

```typescript
// 请求类
class ExpenseRequest {
    constructor(amount) {
        this.amount = amount;
        this.approved = false;
    }
}

// 处理者基类
class Approver {
    constructor(name, approvalLimit, nextApprover = null) {
        this.name = name;
        this.approvalLimit = approvalLimit;
        this.nextApprover = nextApprover;
    }

    processRequest(request) {
        if (request.amount <= this.approvalLimit) {
            request.approved = true;
            console.log(`${this.name} approved the expense request of $${request.amount}`);
        } else if (this.nextApprover) {
            console.log(`${this.name} cannot approve. Escalating to ${this.nextApprover.name}`);
            this.nextApprover.processRequest(request);
        } else {
            console.log(`No one is able to approve the expense request of $${request.amount}`);
        }
    }
}

// 具体处理者
class Manager extends Approver {
    constructor() {
        super("Manager", 1000);
    }
}

class VicePresident extends Approver {
    constructor() {
        super("Vice President", 5000);
    }
}

class President extends Approver {
    constructor() {
        super("President", 10000);
    }
}

// 客户端代码
const manager = new Manager();
const vp = new VicePresident();
const president = new President();

// 构建职责链
manager.nextApprover = vp;
vp.nextApprover = president;

// 创建报销请求
const expenseRequest = new ExpenseRequest(8000);

// 提交报销请求
manager.processRequest(expenseRequest);

```

在这个例子中，Approver 是处理者的基类，包含了处理请求的通用逻辑，每个具体的处理者（Manager、VicePresident、President）都继承自 Approver，并在构造函数中设置了自己的审批限额和下一个处理者。

在客户端代码中，我们创建了一个报销请求对象，并创建了处理者对象（经理、副总裁、总裁）。然后，通过设置处理者之间的关系，形成了一个处理者链。当请求提交时，会依次经过链上的处理者，直到有一个处理者能够处理该请求为止。