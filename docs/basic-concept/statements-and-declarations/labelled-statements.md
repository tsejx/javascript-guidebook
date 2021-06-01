---
nav:
  title: 基本语法
  order: 1
group:
  title: 语句和声明
  order: 7
title: label 语句
order: 8
---

# label 语句

**标记语句**可以和 `break` 或 `continue` 语句一起使用。标记就是在一条语句前面加个可以引用的标识符。

**注意**：标记的循环或块非常罕见。通常可以使用函数调用而不是循环跳转。

## 语法

```js
identifier: statement;
```

### 参数

| 参数         | 描述                                                                 |
| ------------ | -------------------------------------------------------------------- |
| `identifier` | 任何不是保留关键字的 JavaScript 标识符。                             |
| `statement`  | 语句。`break` 可用于任何标记语句，而 `continue` 可用于循环标记语句。 |

### 描述

- 可使用一个标签来唯一标记一个循环，然后使用 `break` 或 `continue` 语句来指示程序是否中断循环或继续执行。

## 示例

### 标注示例

- 用作标签的 `identifier` 必须是一个合法的 JavaScript 标识符，而不能是一个保留字。

```js
var i, j;

loop1: for (i = 0; i < 3; i++) {
  // The first for statement is labeled "loop1"

  loop2: for (j = 0; j < 3; j++) {
    // The second for statement is labeled "loop2"
    if (i == 1 && j == 1) {
      continue loop1;
    }

    console.log('i = ' + i + ', j = ' + j);
  }
}
```
