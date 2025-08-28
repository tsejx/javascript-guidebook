---
nav:
  title: 内置对象
  order: 2
group:
  title: String
  path: /text-processing/string/
  order: 9
title: String.prototype.startsWith
order: 31
---

# String.prototype.startsWith()

`startsWith()` 方法用来判断当前字符串是否以另一个给定的子字符串开头，并根据判断结果返回 `true` 或 `false`。

## 语法

语法：

```js
str.startsWith( searchString [, position] )
```

类型声明：

```ts
interface String {
  startsWith(searchString: string, position?: number): boolean;
}
```

参数说明：

| 参数         | 说明                                         | 类型   |
| :----------- | :------------------------------------------- | :----- |
| searchString | 要搜索的子字符串                             | string |
| position     | 开始搜索 `searchString` 的开始索引，默认为 0 | number |

这个方法能够让你确定一个字符串是否以另一个字符串开头。

这个方法区分大小写。

## 代码示例

```js
const str = 'Hello world!';

console.log(str.startsWith('He'));
// true

console.log(str.startsWith('wo'));
// false

console.log(str.startsWith('wo', 6));
// true
```

## 兼容性代码

```js
if (!String.prototype.startsWith) {
  Object.defineProperty(String.prototype, 'startsWith', {
    value: function (searchString, position) {
      position = !position || position < 0 ? 0 : +position;
      return this.substring(position, position + searchString.length) === searchString;
    },
  });
}
```

## 参考资料

- [MDN: Array.prototype.startsWith](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith)
- [TypeScript: lib.es105.core.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es2015.core.d.ts)
