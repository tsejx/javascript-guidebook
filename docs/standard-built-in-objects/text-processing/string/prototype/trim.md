---
nav:
  title: 内置对象
  order: 2
group:
  title: String
  path: /text-processing/string/
  order: 9
title: String.prototype.trim
order: 42
---

# String.prototype.trim()

`trim()` 方法会从一个字符串的两端删除空白字符。在这个上下文中的空白字符是所有的空白字符（space, tab, no-break space 等）以及所有行终止符字符（如 `LF`，`CR`）。

## 语法

语法：

```js
str.trim();
```

类型声明：

```ts
interface String {
  trim(): string;
}
```

返回值：

`trim()` 方法并不影响原字符串本身，它返回的是一个新的字符串。

## 代码示例

### 基本用法

```js
var foo = '   foo  ';

foo.trim();
// 'foo'
```

另一个 `trim()` 例子，只从一边删除

```js
var bar = 'bar    ';

bar.trim();
// 'bar'
```

### 兼容性代码

```js
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}
```

## 参考资料

- [MDN: Array.prototype.trim](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/trim)
- [TypeScript: lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)
