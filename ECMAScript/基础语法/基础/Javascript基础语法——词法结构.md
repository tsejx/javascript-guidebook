# Javascript基础语法——词法结构 

## 前面的话

　　javascript是一门简单的语言，也是一门复杂的语言。说它简单，是因为学会使用它只需片刻功夫；而说它复杂，是因为要真正掌握它则需要数年时间。实际上，前端工程师很大程度上就是指javascript工程师。前端入门容易精通难，说的是前端，更指的是javascript。本文是javascript基础语法的第一篇——词法结构。词法结构是一套基础性规则，用来描述如何使用javascript来编写程序

## 与Java关系

　　关于javascript有这样一个说法，java和javascript的关系是雷锋和雷锋塔的关系。那到底有没有关系呢

　　javascript最开始的名字是LiveScript，后来选择javascript作为其正式名称的原因，大概是想让它听起来有系出名门的感觉。除了语法看起来和java类似之外，javascript和java是完全不同的两种编程语言

　　程序设计语言分为解释型和编译型两大类。java或C++等语言需要一个编译器。编译器是一种程序，能够把用java等高级语言编写出来的源代码翻译为直接在计算机上执行的文件。解释型程序设计语言不需要编译器——它们仅需要解释器，浏览器中的javascript解释器将直接读入源代码并执行

　　java在理论上几乎可以部署在任何环境，但javascript却倾向于只应用在web浏览器。而且，在javascript语言中，函数是一种独立的数据类型，采用基于原型对象（prototype）的继承链，javascript语法要比Java自由得多

　　基本上，JavaScript这个名字的原意是“很像Java的脚本语言”

## 定义
　　Javascript是一门动态的、弱类型的解释型编程语言，非常适合面向对象和函数式的编程风格。Javascript的语法源自java，它的一等函数来自scheme，它的基于原型的继承来自self

　　Javascript用来增强页面动态效果，实现页面与用户之间的实时、动态交互

　　Javascript由三部分组成：ECMAScript、DOM和BOM

　　[1]**ECMAScript**由ECMA-262定义，提供核心语言功能（ECMA是欧洲计算机制造商协会）

　　[2]**DOM(Document Object Model)文档对象模型**，提供访问和操作网页内容的方法和接口

　　[3]**BOM(Browser Object Model)浏览器对象模型**，提供与浏览器交互的方法和接口

## 大小写敏感

　　关于javascript这门语言，再怎么强调都不为过的特性是大小写敏感。javascript中的关键字、变量、函数名和所有的标识符都必须采取一致的大小写形式

```javascript
//'online'、'Online'、'OnLine'、'ONLINE'是四个不同的变量名
```

　　【注意】HTML并不区分大小写(尽管XHTML区分大小写)。许多客户端Javascript对象和属性与它们表示的HTML标签和属性同名。在HTML中，这些标签和属性名可以使用大写也可以使用小写，而在Javascript中则必须是小写。例如，在HTML中设置事件处理程序时，onclick属性可以写成onClick，但在Javascript代码中，必须使用小写的onclick

## 保留字(ReservedWord)

　　和其他任何编程语言一样，javascript保留了一些标识符为自己所用。这些保留字不能用做普通的标识符。由于好多参考书的误导，貌似保留字和关键字是分开的，其实并不是，关键字只是保留字的一部分。保留字包括关键字、未来保留字、空字面量和布尔值字面量
　　
**保留字**
```javascript
 ReservedWord ::
   Keyword
   FutureReservedWord
   NullLiteral
   BooleanLiteral
```

**关键字**

```javascript
    break      do         instanceof        typeof
    case       else       new               var
    catch      finally    return            void
    continue   for        switch            while
    debugger   function   this              with
    default    if         throw             delete
    in         try
```

**未来保留字**

下列词被用作建议扩展关键字，因此保留，以便未来可能采用这些扩展

```javascript
    class      enum       extends       super
    const      export     import
```

**ECMAScript3版本**

　　以上是ECMAScript5的保留字，但在ECMAScript3版本中的保留字并不一样，若希望代码能在基于ECMAScript3实现的解释器上运行的话，应该避免使用以下保留字作为标识符

```javascript
abstract boolean byte char class constdouble enum export extends final float
goto implements import int interfacelong native package private protected
public short  static super synchronized throw transient volatile 
```

**预定义变量和函数**

　　此外，Javascript预定义了很多全局变量和函数，应该避免把它们的名字用做标识符名

```javascript
arguments Array Boolean Date decodeURI decodeURIComponent encodeURI
encodeURIComponent Error eval EvalError Function Infinity isFinite
isNaN JSON Math NaN Number Object parseFloat parseInt RangeError
ReferenceError RegExp String SyntaxError TypeError undefined URIError
```

## 注释(Comment)

　　不是所有语句都需要javascript解释器去解释并执行。有时需要在脚本中写一些仅供自己参考或提醒自己的信息，并希望Javascript解释器能直接忽略掉这些信息，这类信息就是注释

　　注释能有效帮助了解代码流程，在代码中它们扮演生活中便条的角色，可以帮助我们弄清楚脚本到底干了什么

　　【注意】注释一定要精确地描述代码，没有用的注释比没有注释还要糟糕

　　有多种方式可以在javascript脚本中插入注释，包括单行注释、多行注释和HTML风格的注释

【1】单行注释以两个斜杠开头

```javascript
//单行注释
```

【2】多行注释又叫块级注释，以一个斜杠和一个星号/*开头，以一个星号和一个斜杠*/结尾

```javascript
/*
    这是一个多行注释
 */
```
　　【注意】块级注释/**/可以跨行书写，但不能嵌套，否则会报错

```javascript
//报错
/*
注释1
/*
注释1.1
 */
 */
```

　　【注意】块级注释/**/中的那些字符也可能出现在正则表达式字面量里，所以块级注释对于被注释的代码块来说是不安全的

```javascript
/*
    var rm_a = /a*/.match(s);
*/
```

【3】HTML风格的注释仅仅适用于单行注释，其实javascript解释器对<!--的处理和对//的处理是一样的

```javascript
<!-- 这是javascript中的注释
```

　　如果在HTML文档中，还需要以-->来结束注释

```html
<!-- 这是HTML中的注释 -->
```

　　但javascript不要求这么做，它会把-->视为注释内容的一部分

　　【注意】HTML允许上面这样的注释跨越多行，但这种注释的每行都必须在开头加上"<!--"来作为标志

```javascript
<!-- 我是注释1
<!-- 我是注释2
<!-- 我是注释3
```

　　因为javascript解释器在处理这种风格的注释时与HTML做法不同，为避免发生混淆，最好不要在javascript脚本中使用HTML风格的注释

 

## 空白(WhiteSpace)

　　空白通常没有意义，有时候必须要用它来分隔字符序列，否则它们就会被合并成一个符号

```javascript
var that = this;
```

　　var和that之间的空白是不能移除的，但其他的空白可以移除

　　javascript会忽略程序中标识(token)之间的空格。多数情况下，javascript同样会忽略换行符。由于可以在代码中随意使用空格和换行，因此可以采用整齐、一致的缩进来形成统一的编码风格，从而提高代码的可读性

```javascript
//通过增加空白字符，提高代码可读性
for(var i = 1; i < 10; i++){
    //
}
```
　　javascript将如下这些识别为空白字符WhiteSpace

```javascript
\u0009    水平制表符         <TAB>
\u000B    垂直制表符         <VT>
\u000C    换页符            <FF>
\u0020    空格符            <SP>
\u00A0    非中断空格符       <NBSP>
\uFEFF    字符序标记
```

　　javascript将如下字符识别为行终止符LineTerminator

```javascirpt
\u000A    换行符        <LF>
\u000D    回车符        <CR>
\u2028    行分隔符      <LS>
\u2029    段落分割符     <PS>
```

## 可选的分号
　　javascript使用分号;将语句分隔开，这对增强代码的可读性和整洁性是非常重要的

　　有些地方可以省略分号，有些地方则不能省略分号

```javascript
//两条语句用两行书写，第一个分号可以省略
a = 3;
b = 4;
//两条语句用一行书写，第一个分号不能省略
a = 3; b = 4;
```

　　但javascript并不是在所有换行处都填补分号，只有在缺少了分号就无法正确解析代码时，Javascript才会填补分号。换句话说，如果当前语句和随后的非空格字符不能当成一个整体来解析的话，Javascript就在当前语句行结束处填补分号

```javascript
var a
a
=
3
console.log(a)
```

　　javascript将其解析为:

```javascript
var a;
a = 3;
console.log(a);
```

　　这种语句的分隔规则会导致一些意想不到的情形

```javascript
var y = x + f
(a+b).toString
```

　　javascript将其解析为:

```javascript
var y = x + f(a+b).toString
```

　　因此，为了能让上述代码解析成两条不同的语句，必须手动填写行尾的显式分号

　　通常来讲，如果一条语句以'('、'['、'/'、'+'、'-'等符号开始，那么它极有可能和前一条语句合一起解析

**两个例外**

　　如果当前语句和下一行语句无法合并解析，Javascript会在第一行后填补分号，这是通用规则，但有两个例外

　　【1】第一个例外是涉及return、break、continue、throw语句的场景中。如果这四个关键字后紧跟着换行，javascript会在换行处填补分号

```javascript
return
true;
```

　　javascript将其解析为:

```javascript
return;true;
```

　　而代码的本意是:

```javascript
return true;
```

　　【2】第二个例外是在涉及++和--运算符时，如果将其用作后缀表达式，它和表达式应该同一行。否则，行尾将填补分号，同时++或--将作为下一行代码的前缀操作符并与之一起解析

```javascript
x
++
y
```

　　javascript将其解析为:

```javascript
x;++y;
```

　　而代码的本意是:

```javascript
x++;y;
```

　　虽然分号不是必须的，但最好不要省略它，因为加上分号可以避免很多错误，代码行结尾处没有分号会导致压缩错误。加上分号也会在某些情况下增进代码的性能，因为这样解析器就不必再花时间推测应该在哪里插入分号了

 

参考资料

【1】 ES5/词法 https://www.w3.org/html/ig/zh/wiki/ES5/lexical
【2】 阮一峰Javascript标准参考教程——语法概述 http://javascript.ruanyifeng.com/grammar/basic.html
【3】 W3School-Javascript高级教程——ECMAScript语法 http://www.w3school.com.cn/js/pro_js_syntax.asp
【4】《javascript权威指南(第6版)》第2章 词法结构
【5】《javascript高级程序设计(第3版)》第3章 基本概念
【6】《javascript语言精粹(修订版)》第2章 语法
【7】《javascript DOM编程艺术(第2版)》第2章 Javascript语法




