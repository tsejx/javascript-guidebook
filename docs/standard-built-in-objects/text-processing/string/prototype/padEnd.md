---
nav:
  title: 内置对象
  order: 2
group:
  title: String
  path: /text-processing/string/
  order: 9
title: String.prototype.padEnd
order: 23
---

# String.prototype.padEnd()

⭐️ `ES2017(ES8)新特性`

`String.prototype.padEnd()` 方法会用一个字符串填充当前字符串（如果需要的话则重复填充），返回填充后达到指定长度的字符串。从当前字符串的末尾（右侧）开始填充。

## 语法

语法：

```js
str.padEnd(maxLength [, fillString]);
```

类型声明：

```ts
interface String {
  padEnd(maxLength: number, fillString?: string): string;
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

str.padEnd('1');
// 'abc'

str.padEnd('10');
// 'abc       '

str.padEnd('6', '123456');
// 'abc123'

str.padEnd('10', 'foo');
// 'abcfoofoof'
```

## 兼容性代码

```js
if (String.prototype.padEnd) {
  String.prototype.padEnd = function padEnd(maxLength, fillString) {
    maxLength = maxLength >> 0;
    fillString = String(typeof fillString !== 'undefined' ? fillString : '');
    if (this.length > maxLength) {
      return String(this);
    } else {
      maxLength = maxLength - this.length;
      if (maxLength > fillString.length) {
        fillString += fillString.repeat(maxLength / fillString.length);
      }
      return String(this) + fillString.slice(0, maxLength);
    }
  };
}
```

## 参考资料

- [TypeScript - lib.es2017.string.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es2017.string.d.ts)
