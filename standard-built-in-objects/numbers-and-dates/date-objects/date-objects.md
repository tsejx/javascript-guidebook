# Date 对象

Date 对象是 Javascript 语言中内置的数据类型，用于提供日期和时间的操作接口。Date对象基于1970年1月1日（世界标准时间）起的毫秒数。

## 语法

- **用法一**：不带 `new` 操作符时，像一个函数一样调用。它将忽略所有传入的参数，并返回当前日期和时间的一个字符串表示

```javascript
Date()
```

- **用法二**：使用 `new` 操作符，且不带参数时，将根据当前时间和日期创建一个 Date 对象。

```javascript
new Date()
```

- **用法三**：可接受一个数字参数（ Number 数据类型），该参数表示设定时间与1970年1月1日0点之间的毫秒数。

```javascript
new Date( value )
```

- **用法四**：可接受一个字符串参数（String 数据类型），参数形式类似于 `Date.parse()` 方法。但 `parse()` 方法返回的是一个数字，而 `Date()` 函数返回的是一个对象。

```javascript
new Date( dateString )
```

关于标准的日期时间字符串中前置0的处理，也类似于Date.parse()方法，若有前置0，则相当于UTC时间，若没有，则相当于本地时间。其余情况一般都为本地时间。

- **用法五**：可接受参数形式类似于 `Date.UTC()` 方法的参数，但 `Date.UTC()` 方法返回是一个毫秒数，且是 UTC 时间，而 `Date()` 函数返回是一个对象，且是本地时间。

```javascript
new Date( year, month[, day[, hour [, minutes[, seconds[, milliseconds]]]]]);
```

**注意**：需要注意的是只能通过调用 Date 构造函数来实例化日期对象：以常规函数调用它（即不加 `new` 操作符）将会返回一个字符串，而不是一个日期对象。另外，不像其他 JavaScript 类型，`Date` 对象没有字面量格式。

### 参数

**注意**：当 Date 作为构造函数调用并传入多个参数时，如果数值大于合理范围时（如月份为13或者分钟数为70），相邻的数值会被调整。比如 `new Date(2013, 13, 1)` 等于 `new Date(2014, 1, 1)`，它们都表示日期2014-02-01（注意月份是从0开始的）。其他数值也是类似，`new Date(2013, 2, 1, 0, 70)` 等于 `new Date(2013, 2, 1, 1, 10)`，都表示时间2013-03-01T01:10:00。



| 参数          | 类型          | 描述                                                         |
| ------------- | ------------- | ------------------------------------------------------------ |
| `value`       | `String` 类型 | 代表自1970年1月1日00:00:00（世界标准时间）起经过的毫秒数。   |
| `dateString`  | `String` 类型 | 表示日期的字符串值。该字符串应该能被 `Date.parse()` 方法识别 |
| `year`        | `Number` 类型 | 代表年份的整数值。为了避免2000年问题最好指定4位数的年份; 使用 `1998`, 而不要用 `98`。 |
| `month`       | `Number` 类型 | 代表月份的整数值从0（1月）到11（12月）。                     |
| `day`         | `Number` 类型 | 代表一个月中的第几天的整数值，从1开始。                      |
| `hour`        | `Number` 类型 | 代表一天中的小时数的整数值（24小时制）。                     |
| `minute`      | `Number` 类型 | 分钟数。                                                     |
| `second`      | `Number` 类型 | 秒数。                                                       |
| `millisecond` | `Number` 类型 | 表示时间的毫秒部分的整数值。                                 |

- 如果没有输入任何参数，则 Date 的构造器会依据系统设置的当前时间来创建一个 Date 对象。
- 如果提供了至少两个参数，其余的参数均会默认设置为1（如果没有提供 day 参数）或者0。
- JavaScript 的时间是由世界标准时间（UTC）1970年1月1日开始，用毫秒计时，一天由86,400,000毫秒组成。Date 对象的范围是-100,000,000天至100,000,000天（等效的毫秒值）。
- JavaScript 的 Date 对象提供了数个 UTC 时间的方法，也相应提供了当地时间的方法。UTC，也就是我们所说的格林威治时间，指的是 time 中的世界时间标准。而当地时间则是指执行 JavaScript 的客户端电脑所设置的时间。

## Date 构造函数

### 属性

| 属性             | 描述                                                         |
| ---------------- | ------------------------------------------------------------ |
| `Date.prototype` | 表示 Date 构造函数的原型，允许为 Date 实例对象添加属性方法。 |
| `Date.length`    | 值是 7，为该构造函数可接受的参数个数。                       |

### 方法

| 方法           | 描述                                                         |
| -------------- | ------------------------------------------------------------ |
| `Date.now()`   | 返回自 1970年1月1日 00:00:00  UTC （世界标准时间）到当前时间的毫秒数。 |
| `Date.parse()` | 解析一个表示某个日期的字符串，并返回从 1970-1-1 00:00:00 UTC 到该日期对象（该日期对象的UTC时间）的毫秒数，如果该字符串无法识别，或者一些情况下，包含了不合法的日期数值（如：2015-02-31），则返回值为 `NaN`。 |
| `Date.UTC()`   | 接受的参数同日期构造函数接受最多参数时一样，返回从1970-1-1 00:00:00 UTC到指定日期的毫秒数。 |

## Date 实例

Date对象没有可以直接读写的属性，所有对日期和时间的访问都需要通过方法。

Date对象的大多数方法分为两种形式：一种是使用本地时间，一种是使用UTC时间，这些方法在下面一起列出。

### Conversion getter

Conversion getter 类方法从 Date 对象返回一个字符串，表示指定的时间

方法|释义
:---:|:---:
`Date.prototype.toString()`|返回本地时区的日期字符串。
`Date.prototype.toUTCString()`|返回UTC时间的日期字符串。
`Date.prototype.toISOString()`|返回Date对象的标准的日期时间字符串格式的字符串。
`Date.prototype.toDateString()`|返回Date对象的日期部分的字符串。
`Date.prototype.toTimeString()`|返回Date对象的时间部分的字符串。
`Date.prototype.toJSON()`|返回一个符合JSON格式的日期字符串，与toISOString方法的返回结果完全相同。
`Date.prototype.toLocaleString()`|`Date.prototype.toString()` 方法的本地化转换。
`Date.prototype.toLocaleTimeString()`|`Date.prototype.toTimeString()` 方法的本地化转换。
`Date.prototype.toLocaleDateString()`|`Date.prototype.toDateString()` 方法的本地化转换。
`Date.prototype.valueOf()`|返回距离1970年1月1日0点的毫秒数。

### Getter

Date 对象提供了一系列 Getter 类方法，用来获取实例对象某个方面的值。

| 方法                                    | 描述                                                         |
| --------------------------------------- | ------------------------------------------------------------ |
| `Date.prototype.getTime()`              | 返回距离1970年1月1日0点的毫秒数，同 `valueOf()`。            |
| `Date.prototype.getTimezoneOffset()`    | 返回当前时间与 UTC 的时区差异，以分钟表示（8*60=480分钟），返回结果考虑到了夏令时因素。 |
| `Date.prototype.getYear()`:-1:          | 返回距离1900年的年数（已过时）。                             |
| `Date.prototype.get[UTC]FullYear()`     | 返回指定日期对象的年份（四位数年份时返回四位数字）。         |
| `Date.prototype.get[UTC]Month()`        | 返回指定日期对象的月份（0-11）。                             |
| `Date.prototype.get[UTC]Date()`         | 返回指定日期对象的月份中的第几天（1-31）。                   |
| `Date.prototype.get[UTC]Day()`          | 返回指定日期对象的星期中的第几天（0-6）。                    |
| `Date.prototype.get[UTC]Hours()`        | 返回指定日期对象的小时（0-23）。                             |
| `Date.prototype.get[UTC]Minutes()`      | 返回指定日期对象的分钟（0-59）。                             |
| `Date.prototype.get[UTC]Seconds()`      | 返回指定日期对象的秒数（0-59）。                             |
| `Date.prototype.get[UTC]Milliseconds()` | 返回指定日期对象的微秒数（0-999）。                          |

**注意**：以上方法中含 `UTC` 则为以世界时间为标准。 

### Setter

Date对象提供了一系列 Setter 类方法，用来设置实例对象的各个方面。

Setter 方法基本与 Getter 方法相对应，Setter 方法传入类似于 `Date.UTC()` 的参数，返回调整后的日期的内部毫秒数。

| 方法                                    | 描述                                                         |
| --------------------------------------- | ------------------------------------------------------------ |
| `Date.prototype.setTime()`              | 通过指定从 1970-1-1 00:00:00 UTC 开始经过的毫秒数来设置日期对象的时间，对于早于 1970-1-1 00:00:00 UTC的时间可使用负值。 |
| `Date.prototype.setYear()`              | 用于设置年份。请使用 `Date.prototype.set[UTC]FullYear()`  方法代替。 |
| `Date.prototype.set[UTC]FullYear()`     | 根据本地时间为指定日期对象设置完整年份（四位数年份是四个数字）。 |
| `Date.prototype.set[UTC]Month()`        | 根据本地时间为指定日期对象设置月份。                         |
| `Date.prototype.set[UTC]Date()`         | 根据世界时设置 Date 对象中月份的一天 (1 ~ 31)。              |
| `Date.prototype.set[UTC]Hours()`        | 根据本地时间为指定日期对象设置小时数。                       |
| `Date.prototype.set[UTC]Minutes()`      | 根据本地时间为指定日期对象设置分钟数。                       |
| `Date.prototype.set[UTC]Seconds()`      | 根据本地时间为指定日期对象设置秒数。                         |
| `Date.prototype.set[UTC]Milliseconds()` | 根据本地时间为指定日期对象设置毫秒数。                       |

**注意**：星期只能获取，不能设置。

## 示例

### 标准示例

#### 普通函数调用

```javascript
Date(); 			// "Mon Apr 02 2018 15:00:00 GMT+0800 (中国标准时间)"
Date('2018/4/2'); 	 // "Mon Apr 02 2018 15:00:00 GMT+0800 (中国标准时间)"

typeof Date();		// 'string'
```

#### 不带参数的构造函数

```javascript
new Date();			// Mon Apr 02 2018 15:00:00 GMT+0800 (中国标准时间)
new Date;			// Mon Apr 02 2018 15:00:00 GMT+0800 (中国标准时间)

typeof new Date();	// 'object'
```

#### 带数字参数的构造函数

```javascript
new Date(0); 			// Thu Jan 01 1970 08:00:00 GMT+0800 (中国标准时间)
new Date(86400000);		// Fri Jan 02 1970 08:00:00 GMT+0800 (中国标准时间)

typeof new Date(0);		// "object"
```

#### 带字符串参数的构造函数

```javascript
new Date('4/2/2018');			// Mon Apr 02 2018 00:00:00 GMT+0800 (中国标准时间)
Date.parse('4/2/2018');			// 1522598400000

typeof new Date(4/2/2018);		// "object"
typeof Date.parse(4/2/2018);	// "number"
```

关于标准的日期时间字符串中前置0的处理，也类似于 `Date.parse()` 方法，若有前置0，则相当于 UTC 时间，若没有，则相当于本地时间。其余情况一般都为本地时间。

```javascript
new Date('04/02/2018');		// Mon Apr 02 2018 00:00:00 GMT+0800 (中国标准时间)
new Date('2018-4-2');		// Mon Apr 02 2018 00:00:00 GMT+0800 (中国标准时间)
new Date('2018-04-02');		// Mon Apr 02 2018 00:00:00 GMT+0800 (中国标准时间)
```

#### 带UTC参数的构造函数

```javascript
new Date(2016,7,12);			// Fri Aug 12 2016 00:00:00 GMT+0800 (中国标准时间)
+new Date(2016,7,12);			// 1470931200000
typeof new Date(2016,7,12);		// "object"

Date.UTC(2016,7,12);			// 1470960000000
typeof Date.UTC(2016,7,12);		// "number"
```

- 使用参数类似于 `Date.parse()` 函数的方法时，如果日期对象超出范围，浏览器会自动将日期计算成范围内的值。
- 使用参数类似于 `Date.UTC()` 函数的方法时，如果日期对象超出范围，浏览器会提示 `Invalid Date`。

```javascript
new Date(2018,7,32);		// Sat Sep 01 2018 00:00:00 GMT+0800 (中国标准时间)
new Date(2018,8,1);			// Sat Sep 01 2018 00:00:00 GMT+0800 (中国标准时间)
new Date('2018-8-32');		// Invalid Date
new Date('2018-9-1');		// Sat Sep 01 2018 00:00:00 GMT+0800 (中国标准时间)
```