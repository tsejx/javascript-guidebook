# 数据结构和类型

## 动态类型

JavaScript 是一种弱类型或者说动态语言。这意味着你不用提前声明变量的类型，在程序运行过程中，类型会被自动确定。这也意味着你可以使用同一个变量保存不同类型的数据：

```javascript
var foo = 42;    // foo is a Number now
var foo = "bar"; // foo is a String now
var foo = true;  // foo is a Boolean now
```

## 数据类型

ECMAScript标准定义了原始数据类型和引用数据类型，共七种内置类型：

 - 原始数据类型（基本类型）：按值访问，可以操作保存在变量中实际的值。
    - **空值**（null）
    - **未定义**（undefined）
    - **布尔值**（boolean）
    - **数字**（number）
    - **字符串**（string）
    - **符号**(symbol)
 - 引用类型（复杂数据类型）)：引用类型的值是保存在内存中的对象。
     - **对象**（object）
        - 布尔对象（Boolean）
        - 数字对象（Number）
        - 字符串对象（String）
        - 函数对象（Function）
        - 数组对象（Array）
        - 日期对象（Date）
        - 正则对象（RegExp）
        - 错误对象（Error）

★ 与其他语言不同的是，JavaScript不允许直接访问内存中的位置，也就是说不能直接操作对象的内存空间。在操作对象时，实际上是在操作对象的引用而不是实际的对象。所以引用类型的值是按引用访问的。

### 原始数据类型

#### 空值

空值 `null` 是一个字面量，它不像 `undefined` 是全局对象的一个属性。

`null` 是表示缺少的标识，指示变量未指向任何对象。把 null 作为尚未创建的对象，也许更好理解。

```javascript
// foo不存在，它从来没有被定义过或者是初始化过：
foo;
"ReferenceError: foo is not defined"

// foo现在已经是知存在的，但是它没有类型或者是值：
var foo = null; 
foo;
null
```

#### 未定义值

未定义值 `undefined` 是全局对象的一个属性。也就是说，它是全局作用域的一个变量。`undefined` 的最初值就是原始数据类型 `undefined`。

```javascript
var foo;
console.log(foo); /// undefined
```

#### 布尔值

布尔类型表示一个逻辑实体，可以有两个值：`true` 和 `false`。

#### 数字

##### 进制数

 - 十进制：js中默认的进制数
 - 八进制：第一位必须是零，然后是0-7的数字组成
 - 十六进制：前两位必须是0x，然后是0-9及A-F（字母不区分大小写）

```javascript
var num1 = 10;    // 十进制
var num2 = 070;   // 八进制的56
var num3 = 079;   // 十进制，因为有数字超过了7，这里是79
var num4 = 0x1f;  // 十六进制的31
```

★ 八进制在严格模式下（"use strict"）是无效的，会导致js报错，避免使用。

##### 浮点值（即小数） 

```javascript
var num = 0.1 + 0.2;
alert(num);  // 返回结果：0.30000000000000000004
```

上面例子表达的就是JavaScript的浮点型数据在计算时容易丢失精度，这一点并不仅在JavaScript存在，建议处理这方面问题使用专用的数字处理类，比如Java里的BigDecima类来处理。这里略过。

##### 数字的范围 

JavaScript中数值的范围是有效位数的，基本上够我们使用，我们仅需要知道以下几个知识点：

- `Number.MIN_VALUE`（或 `Number.NEGATIVE_INFINITY` ）：表示JavaScript中的最小值
- `Number.MAX_VALUE`（或 `Number.POSITIVE_INFINITY` ）：表示JavaScript中的最大值
- `Infinity`：表示无穷大
- `-Infinity`：表示无穷小

```javascript
var num = Number.MAX_VALUE + Number.MAX_VALUE;
alert(isFinite(num));    // 返回 false，无穷大加无穷大超出js数值范围
```

##### NaN (not a number) 

`NaN` 的含义是本该返回数值的操作未返回数值，返回了 `NaN` 就不会抛出异常影响语句流畅性。

`NaN` 属性的初始值就是 `NaN`，和 `Number.NaN` 的值一样。

在现代浏览器中（ES5中）， `NaN` 属性是一个不可配置（non-configurable），不可写（non-writable）的属性。但在ES3中，这个属性的值是可以被更改的，但是也应该避免覆盖。

编码中很少直接使用到 `NaN`。通常都是在**计算失败**时，作为 `Math` 的某个方法的返回值出现的（例如：`Math.sqrt(-1)`）或者尝试将一个字符串解析成数字但失败了的时候（例如：`parseInt("blabla")`）。

#### 字符串

JavaScript的字符串类型用于表示文本数据。它是一组16位的无符号整数值的“元素”。在字符串中的每个元素占据了字符串的位置。第一个元素的索引为0，下一个是索引1，依此类推。字符串的长度是它的元素的数量。

```javascript
'foo'
"bar"
'1234'
'one line \n another line'
"John's cat"
```

#### 符号

符号(Symbols)是ECMAScript 第6版新定义的。该类型的性质在于这个类型的值可以用来创建匿名的对象属性。该数据类型通常被用作一个对象属性的键值，当这个属性是用于类或对象类型的内部使用的时候。

```javascript
var  myPrivateMethod  = Symbol();
this[myPrivateMethod] = function() {...};
```

更多细节请看 [Symbol][1] 。

### 引用数据类型

引用类型通常叫做类（class），也就是说，遇到引用值，所处理的就是对象。

★ 从传统意义上来说，ECMAScript 并不真正具有类。事实上，除了说明不存在类，在 ECMA-262 中根本没有出现“类”这个词。ECMAScript 定义了“对象定义”，逻辑上等价于其他程序设计语言中的类。

对象是由 `new` 运算符加上要实例化的对象的名字创建的。例如，下面的代码创建 `Object` 对象的实例：

```javascript
var o = new Object();
```

这种语法与 Java 语言的相似，不过当有不止一个参数时，ECMAScript 要求使用括号。如果没有参数，如以下代码所示，括号可以省略：

```javascript
var o = new Object;
```

★ 尽管括号不是必需的，但是为了避免混乱，最好使用括号。


#### 标准内置对象的分类

##### 值属性

这些全局属性返回一个简单值，这些值没有自己的属性和方法。

 - `Infinity`
 - `NaN`
 - `undefined`
 - `null` 字面量

#### 基本对象

顾名思义，基本对象是定义或使用其他对象的基础。基本对象包括一般对象、函数对象和错误对象。

 - `Object`
 - `Function`
 - `Boolean`
 - `Symbol`
 - `Error`

错误对象 共有8种类型对象 具体参考 [JavaScript标准库][2]

##### 数字和日期对象

用来表示数字、日期和执行数学计算的对象。

 - `Number`
 - `Math`
 - `Date`

##### 字符串

用来表示和操作字符串的对象。

 - `String`
 - `RegExp`

##### 可索引的集合对象

这些对象表示按照索引值来排序的数据集合，包括数组和类型数组，以及类数组结构的对象。

 - `Array`

错误对象 共有8种类型对象 具体参考 [JavaScript标准库][2]

##### 使用键的集合对象

这些集合对象在存储数据时会使用到键，支持按照插入顺序来迭代元素。

 - `Map`
 - `Set`
 - `WeakMap`
 - `WeakSet`

##### 控制抽象对象

 - `Promise`
 - `Generator`
 - `GeneratorFunction`
 - `AsyncFunction`

## 类型检测

### typeof

`typeof` 操作符返回一个字符串，表示未经计算的操作数的类型。

```javascript
typeof 100 // "number"
typeof true // "boolean"
typeof function // "function"
typeof(undefined)  // "undefined"
typeof new Oject()  // "object"
typeof [1, 2]   // "object"
typeof NaN  // "number"
typeof null // "object"
```

★ `typeof` 操作符对于基本类型判断是没有问题的，但是遇到引用数据类型（如：Array）是不起作用的。

★ `typeof` 操作符适合对基本类型（除 `null` 之外）及 `function` 的检测使用，而对引用数据类型（如 Array）等不适合使用。

更详细信息请参考 typeof

### instanceof

`instanceof` 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。

左操作数为**对象**，不是就返回 `false`,右操作数必须是**函数对象**或者**函数构造器**，不是就返回 `typeError` 异常。

```javascript
object instanceof constructor
```

```javascript
function Person(){}
function Student(){}
Student.prototype = new Person()
Student.prototype.constructor = Student

var bosn = new Student()
bosn instanceof Student  // true

var one = new Person()
one instanceof Person    // true
one instanceof Student   // false
bosn instanceof Person  // true
```

任何一个构造函数都有一个 `prototype` 对象属性，这个对象属性将用作 `new` 出来的对象的原型。

★ `instanceof` 适合用于判断对象是否属于数组Array，日期Date，正则RegExp等内置对象。


★ 不同 `window` 或 `iframe` 之间的对象类型检测无法使用 `instanceof` 检测。

更详细信息请参考 instanceof

### Object.prototype.toString

可以通过 `toString()` 来获取每个对象的类型。为了每个对象都能通过 `Object.prototype.toString()` 来检测，需要以 `Function.prototype.call()` 或者 `Function.prototype.apply()` 的形式来调用，传递要检查的对象作为第一个参数。

```javascript
Obejct.prototype.toString.call(undefined)； //  "[object Undefined]"
Obejct.prototype.toString.call(null)；      //  "[object Null]"
Obejct.prototype.toString.call(true)；      //  "[object Boolean]"
Obejct.prototype.toString.call('')；        /// "[object String]"
Obejct.prototype.toString.call(123)；       //  "[object Number]"
Obejct.prototype.toString.call([])；        //  "[object Array]"
Obejct.prototype.toString.call({})；        //  "[object Object]"
```

★ 使用 `Object.prototype.toString` 方法能精准地判断出值的数据类型。

★ `Object.prototype.toString` 属于 `Object` 的原型方法，而 `Array` ， `Function` 等类型作为 `Object` 的实例，都重写了 `toString` 方法。因此，不同对象类型调用 `toString` 方法时，调用的是重写后的 `toString` 方法，而非 `Object` 上原型 `toString` 方法，所以采用 `obj.toString()` 不能得到其对象类型，只能将 `obj` 转换成字符串类型。

### constructor

任何对象都有 `constructor` 属性，继承自原型，`constructor` 会指向构造这个对象的构造器或构造函数。

```
Student.prototype.constructor === Student   //  true
```

### 数组检测

ECMAScript5将 `Array.isArray()` 正式引入 JavaScript，提供了一个能在准确检测一个变量是否为数组类型的方法。 

```javascript
Array.isArray(variable);
```


## 类型转换

### 显式类型转换

通过手动进行类型转换，Javascript提供了以下转型函数：

 - 转换为数值类型
     - Number(mix)
     - parseInt(string, radix)
     - parseFloat(string)
 - 转换为字符串类型
     - toString(radix)
     - String(mix)
 - 转换为布尔类型
     - Boolean(mix)

### 隐式类型转换

在某些情况下，即使我们不提供显示转换，Javascript也会进行自动类型转换。 

#### 相等操作符

相等操作符会对操作值进行隐式转换后进行比较

 - 如果一个操作值为布尔值，则在比较之前先将其转换为数值
 - 如果一个操作值为字符串，另一个操作值为数值，则通过Number()函数将字符串转换为数值
 - 如果一个操作值是对象，另一个不是，则调用对象的valueOf()方法，得到的结果按照前面的规则进行比较
 - null与undefined是相等的
 - 如果一个操作值为NaN，则相等比较返回false
 - 如果两个操作值都是对象，则比较它们是不是指向同一个对象

#### 关系操作符

 - 如果两个操作值都是数值，则进行**数值**比较
 - 如果两个操作值都是字符串，则比较字符串对应的**字符编码值**
 - 如果只有一个操作值是数值，则将另一个操作值转换为数值，进行**数值**比较
 - 如果一个操作数是对象，则调用 `valueOf()` 方法（如果对象没有 `valueOf()` 方法则调用 `toString()` 方法），得到的结果按照前面的规则执行比较
 - 如果一个操作值是布尔值，则将其转换为**数值**，再进行比较 

★ `NaN` 是非常特殊的值，它不和任何类型的值相等，包括它自己，同时它与任何类型的值比较大小时都返回false。


  [1]: https://developer.mozilla.org/zh-CN/docs/Glossary/Symbol
  [2]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects