# Number数字类型

　　Javascript只有一种数字类型，它在内部被表示为64位的浮点数，和Java的double数字类型一样。与其他大多数编程语言不同的是，它没有分离出整数类型，所以1和1.0的值相同。这提供了很大的方便，避免了一大堆因数字类型导致的错误

　　数字Number是Javascript中基本的原始数据类型，同时Javascript也支持Number对象，它是一个原始数值的包装对象。在需要时，javascript会自动在原始形式和对象形式之间转换。本文将介绍数字Number原始类型及Number包装对象


## 概述

　　Javascript采用IEEE754格式来表示数字，不区分整数和浮点数，Javascript中的所有数字都用浮点数值表示

　　由于浮点型数值需要的内存空间是保存整数值的两倍，因此Javascript会不失时机地将浮点数值转换成整数值，若小数点后没有跟任何数字或者浮点值本身表示的就是一个整数，这个数值会作为整数值来保存

```javascript
    console.log(1.0,1.0===1); // 1 true
    
    console.log(1.,1.===1); // 1 true
```

　　当一个数字直接出现在Javascript程序中时，称之为**数字字面量**(numeric literal)。而当Number()使用new操作符用做构造函数时，称之为**Number对象**



## 整数

　　Javascript的整数表示共有四种字面量格式是十进制、二进制、八进制、十六进制。但在进行算术计算时，所有以二进制、八进制和十六进制表示的数值最终都将被转换成十进制数值

　　【1】八进制字面值的第一位必须是0，然后是八进制数字序列(0-7)。如果字面值中的数值超出了范围，那么前导0将被忽略，后面的数值被当作十进制数解析

　　[注意]由于某些Javascript的实现不支持八进制字面量，且八进制字面量在严格模式下是无效的，会导致Javascript抛出错误。所以尽量不使用八进制字面量

　　【2】十六进制字面值的前两位必须是0x，后跟十六进制数字序列(0-9,a-f)，字母可大写可小写。如果十六进制中字面值中的数值超出范围，如出现g、h等会报错

　　【3】二进制字面值的前两位必须是0b，如果出现除0、1以外的数字会报错

```javascript
var num2 = 0b101;
console.log(num2);//5

var num2 = 0b2;
console.log(num2);//报错

var num8 = 012;
console.log(num8);//10

var num8 = 09;
console.log(num8);//9

var num16 = 0x11;
console.log(num16);//17

var num16 = 0xg;
console.log(num16);//报错
```


## 浮点数

　　浮点数(floating-point number)是指数值中必须包含一个小数点，且小数点后面必须至少有一位数字。与整数支持多进制不同，一般地，浮点数只可用十进制表示

```javascript
var num1 = 011.1; // 报错

var num2 = 0x11.1; // 报错

var num3 = 011e1; // 报错

var num4 = 0x11e1; // 出错，会被识别成整数，结果为4577
```

　　【注意】虽然小数点前面可以没有整数，但不推荐

```javascript
var num1 = 1.1;

var num2 = 1.;

var num3 = .1;

console.log(num1,num2,num3); // 1.1,1,0.1
```

　　由于Javascript采用IEEE754格式表示数字，浮点数不是精确值，所以涉及浮点数的比较和运算时要特别小心

```javascript
console.log(0.1 + 0.2 === 0.3); // false

console.log(0.3 / 0.1); // 2.9999999999999996

console.log((0.3 - 0.2) === (0.2 - 0.1)); // false
```

## 科学记数法

　　对于极大或者极小的数，可以用科学计数法e来表示的浮点数值来表示。科学计数法允许字母e或E的后面，跟着一个整数，表示这个数值的指数部分

　　以下两种情况，Javascript会自动将数值转为科学计数法表示

　　【1】小于1且小数点后面带有6个0以上的浮点数值

```javascript
0.0000003 // 3e-7
0.000003 // 0.000003
```

　　【2】整数位数字多于21位

```javascript
1234567890123456789012 // 1.2345678901234568e+21
1234567890123456789012.1 // 1.2345678901234568e+21
123456789012345678901 // 123456789012345680000
```

## 数值精度

　　根据国际标准IEEE 754，Javascript浮点数的64个二进制位，从最左边开始，是这样组成的

```javascript
第1位：        符号位，0表示正数，1表示负数
第2位到第12位： 储存指数部分
第13位到第64位：储存小数部分（即有效数字）
```

　　符号位决定了一个数的正负，指数部分决定了数值的大小，小数部分决定了数值的精度

　　IEEE 754规定，有效数字第一位默认总是1，不保存在64位浮点数之中。也就是说，有效数字总是1.xx...xx的形式，其中xx..xx的部分保存在64位浮点数之中，最长可能为52位

　　因此，Javascript提供的有效数字最长为53个二进制位

```javascript
// Javascript内部实际的表现形式
(-1)^符号位 * 1.xx...xx * 2^指数位
```

　　精度最长为53个二进制位，意味着绝对值小于2的53次方的整数，即-(253-1)到253-1，都可以精确表示

```javascript
Math.pow(2, 53)
// 9007199254740992
```

　　所以换算成十进制，Javascript数字最高精度是16位(若整数部分为0，则表示小数点后16位；若整数部分不为0，则表示整体保留16位)

```javascript
Math.pow(2, 53)// 9007199254740992

Math.pow(2, 53) + 1// 9007199254740992

9007199254740993//9007199254740992

90071992547409921//90071992547409920

0.923456789012345678;//0.9234567890123456

9.23456789012345678;//9.234567890123456
```


## 数值范围

　　根据标准，64位浮点数的指数部分的长度是11个二进制位，意味着指数部分的最大值是2047（211-1）。分出一半表示负数，则Javascript能够表示的数值范围为21024到2-1023，超出这个范围的数无法表示

　　21024 = 1.79769*10308

　　Javascript中能表示的最大值是+-1.79769*10308，而Javascript能表示的最小值是+-5*10-324

　　Javascript能够表示的整数范围是-253到253。如果超过了此范围的整数，无法保证低位数字的精度

　　Javascript中的最大值保存在 `Number.MAX_VALUE` 中，而最小值保存在 `Number.MIN_VALUE`

```javascript
console.log(Number.MIN_VALUE, Number.MAX_VALUE) // 5e-324,1.7976931348623157e+308
```

　　如果数字超过最大值，Javascript会返回 `Infinity` ，这称为正向溢出(overflow)；如果等于或超过最小负值-1023（即非常接近0），Javascript会直接把这个数转为0，这称为负向溢出(underflow)

 　　如下所示，实际情况并非全部如此

```javascript
Number.MAX_VALUE+1 === Number.MAX_VALUE;//true
```

　　当数字最大值+1时，结果并不等于 `Infinity` ，而是仍然等于最大值。这是因为精度受限，Javascript中的存储位置没有多余位置去存储个位数1

　　当运算数和数字最大值保持在相同精度维度上时，才可与数字最大值发生运算

```javascript
Number.MAX_VALUE+1e291; // 1.7976931348623157e+308
Number.MAX_VALUE+1e292; // Infinity
```

　　类似地，与数字最小值的运算也有相似情况

```javascript
Number.MIN_VALUE + 1; // 1

Number.MIN_VALUE - 3e-324; // 0

Number.MIN_VALUE - 2e-324; // 5e-324
0.1+0.2!== 0.3
```

　　不仅仅是Javascript，在很多语言中0.1 + 0.2都会得到0.30000000000000004

　　下面详细解释出现这个结果的原因

　　[注意]该部分内容主要参考子迟兄的博文[【0.1 + 0.2 = 0.30000000000000004】该怎样理解？][1]

　　计算机中的数字都是以二进制存储的，如果要计算0.1 + 0.2 的结果，计算机会先把0.1和0.2分别转化成二进制，然后相加，最后再把相加得到的结果转为十进制

　　把10进制的0.1转换成2进制，表示为0.0 0011 0011...(0011循环)

```javascript
(0.1).toString(2); // "0.0001100110011001100110011001100110011001100110011001101"
```

　　把10进制的0.2转换成2进制，表示为0.0011 0011...(0011循环)

```javascript
(0.2).toString(2); // "0.001100110011001100110011001100110011001100110011001101"
```

　　由于计算机只能保存最大53位精度，所以，用科学记数法表示

　　0.1的二进制为1.1001100110011001100110011001100110011001100110011010e+4(52位小数)

　　0.2的二进制为1.1001100110011001100110011001100110011001100110011010e+3(52位小数)

　　[注意]如果第52bit和53bit都是 1，需要进位

```javascript
1.1001100110011001100110011001100110011001100110011010e-4
+
1.1001100110011001100110011001100110011001100110011010e-3
--------------------------------------------------------------------------
0.1100110011001100110011001100110011001100110011001101e-3
+
1.1001100110011001100110011001100110011001100110011010e-3
--------------------------------------------------------------------------
10.0110011001100110011001100110011001100110011001100111e-3
--------------------------------------------------------------------------
1.0011001100110011001100110011001100110011001100110100e-2(52位小数)
--------------------------------------------------------------------------
0.010011001100110011001100110011001100110011001100110100
转换为十进制为0.30000000000000004
```


## 特殊数值
　　Javascript提供了几个特殊数值，包括 `Number.MAX_VALUE`、`Number.MIN_VALUE`、`Number.POSITIVE_INFINITY`、`Number.NEGATIVE_INFINITY`、`Number.MAX_SAFE_INTEGER`、`Number.MIN_SAFE_INTEGER`、`Number.NaN`、`+0`、`-0`共9个

　　其中，前7个特殊数值是Number对象的属性

### 最值

　　前面已介绍过 `Number.MAX_VALUE` 代表Javascript最大值，`Number.MIN_VALUE` 代表Javascript最小正值

```javascript
console.log(Number.MIN_VALUE, Number.MAX_VALUE) // 5e-324,1.7976931348623157e+308
```

　　`Number.MAX_SAFE_INTEGER` 表示最大整数(253-1)，`Number.MIN_SAFE_INTEGER` 表示最小整数-(253-1)

```javascript
//9007199254740991 true
console.log(Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER===Math.pow(2, 53)-1)
//-9007199254740991 true
console.log(Number.MIN_SAFE_INTEGER,Number.MIN_SAFE_INTEGER===-(Math.pow(2, 53)-1))
Infinity
```

　　`Infinity` 是一个全局属性，用来存放表示无穷大的特殊数值。用for/in循环不可枚举 `Infinity` 属性，用delete操作符也无法删除它

　　实际上，`Number.POSITIVE_INFINITY` 对应的是 `Infinity`，代表正无穷；而 `Number.NEGATIVE_INFINITY` 对应的是 `-Infinity`，代表负无穷

```javascript
console.log(Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY); // Infinity -Infinity
```

　　Infinity有正负之分

```javascript
Math.pow(2,Math.pow(2,100)); // Infinity

1/0; // Infinity

-0/0; // -Infinity

Infinity === -Infinity; // false
```

　　Infinity参与的运算结果只能是其本身、0或NaN

```javascript
2 * Infinity;//Infinity

2 - Infinity;//-Infinity

2 + Infinity;//Infinity

2 / Infinity;//0

Infinity / 2;//Infinity

Infinity * Infinity;//Infinity

Infinity - Infinity;//NaN

Infinity + Infinity;//Infinity

Infinity / Infinity;//NaN
```

　　可以通过 `isFinite()`来确定一个数值是不是有穷的，包含着隐式类型转换 `Number()`。如果是 `+-Infinity` 或 `NaN` 时返回 `false`，否则为 `true`

```javascript
console.log(isFinite(Infinity)) // false
console.log(isFinite(NaN)) // false
console.log(isFinite(Number.MAX_VALUE)) // true
console.log(isFinite(true)) // true
```

## NaN

　　NaN(not a number)表示非数字，`NaN` 与任何值都不相等，包括NaN本身，且任何涉及 `NaN` 的操作都会返回 `NaN`

```javascript
5 - 'x'; //NaN

Math.acos(2); //NaN

0 / 0; //NaN

NaN == NaN;//false

NaN == Infinity;//false

[NaN].indexOf(NaN);// -1

Boolean(NaN); // false
```

　　`isNaN()` 来判断这个数字是不是 `NaN`，包含着隐式类型转换 `Number()`

```javascript
console.log(isNaN(Infinity)); // false

console.log(isNaN(0)); // false

console.log(isNaN(NaN)); // true

console.log(isNaN('Hello')); // true
```

　　判断 `NaN` 更可靠的方法是，利用 `NaN` 是Javascript之中唯一不等于自身的值这个特点，进行判断

```havascruot
function myIsNaN(value) {
  return value !== value;
}
```

## 正负0

　　在Javascript内部，实际上存在2个0：一个是+0，一个是-0。它们是等价的

```javascript
-0 === +0;// true

0 === -0;// true

0 === +0;// true
```

　　一般地，+0和-0都会被当做0来看待，但是+0或-0当作分母，返回的值是不相等的

```javascript
console.log(1/+0);//Infinity

console.log(1/-0);//-Infinity

console.log((1/+0) === (1/-0));//false
```

## 转成数值

　　有3个函数可以把非数值转换成数值：`Number()`、`parseInt()` 和 `parseFloat()`。其中 `Number()` 可以将任意类型的值转化成数值，而 `parseInt()` 和 `parseFloat()`只应用于字符串向数字的转换

### Number()

　　当把 `Number()`当作一个函数来调用，而不是作为构造器，它执行一个类型转换。使用 `Number()` 函数可以将任意类型的值转化成数值

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

　　Number()函数解析对象时，会按照以下步骤进行处理　

　　【1】调用对象的 `valueOf()` 方法，如果返回原始类型的值，则直接对该值使用 `Number()` 函数

　　【2】如果 `valueOf()` 方法返回的还是对象，则调用对象的 `toString()` 方法，如果返回原始类型的值，则对该值使用 `Number()` 函数

　　【3】如果 `toString()` 方法返回的依然是对象，则结果是 `NaN`

　　在第一步中，由于只有时间Date()对象返回的是原始类型的值数字，所以 `Number(new Date())` 返回现在到1970年1月1日00:00:00的数值类型的毫秒数

```javascript
Number(new Date()) // 1465976459108
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

## parseInt()

　　【1】parseInt()专门用于把字符串转换成整数。在转换字符串时，会**忽略字符串前面的空格**，直到找到第一个非空格字符。如果第一个字符不是数字字符或者负号，`parseInt()` 就会返回 `NaN` 。如果是，则继续解析，直到解析完成或者遇到非数字字符

```javascript
console.log(parseInt('    123.8px')); // 123

console.log(parseInt('   123.8   ')); // 123

console.log(parseInt(' -123.8px')); // -123

console.log(parseInt('a123.8px')); // NaN

console.log(parseInt('0 123.8px')); // 0
```

　　【2】`parseInt()`可以识别出各种进制的数字，输出的是运算后的十进制的数字，如1.0或1.或01会以1输出。在解析八进制字面量的字符串，ECMAScript3会解析八进制，但ECMAScript5没有解析八进制的能力

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

　　[注意]对于那些会自动转为科学计数法的数字，`parseInt`会将科学计数法的表示方法视为字符串，因此导致一些奇怪的结果

```javascript
console.log(parseInt(1000000000000000000000.5)); // 1
// 等同于
console.log(parseInt('1e+21')); // 1

console.log(parseInt(0.0000008)); // 8
// 等同于
console.log(parseInt('8e-7')); // 8
```

　　【3】`parseInt()`方法还可以接受第二个参数（2到36之间），表示被解析的值的进制，返回该值对应的十进制数。默认情况下，`parseInt`的第二个参数为10，即默认是十进制转十进制

```javascript
console.log(parseInt('11',2));//3

console.log(parseInt('11',8));//9

console.log(parseInt('11',10));//11

console.log(parseInt('11',16));//17
```

　　如果第二个参数不是数值，会被自动转为一个整数。这个整数只有在2到36之间，才能得到有意义的结果，超出这个范围，则返回 `NaN`。如果第二个参数是`0`、`undefined` 和 `null`，则直接忽略

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

　　【4】`parseInt()`是专门用来处理字符串转换数字的，`parseInt`处理非字符串和数字类型时输出`NaN`。但是，实际上parseInt()包含着隐式的 `toString()`方法，所以 `parseInt([数字或字符串])` 输出对应的数字

```javascript
console.log(parseInt(null),parseInt(undefined)); // NaN NaN

console.log(parseInt(true),parseInt(false)); // NaN NaN

console.log(parseInt([]),parseInt(['2.5px']),parseInt([2.5])); // NaN 2 2

console.log(parseInt(''),parseInt(' '),parseInt({})); // NaN NaN NaN

```

### parseFloat()

　　【1】`parseFloat()` 专门用于字符串转换浮点数。同样地，解析时会忽略字符串前面的空格，直到找到第一个非空格字符，然后一直解析到字符串末尾或一个无效的浮点数字字符为止

```javascript
console.log(parseFloat('    0123.px')); // 123

console.log(parseFloat('    123.px')); // 123

console.log(parseFloat('    123.1px')); // 123.1

console.log(parseFloat('   123.1.2px   ')); // 123.1

console.log(parseFloat(' -123.0px')); // -123

console.log(parseFloat('.123.1px')); // 0.123

console.log(parseFloat('0 123px')); // 0
```

　　[注意]如果字符串符合科学计数法，则会进行相应的转换

```javascript
console.log(parseFloat('314e-2')); // 3.14

console.log(parseFloat('0.0314E+2')); // 3.14
```

　　【2】`parseFloat()`可以识别不同进制的数字，但只能解析十进制字符串

```javascript
console.log(parseFloat('11')); // 11

console.log(parseFloat(11)); // 11

console.log(parseFloat('11.1')); // 11.1

console.log(parseFloat(11.1)); // 11.1

console.log(parseFloat('011')); // 11

console.log(parseFloat(011)); // 9

console.log(parseFloat('011.1')); // 11.1

console.log(parseFloat(011.1)); // 报错

console.log(parseFloat('0x11')); // 0

console.log(parseFloat(0x11)); // 17

console.log(parseFloat('0x11.1')); // 0

console.log(parseFloat(0x11.1)); // 报错
```

　　【3】`parseFloat()`是专门用来处理字符串转换浮点数的，`parseFloat`处理非字符串和数字类型时输出 `NaN`。但是，实际上 `parseFloat()` 包含着隐式的 `toString()` 方法，所以 `parseFloat([数字或字符串])` 输出对应的数字

```javascript
console.log(parseFloat(null),parseFloat(undefined));//NaN NaN

console.log(parseFloat(true),parseFloat(false));//NaN NaN

console.log(parseFloat([]),parseFloat([2.1]),parseFloat(['2.1px']));//NaN 2.1 2.1

console.log(parseFloat(''),parseFloat({}));//NaN NaN
```

　　[注意]`Number('')` 的结果是0，`parseInt('')` 和 `parseFloat('')`的结果是 `NaN`


## 实例方法

　　关于 `Number()` 对象的实例方法总共有6个，分为两类。包括 `toString()` 、`toLocalString()`、`valueOf()`这3种对象通用方法和 `toFixed()`、`toExponential()`、`toPrecision()` 这3种改变数值显示形式并转换为字符串的方法

　　valueOf()方法返回对象的数字字面量

　　toString()方法将数字转换为字符串

　　toLocalString()方法将数字转换为本地惯例格式化数字的字符串

```javascript
console.log(typeof 1.1.valueOf(),1.1.valueOf()); // number 1.1

console.log(typeof 1.1.toString(),1.1.toString()); // String
'1.1'

console.log(typeof 1.1.toLocaleString(),1.1.toLocaleString()); // String '1.1'
```

　　[注意]如果数字不加括号，点会被javascript引擎解释成小数点，从而报错

```javascript
console.log(typeof 1.valueOf(),1.valueOf()); // 报错

console.log(typeof 1.toString(),1.toString()); // 报错

console.log(typeof 1.toLocaleString(),1.toLocaleString()); // 报错

console.log(typeof (1).valueOf(),(1).valueOf()); // number 1

console.log(typeof (1).toString(),(1).toString()); // String '1'

console.log(typeof (1).toLocaleString(),(1).toLocaleString()); // String '1'
```

　　除了为数字加上括号，还可以在数字后面加两个点，Javascript会把第一个点理解成小数点，把第二个点理解成调用对象属性，从而得到正确结果

```javascript
console.log(10..toString()); // "10"

console.log(10 .toString()); // "10"

console.log(10.0.toString()); // "10"
```

　　`toString()` 方法可以接受一个参数，该参数应当是2到36之间的整数，表示输出的进制。如果该参数不存在，或者为 `undefined`，默认将数值先转为十进制，再输出字符串

```javascript
var num = 10;

console.log(num.toString());//'10'

console.log(num.toString(2));//'1010'

console.log(num.toString(8));//'12'

console.log(num.toString(10));//'10'

console.log(num.toString(16));//'a'

console.log(num.toString(undefined));//'10'
```

　　如果参数超出2-36的范围，或者为其他值时，报错

```javascript
console.log((10).toString(0));//报错

console.log((10).toString(null));//报错
```

## toFixed()

　　`toFixed()` 方法按照指定的小数位返回数值四舍五入后的字符串表示(常用于处理货币值)

　　[注意]`toFixed()` 里的参数只接受0-20，若不传参或参数为 `undefined` 则相当于参数是0

```javascript
var num = 10.456;

console.log(num.toFixed(2));//'10.46'

console.log(num.toFixed());//'10'

console.log(num.toFixed(0));//'10'

console.log(num.toFixed(undefined));//'10'

console.log(num.toFixed(-1));//报错
```

## toExponential()

　　`toExponential()` 方法返回数值四舍五入后的指数表示法(e表示法)的字符串表示，参数表示转换后的小数位数

　　[注意]`toExponential()` 方法里的参数只接受0-20，但与 `toFxied()`不同的是，若不传参或参数为 `undefined`，则保留尽可能多的有效数字；若参数是0表示没有小数部分

```javascript
var num = 10.456;

console.log(num.toExponential(2));//'1.05e+1'

console.log(num.toExponential());//'1.0456e+1'

console.log(num.toExponential(0));//'1e+1'

console.log(num.toExponential(undefined));//'1.0456e+1'

console.log(num.toExponential(-1));//报错
```

## toPrecision()

　　`toPrecision()` 方法接收一个参数，即表示数值的所有数字的位数(不包括指数部分)，自动调用 `toFixed()` 或 `toExponential()`

　　[注意] `toPrecision()` 里的参数只接受1-21，若不传参或参数为 `undefined` 则相当于调用 `toString()` 方法

```javascript
var num = 10.1;

console.log(num.toPrecision(3));//'10.1'

console.log(num.toPrecision(2));//'10'

console.log(num.toPrecision(1));//'1e+1'

console.log(num.toPrecision());//'10.1'

console.log(num.toPrecision(undefined));//'10.1'

console.log(num.toPrecision(0));//报错
```

　　[注意] `toFixed()`、`toExponential()`、`toPrecision()`这三个方法在小数位用于四舍五入时都不太可靠，跟浮点数不是精确储存有关

```javascript
console.log((12.25).toPrecision(3)); // "12.3"

console.log((12.25).toFixed(1)); // "12.3"

console.log((12.25).toExponential(2)); // "1.23e+1"

console.log((12.35).toPrecision(3)); // "12.3"

console.log((12.35).toFixed(1)); // "12.3"

console.log((12.35).toExponential(2)); // "1.23e+1"
```