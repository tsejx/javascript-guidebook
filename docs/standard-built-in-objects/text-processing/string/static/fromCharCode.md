---
nav:
  title: 内置对象
  order: 2
group:
  title: String
  path: /text-processing/string/
  order: 9
title: String.fromCharCode
order: 5
---

# String.fromCharCode

静态 `String.fromCharCode()` 方法返回由指定的 UTF-16 代码单元序列创建的字符串。

## 语法

语法：

```js
String.fromCharCode(num1 [, num2 [, num3 ...[, numN]]]);
```

类型声明：

```ts
interface StringConstructor {
  fromCharCode(...codes: number[]): string;
}
```

参数说明：

| 参数 | 说明                                                                                                              | 类型   |
| :--- | :---------------------------------------------------------------------------------------------------------------- | :----- |
| num  | 一系列 UTF-16 代码单元的数字。范围介于 0 到 65535（`0xFFFF`）之间。大于 `0xFFFF` 的数字将被截断。不进行有效性检查 | number |

## 代码示例

```js
String.fromCharCode(65, 66, 67);
// ABC

String.fromCharCode(0x2014);
// -
```

## 参考资料

- [完整的 UTF-16 表格](https://asecuritysite.com/coding/asc2)
- [MDN: String.fromCharCode](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode)
- [TypeScript: lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)
