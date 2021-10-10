---
nav:
  title: OOP
  order: 4
group:
  title: 类
  order: 5
title: 类的基本语法
order: 1
---

# 类的基本语法

ECMAScript 6 中的 Class（类）概念，实际上可以把它看作 ECMAScript 5 对象原型写法的语法糖。

## 基本写法

利用 ES5 实现对象原型：

```js
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ',' + this.y + ')';
};

var p = new Point(1, 2);
```

利用 ES6 实现对象原型：

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return '(' + this.x + ',' + this.y + ')';
  }
}
```

## 表现形式

类有两种表现形式：声明式和表达式。

### 类的声明式

与 ES5 相同的是，类也是通过 `new` 关键字创建对象实例。

与 ES5 不同的是，在 ES6 中，我们将原型的实现写在了类中，但本质上还是一样的，都是需要新建一个类名，然后实现构造函数，再实现原型方法。

```js
class Foo(){
  // 构造函数
  constructor(name = 'Tom'){
    this.name = name
  }

  // 定义一个方法并且赋值给构造函数的原型
  sayName(){
    console.log(this.name)
  }
}

const foo = new Foo()
foo.sayName()
// 'Tom'
```

类声明和函数声明的区别和特点：

1. 函数声明可以被提升，类声明不能提升（与 `let` 声明类似）
2. 类声明中的代码自动强行运行在 <strong style="color: red">严格模式</strong> 下
3. 只能通过 `new` 关键字来声明类，声明类会调用类的构造函数
4. 每个类都有一个 `[[construct]]` 的方法，该方法就是构造函数
5. 类的所有方法都定义在类的 `prototype` 属性上
6. 类中的方法无需添加 `function` 关键字，只需直接添加到类中
7. 方法间不需要添加逗号（`,`），加了会报错
8. 类中的所有方法都是 <strong style="color: red">不可枚举的</strong>（Non-Enumerable），而自定义类型中，可以通过 `Object.definedProperty()` 手工指定不可枚举属性
9. 在类的实例上调用方法，实质上就是调用原型上的方法
10. 不能在类中修改类名
11. `name` 属性总是返回紧跟 `class` 的关键字后的类名
12. `this` 的指向默认指向 <strong style="color: red">类的实例</strong>

### 类的表达式

```js
// 表达式
// 这个类的名称为 Baz2 而不是 Baz1
// Baz1 只有在类内部代码可用 指代当前类
const Baz2 = class Baz1 {
  constructor() {}
  getClassName() {
    return Baz1.name;
  }
};
```

## 类的组成

### 构造函数

构造函数（`constructor` 方法）是类的默认方法，通过 `new` 关键字生成对象实例时，自动调用该方法。若没有显式定义，一个空的构造函数会被默认添加。

> ⚠️ **注意**：类必须使用 `new` 关键字调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用 `new` 关键字也能执行。

### 实例对象

与 ES5 一样，实例的属性除非显式定义在其本身（即定义在 `this` 对象上），否则都是定义在 **原型对象** 上（即定义在 `class` 上）。

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return `(${this.x}, ${this.y})`;
  }
}

const point = new Point(2, 3);

// 实例化类后，挂载在 this 上的属性会在挂载到实例对象上
point.toString();
// (2, 3)
point.hasOwnProperty('x');
// true
point.hasOwnProperty('y');
// true

// 而挂载在类上的方法则挂载在原型链上
point.hasOwnProperty('toString');
// false
point.__proto__.hasOwnProperty('toString');
// true
```

<br />

- 变量 `x` 和 `y` 都是实例对象 `point` 自身的属性（因为定义在 `this` 变量上）
- 而 `toString` 是原型对象的属性（因为定义在 `Point` 类上）

与 ES5 一样，类的所有实例共享一个原型对象。这也意味着，可以通过实例的 `__proto__` 属性为类添加方法。

> `__proto__`  并不是语言本身的特性，这是各大厂商具体实现时添加的私有属性，虽然目前很多现代浏览器的 JavaScript 引擎中都提供了这个私有属性，但依旧不建议在生产中使用该属性，避免对环境产生依赖。
>
> 生产环境中，我们可以使用  `Object.getPrototypeOf`  方法来获取实例对象的原型，然后再来为原型添加方法/属性。

### 访问器属性

与 ES5 一样，在类的内部也可以使用 `get` 和 `set` 关键字，对某个属性设置 **存值函数** 和 **取值函数**，拦截该属性的存取行为。

尽管应该在类的构造函数中创建自己的属性，但是类也支持直接在原型上定义访问器属性。

```js
class Student () {
  constructor () {
    // ...
  }
  get run () {
    return 'get'
  }
  set run (value) {
    console.log(`set: ${value}`)
  }
}

let inst = new Student()

Student.run = 'abc'
// set: abc

Student.run
// get
```

### 属性表达式

类的属性名，可以采用表达式。

```js
const methodName = 'getArea'

class Square(){
  constructor(length){
    // ...
  }
  [methodName](){
    // ...
  }
}
```

### 生成器方法

如果某个方法之前加上星号（`*`），就表示该方法是一个生成器方法（Generator 函数）。

```js
class Foo {
  constructor(...args) {
    this.args = args;
  }
  *[Symbol.iterator]() {
    for (let arg of this.args) {
      yield arg;
    }
  }
}

for (let x of new Foo('hello', 'world')) {
  console.log(x);
}
// hello
// world
```

## 运行环境的指向

类的方法内部如果含有 `this`，它默认指向 **类的实例**。

但是，如果将类方法内部的方法提取出来单独使用，`this` 会指向该方法 **运行时所在的环境**，因为找不到相对应的方法而导致报错。

因此，需要 **在构造函数中绑定 `this`** ，这样就不会找不到相对应的方法。

```js
class Student {
  constructor() {
    this.sayName = this.sayName.bind(this);
  }
}
```

另一种解决方法是使用 **箭头函数**。

```js
class Car {
  constructor() {
    this.sayName = (name = 'BOT') => {
      this.sayName(`My name is ${name}`);
    };
  }
}
```

还有一种解决方法是使用 `Proxy` ，获取方法的时候，自动绑定 `this`。

---

**参考资料：**

- [📝 ECMAScrept 6 入门：Class 的基本语法](http://es6.ruanyifeng.com/#docs/class)
- [📝 ES6 JavaScript 中的类 class](https://juejin.im/entry/59bbb3b65188256c4b723bdb)
