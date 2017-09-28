# Javascript中的数据类型转换 

## 前面的话

　　所有程序设计语言的重要特征是具有进行类型转换的能力，Javascript给开发者提供了大量简单的类型转换方法。Javascript是一门弱类型语言，所以类型转换成为其比较复杂的一部分。本文将从原始值转换成原始值、对象转换成原始值、显式类型转换和隐式类型转换这四方面来详细介绍Javascript中的数据类型转换

## 原始值转换成原始值

###【Undefined】

　　转换为字符串: 'undefined'

　　转换为数字: NaN

　　转换为布尔值: false

###【Null】

　　转换为字符串: 'null'

　　转换为数字: 0

　　转换为布尔值: false

###【Boolean】

true

　　转换为字符串: 'true'

　　转换为数字: 1

false

　　转换为字符串: 'false'

　　转换为数字: 0

###【Number】

10

　　转换为字符串: '10'

　　转换为布尔值: true

0

　　转换为字符串: '0'

　　转换为布尔值: false

NaN

　　转换为字符串: 'NaN'

　　转换为布尔值: false

Infinity

　　转换为字符串: 'Infinity'

　　转换为布尔值: true

###【String】

'abc'

　　转换布尔值: true
　　转换为数字: NaN

'123'

　　转换布尔值: true
　　转换为数字: 123

' '(空格字符串)

　　转换布尔值: true
　　转换为数字: 0

''(空字符串)

　　转换布尔值: false
　　转换为数字: 0

 

## 对象转换成原始值

###【Boolean】

　　对象到布尔值的转换非常简单，所有的对象都转换为true

```javascript
console.log(Boolean([]));//true
console.log(Boolean([12]));//true
console.log(Boolean({}));//true
console.log(Boolean(/\d/));//true
```

###【Number】

　　对象转换成数字的过程，需要经过下列三步：

　　【1】如果对象具有valueOf()方法，后者返回一个原始值，则javascript将这个原始值转换为数字(如果需要的话)，并返回这个数字

　　【2】否则，如果对象具有toString()方法，后者返回一个原始值，则javascript将其转换并返回

　　【3】否则，Javascript抛出一个类型错误异常

　　总结来说，就是先valueOf()，再toString()

```javascript
var test1 = {
    toString: function(){
        return 1;
    },
    valueOf: function(){
        return 2;
    }
}
console.log(Number(test1));//2
```

```javascript
var test2 = {
    toString: function(){
        return 1;
    },
}
console.log(Number(test2));//1
```

```javascript
var test3 = {};
console.log(Number(test3));//NaN
```

　　在第一步中，在内置对象中，只有时间Date()对象返回的是原始类型的值数字，所以Number(new Date())返回现在到1970年1月1日00:00:00的数值类型的毫秒数

```javascript
Number(new Date())//1465976459108
```

　　在第二步中，数组Array类型返回由数组中每个值的字符串形式拼接而成的一个以逗号分隔的字符串，如果字符串中只存在数字，则返回数字，其他情况返回NaN；由于其他对象的toString()方法返回的字符串中不只包括数字，所以返回NaN

```javascript
Number([]);//0
Number([0]);//0
Number([-0]);//0
Number([10]);//10
Number([1,2]);//NaN
Number(其他对象);//NaN
```

###【String】

　　类似地，Javascript中对象到字符串的转换经过了如下步骤：

　　【1】如果对象具有toString()方法，则调用这个方法，如果它返回一个原始值，javascript将这个值转换为字符串(如果本身不是字符串的话)，并返回这个字符串结果

　　【2】如果对象没有toString()方法，或者这个方法不返回一个原始值，那么javascript会调用valueOf()方法，如果存在这个方法，则javascript调用它，如果返回值是原始值，javascript将这个值转换为字符串(如果本身不是字符串的话)，并返回这个字符串结果

　　【3】否则，javascript无法从toString()或valueOf()获得一个原始值，因此这时它将抛出一个类型错误异常

```javascript
var test1 = {
    toString: function(){
        return '1';
    },
    valueOf: function(){
        return '2';
    }
}
console.log(String(test1));//'1'
```

```javascript
var test2 = {
    toString: function(){
        return {};
    },
    valueOf: function(){
        return '2';
    }
}
console.log(String(test2));//'2'
```

```javascript
var test3 = {};
console.log(String(test3));//[object Object]
```

　　内置对象都从Object对象继承了toString()方法

　　【1】对象Object类型返回'[object Object]'字符串

```javascript
console.log(({}).toString());//[object Object]
console.log(({a:123}).toString());//[object Object]
```

　　【2】函数Function类型返回函数代码

```javascript
function test(){
    alert(1);//test
}
test.toString();/*"function test(){
                    alert(1);//test
                  }"*/
```

　　【3】数组Array类型返回由数组中每个值的字符串形式拼接而成的一个以逗号分隔的字符串

```javascript
console.log([].toString());//''
console.log([1].toString());//'1'
console.log([1,2,3,4].toString());//'1,2,3,4'    
```

　　【4】时间Date类型返回表示当前时区的时间的字符串表示

```javascript
console.log((new Date()).toString());//"Sun Jun 05 2016 10:04:53 GMT+0800 (中国标准时间)"  
```

　　【5】正则表达式RegExp类型返回正则表达式字面量的字符串表示

```javascript
console.log(/ab/i.toString());//'/ab/i'
console.log(/mom( and dad( and baby)?)?/gi.toString());//'mom( and dad( and baby)?)?/gi'
```

## 显式类型转换

　　显式类型转换又称为强制类型转换，接下来将分别介绍转成布尔、转成数字和转字符串的强制类型转换

###【转成布尔】

　　将一个值转为布尔值可使用Boolean()转型函数

假值

　　转换成false的值称为假值(falsy value)，这7个值包括undefined、null、+0、-0、NaN、false、""(空字符串)

```javascript
console.log(Boolean(undefined)); //false
console.log(Boolean(null)); //false
console.log(Boolean(0)); //false
console.log(Boolean(-0)); //false
console.log(Boolean(NaN)); //false
console.log(Boolean('')); //false
console.log(Boolean(false)); //false
```

　　[注意]在Number()方法中空字符串和空白字符串都转换为0，而在Boolean()方法中，空字符串""转换为false，而空白字符串" "转换为true

```javascript
console.log(Number(''));//0
console.log(Number(' '));//0

console.log(Boolean(''));//false
console.log(Boolean(' '));//true
```

　　除了这7个假值外，其他的值转换为布尔值都是true，也称为真值(truthy value)

　　[注意]所有对象(包括空对象)的转换结果都是true，甚至连false对应的布尔对象new Boolean(false)也是true

```javascript
console.log(Boolean({}));//true
console.log(Boolean([]));//true

console.log(Boolean(new Boolean(false)));//true
console.log(Boolean(false));//false
console.log(Boolean(new Boolean(null)));//true
console.log(Boolean(null));//false
```

###【转成数值】

　　有3个函数可以把非数值转换成数值:Number()、parseInt()和parseFloat()。其中Number()可以将任意类型的值转化成数值，而parseInt()和parseFloat()只应用于字符串向数字的转换

#### Number()

　　当把Number()当作一个函数来调用，而不是作为构造器，它执行一个类型转换。使用Number()函数可以将任意类型的值转化成数值

```javascript
// 数值：十进制数字
console.log(Number(11),Number(011),Number(0x11));//11 9 17

// undefined：转成 NaN
Number(undefined) // NaN

// null：转成0
Number(null) // 0

// 布尔值：true 转成1，false 转成0
console.log(Number(true),Number(false));//1 0
```

　　Number()函数解析字符串时会识别出字符串的前置空格并去掉

　　【1】若字符串只包含十进制或十六进制数字，则转成十进制的数字

　　　　[注意1]Number()不识别八进制数字的字符串，会按照十进制数字处理

　　　　[注意2]字符串'1.2.'不会报错，但数字1.2.会报错

　　【2】若字符串为空字符串或空格字符串，则转成0

　　【3】其他情况的字符串，则转成NaN

```javascript
console.log(Number('    123'));//123
console.log(Number('1.2.'));//NaN
console.log(Number(1.2.));//报错
console.log(Number(''),Number(' '));//0 0 
console.log(Number('11'),Number('011'),Number('0x11'));//11 11 17
console.log(Number('abc'));//NaN
console.log(Number('123abc'));//NaN
```

　　Number()函数解析对象的步骤在上部分已经详细介绍过，就不再赘述

#### parseInt()

　　【1】parseInt()专门用于把字符串转换成整数。在转换字符串时，会忽略字符串前面的空格，直到找到第一个非空格字符。如果第一个字符不是数字字符或者负号，parseInt()就会返回NaN。如果是，则继续解析，直到解析完成或者遇到非数字字符

```javascript
console.log(parseInt('    123.1px'));//123
console.log(parseInt('   123.1   '));//123
console.log(parseInt(' -123.1px'));//-123
console.log(parseInt('a123.1px'));//NaN
console.log(parseInt('0 123.1px'));//0
```

　　【2】parseInt()可以识别出各种进制的数字，输出的是运算后的十进制的数字，如1.0或1.或01会以1输出。在解析八进制字面量的字符串，ECMAScript3会解析八进制，但ECMAScript5没有解析八进制的能力

```javascript
console.log(parseInt('11'));//11
console.log(parseInt(11));//11
console.log(parseInt('11.1'));//11
console.log(parseInt(11.1));//11
console.log(parseInt('011'));//11
console.log(parseInt(011));//9
console.log(parseInt('011.1'));//11
console.log(parseInt(011.1));//报错
console.log(parseInt('0x11'));//17
console.log(parseInt(0x11));//17
console.log(parseInt('0x11.1'));//17
console.log(parseInt(0x11.1));//报错
```

　　[注意]对于那些会自动转为科学计数法的数字，parseInt会将科学计数法的表示方法视为字符串，因此导致一些奇怪的结果

```javascript
console.log(parseInt(1000000000000000000000.5)); // 1
// 等同于
console.log(parseInt('1e+21')); // 1

console.log(parseInt(0.0000008)); // 8
// 等同于
console.log(parseInt('8e-7')); // 8
```

　　【3】parseInt()方法还可以接受第二个参数（2到36之间），表示被解析的值的进制，返回该值对应的十进制数。默认情况下，parseInt的第二个参数为10，即默认是十进制转十进制

```javascript
console.log(parseInt('11',2));//3
console.log(parseInt('11',8));//9
console.log(parseInt('11',10));//11
console.log(parseInt('11',16));//17
```

　　如果第二个参数不是数值，会被自动转为一个整数。这个整数只有在2到36之间，才能得到有意义的结果，超出这个范围，则返回NaN。如果第二个参数是0、undefined和null，则直接忽略

```javascript
console.log(parseInt('10', 37)); // NaN
console.log(parseInt('10', 1)); // NaN
console.log(parseInt('10', 0)); // 10
console.log(parseInt('10', null)); // 10
console.log(parseInt('10', undefined)); // 10
```

　　如果字符串包含对于指定进制无意义的字符，则从最高位开始，只返回可以转换的数值。如果最高位无法转换，则直接返回NaN

```javascript
console.log(parseInt('1546', 2)); // 1
console.log(parseInt('546', 2)); // NaN
```

　　【4】parseInt()是专门用来处理字符串转换数字的，parseInt处理非字符串和数字类型时输出NaN。但是，实际上parseInt()包含着隐式的toString()方法，所以parseInt([数字或字符串])输出对应的数字

```javascript
console.log(parseInt(null),parseInt(undefined));//NaN NaN
console.log(parseInt(true),parseInt(false));//NaN NaN
console.log(parseInt([]),parseInt(['2.5px']),parseInt([2.5]));//NaN 2 2
console.log(parseInt(''),parseInt(' '),parseInt({}));//NaN NaN NaN
```

### parseFloat()

　　【1】parseFloat()专门用于字符串转换浮点数。同样地，解析时会忽略字符串前面的空格，直到找到第一个非空格字符，然后一直解析到字符串末尾或一个无效的浮点数字字符为止

```javascript
console.log(parseFloat('    0123.px'));//123
console.log(parseFloat('    123.px'));//123
console.log(parseFloat('    123.1px'));//123.1
console.log(parseFloat('   123.1.2px   '));//123.1
console.log(parseFloat(' -123.0px'));//-123
console.log(parseFloat('.123.1px'));//0.123
console.log(parseFloat('0 123px'));//0
```

　　[注意]如果字符串符合科学计数法，则会进行相应的转换

```javascript
console.log(parseFloat('314e-2')); // 3.14
console.log(parseFloat('0.0314E+2')); // 3.14
```

　　【2】parseFloat()可以识别不同进制的数字，但只能解析十进制字符串

```javascript
console.log(parseFloat('11'));//11
console.log(parseFloat(11));//11
console.log(parseFloat('11.1'));//11.1
console.log(parseFloat(11.1));//11.1
console.log(parseFloat('011'));//11
console.log(parseFloat(011));//9
console.log(parseFloat('011.1'));//11.1
console.log(parseFloat(011.1));//报错
console.log(parseFloat('0x11'));//0
console.log(parseFloat(0x11));//17
console.log(parseFloat('0x11.1'));//0
console.log(parseFloat(0x11.1));//报错
```

　　【3】parseFloat()是专门用来处理字符串转换浮点数的，parseFloat处理非字符串和数字类型时输出NaN。但是，实际上parseFloat()包含着隐式的toString()方法，所以parseFloat([数字或字符串])输出对应的数字

```javascript
console.log(parseFloat(null),parseFloat(undefined));//NaN NaN
console.log(parseFloat(true),parseFloat(false));//NaN NaN
console.log(parseFloat([]),parseFloat([2.1]),parseFloat(['2.1px']));//NaN 2.1 2.1 
console.log(parseFloat(''),parseFloat({}));//NaN NaN
```

　　[注意]Number('')的结果是0，parseInt('')和parseFloat('')的结果是NaN

###【转字符串】

　　把一个值转换为字符串有两种方式，toString()和String()

#### toString()

　　第一种是使用几乎每个值都有的toString()方法，这个方法返回相应值的字符串表现

　　[注意]undefined和null没有该方法

```javascript
undefined.toString();//错误
null.toString();//错误
true.toString();//'true'
false.toString();//'false'
'abc'.toString();//'abc'
1.23.toString();//'1.23'
({}).toString();//[object Object]
[1,2,3,4].toString();//'1,2,3,4'
(new Date()).toString();//"Sun Jun 05 2016 10:04:53 GMT+0800 (中国标准时间)"
/ab/i.toString();//'/ab/i'
```

#### String()

　　在不知道要转换的值是不是undefined或null时，可以使用转型函数String()

　　转型函数String()遵循下列规则：

　　【1】如果值是null，则返回'null'；如果值是undefined，则返回'undefined'

　　【2】如果值不是null或undefined，则调用toString()方法并返回原始类型值

　　【3】若使用toString()方法返回的是对象，则再调用valueOf()方法返回原始类型值，若使用valueOf()方法返回的是对象，会报错

 

## 隐式类型转换
　　隐式类型转换又称为自动类型转换，javascript中的运算符和语句中存在着大量的自动类型转换，其规则是：预期什么类型的值，就调用该类型的转换函数。类似地，将隐式类型转换分为转为布尔、转为数值和转字符串

###【转为布尔】

　　【1】逻辑非运算符(!)首先会将它的操作数转换成一个布尔值，然后再对其求反。如果同时使用两个逻辑非操作符，实际上就会模拟Boolean()转型函数的行为

```javascript
console.log(!!undefined);//false
console.log(!!null);//false
console.log(!!0);//false
console.log(!!-0);//false
console.log(!!NaN);//false
console.log(!!'');//false
console.log(!!false);//false
```

　　【2】条件运算符(?:)首先会将它问号(?)前的第一个操作数转换成一个布尔值，如果它是真值，那么将计算第二个操作数，并返回其计算结果。否则，如果第一个操作数是假值，那么将计算第三个操作数，并返回其计算结果

```javascript
console.log(true ? 1 : 0); //1
console.log({} ? 1 : 0); //1
console.log([123] ? 1 : 0); //1
console.log('' ? 1 : 0); //0
```

　　【3】if条件语句的条件的求值结果会转换为一个布尔值，其实条件运算符只是条件语句的简写形式

```javascript
var a = 1;
if(a){console.log(1)}; //1
if(10){console.log(1)}; //1
```

　　【4】类似地，while循环语句的条件的求值结果也会转换为一个布尔值

```javascript
var a = 1;
while(a){
    console.log(1);
    break;
};//1
while(10){
    console.log(1);
    break;
}//1
```

###【转为数字】

　　【1】算术运算符将它的操作数转为数字

```javascript
var a = '123';
console.log(+a);//123
console.log(a-0);//123
console.log(a*1);//123
console.log(a/1);//123
console.log(a%Infinity);//123
```

　　[注意]在涉及到加法的运算中，对象转换为原始值(先toString()后valueOf())后，如果两个操作数都不是字符串，则两个操作数都将转换成数字　

```javascript
console.log(undefined + undefined);//NaN
console.log(null + null);//0
console.log(true + true);//2
```

　　【2】位运算符将它的操作数转为数字

```javascript
var a = '123';
console.log(~~a);//123
console.log(a & 1);//1
console.log(a | 0);//123
console.log(a ^ 0);//123
console.log(a<<0);//123
console.log(a>>0);//123
console.log(a>>>0);//123
```

　　[注意]除了按位与(&)操作之外，其他运算符都可以实现小数取整的效果

　　【3】涉及关系运算符(==、!=、>=、>、<、<=)的运算中，对象转换为原始值(先valueOf()后toString())后，如果至少有一个操作数不是字符串，则两个操作数都将通过Number()转型函数转换成数字进行数值比较 

```javascript
console.log([1] == 1);//true，相当于1 == 1
console.log([] == true);//false，相当于0 == 1
console.log({} > true);//false，相当于 NaN > 1
console.log('true' <= 0);//false，相当于NaN <= 0
```

###【转字符串】

　　【1】在涉及加法运算符的运算中，对象转换为原始值(先toString()后valueOf())后，只要有一个操作数是字符串，另一个操作数也会转换成字符串

```javascript
console.log(1 + {});//'1[object Object]'
console.log(1 + [1,2]);//'11,2'
console.log(1 + new Date());//'Fri Jul 15 2016 22:12:05 GMT+0800 (中国标准时间)'
console.log(1 + /0/);//'1/0/'
console.log('' + undefined);//'undefined'
console.log('' + null);//'null'
console.log('' + false);//'false'
console.log('' + true);//'true'
```

　　【2】在涉及关系运算符(==、!=、>=、>、<、<=)的运算中，在对象转换为原始值(先valueOf()后toString())之后，如果两个操作数都是字符串，则进行字符串的比较

```javascript
console.log(new Date() == 'Fri Jul 15 2016 22:12:05 GMT+0800 (中国标准时间)');//true
```
　　
　　[注意]一个值转换为另一个值并不意味着两个值相等

```javascript
console.log(Number(null));//0
console.log(null == 0);//false

console.log(Boolean(NaN));//false
console.log(NaN == false);//false
```

参考资料

【1】 ES5/类型转换与测试 https://www.w3.org/html/ig/zh/wiki/ES5/conversion
【2】 阮一峰Javascript标准参考教程——基本语法 http://javascript.ruanyifeng.com/grammar/conversion.html
【3】 W3School-Javascript高级教程——类型转换 http://www.w3school.com.cn/js/pro_js_typeconversion.asp
【4】《javascript权威指南(第6版)》第3章 类型、值和变量
【5】《javascript高级程序设计(第3版)》第3章 基本概念




