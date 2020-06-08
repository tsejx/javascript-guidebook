---
nav:
  title: 内置对象
  order: 2
group:
  title: String
  path: /text-processing/string/
  order: 9
title: String.prototype.toUpperCase
order: 41
---

# String.prototype.toUpperCase()

`toUpperCase()` 函数用于**将当前字符串中的所有字母转为大写，并返回转换后的字符串**。该函数基于常规的 Unicode 大小写映射进行转换。

## 语法

```js
str.toUpperCase();
```

## 描述

`toUpperCase` 将调用该方法的字符串值转换为大写形式，并返回。`toUpperCase` 方法不影响字符串本身的值，返回的是新的字符串。

## 示例

```js
var abc = 'abc';

abc.toUpperCase();
// 'ABC'
```
