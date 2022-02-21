---
nav:
  title: 内置对象
  order: 2
group:
  title: 数字和日期
  path: /numbers-and-dates/
  order: 8
title: Date
order: 1
---

# Date 对象

Date 对象是 JavaScript 语言中内置的数据类型，用于提供日期和时间的操作接口。Date 对象基于 1970 年 1 月 1 日（世界标准时间）起的毫秒数。

## 语法

### 不带 new 调用

**用法一**：不带 `new` 操作符时，像一个函数一样调用。它将忽略所有传入的参数，并返回当前日期和时间的一个字符串表示

```js
const date = Date();
console.log(date);
// 'Fri Dec 03 2021 01:13:39 GMT+0800 (China Standard Time)'
```

### 带 new 调用

**用法二**：使用 `new` 操作符，且不带参数时，将根据当前时间和日期创建一个 Date 对象。

```js
const date = new Date();
console.log(date);
// Fri Dec 03 2021 01:13:57 GMT+0800 (China Standard Time)
```

### 数字参数

**用法三**：可接受一个数字参数（ Number 数据类型），该参数表示设定时间与 1970 年 1 月 1 日 0 点之间的毫秒数。

```js
new Date(value);
```

| 参数  | 描述                                                              | 类型   |
| :---- | :---------------------------------------------------------------- | :----- |
| value | 代表自 1970 年 1 月 1 日 00:00:00（世界标准时间）起经过的毫秒数。 | string |

### 字符串参数

**用法四**：可接受一个字符串参数（String 数据类型），参数形式类似于 `Date.parse()` 方法。但 `parse()` 方法返回的是一个数字，而 `Date()` 函数返回的是一个对象。

```js
new Date(dateString);
```

关于标准的日期时间字符串中前置 `0` 的处理，也类似于 `Date.parse()` 方法，若有前置 `0`，则相当于 UTC 时间，若没有，则相当于本地时间。其余情况一般都为本地时间。

| 参数       | 描述                                                         | 类型   |
| :--------- | :----------------------------------------------------------- | :----- |
| dateString | 表示日期的字符串值。该字符串应该能被 `Date.parse()` 方法识别 | string |

### Date.UTC

- **用法五**：可接受参数形式类似于 `Date.UTC()` 方法的参数，但 `Date.UTC()` 方法返回是一个毫秒数，且是 UTC 时间，而 `Date()` 函数返回是一个对象，且是本地时间。

```js
new Date.UTC( year, month[, day[, hour [, minutes[, seconds[, milliseconds]]]]]);
```

当 Date 作为构造函数调用并传入多个参数时，如果数值大于合理范围时（如月份为 13 或者分钟数为 70），相邻的数值会被调整。

比如 `new Date(2013,12,1)` 等于 `new Date(2014,1,1)`，它们都表示日期 `2014-01-01`（注意月份是从 `0` 开始的）。其他数值也是类似，`new Date(2013,2,1,0,70)` 等于 `new Date(2013,2,1,1,10)`，都表示时间 `2013-03-01T01:10:00`。

| 参数        | 描述                                                                                      | 类型   |
| :---------- | :---------------------------------------------------------------------------------------- | :----- |
| year        | 代表年份的整数值。为了避免 2000 年问题最好指定 4 位数的年份；使用 `1998`, 而不要用 `98`。 | number |
| month       | 代表月份的整数值从 0（1 月）到 11（12 月）。                                              | number |
| day         | 代表一个月中的第几天的整数值，从 1 开始。                                                 | number |
| hour        | 代表一天中的小时数的整数值（24 小时制）。                                                 | number |
| minute      | 分钟数。                                                                                  | number |
| second      | 秒数。                                                                                    | number |
| millisecond | 表示时间的毫秒部分的整数值。                                                              | number |

说明：

- 如果没有输入任何参数，则 Date 的构造器会依据系统设置的当前时间来创建一个 Date 对象。
- 如果提供了至少两个参数，其余的参数均会默认设置为 `1`（如果没有提供 `day` 参数）或者 `0`。
- JavaScript 的时间是由世界标准时间（UTC）`1970年1月1日` 开始，用毫秒计时，一天由 `86,400,000` 毫秒组成。Date 对象的范围是 `-100,000,000` 天至 `100,000,000` 天（等效的毫秒值）。
- JavaScript 的 Date 对象提供了数个 UTC 时间的方法，也相应提供了当地时间的方法。

> UTC，也就是我们所说的格林威治时间，指的是 `time` 中的世界时间标准。而当地时间则是指执行 JavaScript 的客户端电脑所设置的时间。

**注意**：需要注意的是只能通过调用 Date 构造函数来实例化日期对象：以常规函数调用它（即不加 `new` 操作符）将会返回一个字符串，而不是一个日期对象。另外，不像其他 JavaScript 类型，`Date` 对象没有字面量格式。

## 构造函数

### 属性

| 属性             | 描述                                                         |
| :--------------- | :----------------------------------------------------------- |
| `Date.prototype` | 表示 Date 构造函数的原型，允许为 Date 实例对象添加属性方法。 |
| `Date.length`    | 值是 `7`，为该构造函数可接受的参数个数。                     |

### 方法

| 方法           | 描述                                                                                                                                                                                                             |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Date.now()`   | 返回自 `1970年1月1日 00:00:00` UTC （世界标准时间）到当前时间的毫秒数。                                                                                                                                          |
| `Date.parse()` | 解析一个表示某个日期的字符串，并返回从 `1970-1-1 00:00:00` UTC 到该日期对象（该日期对象的 UTC 时间）的毫秒数，如果该字符串无法识别，或者一些情况下，包含了不合法的日期数值（如：2015-02-31），则返回值为 `NaN`。 |
| `Date.UTC()`   | 接受的参数同日期构造函数接受最多参数时一样，返回从 `1970-1-1 00:00:00` UTC 到指定日期的毫秒数。                                                                                                                  |

## 原型对象

Date 对象没有可以直接读写的属性，所有对日期和时间的访问都需要通过方法。

Date 对象的大多数方法分为两种形式：

- 使用本地时间
- 使用 UTC 时间

### 获取指定时间

Conversion getter 类方法从 Date 对象返回一个字符串，表示指定的时间

| 方法                                  | 说明                                                                            |
| :------------------------------------ | :------------------------------------------------------------------------------ |
| `Date.prototype.toString()`           | 返回本地时区的日期字符串。                                                      |
| `Date.prototype.toUTCString()`        | 返回 UTC 时间的日期字符串。                                                     |
| `Date.prototype.toISOString()`        | 返回 Date 对象的标准的日期时间字符串格式的字符串。                              |
| `Date.prototype.toDateString()`       | 返回 Date 对象的日期部分的字符串。                                              |
| `Date.prototype.toTimeString()`       | 返回 Date 对象的时间部分的字符串。                                              |
| `Date.prototype.toJSON()`             | 返回一个符合 JSON 格式的日期字符串，与 `toISOString()` 方法的返回结果完全相同。 |
| `Date.prototype.toLocaleString()`     | `Date.prototype.toString()` 方法的本地化转换。                                  |
| `Date.prototype.toLocaleTimeString()` | `Date.prototype.toTimeString()` 方法的本地化转换。                              |
| `Date.prototype.toLocaleDateString()` | `Date.prototype.toDateString()` 方法的本地化转换。                              |
| `Date.prototype.valueOf()`            | 返回距离 `1970年1月1日0点` 的毫秒数。                                           |

### 获取指定时间值

Date 对象提供了一系列 Getter 类方法，用来获取实例对象某个方面的值。

| 方法                                    | 说明                                                                                      |
| :-------------------------------------- | :---------------------------------------------------------------------------------------- |
| `Date.prototype.getTime()`              | 返回距离 `1970年1月1日0点` 的毫秒数，同 `valueOf()`。                                     |
| `Date.prototype.getTimezoneOffset()`    | 返回当前时间与 UTC 的时区差异，以分钟表示（8\*60=480 分钟），返回结果考虑到了夏令时因素。 |
| `Date.prototype.get[UTC]FullYear()`     | 返回指定日期对象的年份（四位数年份时返回四位数字）。                                      |
| `Date.prototype.get[UTC]Month()`        | 返回指定日期对象的月份（0-11）。                                                          |
| `Date.prototype.get[UTC]Date()`         | 返回指定日期对象的月份中的第几天（1-31）。                                                |
| `Date.prototype.get[UTC]Day()`          | 返回指定日期对象的星期中的第几天（0-6）。                                                 |
| `Date.prototype.get[UTC]Hours()`        | 返回指定日期对象的小时（0-23）。                                                          |
| `Date.prototype.get[UTC]Minutes()`      | 返回指定日期对象的分钟（0-59）。                                                          |
| `Date.prototype.get[UTC]Seconds()`      | 返回指定日期对象的秒数（0-59）。                                                          |
| `Date.prototype.get[UTC]Milliseconds()` | 返回指定日期对象的微秒数（0-999）。                                                       |

**注意**：以上方法中含 `UTC` 则为以世界时间为标准。

### 设置指定时间值

Date 对象提供了一系列 Setter 类方法，用来设置实例对象的各个方面。

Setter 方法基本与 Getter 方法相对应，Setter 方法传入类似于 `Date.UTC()` 的参数，返回调整后的日期的内部毫秒数。

| 方法                                    | 说明                                                                                                                     |
| :-------------------------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| `Date.prototype.setTime()`              | 通过指定从 1970-1-1 00:00:00 UTC 开始经过的毫秒数来设置日期对象的时间，对于早于 1970-1-1 00:00:00 UTC 的时间可使用负值。 |
| `Date.prototype.setYear()`              | 用于设置年份。请使用 `Date.prototype.set[UTC]FullYear()` 方法代替。                                                      |
| `Date.prototype.set[UTC]FullYear()`     | 根据本地时间为指定日期对象设置完整年份（四位数年份是四个数字）。                                                         |
| `Date.prototype.set[UTC]Month()`        | 根据本地时间为指定日期对象设置月份。                                                                                     |
| `Date.prototype.set[UTC]Date()`         | 根据世界时设置 Date 对象中月份的一天 (1 ~ 31)。                                                                          |
| `Date.prototype.set[UTC]Hours()`        | 根据本地时间为指定日期对象设置小时数。                                                                                   |
| `Date.prototype.set[UTC]Minutes()`      | 根据本地时间为指定日期对象设置分钟数。                                                                                   |
| `Date.prototype.set[UTC]Seconds()`      | 根据本地时间为指定日期对象设置秒数。                                                                                     |
| `Date.prototype.set[UTC]Milliseconds()` | 根据本地时间为指定日期对象设置毫秒数。                                                                                   |

**注意**：星期只能获取，不能设置。

## 应用示例

### 基本用法

普通函数调用：

```js
Date();
// "Mon Apr 02 2018 15:00:00 GMT+0800 (中国标准时间)"

Date('2018/4/2');
// "Mon Apr 02 2018 15:00:00 GMT+0800 (中国标准时间)"

typeof Date();
// 'string'
```

不带参数的构造函数：

```js
new Date();
// Mon Apr 02 2018 15:00:00 GMT+0800 (中国标准时间)
new Date();
// Mon Apr 02 2018 15:00:00 GMT+0800 (中国标准时间)

typeof new Date();
// 'object'
```

带数字参数的构造函数：

```js
new Date(0);
// Thu Jan 01 1970 08:00:00 GMT+0800 (中国标准时间)
new Date(86400000);
// Fri Jan 02 1970 08:00:00 GMT+0800 (中国标准时间)

typeof new Date(0);
// "object"
```

带字符串参数的构造函数：

```js
new Date('4/2/2018');
// Mon Apr 02 2018 00:00:00 GMT+0800 (中国标准时间)
Date.parse('4/2/2018');
// 1522598400000

typeof new Date(4 / 2 / 2018);
// "object"
typeof Date.parse(4 / 2 / 2018);
// "number"
```

关于标准的日期时间字符串中前置 0 的处理，也类似于 `Date.parse()` 方法，若有前置 0，则相当于 UTC 时间，若没有，则相当于本地时间。其余情况一般都为本地时间。

```js
new Date('04/02/2018');
// Mon Apr 02 2018 00:00:00 GMT+0800 (中国标准时间)
new Date('2018-4-2');
// Mon Apr 02 2018 00:00:00 GMT+0800 (中国标准时间)
new Date('2018-04-02');
// Mon Apr 02 2018 00:00:00 GMT+0800 (中国标准时间)
```

带 UTC 参数的构造函数：

```js
new Date(2016, 7, 12);
// Fri Aug 12 2016 00:00:00 GMT+0800 (中国标准时间)
+new Date(2016, 7, 12);
// 1470931200000
typeof new Date(2016, 7, 12);
// "object"

Date.UTC(2016, 7, 12);
// 1470960000000
typeof Date.UTC(2016, 7, 12);
// "number"
```

- 使用参数类似于 `Date.parse()` 函数的方法时，如果日期对象超出范围，浏览器会自动将日期计算成范围内的值。
- 使用参数类似于 `Date.UTC()` 函数的方法时，如果日期对象超出范围，浏览器会提示 `Invalid Date`。

```js
new Date(2018, 7, 32);
// Sat Sep 01 2018 00:00:00 GMT+0800 (中国标准时间)
new Date(2018, 8, 1);
// Sat Sep 01 2018 00:00:00 GMT+0800 (中国标准时间)
new Date('2018-8-32');
// Invalid Date
new Date('2018-9-1');
// Sat Sep 01 2018 00:00:00 GMT+0800 (中国标准时间)
```

### 格式化时间戳

```js
function formatTimestamp(timestamp, format) {
  const date = new Date(timestamp + 8 * 3600 * 1000);
  return date.toJSON().substr(0, 19).replace('T', '');
}
```
