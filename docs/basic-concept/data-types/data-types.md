---
nav:
  title: 基本语法
  order: 1
group:
  title: 数据类型和值
  order: 3
title: 数据类型
order: 2
---

# 数据类型

JavaScript 是一种 **弱类型语言** 或者说 **动态语言**。这意味着你不用提前声明变量的类型，在程序运行过程中，类型会被自动确定。

这也意味着你可以使用同个相同名称的变量保存不同类型的数据：

```js
var foo = 42;
// foo is a Number now

var foo = 'bar';
// foo is a String now

var foo = true;
// foo is a Boolean now
```

💡 ECMAScript 标准定义了**原始数据类型**和**引用数据类型**，共七种内置类型：

- 原始数据类型（基本类型）：按值访问，可以操作保存在变量中实际的值。
  - **空值**（null）
  - **未定义**（undefined）
  - **布尔值**（boolean）
  - **数字**（number）
  - **字符串**（string）
  - **符号**（symbol）
- 引用类型（复杂数据类型）：引用类型的值是保存在内存中的对象。
  - **对象**（Object）
    - 布尔对象（Boolean）
    - 数字对象（Number）
    - 字符串对象（String）
    - 函数对象（Function）
    - 数组对象（Array）
    - 日期对象（Date）
    - 正则对象（RegExp）
    - 错误对象（Error）

⚠️ **注意**： 与其他语言不同的是，JavaScript 不允许直接访问内存中的位置，也就是说不能直接操作对象的内存空间。在操作对象时，实际上是在操作对象的引用而不是实际的对象。所以引用类型的值是按引用访问的。

## 原始数据类型

### 空值

空值 `null` 是一个字面量，它不像 `undefined` 是全局对象的一个属性。

`null` 是表示缺少的标识，指示变量未指向任何对象。把 `null` 作为尚未创建的对象，也许更好理解。

🌰 **代码示例**：

`foo` 不存在，它从来没有被定义过或者是初始化过。

```js
foo;
> "ReferenceError: foo is not defined"
```

`foo` 现在已经是知存在的，但是它没有类型或者是值。

```js
var foo = null;
foo;
> null
```

### 未定义值

未定义值 `undefined` 是全局对象的一个属性。也就是说，它是全局作用域的一个变量。`undefined` 的最初值就是原始数据类型 `undefined`。

```js
var foo;

console.log(foo);
// undefined
```

### 布尔值

布尔类型表示一个逻辑实体，可以有两个值：`true` 和 `false`

### 数字

#### 进制数

- 十进制：JavaScript 中默认的进制数
- 八进制：第一位必须是 0，然后是 0-7 的数字组成
- 十六进制：前两位必须是 `0x`，然后是 0-9 及 A-F（字母不区分大小写）

```js
// 十进制
var num1 = 10;

// 八进制的56
var num2 = 070;

// 十进制，因为有数字超过了7，这里是79
var num3 = 079;

// 十六进制的31
var num4 = 0x1f;
```

⚠️ **注意**： 八进制在严格模式下 `"use strict"` 是无效的，会导致 JavaScript 报错，避免使用。

#### 浮点数

```js
var num = 0.1 + 0.2;
var sum = '2.3' * 100;

console.log(num);
// 0.30000000000000000004

console.log(sum);
// 229.99999999999997
```

上面例子表达的就是 JavaScript 的浮点型数据在计算时容易丢失精度，这一点并不仅在 JavaScript 存在，建议处理这方面问题使用专用的数字处理类，比如 Java 里的 BigDecima 类来处理。

#### 数字的范围

JavaScript 中数值的范围是有效位数的，基本上够我们使用，我们仅需要知道以下几个知识点：

- `Number.MIN_VALUE` 或 `Number.NEGATIVE_INFINITY`：表示 JavaScript 中的最小值
- `Number.MAX_VALUE` 或 `Number.POSITIVE_INFINITY`：表示 JavaScript 中的最大值
- `Infinity`：表示无穷大
- `-Infinity`：表示无穷小

#### NaN

`NaN` （Not a number）的含义是本该返回数值的操作未返回数值，返回了 `NaN` 就不会抛出异常影响语句流畅性。

`NaN` 属性的初始值就是 `NaN`，和 `Number.NaN` 的值一样。

在现代浏览器中（ES5 环境）， `NaN` 属性是一个不可配置（non-configurable）、不可写（non-writable）的属性。但在 ES3 中，这个属性的值是可以被更改的，但是也应该避免覆盖。

编码中很少直接使用到 `NaN`。通常都是在**计算失败**时，作为 `Math` 的某个方法的返回值出现的（例如：`Math.sqrt(-1)`）或者尝试将一个字符串解析成数字但失败了的时候（例如：`parseInt("blabla")`）。

### 字符串

JavaScript 的字符串类型用于表示文本数据。它是一组 16 位的无符号整数值的元素。在字符串中的每个元素占据了字符串的位置。第一个元素的索引为 0，下一个是索引 1，依此类推。字符串的长度是它的元素的数量。

```js
'foo';
'bar';
'1234';
'one line \n another line';
"John's cat";
```

### 符号

符号（Symbols）是 ECMAScript 第 6 版新定义的。该类型的性质在于这个类型的值可以用来创建匿名的对象属性。该数据类型通常被用作一个对象属性的键值，当这个属性是用于类或对象类型的内部使用的时候。

```js
var myPrivateMethod = Symbol();

this[myPrivateMethod] = function () {
  // ...
};
```

## 引用数据类型

引用类型通常叫做类（Class），也就是说，遇到引用值，所处理的就是对象。

在 ECMA-262 标准中根本没有出现 **类** 这个词，而是定义了 **对象定义**，逻辑上等价于其他程序设计语言中的类。

对象是由 `new` 运算符加上要实例化的对象的名字创建的。

例如，下面的代码创建 Object 对象的实例：

```js
var o = new Object();
```

这种语法与 Java 语言的相似，不过当有不止一个参数时，ECMAScript 要求使用括号。

如果没有参数，如以下代码所示，括号可以省略：

```js
var o = new Object();
```

尽管括号不是必需的，但是为了避免混乱，最好使用括号。

---

**参考资料**：

- [📖 Symbol 术语表](https://developer.mozilla.org/zh-CN/docs/Glossary/Symbol)
- [📖 Global Objects](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects)
