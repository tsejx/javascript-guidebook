---
nav:
  title: OOP
  order: 4
group:
  title: 创建对象
  order: 3
title: 动态原型模式
order: 5
---

# 动态原型模式

动态原型模式将所有信息都封装在构造函数中，而通过构造函数中初始化原型（仅第一个对象实例化时初始化原型），这个可以通过判断该方法是否有效而选择是否需要初始化原型。

```js
function Person(name, age, job) {
  // 属性
  this.name = name;
  this.age = age;
  this.job = job;

  // 方法（动态插入原型方法）
  if (typeof this.sayName != 'function'){
    Person.prototype.sayName = function(){
      console.log(`I'm ${this.name}`);
    }
  }
}

const uzi = new Person('Uzi', 2, 'E-Sports Player');

uzi.sayName();
// 'I'm Uzi'
```

这里只在 `sayName()` 方法不存在的情况下，才会将它添加到原型中。这段代码只会在初次调用构造函数时才会执行。此后，原型已经完成初始化，不需要再做什么修改了。不过要记住，这里对原型所做的修改，能够立即在所有实例中得到反映。

使用动态原型模式时，不能使用对象字面量重写原型。如果在已经创建了实例的情况下重写原型，那么就会切断现有实例与新原型之间的联系。