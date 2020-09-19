---
nav:
  title: 内置对象
  order: 2
group:
  title: RegExp
  path: /text-processing/regexp/
  order: 10
title: RegExp
order: 1
---

# RegExp 对象

正则表达式（Regular Expression）使用单个字符串来描述、匹配一系列匹配某个句法规则的字符串。在许多文本编辑器里，正则表达式通常被用来检索、替换那些匹配某个模式的文本。

`RegExp` 构造函数创建一个正则表达式对象，用于将文本与一个模式匹配。

## 语法

**字面量**

- 字面量正则文本部分**包含在一对斜杠 `/` 之间**
- 字面量参数**不使用引号**

```js
/pattern/afgls;
```

**正则表达式转换函数**

```js
RegExp(pattern [, flags])
```

**构造函数**

- 要匹配的字符串模式（pattern）
- 可选的标志字符串（flags）

```js
new RegExp('at', 'gim');
```

`RegExp` 构造函数的两个参数都是**字符串**。且使用字面量形式定义的任何表达式都可使用构造函数。

```js
// 匹配字符串所有'at'的实例
var regexp1 = /at/g;
// 同上
var regexp2 = new RegExp('at', 'g');
```

JavaScript 中的正则表达式 `RegExp` 由两部分（参数）组成：`pattern`（文本部分） 和 `flags`（匹配模式部分）。

### 文本规则

规则详情请参考 正则表达式文本规则。

### 匹配模式

正则表达式的匹配模式支持下列 3 个标识：

| 标识 | 模式                               | 描述                                                             |
| ---- | ---------------------------------- | ---------------------------------------------------------------- |
| `g`  | 全局（global）模式                 | 即模式将被应用于所有字符串，而非在发现第一个匹配项时立即停止     |
| `i`  | 忽略大小写（case-insensitive）模式 | 即在确定匹配项时忽略模式与字符串的大小写                         |
| `m`  | 多行（multiline）模式              | 即在到达一行文本末尾时还会继续查找下一行中是否存在与模式匹配的项 |

## 描述

- ECMAScript3 规范规定，一个正则表达式直接量会在执行到它时转换为一个 `RegExp` 对象，同一段代码所表示正则表达式直接量的每次运算都返回同一个对象。ECMAScript5 规范则做了相反的规定，同一段代码所表示的正则表达式直接量的每次运算都返回新对象。IE6-8 一直是按照 ECMAScript5 规范的方式实现的，所以并没有兼容性问题。

* 由于**正则表达式字面量并不支持变量**，所以如果正则表达式中出现变量只能使用 `RegExp` 构造函数以字符串拼接的形式，将变量拼接到 `RegExp` 构造函数的参数中。

```js
// example
let variable = 'low';

let regexp = new RegExp('^Hel' + variable + 'orld$', 'gim');
console.log(regexp); // /^Helloworld$/gim
```

- 从 ECMAScript 6 开始，当第一个参数为正则表达式而第二个标志参数存在时，`new RegExp(/ab+c/, 'i')` 不再抛出 `TypeError` （“当从其他正则表达式进行构造时不支持标志”）的异常，取而代之，将使用这些参数创建一个新的正则表达式。
- 当使用构造函数创造正则对象时，需要常规的字符转义规则（在前面加反斜杠 \）。比如，以下是等价的：

```js
// example1
let regexp = new RegExp('\\w+');

// example2
let regexp = /\w+/;
```

## 原型对象

### 原型属性

每个 `RegExp` 实例对象都包含如下 5 个属性。

|              属性              | 描述                                                                               |
| :----------------------------: | ---------------------------------------------------------------------------------- |
| `RegExp.prototype.constructor` | 创建该正则对象的构造函数                                                           |
|   `RegExp.prototype.global`    | 是否开启全局匹配，也就是匹配目标字符串中所有可能的匹配项，而不是只进行第一次匹配。 |
| `RegExp.prototype.ignoreCase`  | 在匹配字符串时是否要忽略字符的大小写。                                             |
|  `RegExp.prototype.lastIndex`  | 整数，表示开始搜索后下一个匹配项的字符索引位置，从 0 算起。                        |
|  `RegExp.prototype.multiline`  | 是否开启多行模式匹配（影响 `^` 和 `$` 的行为）                                     |
|   `RegExp.prototype.source`    | 正则表达式的字符串表示，按照字面量形式而非传入构造函数中的字符串模式返回           |

```js
// example
var regexp = new RegExp('\\[bc\\]at', 'i');

// global
console.log(regexp.global); // false

// ignoreCase
console.log(regexp.ignoreCase); // true

// multiline
console.log(regexp.multiline); // false

// lastIndex
console.log(regexp.lastIndex); // 0

// source
console.log(regexp.source); // '\[bc\]at'
```

### 原型方法

| 方法                                                                          | 描述                                                                             |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| [RegExp.prototype.exec()](properties-of-the-regexp-prototype-objects/exec) | 在一个指定字符串中执行一个搜索匹配。返回一个结果数组或 `null`。                  |
| [RegExp.prototype.test()](properties-of-the-regexp-prototype-objects/test) | 执行一个检索，用来查看正则表达式与指定的字符串是否匹配。返回 `true` 或 `false`。 |

## 构造函数

### 属性

`RegExp` 构造函数属性被看成静态属性，这些属性基于所执行的最近一次正则表达式操作而变化。

有两种方式访问它们，即**长属性名**和**短属性名**。短属性名大都不是有效的 ECMAScript 标识符，所以必须通过方括号语法来访问它们。

|   长属性名   |                 短属性名                  |              　　　　 说明               |
| :----------: | :---------------------------------------: | :--------------------------------------: |
|    input     |                   \$\_                    |          最近一次要匹配的字符串          |
|  lastMatch   |                    \$&                    |             最近一次的匹配项             |
|  lastParen   |                    \$+                    |           最近一次匹配的捕获组           |
| leftContext  | \$` | input 字符串中 lastMatch 之前的文本 |
|  multiline   |                   \$\*                    | 布尔值，表示是否所有表达式都使用多行模式 |
| rightContext |                    \$'                    |   input 字符串中 lastMatch 之后的文本    |

使用这些属性，可以从 `exec()` 方法或 `test()` 方法执行的操作中提取出更具体的信息。

```js
// test()用于测试一个字符串是否匹配某个正则表达式，并返回一个布尔值
let text = 'this has been a short summer';
let regexp = /(.)hort/g;

if (regexp.test(text)) {
  console.log(RegExp.input); // 'this has been a short summer'
  console.log(RegExp.leftContext); // 'this has been a '
  console.log(RegExp.rightContext); // ' summer'
  console.log(RegExp.lastMatch); // 'short'
  console.log(RegExp.lastParen); // 's'
  console.log(RegExp.multiline); // false

  console.log(RegExp['$_']); // 'this has been a short summer'
  console.log(RegExp['$`']); // 'this has been a '
  console.log(RegExp["$'"]); // ' summer'
  console.log(RegExp['$&']); // 'short'
  console.log(RegExp['$+']); // 's'
  console.log(RegExp['$*']); // false
}
```

JavaScript 有 9 个用于存储捕获组的构造函数属性，在调用 `exec()` 或 `test()` 方法时，这些属性会被自动填充

理论上，应该保存整个表达式匹配文本的 `RegExp.$0` 并不存在，值为 `undefined` 。

```js
// RegExp.$1\RegExp.$2\RegExp.$3……到RegExp.$9分别用于存储第一、第二……第九个匹配的捕获组
var text = 'this has been a short summer';
var pattern = /(..)or(.)/g;
if (pattern.test(text)) {
  console.log(RegExp.$1); // sh
  console.log(RegExp.$2); // t
}
```
