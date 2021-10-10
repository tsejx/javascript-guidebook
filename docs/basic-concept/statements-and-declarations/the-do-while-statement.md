---
nav:
  title: 基本语法
  order: 1
group:
  title: 语句和声明
  order: 7
title: do...while 语句
order: 20
---

# do...while 语句

**do...while 语句**创建一个执行指定语句的循环，直到 `condition` 值为 false。在执行 `statement` 后检测 `condition`，所以指定的 `statement` 至少执行一次。

## 语法

```js
do {
  statement;
} while (expression);
```

### 参数

| 参数         | 描述                                                                                                                                            |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `statement`  | 执行至少一次的语句，并在每次 `condition` 值为真时重新执行。想执行多行语句，可使用 `block`语句（`{ ... }`）包裹这些语句。                        |
| `expression` | 循环中每次都会计算的表达式。如果 `condition` 值为 `true`，`statement` 会再次执行。当 `condition` 值为 `false`，则跳到 `do...while` 之后的语句。 |

### 描述

- 像 `do-while` 这种后测试循环语句最常用于循环体中的代码至少要被执行一次的情形。
- `do/while` 循环和普通 `while` 循环之间有两点语法方面的不同之处。
  - `do` 循环要求必须使用关键字 `do` 来标识循环的开始，用 `while` 来标识循环的结尾并进入循环条件判断。
  - 和 `while` 循环不同，`do` 循环是用分号结尾的。
  - 如果 `while` 的循环体使用花括号括起来的话，则 `while` 循环也不用使用分号做结尾。

## 示例

### 代码示例

```js
var i = 0;
do {
  i += 2;
} while (i < 10);

console.log(i); // 10
```
