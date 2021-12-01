---
nav:
  title: 基本语法
  order: 1
group:
  title: 词法语法
  order: 2
title: 词法语法
order: 1
---

# 词法语法

ECMAScript 源码文本会被从左到右扫描，并被转换为一系列的输入元素，包括标识符、控制符、行终止符、注释和空白符。

同样地，ECMAScript 也定义了一些关键字、字面量以及行尾分号补全的规则。

## 字符集

JavaScript 程序使用 Unicode 字符集编写。Unicode 是 ASCII 和 Latin-1 的超集，并支持地球上几乎所有在使用的语言。ECMAScript3 要求 JavaScript 的实现必须支持 Unicode2.1 及后续版本，ECMAScript5 则要求支持 Unicode3 及后续版本。

### 区分大小写

JavaScript 是区分大小写的语言，也就是说，关键字、变量、函数名和所有的标识符（Identifier）都必须采取一致的大小写的形式。但是需要注意的是，HTML 和 CSS 并不区分大小写（尽管 XHTML 区分大小写），也就是说如果我们在用 JavaScript 控制 HTML 属性的时候对 HTML 来说 `id` 和 `ID` 没区别，但是 JavaScript 有区别。

🌰 **代码示例**：

`abc`、`Abc`、`aBc`、`abC`、`ABC` 是五个不同的变量名。

```js
var abc = 1;
var Abc = 2;
var aBc = 3;
var abC = 4;
var ABC = 5;

console.log(abc, Abc, aBc, abC, ABC); // 1 2 3 4 5
```

### 空格、换行符和格式控制符

JavaScript 会忽略程序中 **标识**（Token）之间的空格。多数情况下，JavaScript 同样会忽略换行符。由于可以在代码中随意使用空格和换行，因此可以采用整齐、一致的缩进来形成统一的编码风格，从而提高代码的可读性。

#### 空白字符

空白字符 WhiteSpace

```js
\u0009    水平制表符        <TAB>
\u000B    垂直制表符        <VT>
\u000C    换页符            <FF>
\u0020    空格符            <SP>
\u00A0    非中断空格符      <NBSP>
\uFEFF    字符序标记
```

#### 行终止符

行终止符 LineTerminator

```js
\u000A    换行符        <LF>
\u000D    回车符        <CR>
\u2028    行分隔符      <LS>
\u2029    段落分割符     <PS>
```

⚠️ **注意**：回车符加换行符在一起被解析成一个单行结束符

### Unicode 转义序列

在有些计算机硬件和软件里，无法显示或输入 Unicode 字符全集。为了兼容，JavaScript 定义了一种特殊序列，使用 6 个 ASCII 字符来代表任意 16 位 Unicode 内码。这些 Unicode 转义序列均以 `\u` 为前缀，其后跟随 4 个十六进制数（使用数数字以及大写或小写的字母 A~F 表示），可以用于 JavaScript 直接量、正则表达式和标识符中（关键字除外）。

## 注释

JavaScript 不会执行注释。

我们可以添加注释来对 JavaScript 进行解释，或者提高代码的可读性。

### 单行注释

单行注释以两个斜杠开头

```js
let a;
```

### 多行注释

多行注释又叫块级注释，以 `/*` 开头，以 `*/` 结尾

```js
/*
以下代码为
声明变量并
赋值
*/
let a;
a = 1;
```

块级注释 `/**/` 可以跨行书写，但不能嵌套，否则会报错。

```js
// Error

/*
注释1
/*
注释1.1
 */
 */
```

块级注释 `/**/` 中的那些字符也可能出现在正则表达式字面量里，所以块级注释对于被注释的代码块来说是不安全的。

```js
/*
    var rm_a = /a*/.match(s);
*/
```

### 阻止执行

注释可用于阻止其中一条代码行的执行（可用于调试）：

```js
// var a = 1;
var a = 2;
```

### 行末注释

在下面的例子中，我们把注释放到代码行的结尾处：

```js
var x = 5; // 声明 x 并把 5 赋值给它
var y = x + 2; // 声明 y 并把 x+2 赋值给它
```

## 直接量

JavaScript 数据直接量：**直接量（Literals）**，又名**字面量**，就是可以在程序中直接使用的数据。

主要有以下几种直接量：

**空直接量**

```js
null;
```

**布尔直接量**

```js
true;
false;
```

**数值直接量**

```js
// 十进制
1234567890;
```

⚠️ **注意**：十进制数值直接量可以以 0 开头，但是如果 0 以后的最高位比 8 小，数值将会被认为是八进制而不会报错

```js
// 二进制
0b10000000000000000000000000000000;
// 2147483648
```

二进制表示为开头是 0 后接大写或小写的 B（`0b`或者`0B`）。如果`0b`之后有除了 0 或 1 以外的数字，将会抛出错误。

```js
// 八进制
0o755;
// 493
```

进制表示为开头是 0 后接大写或小写的 O（`0o` 或 `0O`）。如果有不在 `01234567` 中的数字，将会抛出错误。

```js
// 十六进制
0xfffffffffffffffff;
// 295147905179352830000
```

十六进制表示为开头是 0 后接大写或小写的 X（`0x`或`0X`）。如果有不在 `0123456789ABCDEF` 中的数字，将会抛出错误。

**字符串直接量**

```js
'foo';
'bar';

// 十六进制转义序列
'\xA9'; // "©"

// Unicode转义序列
'\u00A9'; // "©"
```

**对象直接量**

```js
var o = { a: 'foo', b: 'bar', c: 42 };

// ES6中的简略表示方法
var a = 'foo',
  b = 'bar',
  c = 42;
var o = { a, b, c };

// 不需要这样
var o = { a: a, b: b, c: c };
```

**数组直接量**

```js
[1954, 1974, 1990, 2014];
```

**正则表达式直接量**

一个空的正则表达式直接量，必须有一个空的非捕获分组，以避免被当成是行注释符号。

```js
/ab+c/g

/(?:)/
```

**模板字符串直接量**

```js
`string text``string text line 1
 string text line 2``string text ${expression} string text`;
```

## 标识符

**标识符**，就是指变量、函数、属性的名字，或者函数的参数。标识符可以是按照下列格式规则组合起来的一或多个字符。

- 第一个字符必须是一个字母、下划线（`_`）、或一个美元符号（`$`）
- 其他字符可以是字母、下划线、美元符号或数字

标识符中的字母也可以包含扩展的 ASCII 或 Unicode 字母字符，但我们不推荐这样做。

按照惯例，ECMAScript 标识符采用驼峰大小写格式，也就是第一个字母小写，剩下的每个单词的首字母大写。

```js
const firstSecond = 123;

const myCar = 'Toyota';

const doSomethingImportant = function () {};
```

虽然没有谁强制要求必须采用这种格式，但为了与 ECMAScript 内置的函数和对象命名格式保持一致，可以将其当作一种最佳实践。

⚠️ **注意**：不能把关键字、保留字、`true`、`false` 和 `null` 用作标识符。

## 关键字和保留字

和其他任何编程语言一样，JavaScript 保留了一些标识符为自己所用。这些保留字不能用做普通的标识符。由于好多参考书的误导，貌似保留字和关键字是分开的，其实并不是，关键字只是保留字的一部分。

保留字包括**关键字**、**未来保留字**、**空字面量**和**布尔值字面量**。

### 保留字

- 关键字 Keyword
- 未来保留字 FutureReservedWord
- 空字面量 NullLiteral
- 布尔值字面量 BooleanLiteral

### 关键字

以下关键字 ES6 规范中已实现

```js
break      do         instanceof  typeof
case       else       new         var
catch      finally    return      void
continue   for        switch      while
debugger   function   this        with
default    if         throw       delete
in         try        class       extends
const      export     import
```

### 未来保留字

以上是 ECMAScript6 的保留字，但在 ECMAScript3 版本中的保留字并不一样，若希望代码能在基于 ECMAScript3 实现的解释器上运行的话，应该避免使用以下保留字作为标识符。

```js
abstract    boolean     byte        char
constdouble enum        final       float
goto        implements  int         interfacelong
native      package     private     protected
public      short       static      super
throw       transient   volatile    synchronized
```

**预定义变量和函数**

此外，JavaScript 预定义了很多全局变量和函数，应该避免把它们的名字用做标识符名。

```js
String      Number      Boolean      Array
Date        Function    Math         Object
RegExp      Error       EvalError    JSON
Infinity    NaN         isNaN        isFinite
undefined   arguments   parseInt     parseFloat
eval        decodeURI   encodeURI    decodeURIComponent
encodeURIComponent      RangeError   ReferenceError
TypeError   URIError    SyntaxError
```

## 分号

JavaScript 使用分号 `;` 将语句分隔开，这对增强代码的可读性和整洁性是非常重要的。

有些地方可以省略分号，有些地方则不能省略分号。

- **两条语句用两行书写，第一个分号可以省略**

```js
a = 3;
b = 4;
```

- **两条语句用一行书写，第一个分号不能省略**

```js
a = 3;
b = 4;
```

但 JavaScript 并不是在所有换行处都填补分号，只有在缺少了分号无法正确解析代码时，JavaScript 才会填补分号。换句话说，如果当前语句和随后的非空格字符不能当成一个整体来解析的话，JavaScript 就在当前语句行结束处填补分号。

🌰 **代码示例**：

```js
var a;
a = 3;
console.log(a);
```

JavaScript 将其解析为:

```js
var a;
a = 3;
console.log(a);
```

### 自动分号补全

JavaScript 并不是在所有换行处都填补分号，只有在缺少了分号就无法正确解析代码时，JavaScript 才会填补分号。换句话说，如果当前语句和随后的非空格字符不能当成一个整体来解析的话，JavaScript 就在当前语句行结束处填补分号。

- 当出现一个不允许的行终止符或 `}` 时，会在其之前插入一个分号。

🌰 **代码示例**：

```js
{ 1 2 } 3

// 将会被 ASI 转换为
{ 1 2 ;} 3;
```

当捕获到标识符输入流的结尾，并且无法将单个输入流转换为一个完整的程序时，将在结尾插入一个分号。

在下面这段中，由于在 `b` 和 `++` 之间出现了一个行终止符，所以 `++` 未被当成变量 `b` 的后置运算符。

🌰 **代码示例**：

```js
a = b;
++c;

// 将被ASI转换为
a = b;
++c;
```

当语句中包含行终止符语法的时候（也就是语句后紧跟着换行），将会在行结尾插入一个分号。

带 **这里没有行终止符** 规则的语句有：

- 后置运算符（`++` 和 `--`）
- `continue`
- `break`
- `return`
- `yield`、`yield*`
- `module`

```js
return;
a + b;

// 将被 ASI 转换为
return;
a + b;
```

```js
x;
++y;

// 解析为
x;
++y;

// 本意
x++;
y;
```

虽然分号不是必须的，但最好不要省略它，因为加上分号可以避免很多错误，代码行结尾处没有分号会导致压缩错误。加上分号也会在某些情况下增进代码的性能，因为这样解析器就不必再花时间推测应该在哪里插入分号了。
