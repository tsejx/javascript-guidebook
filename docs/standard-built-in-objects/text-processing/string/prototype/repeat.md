---
nav:
  title: 内置对象
  order: 2
group:
  title: String
  path: /text-processing/string/
  order: 9
title: String.prototype.repeat
order: 25
---

# String.prototype.repeat()

`repeat()` 构造并返回一个新字符串，该字符串包含被连接在一起的指定数量的字符串的副本。

## 语法

```js
str.repeat(count);
```

| 参数    | 说明                                                                      | 类型   |
| ------- | ------------------------------------------------------------------------- | ------ |
| `count` | 介于 0 与正无穷大之间的整数。表示在新构造的字符串中重复了多少遍原字符串。 | number |

## 示例

```js
const str = 'abc';

str.repeat(0);
// ''

str.repeat(1);
// 'abc'

str.repeat(2);
// 'abcabc'

str.repeat(3.5);
// 'abcabcabc'

str.repeat(1 / 0);
// RangeError: repeat count must be positive and less than infinity

str.repeat(-1);
// RangeError: repeat count mutst be positive and less than infinity
```

## Polyfill

```js
if (!String.prototype.repeat) {
  String.prototype.repeat = function(count) {
    'use strict';

    if (this === null) {
      throw new TypeError("Can't convert " + this + ' to object');
    }
    var str = '' + this;
    count = +count;

    if (count !== count) {
      count = 0;
    }
    if (count < 0) {
      throw new RangeError('repeat count must be non-negative');
    }
    if (count === Infinity) {
      throw new RangeError('repeat count must be less than Infinity');
    }

    count = Math.floor(count);

    if (str.length === 0 || count === 0) {
      return '';
    }

    // 确保 count 是一个 31 位的整数，这样我们就可以使用如下优化的算法
    // 当前，绝大多数浏览器都不能支持 1<<28 长的字符串
    if (str.length * count >= 1 << 28) {
      throw new RangeError('repeat count must not overflow maximum string size');
    }

    var repeat = '';

    for (;;) {
      if ((count & 1) === 1) {
        repeat += str;
      }

      count >>>= 1;

      if (count === 0) {
        break;
      }
      str += str;
    }
    return repeat;
  };
}
```
