# 函数概述

## 函数定义

　　总共有三种函数定义的方式

### 函数声明语句

　　使用function关键字，后跟一组参数以及函数体

```javascript
function funcname([arg1 [,arg2 [...,argn]]]){
    statement;
}
```

　　`funcname` 是要声明的函数名称的标识符。函数名之后的圆括号中是参数列表，参数之间使用逗号分隔。当调用函数时，这些标识符则指代传入函数的实参。

　　[注意]function语句里的花括号是必需的，这和while循环和其他一些语句所使用的语句块是不同的，即使函数体内只包含一条语句，仍然必须使用花括号将其括起来

```javascript
function test() // SyntaxError: Unexpected end of input
function test(){}; // 不报错
while(true); // 不报错
```

**提升**

　　函数声明提升(hoisting)，函数名称和函数体都提升

```javascript
foo();
function foo(){
    console.log(1);//1
}
```

　　上面这个代码片段之所以能够在控制台输出1，就是因为foo()函数声明进行了提升，如下所示：

```javascript
function foo(){
    console.log(1);
}
foo();
```

**重复**

　　变量的重复声明是无用的，但函数的重复声明会覆盖前面的声明(无论是变量还是函数声明)

```javascript
//变量的重复声明无用
var a = 1;
var a;
console.log(a);//1
```

```javascript
//由于函数声明提升优先于变量声明提升，所以变量的声明无作用
var a;
function a(){
    console.log(1);
}
a();//1
```

```javascript
//后面的函数声明会覆盖前面的函数声明
a();//2
function a(){
    console.log(1);
}
function a(){
    console.log(2);
}
```

　　所以，应该避免在同一作用域中重复声明

**删除**

　　和变量声明一样，函数声明语句创建的变量无法删除

```javascript
function foo(){
    console.log(1);
}
delete foo; // false
console.log(foo()); // 1
```

### 函数定义表达式

　　以表达式方式定义的函数，函数的名称是可选的

```javascript
var functionName = function([arg1 [,arg2 [...,argn]]]){
    statement;
}
                      
var functionName = function funcName([arg1 [,arg2 [...,argn]]]){
    statement;
}
```

　　**匿名函数(anonymous function)**也叫拉姆达函数，是function关键字后面没有标识符的函数

　　通常而言，以表达式方式定义函数时都不需要名称，这会让定义它们的代码更加紧凑。函数定义表达式特别适合用来定义那些只会使用一次的函数

```javascript
var tensquared = (function(x) {return x*x;}(10));
```

　　而一个函数定义表达式包含名称，函数的局部作用域将会包含一个绑定到函数对象的名称。实际上，函数的名称将成为函数内部的一个局部变量

```javascript
var test = function fn(){
   return fn;
}
console.log(test); // fn(){return fn;}
console.log(test()); // fn(){return fn;}
console.log(test()()); // fn(){return fn;}
```

　　个人理解，对于具名的函数表达式来说，函数名称相当于函数对象的形参，只能在函数内部使用；而变量名称相当于函数对象的实参，在函数内部和函数外部都可以使用

```javascript
var test = function fn(){
   return fn === test;
}
console.log(test()); // true
console.log(test === fn); // ReferenceError: fn is not defined
```

　　函数定义了一个非标准的name属性，通过这个属性可以访问到给定函数指定的名字，这个属性的值永远等于跟在function关键字后面的标识符，匿名函数的name属性为空

```javascript
// IE11-浏览器无效，均输出undefined
// chrome在处理匿名函数的name属性时有问题，会显示函数表达式的名字
function fn(){};
console.log(fn.name); // 'fn'
var fn = function(){};
console.log(fn.name); // ''，在chrome浏览器中会显示'fn'
var fn = function abc(){};
console.log(fn.name); // 'abc'
```

### Function构造函数

　　Function构造函数接收任意数量的参数，但最后一个参数始终都被看成是函数体，而前面的参数则枚举出了新函数的参数

```javascript
var functionName = new Function(['arg1' [,'arg2' [...,'argn']]],'statement;');
```

　　[注意]Function构造函数无法指定函数名称，它创建的是一个匿名函数

　　从技术上讲，这是一个函数表达式。但，不推荐使用，因为这种语法会导致解析两次代码。第一次是解析常规Javascript代码，第二次解析传入构造函数中的字符串，影响性能

```javascript
var sum = new Function('num1','num2','return num1 + num2');
//等价于
var sum = function(num1,num2){
    return num1+num2;
}
```

　　`Function()`构造函数创建的函数，其函数体的编译总是会在全局作用域中执行。于是，`Function()`构造函数类似于在全局作用域中执行的 `eval()`

```javascript
var test = 0;
function fn(){
    var test = 1;
    return new Function('return test');
}
console.log(fn()()); // 0
```

　　[注意]并不是所有的函数都可以成为构造函数

```javascript
var o = new Math.min(); // Uncaught TypeError: Math.min is not a constructor
```

## 函数返回值

　　函数中的return语句用来返回函数调用后的返回值

```javascript
return expression;
```

　　return语句只能出现在函数体内，如果不是会报语法错误

```javascript
return 1; // SyntaxError: Illegal return statement
```

　　如果没有return语句，则函数调用仅仅依次执行函数体内的每一条语句直到函数结束，最后返回调用程序。这种情况下，调用表达式的结果是undefined

```javascript
var test = function fn(){}
console.log(test()); // undefined
```

　　当执行到return语句时，函数终止执行，并返回expression的值给调用程序

```javascript
var test = function fn(){
    return 2;
};
console.log(test()); // 2
```

　　[注意]并不是函数中return语句后的所有语句都不执行，finally语句是例外，return语句不会阻止finally子句的执行

```javascript
function testFinnally(){
    try{
        return 2;
    }catch(error){
        return 1;
    }finally{
        return 0;
    }
}
testFinnally(); // 0
```

　　[注意]由于Javascript可以自动插入分号，因此在return关键字和它后面的表达式之间不能有换行

```javascript
var test = function fn(){
    return
    2;
};
console.log(test()); // undefined
```

　　一个函数中可以有多个return语句

```javascript
function diff(iNum1, iNum2) {
  if (iNum1 > iNum2) {
    return iNum1 - iNum2;
  } else {
    return iNum2 - iNum1;
  }
}
```

　　return语句可以单独使用而不必带有expression，这样的话也会向调用程序返回undefined

```javascript
var test = function fn(){
    return;
};
console.log(test()); // undefined
```

　　return语句经常作为函数内的最后一条语句出现，这是因为return语句可用来使函数提前返回。当return被执行时，函数立即返回而不再执行余下的语句

```javascript
//并没有弹出1
var test = function fn(){
    return;
    alert(1);
};
console.log(test());//undefined
```

　　如果函数调用时在前面加上了new前缀，且返回值不是一个对象，则返回this(该新对象)

```javascript
function fn(){
    this.a = 2;
    return 1;
}
var test = new fn();
console.log(test);//{a:2}
console.log(test.constructor);//fn(){this.a = 2;return 1;}
```

　　如果返回值是一个对象，则返回该对象

```javascript
function fn(){
    this.a = 2;
    return {a:1};
}
var test = new fn();
console.log(test);//{a:1}
console.log(test.constructor);//Object() { [native code] }
```


