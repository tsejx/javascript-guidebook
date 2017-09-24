# Javascript类型系统——undefined和null 

标签（空格分隔）： JS

---
## 前面的话

　　一般的程序语言，表示空的只有null，但Javascript的设计者Brendan Eich却设计了一个undefined，这无疑增加了程序复杂度，但这样做也是有一定原因的。本文将详细介绍Javascript中的undefined和null

 
## 历史原因

　　1995年Javascript诞生时，最初像Java一样，只设置了null作为表示”无”的值。根据C语言的传统，null被设计成可以自动转为0

　　但是，Javascript的设计者Brendan Eich，觉得这样做还不够，有两个原因。首先，null像在Java里一样，被当成一个对象。但是，Javascript的值分成原始类型和对象类型两大类，Brendan Eich觉得表示”无”的值最好不是对象。其次，Javascript的最初版本没有包括错误处理机制，发生数据类型不匹配时，往往是自动转换类型或者默默地失败。Brendan Eich觉得，如果null自动转为0，很不容易发现错误

　　因此，Brendan Eich又设计了一个undefined。他是这样区分的：null是一个表示”无”的对象，转为数值时为0；undefined是一个表示”无”的原始值，转为数值时为NaN

　　但是，目前null和undefined基本是同义的，都是原始类型，且只有一些细微的差别

## undefined
　
　　Undefined类型只有一个值，就是undefined。当声明的变量未初始化时，该变量的默认值是undefined。所以一般地，undefined表示**变量没有初始化**

```javascript
var test;//undefined
console.log(test == undefined);//true
var test = undefined;//undefined
```

　　对于尚未声明过的变量只能执行一项操作，使用typeof操作符检测其数据类型，但严格模式下会导致错误

```javascript
typeof(test); //undefined
```

【出现场景】

　　【1】已声明未赋值的变量

　　【2】获取对象不存在的属性

　　【3】无返回值的函数的执行结果

　　【4】函数的参数没有传入

　　【5】void(expression)

```javascript
var i;
console.log(i);//undefined

var o = {};
console.log(o.p);//undefined

function f(){};
console.log(f());//undefined

function f(x){return x;}
console.log(f());//undefined

console.log(void(0));//undefined
```

【类型转换】

```javascript
Boolean(undefined):　 false
Number(undefined):　  NaN
String(undefined):　　'undefined'    
```

【类型鉴别】

　　 鉴别undefined类型，使用typeof运算符即可

```javascript
console.log(typeof undefined);//'undefined'
console.log(typeof 'undefined');//'string'
```

　　[注意]由于undefined并不是一个关键字，其在IE8-浏览器中会被重写，在高版本函数作用域中也会被重写；所以可以用void 0 来替换undefined

```javascript
var undefined = 10;
console.log(undefined); //IE8-浏览器下为10，高版本浏览器下为undefined
function t(){
    var undefined = 10;
    console.log(undefined);
}
console.log(t());//所有浏览器下都是10
```

## null

　　Null类型只有一个值，就是null。null是javascript语言的关键字，它表示一个特殊值，常用来描述"空值"

　　逻辑角度看，null值表示一个空对象指针

```javascript
console.log(document.getElementById('test'));//null
```

　　[注意]null是空对象指针，而[]是空数组，{}是空对象，三者不相同

```javascript
console.log(typeof null);//'object'
```

　　不同的对象在底层都表示为二进制，在javascript中二进制前三位都为0会被判断为object类型，null的二进制表示是全0，所以执行typeof时返回'object'

　　尽管null和undefined是不同的，但它们都表示"值的空缺"，null表示"空值"，undefined表示"未定义"。两者往往可以互换。判断相等运算符==认为两者是相等的

```javascript
console.log(null == undefined);//true
```

　　实际上，因为undefined和null不是构造器类型，所以它们没有任何的属性和方法，使用.和[]来存取这两个值的成员或方法都会产生一个类型错误

【类型转换】

```javascript
Boolean(null): 　　false
Number(null):　　  0
String(null): 　　 'null'
```

 【类型鉴别】

　　鉴别null类型，使用typeof运算符不可行，因为该运算符会返回'object'，null被认为是空对象指针

　　判断一个值是否为null类型的最佳方法是直接和null进行恒等比较

```javascript
console.log(typeof null);//'object'
console.log(null === null);//true
console.log(undefined === null);//false
console.log('null' === null);//false
```

参考资料

【1】 阮一峰Javascript标准参考教程——语法概述 http://javascript.ruanyifeng.com/grammar/basic.html#toc21
【2】 W3School-Javascript高级教程——原始类型 http://www.w3school.com.cn/js/pro_js_primitivetypes.asp
【3】《javascript权威指南(第6版)》第3章 类型、值和变量
【4】《javascript高级程序设计(第3版)》第3章 基本概念




