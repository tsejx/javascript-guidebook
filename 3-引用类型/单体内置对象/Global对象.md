# Global对象

Global对象是ECMAScript中最特别的对象，因为实际上它根本不存在。如果尝试编写下面的代码，将得到错误：

```javascript
var pointer = Global;
```

错误消息显示Global不是对象，但刚才不是说Global是对象吗？没错。这里需要理解的主要概念是，在ECMAScript中，不存在独立的函数，所有函数都必须是某个对象的方法。本书前面介绍的函数，如`isNaN()` 、`isFinite()`、`parseInt()` 和 `parseFloat()` 等，看起来都像独立的函数。实际上，它们都是Global对象的方法。而且Global对象的方法不止这些。

`encodeURI()` 和 `encodeURIComponent()` 方法用于编码传递给浏览器的URI（统一资源标识符）。有效的URI不能包含某些字符，如空格。这两个方法用于编码URI，这样用专门的UTF-8编码替换所有的非有效字符，就可以使浏览器仍能够接受并理解它们。

`encodeURI()` 方法用于处理完整的URI（例如，http://www.wrox.com/illegal value.htm），而 `encodeURIComponent()` 用于处理URI的一个片断（如前面的URI中的 `illegal value.htm`）。这两个方法的主要区别是 `encodeURI()` 方法不对URI中的特殊字符进行编码，如冒号、前斜杠、问号和英镑符号，而 `encodeURIComponent()` 则对它发现的所有非标准字符进行编码。例如：

```javascript
var URL = 'http://www.wrox.com/illegal value.htm#start';
alert(encodeURI(URL));
alert(encodeURIComponent(URL));
```

这段代码输出两个值：

```javascript
http://www.wrox.com/illegal%20value.htm#start
http%3A%2Fwww.wrox.com%2Fillegal%20value..htm&23start
```

可以看到，除空格外，第一个URI无任何改变，空格被替换为%20。第二个URI中的所有非字母数字字符都被替换成它们对应的编码，基本上使这个URI变得无用。这就是encodeURI()可以处理完整URI，而encodeURIComponent()只能处理附加在已有URI末尾的字符串的原因。

自然，还有两个方法用于解码编码过的URI，即decodeURI()和decodeURIComponent()。如你所料，这两个方法所做的恰与其对应的方法相反。decodeURI()方法只对用encodeURI()方法替换的字符解码。例如，％20将被替换为空格，而％23不会被替换，因为它表示的是英镑符号（#），encodeURI()并不替换这个符号。同样的，decodeURIComponent()会解码所有encodeURIComponent()编码过的字符，意味着它将对所有的特殊值解码。例如：

```javascript
var sUri = 'http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.htm%23start';
alert(decodeURI(sUri));
alert(decodeURIComponent(sUri));
```
这段代码输出两个值：

```javascript
http%3A%2F%2Fwww.wrox.com%2Fillegal value.htm%23start;
'http://www.wrox.com/illegal value.htm#start'
```

在这个例子中，变量uri存放的是用encodeURIComponent()编码的字符串。生成的值说明了应用两个解码方法时会发生的事情。第一个值由decodeURI()输出，把%20替换成空格。第二个值由decodeURIComponent()输出，替换所有的特殊。

这些URI方法 **`encodeURI()`**、**`encodeURIComponent()`**、**`decodeURI()`** 和 **`decodeURICom- ponent()`** 代替了BOM的 **`escape()`** 和 **`unescape()`**方法。URI方法更可取，因为它们会对所有Unicode符号编码，而BOM方法只能对ASCII符号正确编码。尽量避免使用escape()和unescape()方法。
最后一个方法可能是整个ECMAScript语言中最强大的方法，即eval()方法。该方法就像整个ECMAScript的解释程序，接受一个参数，即要执行的ECMAScript（或JavaScript）字符串。例如：

```javascript
eval('alert('hi')');
```

这行代码的功能等价于下面的代码：

```javascript
alert('hi')
```

当解释程序发现eval()调用时，它将把参数解释为真正的ECMAScript语句，然后把它插入该函数所在的位置。这意味着eval()调用内部引用的变量可在参数以外定义：

```javascript
var msg = 'hello world';
eval('alert(msg)');
```

这里，变量msg是在eval()调用的环境外定义的，而警告仍然显示的是文本"hello world"，因为第二行代码将被替换为一行真正的代码。同样，可以在eval()调用内部定义函数或变量，然后在函数外的代码中引用：

```javascript
eval('function sayHi(){ alert('hi');}');
sayHi();
```

这里，函数sayHi()是在eval()调用内部定义的。因为该调用将被替换为真正的函数，所以仍可在接下来的一行中调用sayHi()。
这种功能非常强大，不过也非常危险。使用eval()时要极度小心，尤其在给它传递用户输入的数据时。恶意的用户可能会插入对站点或应用程序的安全性有危害的值（叫做代码注入）。
Global对象不只有方法，它还有属性。还记得那些特殊值undefined、NaN和Infinity吗？它们都是Global对象的属性。此外，所有本地对象的构造函数也都是Global对象的属性。下表较详细地说明了Global对象的所有属性：

属    性|说    明
:---:|:---:
undefined|Undefined类型的字面量
NaN|非数的专用数值
Infinity|无穷大值的专用数值
Object|Object的构造函数
Array|Array的构造函数
Function|Function的构造函数
Boolean|Boolean的构造函数
String|String的构造函数
Number|Number的构造函数
Date|Date的构造函数
RegExp|RegExp的构造函数
Error|Error的构造函数
EvalError|EvalError的构造函数
RangeError|RangeError的构造函数
ReferenceError|ReferenceError的构造函数
SyntaxError|SyntaxError的构造函数
TypeError|TypeError的构造函数
URIError|URIError的构造函




