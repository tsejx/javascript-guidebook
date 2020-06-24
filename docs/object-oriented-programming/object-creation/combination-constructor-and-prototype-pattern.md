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

构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性。结果，每个实例都会有自己的一份实例属性的副本，但同时又共享着对方法的引用，最大限度地节省了内存。另外，这种混成模式还支持向构造函数传递参数；可谓是集两种模式之长。

```js
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ['Shelby', 'Court'];
}

Person.prototype = {
    constructor: Person,
    sayName: function(){
        alert(this.name);
    }
}

const person1 = new Person('Nicholas', 29, 'Software Engineer');
const person2 = new Person('Greg', 27, 'Doctor');

person1.friends.push('Van');
console.log(person1.friends);		// 'Shelby,Count,Van'
console.log(person2.friends);		// 'Shelby,Count'

console.log(person1.friends == person2.friends);	// false
console.log(person1.sayName == person2.sayName);	// true
```

在这个例子中，实例属性都是在构造函数中定义的，而由所有实例共享的属性 constructor 和方法 `sayName()` 则是在原型中定义的。而修改了 `person1.friends`（向其中添加一个新字符串），并不会影响到 `person2.friends`，因为它们分别引用了不同的数组。