---
nav:
  title: 基本语法
  order: 1
group:
  title: 运算符
  order: 5
title: 字符串运算符
order: 6
---

# 字符串运算符

字符串运算符（用 `+` 加号表示）用于把两个字符串值相连接。操作值位于运算符两侧，运算返回另一个字符串，它是两个操作数串的结合。

```js
var foo = 'Hello' + ' ' + 'world!';

console.log(foo);
// 'Hello world!'
```

简写操作符 （`+=` 用加等于号表示）也可以用来拼接字符串，例如：

```js
var foo = 'Hello';

foo += ' world!';
// 相当于 myString = myString + 'bet'

console.log(foo);
// "Hello world!"
```
