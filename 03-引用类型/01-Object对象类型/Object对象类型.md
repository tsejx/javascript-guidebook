# Object对象类型

## 概念

　　Javascript的基本数据类型包括 `undefined`、`null` 、 `boolean` 、 `string` 、`number` 和 `object`。对象和其他基本类型值不同的是，对象是一种**复合值**：它将许多值(原始值或者其他对象)聚合在一起，可通过名字访问这些值

　　于是，对象也可看做是属性的无序集合，每个属性都是一个名值对。**属性名是字符串，因此我们可以把对象看成是从字符串到值的映射**
 

## 对象创建

　　有以下三种方式来创建对象，包括new构造函数、对象直接量和Object.create()函数

### new构造函数

　　使用new操作符后跟Object构造函数用以初始化一个新创建的对象

```javascript
var person = new Object();
//如果不给构造函数传递参数可以不加括号 var person = new Object;
person.name = 'bai';
person.age = 29;

//创建无属性的空对象
var cody1 = new Object();
var cody2 = new Object(undefined);
var cody3 = new Object(null);
console.log(typeof cody1,typeof cody2, typeof cody3); // object object object
```
　　如果该参数是一个对象，则直接返回这个对象　

```javascript
var o1 = {a: 1};
var o2 = new Object(o1);
console.log(o1 === o2); // true

var f1 = function(){};
var f2 = new Object(f1);
console.log(f1 === f2); // true
```

　　如果是一个原始类型的值，则返回该值对应的包装对象

```javascript
//String {0: "f", 1: "o", 2: "o", length: 3, [[PrimitiveValue]]: "foo"}
console.log(new Object('foo'));

//Number {[[PrimitiveValue]]: 1}
console.log(new Object(1));

//Boolean {[[PrimitiveValue]]: true}
console.log(new Object(true));
```

　　若Object()函数不通过new而直接使用，则相当于转换方法，可以把任意值转换为对象

　　**[注意]undefined和null会转换为一个空对象**

```javascript
var uObj = Object(undefined);
var nObj = Object(null);
console.log(Object.keys(uObj)); //[]
console.log(Object.keys(nObj)); //[]
```

　　如果Object()的参数是一个对象，则直接返回原对象

```javascript
var o = {a:1};
var oObj = Object(o);
console.log(Object.keys(oObj)); // ['a']
```

　　利用这一点，可以写一个判断变量是否为对象的函数

```javascript
function isObject(value) {
  return value === Object(value);
}
isObject([]) // true
isObject(true) // false
```

### 对象字面量

　　Javascript提供了叫做字面量的快捷方式，用于创建大多数原生对象值。使用字面量只是隐藏了与使用new操作符相同的基本过程，于是也可以叫做语法糖

　　对象字面量是由若干名值对组成的映射表，名值对中间用冒号分隔，整个映射表用花括号括起来

　　不同属性之间用逗号分隔，属性名可以是任意字符串，属性值可以是任意类型表达式，表达式的值是属性值

```javascript
//等价于var person = new Object();
var person = {}; 
var person = {
    name : 'bai',
    age : 29,
    5 : true
};
```

　　使用对象字面量的方法来定义对象，属性名会自动转换成字符串

```javascript
//同上
var person = {
    'name' : 'bai',
    'age' : 29,
    '5' : true
}; 
```

　　[注意]一般地，对象字面量的最后一个属性后的逗号将忽略，但在IE7-浏览器中导致错误

```javascript
//IE7-浏览器中报错 SCRIPT1028: 缺少标识符、字符串或数字
var person = {
    name : 'bai',
    age : 29,
    5 : true,
};
```

### Object.create()

　　ES5定义了一个名为Object.create()的方法，它创建一个新对象，第一个参数就是这个对象的原型，第二个可选参数用以对对象的属性进行进一步描述

```javascript
var o1 = Object.create({x:1,y:1}); // o1继承了属性x和y
console.log(o1.x); // 1
```
　　可以通过传入参数null来创建一个没有原型的新对象，但通过这种方式创建的对象不会继承任何东西，甚至不包括基础方法。比如 `toString()` 和 `valueOf()`

```javascript
var o2 = Object.create(null); // o2不继承任何属性和方法
var o1 = {};
console.log(Number(o1)); // NaN
console.log(Number(o2)); // Uncaught TypeError: Cannot convert object to primitive value
```

　　如果想创建一个普通的空对象(比如通过{}或new Object()创建的对象)，需要传入Object.prototype

```javascript
var o3 = Object.create(Object.prototype); // o3和{}和new Object()一样
var o1 = {};
console.log(Number(o1)); // NaN
console.log(Number(o3)); // NaN
```

 　　Object.create()方法的第二个参数是属性描述符

```javascript
var o1 = Object.create({z:3},{
  x:{value:1,writable: false,emumerable:true,configurable:true},
  y:{value:2,writable: false,emumerable:true,configurable:true}
}); 
console.log(o1.x,o1.y,o1.z);//1 2 3
```

## 对象组成

　　对象是属性的无序集合，由键名和属性值组成

### 键名

　　对象的所有键名都是字符串，所以加不加引号都可以，如果不是字符串也会自动转换成字符串

```javascript
var o = {
  'p': 'Hello World'
};

var o = {
  p: 'Hello World'
};
```

```javascript
var o ={
  1: 'a',
  3.2: 'b',
  1e2: true,
  1e-2: true,
  .234: true,
  0xFF: true,
};

//Object {1: "a", 100: true, 255: true, 3.2: "b", 0.01: true, 0.234: true}
o;
```

　　[注意]如果键名不符合标识符命名规则，则必须加上引号，否则会报错

```javascript
//Uncaught SyntaxError: Unexpected identifier
var o = {
    1p: 123
}

var o = {
    '1p': 123
}
```

### 属性值

　　属性值可以是任何类型的表达式，最终**表达式的结果就是属性值的结果**

```javascript
var o ={
    a: 1+2
}
console.log(o.a);//3
```

　　如果属性值为函数，则通常把这个属性称为**“方法”**

```javascript
var o = {
  p: function (x) {
    return 2 * x;
  }
};
o.p(1);//2
```

　　由于对象的方法就是函数，因此也有name属性。方法的name属性返回紧跟在function关键字后面的函数名。如果是匿名函数，ES5环境会返回undefined，ES6环境会返回方法名

```javascript
var obj = {
  m1: function f() {},
  m2: function () {}
};

obj.m1.name // "f"
obj.m2.name //ES5： undefined
obj.m2.name //ES6： "m2"
```
 

## 引用对象

　　如果不同的变量名指向同一个对象，那么它们都是这个对象的引用，也就是说指向同一个内存地址。修改其中一个变量，会影响到其他所有变量

```javascript
var o1 = {};
var o2 = o1;

o1.a = 1;
console.log(o2.a); // 1

o2.b = 2;
console.log(o1.b); // 2
```

　　**如果取消某一个变量对于原对象的引用，不会影响到另一个变量**

```javascript
var o1 = {};
var o2 = o1;

o1 = 1;
console.log(o2); // {}
```

## 实例方法

### valueOf()

　　valueOf()方法返回当前对象

```javascript
var o = new Object();
o.valueOf() === o // true
```

### toString()

　　toString()方法返回当前对象对应的字符串形式

```javascript
var o1 = new Object();
o1.toString() // "[object Object]"

var o2 = {a:1};
o2.toString() // "[object Object]"
```

　　一般地，使用Object.prototype.toString()来获取对象的类属性，进行类型识别，详细情况移步至此

### toLocaleString()

　　toLocaleString()方法并不做任何本地化自身的操作，它仅调用toString()方法并返回对应值

　　[注意]Date和Number类对toLocaleString()方法做了本地化定制

```javascript
var o = {a:1};
o.toLocaleString() // "[object Object]"
```
