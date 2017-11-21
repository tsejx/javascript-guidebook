# Number数字对象类型

 JavaScript 的 Number 对象是经过封装的能让你处理数字值的对象。Number 对象由 Number() 构造器创建。

## 语法

> new Number(value);

## 参数

 - **`value`**
被创建对象的数字值。

## 描述

Number 对象主要用于：

 - 如果参数无法被转换为数字，则返回 NaN。
 - 在非构造器上下文中 (如：没有 new 操作符)，Number 能被用来执行类型转换。

## 属性


属性                     |                  释义
:-----------------------:|:-------------------------------------:
`Number.EPSILON`         |两个可表示(representable)数之间的最小间隔。
`Number.MAX_SAFE_INTEGER`|在 JavaScript 中最大的安全整数 (253 - 1)。
`Number.MAX_VALUE`       |能表示的最大正数。最小的负数是 -MAX_VALUE。
`Number.MIN_VALUE`       |能表示的最小正数即最接近 0 的正数 (实际上不会变成 0)。最大的负数是 -MIN_VALUE。
`Number.NaN`              |特殊的“非数字”值。
`Number.NEGATIVE_INFINITY`|特殊的负无穷大值，在溢出时返回该值。
`Number.POSITIVE_INFINITY`|特殊的正无穷大值，在溢出时返回改值。
`Number.prototype`        |Number 对象上允许的额外属性。

## 方法

属性                     |                  释义
:-----------------------:|:-------------------------------------:
`Number.isNaN()`         |确定传递的值是否是 NaN。
`Number.isFinite()`      |确定传递的值类型及本身是否是有限数。
`Number.isInteger()`     |确定传递的值类型是“number”，且是整数。
`Number.isSafeInteger()` |确定传递的值是否为安全整数 ( -(253 - 1) 至 253 - 1之间)。
`Number.parseFloat()`    |和全局对象 parseFloat() 一样。
`Number.parseInt()`      |和全局对象 parseInt() 一样。

## Number实例

属性                     |                  释义
:-----------------------:|:-------------------------------------:
`Number.prototype.toExponential()`|以指数表示法返回该数值字符串表示形式。
`Number.prototype.toFixed()`|使用定点表示法来格式化一个数。
`Number.prototype.toLocaleString()`|返回这个数字在特定语言环境下的表示字符串。
`Number.prototype.toPrecision()`|以指定的精度返回该数值对象的字符串表示。
`Number.prototype.toString()`|返回指定 Number 对象的字符串表示形式。
`Number.prototype.valueOf()`|返回一个被 Number 对象包装的原始值。