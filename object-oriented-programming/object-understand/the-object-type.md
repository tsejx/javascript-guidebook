## 对象

Javascript 的基本数据类型包括 `undefined` 、`null`、`boolean`、`string`、`number` 和 `object`，以及 ES6 新增的 `symbol` 类型。

对象和其他基本类型值不同的是，对象是一种复合值：它将许多值（原始值或者其他对象）聚合在一起，可通过键名访问这些值。

于是，对象也可看做是**属性的无序集合**，每个属性都是一个键值对。属性名是字符串，因此我们可以把对象看成是从字符串到值的映射。（ES6 标准中对象的属性名可使用 `symbol` 类型）

📍 **快速目录：**

* [对象创建](#对象创建)
* [对象组成](#对象组成)
* [引用对象](#引用对象)
* [实例方法](#实例方法)

### 对象创建

**创建对象的方法：**

- [对象直接量](#对象字面量)
- [构造函数](#构造函数)
- [`Object.create()` 函数](#Object.create())

#### 对象字面量

Javascript 提供了叫做字面量的快捷方式，用于创建大多数原生对象值。使用字面量只是隐藏了与使用 `new` 操作符相同的基本过程，于是也可以叫做语法糖🍬。

对象字面量是由若干名值对组成的映射表，名值对中间用冒号分隔，整个映射表用花括号括起来。

不同属性之间用逗号分隔，属性名可以是任意字符串或 Symbol 类型值，属性值可以是任意类型表达式，表达式的值是属性值。

```js
const foo = {
    name : 'bai',
    age : 29,
    5 : true
}
```

**对象键名字符化**：使用对象字面量的方法来定义对象，属性名会自动转换成字符串。

```js
const foo = {
    'name' : 'bai',
    'age' : 29,
    '5' : true,
}
```

#### 构造函数

使用 `new` 操作符调用 Object 构造函数来初始化一个新创建的对象。

```js
let foo = new Object();

foo.name = 'Lamborghini';
foo.age = 25;
```

##### 参数为对象

如果该参数是一个对象，则直接返回这个对象。

```js
// Example1 参数为对象
let foo = { a: 1 }

let bar = new Object(foo)

console.log(foo === bar)  // true

// Example2 参数为函数（对象）
let foo = function(){}

let bar = new Object(foo)

console.log(foz === baz)  // true
```

##### 参数为原始类型

如果参数是一个原始类型的值，则返回该值对应的包装对象。

```js
console.log(new Object('foo'))
// String {0: "f", 1: "o", 2: "o", length: 3, [[PrimitiveValue]]: "foo"}

console.log(new Object(1))
// Number {[[PrimitiveValue]]: 1}

console.log(new Object(true))
// Boolean {[[PrimitiveValue]]: true}
```

#### Object.create()

`Object.create()` 方法创建一个具有指定原型且可选择性地包含指定属性的对象。

📖 **语法**

```js
Object.create(prototype, description)
```

| 参数        | 说明                                       | 类型   |
| ----------- | ------------------------------------------ | ------ |
| prototype   | 要用作原型的对象                           | object |
| description | 包含一个或多个属性描述符的 JavaScript 对象 | object |

```js
const object = Object.create({ x:1, y:1 })  // object继承了属性x和y
console.log(object.x); 	// 1
```

可以通过传入参数 `null` 来创建一个没有原型的新对象，但通过这种方式创建的对象不会继承任何东西，甚至不包括基础方法。比如 `toString()` 和 `valueOf()`。

```js
// Example1
const o1 = {}
console.log(Number(o1))      // NaN

// Example2
const o2 = Object.create(null)  // o2不继承任何属性和方法
console.log(Number(o2))      // Uncaught TypeError: Cannot convert object to primitive value
```

如果想创建一个普通的空对象（比如通过 `{}` 或 `new Object()` 创建的对象），需要传入 `Object.prototype`。

```js
// Example1
const o1 = {};
console.log(Number(o1)) // NaN

// Example2
const o2 = Object.create(Object.prototype) // o2和{}和new Object()一样
console.log(Number(o2)) // NaN
```

`Object.create()` 方法的第二个参数是属性描述符。

```js
const obj = Object.create({ z:3 }, {
  x:{
      value:1, 
      writable: false, 
      enumerable:true, 
      configurable:true
  },
  y:{
      value:2, 
      writable: false, 
      enumerable:true, 
      configurable:true
  }
})

console.log(obj.x, obj.y, obj.z)  // 1 2 3
```

### 对象组成

对象是属性的无序集合，由键名和属性值组成。

#### 键名

对象的所有键名都是字符串，所以加不加引号都可以，如果不是字符串也会自动转换成字符串。

```js
const foo = { name: 'bar', 123: 'car'}
```

#### 属性值

属性值可以是任何类型的表达式，最终表达式的结果就是属性值的结果。

如果属性值为函数，则通常把这个属性称为“方法”。

```js
const foo = {
  run: function (x) {
    return 2 * x;
  }
}

foo.run(1); // 2
```

由于对象的方法就是函数，因此也有 `name` 属性。方法的 `name` 属性返回紧跟在 `function` 关键字后面的函数名。如果是匿名函数，ES5 环境会返回 `undefined`，ES6 环境会返回方法名。

```js
const foo = {
  mth1: function f() {},
  mth2: function () {}
}

foo.mth1.name // "f"
foo.mth2.name // ES5： undefined
foo.mth2.name // ES6： "m2"
```

### 引用对象

如果不同的变量名指向同一个对象，那么它们都是这个对象的引用，也就是说指向同一个内存地址。修改其中一个变量，会影响到其他所有变量。

```js
let foo1 = {}
let foo2 = foo1

foo1.a = 1
console.log(foo2.a)	 // 1

foo2.b = 2
console.log(foo1.b) 	// 2
```

如果取消某一个变量对于原对象的引用，不会影响到另一个变量。

```js
let foo1 = {}
let foo2 = foo1

foo1 = 1
console.log(foo2)  // {}
```

### 实例方法

#### valueOf()

`valueOf()` 方法返回当前对象。

```js
const foo = new Object()

foo.valueOf() === foo // true
```

#### toString()

`toString()` 方法返回当前对象对应的字符串形式。

```js
const foo1 = new Object();
foo1.toString() // "[object Object]"

const foo2 = {a:1};
foo2.toString() // "[object Object]"
```

一般地，使用 `Object.prototype.toString()` 来获取对象的类属性，进行类型识别。
