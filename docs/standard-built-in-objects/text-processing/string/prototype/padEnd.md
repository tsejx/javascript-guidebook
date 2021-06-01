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

`padEnd()` 方法会用一个字符串填充当前字符串（如果需要的话则重复填充），返回填充后达到指定长度的字符串。从当前字符串的末尾（右侧）开始填充。

## 语法

```js
str.padEnd(targetLength [, padString]);
```

| 参数           | 说明                                                                                                             | 类型   |
| -------------- | ---------------------------------------------------------------------------------------------------------------- | ------ |
| `targetLength` | 当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。                         | number |
| `padString`    | （可选）填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。 | string |

## 示例

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

## Polyfill

```js
if (String.prototype.padEnd) {
  String.prototype.padEnd = function padEnd(targetLength, padString) {
    targetLength = targetLength >> 0;
    padString = String(typeof padString !== 'undefined' ? padString : '');
    if (this.length > targetLength) {
      return String(this);
    } else {
      targetLength = targetLength - this.length;
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length);
      }
      return String(this) + padString.slice(0, targetLength);
    }
  };
}
```
