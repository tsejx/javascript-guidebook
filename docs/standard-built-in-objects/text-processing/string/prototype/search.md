---
nav:
  title: 内置对象
  order: 2
group:
  title: String
  path: /text-processing/string/
  order: 9
title: String.prototype.search
order: 28
---

# String.prototype.search()

`search()` 函数用于使用指定的正则表达式查找指定子字符串在当前字符串中第一次出现的位置。

## 语法

```js
str.search(regexp);
```

| 参数     | 说明                                                                                   | 类型   |
| -------- | -------------------------------------------------------------------------------------- | ------ |
| `regexp` | 包含正则表达式模式的 `RegExp` 对象的实例。也可以是包含正则表达式模式的变量名或字符串。 | RegExp |

如果参数 `regexp` 不是正则表达式对象（RegExp），而是字符串类型，则 `search()` 先将该字符串传递给 RegExp 的构造函数，将其转换为一个 RegExp 对象。

- 如果匹配成功，则 `search()` 返回正则表达式在字符串中首次匹配项的**索引**。
- 如果没有查找到任何匹配，则返回 -1。

## 描述

当你想要知道字符串中是否存在某个模式（pattern）时可使用 `search`，类似于正则表达式的 `test` 方法。当要了解更多匹配信息时，可使用 `match`（会更慢），该方法类似于正则表达式的 `exec` 方法。

## 示例

### 代码示例

```js
var str = 'Code123Player34Code456';

// 查找2个连续数字的第一次出现
str.search(/\d{2}/);
// 4

// 该字符串等同于上一个正则表达式
str.search('\\d{2}');
// 4

// 查找不到匹配返回-1
str.search(/James/);
// -1

// 查找 "player"（带标志i，不区分大小写）
str.search(/player/i);
// 7
```
