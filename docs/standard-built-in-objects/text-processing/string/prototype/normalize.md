---
nav:
  title: 内置对象
  order: 2
group:
  title: String
  path: /text-processing/string/
  order: 9
title: String.prototype.normalize
order: 22
---

# String.prototype.normalize()

`normalize()` 方法会按照指定的一种 Unicode 正规形式将当前字符串正规化。（如果该值不是字符串，则首先将其转换为一个字符串）。

## 语法

```js
str.normalize([form]);
```

| 参数   | 说明                                                                      | 类型   |
| ------ | ------------------------------------------------------------------------- | ------ |
| `form` | 可选，四种 Unicode 正规形式（Unicode Normalization Form），默认值为 `NFC` | string |

可选值：

- `NFC`：Canonical Decomposition, followed by Canonical Composition
- `NFD`：Canonical Decomposition
- `NFKC`：Compatibility Decomposition, followed by Canonical Composition
- `NFKD`：Compatibility Decomposition

返回给定字符串的 Unicode 规范化形式的字符串。

如果给 `form` 参数传入了上述四个字符串意外以外的参数，则会抛出 `RangeError` 异常。

## 示例

```js
// U+1E9B: LATIN SMALL LETTER LONG S WITH DOT ABOVE
// U+0323: COMBINING DOT BELOW
var str = '\u1E9B\u0323';

// Canonically-composed form (NFC)

// U+1E9B: LATIN SMALL LETTER LONG S WITH DOT ABOVE
// U+0323: COMBINING DOT BELOW
str.normalize('NFC'); // "\u1E9B\u0323"
str.normalize(); // same as above

// Canonically-decomposed form (NFD)

// U+017F: LATIN SMALL LETTER LONG S
// U+0323: COMBINING DOT BELOW
// U+0307: COMBINING DOT ABOVE
str.normalize('NFD'); // "\u017F\u0323\u0307"

// Compatibly-composed (NFKC)

// U+1E69: LATIN SMALL LETTER S WITH DOT BELOW AND DOT ABOVE
str.normalize('NFKC'); // "\u1E69"

// Compatibly-decomposed (NFKD)

// U+0073: LATIN SMALL LETTER S
// U+0323: COMBINING DOT BELOW
// U+0307: COMBINING DOT ABOVE
str.normalize('NFKD'); // "\u0073\u0323\u0307"
```
