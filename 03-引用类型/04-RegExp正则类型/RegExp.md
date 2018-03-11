# RegExp 正则表达式类型

正则表达式（Regular Expression）使用单个字符串来描述、匹配一系列匹配某个句法规则的字符串。在许多文本编辑器里，正则表达式通常被用来检索、替换那些匹配某个模式的文本。

## 目录

* [RegExp语法](#RegExp语法)
  * [组成](#组成)
  * [写法](#写法)
* [RegExp属性](#RegExp属性)
  * [通用属性](#通用属性)
  * [RegExp构造函数属性](#RegExp构造函数属性)
* [RegExp方法](#RegExp方法)
  * [exec()](#exec())
  * [test()](#test())

## RegExp语法

### 组成

JavaScript中的正则表达式RegExp由两部分(参数)组成：`pattern`（文本部分） 和 `flags`（匹配模式部分）。

#### 文本规则（Pattern）

规则详情请参考 [正则表达式文本规则][1]

#### 匹配模式（Flags）

　　正则表达式的匹配模式支持下列3个标识：

|  标识   |  模式   |  描述  |
| --- | --- | --- |
|`g`|全局(global)模式|即模式将被应用于所有字符串，而非在发现第一个匹配项时立即停止|
|`i`|忽略大小写(case-insensitive)模式|即在确定匹配项时忽略模式与字符串的大小写|
|`m`|多行(multiline)模式|即在到达一行文本末尾时还会继续查找下一行中是否存在与模式匹配的项|

### 写法

#### 字面量

　　正则表达式字面量写法，又叫Perl写法，因为JavaScript的正则表达式特性借鉴自Perl。

　　正则表达式字面量定义有如下特点

 - 字面量正则文本部分包含在一对斜杠 `/` 之间
 - 字面量参数不使用引号
　　
```javascript
/pattern/flags;
```

#### 工厂符号

```javascript
RegExp(pattern [, flags])
```

工厂符号式正则写法与构造函数类似，赋值是一样的。

#### 构造函数

和普通的内置对象一样，RegExp正则表达式对象也支持 `new RegExp()` 构造函数的形式。
　　
RegExp构造函数接收两个参数：

- 要匹配的字符串模式(pattern)
- 可选的标志字符串(flags)
　　
```javascript
new RegExp('at','gim');
```

　　RegExp构造函数的两个参数都是**字符串**。且使用字面量形式定义的任何表达式都可使用构造函数。

```javascript
// 匹配字符串所有'at'的实例
var regexp1 = /at/g;
// 同上
var regexp2 = new RegExp('at','g');
```

★ ECMAScript3规范规定，一个正则表达式直接量会在执行到它时转换为一个RegExp对象，同一段代码所表示正则表达式直接量的每次运算都返回同一个对象。ECMAScript5规范则做了相反的规定，同一段代码所表示的正则表达式直接量的每次运算都返回新对象。IE6-8一直是按照ECMAScript5规范的方式实现的，所以并没有兼容性问题。

★ 由于**正则表达式字面量并不支持变量**，所以如果正则表达式中出现变量只能使用RegExp构造函数以字符串拼接的形式，将变量拼接到RegExp构造函数的参数中。

```javascript
// example
let variable = 'low'

let regexp = new RegExp( '^Hel'+ variable + 'orld$', 'gim');
console.log(regexp);  // /^Helloworld$/gim
```

★ 从ECMAScript 6开始，当第一个参数为正则表达式而第二个标志参数存在时，`new RegExp(/ab+c/, 'i')` 不再抛出 `TypeError` （“当从其他正则表达式进行构造时不支持标志”）的异常，取而代之，将使用这些参数创建一个新的正则表达式。

★ 当使用构造函数创造正则对象时，需要常规的字符转义规则（在前面加反斜杠 \）。比如，以下是等价的：

```javascript
// example1
let regexp = new RegExp("\\w+");

// example2
let regexp = /\w+/;
```

## RegExp属性

### 通用属性

　　每个RegExp实例对象都包含如下5个属性

属性|描述
:---:|:---:
global:bol|布尔值，表示是否设置了g标志
ignoreCase:bol|布尔值，表示是否设置了i标志
lastIndex:num|整数，表示开始搜索下一个匹配项的字符位置，从0算起
multiline:bol|布尔值，表示是否设置了标志m
source:str|正则表达式的字符串表示，按照字面量形式而非传入构造函数中的字符串模式返回


```javascript
// example
var regexp = new RegExp('\\[bc\\]at','i');

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

　　如果使用RegExp的 `exec()` 或 `test()` 函数，并且设定了全局模式 `'g'` ，正则表达式的匹配就会从 `lastIndex` 的位置开始，并且在每次匹配成功之后重新设定 `lastIndex`。这样，就可以在字符串中重复迭代，依次寻找各个匹配结果。但是，如果需要对不同字符串调用同一个RegExp的 `exec()` 或 `test()` 方法，这个变量也可能会带来意料之外的匹配结果，所以在更换字符串时，要显式地将RegExp的 `lastIndex` 置为0。

```javascript
//exec()方法以数组形式返回匹配项
let regexp = /\w/g;
let s = 'ab';

console.log(regexp.lastIndex); // 0

console.log(regexp.exec(s)); // ['a']
console.log(regexp.lastIndex); // 1

console.log(regexp.exec(s)); // ['b']
console.log(regexp.lastIndex); // 2

console.log(regexp.exec(s)); // null
console.log(regexp.lastIndex); // 0
```

```javascript
let regexp = /\w/g;
let s1 = 'ab';
let s2 = 'ba';

console.log(regexp.lastIndex);  // 0

console.log(regexp.exec(s1));  // ['a']
console.log(regexp.lastIndex);  // 1

console.log(regexp.exec(s2));  // ['a']
console.log(regexp.lastIndex);  // 2
```

### RegExp构造函数属性

　　RegExp构造函数属性被看成静态属性，这些属性基于所执行的最近一次正则表达式操作而变化

　　有两种方式访问它们，即长属性名和短属性名。短属性名大都不是有效的ECMAScript标识符，所以必须通过方括号语法来访问它们


长属性名     |       短属性名       |　　　　     说明
:-----------:|:--------------------:|:--------------------------------------:
input        |         \$_           |     最近一次要匹配的字符串
lastMatch    |         \$&           |     最近一次的匹配项
lastParen    |         \$+           |     最近一次匹配的捕获组
leftContext  |         \$`           |     input字符串中lastMatch之前的文本
multiline    |         \$*           |     布尔值，表示是否所有表达式都使用多行模式
rightContext |         \$'           |     input字符串中lastMatch之后的文本


　　使用这些属性，可以从 `exec()` 方法或 `test()` 方法执行的操作中提取出更具体的信息。

```javascript
// test()用于测试一个字符串是否匹配某个正则表达式，并返回一个布尔值
let text = 'this has been a short summer';
let regexp = /(.)hort/g;

if(regexp.test(text)){
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

　　Javascript有9个用于存储捕获组的构造函数属性，在调用 `exec()` 或 `test()` 方法时，这些属性会被自动填充

★  理论上，应该保存整个表达式匹配文本的 `RegExp.$0` 并不存在，值为 `undefined`

```javascript
// RegExp.$1\RegExp.$2\RegExp.$3……到RegExp.$9分别用于存储第一、第二……第九个匹配的捕获组
var text = 'this has been a short summer';
var pattern = /(..)or(.)/g;
if(pattern.test(text)){
    console.log(RegExp.$1); // sh
    console.log(RegExp.$2); // t
}
```

## RegExp方法

　　正则表达式RegExp对象的正则匹配方法只有两个：分别是 `exec()` 和 `test()`。

### exec()

　　`exec()` 方法专门为捕获组而设计，该方法在一个指定字符串中执行一个搜索匹配。然后返回包含匹配项信息的数组，在没有匹配项的情况下返回 `null`。
　　
#### 语法

　　在匹配项数组中，第一项是与整个模式匹配的字符串，其他项是与模式中的捕获组匹配的字符串，如果模式中没有捕获组，则该数组只包含一项。
　　
```javascript
regexp.exec(str)
```

**参数**

 - **`str`**
    要匹配正则表达式的字符串。

**返回值**

 - 如果匹配成功，exec() 方法返回一个数组，并更新正则表达式对象的属性。返回的数组将完全匹配成功的文本作为第一项，将正则括号里匹配成功的作为数组填充到后面。
 - 如果匹配失败，exec() 方法返回 null。

　　返回的数组包含两个额外的属性

|属性|描述|
|---|---|
|`index`|表示匹配项在字符串的位置|
|`input`|表示应用正则表达式的字符串|

#### 示例

```javascript
// Match "quick brown" followed by "jumps", ignoring characters in between
// Remember "brown" and "jumps"
// Ignore case
let regexp = /quick\s(brown).+?(jumps)/ig;
let result = regexp.exec('The Quick Brown Fox Jumps Over The Lazy Dog');
```

下表列出这个脚本的返回值：

**对象 result**

|属性/索引|描述|例子|
|---|---|---|
|`[0]`|匹配的全部字符串	|`'Quick Brown Fox Jumps'`|
|`[1],...,[n]`|括号中的分组捕获|`[1] = Brown` `[2] = Jumps`|
|`index`|匹配到的字符位于原始字符串的基于0的索引值|`4`|
|`input`|原始字符串|`'The Quick Brown Fox Jumps Over The Lazy Dog'`|

**对象 regexp**

|属性/索引|描述|例子|
|---|---|---|
|`lastIndex`|下一次匹配开始的位置		|`25`|
|`ignoreCase`|是否使用了'i'标记使正则匹配忽略大小写|`true`|
|`global`|是否使用了'g'标记来进行全局的匹配|`true`|
|`multiline	`|是否使用了'm'标记使正则工作在多行模式（也就是，^ 和 $ 可以匹配字符串中每一行的开始和结束（行是由 \n 或 \r 分割的），而不只是整个输入字符串的最开始和最末尾处。）|`false`|
|`source	`|正则匹配的字符串|`quick\s(brown).+?(jumps)`|

### test()

　　`test()` 方法用来测试正则表达式能否在字符串中找到匹配文本，接收一个字符串参数，匹配时返回 `true`，否则返回 `false`。

#### 语法

```javascript
regexp.test(str)
```

**参数**

 - **`str`**
    用来与正则表达式匹配的字符串

**返回值**

如果正则表达式与指定的字符串匹配 ，返回 `true`；否则 `false`。

★ 当你想要知道一个模式是否存在于一个字符串中时，就可以使用 `test()`（类似于 `String.prototype.search()` 方法），差别在于 `test()` 返回一个布尔值，而 `search()`  返回索引（如果找到）或者-1（如果没找到）；若想知道更多信息（然而执行比较慢），可使用 `exec()` 方法（类似于 `String.prototype.match()` 方法）。 和 `exec()` (或者组合使用),一样，在相同的全局正则表达式实例上多次调用 `test()` 将会越过之前的匹配。

#### 实例

**使用test()**

一个简单的例子，测试 "hello" 是否包含在字符串的最开始，返回布尔值。

```javascript
let str = 'hello world!';
let result = /^hello/.test(str);

console.log(result); // true
```

**当设置全局标志的正则使用test()**

如果正则表达式设置了全局标志，test() 的执行会改变正则表达式   lastIndex属性。连续的执行test()方法，后续的执行将会从 lastIndex 处开始匹配字符串，(exec() 同样改变正则本身的 lastIndex属性值).

下面的实例表现了这种行为： 

```javascript
var regex = /foo/g;

// regex.lastIndex is at 0
regex.test('foo'); // true

// regex.lastIndex is now at 3
regex.test('foo'); // false
```

  [1]: https://github.com/tsejx/JavaScript-Guidebook/blob/master/03-%E5%BC%95%E7%94%A8%E7%B1%BB%E5%9E%8B/04-RegExp%E6%AD%A3%E5%88%99%E7%B1%BB%E5%9E%8B/RegExpRule.md