---
nav:
  title: 基本语法
  order: 1
group:
  title: 语句和声明
  order: 7
title: while 语句
order: 21
---

# while 语句

**while 语句**可以在某个条件表达式为真的前提下，循环执行指定的一段代码，直到那个表达式不为 `true` 时结束循环。

## 语法

```js
while (expression) statement;
```

### 参数

| 参数         | 描述                                                                                                                              |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `expression` | 条件表达式，在每次循环前被求值。如果求值为 `true`，`statement`就会被执行。如果求值为 `false`，则跳出 `while` 循环执行后面的语句。 |
| `statement`  | 只要条件表达式求值为 `true`，该语句就会一直被执行。要在循环中执行多条语句，可以使用块语句（`{ ... }`）包住多条语句。              |

注意：使用 `break` 语句在 `expression` 计算结果为真之前停止循环。

## 示例

### 代码示例

```js
var i = 0;
while (i < 10) {
  i += 2;
}
```

```js
var cars = ['BMW', 'Volvo', 'Saab', 'Ford'];
var text = '';
var i = 0;
while (i < cars.length) {
  text += cars[i] + '<br>';
  i++;
}
```
