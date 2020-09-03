---
nav:
  title: OOP
  order: 4
group:
  title: 理解对象
  order: 2
title: 对象类型
order: 1
---

# 对象类型

JavaScript 的基本数据类型包括 `Undefined`、`Null`、`Boolean`、`String`、`Number` 和 `Object`，以及 ES6 新增的 `Symbol` 类型。

对象和其他基本类型值不同的是，对象是一种复合值：它可以将多个原始值或者其他对象聚合在一起，可通过键名访问这些值。

对象也可看作是**属性的无序集合**，每个属性都是一个键值对。属性名是 `String` 类型或 `Symbol` 类型，因此我们可以把对象看成是从字符串到值的映射。

## 对象创建

**创建对象的方法：**

- [对象字面量](#对象字面量)
- [构造函数](#构造函数)
- [`Object.create()`](#Object.create())

### 对象字面量

JavaScript 提供了叫做字面量的快捷方式，用于创建大多数原生对象值。使用字面量只是隐藏了与使用 `new` 操作符相同的基本过程，于是也可以叫做语法糖。

对象字面量是由若干键值对组成的映射表，键值对中间用冒号分隔，整个映射表用花括号括起来。

不同属性之间用逗号分隔，属性名可以是任意 `String` 类型或 `Symbol` 类型值，属性值可以是任意类型表达式，表达式的值是属性值。

```js
const uzi = {
  name : 'uzi',
  age : 22,
  5 : true
}
```

**对象键名字符化**：使用对象字面量的方法来定义对象，属性名会自动转换成字符串。

```js
const uzi = {
  'name' : 'uzi',
  'age' : 22,
  '5' : true,
}
```

### 构造函数

使用 `new` 操作符调用 Object 构造函数来初始化一个新创建的对象。[new 实现过程](../../core-modules/executable-code-and-execution-contexts/execution/this#new-绑定)

```js
let uzi = new Object();

uzi.name = 'Uzi';
uzi.age = 22;
```

#### 参数为对象

如果该参数是一个对象，则直接返回这个对象。

参数为对象：

```js
let foo = { a: 1 }

let bar = new Object(foo)

console.log(foo === bar)
// true
```

参数为函数（对象）：

```js
let foo = function(){}

let bar = new Object(foo)

console.log(foo === bar)
// true
```

#### 参数为原始类型

如果参数是一个原始类型的值，则返回该值对应的包装对象。

```js
console.log(new Object('foo'))
// String {0: "f", 1: "o", 2: "o", length: 3, [[PrimitiveValue]]: "foo"}

console.log(new Object(1))
// Number {[[PrimitiveValue]]: 1}

console.log(new Object(true))
// Boolean {[[PrimitiveValue]]: true}
```

### Object.create

[Object.create()](../../standard-built-in-objects/fundamental-objects/object-objects/properties-of-the-object-constructor/create) 方法用于创建指定对象为原型对象的新对象。

📖 **语法**

```js
Object.create(proto, properties)
```

<br />

| 参数       | 说明                                                         | 类型   |
| :---------- | :------------------------------------------------------------ | :------ |
| proto      | 新创建对象指向的原型对象                                     | object |
| properties | 可选参数。添加到新创建对象的可枚举属性（即自身定义的属性，而不是原型链上的枚举属性 | object |

<br />

```js
const object = Object.create({ x:1, y:1 })
// object 继承了属性 x 和 y

console.log(object.x);
// 1
```

可以通过传入参数 `null` 来创建一个没有原型的新对象，但通过这种方式创建的对象不会继承任何东西，甚至不包括基础方法，比如 `toString` 和 `valueOf`。

继承对象：

```js
const foo = {}
console.log(Number(foo));
// NaN
```

不继承任何属性和方法：

```js
const bar = Object.create(null);
// bar 不继承任何属性和方法
console.log(Number(bar));
// Uncaught TypeError: Cannot convert object to primitive value
```

如果想创建一个普通的空对象（比如通过 `{}` 或 `new Object()` 创建的对象），需要传入 `Object.prototype`。

```js
// Example1
const foo = {};
console.log(Number(foo))
// NaN

// Example2
const bar = Object.create(Object.prototype);
// bar 和 {} 和 new Object()一样
console.log( Number(bar) );
// NaN
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

console.log(obj.x, obj.y, obj.z);
// 1 2 3
```

## 对象组成

对象是属性的无序集合，由 **键名** 和 **属性值** 组成。

### 键名

对象的所有键名都是字符串，所以加不加引号都可以，如果不是字符串也会自动转换成字符串。

```js
const foo = { name: 'bar', 123: 'car'}
```

### 属性值

属性值可以是任何类型的表达式，最终表达式的结果就是属性值的结果。

如果属性值为函数，则通常把这个属性称为"方法"。

```js
const foo = {
  run: function (x) {
    return 2 * x;
  }
}

foo.run(1);
// 2
```

由于对象的方法就是函数，因此也有 `name` 属性。方法的 `name` 属性返回紧跟在 `function` 关键字后面的函数名。如果是匿名函数，ES5 环境会返回 `undefined`，ES6 环境会返回方法名。

```js
const foo = {
  mth1: function f() {},
  mth2: function () {}
}

foo.mth1.name;
// "f"

foo.mth2.name;
// ES5： undefined

foo.mth2.name;
// ES6： "m2"
```

## 引用对象

如果不同的变量名指向同一个对象，那么它们都是这个对象的引用，也就是说指向同一个内存地址。修改其中一个变量，会影响到其他所有变量。

```js
let foo = {};
let bar = foo;

foo.a = 1;
console.log(bar.a);
// 1

bar.b = 2;
console.log(foo.b);
// 2
```

如果取消某一个变量对于原对象的引用，不会影响到另一个变量。

```js
let foo = {};
let bar = foo;

foo = 1;
console.log(bar);
// {}
```


