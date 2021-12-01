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

`padStart()` 方法用另一个字符串填充当前字符串（重复，如果需要的话），以便产生的字符串达到给定的长度。填充从当前字符串的开始（左侧）应用的。

## 语法

```js
str.padStart(targetLength [, padString]);
```

| 参数           | 说明                                                                                                             | 类型   |
| -------------- | ---------------------------------------------------------------------------------------------------------------- | ------ |
| `targetLength` | 当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。                         | number |
| `padString`    | （可选）填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。 | string |

## 示例

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

## Polyfill

```js
if (String.prototype.padStart) {
  String.prototype.padStart = function padStart(targetLength, padString) {
    targetLength = targetLength >> 0;
    padString = String(typeof padString !== 'undefined' ? padString : '');
    if (this.length > targetLength) {
      return String(this);
    } else {
      targetLength = targetLength - this.length;
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length);
      }
      return padString.slice(0, targetLength) + String(this);
    }
  };
}
```
