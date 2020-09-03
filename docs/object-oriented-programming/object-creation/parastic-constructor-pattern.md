---
nav:
  title: OOP
  order: 4
group:
  title: 创建对象
  order: 3
title: 寄生构造函数模式
order: 6
---

# 寄生构造函数模式

寄生构造函数模式的基本思想是创建一个函数，该函数的作用仅仅是封装创建对象的代码，然后再返回新创建的对象；但从表面上看，这个函数又很像是典型的构造函数。

```js
function Person(name, age, job){
  let obj = new Object();
  obj.name = name;
  obj.age = age;
  obj.job = job;
  obj.sayName = function(){
      console.log(`I'm ${this.name}`);
  };

  return obj;
}

let uzi = new Person('Uzi', 22, 'E-Sports Player');
uzi.sayName();
// I'm Uzi
```

在构造函数的末尾添加一个 `return` 语句，可以重写调用构造函数时返回的值。

关于寄生构造函数模式，有一点需要说明：首先，返回的对象与构造函数或者与构造函数的原型属性之间没有关系。也就是说，构造函数返回的对象与构造函数外部创建的对象没有什么不同。为此，不能依赖 `instanceof` 操作符来确定对象类型。