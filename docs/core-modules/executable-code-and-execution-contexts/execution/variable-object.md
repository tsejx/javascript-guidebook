---
nav:
  title: 核心模块
  order: 3
group:
  title: 执行阶段
  order: 3
title: 变量对象
order: 2
---

# 变量对象

变量对象是与 [执行上下文](./execution-context-stack) 相关的数据作用域，存储了在上下文中定义的 **变量** 和 **函数声明**。

因为不同执行上下文中的变量对象稍有不同，所以我们来聊聊 [全局执行上下文](#全局执行上下文) 下的变量对象和 [函数执行上下文](#函数执行上下文) 下的变量对象。

## 全局执行上下文

💡 **全局执行上下文中的变量对象就是全局对象**

我们先了解一个概念，叫全局对象。在 [W3School](http://www.w3school.com.cn/jsref/jsref_obj_global.asp) 中也有介绍：

**全局对象** 是预定义的对象，作为 JavaScript 的全局函数和全局属性的占位符。通过使用全局对象，可以访问所有其他所有预定义的对象、函数和属性。

在顶层 JavaScript 代码中，可以用关键字 `this` 引用全局对象。因为全局对象是作用域链的头，这意味着所有非限定性的变量和函数名都会作为该对象的属性来查询。

例如，当 JavaScript 代码引用 `parseInt` 函数时，它引用的是全局对象的 `parseInt` 属性，相当于 `window.parseInt`。全局对象是作用域链的头，还意味着在顶层 JavaScript 代码中声明的所有变量都将成为全局对象的属性。

如果看的不是很懂的话，容我再来介绍下全局对象:

1. 可以通过 `this` 引用，在 JavaScript 中，全局对象就是 Window 对象

```js
console.log(this);
// Window { ... }
```

2. 全局对象是由 Object 构造函数实例化的一个对象

```js
console.log(this instanceof Object);
// true
```

3. 预定义全局函数和全局属性，在任何地方均可调用

```js
console.log(Math.random === this.Math.random);
// true

console.log(Math.PI === this.Math.PI);
// true
```

4. 作为全局变量的宿主。

```js
const a = 'foo';

console.log(this.a);
// foo
```

5. 在 JavaScript 中，全局对象有 Window 属性指向自身

```js
const a = 'foo';
console.log(window.a);
// 'foo'

this.window.b = 'foo';
console.log(this.b);
// 'foo'
```

## 函数执行上下文

在函数执行上下文中，我们用 **活动对象**（Activation Object，AO）来表示变量对象。

**活动对象** 和 **变量对象** 其实是同一个东西，只是变量对象是规范上的或者说是引擎实现上的，不可在 JavaScript 环境中访问，只有到当进入一个执行上下文中，这个执行上下文的变量对象才会被激活，所以才叫 Activation Object ，而只有 **被激活** 的变量对象，也就是活动对象上的各种属性才能被访问。

活动对象是在进入函数执行上下文时刻被创建的，它通过函数的 `arguments` 属性初始化。`arguments` 属性值是 [Arguments 对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments)。

## 执行过程

执行上下文的代码会分成两个阶段进行处理：

1. **分析**：进入执行上下文
2. **执行**：代码执行

### 进入执行上下文阶段的变量对象

当进入执行上下文时，这时候还没有执行代码，变量对象的创建，依次经历了以下几个过程：

1. 函数的所有形参（如果是函数执行上下文）
   - 建立 Arguments 对象
   - 检查当前上下文的参数，由名称和对应值组成的一个变量对象的属性被创建
   - 没有实参，属性值设为 `undefined`
2. 函数声明
   - 检查当前上下文的函数声明，也就是使用 `function` 关键字声明的函数
   - 在变量对象中以函数名建立一个属性，属性值为指向该函数所在内存地址的引用
   - 如果变量对象已经存在相同名称的属性，那么该属性将会被新的引用所覆盖
3. 变量声明
   - 检查当前上下文中的变量声明
   - 每找到一个变量声明，就在变量对象中以变量名建立一个属性，属性值为 `undefined`
   - 如果变量名称与已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性（亦可理解为为了防止同名的变量属性被修改为 `undefined`，则会直接跳过，原属性值不会被修改）

🌰 **代码示例**：

```js
function foo(a) {
  var b = 2;

  function c() {}

  var d = function () {};

  b = 3;
}
```

在进入执行上下文后，这时候的活动对象 AO 是：

```js
AO = {
  arguments: {
      0: 1,
      length: 1
  },
  a: 1,
  b: undefined,
  c: reference to function() {},
  d: undefined
}
```

### 代码执行阶段的变量对象

在代码执行阶段，会根据代码，顺序执行代码，修改变量对象的值

还是上面的例子，当代码执行完后，这时候的 AO 是：

```js
AO = {
  arguments: {
    0: 1,
    length: 1
  },
  a: 1,
  b: 3,
  c: reference to function c(){},
  d: reference to FunctionExpression "d"
}
```

到这里变量对象的创建过程就介绍完了，让我们简洁的总结我们上述所说：

1. 全局执行上下文的变量对象初始化是全局对象
2. 函数执行上下文的变量对象初始化只包括 Arguments 对象
3. 在进入执行上下文时会给变量对象添加形参、函数声明、变量声明等初始的属性值
4. 在代码执行阶段，会再次修改变量对象的属性值

## 变量对象和活动对象

> VO 和 AO 到底是什么关系？

未进入执行阶段之前，变量对象（VO：Variable Object）中的属性都不能访问。

但是进入执行阶段之后，活动对象（AO：Activation Object）被激活，里面的属性包括 VO、函数执行时传入的参数和 Arguments 对象都能被访问了，然后开始进行执行阶段的操作。

利用公式可以简单表述为:

```js
AO = VO + function parameters + arguments
```

## 参考资料

- [📝 JavaScript 深入之变量对象](https://github.com/mqyqingfeng/Blog/issues/5)
