---
nav:
  title: 内置对象
  order: 2
group:
  title: String
  path: /text-processing/string/
  order: 9
title: String.fromCodePoint
order: 6
---

# String.fromCodePoint

`String.fromCodePoint()` 静态方法返回使用指定的代码点序列创建的字符串。

## 语法

语法：

```js
String.fromCodePoint(num1[, ...[, numN]])
```

类型声明：

```ts
interface String {
  fromCodePoint(...codePoints: number[]): string;
}
```

参数说明：

| 参数              | 说明             | 类型   |
| :---------------- | :--------------- | :----- |
| `num1, ..., numN` | Unicode 编码位置 | number |

## 参考资料

- [MDN: String.fromCodePoint](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint)
- [TypeScript: lib.es2015.core.d.ts](https://github.com/microsoft/TypeScript/blob/cec2fda9a5/lib/lib.es2015.core.d.ts)
