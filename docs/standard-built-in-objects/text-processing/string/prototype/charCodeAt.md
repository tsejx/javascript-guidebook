---
nav:
  title: 内置对象
  order: 2
group:
  title: String
  path: /text-processing/string/
  order: 9
title: String.prototype.charCodeAt
order: 11
---

# String.prototype.charCodeAt()

`charCodeAt()` 方法返回 0 到 65535 之间的整数，表示给定索引处的 UTF-16 代码单元（在 Unicode 编码单元表示一个单一的 UTF-16 编码单元的情况下，UTF-16 编码单元匹配 Unicode 编码单元。但在——例如 Unicode 编码单元 > `0x10000` 的这种——不能被一个 UTF-16 编码单元单独表示的情况下，只能匹配 Unicode 代理对的第一个编码单元） 。如果你想要整个代码点的值，使用 `codePointAt()`。

## 语法

```js
str.charCodeAt(index);
```

| 参数    | 说明                                                                 | 类型   |
| ------- | -------------------------------------------------------------------- | ------ |
| `index` | 一个大于等于 0，小于字符串长度的整数。如果不是一个数值，则默认为 0。 | number |

返回值表示字符串对象指定索引处的字符的 Unicode 编码；如果索引超出范围，则返回 `NaN`。

## 说明

Unicode 编码单元（code points）的范围从 0 到 1114111（`0x10FFFF`）。开头的 128 个 Unicode 编码单元和 ASCII 字符编码一样。

⚠️ 注意，`charCodeAt` 总是返回一个小于 65536 的值。这是因为高位编码单元（higher code point）使用一对（低位编码（lower valued））代理伪字符（"surrogate" pseudo-characters）来表示，从而构成一个真正的字符。因此，为了查看或复制（reproduce）65536 及以上编码字符的完整字符，需要在获取 `charCodeAt(i)` 的值的同时获取 `charCodeAt(i+1)` 的值，或者改为获取 `codePointAt(i)` 的值。

如果指定的 `index` 小于 0 或不小于字符串的长度，则 `charCodeAt` 返回 `NaN`。

## 示例

下例介绍了不同索引情况下返回的 Unicode 值：

```js
'ABC'.charCodeAt(0);
// 65
'ABC'.charCodeAt(1);
// 66
'ABC'.charCodeAt(2);
// 67
'ABC'.charCodeAt(3);
// NaN
```
