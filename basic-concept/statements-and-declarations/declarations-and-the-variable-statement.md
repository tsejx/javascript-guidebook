# 变量

ECMAScript 的变量是松散类型的，所谓松散类型就是可以用来保存任何类型的数据。换句话说，每个变量仅仅是一个用于保存值的占位符而已。

## 变量声明

### var

变量声明，无论发生在何处，都在执行任何代码之前进行处理。用 `var` 声明的变量的作用域是它当前的执行上下文，它可以是嵌套的函数，也可以是声明在任何函数外的变量。如果你重新声明一个 JavaScript 变量，它将不会丢失其值。

将赋值给未声明变量的值在执行赋值时将其隐式地创建为全局变量（它将成为全局对象的属性）。声明和未声明变量之间的差异是：

 - 声明变量的作用域限制在其声明位置的上下文中，而非声明变量总是全局的。

```javascript
function x() {
  y = 1;   // 在严格模式（strict mode）下会抛出ReferenceError异常。
  var z = 2;
}

x();

console.log(y); // 打印"1" 。
console.log(z); // 抛出ReferenceError: z未在x外部声明。
```

 - 声明变量在任何代码执行前创建，而非声明变量只有在执行赋值操作的时候才会被创建。

```javascript
console.log(a);                // 抛出ReferenceError。
console.log('still going...'); // 永不执行。
```

```javascript
var a;
console.log(a);                // 打印"undefined"或""（不同浏览器实现不同）。
console.log('still going...'); // 打印"still going..."。
```

 - 声明变量是它所在上下文环境的不可配置属性，非声明变量是可配置的（如非声明变量可以被删除）。

```javascript
var a = 1;
b = 2;

delete this.a; // 在严格模式（strict mode）下抛出TypeError，其他情况下执行失败并无任何提示。
delete this.b;

console.log(a, b); // 抛出ReferenceError。
// 'b'属性已经被删除。
```

由于这三个差异，未能声明变量将很可能导致意想不到的结果。因此，建议始终声明变量，无论它们是在函数还是全局作用域内。 而在 ECMAScript 5 严格模式下，分配给未声明的变量会引发错误。

### let 

`let` 允许你声明一个作用域被限制在块级中的变量、语句或者表达式。与 `var` 关键字不同的是，它声明的变量只能是全局或者整个函数块的。

`let` 声明的变量只在其声明的块或子块中可用，这一点，与 `var` 相似。二者之间最主要的区别在于 `var` 声明的变量的作用域是整个封闭函数。

```javascript
function varTest() {
  var x = 1;
  if (true) {
    var x = 2;  // 同样的变量!
    console.log(x);  // 2
  }
  console.log(x);  // 2
}

function letTest() {
  let x = 1;
  if (true) {
    let x = 2;  // 不同的变量
    console.log(x);  // 2
  }
  console.log(x);  // 1
}
```

#### `let` 暂存死区的错误

在相同的函数或块作用域内重新声明同一个变量会引发 `SyntaxError`。

```javascript
{
  let foo;
  let foo; // TypeError thrown.
}
```

★ 在 ECMAScript 2015 中，`let` 绑定不受**变量提升**的约束，这意味着 `let` 声明不会被提升到当前执行上下文的顶部。在块中的变量初始化之前，引用它将会导致 `ReferenceError`（而使用 `var` 声明变量则恰恰相反，该变量的值是 `undefined` ）。该变量处于从块开始到初始化处理的“暂存死区”。

```javascript
{
  console.log(bar); // undefined
  console.log(foo); // ReferenceError: foo is not defined
  var bar = 1;
  let foo = 2;
}
```

在 `switch` 声明中你可能会遇到这样的错误，因为它只有一个块.

```javascript
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

```javascript
let x = 1;

switch(x) {
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

### const

此声明创建一个常量，其作用域可以是全局或本地声明的块。 与 `var` 变量不同，全局常量不会变为窗口对象的属性。需要一个常数的初始化器；也就是说，您必须在声明的同一语句中指定它的值（这是有道理的，因为以后不能更改）。

`const` 声明创建一个值的只读引用。但这并不意味着它所持有的值是不可变的，只是变量标识符不能重新分配。例如，在引用内容是对象的情况下，这意味着可以改变对象的内容（例如，其参数）。

关于“暂存死区”的所有讨论都适用于 `let` 和 `const`。

一个常量不能和它所在作用域内的其他变量或函数拥有相同的名称。

```javascript
// 注意: 常量在声明的时候可以使用大小写，但通常情况下全部用大写字母。 

// 定义常量 a 并赋值7
const a = 7;

// 报错
a = 20;

// 输出 7
console.log(a);

// 尝试重新声明会报错 
const a = 20;

//  a 保留给上面的常量，这个操作会失败
var a = 20; 

// 也会报错
let a = 20;

// 注意块范围的性质很重要
{ 
    // 没问题，并且创建了一个块作用域变量 a
    // (works equally well with let to declare a block scoped non const variable)
    let a = 20;

    // a 现在为 20
    console.log(a);

    // 这被提升到全局上下文并引发错误
    var a = 20;
}

// a 依旧为7
console.log(a);
```

 - 常量要求一个初始值

```javascript
const b; // SyntaxError: missing = in const declaration
```

 - 常量可以定义成对象

```javascript
const c = {"key": "value"};

// 重写对象和上面一样会失败
c = {"OTHER_KEY": "value"};

// 对象属性并不在保护的范围内，下面这个声明会成功执行
c.key = "otherValue";
```

- 常量可以定义成数组

```javascript
const d = [];
// It's possible to push items into the array
// 可以向数组填充数据
d.push('A'); // ["A"]
// 但是，将一个新数组赋给变量会引发错误
d = ['B']
```

## 变量作用域

在所有函数之外声明的变量，叫做全局变量，因为它可被当前文档中的任何其他代码所访问。在函数内部声明的变量，叫做局部变量，因为它只能在该函数内部访问。

ECMAScript 6 之前的 JavaScript 没有 语句块 作用域；相反，语句块中声明的变量将成为语句块所在代码段的局部变量。例如，如下的代码将在控制台输出 5，因为 x 的作用域是声明了 x 的那个函数（或全局范围），而不是 `if` 语句块。

```javascript
if (true) {
  var x = 5;
}
console.log(x); // 5
```

如果使用 ECMAScript 6 中的 let 声明，上述行为将发生变化。

```javascript
if (true) {
  let y = 5;
}
console.log(y); // ReferenceError: y is not defined
```

## 变量提升

在 JavaScript 中，变量的声明可以放在它的使用之后。换句话说，**变量可以先使用后声明**。这主要是因为JavaScript的提升（hoisting）机制在作怪。简单点说，**提升(hoisting)是JavaScript中默认就具有的一种机制，它将当用作用域内的所有声明都提升到所在作用域的最顶部**。如此一来，可以把变量提升归纳为：

 > JavaScript引擎的工作方式是，先解析代码，获取所有被声明的变量，然后再一行一行地运行。这造成的结果，就是所有的变量的声明语句，都会被提升到代码的头部，这就叫做变量提升（hoisting）。

JavaScript 的提升将会影响一个变量的生命周期，JavaScript 中的一个变量，其生命周期主要包含三个阶段：

 - 声明变量：创建一个新变量，如 `var name;`
 - 变量初始化：给变量初始化一个值，如 `name = 'car';`
 - 变量使用：使用变量的值，如 `console.log(name);`

```javascript
name = 'car';
var name;
console.log(name);
```

在编写代码时应该这样来作处理：

```javascript
var name; // 代码编译阶段
name = 'car'; // 代码运行阶段
console.log(name); // 代码运行阶段
```

★ 变量提升就是把变量提升到函数的顶部。需要特别说明的是：**变量提升只是提升变量的声明，并不会把赋值也提升上来**。


★ **只有在有var声明的变量才会被提升到函数最顶部**

## 变量的数据类型

具体参考 [数据结构与类型](https://github.com/tsejx/JavaScript-Guidebook/blob/master/01_BasicConcept/1_Grammar%26Types/3_DataStructures%26Types.md)