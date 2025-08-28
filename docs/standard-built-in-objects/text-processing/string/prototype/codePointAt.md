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

语法：

```js
str.codePointAt(pos);
```

类型声明：

```ts
interface String {
  codePointAt(pos: number): number | undefined;
}
```

参数说明：

| 参数 | 说明                                   | 类型   |
| :--- | :------------------------------------- | :----- |
| pos  | 这个字符串中需要转码的元素的位置索引。 | number |

返回值：

返回值是在字符串中的给定索引的编码单元体现的数字，如果在索引处没找到元素则返回 `undefined`。

## 方法说明

如果在指定的位置没有元素则返回 `undefined` 。如果在索引处开始没有 UTF-16 代理对，将直接返回在那个索引处的编码单元。

Surrogate Pair 是 UTF-16 中用于扩展字符而使用的编码方式，是一种采用四个字节（两个 UTF-16 编码）来表示一个字符，称作代理对。

## 代码示例

```js
'ABC'.codePointAt(1);
// 66

'\uD800\uDC00'.codePointAt(0);
// 65536

'XYZ'.codePointAt(42);
// undefined
```

## 兼容性代码

给原生不支持 ECMAScript 6 的浏览器使用 `codePointAt()` 方法的的一个字符串扩展方法。

```js
/*! http://mths.be/codepointat v0.1.0 by @mathias */
if (!String.prototype.codePointAt) {
  (function () {
    // 严格模式，needed to support `apply`/`call` with `undefined`/`null`
    'use strict';
    var codePointAt = function (position) {
      if (this == null) {
        throw TypeError();
      }
      var string = String(this);
      var size = string.length;
      // 变成整数
      var pos = position ? Number(position) : 0;
      if (pos != pos) {
        // better `isNaN`
        pos = 0;
      }
      // 边界
      if (pos < 0 || pos >= size) {
        return undefined;
      }
      // 第一个编码单元
      var first = string.charCodeAt(pos);
      var second;
      if (
        // 检查是否开始 surrogate pair
        first >= 0xd800 &&
        // high surrogate
        first <= 0xdbff &&
        // 下一个编码单元
        size > pos + 1
      ) {
        second = string.charCodeAt(pos + 1);
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

## 参考资料

- [MDN: Array.prototype.codePointAt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt)
- [TypeScript: lib.es2015.core.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es2015.core.d.ts)
