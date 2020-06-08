---
nav:
  title: 内置对象
  order: 2
group:
  title: String
  path: /text-processing/string/
  order: 9
title: String.prototype.trimStart
order: 44
---

# String.prototype.trimStart()

`trimStart()` 从字符串开头删除空格， `trimLeft` 是这个方法的别名。

## 语法

```js
str.trimStart();
```

`trimStart()` 方法并不影响原字符串本身，它返回的是一个新的字符串。

## 示例

```js
var foo = '   foo   ';

console.log(foo.length);
// 9

foo = foo.trimStart();

console.log(foo.length);
// 6

console.log(foo);
// 'foo   '
```
