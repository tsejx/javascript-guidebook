---
nav:
  title: OOP
  order: 4
group:
  title: 创建对象
  order: 3
title: 组合使用构造函数模式和原型模式
order: 4
---

# 组合使用构造函数模式和原型模式

构造函数模式用于**定义实例属性**，而原型模式用于**定义方法和共享的属性**。

结果，每个实例都会有自己的一份实例属性的副本，但同时又共享着对方法的引用，最大限度地节省了内存。另外，这种混成模式还支持向构造函数传递参数，可谓是集两种模式之长。

```js
// 构造函数
function Person(name, age, job){
  this.name = name;
  this.age = age;
  this.job = job;
  this.friends = ['Amy', 'Ben'];
}

// 原型模式
Person.prototype = {
  constructor: Person,
  sayName: function(){
    console.log(this.name);
  }
}

const uzi = new Person('Uzi', 22, 'Software Engineer');
const tom = new Person('Tom', 25, 'Doctor');

uzi.friends.push('Peter');
console.log(uzi.friends);
// 'Amy,Ben,Peter'
console.log(tom.friends);
// 'Amy,Ben'

console.log(uzi.friends == tom.friends);
// false
console.log(uzi.sayName == tom.sayName);
// true
```

在这个例子中，实例属性都是在构造函数中定义的，而由所有实例共享的属性 `constructor` 和方法 `sayName()` 则是在原型中定义的。而修改了 `uzi.friends`（向其中添加一个新字符串），并不会影响到 `tom.friends`，因为它们分别引用了不同的数组。
