# String.prototype.charAt()

`charAt()` 方法从一个字符串中返回指定的字符。

## 语法

```javascript
str.charAt(index);
```

| 参数    | 类型          | 描述                                                                                  |
| ------- | ------------- | ------------------------------------------------------------------------------------- |
| `index` | `Number` 类型 | 一个介于 0 和字符串长度减 1 之间的整数。 (0~length-1)。如果没有提供索引，默认值为 0。 |

## 描述

字符串中的字符从左向右索引，第一个字符的索引值为 0，最后一个字符（假设该字符位于字符串 `stringName`中）的索引值为 `stringName.length - 1`。 如果指定的 `index` 值超出了该范围，则返回一个空字符串 `''`。

## 示例

```javascript
var demacia = 'DEMACIA';

demacia.charAt(); // D
demacia.charAt(0); // D
demacia.charAt(1); // E
demacia.charAt(2); // M
demacia.charAt(3); // A
demacia.charAt(4); // C
demacia.charAt(5); // I
demacia.charAt(6); // A
demacia.charAt(100); // ''
```
