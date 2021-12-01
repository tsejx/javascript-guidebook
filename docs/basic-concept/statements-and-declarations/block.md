---
nav:
  title: 基本语法
  order: 1
group:
  title: 语句和声明
  order: 7
title: 块语句
order: 1
---

# 块语句

块语句（Block）用于组合零个或多个语句。该块由一对大括号 `{}` 界定，块内形成块级作用域，**块作用域内定义的变量将在离开块作用域后立即被回收**。

```js
{
  StatementList;
}
```

## 块级作用域

ES5  只有 **全局作用域** 和 **函数作用域**，没有块级作用域，这带来很多不合理的场景：

- 内层变量可能会覆盖外层变量
- 用来计数的循环变量泄露为全局变量。

因此，ES6  引入了块级作用域，明确允许在块级作用域之中声明函数。在 ES6  的块级作用域之中，函数声明语句的行为类似于  `let`，在块级作用域之外不可引用；但又有别于 `let`  命令，允许重复声明同名函数且存在函数变量提升。

块级作用域中的函数特征：

- 允许在块级作用域内声明函数。
- 函数声明类似于 `var`，即会提升到全局作用域或函数作用域的头部。
- 内层作用域声明的函数不干扰外层作用域的函数。

### var

通过 `var` 声明的变量没有块级作用域。在语句块里声明的变量作用域是其所在的函数或者 `<script>` 标签内，你可以在语句块外面访问到它。

换句话说，语句块不会生成一个新的作用域。尽管单独的语句块是合法的语句，但在 JavaScript 中你不会想使用单独的语句块，因为它们不像你想象的 C 或 Java 中的语句块那样处理事物。

```js
var a = 1;
{
  var a = 2;
}
console.log(a); // 2
```

### let 和 const

相比之下，使用  `let` 和 `const` 声明的变量是有块级作用域的。

```js
let a = 1;
{
  let a = 2;
}
console.log(a); // 1
```

```js
const a = 1;
{
  const a = 2;
}
console.log(a); // 1
```

注意块级作用域里的常量声明 `const c = 2`  并不会抛出 `SyntaxError: Identifier 'a' has already been declared` 这样的语法错误，因为这是一个新的作用域。

### function

函数声明同样被限制在声明它的语句块内。

```js
foo('outside'); // TypeError: foo is not a function
{
  function foo(location) {
    console.log('foo is called ' + location);
  }
  foo('inside'); // 'foo is called inside'
}
```
