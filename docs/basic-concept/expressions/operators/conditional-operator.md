---
nav:
  title: 基本语法
  order: 1
group:
  title: 运算符
  order: 5
title: 条件运算符
order: 14
---

# 条件运算符

**条件运算符（Conditional Operator）**是 JavaScript 中唯一的一个**三元运算符**（三个操作数），有时直接称做三元运算符。

```js
variable = boolean_expression ? true_value : false_value;
```

本质上，这就是基于对 `boolean_expression` 求值的结果，决定给变量 `variable` 赋什么值。如果求值结果是 `true` ，则给变量 `variable` 赋值`true_value`；如果求值结果是 `false`，则给变量 `variable` 赋值`false_value`。

条件运算符的操作数可以是任意类型，第一个操作数当成布尔值，如果它是真值 `true`，那么将计算第二个操作数，并返回其计算结果。否则，如果第一个操作数是假值 `false`，那么将计算第三个操作数，并返回其计算结果。第二个和第三个操作数总是会计算其中之一，不可能两者同时执行。

其实使用 `if` 语句也会带来同样的效果，`?:`运算符只是提供了一种简写形式。下面是一个 `?:` 的典型应用场景，判断一个变量是否有定义(并拥有一个有意义的真值)，如果有定义则使用它，如果无定义则使用一个默认值:

```js
greeting = 'hello ' + (username ? username : 'there');
```

这和下面使用 `if` 语句的代码是等价的，但显然上面的代码更加简洁:

```js
greeting = 'hello ';
if (username) greeting += username;
else greeting += 'there';
```

条件运算符（三元条件表达式）与 `if...else` 语句具有同样表达效果，但是两者有一个重大差别。

| 项          | 类型   | 返回值 |
| :---------- | :----- | :----- |
| `if...else` | 语句   | 无     |
| 条件运算符  | 表达式 | 有     |

因此，在需要返回值的场合，只能使用条件运算符（三元条件表达式），而不能使用 `if...else`。

```js
console.log(true ? 'T' : 'F');
// 'T'
```

上面代码中，`console.log()`方法的参数必须是一个表达式，这时就只能使用三元条件表达式。
