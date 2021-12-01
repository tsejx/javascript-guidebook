---
nav:
  title: OOP
  order: 4
group:
  title: 类
  order: 5
title: 静态成员
order: 4
---

# 静态成员

类的静态成员包括 **静态方法** 和 **静态属性**。

- 静态方法定义在类的内部（不是定义在实例对象 `this` 上）
- 静态属性通过对象的属性访问器定义（新提案提供了关键字 `static` 用于定义）

## 静态方法

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。

如果在一个方法前，加上 `static` 关键字，就表示该方法不会被实例继承，而是需要直接通过类来调用，这就称为 **静态方法**。

```js
class Foo {
  static sayHi() {
    return 'Hello';
  }
}

Foo.sayHi();
// 'Hello'

const foo = new Foo();

foo.sayHi();
// TypeError: foo.sayHi is not a function
```

### 动态作用域

⚠️ **注意**： 如果静态方法包含 `this` 关键字，这个 `this` 指的是类，而不是实例。

```js
class Foo {
  static bar() {
    this.baz();
  }
  static baz() {
    console.log('Hello');
  }
  baz() {
    console.log('World!');
  }
}

Foo.bar();
// 'Hello'
```

### 子类继承

父类的静态方法，可以被子类继承。

```js
class Foo {
  static sayHi() {
    return 'Hello';
  }
}

class Bar extends Foo {}

Bar.sayHi();
// 'Hello'
```

## 静态属性

由于在 ES6 中明文规定，类内部只有静态方法，没有静态属性。因此，类的静态属性无法直接在类内部直接定义。

```js
// 以下写法无效
class Foo {
  // 写法一
  prop: 2;

  // 写法二
  static prop: 2;
}
```

目前有一个静态属性提案，对实例属性和静态属性都规定了新的写法。

过去，需要在类的构造函数中定义实例属性。

现在，**类的实例属性**可以用等式，写入类的定义之中。这种写法比以前更清晰。

```js
// Old
class Foo {
  constructor() {
    this.state = {
      visible: true,
    };
  }
}

// New
class Bar {
  state = {
    visible: true,
  };

  constructor() {
    console.log(this.state.visible); // true
  }
}
```

**为了可读性的目的，对于那些在构造函数中已经定义的实例属性，新写法允许直接在类中列出。**

类的静态属性只需在上述的实例属性写法前加上 `static` 关键字即可。

```js
class MyClass {
  static state = {
    visible: true,
  };
  constructor() {
    console.log(MyClass.state.visible); // true
  }
}
```

新写法是显式声明（declarative），而非赋值处理，语义更好。
