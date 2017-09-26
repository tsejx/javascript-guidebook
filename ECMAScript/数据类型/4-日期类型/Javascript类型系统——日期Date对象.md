# Javascript类型系统——日期Date对象

## 前面的话

　　Date对象是Javascript语言中内置的数据类型，用于提供日期和时间的操作接口。Date对象是在早期java中的java.util.Date类基础上创建的，为此，Date类型使用自UTC1970年1月1日0点开始经过的毫秒数来保存日期，它可以表示的时间范围是1970年1月1日0点前后的各1亿天。本文将详细介绍Date对象的用法


## 静态方法

　　在介绍Date对象的构造函数之前，先介绍静态方法。因为，Date对象的静态方法与其构造函数有着千丝万缕的联系。使用构造函数创建Date对象的过程，类似于披着外套的静态方法的使用过程

　　Date对象总共有三个静态方法，分别是`Date.now()`、`Date.parse()`、`Date.UTC()`。这些方法通过Date()构造函数本身调用，而不是通过Date实例对象

### Date.now()

　　ECMAScript5新增了now()方法，该方法返回当前时间距离1970年1月1日0点UTC的毫秒数。该方法不支持传递参数

　　[注意]该方法返回的是Number数字类型

```javascript
console.log(Date.now());//1468297046050
console.log(Date.now('2016,1,1'));//1468297046050
console.log(typeof Date.now());//'number'
```

　　在不支持Date.now()方法的浏览器中，可以用+操作符把Date对象转换成数字，也可以实现类似效果

```javascript
console.log(new Date());//Tue Jul 12 2016 12:21:33 GMT+0800 (中国标准时间)
console.log(+new Date());//1468297293433
console.log(+new Date(2000,1,1));//949334400000
```

　　该方法常用于分析代码的工作

```javascript
var start = Date.now();
doSomething();
var stop = Date.now();
result = stop - start;
```

### Date.parse()

　　该方法用于解析一个日期字符串，参数是一个包含待解析的日期和时间的字符串，返回从1970年1月1日0点到给定日期的毫秒数

　　该方法会根据日期时间字符串格式规则来解析字符串的格式，除了标准格式外，以下格式也支持。如果字符串无法识别，将返回NaN

　　1、'月/日/年' 如6/13/2004

　　2、'月 日,年' 如January 12,2004或Jan 12,2004

　　3、'星期 月 日 年 时:分:秒 时区' Tue May 25 2004 00:00:00 GMT-0700

　　[注意]浏览器不支持不表示日期只表示时间的字符串格式

```javascript
console.log(Date.parse('6/13/2004'));//1087056000000
console.log(Date.parse('January 12,2004'));//1073836800000
console.log(Date.parse('Tue May 25 2004 00:00:00 GMT-0700'));//1085468400000
console.log(Date.parse('2004-05-25T00:00:00'));//1085443200000
console.log(Date.parse('2016'));//1451606400000
console.log(Date.parse('T00:00:00'));//NaN
console.log(Date.parse());//NaN
```

　　[注意]在ECMAScript5中，如果使用标准的日期时间字符串格式规则的字符串中，数学前有前置0，则会解析为UTC时间，时间没有前置0，则会解析为本地时间。其他情况一般都会解析为本地时间

```javascript
console.log(Date.parse('7/12/2016'));//1468252800000
console.log(Date.parse('2016-7-12'));//1468252800000
console.log(Date.parse('2016-07-12'));//1468281600000
```

### Date.UTC()

　　Date.UTC()同样返回给定日期的毫秒数，但其参数并不是一个字符串，而是分别代表年、月、日、时、分、秒、毫秒的数字参数

　　`Date.UTC(year,month,day,hours,minutes,seconds,ms)`，year和month参数是固定的，其余参数可选，日期时间格式规则详见此

　　因为该函数有7个形参，所以其length值为7

```javascript
console.log(Date.UTC.length);//7
```

　　[注意]该方法使用的是UTC时间，而不是本地时间

```javascript
console.log(Date.UTC(1970));//NaN
console.log(Date.UTC(1970,0));//0
console.log(Date.UTC(1970,0,2));//86400000
console.log(Date.UTC(1970,0,1,1));//3600000
console.log(Date.UTC(1970,0,1,1,59));//714000
console.log(Date.UTC(1970,0,1,1,59,30));//717000
```
 
## 构造函数

　　Date()构造函数有多达5种的使用方法

　　【0】Date()函数可以不带new操作符，像一个函数一样调用。它将忽略所有传入的参数，并返回当前日期和时间的一个字符串表示

```javascript
    Date();
```
    
　　[注意]由于Date()函数没有使用操作符，实际上它不能被称为构造函数

```javascript
console.log(Date());//"Tue Jul 12 2016 13:38:41 GMT+0800 (中国标准时间)"
console.log(Date('2016/1/1'));//"Tue Jul 12 2016 13:38:41 GMT+0800 (中国标准时间)"
console.log(typeof Date());//'string'
```

　　【1】Date()函数使用new操作符，且不带参数时，将根据当前时间和日期创建一个Date对象

```javascript
    new Date();
console.log(new Date());//Tue Jul 12 2016 13:41:45 GMT+0800 (中国标准时间)
console.log(new Date);//Tue Jul 12 2016 13:41:45 GMT+0800 (中国标准时间)
console.log(typeof new Date());//'object'
```

　　【2】Date()函数可接受一个数字参数，该参数表示设定时间与1970年1月1日0点之间的毫秒数

```javascript
new Date(milliseconds);
console.log(new Date(0));//Thu Jan 01 1970 08:00:00 GMT+0800 (中国标准时间)
console.log(new Date(86400000));//Fri Jan 02 1970 08:00:00 GMT+0800 (中国标准时间)
console.log(typeof new Date(0));//object
```

　　【3】Date()函数可接受一个字符串参数，参数形式类似于Date.parse()方法。但parse()方法返回的是一个数字，而Date()函数返回的是一个对象 

````javascriot

new Date(datestring);
console.log(new Date('6/13/2004'));//Sun Jun 13 2004 00:00:00 GMT+0800 (中国标准时间)
console.log(Date.parse('6/13/2004'));//1087056000000
console.log(typeof new Date(6/13/2004));//object
console.log(typeof Date.parse(6/13/2004));//number
```

　　关于标准的日期时间字符串中前置0的处理，也类似于Date.parse()方法，若有前置0，则相当于UTC时间，若没有，则相当于本地时间。其余情况一般都为本地时间

```javascript
console.log(new Date('7/12/2016'));//Tue Jul 12 2016 00:00:00 GMT+0800 (中国标准时间)
console.log(new Date('2016-7-12'));//Tue Jul 12 2016 00:00:00 GMT+0800 (中国标准时间)
console.log(new Date('2016-07-12'));//Tue Jul 12 2016 08:00:00 GMT+0800 (中国标准时间)
```

　　【4】Date()函数可接受参数形式类似于Date.UTC()方法的参数，但Date.UTC()方法返回是一个毫秒数，且是UTC时间，而Date()函数返回是一个对象，且是本地时间

```javascript
console.log(new Date(2016,7,12));//Fri Aug 12 2016 00:00:00 GMT+0800 (中国标准时间)
console.log(+new Date(2016,7,12));//1470931200000
console.log(typeof new Date(2016,7,12));//'object'
console.log(Date.UTC(2016,7,12));//1470960000000
console.log(typeof Date.UTC(2016,7,12));//'number'
```

　　[注意]使用参数类似于Date.parse()函数的方法时，如果日期对象超出范围，浏览器会自动将日期计算成范围内的值；使用参数类似于Date.UTC()函数的方法时，如果日期对象超出范围，浏览器会提示Invalid Date

```javascript
console.log(new Date(2016,7,32));//Thu Sep 01 2016 00:00:00 GMT+0800 (中国标准时间)
console.log(new Date(2016,8,1));//Thu Sep 01 2016 00:00:00 GMT+0800 (中国标准时间)
console.log(new Date('2016-8-32'));//Invalid Date
console.log(new Date('2016-9-1'));//Thu Sep 01 2016 00:00:00 GMT+0800 (中国标准时间)
````

## 实例方法

　　Date对象没有可以直接读写的属性，所有对日期和时间的访问都需要通过方法。Date对象的大多数方法分为两种形式：一种是使用本地时间，一种是使用UTC时间，这些方法在下面一起列出。例如，get[UTC]Day()同时代表getDay()和getUTCDay()

　　Date对象一共有46个实例方法，可以分为以下3类：to类、get类、set类

【to类】

　　to类方法从Date对象返回一个字符串，表示指定的时间

toString()

　　返回本地时区的日期字符串

toUTCString()

　　返回UTC时间的日期字符串

toISOString()

　　返回Date对象的标准的日期时间字符串格式的字符串

toDateString()

　　返回Date对象的日期部分的字符串

toTimeString()

　　返回Date对象的时间部分的字符串

toJSON()

　　返回一个符合JSON格式的日期字符串，与toISOString方法的返回结果完全相同

```javascript
console.log(new Date('2016-7-12').toString());//Tue Jul 12 2016 00:00:00 GMT+0800 (中国标准时间)
console.log(new Date('2016-7-12').toUTCString());//Mon, 11 Jul 2016 16:00:00 GMT
console.log(new Date('2016-7-12').toISOString());//2016-07-11T16:00:00.000Z
console.log(new Date('2016-7-12').toDateString());//Tue Jul 12 2016
console.log(new Date('2016-7-12').toTimeString());//00:00:00 GMT+0800 (中国标准时间)
console.log(new Date('2016-7-12').toJSON());//2016-07-11T16:00:00.000Z
```

toLocaleString()

　　toString()方法的本地化转换

toLocaleTimeString()

　　toTimeString()方法的本地化转换

toLocaleDateString()

　　toDateString()方法的本地化转换

```javascript
console.log(new Date('2016-7-12').toString());//Tue Jul 12 2016 00:00:00 GMT+0800 (中国标准时间)
console.log(new Date('2016-7-12').toLocaleString());//2016/7/12 上午12:00:00
console.log(new Date('2016-7-12').toDateString());//Tue Jul 12 2016
console.log(new Date('2016-7-12').toLocaleDateString());//2016/7/12
console.log(new Date('2016-7-12').toTimeString());//00:00:00 GMT+0800 (中国标准时间)
console.log(new Date('2016-7-12').toLocaleTimeString());//上午12:00:00
```

【get类】

　　Date对象提供了一系列get类方法，用来获取实例对象某个方面的值

　　在介绍get类方法之前，首先要介绍valueOf()方法

valueOf()

　　返回距离1970年1月1日0点的毫秒数

　　因此，可以方便地使用比较运算符来比较日期值

var date1 = new Date(2007,0,1);
var date2 = new Date(2007,1,1);
console.log(date1 > date2);//false
console.log(date1 < date2);//true

### getTime()

　　返回距离1970年1月1日0点的毫秒数，同valueOf()

　　在ECMAScript5之前，可以使用getTime()方法实现Date.now()

    Date.now = function(){
        return (new Date()).getTime()
    }
getTimezoneOffset()

　　返回当前时间与UTC的时区差异，以分钟表示(8*60=480分钟)，返回结果考虑到了夏令时因素

console.log(new Date('2016-7-12').valueOf());//1468252800000
console.log(new Date('2016-7-12').getTime());//1468252800000
console.log(new Date('2016-7-12').getTimezoneOffset());//-480
getYear()

　　返回距离1900年的年数(已过时)

get[UTC]FullYear()

　　返回年份(4位数)

get[UTC]Month()

　　返回月份(0-11)

get[UTC]Date()

　　返回第几天(1-31)

get[UTC]Day()

　　返回星期几(0-6)

get[UTC]Hours()

　　返回小时值(0-23)

get[UTC]Minutes()

　　返回分钟值(0-59)

get[UTC]Seconds()

　　返回秒值(0-59)

get[UTC]Milliseconds()

　　返回毫秒值(0-999)

　　[注意]通过标准日期时间格式字符串，且有前置0的形式的参数设置，设置的是UTC时间

```javascript
console.log(new Date('2016-07-12T10:00').getYear());//116
console.log(new Date('2016-07-12T10:00').getFullYear());//2016
console.log(new Date('2016-07-12T10:00').getUTCFullYear());//2016
console.log(new Date('2016-07-12T10:00').getMonth());//6
console.log(new Date('2016-07-12T10:00').getUTCMonth());//6
console.log(new Date('2016-07-12T10:00').getDate());//12
console.log(new Date('2016-07-12T10:00').getUTCDate());//12
console.log(new Date('2016-07-12T10:00').getDay());//2
console.log(new Date('2016-07-12T10:00').getUTCDay());//2
console.log(new Date('2016-07-12T10:00').getHours());//18
console.log(new Date('2016-07-12T10:00').getUTCHours());//10
console.log(new Date('2016-07-12T10:00').getMinutes());//0
console.log(new Date('2016-07-12T10:00').getUTCMinutes());//0
console.log(new Date('2016-07-12T10:00').getSeconds());//0
console.log(new Date('2016-07-12T10:00').getUTCSeconds());//0
console.log(new Date('2016-07-12T10:00').getMilliseconds());//0
console.log(new Date('2016-07-12T10:00').getUTCMilliseconds());//0
```

```javascript
//当前时间为16:35
console.log(new Date().getHours());//16
console.log(new Date().getUTCHours());//8
```

【set类】

　　Date对象提供了一系列set类方法，用来设置实例对象的各个方面

　　set方法基本与get方法相对应，set方法传入类似于Date.UTC()的参数，返回调整后的日期的内部毫秒数

　　[注意]星期只能获取，不能设置

setTime()

　　使用毫秒的格式，设置一个Date对象的值

```javascript
var d = new Date('2016-07-12T10:00');
console.log(d.setTime(86400000),d);//86400000 Fri Jan 02 1970 08:00:00 GMT+0800 (中国标准时间)
setYear()
```

　　设置年份(已过时)

```javascirpt
var d = new Date('2016-07-12T10:00');
console.log(d.setYear(2000),d,d.getYear());//963396000000 Wed Jul 12 2000 18:00:00 GMT+0800 (中国标准时间) 100

```

set[UTC]FullYear()

　　设置年份(4位数)，以及可选的月份值和日期值

set[UTC]Month()

　　设置月份(0-11)，以及可选的日期值

set[UTC]Date()

　　设置第几天(1-31)

```javascript
var d = new Date('2016-07-12T10:00');
console.log(d.setFullYear(2015,1,1),d.getFullYear());//1422784800000 2015
console.log(d.setMonth(2),d.getMonth());//1425204000000 2
console.log(d.setDate(20),d.getDate());//1426845600000 20
console.log(d.toLocaleString());//2015/3/20 下午6:00:00
set[UTC]Hours()
```

　　设置小时值(0-23)，以及可选的分钟值、秒值及毫秒值

set[UTC]Minutes()

　　设置分钟值(0-59)，以及可选的秒值及毫秒值

set[UTC]Seconds()

　　设置秒值(0-59)，以及可选的毫秒值

set[UTC]Milliseconds()

　　设置毫秒值(0-999)

```javascript
var d = new Date('2016-07-12T10:20:30');
console.log(d.setHours(1,2,3),d.getHours());//1468256523000 1
console.log(d.setMinutes(2,3),d.getMinutes());//1468256523000 2
console.log(d.setSeconds(3),d.getSeconds());//1468256523000 3
console.log(d.toLocaleTimeString())//上午1:02:03
var d = new Date('2016-07-12T10:20:30');
console.log(d.setUTCHours(1,2,3),d.getHours());//1468285323000  9
console.log(d.setUTCMinutes(2,3),d.getMinutes());//1468285323000  2
console.log(d.setUTCSeconds(3),d.getSeconds());//1468285323000  3
console.log(d.toLocaleTimeString())//上午9:02:03
 ```

参考资料

【1】 ES5/Date对象 https://www.w3.org/html/ig/zh/wiki/ES5/builtins#Date_.E5.AF.B9.E8.B1.A1
【2】 阮一峰Javascript标准参考教程——标准库——Date对象 http://javascript.ruanyifeng.com/stdlib/date.html
【3】 W3School-Javascript高级教程——Date对象 http://www.w3school.com.cn/jsref/jsref_obj_date.asp
【4】《javascript权威指南(第6版)》第三部分 javascript核心参考
【5】《javascript高级程序设计(第3版)》第5章 引用类型
在此输入正文




