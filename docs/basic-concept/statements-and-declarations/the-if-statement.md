---
nav:
  title: 基本语法
  order: 1
group:
  title: 语句和声明
  order: 7
title: if 语句
order: 3
---

# if 语句

**条件语句用于基于不同的条件来执行不同的动作。**

在 JavaScript 中，我们可使用以下条件语句：

- _if 语句_ - 只有当指定条件为 `true` 时，使用该语句来执行代码
- _if...else 语句_ - 当条件为 `true` 时执行代码，当条件为 `false` 时执行其他代码
- _if...else if...else 语句_ - 使用该语句来选择多个代码块之一来执行
- _switch 语句_ - 使用该语句来选择多个代码块之一来执行

当一个逻辑条件为真，用 `if` 语句执行一个语句。当这个条件为假，使用可选择的 `else` 从句来执行这个语句。

## 单层条件判断

```js
if (condition) {
  statement_1;
}
[else {
  statement_2;
}] //推荐使用严格的语句块模式，语句else可选
```

<br />

| 参数            | 说明                                                                                                                                                          |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `condition`     | 为任何返回结果（若非 `boolean` 类型会被 ECMAScrpt 转换）为 `true` 或 `false` 的表达式。如果条件式为 `true`，`statement1` 会被执行；否则 `statement2` 会被执行 |
| `statement1(2)` | 为任意语句（代码块），甚至可以将另一个 `if` 语句嵌套七种                                                                                                      |

## 多层条件判断

```js
if (condition_1) {
  statement_1;
} [else if (condition_2) {
  statement_2;
}]
...
[else if (condition_n_1) {
  statement_n_1;
}] [else {
  statement_n;
}]
```

要执行多个语句，可以使用语句块 ({ ... }) 来分组这些语句。

## 示例

### 不建议在条件表达式中

不建议在条件表达式中使用赋值操作，因为在快速查阅代码时容易看成等值比较。

请勿使用以下代码：

```js
if ((x = y)) {
  // do something
}
```

如果你需要在表达式中使用赋值，通常在赋值语句前后额外添加一对括号。

```js
if ((x = y)) {
  // do something
}
```

### 假值等效值

下面这些值将被计算出 `false`：

- `false`
- `undefined`
- `null`
- `0`
- `NaN`
- `""`

当传递给条件语句时，所有其他值，包括所有对象会被计算为真。

请不要混淆原始的布尔值 `true` 和 `false` 与 `Boolean` 对象的真和假。

```js
var b = new Boolean(false);

if (b)
// this condition evaluates to true

if (b == true)
// this condition evaluates to false
```
