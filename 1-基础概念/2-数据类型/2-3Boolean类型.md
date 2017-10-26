# Boolean类型

　　布尔值Boolean类型可能是三种包装对象 `Number` 、 `String` 和 `Boolean` 中最简单的一种。`Number` 和 `String` 对象拥有大量的实例属性和方法，`Boolean` 却很少。从某种意义上说，为计算机设计程序就是与布尔值打交道，作为最基本的事实，所有的电子电路只能识别和使用布尔数据。本文将介绍布尔 `Boolean` 类型

## 概述
　
　　布尔Boolean类型表示逻辑实体，它只有两个值，保留字 `true` 和 `false`，分别代表**真和假**这两个状态

　　Boolean包装类型是与布尔值对应的引用类型，在布尔表达式中使用Boolean对象容易造成误解

```javascript
var a = true;
var b2 = new Boolean(true);

console.log(b1, typeof b1); // true 'boolean'

console.log(b2, typeof b2); // Boolean{[[PrimitiveValue]]: true}  'object'

console.log(b1.valueOf(), typeof b1.valueOf()); // true 'boolean'

console.log(b2.valueOf(), typeof b2.valueOf()); // true 'boolean'
```

## 应用场景
　　
　　布尔类型主要应用于如下场景：

### 条件和循环语句

　　布尔值主要应用于条件和循环语句的条件部分。比如，if语句中，如果布尔值为true执行第一段逻辑，如果为 `false` 执行另一段逻辑。通常将一个创建布尔值的比较直接与使用这个比较的语句结合在一起

```javascript
if(a > 1){
    // 条件为true时，执行此处
}else{
    // 条件为false时，执行此处
}
```

### 逻辑运算符

　　逻辑运算符又叫**布尔运算符**。**逻辑非**运算符总是返回布尔值，而**逻辑或**和**逻辑与**操作并非如此

　　**同时使用两个逻辑非操作符，可以将类型转换为布尔型（最简便的转化为布尔值的方法）**

```javascript
console.log(!!1); // true

console.log(!!0); // false

console.log(!!' '); // true

console.log(!!''); // false
```

### 关系运算符

　　关系运算符用于测试两个值之间的关系，根据关系是否存在而返回 `true` 或 `false`，关系表达式总是返回一个布尔值，通常在if、while或for语句中使用关系表达式，用以控制程序的执行流程

```javascript
console.log( 1 > 2); // false

console.log( 1 < 2); // true
```

## 转为布尔值
　
　　将一个值转为布尔值可使用 `Boolean()` 转型函数

### 假值

　　转换成false的值称为假值(falsy value)，这7个值包括 `undefined` 、`null` 、`+0` 、`-0` 、`NaN` 、`false` 、`""(空字符串)`

```javascript
console.log(Boolean(undefined)); // false

console.log(Boolean(null)); // false

console.log(Boolean(0)); // false

console.log(Boolean(-0)); // false

console.log(Boolean(NaN)); // false

console.log(Boolean('')); // false

console.log(Boolean(false)); // false
```

　　**【注意】在 `Number()` 方法中空字符串和空白字符串都转换为0，而在Boolean方法中，空字符串`""`转换为 `false`，而空白字符串 `" "` 转换为 `true`**

```javascript
console.log(Number('')); // 空字符串 ==> 0
console.log(Number(' ')); // 空格 ==> 0

console.log(Boolean('')); // 空字符串 ==> false
console.log(Boolean(' ')); // 空格 ==> true
```

　　除了这7个假值外，其他的值转换为布尔值都是true，也称为真值(truthy value)

　　**【注意】所有对象(包括空对象)的转换结果都是 `true`，甚至连 `false` 对应的布尔对象 `new Boolean(false)` 也是 `true`**

```javascript
console.log(Boolean({})); // true
console.log(Boolean([])); // true

console.log(Boolean(new Boolean(false))); // true
console.log(Boolean(false)); // false
console.log(Boolean(new Boolean(null))); // true
console.log(Boolean(null)); // false
```


# Boolean对象

## 概述

**语法**

```javascript
new Boolean([value])

// Boolean{[[PrimitiveValue]]: flase}
// Boolean{[[PrimitiveValue]]: true}
// return a boolean object which value is (true/false)

// Falsy value in JavaScript are false, null, 0, "", undefine, and NaN.
```
**参数**

> `value` 可选的 Boolean对象的初始值

## 描述

如果Boolean构造函数的参数不是一个布尔值，则该参数会被转换成一个布尔值。如果参数是 `0`, `-0`,  `null`, `false`, `NaN`, `undefined`,或者空字符串("")，生成的Boolean对象的值为 `false`。其他任何值,包括任何对象或者字符串"false", 都会创建一个值为 `true` 的Boolean对象。

不要将原始值 `true` 和 `false`,和值为 `true` 和 `false`的Boolean对象相混淆。

任何值不为 `undefined` 或者 `null` 的对象, 包括值为 `false` 的Boolean对象, 在条件语句中,其值都将作为 `true` 来判断.例如,下面的if 语句中,if就将对象 `x` 看作是 `true` :

```javascript
let x = new Boolean(false);

if (x) {
  // do something // 这里的代码仍会执行
}
```

Boolean原始值不会有这种表现，例如，下面的条件结构中，if 语句的内部代码不会执行：

```javascript
let x = false;
if (x) {
 // do not do somethin // 这里的代码不会执行
}
```

不要通过新建 Boolean 对象的方法将一个非布尔值转化成布尔值，直接使用Boolean函数才是正确的：

```javascript
let a = Boolean(expression); // false/true ==> 这样用
let b = new Boolean(expression); // Boolean{[[PrimitiveValue]]: false/true} ==> 不要这样用
```


## 继承方法

Boolean 对象是一个布尔值的对象包装器，继承了Object对象的通用方法 `toString()` 、`toLocaleString()`、`valueOf()`这三个方法

### toString()

　　`toString()` 方法返回Boolean的字符串值(`'true'` 或 `'false'`)
　　
```javascript
Boolean(true).toString(); // 'true'

true.toString(); // 'true'

Boolean(false).toString(); // 'false'

false.toString(); // 'false'

```

### toLocaleString()

　　`toLocaleString()` 方法返回Boolean的字符串值(`'true'` 或 `'false'`)

### valueOf()

　　`valueOf()` 方法返回一个Boolean对象的原始布尔值( `true` 或 `false`)

```javascript
console.log(true.valueOf()); // true
console.log(true.toString()); // 'true'
console.log(true.toLocaleString()); // 'true'

console.log((new Boolean(false)).valueOf()); // false
console.log((new Boolean(false)).toString()); // 'false'
console.log((new Boolean(false)).toLocaleString()); // 'false'
```