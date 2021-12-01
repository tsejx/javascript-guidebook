---
nav:
  title: 内置对象
  order: 2
group:
  title: String
  path: /text-processing/string/
  order: 9
title: String.prototype.slice
order: 29
---

# String.prototype.slice()

`slice()` 方法提取字符串的某部分，并返回一个新的字符串。

## 语法

```js
str.slice( startIndex [, endIndex] )
```

| 参数         | 说明                                                                       | 类型   |
| ------------ | -------------------------------------------------------------------------- | ------ |
| `startIndex` | 指向字符串指定部分的开头的索引。                                           | number |
| `endIndex`   | 可选，指向字符串指定部分的结尾的索引（不包括该索引），默认到字符串的结尾。 | number |

返回一个从原字符串中提取出来的新字符串

## 描述

`slice()` 函数一直从索引 `startIndex` 复制到 `endIndex` 所指示的字符，但是不包括 `endIndex` 索引上的字符。

- 如果 `startIndex` 为负，则将其视为 `str.length + startIndex`。
- 如果省略 `endIndex`，则将一直提取到字符串的结尾。
- 如果 `endIndex` 为负，则将其视为 `str.length + endIndex`。
- 如果 `endIndex` 小于等于 `startIndex`，则不会复制任何字符，返回空字符串。

## 示例

### 代码示例

```js
var str = 'abcdefghij';

// 开始索引省略即从 0 开始提取，结束索引省略即提取到字符串末尾
str.slice(); // 'abcdefghij'

// 开始索引为 0，结束索引省略即提取到字符串末尾
str.slice(0);
// 'abcdefghij'

// 开始索引为 0，结束索引为2
str.slice(0, 2);
// 'ab'

// 开始索引为 -3 即负数，即为 -3+10=7，结束索引省略即提取到字符串末尾
str.slice(-3);
// 'hij'

// 开始索引为 0，结束索引为 -3 即 -3+10=7
str.slice(0, -3);
// 'abcdef'

// 开始索引为 -3 即 -3+10=7，结束索引为 -1+10=9
str.slice(-3, -1);
```
