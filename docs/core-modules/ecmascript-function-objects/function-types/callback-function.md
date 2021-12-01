---
nav:
  title: 核心模块
  order: 3
group:
  title: 函数类型
  order: 10
title: 回调函数
order: 5
---

# 回调函数

回调函数是一段可执行的代码段，它作为一个参数传递给其他的代码，其作用是在需要的时候方便调用这段（回调函数）代码。

在 JavaScript 中函数也是对象的一种，同样对象可以作为参数传递给函数，因此函数也可以作为参数传递给另外一个函数，这个作为参数的函数就是回调函数。

**回调函数**

```js
function add(num1, num2, callback) {
  const sum = num1 + num2;

  // 数值相加后，将相加和作为参数传入回调函数
  callback(sum);
}

function print(num) {
  console.log(num);
}

add(1, 2, print);
// 3
```

**匿名回调函数**

```js
function add(num1, num2, callback) {
  const sum = num1 + num2;

  // 数值相加后，将相加和作为参数传入回调函数
  callback(sum);
}

add(1, 2, function(sum) {
  console.log(sum);
  // 3
});
```

## 函数特点

### 不会立即执行

回调函数作为参数传递给一个函数的时候，传递的只是函数的定义并不会立即执行。和普通的函数一样，回调函数在函调用函数数中也要通过 `()` 括号运算符调用才会执行。

### 是个闭包

回调函数是一个闭包，也就是说它能访问到其外层定义的变量。

### 执行前类型判断

```js
function add(num1, num2, callback) {
  var sum = num1 + num2;
  if (typeof callback === 'function') {
    callback(sum);
  }
}
```

### `this` 的使用

注意在回调函数调用时 `this` 的执行上下文并不是回调函数定义时的那个上下文，而是调用它的函数所在的上下文。

```js
var obj = {
  sum: 0,
  add: function(num1, num2) {
    this.sum = num1 + num2;
  },
};

function add(num1, num2, callback) {
  callback(num1, num2);
}

add(1, 2, obj.add);

console.log(obj.sum);
// 0

console.log(window.sum);
// 3
```

上述代码调用回调函数的时候是在全局环境下，因此 `this` 指向的是 `window`，所以 `sum` 的值是赋值给`windows`的。

关于 `this` 执行上下文的问题可以通过 `apply` 方法解决。

```js
const obj = {
  sum: 0,
  add: function(num1, num2) {
    this.sum = num1 + num2;
  },
};

function add(num1, num2, callbackObj, callback) {
  callback.apply(callbackObj, [num1, num2]);
}

add(1, 2, obj, obj.add);

console.log(obj.sum);
// 3

console.log(window.sum);
// undefined
```

### 允许传递多个回调函数

```js
// 一个函数中可以传递多个回调函数，典型的例子如 jQuery

function beforeCallback() {
  // Do stuff before send
}

function successCallback() {
  // Do stuff if success message received
}

function completeCallback() {
  // Do stuff upon completion
}

function errorCallback() {
  // Do stuff if error received
}

$.ajax({
  url: 'https://example.com/api/collect',
  before: beforeCallback,
  success: successCallback,
  complete: completeCallback,
  error: errorCallback,
});
```

### 函数嵌套

一个回调函数中可以嵌入另一个回调函数，对于这种情况出现多层嵌套时，代码会难以阅读和维护，这个时候可以采用命名回调函数的方式调用，或者采用模块化管理函数，也可以用 Promise 模式编程。

## 优点和使用场景

**优点**

- DRY，避免重复代码
- 可以将通用的逻辑抽象
- 加强代码可维护性
- 加强代码可读性
- 分离专职的函数

**使用场景**

- 异步编程
- 事件监听、处理
- `setTimeout`、`setInterval` 方法
- 通用功能，简化逻辑
