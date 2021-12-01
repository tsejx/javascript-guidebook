---
nav:
  title: 设计模式
  order: 10
group:
  title: 创建型
  order: 2
title: 单例模式
order: 1
---

# 单例模式

**单例模式（Singleton）** 指保证一个类仅有一个实例，并提供一个访问它的全局访问点。

## 功能

- 单例模式能保证全局的唯一性，可以减少命名变量
- 单例模式在一定情况下可以节约内存，减少过多的类生成需要的内存和运行时间
- 把代码都放在一个类里面维护，实现了高内聚

优点：

1. 提供了对唯一实例的受控访问
2. 避免对共享资源的多重占用
3. 节约系统资源

缺点：

1. 扩展性差
2. 职责过重

## 代码示例

全局作用域中的全局变量不是单例模式，全局变量会存在很大的隐患，随着项目的体积和功能日益增大，很容易出现命名冲突、作用域内变量污染和变量覆盖等问题，给开发人员带来很多苦恼。

所以要减少全局变量使用，即使用全局变量也要将污染降到最低。

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
var Singleton = (function () {
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

  alert('Same instance? ' + (instance1 === instance2));
}

run();
```

### 惰性单例
