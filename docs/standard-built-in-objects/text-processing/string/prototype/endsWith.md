---
nav:
  title: 内置对象
  order: 2
group:
  title: String
  path: /text-processing/string/
  order: 9
title: String.prototype.endsWith
order: 14
---

# String.prototype.endsWith()

`endsWith()` 用来判断当前字符串是否是以另外一个给定的子字符串 `结尾` 的，根据判断结果返回 `true` 或 `false`。

## 语法

语法：

```js
str.endsWith( searchString [, endPosition] )
```

类型声明：

```ts
interface String {
  endsWith(seachString: string, endPosition?: number): boolean;
}
```

参数说明：

| 参数         | 说明              | 类型   |
| :----------- | :---------------- | :----- |
| searchString | 要搜索的子字符串  | string |
| endPosition  | 作为 `str` 的长度 | number |

这个方法帮助你确定一个字符串是否在另一个字符串的末尾。这个方法是大小写敏感的。

## 方法说明

`concat` 方法将一个或多个字符串与原字符串连接合并，形成一个新的字符串并返回。 `concat` 方法并不影响原字符串。

## 代码示例

```js
const str = 'Hello world!';

console.log(str.endsWith('world!'));
// true

console.log(str.endsWith('abc'));
// false
```

## 兼容性代码

```js
if (!String.prototype.endsWith) {
  String.prototype.endsWith = function (searchString, endPosition) {
    if (endPosition === undefined || endPosition > this.length) {
      endPosition = this.length;
    }
    return this.substring(endPosition - searchString.length, endPosition) === searchString;
  };
}
```

## 参考资料

- [MDN: Array.prototype.endsWith](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith)
- [TypeScript: lib.es2015.core.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es2015.core.d.ts)
