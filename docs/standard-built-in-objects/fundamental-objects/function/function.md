---
nav:
  title: 内置对象
  order: 2
group:
  title: Function
  order: 5
title: Function
order: 1
---

# Function

Function 构造函数通过 `new` 创建一个新的 Function 对象。 在 JavaScript 中，每个函数实际上都是一个 Function 对象。

## 语法

**构造函数**

```js
new Function ( [ argName1 [, argName1 [, argNameN... [, funcBody ]]]] )
```

**函数类型转换函数**

```js
Function ( [ argName1 [, argName1 [, argNameN... [, funcBody ]]]] )
```

| 参数     | 说明                                                       | 类型   |
| :------- | :--------------------------------------------------------- | :----- |
| argName1 | 定义的第 1 个参数的名称                                    | string |
| argName2 | 定义的第 2 个参数的名称                                    | string |
| argNameN | 定义的第 N 个参数的名称，可以有任意多个                    | string |
| funcBody | 定义的函数主体，即函数内部的执行代码，默认为空字符串(`""`) | string |

`Function()` 会把传入的**最后一个参数**作为函数定义的执行代码，之前的所有参数均依次作为函数定义的参数。

- 如果没有指定任何参数，则表示该函数没有定义参数列表，函数的执行代码也为空。
- 如果只指定了一个参数，则该参数将被视作函数的执行代码。如果你想定义一个参数、执行代码为空，请传入两个参数，第二个参数为空字符串即可：`new Function("argName1", "")`。

`Function()` 的返回值是 Function 类型，返回一个函数对象。

## 描述

- 使用 Function 构造器生成的 Function 对象是在函数创建时解析的。这比你使用 [函数声明](../../../core-modules/ecmascript-function-objects/function-declarations/function-definitions#函数声明语句) 或者 [函数表达式](../../../core-modules/ecmascript-function-objects/function-declarations/function-definitions#函数表达式) 并在你的代码中调用更为低效，因为使用后者创建的函数是跟其他代码一起解析的
- 所有被传递到构造函数中的参数，都将被视为是将被创建函数的参数，并且是相同的标识符名称和传递顺序
- 使用 Function 构造器生成的函数，并不会在创建它们的上下文中创建闭包；它们一般在**全局作用域**中被创建。当运行这些函数的时候，它们只能访问自己的本地变量和全局变量，不能访问 Function 构造器被调用生成的上下文的作用域。这和使用带有函数表达式代码的 `eval` 不同
- 以调用函数的方式调用 Function 的构造函数（而不是用 `new` 关键字）跟以构造函数来调用是一样的

## 构造函数

- `Function.arguments`：以数组形式获取传入函数的所有参数。此属性已被 [`arguments`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions_and_function_scope/arguments) 替代。
- `Function.caller`：获取调用函数的具体对象
- `Function.length`：获取函数的接收参数个数
- `Function.name`：获取函数的名称
- `Function.displayName`：获取函数的 display name

## 原型对象

- [Function.prototype.apply](properties-of-the-function-prototype-object/apply)：设定指定函数的调用上下文环境，并提供数组形式的参数
- [Function.prototype.call](properties-of-the-function-prototype-object/call)：设定指定函数的调用上下文环境，并提供列表形式的参数
- [Function.prototype.bind](properties-of-the-function-prototype-object/bind)：绑定指定函数的调用上下文，无论如何调用均以该调用函数上下文为准
- ⚠️ Function.prototype.isGenerator：用于检测函数对象是否为 Generator 生成器函数

## 示例

### 基本示例

定义一个求和函数：带有 2 个参数 `x`、`y`

```js
const sum = new Function('x', 'y', 'return x + y;');
```

定义一个输出函数：没有定义参数，输出 `"CodePlayer"`

```js
const foo = Function('var name="CodePlayer"; console.log(name);');
```

执行函数。

```js
console.log(sum(12, 23));
// 35

foo();
// CodePlayer

console.log(typeof sum);
// function
console.log(sum instanceof Function);
// true
console.log(sum instanceof Object);
// true
```

### 函数声明

JavaScript 支持以 `function` 关键字形式直接声明函数，多数情况下，我们也推荐以 `function` 关键字形式声明函数。我们以 `function` 关键字形式声明等价于上面两个函数的对应代码如下：

```js
function sum(x, y) {
  return x + y;
}

function foo() {
  var name = 'CodePlayer';
  console.log(name);
}

// 执行函数
console.log(sum(12, 23));
// 35
foo();
// CodePlayer

console.log(typeof sum);
// function
console.log(sum instanceof Function);
// true
console.log(sum instanceof Object);
// true
```

### 函数表达式

使用 `function` 关键字也可以声明匿名函数，并将函数的引用赋给某个变量。我们还可以在声明一个匿名函数后，立即执行该函数。

```js
var foo = function () {
  var name = 'CodePlayer';
  console.log(name);
};

foo();
// CodePlayer
```

在匿名函数的定义代码外面必须加小括号，表示强迫计算并返回计算结果（否则 JavaScript 只是解析该匿名函数，但无法获得函数引用，进而无法执行该函数）。

定义代码后面加上小括号，里面可以传入执行所需的参数（这里为 `2` 和 `3`）

```js
(function (x, y) {
  console.log(x + y);
})(2, 3);
// 5
```

上述匿名函数立即执行的代码，还可以如下书写（请注意小括号的位置和匹配）：

```js
(function (x, y) {
  console.log(x + y);
})(2, 3);
// 5
```

### 全局作用域

如下代码块中 `f()` 函数返回的 `function e()` 是闭包。

```js
const n = 1;

function f() {
  const n = 2;
  function e() {
    return n;
  }
  return e;
}

console.log(f()());
// 2
```

如下代码中 `f()` 函数返回的 `function e()` 是全局作用域函数。

```js
const n = 1;

function f() {
  const n = 2;
  const e = new Function('return n;');
  return e;
}

console.log(f()());
// 1
```
