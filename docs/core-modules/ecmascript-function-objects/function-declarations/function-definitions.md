---
nav:
  title: 核心模块
  order: 3
group:
  title: 函数声明
  order: 6
title: 函数声明定义
order: 1
---

# 函数声明式定义

一个函数定义由一系列的 `function` 关键字组成，依次为：

- 函数的名称
- 函数的参数列表，包围在括号中并由逗号分隔
- 函数执行的语句，用大括号 `{}` 括起来（函数体）

## 函数声明语句

函数声明语句的组成要素：

1. `function` 关键字
2. `functionName` 函数名
3. `arg` 参数（可选）
4. `functionBody` 函数体

### 语法

```js
function functionName ([arg1 [,arg2 [...,argn]]]) {
  // functionBody 函数体
}
```

<br/>

| 函数声明要素   | 含义       | 说明                                                                                                 |
| :------------- | :--------- | :--------------------------------------------------------------------------------------------------- |
| `function`     | 声明关键字 | 声明的函数名称的标识符                                                                               |
| `functionName` | 函数名称   | 当前作用域内函数名称唯一                                                                             |
| `arg`          | 参数列表   | 函数名之后的圆括号中是参数列表，参数之间使用逗号分隔。当调用函数时，这些标识符则指代传入函数的实参。 |
| `functionBody` | 函数体     | 所有语句的集合，包括花括号在内                                                                       |

### 特点

- 当函数的参数是一个值（基本数据类型），若被调用函数改变了这个参数的值，这样的改变不会影响到全局或调用的函数
- 但当函数的参数是一个对象（即一个非原始值，例如 `Array` 或用户自定义的其他对象），若函数改变了这个对象的的属性，这样的改变对函数外部是可见的

<br />

```js
function fn(arg1) {
  arg1.name = 'JavaScript';
}

let foo = { name: 'Java', year: 1998 };

fn(foo);

console.log(foo.name);
// 'JavaScript'
```

<br />

- `function` 语句里的 **花括号是必需** 的，这和 `while` 循环和其他一些语句所使用的语句块是不同的，即使函数体内只包含一条语句，仍然必须使用花括号将其括起来。

<br />

```js
function test();
// SyntaxError: Unexpected end of input

function test(){};
// 不报错

while(true);
// 不报错
```

<br />

- **函数的重复声明会覆盖前面的声明**（无论是函数表达式还是函数声明）

⚠️ **注意**：由于函数声明提升优先于函数表达式的变量声明提升，所以变量的声明无作用。

```js
var foo;

function foo() {
  console.log(1);
}

foo();
// 1
```

后面的函数声明会覆盖前面的函数声明

```js
baz();
// 2

function baz() {
  console.log(1);
}

function baz() {
  console.log(2);
}
```

- 和变量声明一样，函数声明语句创建的变量无法删除

```js
function foo() {
  console.log(1);
}

delete foo;
// false

console.log(foo());
// 1
```

## 函数表达式

函数表达式要素：

- `var/let/const` 关键字
- `variableName` 变量名
- 表达式赋值等号
- 声明变量后的分号
- `functionName` 函数名（可选，没有的话叫做匿名函数）
- `functionBody` 函数体

通常而言，以表达式方式定义函数时都不需要名称，这会让定义它们的代码更加紧凑。函数定义表达式特别适合用来定义那些只会使用一次的函数。

### 语法

```js
const variableName = function functionName(arg) {
  // 函数体
  functionBody;
};
```

函数表达式要素与函数声明语句基本一致

### 匿名函数

**匿名函数（anonymous function）** 也叫拉姆达函数，是 `function` 关键字后面没有标识符的函数。

```js
const square = function (number) {
  return number * number;
};
```

### 具名函数

函数表达式也可以提供函数名，并且可以用于在函数内部使用来代指其本身，或者在调试器堆栈跟踪中鉴别该函数。

```js
const factorial = function fac(n) {
  return n < 2 ? 1 : n * fac(n - 1);
};

console.log(factorial(3));

var x = square(4);
// x 得到的值为16
```

### 函数名称

一个函数定义表达式包含名称，函数的局部作用域将会包含一个绑定到函数对象的名称。实际上，函数的名称将成为函数内部的一个局部变量。

```js
const foo = function fn() {
  return fn;
};

console.log(foo);
// fn(){
//  return fn
// }

console.log(foo());
// fn(){
//  return fn
// }

console.log(foo()());
// fn(){
//  return fn
// }
```

个人理解：

- 对于具名的函数表达式来说，**函数名称** 相当于函数对象的 <strong style="color: red">形参</strong>，只能在函数内部使用；
- 而 **变量名称** 相当于函数对象的 <strong style="color: red">实参</strong>，在函数内部和函数外部都可以使用。

```js
const foo = function fn() {
  return fn === foo;
};

console.log(foo());
// true

console.log(foo === fn);
// ReferenceError: fn is not defined
```

函数定义了一个非标准的 `name` 属性，通过这个属性可以访问到给定函数指定的名字，这个属性的值永远等于跟在 `function` 关键字后面的标识符，匿名函数的 `name` 属性为空

```js
// IE11- 浏览器无效，均输出 undefined
// Chrome在处理匿名函数的 name 属性时有问题，会显示函数表达式的名字
function fn() {}
console.log(fn.name);
// 'fn'

var fn = function () {};
console.log(fn.name);
// ''，在chrome浏览器中会显示'fn'

var fn = function abc() {};
console.log(fn.name);
// 'abc'
```

## 函数声明优先

虽然都可以定义函数，但最大的区别在于：

- 解析器会 **率先读取函数声明**，使其在执行任何代码之前就可以访问（也就是 **函数声明提升**）；
- 而函数表达式则需要 **解析器执行到它所在的代码行** 才会被解释执行。

```js
foo();
// 能正常运行 弹出 foo

bar();
// 报错 Uncaught TypeError: baz is a function(...)

function foo() {
  alert('foo');
}

var baz = function bar() {
  alert('bar');
};
```
