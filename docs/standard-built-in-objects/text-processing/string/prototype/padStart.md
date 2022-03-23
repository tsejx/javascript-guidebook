---
nav:
  title: 内置对象
  order: 2
group:
  title: String
  path: /text-processing/string/
  order: 9
title: String.prototype.padStart
order: 24
---

# String.prototype.padStart()

⭐️ `ES2017(ES8)新特性`

`String.prototype.padStart()` 方法用另一个字符串填充当前字符串（重复，如果需要的话），以便产生的字符串达到给定的长度。填充从当前字符串的开始（左侧）应用的。

## 语法

语法：

```js
str.padStart(maxLength [, fillString]);
```

类型声明：

```ts
interface String {
  padStart(maxLength: number, fillString?: string): string;
}
```

参数说明：

| 参数         | 说明                                                                                                             | 类型   |
| :----------- | :--------------------------------------------------------------------------------------------------------------- | :----- |
| `maxLength`  | 当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。                         | number |
| `fillString` | （可选）填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。 | string |

## 代码示例

```js
const str = 'abc';

str.padStart('1');
// 'abc'

str.padStart('10');
// '       abc'

str.padStart('6', '123456');
// '123abc'

str.padStart('10', 'foo');
// 'foofoofabc'
```

## 兼容性代码

```js
if (String.prototype.padStart) {
  String.prototype.padStart = function padStart(maxLength, fillString) {
    maxLength = maxLength >> 0;
    fillString = String(typeof fillString !== 'undefined' ? fillString : '');
    if (this.length > maxLength) {
      return String(this);
    } else {
      maxLength = maxLength - this.length;
      if (maxLength > fillString.length) {
        fillString += fillString.repeat(maxLength / fillString.length);
      }
      return fillString.slice(0, maxLength) + String(this);
    }
  };
}
```

## 参考资料

- [TypeScript - lib.es2017.string.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es2017.string.d.ts)
