---
nav:
  title: 核心模块
  order: 3
group:
  title: 函数参数
  order: 7
title: 函数参数
order: 1
---

# 函数参数

## arguments

JavaScript 中的函数定义并未指定函数形参的类型，函数调用也未对传入的实参值做任何类型检查。实际上，JavaScript 函数调用甚至不检查传入形参的个数。

```js
function foo(x) {
  return x + 1;
}

console.log(foo(1));
// 2
console.log(foo('1'));
// '11'
console.log(foo());
// NaN
console.log(foo(1, 2));
// 2
```

### 同名形参

在非严格模式下，函数中可以出现同名形参，且只能访问最后出现的该名称的形参。

```js
function foo(x, x, x) {
  console.log(x);
}

foo(1, 2, 3);
// 3
```

而在严格模式下，出现同名形参会抛出语法错误。

```js
function foo(x, x, x) {
  'use strict';
  console.log(x);
}

foo(1, 2, 3);
// SyntaxError: Duplicate parameter name not allowed in this context
```

### 参数数量

当实参比函数声明指定的形参个数要少，剩下的形参都将设置为 `undefined` 值。

```js
function foo(x, y) {
  console.log(x, y);
  // 1 undefined
}

foo(1);
```

**默认值设置：**

常常使用逻辑或运算符给省略的参数设置一个合理的默认值。

```js
function foo(x, y) {
  y = y || 2;
  console.log(x, y);
  // 1 2
}

foo(1);
```

实际上，使用 `y || 2` 是不严谨的，显式地设置假值(`undefined`、`null`、`false`、`0`、`-0`、`''`、`NaN`)也会得到相同的结果。所以应该根据实际场景进行合理设置。

当实参比形参个数要多时，剩下的实参没有办法直接获得，需要使用即将提到的 `arguments` 对象。

JavaScript 中的参数在内部用一个数组表示。函数接收到的始终都是这个数组，而不关心数组中包含哪些参数。在函数体内可以通过 `arguments` 对象来访问这个参数数组，从而获取传递给函数的每一个参数。

`arguments` 对象并不是 `Array` 的实例，它是一个类数组对象，可以使用方括号语法访问它的每一个元素。

```js
function foo(x) {
  console.log(arguments[0], arguments[1], arguments[2]);
  // 1 2 3
  return x + 1;
}
foo(1, 2, 3);
```

`arguments` 对象的 `length` 属性显示实参的个数，函数的 `length` 属性显示形参的个数。

```js
function fn(x, y) {
  console.log(arguments.length);
  // 3
}

fn(1, 2, 3);
console.log(fn.length);
// 2
```

形参只是提供便利，但不是必需的。

```js
function foo() {
  console.log(arguments[0]);
  // 1
  console.log(arguments[1]);
  // 2
}
```

当一个函数包含超过 3 个形参时，要记住调用函数中实参的正确顺序实在让人头疼。

```js
function fn(
  /*array*/ from,
  /*index*/ form_start,
  /*array*/ to,
  /*index*/ to_start,
  /*integer*/ length
) {
  // do something
}
```

通过键/值对的形式来传入参数，这样参数的顺序就无关紧要了。定义函数的时候，传入的实参都写入一个单独的对象之中，在调用的时候传入一个对象，对象中的名/值对是真正需要的实参数据。

```js
function fn(args) {
  fn(args.from, args.from_start || 0, args.to, args.to_start || 0, args.length);
}

const a = [1, 2, 3, 4],
  b = [];

fn({ from: a, to: b, length: 4 });
```

ES6 的 [剩余参数（Rest 参数）](rest-parameters) 有效地解决了函数参数过多和参数先后顺序的问题。

### 同步

当形参与实参的个数相同时，`arguments` 对象的值和对应形参的值保持同步。

```js
function foo(num1, num2) {
  console.log(num1, arguments[0]);
  // 1 1

  arguments[0] = 2;
  console.log(num1, arguments[0]);
  // 2 2

  num1 = 10;
  console.log(num1, arguments[0]);
  // 10 10
}

foo(1);
```

虽然命名参数和对应 `arguments` 对象的值相同，但并不是相同的命名空间。它们的命名空间是独立的，但值是同步的。

但在严格模式下，`arguments` 对象的值和形参的值是独立的。

```js
function fn(num1, num2) {
  'use strict';
  console.log(num1, arguments[0]);
  // 1 1

  arguments[0] = 2;
  console.log(num1, arguments[0]);
  // 1 2

  num1 = 10;
  console.log(num1, arguments[0]);
  // 10 2
}

fn(1);
```

当形参并没有对应的实参时，`arguments` 对象的值与形参的值并不对应。

```js
function fn(num1, num2) {
  console.log(num1, arguments[0]); //undefined,undefined

  num1 = 10;

  arguments[0] = 5;

  console.log(num1, arguments[0]); //10,5
}

fn();
```

## 内部属性

### callee

`arguments` 对象有一个名为 `callee` 的属性，该属性是一个指针，指向拥有这个 `arguments` 对象的函数。

下面是经典的阶乘函数：

```js
function fn(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * fn(num - 1);
  }
}
console.log(fn(5)); // 120
```

但是，上面这个函数的执行与函数名紧紧耦合在了一起，可以使用 `arguments.callee` 可以消除函数解耦。

```js
function fn(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * arguments.callee(num - 1);
  }
}
console.log(fn(5));
// 120
```

但在严格模式下，访问这个属性会抛出 TypeError 错误。

```js
function fn(num) {
  'use strict';
  if (num <= 1) {
    return 1;
  } else {
    return num * arguments.callee(num - 1);
  }
}

console.log(fn(5));
// TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
```

这时，可以使用具名的函数表达式。

```js
const fn = function fn(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * fn(num - 1);
  }
};
console.log(fn(5)); //120
```

### caller

实际上有两个 `caller` 属性。

#### 函数的 caller

函数的 `caller` 属性保存着调用当前函数的函数的引用，如果是在全局作用域中调用当前函数，它的值是 `null`。

```js
function foo() {
  bar();
}

function bar() {
  console.log(bar.caller);
  // foo(){ bar(); }
}

foo();
```

```js
function foo() {
  console.log(foo.caller);
  // null
}
foo();
```

在严格模式下，访问这个属性会抛出 TypeError 错误。

```js
function foo() {
  'use strict';
  // TypeError: 'caller' and 'arguments' are restricted function properties and cannot be accessed in this context
  console.log(foo.caller);
}
foo();
```

#### arguments 对象的 caller

该属性始终是 `undefined`，定义这个属性是为了分清 `arguments.caller` 和函数的 `caller` 属性。

```js
function foo(x) {
  console.log(arguments.caller);
  // undefined
}
foo(1);
```

同样地，在严格模式下，访问这个属性会抛出 TypeError 错误。

```js
function foo(x) {
  'use strict';
  // TypeError: 'caller' and 'arguments' are restricted function properties and cannot be accessed in this context
  console.log(arguments.caller);
}
foo(1);
```

## 参数传递

JavaScript 中所有函数的参数都是按值传递的。也就是说，把函数外部的值复制到函数内部的参数，就和把值从一个变量复制到另一个变量一样。

### 基本类型值

在向参数传递基本类型的值时，被传递的值会被复制给一个局部变量（命名参数或 `arguments` 对象的一个元素）

```js
function foo(x) {
  x = 1;
  return x;
}
let y = 2;
let result = foo(y);

console.log(y);
// 2 没有变化
console.log(result);
// 1
```

### 引用类型值

在向参数传递引用类型的值时，会把这个值在内存中的地址复制给一个局部变量，因此这个局部变量的变化会反映在函数的外部。

```js
function foo(x) {
  x.name = 'ABC';
}

var y = {};
foo(y);

console.log(y.name);
// 'ABC'
```

当在函数内部重写引用类型的形参时，这个变量引用的就是一个局部对象了。而这个局部对象会在函数执行完毕后立即被销毁。

```js
function foo(obj) {
  obj.name = 'black';
  console.log(person.name); // 'black'

  obj = {};
  obj.name = 'white';

  console.log(person.name); // 'black'
}

var person = {};
foo(person);
```

## 函数重载

JavaScript 函数不能像传统意义上那样实现重载。而在其他语言中，可以为一个函数编写两个定义，只要这两个定义的签名（接受的参数的类型和数量）不同即可。

JavaScript 函数没有签名，因为其参数是由包含零个或多个值的数组来表示的。而没有函数签名，真正的重载是不可能做到的。

```js
// 后面的声明覆盖了前面的声明
function addSomeNumber(num) {
  return num + 100;
}
function addSomeNumber(num) {
  return num + 200;
}
var result = addSomeNumber(100);
// 300
```

只能通过检查传入函数中参数的类型和数量并作出不同的反应，来模仿方法的重载。

```js
function doAdd() {
  if (arguments.length == 1) {
    alert(arguments[0] + 10);
  } else if (arguments.length == 2) {
    alert(arguments[0] + arguments[1]);
  }
}

doAdd(10);
// 20
doAdd(30, 20);
// 50
```
