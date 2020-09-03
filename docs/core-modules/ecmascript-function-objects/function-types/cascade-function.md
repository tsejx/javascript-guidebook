---
nav:
  title: 核心模块
  order: 3
group:
  title: 函数类型
  order: 10
title: 级联函数
order: 4
---

# 级联函数

**级联函数** 也叫 **链式函数**，是一种在一个对象上使用一条连续的代码来重复调用不同方法的技巧。这种技巧在 jQuery 和其他一些 JavaScript 库中很流行，它甚至也是一些 JavaScript 原生方法的内在特性，比如常见的字符串方法。一定程度上可以减少代码量，提高代码可读性，缺点是它占用了函数的返回值。

级连函数的表达形式如下所示：

```js
// jQuery
$('#wrapper').fadeOut().html('Welcome, Sir').fadeIn();

// 字符串操作
'kankuuii'.replace('k', 'R').toUpperCase().substr(0, 4);
// 'RANK'
```

## 实现方法

要使用级联函数，我们只需要在每个函数中返回 `this` 对象（也就是后面方法中操作的对象）。操作的对象就会在执行完一个函数后继续调用往后的方法，即实现了链式操作了。

```js
function Person() {
  this.name = '';
  this.age = 0;
  this.weight = 10;
}

Person.prototype = {
  setName:function(name){
    this.name = name;
    return this;
  },
  setAge:function(age){
    this.age = age;
    return this;
  },
  setWeight:function(weight) {
    this.weight = weight;
    return this;
  }
}

var uzi = new Person();

uzi.setName('Uzi').setAge(22).setWeight(160);

console.log(uzi);
// { name: "Uzi", age: 22, weight: 160 }
```

通过工厂函数创建实例对象，由于所有对象都会继承其原型对象的属性和方法，所以我们可以让定义原型对象中的那几个方法都返回用以调用方法的实例对象的引用，这样既可以对那些方法进行链式调用。
