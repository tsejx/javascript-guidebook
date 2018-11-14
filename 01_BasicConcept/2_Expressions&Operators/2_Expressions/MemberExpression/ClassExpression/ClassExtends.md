## Class 的继承

### 继承

> 继承，是子类继承父类的特征和行为，使得子类对象具有父类的实例域和方法。 继承是面向对象编程中，不可或缺的一部分。

**优点**

- `减少代码冗余 `父类可以为子类提供通用的属性，而不必因为增加功能，而逐个修改子类的属性
- `代码复用` 同上
- `代码易于管理和扩展` 子类在父类基础上，可以实现自己的独特功能

**缺点**

- `耦合度高` 如果修改父类代码，将影响所有继承于它的子类
- `影响性能` 子类继承于父类的数据成员，有些是没有使用价值的。但是，在实例化的时候，已经分配了内存。所以，在一定程度上影响程序性能。

### 类的继承

与 ES5 通过修改原型链实现继承不同，类通过 `extends` 关键字实现继承，继承父类的所有属性和方法。

```js
class Person {
    
}

class Boy extends Person {
    constructor () {
        super()
    }
}
```

子类必须在构造函数中调用 `super` 方法，否则新建实例会报错。这是因为子类自己的 `this` 对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用 `super` 方法，子类就得不到 `this` 对象。

如果子类没有定义构造函数，这个方法会被默认添加。也就是说，不管有没有显式定义，任何一个子类都有构造函数。

另一个需要注意的是，在子类的构造函数中，只有调用 `super` 之后，才可以使用 `this` 关键字，否则会报错。这是因为子类实例的构建，基于父类实例，只有 `super` 方法才能调用父类实例。

```js
class Person {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Boy extends Person {
  constructor(x, y, color) {
    this.color = color; // ReferenceError
    super(x, y);
    this.color = color; // 正确
}
```

### Object.getPrototypeOf()

`Object.getPrototypeOf()` 方法可以用来从子类上获取父类。

```js
Object.getPrototypeOf(Boy) === Point
```

因此，可以通过此方法判断，一个类是否继承了另一个类。

### super 关键字

`super` 关键字，既可当作函数使用，也可以当作对象使用。

当 `super` 作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次 `super` 函数。而且，`super()` 函数仅能在构造函数中执行，否则会报错。

```js
class A {}

class B extends A {
    constructor () {
        super()
    }
}
```

虽 `super` 代表了父类 `A` 的构造函数，但是返回的是子类 `B` 的实例，即 `super` 内部的 `this` 指的是 `B`，因此 `super()` 在这里相当于 `A.prototype.constructor.call(this)`。

当 `super` 作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

```js
class A {
    p(){
        return 2
    }
}

class B extends A {
    constructor() {
        super()
        console.log(super.p())	// 2
    }
}
```

上面代码中，子类 `B` 当中的 `super.p()`，就是将 `super` 当作一个对象使用。这时，`super` 在普通方法之中，指向 `A.prototype`，所以 `super.p()` 就相当于 `A.prototype.p()`。

ES6 规定，**在子类普通方法中通过 `super` 调用父类的方法时，方法内部的 `this` 指向当前的子类实例。**

```js
// Example
class A {
    constructor(){
        this.x = 1
    }
    print(){
        console.log(this.x)
    }
}

class B extends A {
    constructor(){
        super()
        this.x = 2
    }
    m(){
        super.print()	// print方法执行时this实际指向的是子类实例
    }
}

let b = new B()
b.m()	// 2
```

**在子类的静态方法中通过 `super` 调用父类的方法时，方法内部的 `this` 指向的是当前的子类，而不是子类的实例。**

```js
class A {
  constructor() {
    this.x = 1;
  }
  static print() {
    console.log(this.x);
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  static m() {
    super.print();
  }
}

B.x = 3;
B.m() // 3
```

注意，使用 `super` 的时候，必须显式指定是作为函数，还是作为对象调用，否则会报错。

```js
class A {}

class B extends A {
    constructor(){
        super()
        console.log(super)		// 报错
    }
}
```

**在子类调用父类方法 `this` 指向总结**

- `super` 作为对象时
  - 在子类的**普通方法**
    - `super` 指向**父类的原型对象**
    - 通过 `super` 调用父类的方法时，方法内部的 `this` 指向当前的**子类实例**
  - 在子类的**静态方法**中
    - `super` 指向**父类**，而不是父类的原型对象
    - 通过 `super` 调用父类的方法时，方法内部的 `this` 指向当前**子类**，而不是子类的实例

### 类的 `prototype` 属性和 `__proto__` 属性

大多数浏览器的 ES5 实现之中，每一个对象都有 `__proto__` 属性，指向对应的构造函数的 `prototype` 属性。Class 作为构造函数的语法糖，同时有 `prototype` 属性和 `__proto__` 属性，因此同时存在两条继承链。

1. 子类的 `prototype` 属性，表示构造函数的继承，总是指向**父类**。
2. 子类的 `prototype` 属性的 `__proto__` 属性，表示**方法的继承**，总是指向**父类的 `prototype` 属性**。

```js
class A {}

class B extends A {}

B.__proto === A		// true
B.prototype.__proto__ === A.prototype	// true
```

类的继承是按照下面的模式实现的。

```js
class A {}

class B {}

// B 的实例继承 A 的实例
Object.setPropertyOf(B.prototype, A.prototype)

// B 继承 A 的静态属性
Object.setPropertyOf(B, A)

const b = new B()
```

这两条继承链，可以这样理解：

- 作为一个对象，子类（`B`）的原型（`__proto__`属性）是父类（`A`）
- 作为一个构造函数，子类（`B`）的原型对象（`prototype` 属性）是父类的原型对象（`prototype` 属性）的实例

**子类继承 `Object` 类**

```js
class A extends Object {}

A.__proto__ === Object	// true
A.prototype.__proto__ === Object.prototype	// true
```

这种情况下，`A` 其实就是构造函数 `Object` 的复制，`A` 的实例就是 `Object` 的实例。

**不存在任何继承**

```js
class A {}

A.__proto__ === Function.prototype	// true
A.prototype.__proto__	=== Object.prototype	// true
```

这种情况下，`A` 作为一个基类（即不存在任何继承），就是一个普通函数，所以直接继承 `Function.prototype`。但是，`A` 调用后返回一个空对象（即 `Object` 实例），所以 `A.prototype.__proto__` 指向构造函数（`Object`）的 `prototype` 属性。

---

**参考资料：**

* [类的继承](https://juejin.im/post/5b5f3e9c5188257bcc167bc6)