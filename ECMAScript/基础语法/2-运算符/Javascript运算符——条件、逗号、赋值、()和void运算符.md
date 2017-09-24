# Javascript运算符——条件、逗号、赋值、()和void运算符

## 前面的话

　　Javascript中运算符总共有46个，除了前面已经介绍过的**算术运算符**、**关系运算符**、**位运算符**、**逻辑运算符**之外，还有很多运算符。本文将介绍条件运算符、逗号运算符、赋值运算符、()和void运算符


## 条件运算符

　　条件运算符是javascript中唯一的一个三元运算符(三个操作数)，有时直接称做三元运算符。通常这个运算符写成`?:`，当然在代码中往往不会这么简写，因为这个运算符拥有三个操作数，第一个操作数在?之前，第二个操作数在?和:之间，第三个操作数在:之后

```javascript
variable = boolean_expression ? true_value : false_value;
```

　　本质上，这就是基于对`boolean_expression`求值的结果，决定给变量variable赋什么值。如果求值结果是true，则给变量variable赋值`true_value`；如果求值结果是false，则给变量variable赋值`false_value`

　　条件运算符的操作数可以是任意类型，第一个操作数当成布尔值，如果它是真值，那么将计算第二个操作数，并返回其计算结果。否则，如果第一个操作数是假值，那么将计算第三个操作数，并返回其计算结果。第二个和第三个操作数总是会计算其中之一，不可能两者同时执行。

　　其实使用if语句也会带来同样的效果，`?:`运算符只是提供了一种简写形式。下面是一个`?:`的典型应用场景，判断一个变量是否有定义(并拥有一个有意义的真值)，如果有定义则使用它，如果无定义则使用一个默认值:

```javascript
greeting = 'hello ' + (username ? username : 'there');
```

　　这和下面使用if语句的代码是等价的，但显然上面的代码更加简洁:

```javascript
greeting = 'hello ';
if(username)
    greeting += username;
else
    greeting += 'there';
```

　　三元条件表达式与if...else语句具有同样表达效果，但是两者有一个重大差别，if...else是语句，没有返回值；三元条件表达式是表达式，具有返回值。所以，在需要返回值的场合，只能使用三元条件表达式，而不能使用if...else

```javascript
console.log(true ? 'T' : 'F');
```

　　上面代码中，`console.log()`方法的参数必须是一个表达式，这时就只能使用三元条件表达式


## 逗号运算符

　　逗号运算符是二元运算符，它的操作数可以是任意类型。它首先计算左操作数，然后计算右操作数，最后返回右操作数的值，用逗号运算符可以在一条语句中执行多个运算

```javacript
i = 0,j = 1,k = 2;
```

```javacript
//计算结果是2，它和下面的代码基本等价
i =0; j = 1; k = 2;
```

　　逗号运算符常用于声明多个变量

```javascript
var iNum1 = 1, iNum = 2, iNum3 = 3;
```

　　逗号运算符最常用的场景是在for循环中，这个for循环通常具有多个循环变量：

```javascript
//for循环中的第一个逗号是var语句的一部分
//第二个逗号是逗号运算符
//它将两个表达式(i++和j--)放在一条语句中
for(var i=0, j=10;i<j;i++,j--){
    console.log(i+j);
}
```

　　逗号运算符还可以用于赋值，在用于赋值时，逗号运算符总是返回表达式中的最后一项

```javascript
var num = (1,2,3,4,5);
console.log(num); //5
```

　　[注意]去掉括号会报错


## 赋值运算符

　　简单的赋值操作符由等号'='表示，作用是把等号右边的值赋予等号左边的变量或属性

```javascript
i = o;
o.x = 1;
```

　　'='运算符希望它的左操作数是一个左值：一个变量或者对象属性(或数组元素)。它的右操作数可以是任意类型的任意值。赋值表达式的值就是右操作数的值

　　尽管赋值表达式通常非常简单，但有时仍会看到一些复杂表达式包含赋值表达式的情况。例如，可以将赋值和关系操作符放在一个表达式中，就像这样：

```javascript
(a=b) == 0
```

　　如果这样做的话，应该清楚知道'='和'=='运算符之间的区别。'='具有非常低的优先级，通常在一个较长的表达式中用到了一条赋值语句的值时的时候，需要补充圆括号以保证正确的运算顺序

　　赋值操作符的结合性是从右到左，也就是说，如果一个表达式中出现了多个赋值运算符，运算顺序是从右到左。因此，可以通过如下方式来对多个变量赋值：

```javascript
i = j = k = 0; //把三个变量初始化为0
```

　　javascript还提供11个复合的赋值运算符，这些复合的赋值运算符，都是先进行指定运算，然后将得到的值返回给左边的变量

　　[注意]设计这些操作符的目的是简化赋值操作，使用它们并不会带来任何性能的提升

```javascript
total += sales_tax;
//等价于
total = total + sales_tax;
```

```javascript
运算符      示例        等价于
+=         a+=b         a=a+b
-=         a-=b         a=a-b
*=         a*=b         a=a*b
/=         a/=b         a=a/b
%=         a%=b         a=a%b
<<=        a<<=b        a=a<<b
>>=        a>>=b        a=a>>b
>>>=       a>>>=b       a=a>>>b
&=         a&=b         a=a&b
|=         a|=b         a=a|b
^=         a^=b         a=a^b
```

　　在大多数情况下，表达式为:

```javascript
a op= b
```

　　这里op代表一个运算符，这个表达式和下面的表达式等价

```javascript
a = a op b
```

　　在第一行中，表达式a计算了一次，在第二行中，表达式a计算了两次，只有在a包含具有副作用的表达式(比如函数调用和赋值操作)的时候，两者才不等价

```javascript
data[i++]*=2;
data[i++] = data[i++]*2;
```

```javascript
var data = [0,1,2],i=0;
data[++i]+=10;
console.log(data);//[0,11,2]
var data = [0,1,2],i=0;
data[++i]= data[++i] + 10;
console.log(data);//[0,12,2]
```

## 圆括号运算符

　　圆括号运算符也叫分组运算符，它有两种用法：如果表达式放在圆括号中，作用是求值；如果跟在函数后面，作用是调用函数

　　把表达式放在圆括号之中，将返回表达式的值

```javascript
console.log((1));  //1
console.log(('a')); //'a'
console.log((1+2)); // 3
```

　　把对象放在圆括号之中，则会返回对象的值，即对象本身

```javascript
var o = {p:1};
console.log((o));// Object {p: 1}
```

　　将函数放在圆括号中，会返回函数本身。如果圆括号紧跟在函数的后面，就表示调用函数，即对函数求值

```javascript
function f(){return 1;}
console.log((f));// function f(){return 1;}
console.log(f()); // 1
```

　　[注意]圆括号运算符不能为空，否则会报错

```javascript
(); //SyntaxError: Unexpected token )
```
　　由于圆括号的作用是求值，如果将语句放在圆括号之中，就会报错，因为语句没有返回值

```javascript
console.log(var a = 1);// SyntaxError: Unexpected token var
console.log((var a = 1));// SyntaxError: Unexpected token var
```

## void运算符

　　void是一元运算符，它出现在操作数之前，操作数可以是任意类型，操作数会照常计算，但忽略计算结果并返回undefined。由于void会忽略操作数的值，因此在操作数具有副作用的时候使用void来让程序更具语义

```javascript
console.log(void 0); // undefined
console.log(void(0)); // undefined
```

【作用一】替代undefined

　　由于undefined并不是一个关键字，其在IE8-浏览器中会被重写，在高版本函数作用域中也会被重写；所以可以用void 0 来替换undefined

```javascript
var undefined = 10;
console.log(undefined);//IE8-浏览器下为10，高版本浏览器下为undefined
function t(){
    var undefined = 10;
    console.log(undefined);
}
console.log(t());//所有浏览器下都是10
```

【作用二】客户端URL

　　这个运算符最常用在客户端URL——javascript:URL中，在URL中可以写带有副作用的表达式，而void则让浏览器不必显示这个表达式的计算结果。例如，经常在HTML代码中的`<a>`标签里使用void运算符

```javascript
<a href="javascript:void window.open();">打开一个新窗口</a>
```

【作用三】阻止默认事件

　　阻止默认事件的方式是给事件置返回值false

```javascript
//一般写法
<a href="http://example.com" onclick="f();return false;">文字</a>
```

　　使用void运算符可以取代上面写法

```javascript
<a href="javascript:void(f())">文字</a>
```

参考资料

【1】 阮一峰Javascript标准参考教程——基本语法 http://javascript.ruanyifeng.com/grammar/operator.html
【2】 W3School-Javascript高级教程——一元运算符 http://www.w3school.com.cn/js/pro_js_operators_unary.asp
【3】《javascript权威指南(第6版)》第4章 表达式和运算符
【4】《javascript高级程序设计(第3版)》第3章 基本概念



