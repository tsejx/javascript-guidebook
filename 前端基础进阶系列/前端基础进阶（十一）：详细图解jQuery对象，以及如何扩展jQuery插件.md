# 前端基础进阶（十一）：详细图解jQuery对象，以及如何扩展jQuery插件

Tags:JavaScriptAdvanced

---
本文章出自：[前端基础进阶（十一）：详细图解jQuery对象，以及如何扩展jQuery插件][1]
作者：波同学

早几年学习前端，大家都非常热衷于研究jQuery源码。我还记得当初从jQuery源码中学到一星半点应用技巧的时候常会有一种发自内心的惊叹，“原来JavaScript居然可以这样用！”

虽然随着前端的发展，另外几种前端框架的崛起，jQuery慢慢变得不再是必须。因此大家对于jQuery的热情低了很多。但是许多从jQuery中学到的技巧用在实际开发中仍然非常好用。简单的了解它也有助于我们更加深入的理解JavaScript。

这篇文章的主要目的就是跟大家分享一下，jquery对象是如何封装的。算是对于大家进一步学习jQuery源码的一个抛砖引玉。

使用jQuery对象时，我们这样写：

```javascript
// 声明一个jQuery对象
$('.target')

// 获取元素的css属性
$('.target').css('width')

// 获取元素的位置信息
$('.target').offset()
```

在使用之初可能会有许多疑问，比如$是怎么回事？为什么不用new就可以直接声明一个对象等等。后来了解之后，才知道原来这正是jQuery对象创建的巧妙之处。

先直接用代码展示出来，再用图跟大家解释是怎么回事。

```javascript
;
(function(ROOT) {

    // 构造函数
    var jQuery = function(selector) {

        // 在jQuery中直接返回new过的实例，这里的init是jQuery的真正构造函数
        return new jQuery.fn.init(selector)
    }

    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,

        version: '1.0.0',

        init: function(selector) {
            // 在jquery中这里有一个复杂的判断，但是这里我做了简化
            var elem, selector;
             elem = document.querySelector(selector);
            this[0] = elem;

            // 在jquery中返回一个由所有原型属性方法组成的数组，我们这里简化，直接返回this即可
            // return jQuery.makeArray(selector, this);
            return this;
        },

        // 在原型上添加一堆方法
        toArray: function() {},
        get: function() {},
        each: function() {},
        ready: function() {},
        first: function() {},
        slice: function() {}
        // ... ...
    }

    jQuery.fn.init.prototype = jQuery.fn;

    // 实现jQuery的两种扩展方式
    jQuery.extend = jQuery.fn.extend = function(options) {

        // 在jquery源码中会根据参数不同进行很多判断，我们这里就直接走一种方式，所以就不用判断了
        var target = this;
        var copy;

        for(name in options) {
            copy = options[name];
            target[name] = copy;
        }
        return target;
    }

    // jQuery中利用上面实现的扩展机制，添加了许多方法，其中

    // 直接添加在构造函数上，被称为工具方法
    jQuery.extend({
        isFunction: function() {},
        type: function() {},
        parseHTML: function() {},
        parseJSON: function() {},
        ajax: function() {}
        // ...
    })

    // 添加到原型上
    jQuery.fn.extend({
        queue: function() {},
        promise: function() {},
        attr: function() {},
        prop: function() {},
        addClass: function() {},
        removeClass: function() {},
        val: function() {},
        css: function() {}
        // ...
    })

    // $符号的由来，实际上它就是jQuery，一个简化的写法，在这里我们还可以替换成其他可用字符
    ROOT.jQuery = ROOT.$ = jQuery;

})(window);
```

在上面的代码中，我封装了一个简化版的jQuery对象。它向大家简单展示了jQuery的整体框架情况。如果了解了整体框架，那么大家去读jQuery源码，就会变得非常轻松。

我们在代码中可以看到，jQuery自身对于原型的处理使用了一些巧妙的语法，比如`jQuery.fn = jQuery.prototype`，`jQuery.fn.init.prototype = jQuery.fn;`等，这几句正式jQuery对象的关键所在，下面我用图给大家展示一下这中间的逻辑是怎么回事。


![jQuery对象核心图][2]


## 对象封装分析

在上面的实现中，代码首先在jQuery构造函数中声明了一个fn属性，并将其指向了原型`jQuery.prototype`。并在原型中添加了init方法。

```javascript
jQuery.fn = jQuery.prototype = {
    init: {}
}
```

之后又将init的原型，指向了jQuery.prototype。

```javascript
jQuery.fn.init.prototype = jQuery.fn;
```

而在构造函数jQuery中，返回了init的实例对象。

```javascript
var jQuery = function(selector) {

    // 在jQuery中直接返回new过的实例，这里的init是jQuery的真正构造函数
    return new jQuery.fn.init(selector)
}
```

最后对外暴露入口时，将字符$与jQuery对等起来。

```javascript
ROOT.jQuery = ROOT.$ = jQuery;
```

因此当我们直接使用$('#test')创建一个对象时，实际上是创建了一个init的实例，这里的正真构造函数是原型中的init方法。

**注意：**许多对jQuery内部实现不太了解的盆友，在使用jQuery时常常会毫无节制使用`$()`，比如对于同一个元素的不同操作：

```javascript
var width = parseInt($('#test').css('width'));
if(width > 20) {
    $('#test').css('backgroundColor', 'red');
}
```

通过我们上面的一系列分析，我们知道每当我们执行$()时，就会重新生成一个init的实例对象，因此当我们这样没有节制的使用jQuery时是非常不正确的，虽然看上去方便了一些，但是对于内存的消耗是非常大的。正确的做法是既然是同一个对象，那么就用一个变量保存起来后续使用即可。

```javascript
var $test = $('#test');
var width = parseInt($test.css('width'));
if(width > 20) {
    $test.css('backgroundColor', 'red');
}
```

## 扩展方法分析

在上面的代码实现中，我还简单实现了两个扩展方法。

```javascript
jQuery.extend = jQuery.fn.extend = function(options) {

    // 在jquery源码中会根据参数不同进行很多判断，我们这里就直接走一种方式，所以就不用判断了
    var target = this;
    var copy;

    for(name in options) {
        copy = options[name];
        target[name] = copy;
    }
    return target;
}
```

要理解它的实现，我们首先要明确的知道this的指向。如果你搞不清楚，可以回头去看看我们之前关于this指向的讲解。传入的参数options对象为一个`key: value`模式的对象，我通过`for in`遍历options，将key作为jQuery的新属性，value作为该新属性所对应的新方法，分别添加到jQuery方法和jQuery.fn中。

也就是说，当我们通过`jQuery.extend`扩展jQuery时，方法被添加到了jQuery构造函数中，而当我们通过`jQuery.fn.extend`扩展jQuery时，方法被添加到了jQuery原型中。

上面的例子中，我也简单展示了在jQuery内部，许多方法的实现都是通过这两个扩展方法来完成的。

> 当我们通过上面的知识了解了jQuery的大体框架之后，那么我们对于jQuery的学习就可以具体到诸如css/val/attr等方法是如何实现这样的程度，那么源码学习起来就会轻松很多，也会节约更多的时间。也给一些对于源码敬而远之的朋友提供了一个学习的可能。

有一个朋友留言给我，说她被静态方法，工具方法和实例方法这几个概念困扰了很久，到底他们有什么区别？

其实在上一篇文章中，关于封装一个对象，我跟大家分享了一个非常非常干货，但是却只有少数几个读者老爷get到的知识，那就是在封装对象时，属性和方法可以具体放置的三个位置，并且对于这三个位置的不同做了一个详细的解读。

而在实现jQuery扩展方法的想法中，一部分方法需要扩展到jQuery构造函数中，一部分方法需要扩展到原型中，当我们通读jQuery源码，还发现有一些方法放在了模块作用域中，至于为什么会有这样的区别，建议大家回过头去读读前一篇文章。

而放在构造函数中的方法，因为我们在使用时，不需要声明一个实例对象就可以直接使用，因此这样的方法常常被叫做工具方法，或者所谓的静态方法。工具方法在使用时因为不用创建新的实例，因此相对而言效率会高很多，但是并不节省内存。

而工具方法的特性也和工具一词非常贴近，他们与实例的自身属性毫无关联，仅仅只是实现一些通用的功能，我们可以通过`$.each`与`$('div').each`这2个方法来体会工具方法与实例方法的不同之处。

在实际开发中，我们运用得非常多的一个工具库就是`lodash.js`，大家如果时间充裕一定要去学习一下他的使用。

```javascript
$.ajax()
$.isFunction()
$.each()
... ...
```

而放在原型中的方法，在使用时必须创建了一个新的实例对象才能访问，因此这样的方法叫做实例方法。也正是由于必须创建了一个实例之后才能访问，所以他的使用成本会比工具方法高很多。但是节省了内存。

```javascript
$('#test').css()
$('#test').attr()
$('div').each()
```

这样，那位同学的疑问就很简单的被搞定了。我们在学习的时候，一定不要过分去纠结一些概念，而要明白具体怎么回事儿，那么学习这件事情就不会在一些奇奇怪怪的地方卡住了。

所以通过`$.extend`扩展的方法，其实就是对工具方法的扩展，而通过`$.fn.extend`扩展的方法，就是对于实例方法的扩展。那么我们在使用的时候就知道如何准确的去使用自己扩展的方法了。

## jQuery插件的实现

我在初级阶段的时候，觉得要自己编写一个jQuery插件是一件高大上的事情，可望不可即。但是通过对于上面的理解，我就知道扩展jQuery插件其实是一件我们自己也可以完成的事情。

在前面我跟大家分享了jQuery如何实现，以及他们的方法如何扩展，并且前一篇文章分享了拖拽对象的具体实现。所以建议大家暂时不要阅读下去，自己动手尝试将拖拽扩展成为jQuery的一个实例方法，那么这就是一个jQuery插件了。

具体也没有什么可多说的了，大家看了代码就可以明白一切。

```javascript
// Drag对象简化代码，完整源码可在上一篇文章中查看
;
(function() {

    // 构造
    function Drag(selector) {}


    // 原型
    Drag.prototype = {
        constructor: Drag,

        init: function() {
            // 初始时需要做些什么事情
            this.setDrag();
        },

        // 稍作改造，仅用于获取当前元素的属性，类似于getName
        getStyle: function(property) {},

        // 用来获取当前元素的位置信息，注意与之前的不同之处
        getPosition: function() {},

        // 用来设置当前元素的位置
        setPostion: function(pos) {},

        // 该方法用来绑定事件
        setDrag: function() {}
    }

    // 一种对外暴露的方式
    window.Drag = Drag;
})();

// 通过扩展方法将拖拽扩展为jQuery的一个实例方法
(function ($) {
  $.fn.extend({
    becomeDrag: function () {
      new Drag(this[0]);
      return this;   // 注意：为了保证jQuery所有的方法都能够链式访问，每一个方法的最后都需要返回this，即返回jQuery实例
    }
  })
})(jQuery);
```

**后续文章内容一个大概预想**

去年年末的时候就有了想要将JavaScript基础知识总结一下的这样一个想法，可是JavaScript基础知识确实并非全部是层层递进的关系，有很多碎片化的东西，所以之前一直没有找到一个合适的整理方法。

直到在segmentfault中我在给题主建议如何快速学习一门诸如react/vue这样的流行框架时，找到了一个好一点的思路，于是就有了这样一系列文章，虽然它并不全面，很多知识没有涉及到，但是其实我是围绕最终通过模块化来构建自己代码这样一个思路来总结的，因此这系列文章能够解决大家最核心的问题。

也正因为如此，这系列的文章的终点将会是在ES6环境下掌握react的使用。虽然前面我多多少少都涉及到了模块的一些概念，但是还差一个实践。因此最终我会以ES6的模块跟大家分享如何使用。

那么后续的文章应该会涉及的内容，就大概包括：

* 事件循环机制
* Promise
* ES6的基础语法
* ES6下的常用设计模式
* ES6模块
* 结合ES6的实例
* React基础语法
* React组件
* React高阶组件
* React实例
* Redux



  [1]: http://www.jianshu.com/p/3f97570d22b4
  [2]: http://upload-images.jianshu.io/upload_images/599584-181a154ebc9ec559.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240