---
nav:
  title: 基本语法
  order: 1
group:
  title: 语句和声明
  order: 7
title: 变量声明
order: 2
---

# 变量声明

ECMAScript 的变量是松散类型的，所谓松散类型就是可以用于保存任何类型的数据。换句话说，每个变量仅仅是一个用于保存值的占位符而已。

## 变量声明

### `var`

`var` 语句用于声明一个变量，可选地将其初始化为一个值。

变量声明，无论发生在何处，都在执行任何代码之前进行处理。用 `var` 声明的变量的作用域是它当前的执行上下文，它可以是嵌套的函数，也可以是声明在任何函数外的变量。如果你重新声明一个 JavaScript 变量，它将不会丢失其值。

将赋值给未声明变量的值在执行赋值时将其隐式地创建为全局变量（它将成为全局对象的属性）。声明和未声明变量之间的差异是：

- 声明变量的作用域限制在其声明位置的上下文中，而非声明变量总是全局的。

```js
function x() {
  y = 1; // 在严格模式下会抛出ReferenceError异常
  var z = 2;
}

x();

console.log(y); // 打印'1'
console.log(z); // 抛出ReferenceError: z未在x外部声明
```

- 声明变量在任何代码执行前创建，而非声明变量只有在执行赋值操作的时候才会被创建。

```js
console.log(a); // 抛出ReferenceError

console.log('still going...'); // 永不执行
```

```js
var a;

console.log(a); // 打印'undefined'或''（不同浏览器实现不同）

console.log('still going...'); // 打印'still going...'
```

- 声明变量是它所在上下文环境的**不可配置属性**，非声明变量是可配置的（如非声明变量可以被删除）。

```js
a = 1;
b = 2;

delete this.a; // 在严格模式下抛出TypeError，其他情况下执行失败并无任何提示。
delete this.b;

console.log(a, b); // 抛出ReferenceError	// 'b'属性已经被删除。
```

由于这三个差异，未能声明变量将很可能导致意想不到的结果。因此，建议始终声明变量，无论它们是在函数还是全局作用域内。 而在 ECMAScript 5 严格模式下，分配给未声明的变量会引发错误。

⚠️ 由于变量声明（以及其他声明）总是在任意代码执行之前处理的，所以在代码中的任意位置声明变量总是等效于在代码开头声明。这意味着变量可以在声明之前使用，这个行为叫做[提升（hoisting）](../../core-modules/executable-code-and-execution-contexts/compilation/hoisting)。提升就像是把所有的变量声明移动到函数或者全局代码的开头位置。

### `let`

`let` 语句声明一个块级作用域的本地变量，并且可选的将其初始化为一个值。

`let` 语句所声明的变量有如下特征：

1. `let` 是块级变量，不存在于 `window` 对象下非全局属性，`window.变量名` 是找不到 `let` 声明的变量的
2. `let` 不允许重复声明同名变量，会抛出异常，具有唯一性
3. `let` 不允许未声明变量就使用，会抛出异常，只有执行该声明的时候才能使用
4. `let` 有自己特色的闭包特性，比如在 `for` 语句循环中

```js
let a = 1;

console.log(window.a); // Output: undefined
```

```js
let b = 2;

let b = 3; // SyntaxError: Identifier 'b' has already been declared
```

```js
console.log(c); // ReferenceError: c is not defined

let c = 2;
```

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // Output: 1,2,3
  });
}
```

### 暂存性死区

临时性死区：描述 `let` 和 `const` 声明的变量不提升的效果 。

在 ECMAScript 2015 中，`let` 绑定不受**变量提升**的约束，这意味着 `let` 声明不会被提升到当前执行上下文的顶部。在块中的变量初始化之前，引用它将会导致 `ReferenceError`（而使用 `var` 声明变量则恰恰相反，该变量的值是 `undefined` ）。该变量处于从块开始到初始化处理的「暂存死区」。

```js
{
  console.log(bar); // undefined
  console.log(foo); // ReferenceError: foo is not defined
  var bar = 1;
  let foo = 2;
}
```

在 `switch` 声明中你可能会遇到这样的错误，因为它只有一个块.

```js
switch (x) {
  case 0:
    let foo;
    break;
  case 1:
    let foo; // TypeError for redeclaration.
    break;
}
```

但是，重要的是要指出嵌套在 `case` 子句内的块将创建一个新的块作用域的词法环境，这不会产生上面显示的重新声明错误。

```js
let x = 1;

switch (x) {
  case 0: {
    let foo;
    break;
  }
  case 1: {
    let foo;
    break;
  }
}
```

拓展：[ES6 中 let 暂时性死区详解](https://segmentfault.com/a/1190000015603779)

### `const`

`const` 语句用于创建一个常量，一旦声明，常量的值就不能改变。其作用域可以是全局或本地声明的块。

`const` 声明的常量具有以下特征：

1. `const` 与 `let` 一样，不可重复声明同名变量，具有唯一性
2. `const` 与 `let` 一样，不存在变量提升，所声明的变量均存在暂时性死区
3. `const` 与 `let` 一样，只在声明所在的块级作用域内有效
4. `const` 声明的变量可以理解为只读变量，但是并非一成不变

`const` 声明创建一个值的只读引用。但这并不意味着它所持有值是不可变的，只是变量标识符不能重新分配。例如，在引用内容是对象的情况下，这意味着可以改变对象的内容（例如，其参数）。

- 常量要求一个初始值

```js
const b; 	// SyntaxError: missing = in const declaration
```

- 常量可以定义成对象

```js
const c = { key: 'value' };

// 重写对象和上面一样会失败
c = { OTHER_KEY: 'value' };

// 对象属性并不在保护的范围内，下面这个声明会成功执行
c.key = 'otherValue';
```

- 常量可以定义成数组

```js
const d = [];

d.push('A'); // ["A"]

d = ['B']; // TypeError: Assignment to constant variable.
```

## 变量作用域

在所有函数之外声明的变量，叫做全局变量，因为它可被当前文档中的任何其他代码所访问。在函数内部声明的变量，叫做局部变量，因为它只能在该函数内部访问。

ECMAScript 6 之前的 JavaScript 没有 语句块 作用域；相反，语句块中声明的变量将成为语句块所在代码段的局部变量。例如，如下的代码将在控制台输出 5，因为 x 的作用域是声明了 x 的那个函数（或全局范围），而不是 `if` 语句块。

```js
if (true) {
  var x = 5;
}
console.log(x); // 5
```

如果使用 ECMAScript 6 中的 let 声明，上述行为将发生变化。

```js
if (true) {
  let y = 5;
}
console.log(y); // ReferenceError: y is not defined
```

## 变量的数据类型

详情参考 [数据类型](../data-types/data-types)

---

**参考资料：**

- [ECMScript6 入门：let 和 const 命令](http://es6.ruanyifeng.com/#docs/let)
