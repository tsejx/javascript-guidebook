---
nav:
  title: OOP
  order: 4
group:
  title: 继承
  order: 4
title: 寄生式继承
order: 5
---

# 寄生式继承

**寄生式继承（Parasitic Inheritance）**：创建一个仅用于封装继承过程的函数，在函数内部以某种方式增强对象

```js
function creator(origin) {
  // 以 origin 为原型对象创建一个新对象
  let clone = Object.create(origin);

  // 以某种方式来增强这个对象
  clone.sayHi = function () {
    console.log('Hello world!');
  };

  // 返回这个对象
  return clone;
}

let friendship = {
  name: 'Uzi',
  friends: ['Amy', 'Ben', 'Tom'],
};

// 具有实例的原型person的所有属性和方法，也有自己的方法
let uzi = creator(friendship);

uzi.sayHi();
// Hello world!
```

在主要考虑对象而 **不是自定义类型和构造函数的情况下**，寄生式继承也是一种有用的模式。前面示范继承模式时使用的 `Object` 函数不是必需的，任何能够返回新对象的函数都适用于此模式。

> ⚠️ **注意**： 使用寄生式继承来为对象添加函数，会由于不能做到函数复用而降低效率；这一点与借用构造函数模式类似。
