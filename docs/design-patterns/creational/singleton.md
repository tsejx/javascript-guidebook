---
nav:
  title: 设计模式
  order: 10
group:
  title: 创建型
  order: 2
title: 单例模式
order: 2
---

# 单例模式

**单例模式（Singleton）** 指保证一个类仅有一个实例，且该类能自行创建这个实例的一种模式。例如，Windows 中只能打开一个任务管理器，这样可以避免因打开多个任务管理器窗口而造成内存资源的浪费，或出现各个窗口显示内容的不一致等错误。

在计算机系统中，还有 Windows 的回收站、操作系统中的文件系统、多线程中的线程池、显卡的驱动程序对象、打印机的后台处理服务、应用程序的日志对象、数据库的连接池、网站的计数器、Web 应用的配置对象、应用程序中的对话框、系统中的缓存等常常被设计成单例。

单例模式在现实生活中的应用也非常广泛，例如公司 CEO、部门经理等都属于单例模型。

## 特点

单例模式有三个特点：

1. 单例类只有一个实例对象
2. 该单例对象必须由单例类自行创建
3. 单例类对外提供一个访问该单例的全局访问点

优点：

1. 可避免对共享资源的多重占用
2. 可保证内存中只有一个实例，减少内存的开销
3. 可设置全局访问点，优化和共享资源的访问

缺点：

1. 扩展性差：单例模式一般没有接口，扩展困难。如果要扩展，则修改原来的代码，违背开闭原则
2. 职责过重：单例模式的功能代码通常写在一个类中，如果功能设计不合理，则很容易违背单一职责原则

## 模式结构

## 代码示例

全局作用域中的全局变量不是单例模式，全局变量会存在很大的隐患，随着项目的体积和功能日益增大，很容易出现命名冲突、作用域内变量污染和变量覆盖等问题，给开发人员带来很多苦恼。

所以要减少全局变量使用，即使用全局变量也要将污染降到最低。

单例模式通常有两种实现形式：懒汉式单例和饿汉式单例子。

### 饿汉式单例

该模式的特点是类一旦加载就创建一个单例，保证在调用 `getInstance` 方法之前单例已经存在了。

```ts
class HungrySingleton {
  public name: string;
  public type: number;

  private static instance: HungrySingleton = new HungrySingleton();

  // 将 constructor 设为私有属性，防止 new 调用
  private constructor() {}

  public static getInstance(): HungrySingleton {
    return HungrySingleton.instance;
  }
}

const personA = HungrySingleton.getInstance();
const personB = HugnrySingleton.getInstance();

console.log(personA === personB);
// true
```

### 懒汉模式

1. 实例被需要时才去创建，如果单例已经创建，将无法创建新的单例，返回原先的单例。
2. 如果某个单例使用的次数少，并且创建单例消耗的资源较多，那么就需要实现单例的按需创建

```ts
class LazySingleton {
  public name: string;
  public age: number;
  private static instance: LazySingleton;

  public construcotr(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  public static getInstance(name: string, age: number): LazySingleton {
    if (LazySingleton.instance === null) {
      LazySingleton.instance = new LazySingleton(name, age);
    }

    return this.instance;
  }
}

const personA = LazySingleton.getInstance('Dave', 20);
const personB = LazySingleton.getInstance('Mary', 24);

console.log(personA, personB);
// LazySingleton{ name: "Dave", age: 20 } LazySingleton{ name: "Dave", age: 20 }
```

### 命名空间

命名空间可以减少全局变量的数量，可以使用对象字面量将这一类的变量作为它的属性进行访问。

```js
var Singleton = {
  fun1: function () {
    console.log('fun1');
  },
  fun2: function () {
    console.log('fun2');
  },
};
```

### 使用闭包封装私有变量

使用 IIFI 立即执行函数表达式，让 JavaScript 编译器不在认为这是一个函数声明，而是 **立即执行函数**，将私有变量保存在它的闭包环境中，暴露可以访问私有变量的接口。类似创建一个块级作用域，和其他作用域的变量隔离。

```js
const Singleton = (function () {
  let instance;

  function createInstance() {
    var object = new Object('I am the instance');
    return object;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

function run() {
  const instance1 = Singleton.getInstance();
  const instance2 = Singleton.getInstance();

  console.log('Same instance? ' + (instance1 === instance2));
}

run();
```
