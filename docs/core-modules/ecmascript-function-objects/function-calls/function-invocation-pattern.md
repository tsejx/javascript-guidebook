---
nav:
  title: 核心模块
  order: 3
group:
  title: 函数调用
  order: 8
title: 函数调用模式
order: 2
---

# 函数调用模式

**函数调用模式（Function Invocation Pattern）**

当一个函数并非一个对象的属性时，那么它就是被当做一个函数来调用的。对于普通的函数调用来说，函数的返回值就是调用表达式的值。

```js
function add ( x, y ){
  return x + y;
}

var sum = add( 3, 4);

console.log( sum ) // 7
```

## 调用母体

使用函数调用模式调用函数时，非严格模式下，`this` 被绑定到全局对象；在严格模式下，`this` 是 `undefined`。

```js
function add( x, y){
  console.log( this );
  // window
}
add();

function add(x,y){
  'use strict';
  console.log(this);
  // undefined
}
add();
```

💡因此，`this ` 可以用来判断当前是否是严格模式

```js
const strict = (function(){
  return !this;
}());
```

## 重写现象

因为函数调用模式的函数中的 `this` 绑定到全局对象，所以会发生全局属性被重写的现象。

```js
var a = 0;

function fn(){
  this.a = 1;
}

fn();

console.log(this, this.a, a);
// window 1 1
```