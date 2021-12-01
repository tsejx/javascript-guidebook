---
nav:
  title: 内置对象
  order: 2
group:
  title: String
  path: /text-processing/string/
  order: 9
title: String.prototype.charAt
order: 10
---

# String.prototype.charAt()

`charAt()` 方法从一个字符串中返回指定的字符。

## 语法

```js
str.charAt(index);
```

| 参数    | 说明                                                                                  | 类型   |
| ------- | ------------------------------------------------------------------------------------- | ------ |
| `index` | 一个介于 0 和字符串长度减 1 之间的整数。 (0~length-1)。如果没有提供索引，默认值为 0。 | number |

## 说明

字符串中的字符从左向右索引：

- 第一个字符的索引值为 0
- 最后一个字符（假设该字符位于字符串 `stringName`中）的索引值为 `stringName.length - 1`
- 如果指定的 `index` 值超出了该范围，则返回一个空字符串 `''`

## 示例

```js
const javascript = 'JAVASCRIPT';

javascript.charAt();
// J
javascript.charAt(0);
// J
javascript.charAt(1);
// A
javascript.charAt(2);
// V
javascript.charAt(3);
// A
javascript.charAt(4);
// S
javascript.charAt(5);
// C
javascript.charAt(6);
// R
javascript.charAt(7);
// I
javascript.charAt(8);
// P
javascript.charAt(9);
// T
javascript.charAt(100);
// ''
```
