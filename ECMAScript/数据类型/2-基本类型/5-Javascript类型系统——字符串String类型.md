# Javascript类型系统——字符串String类型

标签（空格分隔）： JS

---
## 前面的话

　　Javascript没有表示单个字符的字符型，只有字符串String类型，字符型相当于仅包含一个字符的字符串

　　字符串String是Javascript基本数据类型，同时Javascript也支持String对象，它是一个原始值的包装对象。在需要时，Javascript会自动在原始形式和对象形式之间转换。本文将介绍字符串String原始类型及String包装对象

## 定义

　　字符串String类型是由引号括起来的一组由16位Unicode字符组成的字符序列

　　字符串类型常被用于表示文本数据，此时字符串中的每个元素都被视为一个代码点。每个元素都被认为占有此序列中的一个位置，用非负数值索引这些位置。首字符从位置0开始，第二个字符在位置1，依次类推

　　字符串的长度即其中元素的个数。空字符串长度为零，因而不包含任何元素

![此处输入图片的描述][1]

## Unicode编码

　　Javascript采用UTF-16编码的Unicode字符集，Javascript字符串是由一组无符号的16位值组成的序列。最常用的Unicode字符都是通过16位的内码表示，并代表字符串中的单个字符

　　[注意]最常用的Unicode字符属于“基本多语种平面”(Basic Multilingual Plane BMP)，也称为“零断面”(plan 0)， 是Unicode中的一个编码区段，编码介于U+0000——U+FFFF之间

　　所有字符都可以写成'\uxxxx'的形式，其中xxxx代表该字符的Unicode编码。比如，\u00A9代表版权符号

```javascript
var s = '\u00A9';
s // "©"
```

　　那些不能表示为16位的Unicode字符(U+10000到U+10FFFF之间的字符，长度为32位(即4个字节)，而且前两个字节在0xD800到0xDBFF之间，后两个字节在0xDC00到0xDFFF之间)，则遵循UTF-16编码规则——用两个16位值组成的一个序列(亦称做“代理项对”)表示。这意味着一个长度为2的javascript字符串(两个16位值)有可能表示一个Unicode字符

　　举例来说，U+1D306对应的字符"𝌆"，写成UTF-16就是0xD834 0xDF06。浏览器会正确将这四个字节识别为一个字符，但是javascript内部的字符长度总是固定为16位，会把这四个字节视为两个字符

```javascript
var s = '\uD834\uDF06';
s // "𝌆"
s.length // 2
```

## 引号

　　字符串String是由双引号(")或单引号(')声明的。而Java则是用双引号声明字符串，用单引号声明字符。由于ECMAScript 没有字符类型，所以可使用这两种表示法中的任何一种，但左右引号必须匹配

```javascript
//正确
var sColor1 = "red";
var sColor2 = 'red';
//错误
var sColor1 = "red';
var sColor2 = 'red";
```

　　由单引号定界的字符串中可以包含双引号，由双引号定界的字符串也可以包含单引号

```javascript
'key = "value"'
"It's a long journey"
```

　　javascript代码可能会夹杂HTML代码的字符串，HTML代码也会夹杂javascript代码。因此，最好在javascript和HTML代码中各自使用独自的引号风格

　　javascript中使用单引号表示字符串，在HTML事件处理程序中使用双引号表示字符串

```javascript
<button onclick = "alert('thanks')">click me</button>
```

## 反斜线

　　如果想在单引号定界的字符串中使用单引号，或在双引号定界的字符串中使用双引号，则需要使用反斜线(\)

　　常见情况是英文缩写和所有格写法的撇号和单引号是同一个字符，所以这时必须使用反斜线(\)来转义撇号

```javascript
'Wouldn\'t you prefer this book?'    //"Wouldn't you prefer this book?"
'Did she say \'Hello\'?'             //"Did she say 'Hello'?"
"Did she say \"Hello\"?"             //"Did she say "Hello"?"
```

### 多行字符

　　字符串默认只能写在一行内，分成多行将会报错

```javascript
//报错 Uncaught SyntaxError: Invalid or unexpected token
'a
b
c';
```

　　在ECMAScript3中，字符串必须写在一行中

　　在ECMAScript5中，字符串可以拆分成数行，每行必须以反斜线(\)结束

　　如果希望在字符串直接量中另起一行，可以使用转义字符\n

```javascript
//"onelongline"
'one\
long\
line'

/*"two
lines"*/
'two\nlines'
```

### 转义字符 

　　在javascript字符串，反斜线(\)有着特殊的用途，反斜线符号后加一个字符，就不表示它们的字面含义，用来表示一些特殊字符，称为转义字符

```javascript
\0 空字节
\n 换行
\t 制表
\b 空格
\r 回车
\f 进纸
\\ 斜杠
\' 单引号
\" 双引号
\xnn 以十六进制nn表示一个字符(n为0-f)，如\x41表示'A'
\unnnn 以十六进制nnnn表示一个Unicode字符(n为0-f)，如\u03a3表示希腊字符ε
```

　　如果在非特殊字符前面使用反斜杠，则反斜杠会被省略

```javascript
'\a' // "a"
```

　　如果字符串需要包含反斜杠，则反斜杠前面需要再加一个反斜杠，用来对自身转义

```javascript
"Prev \\ Next" // "Prev \ Next"
```

## 特点
　
　　Javascript中的字符串是不可变的。一旦字符串被创建，就永远无法改变它。要改变某个变量保存的字符串，首先要销毁原来的字符串，然后再用另一个包含新值的字符串填充该变量

　　可以通过+运算符连接其他字符串来创建一个新字符串

```javascript
var lang = "java";
lang = lang + "script"; //'javascript'
```
　　
　　以上代码的实际过程是：首先创建一个能够容纳10个字符的新字符串，然后在这个字符串中填充'java'和'script'，最后一步是销毁原来的字符串'java'和'script'，因为这两个字符串已经没用了

　　这个过程在后台发生，也是在某些旧版本浏览器(IE6)拼接字符串速度慢的原因，但浏览器后面版本已经解决了这个低效率问题

 
## 转字符串
　　把一个值转换为字符串有两种方式，toString()和String()

　　[注意]可以使用空字符串"" + 某个值，将该值转换为字符串

### toString()

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

### String()

　　在不知道要转换的值是不是undefined或null时，可以使用转型函数String()

　　转型函数String()遵循下列规则：

　　【1】如果值是null，则返回'null'；如果值是undefined，则返回'undefined'

　　【2】如果值不是null或undefined，则调用toString()方法并返回原始类型值

　　【3】若使用toString()方法返回的是对象，则再调用valueOf()方法返回原始类型值，若使用valueOf()方法返回的是对象，会报错

```javascript
// "3"
String({toString: function () {
    return 3;
  }
})

// "[object Object]"
String({valueOf: function () {
    return 2;
  }
})

// "3"
String({
  valueOf: function () {
    return 2;
  },
  toString: function () {
    return 3;
  }
})
```
 

参考资料

【1】 ES5/类型 https://www.w3.org/html/ig/zh/wiki/ES5/types 
【2】 阮一峰Javascript标准参考教程——基本语法之字符串 http://javascript.ruanyifeng.com 
【3】 W3School-Javascript高级教程——ECMAScript原始类型 http://www.w3school.com.cn
【4】《javascript权威指南(第6版)》第3章 类型、值和变量
【5】《javascript高级程序设计(第3版)》第3章 基本概念 
【6】《javascript语言精粹(修订版)》第2章 语法
【7】《javascript DOM编程艺术(第2版)》第2章 Javascript语法


  [1]: http://images2015.cnblogs.com/blog/740839/201606/740839-20160620094851147-867568566.gif