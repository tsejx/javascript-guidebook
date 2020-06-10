---
nav:
  title: 内置对象
  order: 2
group:
  title: Reflection
  path: /reflection/
  order: 16
title: Proxy
order: 1
---

# Proxy

Proxy 对象用于定义基本操作的自定义行为（如属性查找、赋值、枚举、函数调用等）。

Proxy 可以理解成，在目标对象之前架设一层 **拦截**，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来 **代理** 某些操作，可以译为 **代理器**。

- `handler`：包含捕捉器（Trap）的占位符对象，可译为处理器对象
- `traps`：提供属性访问的方法，这类似于操作系统中捕获器的概念
- `target`：被 Proxy 处理虚拟化的对象，它常被作为代理的存储后端，根据目标验证关于对象不可扩展性或不可配置属性的不变量（保持不变的语义）

ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。

```js
const proxy = new Proxy(target, handler);
```

Proxy 对象的所有用法，都是上面这种形式，不同的只是 `handler` 参数的写法。其中，`new Proxy()` 表示生成一个 Proxy 实例，`target` 参数表示所要拦截的目标对象，`handler` 参数也是一个对象，用来定制拦截行为。

## 基本使用方法

```js
const proxy = new Proxy(
  {},
  {
    get: function(target, propKey, receiver) {
      console.log(`Getting ${propKey}!`);
      return Reflect.get(target, propKey, receiver);
    },
    set: function(target, proxyKey, value, receiver) {
      console.log(`Getting ${propKey}!`);
      return Reflect.set(target, propKey, value, receiver);
    },
  }
);
```

上面代码对一个空对象架设了一层拦截，重定义了属性的读取（`get`）和设置（`set`）行为。这里暂时先不解释具体的语法，只看运行结果。对设置了拦截行为的对象 `proxy`，去读写它的属性，就会得到下面的结果。

```js
proxy.count = 1;
// Setting count!

++proxy.count;
// Getting count!
// Setting count!
// 2
```

上面代码说明，Proxy 实际上重载（Overload）了点运算符，即用自己的定义覆盖了语言的原始定义。

## this 指向问题

虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，即不做任何拦截的情况下，也无法保证与目标对象的行为一致。主要原因就是 Proxy 代理的情况下，目标对象内部的 `this` 关键字会指向 Proxy 代理。

```js
const target = {
  foo: function() {
    console.log(this === proxy);
  },
};

const handler = {};

const proxy = new Proxy(target, handler);

console.log(target.foo());
// false
console.log(proxy.foo());
// true
```

上面代码中，一旦 `proxy` 代理 `target.foo`，后者内部的 `this` 就是指向 `proxy`，而不是 `target`。

## Proxy 与 Object.defineProperty

ES5 提供了 `Object.defineProperty` 方法，该方法可以在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回这个对象。

`Object.defineProperty` 的三个主要问题：

- 无法监听数组变化，Vue 通过 Hack 改写八种数组方法实现
- 必须便利对象的每个属性
- 必须深层遍历嵌套的对象

与 Proxy 的区别：

- Proxy 可以直接监听对象而非属性
- Proxy 直接可以劫持整个对象，并返回一个新的对象，不管是操作便利程度还是底层功能上都远强于 `Object.defineProperty`
- Proxy 可以直接监听数组的变化
- Proxy 有多达 13 中拦截方法，不限于 `apply`、`ownKeys`、`deleteProperty`、`has` 等等是 `Object.defineProperty` 不具备的

## 示例

---

[你不知道的 Proxy：ES6 Proxy 可以做哪些有意思的事情？](https://mp.weixin.qq.com/s/USybqGEQHW8ncuzVe1g_Rw)

[ES6 之 Proxy 巧用，涨知识了](https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651557884&idx=1&sn=8e92673065a0762d0b96190bd0d0cdfa&chksm=8025583db752d12ba67c5a4e2c35cc797294fc4cd957fd08cb4c0796cdbf2d94eea55b4255c7&scene=21#wechat_redirect)

[如何使用 Proxy 来代理 JavaScript 里的类](https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651557259&idx=1&sn=3aa73167ba3e5f073c0181d65fe2b966&chksm=80255a4ab752d35c0771a981a594d2811cbec39c80f21e37314c1d7aa083b478e91915e8c9cc&scene=21#wechat_redirect)

[](https://feclub.cn/post/content/proxy_reflect)

[实用 Proxy 更好地封装 Storage API](https://juejin.im/post/5d3b315df265da1bb67a604c)
