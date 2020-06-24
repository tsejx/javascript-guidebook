---
nav:
  title: 核心模块
  order: 3
group:
  title: 函数内部
  order: 9
title: 函数原型对象属性
order: 3
---

# 函数原型对象属性

## `length` 属性

在函数中，`arguments` 对象的 `length` 属性表示实参个数，而函数的 `length` 属性则表示函数希望接受**形参个数**。

```js
function sayName(name) {
  // do something
}

function sum(num1, num2) {
  // do something
}

function sayHi() {
  // do something
}

console.log(sayName.length); // Output: 1

console.log(sum.length); // Output: 2

console.log(sayHi.length); // Output: 0
```

## `name` 属性

函数定义了一个非标准的 `name` 属性，通过这个属性可以访问到给定函数指定的名字，这个属性的值永远等于跟在 `function` 关键字后面的**标识符**，匿名函数的 `name` 属性为空。

```js
// IE11-浏览器无效，均输出undefined
// chrome在处理匿名函数的name属性时有问题，会显示函数表达式的名字
function a() {}

console.log(a.name); // Output: 'fn'

const b = function() {};

console.log(b.name); // Output: '' 在chrome浏览器中会显示'fn'

const c = function abc() {};

console.log(c.name); // Output: 'abc'
```

- ES6 列入标准

ES6 对这个属性的行为做出了一些修改。如果将一个匿名函数赋值给一个变量，ES5 的 `name` 属性，会返回空字符串，而 ES6 的 `name` 属性会返回实际的函数名。

```js
const fun = function() {};

console.log(fun.name); // ES5: ''

console.log(fun.name); // ES6: 'fun'
```

如果将一个具名函数赋值给一个变量，则 ES5 和 ES6 的 `name` 属性都返回这个具名函数原本的名字。

```js
const bar = function baz() {};

console.log(bar.name); // ES5: "baz"

console.log(bar.name); // ES6: "baz"
```

- 构造函数

Function 构造函数返回的函数实例，`name` 属性的值为 `'anonymous'`。

```js
new Function().name; // 'anonymous'
```

`bind` 返回的函数，`name` 属性值会加上 `'bound '` 前缀。

```js
function foo() {}

console
  .log(foo.bind({}).name)
  (
    // 'bound foo'

    function() {}
  )
  .bind({}).name; // 'bound '
```
