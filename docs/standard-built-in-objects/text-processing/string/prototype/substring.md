---
nav:
  title: 内置对象
  order: 2
group:
  title: String
  path: /text-processing/string/
  order: 9
title: String.prototype.substring
order: 33
---

# String.prototype.substring()

`substring()` 函数用于返回当前字符串中一个连续的片段。

## 语法

```js
str.substring(startIndex [, indexEnd])
```

| 参数         | 描述                                                   | 类型   |
| ------------ | ------------------------------------------------------ | ------ |
| `startIndex` | 指向字符串指定部分的开头的索引。                       | number |
| `endIndex`   | 可选，指向字符串指定部分的结尾的索引（不包括该索引）。 | number |

### 描述

`substring()` 函数的返回值为 String 类型，返回当前字符串索引 `[startIndex, endIndex)` 之间的连续字符所组成的字符串（不包括 `endIndex`）。

`substring()` 函数的参数顺序是不固定的，该函数将自动使用 `startIndex` 和 `endIndex` 中较小的值作为起始索引，较大的值作为结尾索引。

- 如果省略 `indexEnd`，`substring()` 提取字符一直到字符串末尾。
- 如果任一参数为负数或 `NaN`，则将其置为 0。
- 如果任一参数大于 `str.length`，则被当作 `str.length`。
- 如果 `startIndex` 等于 `endIndex`，则不会复制任何字符，返回空字符串。
- 如果 `startIndex` 大于 `endIndex`，则 `substring()` 的执行效果就像两个参数调换了一样。例如，`str.substring(1, 0)` 等价于 `str.substring(0, 1)`。

## 示例

### 代码示例

下例使用 `substring` 输出字符串 "Mozilla" 中的字符：

```js
var str = 'abcdefghij';

// 开始索引为0，结束索引省略即复制字符到字符串末尾
str.substring(0);
// 'abcdefghij'

// 开始索引为0，结束索引为2
str.substring(0, 2);
// 'ab'

// 开始索引为负数即为0，结束索引为2
str.substring(-2, 2);
// 'ab'

// 开始索引为NaN即为0，结束索引为2
str.substring('h', 2);
// 'ab'

// 开始索引为11大于字符串长度，不复制任何字符，返回空字符串
str.substring(11);
// ''

// 开始索引为0，结束索引为11大于字符串长度，复制字符到字符末尾
str.substring(0, 11);
// 'abcdefghij'

// 开始索引与结束索引相等，返回空字符串
str.substring(0, 0);
// ''

// 开始索引大于结束索引，两者数值调换即等价于str.substring(0， 1)
str.substring(1, 0);
// 'a'

// 开始索引大于结束索引，两者数值调换即等价于str.substring(0, 5)
str.substring(5, 'h');
// 'abcde'
```

### 运用 `length` 属性来使用 `substring()`

下面一个例子运用了 `String.length` 属性去获取指定字符串的倒数元素。显然这个办法更容易记住，因为你不再像上面那个例子那样去记住起始位置和最终位置。

```js
// Displays 'ghij' the last 4 characters
var word = 'abcdefghij';
var word4 = word.substring(word.length - 4);

console.log(word4);
// 'ghij'

// Displays 'fghij' the last 5 characters
var word = 'abcdefghij';
var word5 = word.substring(word.length - 5);

console.log(word5);
// 'fghij'
```

### 删除字符末尾子字符

```js
const removeTail = function (str) {
  if (str === null || str.length === 0) return str;
  const len = str.length;

  return str.substring(0, len - 1);
};
```
