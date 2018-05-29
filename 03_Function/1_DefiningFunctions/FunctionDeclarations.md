# 函数的声明

一个函数定义（也称函数声明，或函数语句）由一系列的 `function` 关键字组成，依次为：

- 函数的名称
- 函数的参数列表，包围在括号中并由逗号分隔
- 定义函数的 JavaScript 语句，用大括号 `{}` 括起来

## 函数声明语句

函数声明要素：`function` 关键字，`functionName` 函数名，`arg` 参数（可选）

###语法

```javascript
function functionName([arg1 [,arg2 [...,argn]]]){
    functionBody;	// 函数体
}
```

| 函数声明要素   | 含义       | 说明                                                         |
| -------------- | ---------- | ------------------------------------------------------------ |
| `function`     | 声明关键字 | 声明的函数名称的标识符                                       |
| `functionName` | 函数名称   | 当前作用域内函数名称唯一                                     |
| `arg`          | 参数列表   | 函数名之后的圆括号中是参数列表，参数之间使用逗号分隔。当调用函数时，这些标识符则指代传入函数的实参。 |
| `functionBody` | 函数体     | 所有语句的集合，包括花括号在内                               |

### 示例

```javascript
function square(number) {
    return number * number;
}

var a = 2;

square(a);	// 4
```

### 特点

- 当函数的参数时一个值（比如上面的例子），若被调用函数改变了这个参数的值，这样的改变不会影响到全局或调用的函数
- 但当函数的参数时一个对象（即一个非原始值，例如 `Array` 或用户自定义的其他对象），若函数改变了这个对象的的属性，这样的改变对函数外部是可见的

```javascript
function myFunc( obj ) {
    obj.make = 'Toyota';
}

var myCar = { make: 'Honda', model: 'Accord', year: 1998 };
var x, y;

x = myCar.make;	// x 的获取的值为 ”Honda“ 【原本】

myFunc(myCar);
y = myCar.make;	// y 获取的值为 “Toyota” 【現在】（make属性的值在函数中被改变了）
```

- `function` 语句里的花括号是必需的，这和 `while` 循环和其他一些语句所使用的语句块是不同的，即使函数体内只包含一条语句，仍然必须使用花括号将其括起来。

```javascript
function test() 		// SyntaxError: Unexpected end of input
function test(){}; 		// 不报错
while(true); 			// 不报错
```

- 变量的重复声明是无用的，但函数的重复声明会覆盖前面的声明（无论是变量还是函数声明）

```javascript
// 变量的重复声明无用
var a = 1;
var a;
console.log(a);//1

// 由于函数声明提升优先于变量声明提升，所以变量的声明无作用
var b;
function b(){
    console.log(1);
}
b(); // 1

// 后面的函数声明会覆盖前面的函数声明
c(); // 2
function c(){
    console.log(1);
}
function c(){
    console.log(2);
}
```

- 和变量声明一样，函数声明语句创建的变量无法删除

```javascript
function foo(){
    console.log(1);
}
delete foo; // false
console.log(foo()); // 1
```

## 函数定义表达式

函数表达式要素：`var` 关键字，`variableName` 变量名，表达式赋值等号，声明变量后的分号，`functionName `函数名（可选，没有的话叫做匿名函数）。

通常而言，以表达式方式定义函数时都不需要名称，这会让定义它们的代码更加紧凑。函数定义表达式特别适合用来定义那些只会使用一次的函数。

### 语法

```javascript
var variableName = function functionName(arg){
    functionBody;	// 函数体
}
```

函数表达式要素与函数声明语句基本一致

### 示例

#### 匿名函数

**匿名函数(anonymous function)**也叫拉姆达函数，是 `function` 关键字后面没有标识符的函数。

```javascript
var square = function(number){
    return number * number;
}
var x = square(4);	// x 得到的值为16
```

#### 具名函数

函数表达式也可以提供函数名，并且可以用于在函数内部使用来代指其本身，或者在调试器堆栈跟踪中鉴别该函数。

```javascript
var factorial = function fac(n) {return n < 2 ? 1 : n * fac(n - 1)};

console.log(factorial(3));
var x = square(4);	// x 得到的值为16
```

### 特点

- 一个函数定义表达式包含名称，函数的局部作用域将会包含一个绑定到函数对象的名称。实际上，函数的名称将成为函数内部的一个局部变量。

```javascript
var test = function fn(){
   return fn;
}
console.log(test); 			// fn(){return fn;}
console.log(test()); 		// fn(){return fn;}
console.log(test()()); 		// fn(){return fn;}
```

- 个人理解，对于具名的函数表达式来说，**函数名称**相当于函数对象的形参，只能在函数内部使用；而**变量名称**相当于函数对象的实参，在函数内部和函数外部都可以使用

```javascript
var test = function fn(){
   return fn === test;
}
console.log(test()); 		// true
console.log(test === fn); 	// ReferenceError: fn is not defined
```

- 函数定义了一个非标准的 `name` 属性，通过这个属性可以访问到给定函数指定的名字，这个属性的值永远等于跟在 `function` 关键字后面的标识符，匿名函数的 `name` 属性为空

```javascript
// IE11-浏览器无效，均输出undefined
// chrome在处理匿名函数的name属性时有问题，会显示函数表达式的名字
function fn(){};
console.log(fn.name); 	// 'fn'

var fn = function(){};
console.log(fn.name); 	// ''，在chrome浏览器中会显示'fn'

var fn = function abc(){};
console.log(fn.name); 	// 'abc'
```

## Function构造函数

`Function` 构造函数接收任意数量的参数，但最后一个参数始终都被看成是函数体，而前面的参数则枚举出了新函数的参数。

### 语法

```javascript
var functionName = new Function(['arg1' [,'arg2' [...,'argn']]],'statement;');
// 函数是对象，函数名是指针，一个函数可能会有多个名字
// 当一个对象的属性是函数时，其称之为方法
```

### 特点

- `Function` 构造函数无法指定函数名称，它创建的是一个匿名函数
- 从技术上讲，这是一个函数表达式。但，**不推荐使用**，因为这种语法会导致解析两次代码。第一次是解析常规Javascript 代码，第二次解析传入构造函数中的字符串，影响性能。

```javascript
var sum = new Function('num1','num2','return num1 + num2');
// 等价于
var sum = function(num1,num2){
    return num1+num2;
}
```

- `Function()` 构造函数创建的函数，其函数体的编译总是会在全局作用域中执行。于是，`Function()` 构造函数类似于在全局作用域中执行的 `eval()`。

```javascript
var test = 0;
function fn(){
    var test = 1;
    return new Function('return test');
}
console.log(fn()()); // 0
```

- 并不是所有的函数都可以成为构造函数

```javascript
var o = new Math.min(); // Uncaught TypeError: Math.min is not a constructor
```

## 函数声明和函数表达式的区别

虽然都可以定义函数，但最大的区别在于：解析器会率先读取函数声明，使其在执行任何代码之前就可以访问（也就是函数声明提升）；而函数表达式则需要解析器执行到它所在的代码行才会被解释执行。

```javascript
sayHi();	// 能正常运行 弹出 Hi
sayHi123();	// 报错 Uncaught TypeError: sayHi123 is a function(...)

function sayHi(){
    alert('Hi');
}

var sayHi123 = function sayHi(){
    alert('Hi123');
}
```