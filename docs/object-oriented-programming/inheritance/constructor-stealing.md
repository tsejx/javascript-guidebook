---
nav:
  title: OOP
  order: 4
group:
  title: 继承
  order: 4
title: 借用构造函数
order: 2
---

# 借用构造函数

**借用构造函数（Constructor Stealing）**，即在子类型构造函数的内部调用父类构造函数以实现对父类构造函数属性的继承。

🌰 **示例：**

```js
function Parent() {
  this.attr = {
    eye: 'blue',
    hair: 'black',
    skin: 'white',
  };
  this.sayName = function () {
    console.log('Name');
  };
}

function Child() {
  Parent.call(this);

  this.sayHi = function () {
    console.log('Hello world!');
  };
}

let boy = new Child();
boy.attr.age = 3;
console.log(boy.attr);
// { eye: 'blue', hair: 'black', skin: 'white', age: 3}

let girl = new Child();
console.log(girl.attr);
// { eye: 'blue', hair: 'black', skin: 'white'}
```

在构造函数 `Child` 内通过 `call` 方法（或 `apply` 方法也可以），使得 `Parent` 的构造函数能在 `Child` 构造函数的环境下调用。

如此一来，子类构造函数 `Child` 上执行父类构造函数 `Parent` 中定义的所有对象初始化代码。

`Child` 的每个实例都会具有自己的继承与父类构造函数的属性的副本。

> ⚠️ **注意**： 函数只不过是在特定环境中执行代码的对象，因此通过使用 `apply` 和 `call` 方法也可以在新创建的对象上执行构造函数。

## 传递参数

相对于原型链而言，借用构造函数有一个很大的优势，即 **可以在子类型构造函数中向父类型构造函数传递参数**。

```js
function Parent(name) {
  this.name = name;
}

function Child() {
  //继承了 Parent，同时还传递了参数
  Parent.call(this, 'Uzi');

  //实例属性
  this.age = 18;
}

const child = new Child();
console.log(child.name);
// 'Uzi'
console.log(child.age);
// 18
```

- 通过往父类型构造函数传递参数，能自定义需要继承的属性
- 为了确保子构造函数自身定义的属性或方法不被父构造函数生成的属性重写，可以在调用父类型构造函数后，再添加子类型构造函数中定义的属性

## 缺陷

- 只能继承父类**实例对象**的属性和方法，不能继承**原型对象**的属性和方法
- 无法实现复用，每个子类都有父类实例函数的副本，影响性能
