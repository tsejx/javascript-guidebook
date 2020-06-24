---
nav:
  title: 内置对象
  order: 2
group:
  title: 数字和日期
  path: /numbers-and-dates/
  order: 8
title: Number
order: 3
---

# Number 对象

JavaScript 中的 `Number` 对象，是原始数值的对象表示。

## 语法

**构造函数**

```js
new Number([value]);
```

**数值类型转换函数**

```js
Number([value]);
```

| 参数    | 类型           | 说明                         |
| ------- | -------------- | ---------------------------- |
| `value` | 可选，任意类型 | 表示数字的任意值，默认为 0。 |

如果参数 `value` 无法正常转换为数字，则返回 `NaN`。

- 如果 `Number()` 函数被当做 `Number` 对象的构造函数来使用，则以 `new` 关键字构造一个新的 `Number` 对象（Number 类型）。该 `Number` 对象表示参数所指定的数值。
- 如果 `Number()` 函数被当作普通函数使用，则返回转换后的 Number 数据类型的数值。

⚠️ **注意**：大多数时候，你无需显示地通过 `new` 关键字来构造一个 `Number` 对象，因为在 JavaScript 中，Number 对象和 Number 数据类型是相通的，你可以在 Number 数据类型的变量上直接使用 Number 对象的所有属性和方法。

## 构造函数

### 属性

|            属性            |                                       释义                                        |
| :------------------------: | :-------------------------------------------------------------------------------: |
|      `Number.EPSILON`      |                表示 1 和大于 1 的最小值（可表示为 Number）的差值。                |
| `Number.MAX_SAFE_INTEGER`  |                  表示在 JavaScript 中最大的安全整数 (253 - 1)。                   |
|     `Number.MAX_VALUE`     |            表示在 JavaScript 中的最大数值。最小的负数是 `-MAX_VALUE`。            |
|     `Number.MIN_VALUE`     | 能表示的最小正数即最接近 0 的正数 (实际上不会变成 0)。最大的负数是 -`MIN_VALUE`。 |
|        `Number.NaN`        |                                特殊的"非数字"值。                                 |
| `Number.NEGATIVE_INFINITY` |                       特殊的负无穷大值，在溢出时返回该值。                        |
| `Number.POSITIVE_INFINITY` |                       特殊的正无穷大值，在溢出时返回改值。                        |
|     `Number.prototype`     |                           表示 Number 构造函数的原型。                            |

### 方法

|           属性           |                                         释义                                          |
| :----------------------: | :-----------------------------------------------------------------------------------: |
|     `Number.isNaN()`     | 确定传递的值是否是 `NaN` 和其类型时 Number。它是原始的全局 `isNaN()` 的更强大的版本。 |
|   `Number.isFinite()`    |                         用于检测传入的参数是否时一个有穷数。                          |
|   `Number.isInteger()`   |                            用来判断传入的参数是否为整数。                             |
| `Number.isSafeInteger()` |              确定传递的值是否为安全整数 ( -(253 - 1) 至 253 - 1 之间)。               |
|  `Number.parseFloat()`   |                              把一个字符串解析为浮点数。                               |
|   `Number.parseInt()`    |                       根据给定的进制数把一个字符串解析成整数。                        |

## 原型对象

|                属性                 |                    释义                    |
| :---------------------------------: | :----------------------------------------: |
| `Number.prototype.toExponential()`  |   以指数表示法返回该数值字符串表示形式。   |
|    `Number.prototype.toFixed()`     |       使用定点表示法来格式化一个数。       |
| `Number.prototype.toLocaleString()` | 返回这个数字在特定语言环境下的表示字符串。 |
|  `Number.prototype.toPrecision()`   |  以指定的精度返回该数值对象的字符串表示。  |
|    `Number.prototype.toString()`    |   返回指定 Number 对象的字符串表示形式。   |
|    `Number.prototype.valueOf()`     |    返回一个被 Number 对象包装的原始值。    |

## 示例

构造新的 Number 对象

```js
const lamborghini = new Number(5);
// 5
const porsche = new Number('5.3');
// 5.3
const maserati = new Number();
// 0
const ferrai = new Number('Ferrai');
// NaN
```

将数据转换为 Number 数据类型（是原始数值，不是 Number 对象）

```js
var lamborghini = Number(5);
// 5
var porsche = Number('5.3');
// 5.3
var maserati = Number();
// 0
var ferrai = Number('ferrai');
// NaN
```
