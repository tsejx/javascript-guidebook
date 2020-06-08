---
nav:
  title: 内置对象
  order: 2
group:
  title: String
  path: /text-processing/string/
  order: 9
title: String.prototype.toLowerCase
order: 40
---

# String.prototype.toLowerCase()

`toLowerCase()` 函数用于**将当前字符串的所有字母转为小写，并返回转换后的字符串**。该函数基于常规的 Unicode 大小写映射进行转换。

## 语法

```js
str.toLowerCase();
```

## 描述

`toLowerCase` 将调用该方法的字符串值转换为小写形式，并返回。`toLowerCase()` 方法不影响字符串本身的值，返回的是新的字符串。

## 示例

```js
var abc = 'ABC';

abc.toLowerCase();
// 'abc'
```
