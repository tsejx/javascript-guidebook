---
nav:
  title: 内置对象
  order: 2
group:
  title: String
  path: /text-processing/string/
  order: 9
title: String.prototype.substr
order: 32
---

# String.prototype.substr()

`substr()` 函数用于返回当前字符串中一个连续的片段。

## 语法

语法：

```js
str.substr( from [, length] )
```

类型声明：

```ts
interface String {
  substr(from: number, length?: number): string;
}
```

参数说明：

| 参数   | 说明                                     | 类型   |
| :----- | :--------------------------------------- | :----- |
| from   | 指向字符串指定部分的开头的索引。         | number |
| length | 可选，返回的子字符串片段中包含的字符数。 | number |

## 方法说明

`substr()` 函数从 `str` 的索引 `from` 处开始复制，直到复制 `length` 个字符或字符串的结尾为止。

- 如果 `from` 为正值，且大于或等于字符串的长度，则返回一个空字符串。
- 如果 `from` 为负值，则将其视为 `str.length + from` 开始的一个字符索引。若 `str.length + from` 大于字符串的长度，则使用 0 作为开始提取的索引。
- 如果 `length` 为负数或 0，则不会复制任何字符，返回空字符串。
- 如果省略了 `length` 参数，则一直复制到字符串的结尾。

## 代码示例

### 基本用法

```js
var str = 'Hello world!';

// 开始索引为1，截取长度为2
str.substr(1, 2);
// 'el'

// 开始索引为 -3+10=7，截取长度为2
str.substr(-3, 2);
// 'or'

// 开始索引为 -3+10=7，截取长度为延伸至字符结尾
str.substr(-3);
// 'orld!'

// 开始索引为 1，截取长度为延伸至字符结尾
str.substr(1);
// 'Hello world!'

// 开始索引为 -20+10=-10 即 0，截取长度为2
str.substr(-20, 2);
// 'He'

// 开始索引为 20 大于字符串长度（返回空字符串），截取长度为 2
str.substr(20, 2);
// ''

// 开始索引为 0，截取长度为 -1 和 0（返回空字符串）
str.substr(0, -1);
// ''
str.substr(0, 0);
// ''
```

### 兼容性代码

Microsoft's JScript 不支持负数的 `from` 参数，如果想充分利用该方法，需要使用下面的兼容代码修复 BUG：

```js
// only run when the substr function is broken
if ('ab'.substr(-1) != 'b') {
  /**
   *  Get the substring of a string
   *  @param  {integer}  start   where to start the substring
   *  @param  {integer}  length  how many characters to return
   *  @return {string}
   */
  String.prototype.substr = (function (substr) {
    return function (start, length) {
      // did we get a negative start, calculate how much it is
      // from the beginning of the string
      if (start < 0) start = this.length + start;

      // call the original function
      return substr.call(this, start, length);
    };
  })(String.prototype.substr);
}
```

## 参考资料

- [MDN: Array.prototype.substr](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/substr)
- [TypeScript: lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)
