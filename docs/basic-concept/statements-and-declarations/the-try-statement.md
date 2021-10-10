---
nav:
  title: 基本语法
  order: 1
group:
  title: 语句和声明
  order: 7
title: try-catch 语句
order: 10
---

# try-catch 语句

`try...catch` 语句将能引发错误的代码放在 `try` 块中，并且对应一个响应，然后有异常被抛出。

`try...catch` 语句包含了由一个或者多个语句组成的 `try` 块, 和至少一个 `catch` 子句或者一个 `finally` 子句的其中一个，或者两个兼有。

下面是三种形式的 `try` 声明：

- `try...catch`
- `try...finally`
- `try...catch...finally`

## catch

`catch` 子句包含 `try` 块中抛出异常时要执行的语句。也就是，你想让`try` 语句中的执行操作成功，如果没成功，你想控制接下来发生的事情，这时你可以在 `catch` 语句中实现。

如果有在 `try` 块中有任何一个语句（或者从 `try` 块中调用的函数）抛出异常，控制立即转向 `catch` 子句。如果在 `try` 块中没有异常抛出，会跳过 `catch` 子句。

🌰 **示例：**

```js
try {
  console.log('1: start');

  throw 'this is a error';

  console.log('2: end');
} catch (err) {
  console.log('3:', err);
}

// 输出顺序：
// 1：start
// 3：this is a error
```

`catch` 块指定一个标识符（在上面的示例中为 `err`），该标识符保存由 `throw` 语句指定的值。`catch` 块是唯一的，因为当输入`catch` 块时，JavaScript 会创建此标识符，并将其添加到当前作用域；标识符仅在 `catch` 块执行时存在；`catch` 块执行完成后，标识符不再可用。

从结果可以得知，如果在 `try` 块中任何一个语句（或者从 `try` 块中调用的和你熟）抛出异常，控制立即转向 `catch` 子句。

## finally

`finally` 子句在 `try` 块和 `catch` 块之后执行但是在下一个 `try` 声明之前执行。

⚠️ **注意**： 无论是否有异常抛出或着是否被捕获它总是执行。

```js
function fn() {
  try {
    return 1;
  } catch (err) {
    return 2;
  } finally {
    console.log(3);
  }
}

console.log(fn());
// 输出顺序：
// 3
// 1
```

从结果来看，先执行 `finally` 再执行 `try` 里面 `return` 的值。

```js
function fn() {
  try {
    throw 'this is a error'
  } catch (err) {
    console.log(1, err)

    return 2
  } finnally {
    console.log(3)
  }
}

console.log(fn())
// 输出顺序：
// 1 this is a error
// 3
// 2
```

先执行 `return` 之前的语句，再执行 `finnally`，最后返回 `return` 的值。

> ⚠️ **注意**： 如果从 `finally` 块中返回一个值，那么这个值将会成为整个 `try-catch-finally` 的返回值，无论是否有 `return` 语句在 `try` 和 `catch` 中。这包括在 `catch` 块里抛出的异常。

## 嵌套捕获

你可以嵌套一个或者更多的`try`语句。如果内部的`try`语句没有`catch`子句，那么将会进入包裹它的`try`语句的`catch`子句。

```js
try {
  try {
    throw 'this is a error';
  } finally {
    console.log(1);
  }
} catch (err) {
  console.log(2, err);
}

// 输出顺序:
// 1
// 2 this is a error
```

在 `try` 块中嵌套 `try-catch-finnally` 语句。

```js
try {
  try {
    throw 'this is a error';
  } catch (err) {
    console.error(1, err);

    throw err;
  } finally {
    console.log(2);

    return 3;
  }
} catch (err) {
  console.error(4, err.message);
}

// 输出顺序：
// 1 this is a error
// 2
```

因为 `finally` 块里的 `return` 语句，外部的 `this is a error` 异常没有抛出。从 `catch` 块返回的值同样适用。

## 异常标识符

当 `try` 块中的抛出一个异常时， _`exception_var`_（如 `catch (err)` 中的 `err` ）用来保存被抛出声明指定的值。你可以用这个标识符来获取关于被抛出异常的信息。

这个标识符是 `catch` 子语句内部的。换言之，当进入 `catch` 子语句时标识符创建，`catch` 子语句执行完毕后，这个标识符将不再可用。
