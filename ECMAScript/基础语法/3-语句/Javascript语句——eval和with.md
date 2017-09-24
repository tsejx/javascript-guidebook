# JavaScript语句——eval和with

## 前面的话

　　eval和with经常被嫌弃，好像它们的存在就是错误。在CSS中，表格被嫌弃，在网页中只是用表格来展示数据，而不是做布局，都可能被斥为不规范，矫枉过正。那关于eval和with到底是什么情况呢？本文将详细介绍eval()函数和with语句


## eval

### 定义

　　`eval()`是一个全局函数，javascript通过eval()来解释运行由javascript源代码组成的字符串

```javascript
var result = eval('3+2');
console.log(result,typeof result); //5 'number'
```

### 用法

　　eval()只有一个参数，如果传入的参数不是字符串，它直接返回这个参数。如果参数是字符串，它会把字符串当成javascript代码进行编译。如果编译失败则抛出一个语法错误(syntaxError)异常。如果编译成功，则开始执行这段代码，并返回字符串中的最后一个表达式或语句的值，如果最后一个表达式或语句没有值，则最终返回undefined。如果字符串抛出一个异常，这个异常将把该调用传递给eval()

```javascript
var num = 1;
var str = 'test';
console.log(eval(num));//1
console.log(eval(str));//ReferenceError: test is not defined
var strLong1 = 'var x = 1;var y = 2;';
console.log(eval(strLong1),x,y);//undefined 1 2

var strLong2 = 'var x = 1; x++;';
console.log(eval(strLong2),x);//1 2
```

### 作用域

　　eval()使用了调用它的变量作用域环境。也就是说，它查找变量的值和定义新变量和函数的操作和局部作用域中的代码完全一样

```javascript
var b = 2;
function foo(str,a){
    eval(str);
    console.log(a,b);
}
foo('var b = 3;',1);//1 3
```

### 别名

　　当通过别名调用时，eval()会将其字符串当做顶层的全局代码来执行。执行的代码可能会定义新的全局变量和全局函数，或者给全局变量赋值，但却不能使用或修改函数中的局部变量

```javascript
var geval = eval;
var x = 'global',y = 'global';
function f(){
    var x = 'local';
    eval('x += "changed";');
    return x;
}
function g(){
    var y = 'local';
    geval('y += "changed";');
    return y;
}
console.log(f(),x);//localchanged global
console.log(g(),y);//local globalchanged
```

　　[注意]IE8-浏览器通过别名调用eval()和正常调用eval()的结果相同

### 副作用

　　javascript解释器进行了大量的代码分析和优化。而eval()的问题在于，用于动态执行的代码通常不能分析，于是解释器也无法对其进行优化，这会导致性能下降

　　与eval()类似的有setTimeout()、setInterval()、new Function()等，这些函数都可以以字符串作为参数，在程序运行时动态执行。这种执行机制带来的好处无法抵消其性能上的损失，所以应该尽量避免使用

### 严格模式

　　由于eval()函数过于强大，严格模式对其进行了严格的限制

　　【1】不能通过eval()函数来创建变量或函数，但可以查询和更改其值

```javascript
'use strict';
eval('var x = 1;');
console.log(x);//ReferenceError: x is not defined

'use strict';
var x = 1;
eval('x = 2;');
console.log(x);//2
```

　　【2】禁止使用eval作为标识符

```javascript
'use strict';
var eval = 10;//SyntaxError: Unexpected eval or arguments in strict mode
```

## with
　　定义with语句的目的主要是为了简化多次编写同一对象的工作

　　with语句将object添加到作用域链的头部，然后执行statement，最后把作用域链恢复到原始状态

```javascript
with(object){
　　statement;
}
```

### 作用

　　在对象嵌套层次很深的时候通常会使用with语句来简化代码编写。而本质上是通过将一个对象的引用当作作用域来处理，将对象的属性当作作用域中的标识符来处理，从而创建了一个新的词法作用域

　　在客户端javascript中，可能会使用类似下面这种表达式来访问一个HTML表单中的元素

```javascript
document.forms[0].address.value
```

　　如果这种表达式在代码中多次出现，则可以使用with语句将form对象添加到作用域链的顶层

```javascript
with(document.forms[0]){
    name.value = '';
    address.value = '';
    emai.value = '';
}
```

　　这种方法减少了大量的输入，不用再为每个属性名添加document.forms[0]前缀。这个对象临时挂载在作用域链上，当javascript需要解析诸如address的标识符时，就会自动在这个对象中查找

　　[注意]with语句提供了一种读取对象的属性的快捷方式，但它并不能创建对象的属性

　　如果对象o有一个属性x，那么下面代码给这个属性赋值为1

```javascript
var o  = {x:0};
with(o) x = 1;
console.log(o.x);//1
```

　　如果o中没有定义属性x，下面代码和不使用with语句的代码x=1是一模一样的。这是因为对变量x进行了LHS查询，并将1赋值给它

```javascript
var o  = {};
with(o) x = 1;
console.log(o.x);//undefined
console.log(x);//1
```

### 副作用

　　与eval类似，with语句的javascript代码非常难于优化，同时也会给调试代码造成困难，并且同没有使用with语句的代码相比，它运算得更慢

　　而且，如果with语句使用不当，还有可能造成变量泄漏，污染全局作用域的情况

```javascript
var x = 1;
var o = {};
with(o){
    x = 2;
}
console.log(x);//2
console.log(o.x);//undefined
```

### 严格模式

　　严格模式下，禁止使用with语句

```javascript
//SyntaxError: Strict mode code may not include a with statement
'use strict';
var o = {};
with(o){
    x = 2;
}
```


## 最后

　　使用eval和with会使得引擎无法在编译时对作用域查找进行优化，从而导致性能下降，代码运行变慢。因为eval和with在实际工作中很少使用，所以严格模式下的限制，对我们来说影响不大。就像比如外交部某一天发布公告，我国不再发放去牙买加的签证，牙买加虽然都听过，但大多数人这辈子都可能不去一回，所以，无所谓了。同样地，eval和with被嫌弃不嫌弃的，也是无所谓了

　　但即使不去牙买加，也不妨碍我了解到牙买加是加勒比海的其中一个岛国，它是英联邦成员国，也就是原来的英国殖民地，后来独立了。它的国旗上面是一个X

　　类比于eval和with

　　以上




