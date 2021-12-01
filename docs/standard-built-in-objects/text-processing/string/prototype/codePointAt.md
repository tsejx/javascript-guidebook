---
nav:
  title: 内置对象
  order: 2
group:
  title: String
  path: /text-processing/string/
  order: 9
title: String.prototype.codePointAt
order: 12
---

# String.prototype.codePointAt()

`codePointAt()` 方法返回 一个 Unicode 编码点值的非负整数。

## 语法

```js
str.codePointAt(index);
```

| 参数    | 说明                                   | 类型   |
| ------- | -------------------------------------- | ------ |
| `index` | 这个字符串中需要转码的元素的位置索引。 | number |

返回值是在字符串中的给定索引的编码单元体现的数字，如果在索引处没找到元素则返回 `undefined`。

## 说明

如果在指定的位置没有元素则返回 `undefined` 。如果在索引处开始没有 UTF-16 代理对，将直接返回在那个索引处的编码单元。

Surrogate Pair 是 UTF-16 中用于扩展字符而使用的编码方式，是一种采用四个字节（两个 UTF-16 编码）来表示一个字符，称作代理对。

## 示例

```js
'ABC'.codePointAt(1); // 66

'\uD800\uDC00'.codePointAt(0); // 65536

'XYZ'.codePointAt(42); // undefined
```

## Polyfill

给原生不支持 ECMAScript 6 的浏览器使用 `codePointAt()` 方法的的一个字符串扩展方法。

```js
/*! http://mths.be/codepointat v0.1.0 by @mathias */
if (!String.prototype.codePointAt) {
  (function() {
    // 严格模式，needed to support `apply`/`call` with `undefined`/`null`
    'use strict';
    var codePointAt = function(position) {
      if (this == null) {
        throw TypeError();
      }
      var string = String(this);
      var size = string.length;
      // 变成整数
      var index = position ? Number(position) : 0;
      if (index != index) {
        // better `isNaN`
        index = 0;
      }
      // 边界
      if (index < 0 || index >= size) {
        return undefined;
      }
      // 第一个编码单元
      var first = string.charCodeAt(index);
      var second;
      if (
        // 检查是否开始 surrogate pair
        first >= 0xd800 &&
        // high surrogate
        first <= 0xdbff &&
        // 下一个编码单元
        size > index + 1
      ) {
        second = string.charCodeAt(index + 1);
        if (second >= 0xdc00 && second <= 0xdfff) {
          // low surrogate
          // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
          return (first - 0xd800) * 0x400 + second - 0xdc00 + 0x10000;
        }
      }
      return first;
    };

    if (Object.defineProperty) {
      Object.defineProperty(String.prototype, 'codePointAt', {
        value: codePointAt,
        configurable: true,
        writable: true,
      });
    } else {
      String.prototype.codePointAt = codePointAt;
    }
  })();
}
```
