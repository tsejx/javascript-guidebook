# typeof 操作符

## 概述

typeof操作符返回一个字符串，指示未经计算的操作数的类型。


**语法**
```javascript
typeof operand
```

**参数**

> `operand` 是一个表达式，表示对象或原始值，其类型将被返回。

## 描述

下表总结了 typeof 可能的返回值。

|类型|结果|
|:---:|:---:|
|Undefined|'undefined'|
|Null|'object'|
|Boolean|'boolean'|
|Number|'number'|
|String|'string'|
|Symbol|'symbol'|
|宿主对象(由JS环境提供)|Implementation-dependent|
|函数对象|'function'|
|任何其他对象|'object'|

## 例子

**常规例子**

```javascript
// Number
typeof 37 === 'number';
typeof 3.14 === 'number';
typeof Math.LN2 === 'number';
typeof Infinity === 'number';
typeof NaN === 'number'; // 尽管NaN是"Not-A-Number"的缩写
typeof Number(1) === 'number'; // 但不要使用这种形式!

// String
typeof "" === 'string';
typeof "bla" === 'string';
typeof (typeof 1) === 'string'; // typeof总是返回一个字符串
typeof String("abc") === 'string'; // 但不要使用这种形式!

// Boolean
typeof true === 'boolean';
typeof false === 'boolean';
typeof Boolean(true) === 'boolean'; // 但不要使用这种形式!

// Symbols
typeof Symbol() === 'symbol';
typeof Symbol('foo') === 'symbol';
typeof Symbol.iterator === 'symbol';

// Undefined
typeof undefined === 'undefined';
typeof declaredButUndefinedVariable === 'undefined';
typeof undeclaredVariable === 'undefined'; 

// Object
typeof {a:1} === 'object';

// Array
// 使用Array.isArray 或者 Object.prototype.toString.call 区分数组,普通对象
typeof [1, 2, 4] === 'object';
typeof new Date() === 'object';

// 下面的容易令人迷惑，不要使用！
// 构造函数
typeof new Boolean(true) === 'object';
typeof new Number(1) ==== 'object';
typeof new String("abc") === 'object';

// Function
typeof function(){} === 'function';
typeof Math.sin === 'function';

// NaN
typeof 1/0 === 'NaN';
```

**特殊例子**

```javascript
// null
typeof null === 'object';

// RegExp
typeof /s/ === 'function'; // Chrome 1-12 , 不符合 ECMAScript 5.1
typeof /s/ === 'object'; // Firefox 5+ , 符合 ECMAScript 5.1
```

在 JavaScript 最初的实现中，JavaScript 中的值是由一个表示类型的标签和实际数据值表示的。对象的类型标签是0。由于 null 代表的是空指针(大多数平台下值为0x00)，因此，null的类型标签也成为了0，typeof null就错误的返回了"object"。

> 详细了解 typeof null === 'object'的来源
[ The history of “typeof null” ][1]
[【译】typeof null的前世今生 ][2]

## 示例

### 检查一个变量是否存在，是否有值

`typeof` 在两种情况下会返回 `undefined`

 - 一个变量**没有被声明**的时候
 - 一个变量的值是`undefined`时

```javascript
typeof undeclaredVariable === 'undefined' // true

var declaredVariable;
typeof declaredVariable // 'undefined'
typeof undefined // 'undefined'
```

还有其他方法检测某个值是否是undefined

```javascript
var value = undefined;
value === undefined; // true
```

但这种方法如果使用在一个**未声明的变量**上的时候,就会抛出异常,因为只有typeof才可以正常检测未声明的变量的同时还不报错:

```
undeclaredVariable === undefined // ReferenceError:undeclaredVariable is not defined

```

 - 注意未初始化的变量，没有被传入参数的形参；
 - 不存在的属性，都不会出现上面的问题，因为它们总是可访问的，值总是undefined

```javascript
var declaredVariable;
declaredVarialbe === undefined // true
(function(x){return x === undefined})() // true
({}).foo === undefined // true
```

因此：如果想检测一个**可能没有被声明的全局变量是否存在**，也可以使用if(window.maybeUndeclaredVariable){}

问题：typeof 在完成这样的任务时显得很繁杂

解决办法：这样的操作不是很常见，所以有人觉得没有必要再找更好的解决办法，不过也许有人会提出一个专门的的操作符

```javascript
defined undeclaredVariable // false

var declareVariable
declared declaredVariable // true
```

注：在perl里，上面的defined操作符相当于defined(),上面的declared操作符相当于exists()

### 判断一个值不等于undefined也不等于null

问题：如果你想检测一个值是否被定义过（值不是undefined也不是null）那么你就遇到了typeof最有名的一个怪异表现：typeof null 返回 'object'

```javascript
typeof null // 'object'
```
译者注：这只能说是最初的JavaScript实现的bug，而现在标准就是这样规范的，V8曾经修正并实现过`typeof null === 'null'`，但最终证明不可行
 
 解决办法：不要使用typeof来做这项任务，用下面的函数来代替
 
 ```javascript
function isDefined(x) {
    return x !== null && x !== undefined;
}
 ```
 另一个可能性是引入一个'默认值运算符'，在myValue未定义的情况下，下面的表达式会返回`defaultValue`：
 
 ```javascript
 myValue ?? defaultValue
 ```
上面的表达式等价于

```javascript
(myValue !== undefined && myValue !== null) ? myValue:default
```
 又或者
 ```javascript
 myValue ??= defaultValue
 ```
其实是下面这条语句的简化：
```javascript
myValue = myValue ?? dafaultValue
```
当你访问一个嵌套的属性时，比如 bar，你或许会需要这个运算符的帮助
```javascript
obj.foo.bar
```
如果obj或者obj.foo是未定义的，上面的表达式会抛出异常，一个运算符.??可以让上面的表达式在遍历一层一层的属性时,返回第一个遇到的值为`undefined`或`null`的属性:
 ```javascript
 obj.??foo.??bar
 ```
 上面的表达式等价于：
 ```javascript
 (obj === undefined || obj === null) ? obj : (obj.foo === undefined || obj.foo === null) ? obj.foo : obj.foo.bar
 ```

### 区分对象值和原始值

下面的函数用来检测x是否是一个对象值:

```javascript
function isObject(x) { 
    return (typeof x === "function" || (typeof x === "object" && x !== null)); 
} 
```

问题: 上面的检测比较复杂,是因为 `typeof` 把函数和对象看成是不同的类型,而且typeof null返回"object"

解决办法: 下面的方法也经常用于检测对象值：

```javascript
function isObject2(x) { 
    return x === Object(x); 
} 
```

警告:你也许认为这里可以使用`instanceof Object`来检测,但是 `instanceof` 是通过使用使用一个对象的原型来判断实例关系的,那么没有原型的对象怎么办呢:

```javascript
var obj = Object.create(null); 
Object.getPrototypeOf(obj) // null 
```

obj确实是一个对象,但它不是任何值的实例:

```javascript
typeof obj 'object' 

obj instanceof Object // false 
```

在实际中,你可能很少遇到这样的对象,但它的确存在,而且有它的用途。

译者注:Object.prototype就是一个默认存在的,没有原型的对象

```javascript
Object.getPrototypeOf(Object.prototype) // null
typeof Object.prototype // 'object'
Object.prototype instanceof Object // false
```

### 原始值的类型是什么

typeof是最好的用来查看某个原始值的类型的方式.

```javascript
typeof "abc" // 'string' 
typeof undefined // 'undefined'
```

问题: 你必须知道typeof null的怪异表现.

```javascript
> typeof null // 要小心! 'object'
```

解决办法: 下面的函数可以修复这个问题(只针对这个用例).

```javascript
function getPrimitiveTypeName(x) { var typeName = typeof x; switch(typeName) { case "undefined": case "boolean": case "number": case "string": return typeName; case "object": if (x === null) { return "null"; } default: // 前面的判断都没通过 throw new TypeError("参数不是一个原始值: "+x); } } 
```

更好的解决办法: 实现一个函数 `getTypeName()` ,除了可以返回原始值的的类型,还可以返回对象值的内部[[Class]]属性.这里讲了如何实现这个函数(译者注:jQuery中的$.type就是这样的实现)

### 某个值是否是函数

typeof可以用来检测一个值是否是函数.

```javascript
typeof function () {} // 'function' 

typeof Object.prototype.toString // 'function' 
```

原则上说, `instanceof Function` 也可以进行这种需求的检测.乍一看,貌似写法还更加优雅.但是,浏览器有一个怪癖:每一个框架和窗口都有它自己的全局变量.因此,如果你将某个框架中的对象传到另一个框架中,`instanceof` 就不能正常工作了,因为这两个框架有着不同的构造函数.这就是为什么ECMAScript5中会有 `Array.isArray()` 方法的原因.如果有一个能够跨框架的,用于检查一个对象是否是给定的构造函数的实例的方法的话,那会很好.上述的 `getTypeName()` 是一个可用的变通方法,但也许还有一个更根本的解决方案.

### 综述
下面提到的,应该是目前JavaScript中最迫切需要的,可以代替一些typeof目前职责的功能特性:
`isDefined()` (比如 `Object.isDefined()` ): 可以作为一个函数或者一个运算符 
`isObject()`
`getTypeName()`
能够跨框架的,检测一个对象是否是指定的构造函数的实例的机制 
检查某个变量是否已经被声明这样的需求,可能没那么必要有自己的运算符.


 
 
  [1]: http://2ality.com/2013/10/typeof-null.html
  [2]: http://www.cnblogs.com/xiaoheimiaoer/p/4572558.html