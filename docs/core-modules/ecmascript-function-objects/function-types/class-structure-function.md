---
nav:
  title: 核心模块
  order: 3
group:
  title: 函数类型
  order: 10
title: 类构造函数
order: 2
---

# 类构造函数

* ES5 中近类的结构
* ES6

## ES5 中近类的结构

ES5 中创建类的方法：新建一个构造函数，定义一个方法并且赋值给构造函数的原型

```js
'use strict';
function Person(name) {
    this.name = name;
}

Person.prototype.sayName = function () {
    return this.name;
};

const p = new Person('Poly');
console.log(p.sayName());		// Poly
```

## ES6 class 类

ES6 实现类非常简单，只需要类声明。

### 类声明

```js
class Person {
    // 新建构造函数
    constructor(name) {
        this.name = name;	// 私有属性
    }
    // 定义一个方法并且赋值给构造函数的原型
    sayName() {
        return this.name
    }
}

const p = new Person('Poly')；
console.log(p.sayName()); 			// Poly
```

和 ES5 中使用构造函数不同的是，在 ES6 中，我们将原型的实现写在类中，但本质上还是一样的，都是需要新建一个类名，然后实现构造函数，再实现原型方法。

私有属性是实例中的属性，不会出现在原型上，且只能在类的构造函数或方法中创建，此例的   `name` 就是一个私有属性。这里建议你在构造函数中创建所有私有属性，从而只通过一处就可以控制所有的私有属性。

定义私有属性，只需要在构造方法中定义 `this.xx = xx`。

值得注意的是：`typeof Person` 最终返回的结果是 `"function"`

**类声明和函数声明的区别和特点**：

1. 函数声明可以被提升，类声明不能提升（与 `let` 声明类似）
2. 类声明中的代码自动强行运行在严格模式下
3. 类中的所有方法都是不可枚举的，而自定义类型中，可以通过 `Object.defineProperty()` 手工指定不可枚举属性
4. 每个类都有一个 `[[constructor]]` 方法
5. 只能使用 `new` 来调用类的构造函数
6. 不能在类中修改类名

### 类表达式

类有两种表现形式：声明式和表达式

```js
// 声明式
class B {
    constructor(){}
}

// 匿名表达式
let A = class {
    constructor(){}
}

// 命名表达式，B可以在外部使用，而B1只能在内部使用
let B = class B1 {
    constructor(){}
}
```

### 类和普通函数的共性

1. 可以将类作为参数传入函数

```js
// 新建一个类
let A = class {
    sayName(){
        return 'Able'
    }
}

// 该函数返回一个类的实例
function test(classA) {
    return new classA();
}

// 给test函数传入A
let a = test(A);
console.log(a.sayName());	// Able
```

2. 通过立即调用类构造函数可以创建单例

用 `new` 调用类的表达式，紧接着通过一对小括号调用这个表达式。

```js
let a = new class {
    constructor(name) {
        this.name = name;
    }
    sayName(){
        return this.name
    }
}('Uzi')
console.log(a.sayName());	// Uzi
```

### 访问器属性

类支持在原型上定义访问器属性。

尽管应该在类的构造函数中创建自己属性，但是类也支持直接在原型上定义访问器属性。创建 `getter` 时，需要在关键字 `get` 后紧跟一个空格和响应的标识符；创建 `setter` 时，只需把关键字 `get` 替换为 `set` 即可。

```js
class A {
    constructor(state) {
        this.state = state
    }
    // 创建 getter
    get myName() {
        return this.state.name
    }
    // 创建 setter
    set myName(name) {
        this.state.name = name
    }
}
// 获取指定对象的自身属性描述符。自身属性描述符是指直接在对象上定义（而非从对象的原型即成）的描述符。
let descriptor = Object.getOwnPropertyDescriptor(A.prototype, "myName");
console.log('get' in descriptor);		// true
console.log(descriptor.enumerable);		// false 不可枚举
```

### 可计算成员名称

可计算成员时指使用方括号包裹一个表达式，如下面定义了一个变量 `m`，然后使用 `[m]` 设置为类 A 的原型方法。

```js
let m = "sayName";

class A {
    constructor(name) {
        this.name = name;
    }
    [m]() {
        return this.name
    }
}

let a = new A("foo")
```

### 生成器方法

生成器是一个返回迭代器的函数。在类中，我们也可以使用生成器方法。

```js
class A {
    *printId() {
        yield 1;
        yield 2;
        yield 3;
    }
}

let a = new A();
console.log(a.printId().next());		// {done: false, value: 1}
console.log(a.printId().next());		// {done: false, value: 1}
console.log(a.printId().next());		// {done: false, value: 1}
```

这个写法很有趣，我们新增一个原型方法稍微改动一下。

```js
class A {
    *printId() {
        yield 1;
        yield 2;
        yield 3;
    }
    render(){
        // 从render方法返回printId，类似于react中经常用到的写法
        return this.printId()
    }
}
let a = new A();
console.log(a.render().next());	// {done: false, value: 1}
```

### 静态成员

静态成员是指在方法名或属性名前面加上 `static` 关键字，和普通方法不一样的是，`static` 修饰的方法不能在实例中访问，只能用类名直接访问。

```js
class A {
    constructor(name) {
        this.name = name;
    }
    static create(name) {
        return new A(name)
    }
}

let a = A.create('foo');
console.log(a.name);	// foo

let t = new A();
console.log(t.create('foo'));		// t.create is not a function
```

### 继承与派生类

我们在写 React 的时候，自定义的组件汇集成 React.Component。

```js
class A extends Component {
    constructor(props) {
        super(props)
    }
}
```

A 叫做派生类，在派生类中，如果使用了构造方法，就必须使用 `super()`。

```js
class Component {
    constructor([a, b] = props){
        this.a = a;
        this.b = b;
    }
    add() {
        return this.a + this.b;
    }
}

class SubComponent extends Component {
    constructor(props) {
        super(props)
    }
}

let subComponent = new SubComponent([2, 3]);
console.log(subComponent.add());	// 5
```

关于 super 使用的几点要求：

1. 只可以在派生类中使用 super。派生类是指继承自其他类的新类
2. 在构造函数中访问 `this` 之前要调用 `super()`，负责初始化 `this`。

```js
class A extends Component {
    constructor(props) {
        this.name = 1	// 必须先写super()
        super(props)
    }
}
```

3. 如果不想调用 `super`，可以让类的构造函数返回一个对象。

### 类方法遮蔽

我们可以在继承的类中重写父类的方法。

```js
class Component {
    constructor([a, b] = props) {
        this.a = a;
        this.b = b;
    }
    // 父类的add方法，求和
    add() {
        return this.a + this.b
    }
}

class SubComponent extends Component {
    constructor(props) {
        super(props)
    }
    // 重写add方法，求积
    add() {
        return this.a * this.b
    }
}

let subComponent = new SubComponent([2, 3]);
console.log(subComponent.add());	// 6
```

### 静态成员继承

父类中静态成员，也可以继承到派生类中。静态成员继承只能通过派生类访问，不能通过派生类的实例访问。

```js
class Component {
    constructor([a, b] = props) {
        this.a = a;
        this.b = b
    }
    static printSum([a, b] = props) {
        return a + b
    }
}

class SubComponent extends Component {
    constructor(props) {
        super(props)
    }
}
console.log(subComponent.printSum([2, 3]));	// 5
```

### 派生自表达式的类

很好理解，就是指父类可以是一个表达式。

```js
function Rectangle(length, width){
    // ...
}

class Square extends Rectangle {
	// ...
}
```

---

**参考资料：**

* [ES6 | JavaScript 中的类 class](https://mp.weixin.qq.com/s?__biz=MzI4MDYyNjQ1OA==&mid=2247483956&idx=1&sn=adc1ec7ae4cd3f01728fdcb43a38690f&chksm=ebb4d641dcc35f57cd2bf66ba9819874cf300108884700bf3d6a1410c18c0ed4ff3d90d10a8f#rd)