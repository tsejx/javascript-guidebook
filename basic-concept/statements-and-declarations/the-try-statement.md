# try-catch 语句

**`try...catch`** 语句将能引发错误的代码放在 `try` 块中，并且对应一个响应，然后有异常被抛出。

## 语法

```javascript
try {
   try_statements
}
[catch (exception_var_1 if condition_1) { // non-standard
   catch_statements_1
}]
...
[catch (exception_var_2) {
   catch_statements_2
}]
[finally {
   finally_statements
}]
```

### 参数

| 参数                                       | 说明                                                                      |
| ------------------------------------------ | ------------------------------------------------------------------------- |
| `try_statements`                           | 需要被执行的语句                                                          |
| `catch_statements_1`, `catch_statements_2` | 如果在 `try` 块里有异常被抛出时执行的语句                                 |
| `exception_var_1`, `exception_var_2`       | 用于保存关联 `catch` 子句的异常对象的标识符                               |
| `condition_1`                              | 一个条件表达式                                                            |
| `finally_statements`                       | 在 `try` 语句块之后执行的语句块。无论是否有异常抛出或捕获这些语句都将执行 |

## 说明

### 标准说明

`try` 语句包含了由一个或者多个语句组成的 `try` 块, 和至少一个`catch` 子句或者一个 `finally` 子句的其中一个，或者两个兼有。 下面是三种形式的 `try` 声明：

- `try...catch`
- `try...finally`
- `try...catch...finally`

#### `catch` 块

`catch` 子句包含`try` 块中抛出异常时要执行的语句。也就是，你想让`try` 语句中的内容成功， 如果没成功，你想控制接下来发生的事情，这时你可以在`catch`语句中实现。 如果有在`try` 块中有任何一个语句（或者从`try`块中调用的函数）抛出异常，控制立即转向`catch`子句。如果在`try` 块中没有异常抛出，会跳过`catch`子句。

#### `finally` 块

`finally` 子句在`try` 块和`catch` 块之后执行但是在下一个`try` 声明之前执行。无论是否有异常抛出或着是否被捕获它总是执行。

#### 多层 `try` 嵌套

你可以嵌套一个或者更多的`try`语句。如果内部的`try`语句没有`catch`子句，那么将会进入包裹它的`try`语句的`catch`子句。

### catch 子句

当使用单个无条件`catch` 子句时，抛出的任何异常时都会进入到 `catch` 块。例如，当在下面的代码中发生异常时，控制转移到`catch` 子句。

```javascript
try {
  throw 'myException'; // generates an exception
} catch (e) {
  // statements to handle any exceptions
  logMyErrors(e); // pass exception object to error handler
}
```

`catch` 块指定一个标识符（在上面的示例中为 `e`），该标识符保存由 `throw` 语句指定的值。`catch` 块是唯一的，因为当输入`catch` 块时，JavaScript 会创建此标识符，并将其添加到当前作用域；标识符仅在`catch` 块执行时存在；`catch` 块执行完成后，标识符不再可用。

### 异常标识符

当 `try` 块中的抛出一个异常时， _`exception_var`_（如 `catch (e)` 中的 `e` ）用来保存被抛出声明指定的值。你可以用这个标识符来获取关于被抛出异常的信息。

这个标识符是 `catch` 子语句内部的。换言之，当进入 `catch` 子语句时标识符创建，`catch` 子语句执行完毕后，这个标识符将不再可用。

## 示例

### 嵌套 `try` 块

```javascript
try {
  try {
    throw new Error('oops');
  } finally {
    console.log('finally');
  }
} catch (ex) {
  console.log('outer', ex.message);
}

// Output:
// "finally"
// "outer" "oops"
```

### 从 `finally` 语句块返回

如果从`finally` 块中返回一个值，那么这个值将会成为整个 `try-catch-finally` 的返回值，无论是否有`return` 语句在 `try` 和 `catch` 中。这包括在 `catch` 块里抛出的异常。

```javascript
try {
  try {
    throw new Error('oops');
  } catch (ex) {
    console.error('inner', ex.message);
    throw ex;
  } finally {
    console.log('finally');
    return;
  }
} catch (ex) {
  console.error('outer', ex.message);
}

// Output:
// "inner" "oops"
// "finally"
```

因为 `finally` 块里的 `return` 语句，外部的 `“oops”` 异常没有抛出。从 `catch` 块返回的值同样适用。
