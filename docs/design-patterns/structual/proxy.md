---
nav:
  title: 设计模式
  order: 10
group:
  title: 结构型
  order: 3
title: 代理模式
order: 7
---

# 代理模式

代理模式（Proxy Pattern）是一种结构型设计模式，其主要目的是通过引入一个代理对象来控制对另一个对象的访问。代理对象充当了客户端和目标对象之间的中介，可以用于实现各种用途，如延迟加载、权限控制、日志记录等。

代理模式涉及到以下几个角色：

1. `抽象主题（Subject）`： 定义了目标对象和代理对象的共同接口，客户端通过该接口访问目标对象。
2. `具体主题（Real Subject）`： 实现了抽象主题接口，是真正的目标对象，代理对象直接控制对它的访问。
3. `代理（Proxy）`： 实现了抽象主题接口，保存了对真正目标对象的引用，客户端通过代理访问目标对象。代理对象可以在客户端访问目标对象之前或之后执行一些额外的操作。

代理模式可以分为多种类型，包括：

静态代理（Static Proxy）： 代理对象在编译时就已经确定，代理类和目标类的关系在编译阶段就确定了。静态代理需要为每一个目标类创建一个代理类，导致类的数量增加。

动态代理（Dynamic Proxy）： 代理对象在运行时动态生成，代理类不需要预先定义，而是在运行时根据需要创建。Java 中的 java.lang.reflect.Proxy 和 InvocationHandler 接口就是动态代理的经典实现。

下面是一个简单的静态代理的示例，假设有一个简单的接口 Subject，以及一个实现了该接口的类 RealSubject，我们可以使用代理模式创建一个代理类 Proxy：

```typescript
// 抽象主题
interface Subject {
    void request();
}

// 具体主题
class RealSubject implements Subject {
    @Override
    public void request() {
        System.out.println("RealSubject: Handling request.");
    }
}

// 代理
class Proxy implements Subject {
    private RealSubject realSubject;

    public Proxy(RealSubject realSubject) {
        this.realSubject = realSubject;
    }

    @Override
    public void request() {
        System.out.println("Proxy: Logging before request.");
        realSubject.request();
        System.out.println("Proxy: Logging after request.");
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        RealSubject realSubject = new RealSubject();
        Proxy proxy = new Proxy(realSubject);

        // 通过代理访问目标对象
        proxy.request();
    }
}
```

在这个示例中，`Subject` 是抽象主题，`RealSubject` 是具体主题。`Proxy` 是代理类，它持有一个 `RealSubject` 的引用，并在调用 `request` 方法前后添加了额外的日志记录。客户端通过代理对象访问目标对象，实现了对目标对象的访问控制。