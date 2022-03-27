---
nav:
  title: 内置对象
  order: 2
group:
  title: String
  path: /text-processing/string/
  order: 9
title: String.prototype.slice
order: 29
---

# String.prototype.slice()

`slice()` 方法提取字符串的某部分，并返回一个新的字符串。

## 语法

语法：

```js
str.slice( start [, end] )
```

类型声明：

```ts
interface String {
  slice(start?: number, end?: number): string;
}
```

参数说明：

| 参数  | 说明                                                                       | 类型   |
| :---- | :------------------------------------------------------------------------- | :----- |
| start | 指向字符串指定部分的开头的索引。                                           | number |
| end   | 可选，指向字符串指定部分的结尾的索引（不包括该索引），默认到字符串的结尾。 | number |

返回一个从原字符串中提取出来的新字符串

## 方法说明

`slice()` 函数一直从索引 `start` 复制到 `end` 所指示的字符，但是不包括 `end` 索引上的字符。

- 如果 `start` 为负，则将其视为 `str.length + start`。
- 如果省略 `end`，则将一直提取到字符串的结尾。
- 如果 `end` 为负，则将其视为 `str.length + end`。
- 如果 `end` 小于等于 `start`，则不会复制任何字符，返回空字符串。

## 代码示例

### 基本用法

```js
var str = 'abcdefghij';

// 开始索引省略即从 0 开始提取，结束索引省略即提取到字符串末尾
str.slice(); // 'abcdefghij'

// 开始索引为 0，结束索引省略即提取到字符串末尾
str.slice(0);
// 'abcdefghij'

// 开始索引为 0，结束索引为2
str.slice(0, 2);
// 'ab'

// 开始索引为 -3 即负数，即为 -3+10=7，结束索引省略即提取到字符串末尾
str.slice(-3);
// 'hij'

// 开始索引为 0，结束索引为 -3 即 -3+10=7
str.slice(0, -3);
// 'abcdef'

// 开始索引为 -3 即 -3+10=7，结束索引为 -1+10=9
str.slice(-3, -1);
```

## 参考资料

- [MDN: Array.prototype.slice](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/slice)
- [TypeScript: lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)
