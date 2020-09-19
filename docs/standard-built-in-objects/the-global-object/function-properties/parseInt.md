---
nav:
  title: 内置对象
  order: 2
group:
  title: 全局对象 - 函数属性
  order: 3
title: parseInt
order: 5
---

# parseInt

`parseInt()` 函数用于 **将字符串转换为整数并返回**。该函数可以将字符串视作指定的进制形式表示。

该函数属于 `Global` 对象，所有主流浏览器均支持该函数。

## 语法

```js
parseInt( numString [, radix ] )
```

<br />

| 参数        | 类型          | 说明                     |
| :----------- | :------------- | :------------------------ |
| `numString` | `String` 类型 | 需要转换为整数的字符串 |
| `radix`     | `Number` 类型 | 可选，指定的进制基数（介于 `[2, 36]` 之间的数值。）   |

例如：参数 `radix` 为 2，则将 `numString` 视作二进制；参数 `radix` 为 8，则视作八进制；参数 `radix` 为 16，则视作十六进制。

如果没有提供 `radix` 参数，则 `parseInt()` 函数将会根据参数 `numString` 的前缀来决定转换的进制基数。如果 `numString` 的前缀是 `0x`，则转换为十六进制；如果前缀是 `0`，则转换为八进制；其他情况均转换为十进制。

- `parseInt()` 函数的返回值为 Number 类型，**返回转换后的整数**。
  - 如果指定的字符串中包含非数字字符，只要字符串开头的一部分符合整数的转换规则，则 `parseInt()` 函数会将这一部分字符串转化为整数（从字符串开头，直到遇到非数字字符为止）。
  - 如果字符串以非数字字符开头，则返回 `NaN`。

## 示例

- 正常使用 `parseInt()`，以下均返回 15

```js
// Binary
parseInt('1111', 2);

// Octal
parseInt('17', 8);
parseInt(021, 8);

// Decimal
parseInt('015', 10);
parseInt(15.99, 10);
parseInt('15,123', 10);
parseInt('15 * 3', 10);
parseInt('15e2', 10);
parseInt('15px', 10);

parseInt('12', 13);

// Hexadecimal
parseInt('0xF', 16);
parseInt('F', 16);
parseInt('FXX123', 16);
```

- 以下均返回 `NaN`

```js
parseInt('Hello', 8);
// not a number

parseInt('546', 2);
// except 0 & 1,other number are not valid binary numbers
```
