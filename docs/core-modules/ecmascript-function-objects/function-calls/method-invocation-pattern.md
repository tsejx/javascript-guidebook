---
nav:
  title: 核心模块
  order: 3
group:
  title: 函数调用
  order: 8
title: 方法调用模式
order: 1
---

# 方法调用模式

**方法调用模式（Method Invocation Pattern）**

在面向对象程序设计中，当函数（Function）作为对象属性时被称为方法（Method）。方法被调用时 `this` 会被绑定到对应的对象。在 JavaScript 中有两种语法可以完成方法调用。

## 函数作为方法调用

当一个函数被保存为对象的一个属性时，我们称它为一个方法。当一个方法被调用时，`this` 被绑定到该对象。如果调用表达式包含一个提取属性的动作，那么它就是被当做一个方法来调用。

```js
var foo = {
  fn: function(){
    console.log(1);
  }
};

foo.fn();
// 1
```

## 对象的公共方法提取

方法可以使用 `this` 访问自己所属的对象，所以它能从对象中取值或对对象进行修改。`this` 到对象的绑定发生在调用的时候。通过 `this` 可取得它们所属对象的上下文的方法称为**公共方法**。

```js
var foo = {
    id: 1,
    fn: function(){
        return this;
    },
    update: function(){
        this.id = 2;
    }
};

console.log(foo.fn().id);
// 1

foo.update();

console.log(foo.fn().id);
// 2
```

## 隐式实参

任何函数只要作为方法调用实际上都会传入一个隐式的实参——这个实参是一个对象，方法调用的母体就是这个对象，通常来讲，基于那个对象的方法可以执行多种操作，方法调用的语法已经很清晰地表明了函数将基于一个对象进行操作。

```js
rect.setSize(width, height);

setRectSize(rect, width, height);
```

假设上面两行代码的功能完全一样，它们都作用于一个假定的对象 `rect`。可以看出，第一行的方法调用语法非常清晰地表明这个函数执行的载体是 `rect` 对象，函数中的所有操作都将基于这个对象。

## 函数方法中的 `this`

和变量不同，关键字 `this` 没有作用域的限制，嵌套的函数不会从调用它的函数中继承 `this`。

- 如果嵌套函数作为方法调用，其 `this` 的值指向 **调用它的对象**。
- 如果嵌套函数作为函数调用，其 `this` 值不是 **全局对象**（非严格模式下）就是 `undefined`（严格模式下）。

```js
var foo = {
  fn: function(){
    function n(){
      return this;
    }
    return n();
  }
}
console.log(foo.fn()); // window
```

```js
var foo = {
  fn: function(){
    function n(){
      'use strict';
      return this;
    }
    return n();
  }
}
console.log(foo.fn()); // undefined
```

如果想访问这个外部函数的 `this` 值，需要将 `this` 的值保存在一个变量里，这个变量和内部函数都同在一个作用域内。通常使用变量 `self` 或 `that` 来保存 `this`。

```js
const foo = {
  fn: function(){
    const self = this;
    console.log(this === foo);
    //true

    function n(){
      console.log(this === foo);
      //false

      console.log(self === foo);
      //true

      return self;
    }

    return n();
  }
}

console.log(foo.fn() === foo);
// true
```

