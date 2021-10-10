---
nav:
  title: 内置对象
  order: 2
group:
  title: 全局对象 - 函数属性
  order: 3
title: isNaN
order: 3
---

# isNaN

`isNaN()` 函数用于判断指定数字是否是非数字值 `NaN`。

该函数属于`Global`对象，所有主流浏览器均支持该函数。

## 语法

```js
isNaN(number);
```

| 参数     | 类型          | 说明       |
| -------- | ------------- | ---------- |
| `number` | `Number` 类型 | 指定的数值 |

⚠️ **注意**： 如果参数 `number` 不是 Number 类型，则 `isNaN()` 函数会将其强制转换为 Number 类型再进行判断。大多数其他类型的值无法强制转换为 Number 类型，则其转换结果为 `NaN`，即 `isNaN()` 函数返回 `true`。

- `isNaN()` 函数的返回值是 Boolean 类型。
  - 如果指定的数字为 `NaN`，则返回 `true`
  - 如果指定的数字为非 `NaN` 则返回 `false`。

## 说明

- 通常使用此函数检测来自 `parseInt()` 和 `parseFloat()` 函数的返回值。
- 将某些不能强制转换为数字类型的值的非数字类型的值转换为数字类型的值时，也会得到 `NaN`。
- `NaN` 不能通过相等操作符来判断，因为 `NaN` 是唯一一个与其自身不等的值。

## 示例

```js
isNaN(NaN);
// true
isNaN(undefined);
// true
isNaN({});
// true

isNaN(true);
// false
isNaN(null);
// false
isNaN(37);
// false

// strings
isNaN('37');
// false: 可以被转换成数值37
isNaN('37.37');
// false: 可以被转换成数值37.37
isNaN('');
// false: 空字符串被转换成0
isNaN(' ');
// false: 包含空格的字符串被转换成0

// dates
isNaN(new Date());
// false
isNaN(new Date().toString());
// true

isNaN('blabla');
// true: "blabla"不能转换成数值
```
