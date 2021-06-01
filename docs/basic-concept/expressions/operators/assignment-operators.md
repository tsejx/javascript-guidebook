---
nav:
  title: 基本语法
  order: 1
group:
  title: 运算符
  order: 5
title: 赋值运算符
order: 10
---

# 赋值运算符

一个 [赋值运算符](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-assignment-operators)（assignment operator）将它右边操作数的值赋给它左边的操作数。

下列为 ECMAScript 标准规范的 Assignment Operator：

```js
* = /= %= += -= <<= >>= >>>= &= ^= |= **=
```

<br />

| 运算名称         | 简写的操作符 | 分解含义      | 符号   |
| :--------------- | :----------- | :------------ | :----- |
| 赋值             | `x = y`      | `x = y`       | `=`    |
| 加法赋值         | `x += y`     | `x = x + y`   | `+=`   |
| 减法赋值         | `x -= y`     | `x = x - y`   | `-=`   |
| 乘法赋值         | `x *= y`     | `x = x * y`   | `*=`   |
| 除法赋值         | `x /= y`     | `x = x / y`   | `/=`   |
| 求余赋值         | `x %= y`     | `x = x % y`   | `%=`   |
| 求幂赋值         | `x ** y`     | `x = x ** y`  | `**`   |
| 左移位赋值       | `x <<= y`    | `x = x << y`  | `<<=`  |
| 右移位赋值       | `x >>= y`    | `x = x >> y`  | `>>=`  |
| 无符号右移位赋值 | `x >>>= y`   | `x = x >>> y` | `>>>=` |
| 按位与赋值       | `x & y`      | `x = x & y`   | `&`    |
| 按位异赋值       | `x ^= y`     | `x = x ^ y`   | `^=`   |
| 按位或赋值       | `x \|= y`    | `x = x \| y`  | `\| y` |
