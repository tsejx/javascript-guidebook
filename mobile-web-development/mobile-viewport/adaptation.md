## 适配方案

由于移动端的特殊性，屏幕的尺寸碎片化严重，要想很好的适配不同的尺寸的设备，需要我们前端开发相比 PC 端要做一些基层的适配方案。

关键是需要找到一种长度单位，使得一样的取值，在不同尺寸的设备屏幕上按大小比例缩放。

### 常见的适配方案

- [流式布局](#流式布局)
- 视口适配
  - [Hack 实现](#hack实现方案)
  - [原生样式实现](#原生样式实现)
- [根元素适配](#根元素适配)
- 其他适配方案
  - [固定宽度方案](#固定宽度方案)
  - [响应式方案](#响应式方案)

### 流式布局

流式布局即使用百分比定义宽度与固定绝对高度的布局方案。

此方案的前提是设置屏幕为理想视口，然后通过水平百分比布局或者弹性布局，垂直方向一般用固定像素。

**优点**

* 布局快速简单方便，在移动设备中水平表现良好差异不大

**缺点**

* 垂直方向像素恒定，可能水平很宽的屏幕会被拉伸变形严重，显示效果不协调
* 高倍屏幕上1像素可能被多倍的物理像素显示，会变的非常粗
* 大量百分比布局存在许多兼容性问题

**特点**

- 固定屏幕为理想视口宽度
- 少许的媒体查询设置字体
- 水平百分比布局或弹性布局
- 垂直方向像素恒定

#### 水平百分比布局

```html
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"/>

<style>
    header {
        /* 宽度默认100% */
        height: 45px;
        line-height: 45px;
        background-color: #00b38a;
        color: #fff;
        /* 可根据媒体查询适当调整字体大小 */
        font-size: 1.8rem; 
        text-align: center;
        position: relative;
    }
</style>

<header></header>
```

#### 水平弹性布局

```html
<style>
    header {
        height: 45px;
        display: flex;
        justify-content: space-between;
        line-height: 45px;
    }
</style>

<header>
    <span class="layout">水平弹性布局</span>
    <a href="#" class="login">登陆</a>
</header>
```

### 视口适配

讨论方案之前，需要先了解三个关键概念：

- [设备像素密度](viewport.md#设备像素密度)（Pixel Per Inch，PPI）：现实世界的一英寸内像素数，决定了屏幕的显示质量
- [设备像素比率](viewport.md#设备像素比率)（Device Pixel Ratio，DPR）：物理像素与逻辑像素（px）的对应关系
- [分辨率](viewport.md#分辨率)（Resolution）：屏幕区域的宽高所占像素数

《使用 Flexible 实现手淘 H5 页面的终端适配》

- 开发直接按照设计稿编写固定尺寸元素
- 页面加载完成后用 JavaScript 动态根据 DPR 改变页面的缩放量
- 推荐使用方案：Flexible 方案（目前手淘已经升级2.0版本）

这种方案实现方式有多种 []() 介绍了淘宝实现方案和网易新闻实现的方案。

#### Hack 实现方案

Flexible 方案：综合运用 `rem` 和 `px` 两种单位相互转换，并通过 Hack 手段根据设备的 DPR 值相应改变的 `<meta>` 标签中的 viewport 的 `scale` 值和 `html` 字体大小的值（根据官方说法属于过渡方案，现2019.2已升级2.0版本）

* 根据 DPR 的值来修改 viewport 实现 `1px` 的线
* 根据 DPR 的值来修改 `<html>` 的 `font-size`，从而使用 `rem` 实现等比缩放
* 使用 Hack 手段用 `rem` 模拟 `vw` 特性

##### 设置理想视口

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
```

设置理想视口，使得**布局视口**与**视觉视口**一样大，DOM 文档主宽度即为屏幕宽度。

单个CSS像素（`1px`）由多少设备像素显示由具体设备而不同。

##### 动态设置视口缩放

对于 Android，所有设备缩放设为1。对于 iOS，根据 DPR 不同，设置其缩放为 DPR 倒数。

设置页面缩放可以使得单个CSS像素（`1px`）由单个设备像素来显示，从而提高显示精度。因此，设置 `1 / dpr` 的缩放视口，可以画出 `1px` 的边框。

不管页面中有没有设置 viewport，若无，则设置，若有，则改写，设置其 scale 为 `1/dpr`。

```js
// flexible.js
if (!dpr && !scale) {
    var isAndroid = win.navigator.appVersion.match(/android/gi);
    var isIPhone = win.navigator.appVersion.match(/iphone/gi);
    var devicePixelRatio = win.devicePixelRatio;
    if (isIPhone) {
        // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
        if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {                
            dpr = 3;
        } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
            dpr = 2;
        } else {
            dpr = 1;
        }
    } else {
        // 其他设备下，仍旧使用1倍的方案
        dpr = 1;
    }
    scale = 1 / dpr;
}

docEl.setAttribute('data-dpr', dpr);
if (!metaEl) {
    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
    if (docEl.firstElementChild) {
        docEl.firstElementChild.appendChild(metaEl);
    } else {
        var wrap = doc.createElement('div');
        wrap.appendChild(metaEl);
        doc.write(wrap.innerHTML);
    }
}

function refreshRem(){
    var width = docEl.getBoundingClientRect().width;
    if (width / dpr > 540) {
        width = 540 * dpr;
    }
    var rem = width / 10;
    docEl.style.fontSize = rem + 'px';
    flexible.rem = win.rem = rem;
}
```

`<html data-dpr="2" style="font-size: 100px">`

* 根据不同的设备规划不同的布局（`font-size` 是不同设备上用 `rem` 的基准值）
* 任何分辨率下字体需要保持一致（`data-dpr` 针对字体设置）

⚠️ 注意：通过一段 JavaScript 代码根据设备的屏幕宽度、DPR 设置根元素的 `data-dpr` 和 `font-size`，这段 JavaScript 代码要在所有资源加载之前执行，建议做内联处理。

**设置缩放视口和设置理想视口有什么不同？**

问题：Viewport 设为理想视口（`scale=1`），基本已经满足适配，为什么要动态设置 Viewport 缩放？

原因：以 iPhone6 为例，DPR 为2，缩放设为0.5，则布局视口为750，缩放后显示刚好为视觉视口375，而总的 CSS 像素（逻辑像素）其实是750，与设备像素一致，这样 `1px` 的CSS像素，占用的物理像素也是1。而 viewport 设置缩放为1的理想视口情况下，布局视口为375，显示也刚好是屏幕宽度，然而 `1px` 的CSS像素，占用的物理像素是2。这样说来，这样设置可以实现 `1px` 的线条在二倍屏的显示。如此实现的原因是CSS像素与设备像素的关系依赖于屏幕缩放。

验证：

* 设备：iPhone6，在 `scale=0.5` 时，`1px` 边框显示效果
  * 在 `scale=1.0` 时，`1px` 边框显示效果
  * 在 `scale=0.5` 时，`2px` 边框显示效果
* 通过对比后发现，在 `scale=0.5` 时，`1px` 的线比 `scale=1.0` 要细，这也就解决了 `1px` 线条的显示问题

##### 单位转换混合宏

```scss
// 使用 Sass 的混合宏
// 淘宝手淘的方案里，iPhone6(375pt)屏幕宽度为10rem，即font-size=75px, scale=0.5 因设计图为二倍图，$base-font-size=75px

@mixin px2rem($property, $px-values, $baseline-px: 16px, $support-for-ie: false){
    //Conver the baseline into rems
    $baseline-rem: $baseline-px / 1rem * 1;
    //Print the first line in pixel values
    @if $support-for-ie {
        #{$property}: $px-values;
    }
    //if there is only one (numeric) value, return the property/value line for it.
    @if type-of($px-values) == "number"{
        #{$property}: $px-values / $baseline-rem;
    }
    @else {
        //Create an empty list that we can dump values into
        $rem-values:();
        @each $value in $px-values{
            // If the value is zero or not a number, return it
            @if $value == 0 or type-of($value) != "number"{
                $rem-values: append($rem-values, $value / $baseline-rem);
            }
        }
        // Return the property and its list of converted values
        #{$property}: $rem-values;
    }
}
```

#### 原生样式实现方案

移动布局需要面对两个最为重要的问题：

- 各终端下的适配问题
- Retina屏的细节处理

不同终端，开发者需要面对屏幕分辨率、DPR、`1px`、`@2x` 图等一系列问题。

这个布局方案也是针对性的解决这些问题，只不过解决这些问题不再是使用 Hack 手段来处理，而是直接使用原生的 CSS 技术来处理的。著作权归作者所有。

Flexbile 方案通过 JavaScript 模拟 `vw` 的特性，如今，`vw` 已经得到了众多浏览器支持。

`vw` 是基于 Viewport 视窗的长度单位，这里的视窗（Viewport）指的是浏览器可视化的区域，而这个可视区域是 `window.innerWidth / window.innerHeight` 的大小。

> 浏览器相关尺寸信息获取（以高度为例）：
>
> * `screen.height`：屏幕高度
> * `screen.availHeight`：屏幕可用高度
> * `screen.height - screen.availHeight`：任务栏高度
> * `window.outerHeight`：浏览器高度
> * `window.innerHeight`：页面可用高度
> * `window.outerHeight - window.innerHeight`：工具栏高度
> * `body.clientHeigh`：Body 展示高度
> * `window.innerHeight - body.clientHeight`：滚动条
> * `body.offsetHeight`：Body 总高度

在 [CSS Values and Units Module Level 3](https://www.w3.org/TR/css3-values/) 中和 Viewport 相关的单位有四个，分别为 `vw`、`vh`、`vmin` 和 `vmax`。

- `vw`：是 Viewport's width 的简写，`1vw` 等于 `window.innerWidth` 的 `1%`
- `vh`：和 `vw` 类似，是 Viewport's height 的简写，`1vh` 等于 `window.innerHeihgt` 的 `1%`
- `vmin`：`vmin` 的值是当前 `vw` 和 `vh` 中较小的值
- `vmax`：`vmax` 的值是当前 `vw` 和 `vh` 中较大的值

> `vmin` 和 `vmax` 是根据 Viewport 中长度偏大的那个维度值计算出来的，如果 `window.innerHeight > window.innerWidth` 则 `vmin` 取百分之一的 `window.innerWidth`，`vmax` 取百分之一的 `window.innerHeight` 计算。

![viewport-unit](../../images/8/d5150d46-ddef-4c63-abf1-482014b835f6.png)





```js
(function flexible(window, document){
    var docEl = document.documentElement
    var dpr = window.devicePixelRatio || 1
    
    // adjust body font size
    function setBodyFontSize(){
        if (document.body){
            document.body.style.fontSize = (12 * dpr) + 'px'
        } else {
            document.addEventListener('DOMContentLoaded', setBodyFontSize)
        }
    }
     
    setBodyFontSize()
    
    // set 1rem = viewWidth / 10
    function setRemUnit(){
        var rem = docEl.clientWidth / 10
        docEl.stlye.fontSize = rem + 'px'
    }
    
    setRemUnit()
    
    // reset rem unit on page resize
    window.addEventListener('resize', setRemUnit)
    window.addEventListener('pageshow', function(e){
        if (e.persisted){
            setRemUnit()
        }
    })
    
    // detect 0.5px supports
    if (dpr >= 2){
        var fakeBody = document.createElement('body')
        var testElement = document.createElement('div')
        testElement.stlye.border = .5px solid transparent
        fakeBody.append(testElement)
        docEl.appendChil(fakeBody)
        if (testElement.offsetHeight === 1){
            docEl.classList.add('hairlines')
        }
        docEl.removeChild(fakeBody)
    }
})(window, document)
```

**`px` 和 `vw` 的转换问题**

标准设计稿使用 `750px` 作为宽度，则可得 `100vw = 750px`，即 `1vw = 7.5px`。

那么我们可以根据设计图上的 `px` 值直接转换成对应的 `vw` 值。可通过 PostCSS 插件 [post-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport) 实现。

* 容器适配可以使用 `vw`
* 文本适配可以使用 `vw`
* 大于 `1px` 的边框、圆角、阴影都可以使用 `vw`
* 内边距和外边距可以使用 `vw`

##### 需要考虑的问题

**容器长宽比问题**

* [CSS实现长宽比的几种方案](https://www.w3cplus.com/css/aspect-ratio.html)
* [容器长宽比](https://www.w3cplus.com/css/aspect-ratio-boxes.html)
* [Web中如何实现纵横比](https://www.w3cplus.com/css/experiments-in-fixed-aspect-ratios.html)
* [实现精准的流体排版原理](https://www.w3cplus.com/css/css-polyfluidsizing-using-calc-vw-breakpoints-and-linear-equations.html)

目前 PostCSS 插件只是一个过渡方案，将来我们可以直接在 CSS 中使用 `aspect-ratio` 属性来实现长宽比；

**解决单元素问题**

对于 `1px` 是不建议将其转换成对应的 `vw` 单位的，但在 Retina 下，我们始终是需要面对如何解决 `1px` 的问题。在《[再谈Retina下 `1px` 的解决方案](https://www.w3cplus.com/css/fix-1px-for-retina.html)》文章中提供了多种解决 `1px` 的方案。在这里的话，个人推荐另外一种解决`1px` 的方案。依旧是使用PostCSS插件，解决 `1px`  可以使用 [postcss-write-svg](https://github.com/jonathantneal/postcss-write-svg)。

#### 技术总结

* 使用 `vw` 实现页面适配，并且通过 PostCSS 插件 [postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport) 把 `px` 转换成 `vw`。这样实现的做法便于开发者开发，无须用在开发过程中进行任何计算，只需要根据设计图写 `px` 单位。
* 为了更好的实现长宽比，特别针对于 `ima`、`video`、`iframe` 元素，通过 PostCSS 插件 `postcss-aspect-ratio-mini` 来实现，在实际使用中，只需把对应的宽高写进去即可
* 为了解决 `1px` 问题，使用 PostCSS 插件 `postcss-write-svg`自动生成 `border-image` 或者 `background-image` 的图片

 ### 根元素适配

`rem`（font size of the root element）是指相对于根元素的字体大小的单位。简单的说它就是一个相对单位。看到 `rem` 大家一定会想起 `em` 单位，`em`（font size of the element）是指相对于父元素的字体大小的单位。它们之间其实很相似，只不过一个计算的规则是依赖根元素一个是依赖父元素计算。

关于 `rem` 更多的解读，建议可以阅读本文末附的腾讯一团队的文章[《Web app变革之rem》](http://www.cocoachina.com/webapp/20141224/10746.html)。

把与元素尺寸相关的样式，包括 `height` `width` `padding` `margin` `line-height` 等以 `rem` 作为单位。

根据这个特点，可以根据设备宽度动态设置根元素的 `font-size`，使得以 `rem` 为单位的元素在不同终端上以相对一致的视觉效果呈现。

选取一个设备宽度作为基准，设置其根元素大小，其他设备根据此比例计算其根元素大小。比如使得 iPhone6 根元素 `font-size: 16px`。

| 设备         | 设备宽度 | 根元素 `font-size`/px | 宽度/rem |
| ------------ | -------- | --------------------- | -------- |
| iPhone5      | 320      | JavaScript计算所得    | --       |
| iPhone6      | 375      | 16                    | 23.4375  |
| iPhone6 Plus | 414      | JavaScript计算所得    | --       |
| --           | 360      | JavaScript计算所得    | --       |

根元素 `font-size` 公式：`width / fontSize = baseWidth / baseFontSize`

其中，`baseWidth / baseFontSize` 是选为基准的设备宽度及其根元素字体大小，`width / fontSize` 为所求设备的宽度及其根元素大小。

特点：

- `rem` 的大小取值：根据页面的 dpr 动态改变
- `rem` 的取值，`1rem = 100px` 或 `1rem = 1/10 * 理想视口的宽度`
- Chrome 浏览器字体小于12px（会被重置为12px）

缺点：

- 某些 Android 机型会丢失 `rem` 小数部分
- 占用了 `rem` 单位
- 不是纯 CSS 方案

#### 字体大小适配

在宽高中使用 rem 单位，是为了保证在不同宽度尺寸的设备中能够保证布局的等比例缩放。

首先，字体尺寸使用 rem 而非 px 的原因是，换算之后出现比较怪异的数值，尤为明显的是小数位，比如 `13.777px` 之类的数值。在浏览器中，不同浏览器队小数点的计算存在偏差，而且有些带小数点的 `font-size` 值在待定的浏览器显示并不够清晰。

其次，我们并不希望在小屏幕下面显示跟大屏幕同等量的字体。并且如果使用 `rem` 的话，那么由于等比例的存在，在小屏幕下就会存在小屏幕字体更小的情况，不利于我们更好的去阅读，违背了适配的初衷。所以，对于字体的适配，更好的做法就是使用 px 和媒体查询来进行适配。

由于 Retina 屏幕下 DPR 的不同，我们又想显示的字体一样大，于是就给字体再增大 DPR 的倍数，这样当缩小 DPR 倍的时候，那么字体也就和设计稿所示的大小一样大了，在不同的手机中显示的大小也是一致的。

### 其他适配方案

#### 固定宽度方案

固定页面宽度的做法，早期有些网站把页面设置成320的宽度，超出部分留白，这样做视觉，前端都挺开心，视觉在也不用被流式布局限制自己的设计灵感了，前端也不用在搞坑爹的流式布局。但是这种解决方案也是存在一些问题，例如在大屏幕手机下两边是留白的，还有一个就是大屏幕手机下看起来页面会特别小，操作的按钮也很小。

#### 响应式方案

响应式这种方式在国内很少有大型企业的复杂性的网站在移动端用这种方法去做，主要原因是工作大，维护性难，所以一般都是中小型的门户或者博客类站点会采用响应式的方法从 WebPage 到 WebApp 直接一步到位，因为这样反而可以节约成本，不用再专门为自己的网站做一个 WebApp的版本。

---

参考资料：

- [WebAPP变革之rem](http://www.cocoachina.com/webapp/20141224/10746.html)
- [手机淘宝的flexible设计与实现](http://www.html-js.com/article/2402)
- [淘宝无限适配移动端REM布局详解](https://www.cnblogs.com/well-nice/p/5509589.html)