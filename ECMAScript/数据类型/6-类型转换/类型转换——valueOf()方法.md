# 类型转换——valueOf()方法

## 前面的话

　　关于类型转换，对象常见的两个方法是toString()和valueOf()。实际上，这两个方法也可以应用在包装类型上。前面已经介绍过toString()方法，本文将介绍valueOf()方法。如果存在任意原始值，它就默认将对象转换为表示它的原始值；对象是复合值，而大多数对象无法真正表示为一个原始值，因此默认的valueOf()方法简单地返回对象本身，而不是返回一个原始值

【1】undefined和null没有valueOf()方法

```javascript
undefined.valueOf();//错误
null.valueOf();//错误
```

【2】布尔型数据true和false返回原值。布尔型数据的包装对象返回true或false

```javascript
true.valueOf();//true
typeof true.valueOf();//'boolean'
false.valueOf();//false
typeof false.valueOf();//'boolean'
Boolean.valueOf();//Boolean() { [native code] }
typeof Boolean.valueOf();//'function'
```
 

【3】字符串类型原值返回。字符串类型的包装对象返回字符串值

```javascript
'1'.valueOf();//'1'
''.valueOf();//''
'abc'.valueOf();//'abc'
String.valueOf();//String() { [native code] }
typeof String.valueOf();//'function'
```

【4】数值类型分为整数和浮点数进行处理。数值类型的包装对象返回数值类型值

```javascript
Number.valueOf();//Number() { [native code] }
typeof Number.valueOf();//'function'
```

　　1、整数直接跟.valueOf()形式，会报错，提示无效标记，因为整数后的点被识别为小数点，所以尽量加括号

```javascript
0.valueOf();//Uncaught SyntaxError: Invalid or unexpected token
(0).valueOf();//0
+0.valueOf();//Uncaught SyntaxError: Invalid or unexpected token
(+0).valueOf();//0
-0.valueOf();//Uncaught SyntaxError: Invalid or unexpected token
(-0).valueOf();//-0
```

　　[注意]-0的valueOf()值是-0，而-0的toString()值是'0'

　　2、浮点数原值返回

```javascript
1.23.valueOf();//1.23
+1.23.valueOf();//1.23
-1.23.valueOf();//-1.23
NaN.valueOf();//NaN
Infinity.valueOf();//Infinity
-Infinity.valueOf();//-Infinity
```

　　[注意]和toString()不同的是，valueOf()不可以接收转换基数

【5】对象Object类型及自定义对象类型返回原对象

```javascript
{}.valueOf();//报错，Unexpected token .
({}).valueOf();//Object{}
typeof ({}).valueOf();//'object'
({a:123}).valueOf();//Object{a:123}
Object.valueOf();//Object() { [native code] }
typeof Object.valueOf();//'function'
```

```javascript
function Person(){
    this.name = 'test';
}
var person1 = new Person();
person1.valueOf();//Person {name: "test"}
```

【6】函数Function类型返回原函数

```javascript
function test(){
    alert(1);//1
}
test.valueOf();/*function test(){
                    alert(1);//1
                  }*/
Function.valueOf();//Function() { [native code] }
```
 

【7】数组Array类型返回原数组

```javascript
[].valueOf();//[]
[1].valueOf();//[1]
[1,2,3,4].valueOf();//[1,2,3,4]
Array.valueOf();//Array() { [native code] }
```

【8】和其他对象不同，时间Date类型返回一个数字值，它是当前时间值

```javascript
Date.now();//1465115123742
(new Date()).valueOf();//1465115123742
typeof (new Date()).valueOf();//'number'
Date.valueOf();//Date() { [native code] }
```

【9】正则表达式RegExp类型返回原正则对象

```javascript
/ab/i.valueOf();///ab/i
/mom( and dad( and baby)?)?/gi.valueOf();//mom( and dad( and baby)?)?/gi
RegExp.valueOf();//RegExp() { [native code] }
```

【10】错误Error类型

```javascript
Error.valueOf();//Error() { [native code] }
RangeError.valueOf();//RangeError() { [native code] }
ReferenceError.valueOf();//ReferenceError() { [native code] }
SyntaxError.valueOf();//SyntaxError() { [native code] }
TypeError.valueOf();//TypeError() { [native code] }
URIError.valueOf();//URIError() { [native code] }
```
 

## 总结

　　1、toString()和valueOf()的主要不同点在于，toString()返回的是字符串，而valueOf()返回的是原对象

　　2、由于undefined和null不是对象，所以它们toString()和valueOf()两个方法都没有

　　3、数值Number类型的toString()方法可以接收转换基数，返回不同进制的字符串形式的数值；而valueOf()方法无法接受转换基数

　　4、时间Date类型的toString()方法返回的表示时间的字符串表示；而valueOf()方法返回的是现在到1970年1月1日00:00:00的数值类型的毫秒数

　　5、包装对象的valueOf()方法返回该包装对象对应的原始值

　　6、使用toString()方法可以区分内置函数和自定义函数




