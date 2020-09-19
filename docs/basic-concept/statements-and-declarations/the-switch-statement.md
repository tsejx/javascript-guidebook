---
nav:
  title: 基本语法
  order: 1
group:
  title: 语句和声明
  order: 7
title: switch 语句
order: 7
---

# switch 语句

**`switch`** 语句允许一个程序求一个表达式的值并且尝试去匹配表达式的值到一个 `case` 标签。如果匹配成功，这个程序执行相关的语句。

## 语法

```js
switch (expression) {
   case value_1:
      statements_1
      [break;]
   case value_2:
      statements_2
      [break;]
   ...
   default:
      statements_def
      [break;]
}
```

工作原理：首先设置表达式 `expression`（通常是一个变量）。随后表达式的值会与结构中的每个 `case` 的值做比较。如果存在匹配，则与该 `case` 关联的代码块会被执行。请使用 `break` 来阻止代码自动地向下一个 `case` 运行。

### 参数

| 参数           | 说明                     |
| -------------- | ------------------------ |
| `expression`   | 用于比较的表达式         |
| `value_(n)`    | 与 `expression` 比较的值 |
| `statement(n)` | 执行语句                 |

### 关键词

 - `case`：表示一种情况，如果 `expression` 等于 `value` ，就执行 `statement`
 - `break`：会使代码跳出 `switch` 语句，如果没有关键词 `break`，代码执行就会继续进入下一个 `case` 。
 - `default`：说明了表达式的结果不等于任何一种情况时的操作（事实上，它相对于 else 从句）。

## 示例

```js
var myCar = 'Porsche'
switch (myCar) {
  case 'Nissan': alert("My car is Nissan");
    break;
  case 'Honda': alert("My car is Honda");
    break;
  case 'Porsche': alert("My car is Porsche");
    break;
  default: alert("I have no car");
}
```
