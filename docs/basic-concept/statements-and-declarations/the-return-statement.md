---
nav:
  title: 基本语法
  order: 1
group:
  title: 语句和声明
  order: 7
title: return 语句
order: 6
---

# return 语句

函数中的 `return` 语句用来返回函数调用后的返回值

## 语法

```js
return expression;
```

## 说明

### 返回语句特点

- `return` 语句只能出现在**函数体**内，如果不是会报语法错误

```js
return 1;	// SyntaxError: Illegal return statement
```

- 由于 JavaScript 可以自动插入分号，因此在 `return` 关键字和它后面的表达式之间不能有换行。

```js
var test = function fn(){
    return
    2;
};
console.log(test()); // undefined
```

- 一个函数中可以有多个 `return` 语句。

```js
function diff(iNum1, iNum2) {
  if (iNum1 > iNum2) {
    return iNum1 - iNum2;
  } else {
    return iNum2 - iNum1;
  }
}
```

### 函数进程

- 如果没有 `return` 语句，则函数调用仅仅依次执行函数体内的每一条语句直到函数结束，最后返回调用程序。这种情况下，调用表达式的结果是 `undefined`。

```js
var test = function fn(){}
console.log(test()); // undefined
```

- 当执行到 `return` 语句时，函数终止执行，并返回 expression 的值给调用程序

```js
var test = function fn(){
    return 2;
};
console.log(test()); // 2
```

- `return` 语句经常作为函数内的最后一条语句出现，这是因为 `return` 语句可用来使函数提前返回。当 `return` 被执行时，函数立即返回而不再执行余下的语句

```js
//并没有弹出1
var test = function fn(){
    return;
    alert(1);
};
console.log(test());//undefined
```

- 并不是函数中 `return` 语句后的所有语句都不执行，`finally` 语句是例外，`return` 语句不会阻止 `finally` 子句的执行。

```js
function testFinnally(){
    try{
        return 2;
    }catch(error){
        return 1;
    }finally{
        return 0;
    }
}
testFinnally(); // 0
```

### 返回值

- 如果函数调用时在前面加上了 `new` 前缀，且返回值不是一个对象，则返回 `this`（该新对象）

```js
function fn(){
    this.a = 2;
    return 1;
}
var test = new fn();
console.log(test);	// {a:2}
console.log(test.constructor);	// fn(){this.a = 2;return 1;}
```

- 如果返回值是一个对象，则返回该对象。

```js
function fn(){
    this.a = 2;
    return {a:1};
}
var test = new fn();
console.log(test);//{a:1}
console.log(test.constructor);//Object() { [native code] }
```

- `return` 语句可以单独使用而不必带有表达式 `expression`，这样的话也会向调用程序返回 `undefined`。

```js
var test = function fn(){
    return;
};
console.log(test()); // undefined
```

## 总结

- `return` 语句只能出现在函数体内
- `return` 关键词和表达式之间不可换行
- 一个函数中可以有多个 `return` 语句
- 当执行 `return` 语句，函数终止执行，并返回表达式
- `return` 语句不会阻止 `finally` 子句的执行
- 调用构造函数，且返回值不是一个对象，则返回该新对象
- 如果返回值是一个对象，则返回该对象
- `return` 语句可单独使用而不必带有表达式，返回 `undefined`