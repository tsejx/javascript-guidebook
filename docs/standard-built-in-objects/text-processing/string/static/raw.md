---
nav:
  title: 内置对象
  order: 2
group:
  title: String
  path: /text-processing/string/
  order: 9
title: String.raw
order: 7
---

# String.raw

## 语法

语法：

```js
String.raw(callSite, ...substitutions);
```

类型声明：

```ts
interface String {
  raw(template: { raw: readonly string[] | ArrayLike<string> }, ...substitutions: any[]): string;
}
```

参数说明：

| 参数          | 说明                                           | 类型 |
| :------------ | :--------------------------------------------- | :--- |
| callSite      | 一个模板字符串的调用点对象                     |      |
| substitutions | 任意个可选的参数，表示任意个内插表达式对应的值 |      |

## 参考资料

- [MDN: String.raw](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/raw)
- [TypeScript: lib.es2015.core.d.ts](https://github.com/microsoft/TypeScript/blob/cec2fda9a5/lib/lib.es2015.core.d.ts)
