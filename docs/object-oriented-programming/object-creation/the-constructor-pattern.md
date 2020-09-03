---
nav:
  title: OOP
  order: 4
group:
  title: 创建对象
  order: 3
title: 构造函数模式
order: 2
---

# 构造函数模式

ECMAScript 中的构造函数可用来创建特定类型的对象。像 Object 和 Array 这样的原生构造函数，在运行时会自动出现在执行环境中。此外，也可以创建自定义的构造函数，从而定义自定义对象类型的属性和方法。

```js
function Person(name, age, job){
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function(){
    console.log(this.name);
  }
}

const person1 = new Person('Ben', 21, 'student');
const person2 = new Person('Gray', 25, 'Doctor');
```

构造函数模式与工厂模式实现过程的区别：

- 没有显式地创建对象
- 直接将属性和方法赋给了 this 对象
- 没有 `return` 语句

按照惯例，构造函数始终都应该以一个大写字母开头，而非构造函数则应该以一个小写字母开头。这个做法借鉴自其他 OO 语言，主要是为了区别于 ECMAScript 中的其他函数。因为构造函数本身也是函数，只不过可以用来创建对象而已。

## 将构造函数当作函数

构造函数与其他函数的唯一区别，就在于调用它们的方式不同。不过，构造函数毕竟也是函数，不存在定义构造函数的特殊语法。任何函数，只要同 `new` 操作符来调用，那它就可以作为构造函数；而任何函数，如果不同过 `new` 操作符来调用，那它跟普通函数也不会有什么两样。

## 构造函数的问题

使用构造函数，每个方法都要在每个实例上重新创建一遍。不要忘了，ECMAScript 中的函数就是对象，因此每定义一个函数，也就是实例化一个对象。

虽然两个实例中都拥有同名的方法函数，但是两个函数不是同一个 Function 的实例。

```js
function Person(name, age, job){
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = new Function('console.log(this.name)');
  // 与声明函数在逻辑上是等价的
}
```

从这个角度上来看构造函数，更容易明白每个实例都包含一个不同的 Function 实例的本质。说明白些，以这种方式创建函数，会导致不同的作用域链和标识符解析，但创建 Function 新实例的机制仍然是相同的。因此，不同实例上的同名函数是不相等的。

```js
console.log(person1.sayName == person2.sayName);
// false
```

然而，创建两个完全同样任务的 Function 实例的确没有必要，况且有 `this` 对象在，根本不用再执行代码前就把函数绑定到特定对象上面。把函数定义转移到构造函数外部来解决重复创建函数实例的问题。

```js
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = sayName;
}

function sayName(){
  console.log(this.name);
}

const person1 = new Person('Ben', 21, 'student');
const person2 = new Person('Gray', 25, 'Doctor');
```

在全局作用域中定义的函数实际上只能被某个对象调用，这让全局作用域有点名不副实。而更让人无法接受的是：如果对象需要定义很多方法，那么就要定义很多歌全局函数，于是我们这个自定义的引用类型就丝毫没有封装性可言了。而这些问题可以通过 [原型模式](./the-prototype-pattern) 来解决。

## ES6 模块实现

底层实现原理与 ES5 一样，只是语法更简洁。

```js
class Person {
  constructor(name, age, job) {
    this.name = name;
    this.age = name;
    this.job = job;
  }

  sayName() {
    console.log(this.name);
  }
}
```

