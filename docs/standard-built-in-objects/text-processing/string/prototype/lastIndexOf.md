---
nav:
  title: 内置对象
  order: 2
group:
  title: String
  path: /text-processing/string/
  order: 9
title: String.prototype.lastIndexOf
order: 17
---

# String.prototype.lastIndexOf()

`lastIndexOf()` 函数用于查找子字符串在当前字符串中最后一次出现的起始位置。

## 语法

```js
str.lastIndexOf( searchValue [, startIndex])
```

| 参数          | 说明                                                          | 类型   |
| ------------- | ------------------------------------------------------------- | ------ |
| `searchValue` | 需要查找的子字符串。                                          | string |
| `startIndex`  | 可选，在当前字符串中查找的起始索引，默认为 `str.length - 1`。 | number |

`indexOf()` 方法的返回值为 Number 类型，返回子字符串在当前字符串中第一次查找到的起始位置（索引）。

## 描述

`lastIndexOf()` 函数将从后向前（从右往左）搜索子字符串，并返回子字符串第一次出现的位置。（由于是从后向前搜索，第一次出现的位置就是该子字符串在当前字符串中最后一次出现的位置）。

如果提供了`startIndex` 参数，则从指定的索引从后向前搜索。如果省略了 `startIndex` 参数，则从字符串的末尾开始从后向前搜索。

如果 `startIndex` 为负，则将 `startIndex`视为零。如果它比最大字符位置索引还大，则将它视为可能的最大索引（即字符串的末尾：`str.length - 1` ）。

## 示例

### 代码示例

字符串中的字符被从左向右索引。首字符的索引（index）是 0，最后一个字符的索引是 `stringName.length - 1`。

```js
'hello'.lastIndexOf('l');
//  3
'hello'.lastIndexOf('l', 2);
//  1
'hello'.lastIndexOf('k', 0);
//  -1
'hello'.lastIndexOf('x');
//  -1
```

### 区分大小写

`lastIndexOf` 方法区分大小写。例如，下面的表达式返回 -1：

```js
'Hello world!'.lastIndexOf('hello');
//  -1
```
