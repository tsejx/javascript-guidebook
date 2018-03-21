# typeof

`typeof` 操作符返回一个字符串，表示未经计算的操作数的类型。

## 语法

```javascript
typeof operand

typeof (operand)
```

 - **参数**
    - `operand`
     - 是一个表达式，表示对象或原始值，其类型将被返回。


下表总结了typeof可能的返回值。有关类型和原始值的更多信息，可查看 [JavaScript数据结构][1] 页面。

|       类型        |       结果          |
|       ----        |       ----          |
|       Undefined   |       `'undefined'` |
|       Null        |       `'object'`    |
|       Boolean     |       `'boolean'`   |
|       Number      |       `'number'`    |
|       String      |       `'string'`    |
|       Symbol      |       `'symbol'`    |
|       宿主对象    |       Implementation-dependent    |
|       函数对象    |       `'function'`  |
|       任何其他对象|       `'object'`    |

**示例**

```javascript
// Numbers
typeof 37 === 'number';
typeof 3.14 === 'number';
typeof Math.LN2 === 'number';
typeof Infinity === 'number';
typeof NaN === 'number'; // 尽管NaN是"Not-A-Number"的缩写
typeof Number(1) === 'number'; // 但不要使用这种形式!

// Strings
typeof "" === 'string';
typeof "bla" === 'string';
typeof (typeof 1) === 'string'; // typeof总是返回一个字符串
typeof String("abc") === 'string'; // 但不要使用这种形式!

// Booleans
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

// Objects
typeof {a:1} === 'object';

// 使用Array.isArray 或者 Object.prototype.toString.call
// 区分数组,普通对象
typeof [1, 2, 4] === 'object';

typeof new Date() === 'object';

// 下面的容易令人迷惑，不要使用！
typeof new Boolean(true) === 'object';
typeof new Number(1) === 'object';
typeof new String("abc") === 'object';

// 函数
typeof function(){} === 'function';
typeof class C{} === 'function'
typeof Math.sin === 'function';
typeof new Function() === 'function';
```

## 特殊的 `null`

```javascript
typeof null === 'object'; // 从一开始出现JavaScript就是这样的
```

在 JavaScript 最初的实现中，JavaScript 中的值是由一个表示类型的标签和实际数据值表示的。对象的类型标签是 0。由于 `null` 代表的是空指针（大多数平台下值为 `0x00`），因此，`null` 的类型标签也成为了 0，`typeof null` 就错误的返回了 `"object"`。

ECMAScript提出了一个修复（通过opt-in），但被拒绝。这将导致 `typeof null === 'object'`。



  [1]: https://github.com/tsejx/JavaScript-Guidebook/blob/master/01_BasicConcept/1_Grammar&Types/3_DataStructures&Types.mdhttps://github.com/tsejx/JavaScript-Guidebook/blob/master/01_BasicConcept/1_Grammar&Types/3_DataStructures&Types.md