---
nav:
  title: 内置对象
  order: 2
group:
  title: String
  path: /text-processing/string/
  order: 9
title: String.prototype.includes
order: 15
---

# String.prototype.includes()

`includes()` 方法用于判断一个字符串是否包含在另一个字符串中，根据情况返回 `true` 或 `false`。

## 语法

```js
str.includes( searchString [, startIndex] )
```

| 参数           | 说明                                                           | 类型   |
| -------------- | -------------------------------------------------------------- | ------ |
| `searchString` | 要在字符串中搜索的字符串                                       | string |
| `startIndex`   | 从当前字符串指定索引位置开发搜索子字符串，默认为 0，包含该索引 | number |

这个方法可以帮你判断一个字符串是否包含另外一个字符串。

这个方法搜索匹配的字符串是区分大小写的。

## 示例

```js
var str = 'To be, or not to be, that is the question.';

console.log(str.includes('To be'));
// true

console.log(str.includes('question'));
// true

console.log(str.includes('nonexistent'));
// false

console.log(str.includes('To be', 1));
// false

console.log(str.includes('TO BE'));
// false
```

## Polyfill

```js
if (!String.prototype.includes) {
  String.prototype.includes = function(searchString, startIndex) {
    'use strict';

    if (typeof startIndex !== 'number') {
      startIndex = 0;
    }

    if (startIndex + searchString.length > this.length) {
      return false;
    } else {
      return this.indexOf(searchString, startIndex) !== -1;
    }
  };
}
```
