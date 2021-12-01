---
nav:
  title: 基本语法
  order: 1
group:
  title: 语句和声明
  order: 7
title: continue 语句
order: 4
---

# continue 语句

**continue 语句**用于结束当前（或标签）的循环语句的本次迭代，并继续执行循环的下一次迭代。

## 语法

```js
break [labelname];
```

### 参数

| 参数        | 描述                             |
| ----------- | -------------------------------- |
| `labelname` | 可选，与语句标签相关联的标识符。 |

### 描述

- 与 `break` 语句的区别在于， continue 并不会终止循环的迭代，而是：
  - 在 `while`循环中，在循环开始处指定的条件判断语句会重复检测，如果检测结构为 `true`，循环体会从头开始执行。
  - 在 `do/while` 循环中，程序的执行直接跳到循环结尾处，这时会重新判断循环条件，之后才会继续下一次循环。
  - 在 `for` 循环中，首先执行更新语句，然后再次执行判断语句，用以判断是否继续执行循环体。
  - 在 `for/in` 循环中，循环开始遍历下一个属性名，这个属性名赋给了指定的变量。
- `continue` 语句可以包含一个可选的标号以控制程序跳转到指定循环的下一次迭代，而非当前循环。此时要求 `continue` 语句在对应的循环内部。
- 不管 `continue` 语句带不带标签，它**只能在循环体内使用**。在其他地方使用将会报语法错误。
- `continue` 语句和 `labelname` 之间不能有换行。

## 示例

### 代码示例

在 `for` 语句中使用 `continue`

```js
var num = 0;
for (var i = 1; i < 10; i++) {
  if (i % 5 == 0) {
    continue;
  }
  num++;
}
console.log(num);
// 8
```

在 `while` 语句中使用 `continue`

```js
i = 0;
n = 0;
while (i < 5) {
  i++;
  if (i === 3) {
    continue;
  }
  n += i;
}
```
