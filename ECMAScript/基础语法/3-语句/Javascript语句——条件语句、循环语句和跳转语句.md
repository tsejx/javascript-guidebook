# Javascript语句——条件语句、循环语句和跳转语句 

标签（空格分隔）： JS

---
## 前面的话

　　默认情况下，javascript解释器依照语句的编写顺序依次执行。而javascript中的很多语句可以改变语句的默认执行顺序。本文介绍可以改变语句默认执行顺序的条件语句、循环语句和跳转语句

## 条件语句

　　脚本的威力体现在它们可以根据人们给出的各种条件做出决策，javascript使用条件语句来做判断

　　条件语句(conditianal statement)通过判断表达式的值来决定执行还是跳过某些语句，包括if语句和switch语句

### 【if语句】

　　最常见的条件语句是if语句。if语句的条件必须放在if后面的圆括号内，条件的求值结果永远是一个布尔值，即只能是true或false。花括号中的语句，不管它们有多少条，只有在给定条件的求值结果是true的情况下才会执行

```javascript
if(expression){
    statements;
}
```

　　[注意]if语句中，括住expression的圆括号在语法上是必需的

　　实际上，if语句中的花括号不是必不可少的。如果if语句中的花括号部分只包含一条语句，可以不使用花括号。但因为花括号可以提高脚本的可读性，所以在if语句中总是使用花括号是个好习惯

```javascript
//可行，但不推荐
if(1>2)alert('1');

//推荐写法
if(1>2){
    alert('1');
}
```

　　if语句根据表达式的值改变程序流程。当expression的值为true时执行跟在其后的代码块，当expression的值为false时，执行else的逻辑

```javascript
if(expression)
    statement1
else
    statement2
```

　　当在if/else语句中嵌套使用if语句时，必须注意确保else语句匹配正确的if语句

```javascript
//错误暗示
if( i == j)
    if(j == k)
        console.log('i == k');
else console.log('i != j');
```

　　javascript中的if/else匹配规则是：else总是和就近的if语句匹配

```javascript
//实际解释
if( i == j){
    if(j == k)
        console.log('i == k');
    else
        console.log('i != j');//错误
}
```

```javascript
//使用花括号
if(i == j){
    if(j == k){
        console.log('i == k');
    }
}else{
    console.log('i != j');
}
```

　　当代码有多条分支时，需要使用else if语句。else if语句并不是真正的javascript语句，它是多条if/else语句连在一起时的一种惯用写法 

```javascript
if(n == 1){
    //代码1
}else if(n == 2){
    //代码2
}else if(n == 3){
    //代码3
}else{
    //其他代码
}
```

　　可以用if语句的嵌套形式来完成在语法上等价的代码，但没有else if语句清晰

```javascript
if(n == 1){
    //代码1
}else{
    if(n == 2){
        //代码2
    }else{
        if(n == 3){
            //代码3
        }else{
           //其他代码
        }
    }
}
```

### 【switch语句】

　　当所有的分支都依赖于**同一个表达式的值**时，else if并不是最佳解决方案。在这种情况下，重复计算多条if语句中的条件表达式是非常浪费的做法，而switch语句正适合处理这种情况

　　switch语句执行一个多路分支，首先计算expression的值，然后查找case子句的表达式是否和expression的值相同。如果找到匹配的case，那么将会执行这个case对应的代码块。如果找不到匹配的case，那么将会执行default标签中的代码块。如果没有default标签，switch语句将跳过它的所有代码块

```javascript
switch (expression)
  case value1: statement1;
    break;
  case value2: statement2;
    break;
  case value3: statement3;
    break;
  default: statement4;
```

```javascript
if(n == 1){
    //代码1
}else if(n == 2){
    //代码2
}else if(n == 3){
    //代码3
}else{
    //其他代码
}
```

```javascript
//等价于
switch(n){
    case 1:
        //代码1
        break;
    case 2:
        //代码2
        break;
    case 3:
        //代码3
        break;
    default:
        //代码4
}
```

　　每一个case语句块的结尾处都使用了关键字break。break语句可以使解释器跳出switch语句或循环语句

　　在switch语句中，case只是指明了要执行的代码起点，但并没有指明终点。如果没有break语句，那么switch语句就会从与expression的值相匹配的case标签处的代码块开始执行，依次执行后续的语句，一直到整个switch代码块的结尾

```javascript
//如果没有break语句，若switch语句匹配1，则不仅执行代码1，也会执行代码2和代码3
switch(n){
    case 1:
        //代码1
    case 2:
        //代码2
    default:
        //代码3
}
```

　　如果确实需要混合几种情形，要在代码中添加注释，说明是有意省略了break关键字

```javascript
switch(i){
    //合并两种情形
    case 25:
    case 35:
        console.log('25 or 35');
        break;
    case 45:
        console.log('45');
        break;
    default:
        console.log('other');
}
```

　　如果在函数中使用switch语句，可以使用return来代替break，return和break都用于终止switch语句，也会防止一个case语句块执行完后继续执行下一个case语句块

```javascript
//函数中使用switch语句
function convert(x){
    switch(typeof x){
        case 'number':
            return x.toString(16);
        case 'string':
            return '"' + x + '"';
        default:
            return String(x);
    }
}
```

　　虽然ECMAScript中的switch语句借鉴自其他语言，但这个语句也有自己的特色。可以在switch语句中使用任何数据类型(在很多其他语言中只能使用数值)，而且每个case的值不一定是常量，可以是变量或表达式

```javascript
var num = 25;
switch(true){
    case num < 0:
        console.log('less than 0.');
        break;
    case num >=0 && num <=10:
        console.log('between 0 and 10.');
        break;
    case num >10 && num <=20:
        console.log('between 10 and 20.');
        break;
    default:
        console.log('more than 20.');
}
```

　　使用switch语句时，要注意以下几点：

　　【1】由于每次执行switch语句时，并不是所有的case表达式都能执行到，因此，应该避免使用带有副作用的case表达式，比如函数调用表达式和赋值表达式，最安全的做法是在case表达式中使用常量表达式

　　【2】default标签一般都出现在switch的末尾，位于所有case标签之后，当然这是最合理也是最常用的写法，实际上，default标签可以放置在switch语句内的任何地方

　　【3】switch语句中，对每个case的匹配操作实际上是'==='恒等运算符比较，而不是'=='相等运算符比较，因此，表达式和case的匹配并不会做任何类型转换

```javascript
//由于1并不会转换为'1'，所以结果是3
var n = 1;
switch(n){
    case '1':
        console.log(1);
        break;
    case 2:
        console.log(2);
        break;
    default:
        console.log(3);
}
```
 

## 循环语句

　　条件语句把Javascript中的代码变成一条条的分支路径，而循环语句(looping statement)就是程序路径的一个回路，可以让一部分代码重复执行

　　jJavascript有4种循环语句：`while`、`do/while`、`for`、`for/in`，它们的工作原理几乎一样：只要给定条件仍能得到满足，包含在循环语句里的代码就将重复地执行下去。一旦给定条件的求值结果不再是true，循环也就到此为止。其中最常用的循环就是对数组元素的遍历

### 【while语句】

　　while语句属于**前测试循环语句**，也就是说，在循环体内的代码被执行之前，就会对出口条件求值

```javascript
while(expression){
　　statement
}
```

　　当表达式expression是真值时则循环执行statement，直到expression的值为假值为止；如果是假值，那么程序将跳过循环

　　[注意]使用while(true)会创建一个死循环

　　大多数循环都会有一个像count这样的计数器变量。尽管循环计数器常用i、j、k这样的变量名，但如果想要让代码可读性更强，就应当使用更具语义的变量名

```javascript
var count = 0;
while(count < 10){
    console.log(count);
    count++;
}
```

### 【do while语句】

　　do while语句是**后测试循环**，即退出条件在执行循环内部的代码之后计算。这意味着在计算表达式之前，至少会执行循环主体一次

```javascript
do{
    statement
}while(expression);
```

　　do/while循环和普通的while循环有两点语法方面不同：

　　【1】do/while循环要求必须使用关键字do来标识循环的开始，用while来标识循环的结尾并进入循环条件判断

　　【2】do/while循环用分号结尾。如果while循环体使用花括号括起来，则while循环也不用使用分号做结尾

```javascript
function printArray(a){
    var len = a.length,i=0;
    if(len == 0){
        console.log('empty');
    }else{
        do{
            console.log(a[i]);
        }while(++i<len);
    }
}
```

### 【for语句】

　　for语句提供了一种比while语句更加方便的循环控制结构，用for循环来重复执行一些代码的好处是循环控制结构更加清晰

　　大部分的循环都具有特定的计数器变量，计数器的三个关键操作是初始化、检测和更新。for语句将这三步明确声明为循环语法的一部分，各自使用一个表达式来表示

```javascript
for(initialize;test;increment){
    statement;    
}

//等价于:
initialize;
while(test){
    statement
    increment;
}
```
　　[注意]使用continue语句时，while循环和for循环并不等价

　　initialize、test和increment三个表达式之间用分号分隔，它们分别负责初始化操作、循环条件判断和计数器变量的更新。将它们放在循环的第一行会更容易理解for循环正在做什么，而且也可以防止忘记初始化或者递增计数器变量

　　initialize表达式只在循环开始之前执行一次；每次循环执行之前会执行test表达式，并判断表达式的结果来决定是否执行循环体，如果test计算结果为真值，则执行循环体中的statement，最后，执行increment表达式

　　在for循环的变量初始化表达式中，也可以不使用var关键字，该变量的初始化可以在外部执行

```javascript
var count = 10;
var i;
for(i = 0; i < count; i++){
    console.log(i);
}
```

　　由于ECMAScript中不存在块级作用域，因此在循环内部定义的变量也可以在外部访问到

```javascript
var count = 10;
for(var i = 0; i < count; i++){
    console.log(i);
}
console.log(i);//10
```

　　for循环常见用途是对某个数组里的全体元素进行遍历处理

```javascript
var beatles = Array('John','Paul','George','Ringo');
for(var count = 0; count < beatles.length; count++){
    alert(beatles[count]);
}
```

　　如果循环中的一次迭代会改变多个变量，则需要用到逗号运算符，它将初始化表达式和自增表达式合并入一个表达式中以用于for循环

```javascript
var i,j;
for(i = 0,j =10; i<10; i++,j--) sum+= i*j;
```

　　代码中的循环变量除了是数字外，也可以是其他类型

　　可以使用for循环来遍历链表数据结构，并返回链表中的最后一个对象(也就是第一个不包含next属性的对象)

```javascript
function tail(o){
    for(;o.next;o = o.next) /*empty*/;
    return o;
}
```

　　for循环中的initialize、test和increment这三个表达式中的任何一个都可以忽略，但是两个分号必不可少。如果省略test表达式，那么这将是一个死循环。同样，和while(true)类似，死循环的另外一种写法是

```javascript
for(;;)
```

### 【for in语句】

　　`for/in`语句也使用for关键字，但它和常规的for循环是完全不同的一类循环

```javascript
for(variable in object){
    statement
}
```

　　variable通常是一个变量名，也可以是一个可以产生左值的表达式或一个通过var语句声明的变量，总之必须是一个适用于赋值表达式左侧的值。object是一个表达式，这个表达式的计算结果是一个对象。同样，statement是一个语句或语句块，它构成了循环的主体

　　for/in循环可以用来更方便地遍历对象属性成员

```javascript
for(var p in o){
    console.log(o[p]);
}
```

　　在执行`for/in`语句的过程中，Javascript解释器首先计算object表达式。如果表达式为null或undefined。Javascript解释器将会跳过循环并执行后续的代码。如果表达式等于一个原始值，这个原始值将会转换为与之对应的包装对象(wrapper object)。否则，expression本身已经是对象了。Javascript会依次枚举对象的属性来执行循环。然而，在每次循环前，Javascript都会先计算variable表达式的值，并将属性名(一个字符串)赋值给它

　　[注意]只要for/in循环中variable的值可以当做赋值表达式的左值，它可以是任意表达式，每次循环都会计算这个表达式，也就是说每次循环它计算的值有可能不同

```javascript
var obj = {
  x: 1,
  y: 2
};
var props = [];
var i = 0;
for (props[i++] in obj);
props // ['x', 'y']
```

　　javascript数组不过是一种特殊的对象，因此，for/in循环可以像枚举对象属性一样枚举数组索引

```javascript
var o = {a: 1, b: 2, c: 3};
for (var i in o) {
  console.log(o[i]);
}
// 1
// 2
// 3
```

　　[注意]for/in循环并不会遍历对象的所有属性，只有可枚举(enumerable)的属性才会遍历到

　　ECMAScript规范并没有指定for/in循环按照何种顺序来枚举对象属性。但实际上，主流浏览器厂商的javascript实现是按照属性定义的先后顺序来枚举简单对象的属性，先定义的属性先枚举。如果使用对象直接量的形式创建对象，则将按照直接量中属性的出现顺序枚举。有一些网站和javascript库是依赖于这种枚举顺序的，浏览器厂商不大可能会修改这个顺序

 
## 跳转语句

　　跳转语句(jump statement)可以让解释器跳转到程序的其他部分继续执行，包括break、continue和return语句

### 【label语句】

　　介绍跳转语句不得不提到标签(label)语句，通过给语句定义标签，就可以在程序的任何地方通过标签名引用这条语句

　　标签语句通常与break语句和continue语句配合使用，跳出特定的循环

```javascript
identifier: statement
```

　　[注意]用做标签的identifier必须是一个合法的javascript标识符，而不能是一个保留字

```javascript
mainloop: while(token != null){
    //Todo
    continue mainloop;
}
```

　　标签的命名空间和变量或函数的命名空间是不同的，因此可以使用同一个标识符作为语句标签和作为变量名或函数名

　　语句标签只有在它所起作用的语句(当然也可以在它的子句中)内是有定义的。一个语句标签不能和它内部的语句标签重名，但在两个代码段不相互嵌套的情况下，是可以出现同名的语句标签的。带有标签的语句还可以带有标签，也就是说，任何语句可以有很多个标签

### 【break语句】

　　单独使用break语句的作用是立即退出最内层的循环或switch语句

```javascript
break;
for(var i = 0; i < a.length; i++){
    if(a[i] == target) break;
}
```

　　break语句只有出现在循环语句或switch语句中才合法，出现在其他语句中会报错

```javascript
//报错
if(true){
    break;
}
//报错
function test(){
    var i = 0;
    break;
}
test();
```

　　当希望通过break来跳出非就近的循环体或switch语句时，就会用到带标签的break语句

```javascript
break labelname;
```

　　当break和标签一块使用时，程序将跳转到这个标签所标识的语句块的结束，或者直接终止这个闭合语句块的执行。当没有任何闭合语句块指定了break所用的标签，这时会产生一个语法错误

```javascript
top:
  for (var i = 0; i < 3; i++){
    for (var j = 0; j < 3; j++){
      if (i === 1 && j === 1) break top;
      console.log( i, j);
    }
  }
```

　　[注意]不管break语句带不带标签，它的控制权都无法越过函数的边界。比如，对于一条带标签的函数定义语句来说，不能从函数内部通过这个标签来跳转到函数外部

### 【continue语句】

　　continue语句和break语句非常类似，但它不是退出循环，而是转而执行下一次循环

```javascript
continue;
continue labelname;
```

　　不管continue语句带不带标签，它只能在循环体内使用。在其他地方使用将会报语法错误

　　当执行到continue语句时，当前的循环逻辑就终止了，随即执行下一次循环。但在不同类型的循环中，continue行为也有所不同：

　　【1】while循环中，循环开始处指定的exression会重复检测，如果检测结果为true，则循环体会从头开始执行

　　【2】do while循环中，程序执行直接跳到循环结尾处，这时会重新判断循环条件，之后才会继续下一次循环

　　【3】for循环中，首先计算自增表达式，然后再次检测test表达式，用以判断是否执行循环体

　　【4】在for/in循环中，循环开始遍历下一个属性名，这个属性名赋给了指定的变量

　　[注意]continue语句在while和for循环中的区别：while循环直接进入下一轮的循环条件判断，但for循环首先计算其increment表达式，然后判断循环条件

```javascript
//1 3
for(i = 0; i < 5; i++){
    if(i % 2 === 0)continue;
    console.log(i);
}

//1 3 5
var i = 0;
while(i<5){
    i++;    
    if(i % 2 === 0)continue;
    console.log(i);
}
```

　　由于continue在这两种循环中的行为表现不同，因此使用while循环不可能完美地模拟等价的for循环

　　和break语句类似，带标签的continue语句可以用在嵌套的循环中，用以跳出多层嵌套的循环体逻辑

```javascript
top:
  for (var i = 0; i < 3; i++){
    for (var j = 0; j < 3; j++){
      if (i === 1 && j === 1) continue top;
      console.log('i=' + i + ', j=' + j);
    }
  }
```

### 【return语句】

　　函数调用是一种表达式，而所有表达式都有值。函数中的return语句就是指定函数调用后的返回值

```javascript
return expression;
　　return语句只能出现在函数体内，如果不是会报语法错误。当执行到return语句时，函数终止执行，并返回expression的值给调用程序

function square(x)
{    
    return x*x
};
square(2);
```

　　如果没有return语句，则函数调用仅仅依次执行函数体内的每一条语句直到函数结束，最后返回调用程序。这种情况下，调用表达式的结果是undefined。return语句经常作为函数内的最后一条语句出现，但并不是说一定要放在函数最后，即使在执行return语句的时候还有很多后续代码没有执行到，这时函数也还是会返回调用程序

　　return语句可以单独使用而不必带有expression，这样的话也会向调用程序返回undefined

```javascript
function display_object(o){
    if(!o) return;
}
```

　　在javascript词法结构中，已经提到过分号的用法。所有的跳转语句包括break、continue、return等语句，都不可以在关键字和表达式之间换行，因为javascript会在换行处填补分号

```javascript
//以及return语句举例，break、continue语句也类似
return
true;
　　javascript将其解析为:

return;true;
```

　　而代码的本意是:

```javascript
return true;
```
 
参考资料

【1】 ES5/语句 https://www.w3.org/html/ig/zh/wiki/ES5/statements
【2】 阮一峰Javascript标准参考教程——语法概述 http://javascript.ruanyifeng.com/grammar/basic.html#toc12
【3】 W3School-Javascript高级教程——语句 http://www.w3school.com.cn/js/pro_js_statements_if.asp
【4】《javascript权威指南(第6版)》第5章 语句
【5】《javascript高级程序设计(第3版)》第3章 基本概念 
【6】《javascript DOM编程艺术(第2版)》第2章 Javascript语法
【7】《javascript语言精粹》 第2章 语法




