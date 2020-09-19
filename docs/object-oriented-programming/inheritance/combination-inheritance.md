---
nav:
  title: OOP
  order: 4
group:
  title: 继承
  order: 4
title: 组合继承
order: 3
---

# 组合继承

**组合继承（Combination Inheritance）**（也叫伪经典继承），指的是将原型链和借用构造函数的技术组合到一块，从而发挥二者之长的一种继承模式。

其背后的思路是使用原型链实现对原型对象的属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。这样，既通过在原型上定义方法实现了函数复用，又能够保证每个实例都有它自己的属性。

🌰 **示例：**

```js
function Parent(name) {
  this.name = name;
  this.attr = {
    eye: 'blue',
    hair: 'black',
    skin: 'white',
  };
}

Parent.prototype.sayName = function() {
  console.log(this.name);
};

function Child(name, age) {
  // 第二次调用 Parent()
  // Child.prototype 又得到了 name 和 attr 两个属性
  // 并对上次得到的属性值进行了覆盖
  Parent.call(this, name);
  this.age = age;
}

// 第一次调用 Parent()
// 使得子类实例的原型对象指向父类实例对象
// Child.prototype 得到了 name 和 attr 两个属性
Child.prototype = new Parent();
Child.prototype.constructor = Child;
Child.prototype.sayAge = function() {
  console.log(this.age);
};

// 第一个实例对象
let uzi = new Child('Uzi', 3);

uzi.attr.height = 80;

console.log(uzi.attr);
// { eye: 'blue', hair: 'black', skin: 'white', height: 80 }
uzi.sayName();
// 'Uzi'
uzi.sayAge();
// 3

// 第二个实例对象
let kat = new Child('Kat', 1);

console.log(kat.colors);
// { eye: 'blue', hair: 'black', skin: 'white' }
kat.sayName();
// 'Kat'
kat.sayAge();
// 1
```

实现步骤分解：

- 父类构造函数定义自身属性（`Parent` 构造函数定义了`name` 和 `attr`）
- 父类原型上定义方法（`Parent` 的原型定义了一个方法 `sayName`）
- 子类构造函数调用父类构造函数，传入参数，继承父类构造函数中的属性，随后子类构造函数又自定义自身的属性（`Child` 构造函数在调用 `Parent` 构造函数时传入了 `name` 参数，紧接着又定义了它自己的属性 `height`。）
- 子类构造函数的原型指向父类构造函数生成的实例（将 `Parent` 的实例赋值给 `Child` 的原型）
- 在子类构造函数的原型上定义方法（在 `Child` 的原型上定义了方法 `sayAge`）
- 这样一来，就可以让两个不同的子类实例对象既分别拥有自己属性，又可以使用相同的方法

## 缺陷

无论什么情况下，**都会调用两次父类构造函数**：第一次是在**创建子类型原型**的时候，另一次是在**子类型构造函数内部**。子类型对象最终会包含父类型对象的全部实例属性，但不得不在调用子类型构造函数时重写这些属性。

## 组合继承优化

组合继承优化示例一：

```js
// Before
Child.prototype = new Parent();

// After
Child.prototype = Parent.prototype;
```

这种优化方式的缺点是，子类实例对象的构造函数无法区分是子类构造函数还是父类构造函数。

📌 **完美写法：寄生组合式继承**

组合继承优化示例二：通过中间对象，继承父类原型对象，实现子类与父类的隔离

```js
function Parent() {
  this.name = 'Parent';
  this.num = [0, 1, 2];
}

function Child() {
  Parent.call(this);
  thi.type = 'Child';
}

Child.prototype = Object.create(Parent.prototype);

Child.prototype.constructor = Child;
```
