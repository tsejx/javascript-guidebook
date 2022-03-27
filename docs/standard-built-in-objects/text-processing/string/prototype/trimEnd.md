---
nav:
  title: 内置对象
  order: 2
group:
  title: String
  path: /text-processing/string/
  order: 9
title: String.prototype.trimEnd
order: 43
---

# String.prototype.trimEnd()

⭐️ `ES2019(ES10)新特性`

`trimEnd()` 从字符串的末端移除空白字符，`trimRight` 是这个方法的别名。

## 语法

语法：

```js
str.trimEnd();
```

类型声明：

```ts
interface String {
  trimEnd(): string;
}
```

返回值：

`trimEnd()` 方法并不影响原字符串本身，它返回的是一个新的字符串。

## 代码示例

```js
var foo = '   foo   ';

console.log(foo.length);
// 9

foo = foo.trimEnd();

console.log(foo.length);
// 6

console.log(foo);
// 'foo   '
```

## 参考资料

- [MDN: Array.prototype.trimEnd](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/trimEnd)
- [TypeScript: lib.es2019.string.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es2019.string.d.ts)
