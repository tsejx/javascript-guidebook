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

⭐️ `ES2019(ES10)新特性`

`trimStart()` 从字符串开头删除空格， `trimLeft` 是这个方法的别名。

## 语法

语法：

```js
str.trimStart();
```

类型声明：

```ts
interface String {
  trimEnd(): string;
}
```

返回值：

`trimStart()` 方法并不影响原字符串本身，它返回的是一个新的字符串。

## 代码示例

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

## 参考资料

- [MDN: Array.prototype.trimStart](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/trimStart)
- [TypeScript: lib.es2019.string.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es2019.string.d.ts)
