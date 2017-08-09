# 前端基础进阶（十三）：透彻掌握Promise的使用，读这篇就够了

Tags:JavaScriptAdvanced

---
本文章出自：[前端基础进阶（十三）：透彻掌握Promise的使用，读这篇就够了][1]

作者：波同学

Promise的重要性我认为我没有必要多讲，概括起来说就是必须得掌握，而且还要掌握透彻。这篇文章的开头，主要跟大家分析一下，为什么会有Promise出现。

在实际的使用当中，有非常多的应用场景我们不能立即知道应该如何继续往下执行。最重要也是最主要的一个场景就是ajax请求。通俗来说，由于网速的不同，可能你得到返回值的时间也是不同的，这个时候我们就需要等待，结果出来了之后才知道怎么样继续下去。

```javascript
// 简单的ajax原生实现
var url = 'https://hq.tigerbrokers.com/fundamental/finance_calendar/getType/2017-02-26/2017-06-10';
var result;

var XHR = new XMLHttpRequest();
XHR.open('GET', url, true);
XHR.send();

XHR.onreadystatechange = function() {
    if (XHR.readyState == 4 && XHR.status == 200) {
        result = XHR.response;
        console.log(result);
    }
}
```

在ajax的原生实现中，利用了onreadystatechange事件，当该事件触发并且符合一定条件时，才能拿到我们想要的数据，之后我们才能开始处理数据。

这样做看上去并没有什么麻烦，但是如果这个时候，我们还需要做另外一个ajax请求，这个新的ajax请求的其中一个参数，得从上一个ajax请求中获取，这个时候我们就不得不如下这样做：

```javascript
var url = 'https://hq.tigerbrokers.com/fundamental/finance_calendar/getType/2017-02-26/2017-06-10';
var result;

var XHR = new XMLHttpRequest();
XHR.open('GET', url, true);
XHR.send();

XHR.onreadystatechange = function() {
    if (XHR.readyState == 4 && XHR.status == 200) {
        result = XHR.response;
        console.log(result);

        // 伪代码
        var url2 = 'http:xxx.yyy.com/zzz?ddd=' + result.someParams;
        var XHR2 = new XMLHttpRequest();
        XHR2.open('GET', url, true);
        XHR2.send();
        XHR2.onreadystatechange = function() {
            ...
        }
    }
}
```

当出现第三个ajax(甚至更多)仍然依赖上一个请求的时候，我们的代码就变成了一场灾难。这场灾难，往往也被称为**回调地狱**。

因此我们需要一个叫做Promise的东西，来解决这个问题。

当然，除了回调地狱之外，还有一个非常重要的需求：**为了我们的代码更加具有可读性和可维护性，我们需要将数据请求与数据处理明确的区分开来**。上面的写法，是完全没有区分开，当数据变得复杂时，也许我们自己都无法轻松维护自己的代码了。这也是模块化过程中，必须要掌握的一个重要技能，请一定重视。

从前面几篇文中的知识我们可以知道，当我们想要确保某代码在谁谁之后执行时，我们可以利用函数调用栈，将我们想要执行的代码放入回调函数中。

```javascript
// 一个简单的封装
function want() {
    console.log('这是你想要执行的代码');
}

function fn(want) {
    console.log('这里表示执行了一大堆各种代码');

    // 其他代码执行完毕，最后执行回调函数
    want && want();
}

fn(want);
```

利用回调函数封装，是我们在初学JavaScript时常常会使用的技能。

确保我们想要的代码压后执行，除了利用函数调用栈的执行顺序之外，我们还可以利用上一篇文章所述的队列机制。

```javascript
function want() {
    console.log('这是你想要执行的代码');
}

function fn(want) {
    // 将想要执行的代码放入队列中，根据事件循环的机制，我们就不用非得将它放到最后面了，由你自由选择
    want && setTimeout(want, 0);
    console.log('这里表示执行了一大堆各种代码');
}

fn(want);
```

如果浏览器已经支持了原生的Promise对象，那么我们就知道，浏览器的js引擎里已经有了Promise队列，这样就可以利用Promise将任务放在它的队列中去。

```javascript
function want() {
    console.log('这是你想要执行的代码');
}

function fn(want) {
    console.log('这里表示执行了一大堆各种代码');

    // 返回Promise对象
    return new Promise(function(resolve, reject) {
        if (typeof want == 'function') {
            resolve(want);
        } else {
            reject('TypeError: '+ want +'不是一个函数')
        }
    })
}

fn(want).then(function(want) {
    want();
})

fn('1234').catch(function(err) {
    console.log(err);
})
```

看上去变得更加复杂了。可是代码变得更加健壮，处理了错误输入的情况。

为了更好的往下扩展Promise的应用，这里需要先跟大家介绍一下Promsie的基础知识。

一、 Promise对象有三种状态，他们分别是：

* pending: 等待中，或者进行中，表示还没有得到结果
* resolved(Fulfilled): 已经完成，表示得到了我们想要的结果，可以继续往下执行
* rejected: 也表示得到结果，但是由于结果并非我们所愿，因此拒绝执行
这三种状态不受外界影响，而且状态只能从pending改变为resolved或者rejected，并且不可逆。在Promise对象的构造函数中，将一个函数作为第一个参数。而这个函数，就是用来处理Promise的状态变化。

```javascript
new Promise(function(resolve, reject) {
    if(true) { resolve() };
    if(false) { reject() };
})
```

上面的resolve和reject都为一个函数，他们的作用分别是将状态修改为resolved和rejected。

二、 Promise对象中的then方法，可以接收构造函数中处理的状态变化，并分别对应执行。then方法有2个参数，第一个函数接收resolved状态的执行，第二个参数接收reject状态的执行。

```javascript
function fn(num) {
    return new Promise(function(resolve, reject) {
        if (typeof num == 'number') {
            resolve();
        } else {
            reject();
        }
    }).then(function() {
        console.log('参数是一个number值');
    }, function() {
        console.log('参数不是一个number值');
    })
}

fn('hahha');
fn(1234);
```

then方法的执行结果也会返回一个Promise对象。因此我们可以进行then的链式执行，这也是解决回调地狱的主要方式。

```javascript
function fn(num) {
    return new Promise(function(resolve, reject) {
        if (typeof num == 'number') {
            resolve();
        } else {
            reject();
        }
    })
    .then(function() {
        console.log('参数是一个number值');
    })
    .then(null, function() {
        console.log('参数不是一个number值');
    })
}

fn('hahha');
fn(1234);
```

> then(null, function() {}) 就等同于catch(function() {})


三、Promise中的数据传递

大家自行从下面的例子中领悟吧。

```javascript
var fn = function(num) {
    return new Promise(function(resolve, reject) {
        if (typeof num == 'number') {
            resolve(num);
        } else {
            reject('TypeError');
        }
    })
}

fn(2).then(function(num) {
    console.log('first: ' + num);
    return num + 1;
})
.then(function(num) {
    console.log('second: ' + num);
    return num + 1;
})
.then(function(num) {
    console.log('third: ' + num);
    return num + 1;
});

// 输出结果
first: 2
second: 3
third: 4
```

OK，了解了这些基础知识之后，我们再回过头，利用Promise的知识，对最开始的ajax的例子进行一个简单的封装。看看会是什么样子。

```javascript
var url = 'https://hq.tigerbrokers.com/fundamental/finance_calendar/getType/2017-02-26/2017-06-10';

// 封装一个get请求的方法
function getJSON(url) {
    return new Promise(function(resolve, reject) {
        var XHR = new XMLHttpRequest();
        XHR.open('GET', url, true);
        XHR.send();

        XHR.onreadystatechange = function() {
            if (XHR.readyState == 4) {
                if (XHR.status == 200) {
                    try {
                        var response = JSON.parse(XHR.responseText);
                        resolve(response);
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(new Error(XHR.statusText));
                }
            }
        }
    })
}

getJSON(url).then(resp => console.log(resp));
```

为了健壮性，处理了很多可能出现的异常，总之，就是正确的返回结果，就resolve一下，错误的返回结果，就reject一下。并且利用上面的参数传递的方式，将正确结果或者错误信息通过他们的参数传递出来。

> 现在所有的库几乎都将ajax请求利用Promise进行了封装，因此我们在使用jQuery等库中的ajax请求时，都可以利用Promise来让我们的代码更加优雅和简单。这也是Promise最常用的一个场景，因此我们一定要非常非常熟悉它，这样才能在应用的时候更加灵活。

四、Promise.all

当有一个ajax请求，它的参数需要另外2个甚至更多请求都有返回结果之后才能确定，那么这个时候，就需要用到Promise.all来帮助我们应对这个场景。

Promise.all接收一个Promise对象组成的数组作为参数，当这个数组所有的Promise对象状态都变成resolved或者rejected的时候，它才会去调用then方法。

```javascript
var url = 'https://hq.tigerbrokers.com/fundamental/finance_calendar/getType/2017-02-26/2017-06-10';
var url1 = 'https://hq.tigerbrokers.com/fundamental/finance_calendar/getType/2017-03-26/2017-06-10';

function renderAll() {
    return Promise.all([getJSON(url), getJSON(url1)]);
}

renderAll().then(function(value) {
    // 建议大家在浏览器中看看这里的value值
    console.log(value);
})
```

五、 Promise.race

与Promise.all相似的是，Promise.race都是以一个Promise对象组成的数组作为参数，不同的是，只要当数组中的其中一个Promsie状态变成resolved或者rejected时，就可以调用.then方法了。而传递给then方法的值也会有所不同，大家可以再浏览器中运行下面的例子与上面的例子进行对比。

```javascript
function renderRace() {
    return Promise.race([getJSON(url), getJSON(url1)]);
}

renderRace().then(function(value) {
    console.log(value);
})
```

嗯，我所知道的，关于Promise的基础知识就这些了，如果还有别的，欢迎大家补充。

那么接下来，我们要结合三个不同的应用场景来让大家感受一下Promise在模块系统中如何使用。

> 这里选择requirejs是因为学习成本最低，能够快速上手进行简单的运用。接下来的这些例子，会涉及到很多其他的知识，因此如果想要彻底掌握，一定要动手实践，自己试着完成一遍。

我在github上创建了对应的项目，大家可以直接clone下来进行学习。这样学习效果会更好。

项目地址： [https://github.com/yangbo5207/promiseApps][2]

往下阅读例子之前，请一定要对requirejs有一个简单的了解。

requirejs中文文档 [http://www.requirejs.cn/][3]

![代码结构][4]

项目的代码结果如上图所示，所有的html文件都放在根目录下。

* pages: html直接引入的js
* libs: 常用的库
* components: 针对项目自定义的模块

首先为了能够让require起作用，我们需要在html中引入require.js，写法如下：

```javascript
// index.js为入口文件
<script data-main="./pages/index.js" src="./libs/require.js"></script>
```

在入口的index.js中，我们可以对常用的模块进行映射配置，这样在引入时就可以少写一些代码。

```javascript
// 具体的配置项的含义，请参阅require的中文文档
requirejs.config({
    baseUrl: './',
    paths: {
        jquery: "./libs/jquery-3.2.0",
        API: './libs/API',
        request: './libs/request',
        calendar: './components/calendar',
        imageCenter: './components/imageCenter',
        dialog: './components/Dialog'
    }
})
```

配置之后，那么我们在其他模块中，引入配置过的模块，就可以简单的这样写：

```javascript
var $ = require('jquery');
```

如果不进行配置，也可以这样引入模块：

```javascript
require('./components/button');
```

我们可以使用define定义一个模块：

```javascript
// 其他方式请参阅文档
define(function(require) {

})
```

使用return可以直接对外提供方法：

```javascript
// 在其他模块通过require引入时得到的值，就是这里返回的值
define(function(require) {
    return {
        a: 1
    }
})
```

OK，了解上面这些，应付基础的使用已经没有问题了。我们接下来重点总结第一个常用的应用场景：ajax。

关于ajax的简单使用和简单封装，我们在上面都已经讲过了，这里就不再多说，直接使用jquery封装好的方法即可。而我们需要处理的问题在于，如何有效的将ajax的数据请求和数据处理分别放在不同的模块中进行管理，这样做的主要目的在于降低后期维护成本，便于管理。

来看看怎么样简单操作的。

首先，将所有的url放在一个模块中统一处理。

```javascript
// libs/API.js
define(function() {
    return {
        dayInfo: 'https://hq.tigerbrokers.com/fundamental/finance_calendar/get_day/2017-04-03',
        typeInfo: 'https://hq.tigerbrokers.com/fundamental/finance_calendar/getType/2017-03-26/2017-04-15'
    }
})
```

在实际开发中，url并不是直接通过字符串就能直接确认的，某些url还需要通过参数拼接等，这个时候需要我们灵活处理。

第二步，将所有的数据请求这个动作放在同一个模块中统一管理。

```javascript
// libs/request.js
define(function(require) {
    var API = require('API');

    // 因为jQuery中的get方法也是通过Promise进行了封装，最终返回的是一个Promise对象，因此这样我们就可以将数据请求与数据处理放在不同的模块
    // 这样我们就可以使用一个统一的模块来管理所有的数据请求

    // 获取当天的信息
    getDayInfo = function() {
        return $.get(API.dayInfo);
    }

    // 获取type信息
    getTypeInfo = function() {
        return $.get(API.typeInfo);
    };

    return {
        getDayInfo: getDayInfo,
        getTypeInfo: getTypeInfo
    }
});
```

在这个模块中，我们还可以对拿到的数据进行一些你需要的过滤处理，确保最终返回给下一个模块的数据是能够直接使用的。

第三步：就是拿到数据并且处理数据了。

```javascript
// components/calendar.js
define(function(require) {
    var request = require('request');

    // 拿到数据之后，需要处理的组件，可以根据数据渲染出需求想要的样式
    // 当然这里为了简化，就仅仅只是输出数据就行了，在实际中，拿到数据之后还要进行相应的处理

    request.getTypeInfo()
        .then(function(resp) {

            // 拿到数据，并执行处理操作
            console.log(resp);
        })

    // 这样，我们就把请求数据，与处理数据分离开来，维护起来就更加方便了，代码结构也足够清晰
})
```

这就是我所了解的处理ajax的比较好的一个方式，如果你有其他更好的方式也欢迎分享。

第二个应用场景就是图片加载的问题。
在一些实际应用中，常常会有一些图片需要放置在某一个块中，比如头像，比如某些图片列表。可是源图片的尺寸可能很难保证长宽比例都是一致的，如果我们直接给图片设定宽高，就有可能导致图片变形。变形之后高大上的页面就直接垮掉了。

因此为了解决这个问题，我们需要一个定制的image组件来解决这个问题。我们期望图片能够根据自己的宽高比，合理的缩放，保证在这个块中不变形的情况下尽可能的显示更多的内容。

假如有一堆图片，如下：

```javascript
<section class="img-wrap">
    <div class="img-center">
        ![](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491191204817&di=48ea9cde3319576ed6e0b6dc6c6b75b4&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F342ac65c103853438b3c5f8b9613b07ecb8088ad.jpg)
    </div>

    <div class="img-center">
        ![](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491191241712&di=9dbd9c614b82f0b02c92c6e60875983a&imgtype=0&src=http%3A%2F%2Fpic5.qiyipic.com%2Fcommon%2F20130524%2F7dc5679567cd4243a0a41e5bf626ad77.jpg%3Fsrc%3Dfocustat_4_20130527_7)
    </div>

    <div class="img-center">
        ![](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491191271233&di=0c9dd2677413beadcccd66b9d4598c6b&imgtype=0&src=http%3A%2F%2Fb.zol-img.com.cn%2Fdesk%2Fbizhi%2Fimage%2F4%2F960x600%2F1390442684896.jpg)
    </div>

    <div class="img-center">
        ![](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491191294538&di=6474f3b560f2c100e62f118dde7e8d6c&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fc9fcc3cec3fdfc03dfdfafcad23f8794a4c22618.jpg)
    </div>
</section>
```
每一张图片都有一个包裹的div，这些div的宽高，就是我们期望图片能保持的宽高。

当图片宽度值过大时，我们期望图片的高度为100%，并且左右居中。
当图片高度值过大时，我们期望图片的宽度为100%，并且上下居中。

根据这一点，我们来看看具体怎么实现。

首先是样式的定义很重要。

```javascript
.img-center {
    width: 200px;
    height: 150px;
    margin: 20px;
    overflow: hidden;
    position: relative;
}

.img-center img {
    display: block;
    position: absolute;
}

.img-center img.aspectFill-x {
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
}

.img-center img.aspectFill-y {
    height: 100%;
    left: 50%;
    transform: translateX(-50%);
}
```

我分别定义了`aspectFill-x`与`aspectFill-y`，通过判断不同的宽高比，来决定将他们中的其中一个加入到img标签的class中去即可。

获取图片的原始宽高，需要等到图片加载完毕之后才能获取。而当图片已经存在缓存时，则有一个compete属性变成true。那么我们就可以根据这些基础知识，定义一个模块来处理这件事情。

```javascript
// components/imageCenter.js
define(function(require) {

    // 利用Promise封装一个加载函数，这里也是可以单独放在一个功能模块中进一步优化
    var imageLoad = function(img) {
        return new Promise(function(resolve, reject) {
            if (img.complete) {
                resolve();
            } else {
                img.onload = function(event) {
                    resolve(event);
                }

                img.onerror = function(err) {
                    reject(err);
                }
            }
        })
    }

    var imageCenter = function(domList, mode) {

        domList.forEach(function(item) {
            var img = item.children[0];
            var itemW = item.offsetWidth;
            var itemH = item.offsetHeight;
            var itemR = itemW / itemH;

            imageLoad(img).then(function() {
                var imgW = img.naturalWidth;
                var imgH = img.naturalHeight;
                var imgR = imgW / imgH;

                var resultMode = null;

                switch (mode) {
                    // 这样写是因为期待未来可以扩展其他的展示方式
                    case 'aspectFill':
                        resultMode = imgR > 1 ? 'aspectFill-x' : 'aspectFill-y';
                        break;
                    case 'wspectFill':
                        resultMode = itemR > imgR ? 'aspectFill-x' : 'aspectFill-y'
                        break;
                    default:
                }

                $(img).addClass(resultMode);
            })
        })
    }

    return imageCenter;
})
```

那么在使用时，直接引入这个模块并调用imageCenter方法即可。

```javascript
// index.js
var imageCenter = require('imageCenter');
var imageWrapList = document.querySelectorAll('.img-center');
imageCenter(imageWrapList, 'wspectFill');
```

![一堆尺寸乱七八糟的图片就这样被驯服了][5]

第三个应用场景，则是自定义弹窗的处理。

![这种类型的弹窗随处可见，而且十分常用][6]

因此自己专门定义一个常用的弹窗就变得非常有必要，这对于我们开发效率的提高非常有帮助。当然，我这里只是简单的写了一个简陋的，仅供参考。

我们期望的是利用Promise，当我们点击确认时，状态变成resolved，点击取消时，状态变成rejected。这样也方便将弹窗生成与后续的操作处理区分开来。

先定义一个Dialog模块。使用的是最简单的方式定义，应该不会有什么理解上的困难。主要提供了show和hide2个方法，用于展示和隐藏。

```javascript
// components/Dialog.js
define(function(require) {

    // 利用闭包的特性，判断是否已经存在实例
    var instance;

    function Dialog(config) {

        this.title = config.title ? config.title : '这是标题';
        this.content = config.content ? config.content : '这是提示内容';

        this.html = '<div class="dialog-dropback">' +
            '<div class="container">' +
                '<div class="head">'+ this.title +'</div>' +
                '<div class="content">'+ this.content +'</div>' +
                '<div class="footer">' +
                    '<button class="cancel">取消</button>' +
                    '<button class="confirm">确认</button>' +
                '</div>' +
            '</div>' +
        '</div>'
    }

    Dialog.prototype = {
        constructor: Dialog,
        show: function() {
            var _this = this;
            if (instance) {
                this.destory();
            }
            $(this.html).appendTo($(document.body));
            instance = this;

            return new Promise(function(resolve, reject) {
                $('.dialog-dropback .cancel').on('click', function(e) {
                    _this.hide();
                    reject(e);
                })

                $('.dialog-dropback .confirm').on('click', function(e) {
                    _this.hide();
                    resolve(e);
                })
            })
        },

        destory: function() {
            instance = null;
            $('.dialog-dropback .cancel').off('click');
            $('.dialog-dropback .confirm').off('click');
            $('.dialog-dropback').remove();
        },

        hide: function() {
            this.destory();
        }
    }

    return function(config) {
        return new Dialog(config);
    }
})
```

那么在另外一个模块中需要使用它时：

```javascript
define(function(require) {
    var Dialog = require('dialog');

    $('button.aspect').on('click', function() {
        Dialog({
            title: '友情提示',
            content: '外面空气不太好，你确定你要出门逛逛吗？'
        }).show().then(function() {
            console.log('你点击了确认按钮.');
        }).catch(function() {
            console.log('你点击了取消按钮.');
        })
    })
})
```

这三种场景就介绍完了，主要是需要大家通过源码来慢慢理解和揣摩。真正掌握之后，相信大家对于Promise在另外的场景中的使用也会变得得心应手。

最后总结一下，这篇文章，涉及到的东西，有点多。大概包括Promise基础知识，ajax基础知识，如何利用Promise封装ajax，如何使用require模块系统，如何在模块中使用Promise，并且对应的三个应用场景又各自有许多需要了解的知识，因此对于基础稍差的朋友来说，理解透彻了肯定会有一个比较大的进步。当然也会花费你更多的时间。

另外在我们的工作中还有一件非常重要的事情是需要我们持续去做的。那就是将常用的场景封装成为可以共用的模块，等到下次使用时，就可以直接拿来使用而节省非常多的开发时间。比如我这里对于img的处理，对于弹窗的处理，都是可以扩展成为一个通用的模块的。慢慢积累多了，你的开发效率就可以得到明显的提高，这些积累，也将会变成你的优势所在。

后续的文章我会分享如何利用react与es6模块系统封装的共用组件，大家也可以学习了之后，根据自己的需求，封装最适合你自己的一套组件。

> 最后，最近问我怎么学习的人越来越多，我真的有点回答不过来了，我想把我这些文章里的知识都掌握了，应付毕业之后的第一份工作应该不是什么问题的吧？而且为了你们能够掌握Promise的使用，我还专门给读者老爷们创建了一个项目，列举了整整三个实例，还有源代码供你们学习，我学Promise的时候，找好久都没找到一个稍微接近实际应用的案例，学了好久才知道怎么使用，效率之低可想而知。所以静下心来慢慢学习吧，花点时间是值得的 ~ ~ 。


  [1]: http://www.jianshu.com/p/fe5f173276bd
  [2]: https://github.com/yangbo5207/promiseApps
  [3]: http://www.requirejs.cn/
  [4]: http://upload-images.jianshu.io/upload_images/599584-e41310ad7d0461e5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240
  [5]: http://upload-images.jianshu.io/upload_images/599584-84f1bc8b234fb1c9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240
  [6]: http://upload-images.jianshu.io/upload_images/599584-722d781aa74a2306.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240