# Boolean布尔对象类型

Boolean 对象是一个布尔值的对象包装器。

## 语法

> new Boolean([value])

```javascript
// Boolean {[[PrimitiveValue]]: false}
// Boolean {[[PrimitiveValue]]: true}
// return a boolean object which value is (true/false).

// Falsy values in JavaScript are false, null, 0, "", undefined, and NaN.
Falsy values in JavaScript are false, null, 0, "", undefined, and NaN.
```

```javascript
let x = new Boolean(0);
console.log(x); // Boolean([[PrimitiveValue]]: false)
console.log(x === false); // false
console.log(x == false); // true
console.log(typeof(x)); // 'object'

let y = new Boolean(NaN);
console.log(y); // Boolean([[PrimitiveValue]]: false)
console.log(y === false); // false
console.log(y == false); // true
console.log(typeof(y)); // 'object'

let z = new Boolean(null);
console.log(z); // Boolean([[PrimitiveValue]]: false)
console.log(z === false); // false
console.log(z == false); // true
console.log(typeof(z)); // 'object'

let a = new Boolean(undefined);
console.log(a); // Boolean([[PrimitiveValue]]: false)
console.log(a === false); // false
console.log(a == false); // true
console.log(typeof(a)); // 'object'

let b = new Boolean('');
console.log(z); // Boolean([[PrimitiveValue]]: false)
console.log(z === false); // false
console.log(z == false); // true
console.log(typeof(z)); // 'object'
```


### 参数

 - **`value`**
 可选的. Boolean 对象的初始值.

### 描述

如果Boolean构造函数的参数不是一个布尔值,则该参数会被转换成一个布尔值.如果参数是 `0`, `-0`,  `null`, `false`, `NaN`, `undefined`, 或者`空字符串 ("")`,生成的Boolean对象的值为 `false`. 其他任何值,包括任何对象或者字符串 `"false"`, 都会创建一个值为 `true` 的Boolean对象.

不要将原始值true false,和值为true false的Boolean对象相混淆.

任何值不为 undefined或者 null的对象, 包括值为false的Boolean对象, 在条件语句中,其值都将作为true来判断.例如,下面的if 语句中,if就将对象x看作是true:

```javascript
var x = new Boolean(false);
if (x) {
  // . . . 这里的代码仍会被执行
}
```

Boolean原始值不会有这种表现.例如, 下面的条件结构中,if语句的内部代码不会被执行:

```javascript
var x = false;
if (x) {
  // . . . 这里的代码不会被执行
}
```

不要通过新建Boolean对象的方法来将一个非布尔值转化成布尔值. 直接使用Boolean函数才是正确的:

```javascript
var x = Boolean(expression);     // 这样用
var x = new Boolean(expression); // 而不要这样!
```

如过你用一个对象作为Boolean对象的初始化值,则即使该对象是个值为false的Boolean对象,生成的Boolean对象的值也是true.

```javascript
var myFalse = new Boolean(false);   // 初始化值为false
var g = new Boolean(myFalse);       // 初始化值为true
var myString = new String("Hello"); // string 对象
var s = new Boolean(myString);      // 初始化值为true
```

不要在该使用Boolean原始值的地方使用Boolean对象.

### 属性

 - **`Boolean.length`**
长度属性,值为1.

 - **`Boolean.prototype**
代表Boolean构造器的原型.

### 方法

Boolean构造函数自身没有任何方法, 不过, 它从自己的原型链上继承了一些方法:

### Boolean 实例

所有Boolean实例都继承于  Boolean.prototype. 其他所有的构造函数也同样,构造函数的原型对象控制着自己的对象实例所继承的属性和方法.

方法

例子

**创建1个Boolean对象,初始化值为false**

```javascript
var bNoParam = Boolean();
var bZero = Boolean(0);
var bNull = Boolean(null);
var bEmptyString = Boolean("");
var bUndefined = Boolean(undefined);
var bfalse = Boolean(false);
```

**创建1个Boolean对象,初始化值为true**

```javascript
var btrue = Boolean(true);
var btrueString = Boolean("true");
var bfalseString = Boolean("false");
var bSuLin = Boolean("Su Lin");
var bArrayProto = new Boolean([]);
var bObjProto = new Boolean({});
```



