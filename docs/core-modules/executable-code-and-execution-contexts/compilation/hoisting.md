---
nav:
  title: 核心模块
  order: 3
group:
  title: 编译阶段
  order: 2
title: 声明提升
order: 5
---

# 声明提升

JavaScript 程序的运行阶段分为 **预编译阶段** 和 **执行阶段**。

在预编译阶段，JavaScript 引擎会做一件事情，那就是读取 `变量的定义` 并 `确定其作用域` 即生效范围。

- **变量定义**
  - 使用 `var` 或 `let` 关键字定义的变量，在未赋值的情况下，该变量的值是 `undefined`
  - 使用 `const` 关键字定义变量却不赋值，将会抛出错误
- **变量作用域**
  - 全局变量的作用域遍布全局
  - 局部变量的作用域仅在于函数内部及其嵌套函数的作用域
  - 函数内部的同名变量或参数优先级高于全局同名变量

在 JavaScript 中，如果变量或函数没有声明就被使用，会引致错误的。

```js
console.log(a);
// Uncaught ReferenceError: a is not defined
```

**声明提升** 包括 **变量声明提升** 和 **函数声明提升**：

- **变量声明提升**：通过 `var`、`let` 和 `const` 声明的变量在代码执行之前被 JavaScript 引擎提升到当前作用域的顶部
- **函数声明提升**：通过函数声明的方式（非函数表达式）声明的函数在代码执行之前被 JavaScript 引擎提升了当前作用域的顶部，而且 <strong style="color:red;">函数声明提升优先于变量声明提升</strong>

JavaScript 的代码在生成前，会先对代码进行编译，编译的一部分工作就是找到所有的声明，然后建立作用域将其关联起来，因此，在 **当前作用域内** 包括变量和函数在内的所有声明都会在任何代码被执行前首先被处理。

注意这里是 **声明** 会被提前处理，**赋值** 并没有， 定义声明是在编译阶段进行的，而赋值是在执行阶段进行的 。也就是说声明提升了，赋值还留着原地，等待执行。

## 变量声明提升

下面展示了标准的变量声明提升。

```js
console.log(a);
var a = 2;
console.log(a);
```

等价于：

```js
var a;
// 变量声明 默认赋值 undefined

comsole.log(a);
// 输出变量a undefined

a = 2;
// 给a赋值2

console.log(a);
// 输出变量 a 为 2
```

这里就用到了我们上面的结论声明提升了，赋值还留着原地。

## 函数声明提升

函数的两种创建方式：

- 函数声明
- 函数表达式

🌰 **代码示例：函数声明**

```js
foo();
// 输出 'bar'

function foo() {
  console.log('bar');
}
```

🌰 **代码示例：函数表达式**

```js
foo();
// 报错：foo is not a function

var foo = function () {
  console.log('bar');
};
```

解析：同样地先执行函数，后创建函数，结果却是不一样。原因在于，通过函数声明的方式，该 **函数声明**（包括定义）会被提升至作用域的顶部，而表达式的创建方式则只提升了变量 `foo` 至作用域的顶部，此时的 `foo` 其值为`undefined`，调用 `foo` 自然报错：`foo` 不是一个方法。

再来看一个示例：

```js
var foo = function () {
  console.log('1');
};

function foo() {
  console.log('2');
}

foo();
// '1'
```

预编译阶段进行变量声明提升和函数声明提升后，上述代码执行效果等同于：

```js
// 变量声明提升
const foo;

// 函数声明提升
function foo(){
  console.log('2');
}

// 变量赋值保持原位执行，foo 函数被覆盖
foo = function(){
  console.log('1');
};

foo();
// '1'
```

总结：

- 函数声明提升，会将函数的声明和定义全都提升至作用域顶部
- 变量声明提升，只提升声明部分（未赋值状态），赋值部分保持原位置不动

## 函数覆盖

函数声明和变量声明都会被提升。但是，**函数声明会覆盖变量声明**。

🌰 **代码示例**：

```js
var a;

function a() {}

console.log(a);
// 'function a(){}'
```

但是，如果变量存在赋值操作，则最终的值为变量的值。

```js
var a = 1;
function a() {}
console.log(a);
// 'function a(){}'

var a;
function a() {}
console.log(a);
// 'function a(){}'

a = 1;
console.log(a);
// 1
```

**变量的重复声明是无用的**，但**函数的重复声明会覆盖前面的声明**（无论是变量还是函数声明）。

### 重复声明无效

```js
var a = 1;
var a;
console.log(a);
```

输出结果为 1，以上代码等同于：

```js
// 此时 a 的默认值为 undefined
var a;

a = 1;

console.log(a);
// 1
```

### 函数声明优先

由于函数声明提升优先于变量声明提升，所以变量的声明无效。

```js
var a;

function a() {
  console.log(1);
}

a();
// 1
```

### 函数声明覆盖

后面的函数声明会覆盖前面的函数声明。

```js
a();
// 2

function a() {
  console.log(1);
}

function a() {
  console.log(2);
}
```

所以，应该避免在同一作用域中重复声明。
