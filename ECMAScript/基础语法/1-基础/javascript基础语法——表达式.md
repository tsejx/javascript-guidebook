# javascript基础语法——表达式

前面的话

　　一般地，关于javascript基础语法，人们听得比较多的术语是操作符和语句。但是，其实还有一个术语经常使用，却很少被提到，这就是javascript表达式(expression)。本文将详细介绍javascript表达式，表达式分为原始表达式和复杂表达式

 

## 原始表达式(primary exression)
　　原始表达式是表达式的最小单位——它不再包含其他表达式

　　原始表达式分为字面量、关键字和变量；详细来说包括this关键字、标识符引用、字面量引用、数组初始化、对象初始化和分组表达式

```javascript
PrimaryExpression : 
this 
Identifier 
Literal 
ArrayLiteral 
ObjectLiteral 
( Expression )
```

### this关键字和标识符

```javascript
this;//返回当前对象
i;//返回变量i的值
sum;//返回变量sum的值
```

### 字面量

　　字面量(literal)，又翻译成直接量，就是程序中直接使用的数据值

```javascript
 Literal ::
   NullLiteral
   BooleanLiteral
   NumericLiteral
   StringLiteral 
   RegularExpressionLiteral
```
```javascript
null;
undefined;
true;
false;
1;
'abc';
/pattern/;
```

### 数组和对象初始化

　　数组初始化和对象初始化实际上是一个以字面量的方式描述的初始化的过程。这两个初始化表达式有时称做"对象字面量"和"数组字面量"

```javascript
[];
[1,2,3];
{};
{a:1};
```

### 分组表达式

　　分组表达式实际上就是括号，用于重写运算符的优先级


## 复杂表达式(MemberExpression)
　　复杂表达式由原始表达式和操作符(operator)组合而成，包括属性访问表达式、对象创建表达式和函数表达式

```javascript
MemberExpression : 
MemberExpression [ Expression ] 
MemberExpression . IdentifierName 
new MemberExpression Arguments
FunctionExpression
```

### 属性访问表达式

　　属性访问表达式运算可以得到一个对象属性或一个数组元素的值，javascript为属性访问定义了两种语法

```javascript
MemberExpression . IdentifierName 
MemberExpression [ Expression ] 
```

　　第一种写法是一个表达式后跟随一个句点和标识符。表达式指定对象，标识符则指定需要访问的属性的名称

　　第二种写法是使用方括号，方括号内是另外一个表达式(这种方法适用于对象和数组)。第二个表达式指定要访问的属性的名称或代表要访问数组元素的索引

```javascript
var o = {x:1,y:{z:3}}; //对象字面量
var a = [o,4,[5,6]]; // 包含对象的数组字面量
o.x;//表达式o的x属性
o.y.z;//表达式o.y的z属性
o['x'];//对象o的x属性
a[1];//表达式a中索引为1的元素
```

　　不管使用哪种形式的属性访问表达式，在'.'和'['之前的表达式总是会首先计算

　　如果计算结果是null或undefined，表达式会抛出一个类型错误异常，因为这两个值都不能包含任意属性

　　如果计算结果不是对象，javascript会将其转换为对象

　　如果对象表达式后跟随句点和标识符，则会查找由这个标识符指定的属性值，并将其作为整个表达式的值返回

　　如果对象表达式后跟随一对方括号，则会计算方括号内的表达式的值并将其转换为字符串

　　不论哪种情况，如果命名的属性不存在，那么整个属性访问表达式的值就是undefined

### 对象创建表达式

　　对象创建表达式创建一个对象并调用一个函数初始化新对象的属性

```javascript
new Object();
new Point(2,3);
```

　　如果一个对象创建表达式不需要传入任何参数给构造函数的话，那么这对空圆括号是可以省略的

```javascript
new Object;
```

### 函数表达式

　　函数表达式分为**函数定义表达式**和**函数调用表达式**

　　函数定义表达式定义一个javascript函数，表达式的值是这个新定义的函数

　　一个典型的函数定义表达式包含关键字function，跟随其后的是一对圆括号，括号内是一个以逗号分割的列表，列表含有0个或多个标识符(参数名)，然后再跟随一个由花括号包裹的javascript代码段(函数体)

```javascript
function square(x){
    return x*x;
}
```

　　函数定义表达式同样可以包含函数的名字，函数也可以通过函数语句来定义，而不是函数表达式

```javascript
var square = function(x){return x*x;}
```

　　函数调用表达式是一种调用或执行函数或方法的语法表示。如果这个表达式是一个属性访问表达式，那么这个调用称做方法调用

```javascript
f(0);
Math.max(x,y,z);
a.sort();
```

**参考资料**

【1】 ES5/表达式 https://www.w3.org/html/ig/zh/wiki/ES5/expressions
【2】《javascript权威指南(第6版)》第4章 表达式和运算符
【3】《javascript语言精粹(修订版)》第2章 语法