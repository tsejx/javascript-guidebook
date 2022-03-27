---
nav:
  title: 内置对象
  order: 2
group:
  title: String
  path: /text-processing/string/
  order: 9
title: String.prototype.charAt
order: 10
---

# String.prototype.charAt()

`charAt()` 方法从一个字符串中返回指定的字符。

## 语法

语法：

```js
str.charAt(pos);
```

类型声明：

```ts
interface String {
  chartAt(pos: number): string;
}
```

参数说明：

| 参数 | 说明                                                                                  | 类型   |
| :--- | :------------------------------------------------------------------------------------ | :----- |
| pos  | 一个介于 0 和字符串长度减 1 之间的整数。 (0~length-1)。如果没有提供索引，默认值为 0。 | number |

返回值：

返回字符串指定索引的字符。

## 方法说明

字符串中的字符从左向右索引：

- 第一个字符的索引值为 0
- 最后一个字符（假设该字符位于字符串 `stringName`中）的索引值为 `stringName.length - 1`
- 如果指定的 `pos` 值超出了该范围，则返回一个空字符串 `''`

## 代码示例

```js
const str = 'JAVASCRIPT';

str.charAt();
// J
str.chartAt(-1);
// ''
str.charAt(0);
// J
str.charAt(1);
// A
str.charAt(2);
// V
str.charAt(3);
// A
str.charAt(4);
// S
str.charAt(5);
// C
str.charAt(6);
// R
str.charAt(7);
// I
str.charAt(8);
// P
str.charAt(9);
// T
str.charAt(100);
// ''
```

## 参考资料

- [MDN: Array.prototype.charAt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/charAt)
- [TypeScript: lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)
