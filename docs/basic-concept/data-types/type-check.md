---
nav:
  title: 基本语法
  order: 1
group:
  title: 数据类型和值
  order: 3
title: 类型检测
order: 2
---

# 类型检测

类型检测的方法：

1. `typeof`
2. `instanceof`
3. `Object.prototype.toString`
4. `constructor`

## typeof

`typeof` 操作符返回一个字符串，表示未经计算的操作数的类型。

```js
typeof undefined;
// "undefined"

typeof null;
// "object"

typeof 100;
// "number"

typeof NaN;
// "number"

typeof true;
// "boolean"

typeof 'foo';
// "string"

typeof function () {};
// "function"

typeof [1, 2];
// "object"

typeof new Object();
// "object"
```

`typeof` 操作符适合对 **基本类型**（除 `null` 之外）及 `function` 的检测使用，而对引用数据类型（如 Array）等不适合使用。

更详细信息请查阅 [typeof 操作符](../expressions/operators/typeof)。

## instanceof

`instanceof` 运算符用于检测一个对象在其 **原型链** 中是否存在一个构造函数的 `prototype` 属性。

左操作数为**对象**，不是就返回 `false`，右操作数必须是 **函数对象** 或者 **函数构造器**，不是就返回 `TypeError` 异常。

```js
obj instanceof constr;
```

```js
function Person() {}
function Student() {}
Student.prototype = new Person();
Student.prototype.constructor = Student;

const ben = new Student();
ben instanceof Student;
// true

const one = new Person();
one instanceof Person;
// true
one instanceof Student;
// false
ben instanceof Person;
// true
```

任何一个构造函数都有一个 `prototype` 对象属性，这个对象属性将用作 `new` 实例化对象的原型对象。

📍 `instanceof` 适合用于判断对象是否属于 Array、Date 和 RegExp 等内置对象。

📍 不同 window 或 `iframe` 之间的对象类型检测无法使用 `instanceof` 检测。

更详细信息请查阅 [instanceof](../expressions/operators/instanceof)

## Object.prototype.toString

可以通过 `toString()` 来获取每个对象的类型。

为了 **每个对象** 都能通过 `Object.prototype.toString` 来检测，需要以 `Function.prototype.call` 或者 `Function.prototype.apply` 的形式来调用，传递要检查的对象作为第一个参数。

```js
Obejct.prototype.toString.call(undefined)；
//  "[object Undefined]"

Obejct.prototype.toString.call(null)；
//  "[object Null]"

Obejct.prototype.toString.call(true)；
//  "[object Boolean]"

Obejct.prototype.toString.call('')；
/// "[object String]"

Obejct.prototype.toString.call(123)；
//  "[object Number]"

Obejct.prototype.toString.call([])；
//  "[object Array]"

Obejct.prototype.toString.call({})；
//  "[object Object]"
```

💡 使用 `Object.prototype.toString` 方法能精准地判断出值的数据类型。

⚠️ **注意事项**：

- **方法重写**：`Object.prototype.toString` 属于 Object 的原型方法，而 Array 或 Function 等类型作为 Object 的实例，都重写了 `toString` 方法。因此，不同对象类型调用 `toString` 方法时，调用的是重写后的 `toString` 方法，而非 `Object` 上原型 `toString` 方法，所以采用 `xxx.toString()` 不能得到其对象类型，只能将 `xxx` 转换成字符串类型。

## constructor

任何对象都有 `constructor` 属性，继承自原型对象，`constructor` 会指向构造这个对象的构造器或构造函数。

```js
Student.prototype.constructor === Student;
//  true
```

## 数组检测

ECMAScript5 将 `Array.isArray()` 正式引入 JavaScript，该方法能准确检测一个变量是否为数组类型。

```js
Array.isArray(variable);
```
