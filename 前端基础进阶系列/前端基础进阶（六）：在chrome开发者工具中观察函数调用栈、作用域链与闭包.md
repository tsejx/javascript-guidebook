# 前端基础进阶（六）：在chrome开发者工具中观察函数调用栈、作用域链与闭包

Tags: JavaScriptAdvanced

---

本文章出自：[前端基础进阶（六）：在chrome开发者工具中观察函数调用栈、作用域链与闭包][1]
作者：波同学

在前端开发中，有一个非常重要的技能，叫做断点调试。

在chrome的开发者工具中，通过断点调试，我们能够非常方便的一步一步的观察JavaScript的执行过程，直观感知函数调用栈，作用域链，变量对象，闭包，this等关键信息的变化。因此，断点调试对于快速定位代码错误，快速了解代码的执行过程有着非常重要的作用，这也是我们前端开发者必不可少的一个高级技能。

当然如果你对JavaScript的这些基础概念[执行上下文，变量对象，闭包，this等]了解还不够的话，想要透彻掌握断点调试可能会有一些困难。但是好在在前面几篇文章，我都对这些概念进行了详细的概述，因此要掌握这个技能，对大家来说，应该是比较轻松的。

> 为了帮助大家对于this与闭包有更好的了解，也因为上一篇文章里对闭包的定义有一点偏差，因此这篇文章里我就以闭包有关的例子来进行断点调试的学习，以便大家及时纠正。在这里认个错，误导大家了，求轻喷 ~ ~

## 一、基础概念回顾

函数在被调用执行时，会创建一个当前函数的执行上下文。在该执行上下文的创建阶段，变量对象、作用域链、闭包、this指向会分别被确定。而一个JavaScript程序中一般来说会有多个函数，JavaScript引擎使用函数调用栈来管理这些函数的调用顺序。函数调用栈的调用顺序与栈数据结构一致。

## 二、认识断点调试工具

在尽量新版本的chrome浏览器中（不确定你用的老版本与我的一致），调出chrome浏览器的开发者工具。

> 浏览器右上角竖着的三点 -> 更多工具 -> 开发者工具 -> Sources

界面如图。

![断点调试界面][2]

在我的demo中，我把代码放在app.js中，在index.html中引入。我们暂时只需要关注截图中红色箭头的地方。在最右侧上方，有一排图标。我们可以通过使用他们来控制函数的执行顺序。从左到右他们依次是：

* resume/pause script execution
恢复/暂停脚本执行

* step over next function call
跨过，实际表现是不遇到函数时，执行下一步。遇到函数时，不进入函数直接执行下一步。

* step into next function call
跨入，实际表现是不遇到函数时，执行下一步。遇到到函数时，进入函数执行上下文。

* step out of current function
跳出当前函数

* deactivate breakpoints
停用断点

* don‘t pause on exceptions
不暂停异常捕获

其中跨过，跨入，跳出是我使用最多的三个操作。

上图右侧第二个红色箭头指向的是函数调用栈（call Stack），这里会显示代码执行过程中，调用栈的变化。

右侧第三个红色箭头指向的是作用域链（Scope），这里会显示当前函数的作用域链。其中Local表示当前的局部变量对象，Closure表示当前作用域链中的闭包。借助此处的作用域链展示，我们可以很直观的判断出一个例子中，到底谁是闭包，对于闭包的深入了解具有非常重要的帮助作用。

## 三、断点设置

在显示代码行数的地方点击，即可设置一个断点。断点设置有以下几个特点：

* 在单独的变量声明(如果没有赋值)，函数声明的那一行，无法设置断点。

* 设置断点后刷新页面，JavaScript代码会执行到断点位置处暂停执行，然后我们就可以使用上边介绍过的几个操作开始调试了。

* 当你设置多个断点时，chrome工具会自动判断从最早执行的那个断点开始执行，因此我一般都是设置一个断点就行了。

## 四、实例

接下来，我们借助一些实例，来使用断点调试工具，看一看，我们的demo函数，在执行过程中的具体表现。

```javascript
// demo01

var fn;
function foo() {
  var a = 2;
  function baz() { 
    console.log( a );
  }
  fn = baz; 
}

function bar() {
  fn(); 
}

foo();
bar(); // 2
```

在向下阅读之前，我们可以停下来思考一下，这个例子中，谁是闭包？

这是来自《你不知道的js》中的一个例子。由于在使用断点调试过程中，发现chrome浏览器理解的闭包与该例子中所理解的闭包不太一致，因此专门挑出来，供大家参考。我个人更加倾向于chrome中的理解。

* 第一步：设置断点，然后刷新页面。

![设置断点][3]

* 第二步：点击上图红色箭头指向的按钮（step into），该按钮的作用会根据代码执行顺序，一步一步向下执行。在点击的过程中，我们要注意观察下方call stack 与 scope的变化，以及函数执行位置的变化。

一步一步执行，当函数执行到上例子中

![baz函数被调用执行，foo形成了闭包][4]

我们可以看到，在chrome工具的理解中，由于在foo内部声明的baz函数在调用时访问了它的变量a，因此foo成为了闭包。这好像和我们学习到的知识不太一样。我们来看看在《你不知道的js》这本书中的例子中的理解。


![你不知道的js中的例子][5]
书中的注释可以明显的看出，作者认为fn为闭包。即baz，这和chrome工具中明显是不一样的。

而在备受大家推崇的《JavaScript高级编程》一书中，是这样定义闭包。

![JavaScript高级编程中闭包的定义][6]

![书中作者将自己理解的闭包与包含函数所区分][7]

这里chrome中理解的闭包，与我所阅读的这几本书中的理解的闭包不一样。具体这里我先不下结论，但是我心中更加偏向于相信chrome浏览器。

我们修改一下demo01中的例子，来看看一个非常有意思的变化。

```javascript
// demo02
var fn;
var m = 20;
function foo() {
    var a = 2;
    function baz(a) { 
        console.log(a);
    }
    fn = baz; 
}
function bar() {
    fn(m); 
}

foo();
bar(); // 20
```

这个例子在demo01的基础上，我在baz函数中传入一个参数，并打印出来。在调用时，我将全局的变量m传入。输出结果变为20。在使用断点调试看看作用域链。

![闭包没了，作用域链中没有包含foo了。][8]

是不是结果有点意外，闭包没了，作用域链中没有包含foo了。我靠，跟我们理解的好像又有点不一样。所以通过这个对比，我们可以确定闭包的形成需要两个条件。

* 在函数内部创建新的函数；
* 新的函数在执行时，访问了函数的变量对象；
还有更有意思的。

我们继续来看看一个例子。

```javascript
// demo03

function foo() {
    var a = 2;

    return function bar() {
        var b = 9;

        return function fn() {
            console.log(a);
        }
    }
}

var bar = foo();
var fn = bar();
fn();
```

在这个例子中，fn只访问了foo中的a变量，因此它的闭包只有foo。

![闭包只有foo][9]

修改一下demo03，我们在fn中也访问bar中b变量试试看。

```javascript
// demo04

function foo() {
    var a = 2;

    return function bar() {
        var b = 9;

        return function fn() {
            console.log(a, b);
        }
    }
}

var bar = foo();
var fn = bar();
fn();
```

![这个时候闭包变成了两个][10]

这个时候，闭包变成了两个。分别是bar，foo。

我们知道，闭包在模块中的应用非常重要。因此，我们来一个模块的例子，也用断点工具来观察一下。

```javascript
// demo05
(function() {

    var a = 10;
    var b = 20;

    var test = {
        m: 20,
        add: function(x) {
            return a + x;
        },
        sum: function() {
            return a + b + this.m;
        },
        mark: function(k, j) {
            return k + j;
        }
    }

    window.test = test;

})();

test.add(100);
test.sum();
test.mark();

var _mark = test.mark;
_mark();
```

![add执行时，闭包为外层的自执行函数，this指向test][11]

![sum执行时，同上][12]

![mark执行时，闭包为外层的自执行函数，this指向test][13]

![_mark执行时，闭包为外层的自执行函数，this指向window][14]

> 注意：这里的this指向显示为Object或者Window，大写开头，他们表示的是实例的构造函数，实际上this是指向的具体实例

test.mark能形成闭包，跟下面的补充例子（demo07）情况是一样的。
我们还可以结合点断调试的方式，来理解那些困扰我们很久的this指向。随时观察this的指向，在实际开发调试中非常有用。

```javascript
// demo06

var a = 10;
var obj = {
    a: 20
}

function fn () {
    console.log(this.a);
}

fn.call(obj); // 20
```

![this指向obj][15]

补充一个例子

```javascript
// demo07
function foo() {
  var a = 10;

  function fn1() {
    return a;
  }

  function fn2() {
    return 10;
  }

  fn2();
}

foo();
```

这个例子，和其他例子不太一样。虽然fn2并没有访问到foo的变量，但是foo执行时仍然变成了闭包。而当我将fn1的声明去掉时，闭包便不会出现了。我暂时也不知道应该如何解释这种情况。只能大概知道与fn1有关，可能浏览器在实现时就认为只要存在访问上层作用域的可能性，就会被当成一个闭包吧。所以暂时就只能将它作为一个特例记住。

更多的例子，大家可以自行尝试，总之，学会了使用断点调试之后，我们就能够很轻松的了解一段代码的执行过程了。这对快速定位错误，快速了解他人的代码都有非常巨大的帮助。大家一定要动手实践，把它给学会。

最后，根据以上的摸索情况，再次总结一下闭包：

* 闭包是在函数被调用执行的时候才被确认创建的。

* 闭包的形成，与作用域链的访问顺序有直接关系。

* 只有内部函数访问了上层作用域链中的变量对象时，才会形成闭包，因此，我们可以利用闭包来访问函数内部的变量。

* chrome中理解的闭包，与《你不知道的js》与《JavaScript高级编程》中的闭包理解有很大不同，我个人更加倾向于相信chrome。这里就不妄下结论了，大家可以根据我的思路，探索后自行确认。在之前一篇文中我根据从书中学到的下了定义，应该是错了，目前已经修改，对不起大家了。


  [1]: http://www.jianshu.com/p/73122bb3d262
  [2]: http://upload-images.jianshu.io/upload_images/599584-56f0737789bb3c36.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240
  [3]: http://upload-images.jianshu.io/upload_images/599584-ed677cf1c64e39e7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240
  [4]: http://upload-images.jianshu.io/upload_images/599584-1b8e8f6a6cee5b88.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240
  [5]: http://upload-images.jianshu.io/upload_images/599584-7a72e8a1b8fdd764.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240
  [6]: http://upload-images.jianshu.io/upload_images/599584-b30c0aee7668c183.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240
  [7]: http://upload-images.jianshu.io/upload_images/599584-ee0c3051f02ec5d8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240
  [8]: http://upload-images.jianshu.io/upload_images/599584-f74b68b5f041ca9e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240
  [9]: http://upload-images.jianshu.io/upload_images/599584-6e98041bfd2f719f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240
  [10]: http://upload-images.jianshu.io/upload_images/599584-431d16611cac1243.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240
  [11]: http://upload-images.jianshu.io/upload_images/599584-662ec3ce1cf33206.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240
  [12]: http://upload-images.jianshu.io/upload_images/599584-24572d8b5dd381b6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240
  [13]: http://upload-images.jianshu.io/upload_images/599584-77888095edb980a7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240
  [14]: http://upload-images.jianshu.io/upload_images/599584-fedeee99354936a9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240
  [15]: http://upload-images.jianshu.io/upload_images/599584-ab511b394be82692.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240