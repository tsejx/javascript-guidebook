---
nav:
  title: 核心模块
  order: 3
group:
  title: 函数参数
  order: 7
title: 默认参数
order: 2
---

# 默认参数

通常来说，函数调用者不需要传递所有可能存在的参数，没有被传递的参数可由感知到的默认参数进行填充。JavaScript 有严格的默认参数格式，未被传值的参数默认为 `undefined`。ES6 引入了一种新方式，可以指定任意参数的默认值。

JavaScript 函数参数的默认值都是`undefined`， ES5 里，不支持直接在形参里写默认值。所以，要设置默认值，就要检测参数是否为`undefined`，按需求赋值。

```js
function fn(x, y) {
  y = y || 'World';

  console.log(x, y);
}

fn('Hello');
// Hello World
fn('Hello', 'China');
// Hello China
fn('Hello', '');
// Hello World
```

**缺点**：如果参数 `y` 赋值了，但是对应的布尔值为 `false`，则该赋值不起作用。

为了避免这个问题，我们需要先判断参数 `y` 是否被赋值，如果没有，再等于默认值。

```js
function fn(x, y) {
  y = typeof y === undefined ? y || 'World';
  console.log(x, y);
}
```

## 基本用法

ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面。

```js
function fn(x, y = 'World') {
  console.log(x, y);
}

log('Hello');
// Hello World

log('Hello', 'China');
// Hello China

log('Hello', '');
// Hello
```

**优点：**

- 阅读代码的人，可以立刻意识到哪些参数是可以省略的，不用查看函数体或文档
- 有利于将来的代码优化，即使未来的版本在对外接口中，彻底拿掉这个参数，也不会导致以前的代码无法运行

### 默认声明

参数变量是 **默认声明** 的，所以不能用 `let` 或 `const` 再次声明。

```js
function fn(x = 1) {
  let x = 2;
  // SyntaxError: Identifier 'x' has already been declared
  const x = 3;
  // SyntaxError: Identifier 'x' has already been declared
}
```

### 参数命名冲突

使用参数默认值时，函数不能有同名参数。

```js
// 不报错
function fn(x, x, y) {
  // do something
}

// 报错
function fn(x, x, y = 1) {
  // do something
}
// SyntaxError: Duplicate parameter name not allowed in this context
```

### 惰性求值

参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。

```js
let x = 99;
function fn(p = x + 1) {
  console.log(p);
}

fn();
// 100

x = 100;
fn();
// 101
```

### 结合解构赋值

```js
function fn({ x, y = 5 }) {
  console.log(x, y);
}

fn({});
// undefined 5

fn({ x: 1 });
// 1 5

fn({ x: 1, y: 2 });
// 1 2

fn();
// TypeError: Cannot read property 'x' of undefined
```

上面代码只使用了对象的解构赋值默认值，没有使用函数参数的默认值。只有当函数 `fn` 的参数是一个对象时，变量 `x` 和 `y` 才会通过解构赋值生成。如果函数 `fn` 调用时没提供参数，变量 `x` 和 `y` 就不会生成，从而报错。通过提供函数参数的默认值，就可以避免这种情况。

```js
function fn({ x, y = 5 } = {}) {
  console.log(x, y);
}

fn();
// undefined 5
```

下面是另一个解构赋值默认值的例子。

```js
function fetch(url, { body = '', method = 'GET', headers = {} }) {
  console.log(method);
}

fetch('http://example.com', {});
// "GET"

fetch('http://example.com');
// VM1292:1 Uncaught TypeError: Cannot read property 'body' of undefined
//    at fetch (<anonymous>:1:23)
//    at <anonymous>:5:1
```

上面代码中，如果函数 `fetch` 的第二个参数是一个对象，就可以为它的三个属性设置默认值。这种写法不能省略第二个参数，如果结合函数参数的默认值，就可以省略第二个参数。这时，就出现了双重默认值。

```js
function fetch(url, { body = '', method = 'GET', headers = {} } = {}) {
  console.log(method);
}

fetch('http://example.com');
// "GET"
```

上面代码中，函数 `fetch` 没有第二个参数时，函数参数的默认值就会生效，然后才是解构赋值的默认值生效，变量 `method` 才会取到默认值 `GET`。

### 结合案例分析

```js
// 写法一
function fn1({ x = 0, y = 0 } = {}) {
  return [x, y];
}

// 写法二
function fn2({ x, y } = { x: 0, y: 0 }) {
  return [x, y];
}
```

上面两种写法都对函数的参数设定了默认值，区别是：

- 写法一函数参数的默认值是空对象，但是设置了对象解构赋值的默认值；
- 写法二函数参数的默认值是一个有具体属性的对象，但是没有设置对象解构赋值的默认值

```js
// 函数没有参数的情况
fn1();
// [0, 0]
fn2();
// [0, 0]

// x 和 y 都有值的情况
fn1({ x: 3, y: 8 });
// [3, 8]
fn2({ x: 3, y: 8 });
// [3, 8]

// x 有值，y 无值的情况
fn1({ x: 3 });
// [3, 0]
fn2({ x: 3 });
// [3, undefined]

// x 和 y 都无值的情况
fn1({});
// [0, 0];
fn2({});
// [undefined, undefined]

fn1({ z: 3 });
// [0, 0]
fn2({ z: 3 });
// [undefined, undefined]
```

## 参数默认值的位置

通常情况下，定义了默认值的参数，应该是函数的尾参数。因为这样比较容易看出来，到底省略了哪些参数。如果非尾部的参数设置默认值，实际上这个参数是没法省略的。

```js
// example 1
function fn(x = 1, y){
    return [x, y];
}

fn();
// [1, undefined]

fn(2);
// [2, undefined]

fn(, 1);
// Uncaught SyntaxError: Unexpected token ,

fn(undefined, 1);
// [1, 1]

// example 2
function bar(x, y = 5, z){
    return [x, y, z];
}

bar();
// [undefined, 5, undefined]

bar(1);
// [1, 5, undefined]

bar(1, ,2);
// Uncaught SyntaxError: Unexpected token ,

bar(1, undefined, 2);
// [1, 5, 2]
```

如果传入`undefined`，将触发该参数等于默认值，`null`则没有这个效果。

```js
function fn(x = 5, y = 6) {
  console.log(x, y);
}

fn(undefined, null);
// 5 null
```

## 函数的长度属性

指定了默认值以后，函数的 `length` 属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，`length`属性将失真。

示例一：一个参数，没有默认值

```js
(function(a) {}.length);
// 1
```

示例二：一个参数，有默认值

```js
(function(a = 5) {}.length);
// 0
```

示例三：三个参数，其中一个参数有默认值

```js
(function(a, b, c = 5) {}.length);
// 2
```

上面代码中，`length` 属性的返回值，等于函数的参数个数减去指定了默认值的参数个数。比如，上面最后一个函数，定义了 3 个参数，其中有一个参数 `c` 指定了默认值，因此 `length` 属性等于 `3` 减去 `1`，最后得到 `2`。

这是因为 `length` 属性的含义是，该函数预期传入的参数个数。某个参数指定默认值以后，预期传入的参数个数就不包括这个参数了。同理，后文的 rest 参数也不会计入 `length` 属性。

```js
(function(...args) {}.length); // 0
```

如果设置了默认值的参数不是尾参数，那么`length`属性也不再计入后面的参数了。

```js
(function(a = 0, b, c) {}.length(
  // 0

  function(a, b = 1, c) {}
).length);
// 1
```

## 参数作用域

一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。

```js
var x = 1;

function fn(x, y = x) {
  console.log(y);
}

f(2); // 2
```

上面代码中，参数 `y` 的默认值等于变量 `x`。调用函数 `fn` 时，参数形成一个单独的作用域。在这个作用域里面，默认值变量 `x` 指向第一个参数 `x`，而不是全局变量 `x`，所以输出是 `2`。

再看下面的例子。

```js
let x = 1;

function fn(y = x) {
  let x = 2;
  console.log(y);
}

fn(); // 1
```

上面代码中，函数 `fn` 调用时，参数 `y = x` 形成一个单独的作用域。这个作用域里面，变量 `x` 本身没有定义，所以指向外层的全局变量 `x`。函数调用时，函数体内部的局部变量 `x` 影响不到默认值变量 `x`。

如果此时，全局变量 `x` 不存在，就会报错。

```js
function fn(y = x) {
  let x = 2;
  console.log(y);
}

fn(); // ReferenceError: x is not defined
```

下面这样写，也会报错。

```js
var x = 1;

function fn(x = x) {
  // ...
}

fn(); // ReferenceError: x is not defined
```

上面代码中，参数 `x = x` 形成一个单独作用域。实际执行的是 `let x = x`，由于暂时性死区的原因，这行代码会报错 `x is not defined`（指第二个 `x` 未定义）。

如果参数的默认值是一个函数，该函数的作用域也遵守这个规则。请看下面的例子。

```js
let fn = 'outer';

function bar(func = () => fn) {
  let fn = 'inner';
  console.log(func());
}

bar(); // outer
```

上面代码中，函数 `bar` 的参数 `func` 的默认值是一个匿名函数，返回值为变量 `fn`。函数参数形成的单独作用域里面，并没有定义变量 `fn`，所以 `fn` 指向外层的全局变量 `fn`，因此输出 `outer`。

如果写成下面这样，就会报错。

```js
function bar(func = () => fn) {
  let fn = 'inner';
  console.log(func());
}

bar(); // ReferenceError: fn is not defined
```

上面代码中，匿名函数里面的 `fn` 指向函数外层，但是函数外层并没有声明变量 `fn`，所以就报错了。

下面是一个更复杂的例子。

```js
var x = 1;
function fn(
  x,
  y = function() {
    x = 2;
  }
) {
  var x = 3;
  y();
  console.log(x);
}

fn(); // 3
x; // 1
```

上面代码中，函数 `fn` 的参数形成一个单独作用域。这个作用域里面，首先声明了变量 `x`，然后声明了变量`y`，`y` 的默认值是一个匿名函数。这个匿名函数内部的变量 `x`，指向同一个作用域的第一个参数 `x`。函数 `fn`内部又声明了一个内部变量 `x`，该变量与第一个参数 `x` 由于不是同一个作用域，所以不是同一个变量，因此执行`y`后，内部变量`x`和外部全局变量 `x` 的值都没变。

如果将 `var x = 3` 的 `var` 去除，函数 `fn` 的内部变量 `x` 就指向第一个参数 `x`，与匿名函数内部的 `x` 是一致的，所以最后输出的就是 `2`，而外层的全局变量 `x` 依然不受影响。

```js
var x = 1;
function fn(
  x,
  y = function() {
    x = 2;
  }
) {
  x = 3;
  y();
  console.log(x);
}

fn();
// 2

console.log(x);
// 1
```

**总结：**

- 函数声明初始化时，一旦设置了参数默认值，参数会形成一个单独的作用域，等初始化结束后，该作用域即会消失。这种语法在不设置参数默认值的时候是不会出现的。
- 参数作用域出线的变量名率先寻找参数作用域内先声明的参数，若不存在则寻找外部作用域的（不会从函数内部作用域寻找）
  - 若先声明的参数已定义，则该值为该参数所定义的值
  - 若先声明的参数未定义，并且外部作用域无同名变量已定义，则报错
- 若参数默认值为函数，则该作为默认值的函数作用域与参数独立作用域相同
  - 当函数内部作用域重新声明与已有参数同名变量，变量与同名参数不为同一变量
  - 当函数内部作用域存在同名变量（没有重新声明），变量指向的是函数参数本身

## 抛弃参数对象

现在我们已经看到了 `arguments` 对象可被不定参数和默认参数完美代替，移除 `arguments` 后通常会使代码更易于阅读。除了破坏可读性外，众所周知，针对 `arguments` 对象对 JavaScript 虚拟机进行的优化会导致一些让你头疼不已的问题。

我们期待着不定参数和默认参数可以完全取代 `arguments`，要实现这个目标，标准中增加了相应的限制：在使用不定参数或默认参数的函数中禁止使用 `arguments` 对象。曾经实现过 `arguments` 的引擎不会立即移除对它的支持，当然，现在更推荐使用不定参数和默认参数。
