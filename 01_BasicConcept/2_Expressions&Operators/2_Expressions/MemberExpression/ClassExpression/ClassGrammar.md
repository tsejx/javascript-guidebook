## Class 的基本语法

- [类声明](#类声明)
- [构造函数](#构造函数)
- [实例对象](#实例对象)
- [类的表达式](#类的表达式)
- [私有成员](#私有成员)
  - [私有方法](#私有方法)
  - [私有属性](#私有属性)
- [`this` 的指向](#this的指向)
- [访问器属性](#访问器属性)
- [生成器方法](#生成器方法)
- [静态成员](#静态成员)
  - [静态方法](#静态方法)
  - [静态属性](#静态属性)

ECMAScript6 中的 Class（类）概念，实际上可以把它看作 ECMAScript5 对象原型写法的语法糖。

```js
// ES5
function Point(x, y){
    this.x = x
    this.y = y
}

Point.prototype.toString = function() {
    return '(' +  this.x + ',' + this.y + ')'
}

var p = new Point(1, 2)
```

```js
// ES6
class Point {
    constructor(x, y){
        this.x = x
        this.y = y
    }
    toString(){
        return '(' +  this.x + ',' + this.y + ')'
    }
}
```

### 类声明

与 ES5 相同的是，类也是通过 `new` 关键字创建对象实例。

与 ES5 不同的是，在 ES6 中，我们将原型的实现写在了类中，但本质上还是一样的，都是需要新建一个类名，然后实现构造函数，再实现原型方法。

```js
class Foo(){
    // 构造函数
    constructor(name = 'BOT'){
        this.name = name
    }
    // 定义一个方法并且赋值给构造函数的原型
    sayName(){
        console.log(this.name)
    }
}

const f = new Foo()
f.sayName()				// 'BOT'
```

类声明和函数声明的区别和特点：

1. 函数声明可以被提升（Hoist），类声明不能提升（与 `let` 声明类似）
2. 类声明中的代码自动强行运行在严格模式下
3. 只能通过 `new` 关键字来声明类，声明类会调用类的构造函数
4. 每个类都有一个 `[[construct]]` 的方法，该方法就是构造函数
5. 类的所有方法都定义在类的 `prototype` 属性上
6. 类中的方法无需添加 `function` 关键字，只需直接添加到类中
7. 方法间不需要添加逗号（`,`），加了会报错
8. 类中的所有方法都是不可枚举的（non-enumerable），而自定义类型中，可以通过 `Object.definedProperty()` 手工指定不可枚举属性
9. 在类的实例上调用方法，实质上就是调用原型上的方法
10. 不能在类中修改类名

### 构造函数

构造函数（`constructor` 方法）是类的默认方法，通过 `new` 关键字生成对象实例时，自动调用该方法。若没有显式定义，一个空的构造函数会被默认添加。

类必须使用 `new` 关键字调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用 `new` 关键字也能执行。

### 实例对象

与 ES5 一样，实例的属性除非显式定义在其本身（即定义在 `this` 对象上），否则都是定义在原型上（即定义在 `class` 上）。

与 ES5 一样，类的 所有实例共享一个原型对象。这也意味着，可以通过实例的 `__proto__` 属性为类添加方法。

>⚠️`__proto__` 并不是语言本身的特性，这是各大厂商具体实现时添加的私有属性，虽然目前很多现代浏览器的 JS 引擎中都提供了这个私有属性，但依旧不建议在生产中使用该属性，避免对环境产生依赖。生产环境中，我们可以使用 `Object.getPrototypeOf` 方法来获取实例对象的原型，然后再来为原型添加方法/属性。

### 类的表达式

类有两种表现形式：声明式和表达式。

```js
// 声明式
class A = {
    constructor () {}
}

// 匿名表达式
const B = class {
    constructor () {}
}

// 表达式
const C = class C1 {
    constructor () {}
    getClassName () {
        return C1.name
    }
}
```

一般只有在类内部代码引用到类名时才会使用表达式，否则一般以匿名表达式表示。

```js
// 内部引用
let inst = new C()
inst.getClassName()	// C1

// 外部引用
C1.name				// ReferenceError: C1 is not defined
```

### 私有成员

#### 私有方法

将私有方法一处模块，因为模块内部的所有方法都是对外可见的。

```js
class Widget {
    foo (baz) {
        bar.call(this, baz)
    }
}

function bar(baz) {
    return this.snaf = baz;
}
```

利用 `Symbol` 值的唯一性，将私有方法的名字命名为一个 `Symbol` 值。

```js
const bar = Symbol('bar')
const snaf = Symbol('snaf')

export default class myClass {
    // 公有方法
    foo (baz) {
        this[bar](baz)
    }
    
    // 私有方法
    [bar](baz) {
        return this[snaf] = baz
    }
}
```

上面代码中，`bar` 和 `snaf` 都是 `Symbol` 值，导致第三方无法获取到它们，因此达到了私有方法和私有属性的效果。

#### 私有属性

私有属性是实例中的属性，不会出现在原型上，且只能在类的构造函数或方法中创建。建议在构造函数中创建所有私有属性，从而只通过一处就可以控制所有的私有属性。

```js
class Student {
    constructor () {
        this.state = {
            visible: true
        }
    }
}
```

目前，有一项提案，为 `class` 加了私有属性。方法是属性名之前，使用 `#` 表示。

```js
class Point {
    #x;
    
    constructor (x = 0) {
        #x = !x
    }

	get x () { return #x }
    set x (value) { #x = !value }
}
```

这种写法不仅可以写私有属性，还可以用来写私有方法。

另外，私有属性也可以设置 `getter` 和 `setter` 方法。

### `this` 的指向

类的方法内部如果含有 `this`，它默认指向类的实例。但是，如果将类方法内部的方法提取出来单独使用，`this` 会指向该方法运行时所在的环境，因为找不到相对应的方法而导致报错。

因此，需要**在构造函数中绑定 `this`** ，这样就不会找不到相对应的方法。

```js
class Student {
    constructor () {
        this.sayName = this.sayName.bind(this)
    }
}
```

另一种解决方法是使用**箭头函数**。

```js
class Car {
    constructor () {
        this.sayName = (name = 'BOT') => {
            this.sayName(`My name is ${name}`)
        }
    }
}
```

还有一种解决方法是使用 `Proxy` ，获取方法的时候，自动绑定 `this`。详情[点击这里](http://es6.ruanyifeng.com/#docs/class#this-%E7%9A%84%E6%8C%87%E5%90%91)。

### 访问器属性

与 ES5 一样，在类的内部也可以使用 `get` 和 `set` 关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

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
     	console.log(`set:${value}`)   
    }
}

let inst = new Student()

Student.run = 'abc'		// set:abc

Student.run				// get
```

### 生成器方法

如果某个方法之前加上星号（`*`），就表示该方法是一个生成器方法（Generator 函数）。

```js
class Foo {
    constructor (...args) {
        this.args = args
    }
    * [Symbol.iterator] () {
        for (let arg of this.args) {
            yield arg
        }
    }
}

for (let x of new Foo('hello', 'world')) {
    console.log(x)
}
// hello
// world
```

### 静态成员

#### 静态方法

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上 `static` 关键字，就表示该方法不会被实例继承，而是需要直接通过类来调用，这就称为静态方法。

```js
class Foo {
    static classMethod () {
        return 'HELLO'
    }
}

Foo.classMethod()	// 'HELLO'

const foo = new Foo()

foo.classMethod()	// TypeError: foo.classMethod is not a function
```

注意，如果静态方法包含 `this` 关键字，这个 `this` 指的是类，而不是实例。

```js
class Foo {
    static bar () {
        this.baz()
    }
    static baz () {
        console.log('HELLO')
    }
    baz () {
        console.log('WORLD')
    }
}

Foo.bar()	// 'HELLO'
```

父类的静态方法，可以被子类继承。

```js
class Foo {
    static classMethod () {
        return 'HELLO'
    }
}

class Bar extends Foo {
    
}

Bar.classMethod();	// 'HELLO'
```

#### 静态属性

由于在 ES6 中明文规定，类内部只有静态方法，没有静态属性。因此，类的静态属性无法直接在类内部直接定义。

```js
// 以下写法无效
class Foo {
    // 写法一
    prop: 2

	// 写法二
	static prop: 2
}
```

目前有一个静态属性提案，对实例属性和静态属性都规定了新的写法。

过去，需要在类的构造函数中定义实例属性。

现在，**类的实例属性**可以用等式，写入类的定义之中。这种写法比以前更清晰。

```js
// Old
class Foo {
    constructor () {
        this.state = {
            visible: true
        }
    }
}

// New
class Bar {
    state = {
    	visible: true
    }
	
    constructor () {
		console.log(this.state.visible)	// true
    }
}
```

**为了可读性的目的，对于那些在构造函数中已经定义的实例属性，新写法允许直接在类中列出。**

类的静态属性只需在上述的实例属性写法前加上 `static` 关键字即可。

```js
class MyClass {
    static state = {
        visible: true
    }
    constructor () {
		console.log(MyClass.state.visible)	// true
    }
}
```

新写法是显式声明（declarative），而非赋值处理，语义更好。

---

**参考资料：**

- [ECMAScrept 6 入门# Class 的基本语法](http://es6.ruanyifeng.com/#docs/class)
- [ES6|JavaScript中的类class](https://juejin.im/entry/59bbb3b65188256c4b723bdb)