---
nav:
  title: 内置对象
  order: 2
group:
  title: 全局对象 - 函数属性
  order: 3
title: parseFloat
order: 4
---

# parseFloat

`parseFloat()`函数用于**将字符串转换为浮点数并返回**。

该函数属于 `Global` 对象，所有主流浏览器均支持该函数。

## 语法

```js
parseFloat(numberString);
```

| 参数           | 类型          | 说明                       |
| -------------- | ------------- | -------------------------- |
| `numberString` | `String` 类型 | 需要转换为浮点数的字符串。 |

- 返回转换后的浮点数，`number` 类型，
  - 如果指定的字符串中包含非数字字符，只要字符串开头的一部分符合浮点数规则，则 `parseFloat()` 函数会将这一部分字符串转化为数字（从字符串开头，直到遇到非数字字符为止）。
  - 如果字符串以非数字字符开头，则返回 `NaN`。

## 示例

- 返回正常数字

```js
parseFloat('3.14');
parseFloat('314e-2');
parseFloat('0.0314E+2');
parseFloat('3.14more non-digit characters');

// all return 3.14
```

- 返回 `NaN`

```js
parseFloat('MDN');
// NaN
parseFloat(null);
// NaN
parseFloat([]);
// NaN
parseFloat({});
// NaN
```
