---
nav:
  title: 内置对象
  order: 2
group:
  title: 全局对象 - 函数属性
  order: 3
title: isFinite
order: 2
---

# isFinite

`isFinite()` 函数用于判断指定数字是否是有限值。如果指定的数字为 `NaN`、`Infinity`、`-Infinity`，则返回 `false`，其他数字均返回 `true`。

该函数属于 `Global` 对象，所有主流浏览器均支持该函数。

## 语法

```js
isFinite(number);
```

| 参数     | 类型          | 说明         |
| -------- | ------------- | ------------ |
| `number` | `Number` 类型 | 需要检测的值 |

如果参数`number` 不是 Number 类型（如字符串、函数等），也返回 `false`。

`isFinite()` 函数的返回值是 Boolean 类型。

- 当指定的数字为 `NaN`、正无穷、负无穷时，返回 `false`；
- 除上述三种 Number 类型外的数字均返回 `true`。

## 示例

```js
// false situation
isFinite(NaN);
// false
isFinite(Infinity);
// false
isFinite(-Infinity);
//  alse

// true situaton
isFinite(0);
// true
isFinite(2e64);
// true
isFinite('0');
// true

// extraordinary
Number.isFinite(null);
// false
Number.isFinite('0');
// false
```

和全局的 `isFinite()` 函数相比，`Number.isFinite()` 不会强制将一个非数值的参数转换成数值，这就意味着，只有数值类型的值，且是有限值，才返回 `true`。
