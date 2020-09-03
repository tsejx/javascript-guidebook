---
nav:
  title: 核心模块
  order: 3
group:
  title: 函数类型
  order: 10
title: 构造函数
order: 1
---

# 构造函数

在典型的 OOP 语言中，如 Java 都存在类的概念，类就是对象的模版，对象就是类的实例。但是在 JavaScript 中不存在类的概念，JavaScript 不是基于类，而是通过构造函数（constructor）和原型链（prototype chains）实现的。但在 ES6 中引入了类（class） 这个概念，作为对象的模版，新的 `class` 写法知识让原型对象的写法更加清晰，这里不重点谈这个。

## 特点

构造函数的特点：

1. 构造函数的首字母必须大写，用来区分于普通函数
2. 内部使用的 `this` 对象，来指向即将要生成的实例对象
3. 使用 `new` 关键字来生成实例对象

```js
function Person(name, age){
  this.name = name;
  this.age = age;
  this.sayHello = function(){
    console.log(this.name + "say hello");
  }
}

const foo = new Person('Bella', 23);

foo.sayHello();
// Bella say hello
```

## 缺点

构造函数的缺点：

1. 所有实例都会通过原型链引用到 `prototype`
2. `prototype` 相当于特定类型所有实例都可以访问到一个公共容器
3. 那么我们就将重复的东西放到公共容器就好了

## 作用

`constructor` 属性的作用

1. 分辨原型对象到底是哪个构造函数

```js
function Person(){};

const person1 = new Person();

console.log(person1.constructor === Person);
// true
```

2. 从实例中新建另一个实例

```js
function Person(){};

const person1 = new Person(){};
const person2 = new person1.constructor();

console.log(person2 instanceof Person);
// true
```

3. 由于 `constructor` 属性是一种原型对象和构造函数的关系，所以在修改原型对象对的时候，一定要注意 `constructor` 的指向问题，避免 `instanceof` 失真。

## 与普通函数对比

在命名规则上，构造函数一般是首字母大写，普通函数遵照小驼峰式命名法。

在函数调用的时候：

| 构造函数                                       | 普通函数                                                     |
| :---------------------------------------------- | :------------------------------------------------------------ |
| `new Fn()`                                     | `fn()`                                                       |
| 构造函数内部会创建一个新的对象，即 `Fn` 的实例 | 在调用函数的内部不会创建新的对象                             |
| 函数内部的 `this` 指向 新创建的 `Fn` 的实例    | 函数内部的 `this` 指向调用函数的对象（如果没有对象调用，默认是 `window`） |
| 默认的返回值是 `Fn` 的实例                     | 返回值由 `return` 语句决定                                   |

构造函数的返回值：

有一个默认的返回值，新创建的实例对象。

当手动添加返回值后（`return` 语句）：

1. 返回值是基本数据类型的话，真正的返回值还是那个新创建的实例对象
2. 返回值是复杂数据类型（对象）的话，真正的返回值是这个对象