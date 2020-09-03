---
nav:
  title: 核心模块
  order: 3
group:
  title: 函数调用
  order: 8
title: 构造函数调用模式
order: 3
---

# 构造函数调用模式

**构造函数调用模式（Constructor Invocation Pattern）**

构造函数调用模式的特征：

1. 构造函数的首字母一般要大写
2. 一般情况下和关键字 `new` 一起使用
3. 构造函数中的 `this` 指向 `new` 关键字创建出来的实例对象
4. 默认返回 `new` 创建出来的这个对象（`this`）

## 关键字 `new`

如果函数或者方法调用之前带有关键字 `new`，它就构成构造函数调用。

```js
function fn(){
  this.a = 1;
};

const obj = new fn();

console.log(obj.a);
//	1
```

## 实参表达式

如果构造函数调用在圆括号内包含一组实参列表，先计算这些实参表达式，然后传入函数内。

```js
function fn(x){
  this.a = x;
};

const obj = new fn(2);

console.log(obj.a); // 2
```

## 省略圆括号

如果构造函数没有形参，JavaScript 构造函数调用的语法是允许省略实参列表和圆括号的。凡是没有形参的构造函数调用都可以省略圆括号。

```js
const target = new Object();
//等价于
const target = new Object;
```

## 调用上下文

尽管构造函数看起来像一个方法调用，它依然会使用这个新对象作为调用上下文。也就是说，在表达式 `new target.fn()` 中，调用上下文并不是 `target`。

```js
const target = {
  fn: function(){
    return this;
  }
}

var obj = new target.fn();

console.log(obj,obj === target);
//{} false
console.log(obj.constructor === target.fn);
//true
```

## 构造函数的返回语句

构造函数通常不使用 `return` 关键字，它们通常初始化新对象，当构造函数的函数体执行完毕时，它会显式返回。在这种情况下，构造函数调用表达式的计算结果就是这个新对象的值。

```js
function fn(){
  this.a = 2;
}

const test = new fn();

console.log(test);
// { a: 2 }
```

如果构造函数使用 `return` 语句但没有指定返回值，或者返回一个原始值，那么这时将忽略返回值，同时使用这个新对象作为调用结果。

```js
function fn(){
  this.a = 2;
  return;
}

const test = new fn();

console.log(test);
// { a: 2 }
```

如果构造函数显式地使用 `return` 语句返回一个对象，那么调用表达式的值就是这个对象。

```js
const obj = { a: 1 };

function fn(){
  this.a = 2;

  return obj;
}

const test = new fn();

console.log(test);
// { a: 1 }
```

