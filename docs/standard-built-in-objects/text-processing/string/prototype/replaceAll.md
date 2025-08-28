---
nav:
  title: 内置对象
  order: 2
group:
  title: String
  path: /text-processing/string/
  order: 9
title: String.prototype.replaceAll
order: 27
---

# String.prototype.replaceAll()

⭐️ `ES2021(ES12)新特性`

`String.prototype.replaceAll()` 方法返回一个新字符串，新字符串所有满足 `pattern` 的部分都已被 `replacement` 替换。`pattern` 可以是一个字符串或一个 RegExp，`replacement` 可以是一个字符串或一个在每次匹配被调用的函数。

## 语法

语法：

```js
str.replaceAll(regexp|substr, newSubstr|function);
```

类型声明：

```ts
interface String {
  replaceAll(searchValue: string | RegExp, replaceValue: string): string;

  replaceAll(
    searchValue: string | RegExp,
    replacer: (substring: string, ...args: any[]) => string
  ): string;
}
```

参数说明：

| 参数      | 说明                                     | 类型     |
| :-------- | :--------------------------------------- | :------- |
| regexp    | 指定的正则表达式模式的 RegExp 对象的实例 | RegExp   |
| substr    | 指定被替换的字符串                       | string   |
| newSubstr | 用于替换的字符串                         | string   |
| function  | 替换字符串的函数                         | function |

一个部分或全部匹配由替代模式所取代的新的字符串。

## 代码示例

### 基本用法

```js
const result = 'aabbcc'.replaceAll('b', '.');

console.log(result);
// Output: 'aa..cc'
```

## 参考资料

- [MDN: Array.prototype.replaceAll](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll)
- [TypeScript: lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)
