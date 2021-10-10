---
nav:
  title: 设计模式
  order: 10
group:
  title: 结构型
  order: 3
title: 代理模式
order: 3
---

# 代理模式

**代理模式（Proxy Pattern）** 是指为一个原对象找一个代理对象，以便对原对象进行访问。即在访问者与目标对象之间加一层代理，通过代理做授权和控制。代理模式的英文叫做 Proxy 或 Surrogate，它是一种对象结构型模式。

最常见的例子就是经纪人代理明星业务，假设你作为投资人，想联系明星打广告，那么你就需要先经过代理经纪人，经纪人对你的资质进行考察，并为你进行排期，替明星过滤不必要的信息。

事件委托/代理、jQuery 的 `$.proxy`、ES6 的 `proxy` 都是这一模式的实现。

代理模式又分为 **静态代理** 和 **动态代理**：

- **静态代理** 是由程序员创建或特定工具自动生成源代码，再对其编译。在程序运行前，代理类的 `.class` 文件就已经存在了。
- **动态代理** 是在程序运行时，通过运用反射机制动态的创建而成。

## 模式结构

代理模式包含如下角色：

- Subject（抽象主题角色）：声明了目标对象和代理对象的共同接口，这样一来在任何可以使用目标对象的地方都可以使用代理对象。
- Proxy（代理主题角色）：也称为委托角色或者被代理角色。定义了代理对象所代表的目标对象。
- RealSubject（真实主题角色）：也叫委托类、代理类。代理对象内部含有目标对象的引用，从而可以在任何时候操作目标对象；代理对象提供一个与目标对象相同的接口，以便可以在任何时候替代目标对象。代理对象通常在客户端调用传递给目标对象之前或之后，执行某个操作，而不是单纯地将调用传递给目标对象。

## 优点和缺点

代理模式的优点

- 代理模式能够协调调用者和被调用者，在一定程度上降低了系统的耦合度。
- 远程代理使得客户端可以访问在远程机器上的对象，远程机器可能具有更好的计算性能与处理速度，可以快速响应并处理客户端请求。
- 虚拟代理通过使用一个小对象来代表一个大对象，可以减少系统资源的消耗，对系统进行优化并提高运行速度。
- 保护代理可以控制对真实对象的使用权限。

代理模式的缺点

- 由于在客户端和真实主题之间增加了代理对象，因此有些类型的代理模式可能会造成请求的处理速度变慢。
- 实现代理模式需要额外的工作，有些代理模式的实现非常复杂。

## 实践应用

### 图片预加载

虚拟代理：作为创建开销大的对象的代表；虚拟代理经常直到我们真正需要一个对象的时候才创建它；当对象在创建或创建中时，由虚拟代理来扮演对象的替身；对象创建后，代理就会将请求直接委托给对象。

```js
const image = (function () {
  const imgNode = document.createElement('img');

  document.body.appendChild(imgNode);

  return {
    setSrc: function (src) {
      imgNode.src = src;
    },
  };
})();

// 代理容器
const proxyImage = (function () {
  let img = new Image();

  // 加载完之后将设置为添加的图片
  img.onload = function () {
    image.setSrc(this.src);
  };

  return {
    setSrc: function (src) {
      image.setSrc('loading.gif');
      img.src = src;
    },
  };
})();

proxyImage.setSrc('file.jpg');
```

代理容器控制了客户对 Image 的访问，并且在过程中加了一些额外的操作。

### 计算乘积

缓存代理可以为一些开销大的运算结果提供暂时的存储，在下次运算时，如果传递进来的参数跟之前一致，则可以直接返回前端存储的结果。

```js
// 求乘积函数（专注于自身职责，计算成绩，缓存由代理实现）
const mult = function () {
  let result = 1;
  for (let i = 0, l = arguments.length; i < l; i++) {
    result = result * arguments[i];
  }

  return result;
};

// proxyMult
const proxyMult = (function () {
  let cache = {};
  return function () {
    let args = Array.prototype.join.call(arguments, ',');

    if (args in cache) {
      return cache[args];
    }

    return (cache[arg] = mult.apply(this, arguments));
  };
})();

proxyMult(1, 2, 3); // 6
proxyMult(1, 2, 3); // 6
```
