# 欺骗词法

如果词法作用域完全由写代码期间函数所声明的位置来定义，JavaScript 中有两种机制来使得其在运行时来**修正**（也可以说欺骗）词法作用域。但是关于它们的争论通常会忽略掉最重要的点：欺骗词法作用域会导致性能下降。

## eval 函数

JavaScript 中的 `eval(…)` 函数可以接受一个字符串为参数，并将其中的内容视为好像在书写时就存在于程序中这个位置的代码。换句话说，可以在你写的代码中用程序生成代码并运行，就好像代码是写在那个位置的一样。

在执行 `eval(…)` 之后的代码时，引擎并不“知道”或“在意”前面的代码是以动态形式插入进来，并对词法作用域的环境进行修改的。引擎只会如往常地进行词法作用域查找。

```js
function foo(str, a) {
    eval( str );	// 欺骗！
    console.log(a, b);
}

var b = 2;

foo( "var b = 3;", 1);	// 1, 3
```

`eval(…)` 调用中的 `var b = 3;` 这段代码会被当作本来就在那里一样来处理。由于那段代码声明了一个新的变量 b，因此它对已经存在的 `foo(…)` 的词法作用域进行了修改。事实上，和前面提到的原理一样，这段代码实际上在   `foo(…)` 内部创建了一个变量 b，并遮蔽了外部（全局）作用域中的同名变量。

eval 函数以及它的亲戚（ Function 、setTimeout、setInterval）都提供了访问 JavaScript 编译器的机会。

Function() 构造函数的形式比 eval() 函数好一点的地方在于，它令入参更加清晰。

```js
new Function( param1, ...... , paramN, funcBody )


var f = new Function( 'x', 'y' , 'return x + y' )；
f(3,4)
<7
```

用 Function() 的方式至少不用使用间接的 eval() 调用来确保所执行的代码除了其自己的作用域只能访问全局的变量。

在 Weex 的代码中，就还存在着 eval() 的代码，不过 Weex 团队在注释里面承诺会改掉。总的来说，最好应该避免使用 eval() 和 new Function() 这些动态执行代码的方法。动态执行代码相对会比较慢，并且还存在安全隐患。

再说说另外两个亲戚，setTimeout、setInterval 函数，它们也能接受字符串参数或者函数参数。当传递的是字符串参数时，setTimeout、setInterval 会像 eval 那样去处理。同样也需要避免使用这两个函数的时候使用字符串传参数。

eval 函数带来的问题总结如下：

1. 函数变成了字符串，可读性差，存在安全隐患。
2. 函数需要运行编译器，即使只是为了执行一个微不足道的赋值语句。这使得执行速度变慢。
3. 让 JSLint 失效，让它检测问题的能力大打折扣。

## with 语句

with 语句被很多人都认为是 JavaScript 里面的糟粕( Bad Parts )。起初它被设计出来的目的是好的，但是它导致的问题多于它解决的问题。

with 起初设计出来是为了**避免冗余的对象调用**。

举个例子：

```js
foo.a.b.c = 888;
foo.a.b.d = 'halfrost';
```

这时候用 with 语句就可以缩短调用：

```js
with (foo.a.b) {
      c = 888;
      d = 'halfrost';
}
```

但是这种特性却带来了很多问题：

```js
function myLog( errorMsg , parameters) {
  with (parameters) {
    console.log('errorMsg:' + errorMsg);
  }
}

myLog('error',{});
<errorMsg:error

myLog('error',{ errorMsg:'stackoverflow' }); 
<errorMsg:stackoverflow
```

可以看到输出就出现问题了，由于 with 语句，覆盖掉了第一个入参。通过阅读代码，有时候是不能分辨出这些问题，它也会随着程序的运行，导致发生不多的变化，这种对未来的不确定性就很容易出现
 bug。

with 会导致3个问题：

1. 性能问题
   变量查找会变慢，因为对象是临时性的插入到作用域链中的。
2. 代码不确定性
   @Brendan Eich 解释，废弃 with 的根本原因不是因为性能问题，原因是因为“with 可能会违背当前的代码上下文，使得程序的解析（例如安全性）变得困难而繁琐”。
3. 代码压缩工具不会压缩 with 语句中的变量名

所以在严格模式下，已经严格禁止使用 with 语句。

```js
Uncaught SyntaxError: Strict mode code may not include a with statement
```

如果还是想避免使用 with 语句，有两种方法：

1. 用一个临时变量替代传进 with 语句的对象。
2. 如果不想引入临时变量，可以使用 IIFE 。

```js
(function () {
  var a = foo.a.b;
  console.log('Hello' + a.c + a.d);
}());

// 或者

(function (bar) {
  console.log('Hello' + bar.c + bar.d);
}(foo.a.b));
```

 ## 性能

 `eval(…)` 和 `with(…)` 会在运行时修改或创建新的作用域，以此来欺骗其他在书写时定义的词法作用域。

JavaScript 引擎会在编译阶段进行数项的性能优化。其中有些优化依赖于能够根据代码的词法进行静态分析，并预先确定所有变量和函数的定义位置，才能在执行过程中快速找到标识符。

但如果引擎在代码中发现了 `eval(…)` 或 `with`，它只能简单地假设关于标识符位置的判断都是无效的，因为无法在词法分析阶段明确知道 `eval(…)` 会接收到什么代码，这些代码会如何对作用域进行修改，也无法知道传递给 `with` 用来创建新词法作用域的对象的内容到底是什么。

 

 





