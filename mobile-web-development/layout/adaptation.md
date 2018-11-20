## 适配方案

由于移动端的特殊性，屏幕的尺寸碎片化严重，要想很好的适配不同的尺寸的设备，需要我们前端开发相比PC端要做一些基层的适配方案。

### 常见的适配方案

- [百分比+固定高度布局方案](#百分比与固定高度布局方案)
  - 固定屏幕为理想视口宽度
  - 少许的媒体查询设置字体
  - 水平百分比布局
  - 水平方向部分也可以使用弹性布局
- [`rem` 解决方案](#rem布局方式)
  - `rem` 的大小取值：根据页面的 dpr 动态改变
  - `rem` 的取值，`1rem = 100px` 或 `1rem = 1/10 * 理想视口的宽度`
  - Chrome 浏览器字体小于12px（会被重置为12px）
- 固定设计稿的宽度开发+根据设备动态适配缩放
  - 开发直接按照设计稿编写固定尺寸元素
  - 页面加载完成后用JavaScript动态根据dpr改变页面的缩放量
  - 推荐使用方案：Flexible方案

### 百分比与固定高度布局方案

此方案的前提是设置屏幕为理想视口，然后通过水平百分比布局或者弹性布局，垂直方向一般用固定像素。

**优点**：布局快速简单方便、在移动设备中水平表现良好差异不大。
**缺点**：由于垂直方向像素恒定，可能水平很宽的屏幕会被拉伸变形严重，另外在高倍屏幕上1像素可能被多倍的物理像素显示，会变的非常粗。

#### 横向百分比+纵向高度固定

参考代码：

```html
<meta name='viewport' content='width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no'/>
<style>
    #header {
        /* 宽度默认不设置,就是100% */
        height: 45px;
        line-height: 45px;
        background-color: #00b38a;
        color: #fff;
        font-size: 1.8rem; /* 也可以根据媒体查询适当调整大小 */
        text-align: center;
        position: relative;
    }
</style>
<div id='haeder'></div>
```

#### 弹性盒子+高度固定布局

参考代码：

```html
<style>
    .container {
        height: 40px;
        display: flex;
        justify-content: space-between;
        line-height: 40px;
    }
</style>
<div class="container">
    <span class="info">10秒钟定制职位</span>
    <a href="#" class="go">去登陆</a>
</div>

```

> 某些场景下也需要固定像素的布局，比如：头像一般会用固定的宽高进行排版。 

### Viewport视口设置

#### 设置理想视口

```html
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
```

设置理想视口，使得布局视口（Layout Viewport）与视觉视口（Visual Viewport）一样大,DOM文档主宽度即为屏幕宽度。1个CSS像素(1px)由多少设备像素显示由具体设备而不同。

#### 动态设置视口缩放为`1/dpr`

对于安卓，所有设备缩放设为1，对于 iOS，根据 dpr 不同，设置其缩放为 dpr 倒数。设置页面缩放可以使得1个CSS像素（1px）由1个设备像素来显示，从而提高显示精度；因此，设置 `1/dpr` 的缩放视口，可以画出1px的边框。

不管页面中有没有设置 viewport，若无，则设置，若有，则改写，设置其 scale 为 `1/dpr`。

```js
(function (doc, win){
    const docEle = win.document.documentElement;
    const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    const metaEle = doc.querySelector('meta[name="viewport"]');
    let dpr = 0;
    const scale = 0;
    
    // 对iOS设备进行dpr的判断,对于Android系列,始终认为其dpr为1
    if (!dpr && !scale){
        const isAndroid = win.navigator.appVersion.match(/android/gi);
        const isIPhone = win.navigator.appVersion.match(/[iphone|ipad]/gi);
        const devicePixelRatio = win.devicePixelRatio;
        
        if (isIPhone){
            dpr = devicePixelRatio; 
        } else {
            dpr = 1;
        }
       
        scale = 1 / dpr;
    }
    
    // 设置data-dpr和viewport
    docEle.setArrtribute('data-dpr', dpr);
    // 动态改写meta:viewport标签
    if (!metaEle) {
        metaEle = doc.createElement('meta');
        metaEle.setAttribute('name', 'viewport');
        metaEle.setAttribute('content', 'width=device-width,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale + ',user-scalable=no');
        document.documentElement.firstElementChild.appendChild(metaEle)
    } else {
        metaEle.setAttribute('coutent', 'width=device-width,initial-scale=' + scale + ',minimum-scale=' + scale + ',user-scalable=no');
    }
})(document, window);
```
#### 像素单位的适配

```css
.p {
    font-size: 14px;
    
    [data-dpr="2"] & {
        font-size: 14px * 2;
    }
    
    [data-dpr="3"] & {
        font-size: 14px * 3;
    }
}
```

为写样式方便，可以借助 SASS 的 mixin 写代码片段

```scss
// 适配dpr的字体大小
@mixin font-dpr($font-size){
    font-size: $font-size
        
	[data-dpr="2"] & {
		font-size: $font-size * 2
	}
        
	[data-dpr="3"] & {
		font-size: $font-size * 3
	}
}
@mixin px-dpr($property, $px){
    #{$property}: $px;
    
    [data-dpr="2"] & {
        #{$property}: $px * 2;
    }
    
    [data-dpr="3"] & {
        #{$property}: $px * 3;
    }
}

// 使用
@include font-dpr(14px);
@include px-dpr(width, 40px); @include px-dpr(height, 40px)
```

#### 设置缩放视口和设置理想视口有什么不同

**问题：**viewport设为理想视口（`scale=1`），基本已经满足适配，为什么要动态设置 viewport 缩放？

**原因：**iPhone6为例，dpr为2，缩放设为0.5，则布局视口为750，缩放后显示刚好为视觉视口375，而总的 CSS 像素（逻辑像素）其实是750，与设备像素一致，这样1px的CSS像素，占用的物理像素也是1；而 viewport 设置缩放为1的理想视口情况下，布局视口为375，显示也刚好是屏幕宽度，然而1px的CSS像素，占用的物理像素是2。这样说来，这样设置可以实现1px的线条在二倍屏的显示。因为： **CSS像素与设备像素的关系依赖于屏幕缩放。**  

**验证：**设备：iPhone6,  在 `scale=0.5` 时，1px边框显示效果；在 `scale=1.0` 时，1px边框显示效果；在 `scale=0.5` 时，2px边框显示效果；通过对比后发现，在 `scale=0.5` 时，1px的线比 `scale=1.0` 要细，这也就解决了1px线条的显示问题。

 ### REM布局方式

> 定义：font size of the root element

这个单位的定义和 `em` 类似，不同的是 `em` 是相对于父元素，而 `rem` 是相对于根元素。`rem` 定义是根元素的`font-size`，以 `rem` 为单位，其数值与px的关系，需相对于根元素 `<html>` 的 font-size 计算，比如，设置根元素 `font-size=16px`，则表示`1rem=16px`。关于 `rem` 更多的解读，建议可以阅读本文末附的腾讯一团队的文章《Web App变革之rem》。

根据这个特点，可以根据设备宽度动态设置根元素的 `font-size`，使得以 `rem` 为单位的元素在不同终端上以相对一致的视觉效果呈现。

选取一个设备宽度作为基准，设置其根元素大小，其他设备根据此比例计算其根元素大小。比如使得 iPhone6 根元素 `font-size=16px`。

| 设备         | 设备宽度 | 根元素font-size/px | 宽度/rem |
| ------------ | -------- | ------------------ | -------- |
| iPhone5      | 320      | JavaScript计算所得 | --       |
| iPhone6      | 375      | 16                 | 23.4375  |
| iPhone6 Plus | 414      | JavaScript计算所得 | --       |
| --           | 360      | JavaScript计算所得 | --       |

> 根元素 fontSize 公式：`width/fontSize=baseWidth/baseFontSize`
>
> 其中，`baseWidth/baseFontSize` 是选为基准的设备宽度及其根元素大小，`width/fontSize` 为所求设备的宽度及其根元素大小。

缺点：

- 某些 Android 机型会丢失 `rem` 小数部分
- 占用了 `rem` 单位
- 不是纯 CSS 方案

#### 动态设置根元素`fontSize`

以下这段代码是用于根据移动端设备的屏幕分辨率计算出合适的根元素的大小。

当设备宽度为375（iPhone6）时，根元素 `font-size=16px;` 依次增大。

限制当为设备宽度大于768（iPad）之后，`font-size` 不再继续增大。

`scale` 为 meta viewport 中的缩放大小。

```js
(function (doc, win){
	const docEle = win.document.documentElement;
    const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    
    // 设置根元素
    // 当设备宽度为375（iPhone6）时,根元素font-size=16px
    const refreshRem = function(){
        const clientWidth = win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;
        console.log(clientWidth);
        if (!clientWidth)return;
        let fontSize = 16 * clientWidth / 375;
        docEle.style.fontSize = fontSize + 'px';        
    }
    
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, refreshRem， false);
    doc.addEventListener('DOMContentLoaded', refreshRem, false);
    refreshRem();
    
})(document, window);
```

#### rem布局和字体的处理

在宽高中使用 rem 单位，是为了保证在不同宽度尺寸的设备中能够保证布局的等比例缩放。

首先，字体尺寸使用 rem 而非 px 的原因是，换算之后出现比较怪异的数值，尤为明显的是小数位，比如 `13.777px` 之类的数值。在浏览器中，不同浏览器队小数点的计算存在偏差，而且有些带小数点的 `font-size` 值在待定的浏览器显示并不够清晰。

其次，我们并不希望在小屏幕下面显示跟大屏幕同等量的字体。并且如果使用 rem 的话，那么由于等比例的存在，在小屏幕下就会存在小屏幕字体更小的情况，不利于我们更好的去阅读，违背了适配的初衷。所以，对于字体的适配，更好的做法就是使用 px 和媒体查询来进行适配。

由于 Retina 屏幕下 dpr 的不同，我们又想显示的字体一样大，于是就给字体再增大 dpr 的倍数，这样当缩小 dpr 倍的时候，那么字体也就和设计稿所示的大小一样大了，在不同的手机中显示的大小也是一致的。

### 手淘的实现方案



讨论方案之前，需要先了解三个关键概念：

- 单位英寸像素数（Pixel Per Inch，PPI）：现实世界的一英寸内像素数，决定了屏幕的显示质量
- 设备像素比率（Device Pixel Ratio，DPR）：物理像素与逻辑像素（px）的对应关系
- 分辨率（Resolution）：屏幕区域的宽高所占像素数

#### 场景一：分辨率适配

当遇到需要设置 Banner 这种固定比例，但是需要解决不同屏幕下显示尺寸的问题。

在这个场景中，我们主要需要面对的是分辨率适配问题，考虑到多数网页都是纵向滚动的，在不同的屏幕尺寸下，Banner 的行为应该是**总是铺满屏幕宽度**以及**总是保持宽高比**。

最自然的思路是使用百分比宽度，但是假如使用百分比宽度，即 `width: 100%`，我们又有两种思路来实现固定宽高比。

- 方案一：利用 `<img>` 标签的特性，只设宽度等图片加载完，这种方法会导致大量的重排，并且非固定高度会导致懒加载等功能难以实现，所以果断放弃；
- 方案二：使用 `before` 伪元素的 `margin` 撑开高度，这种方法是比较干净的纯 CSS 实现，但是不具备任何复用性而且要求特定 HTML 结构，所以也只好放弃。

于是，剩下最合适的办法是使用其他相对单位，本来最合适的单位是 `vw`，它的含义是视口宽度，但是这个单位存在严重的兼容性问题，所以也只好放弃。

最合适的实现方案是选用 `rem`，动态为 `<html>` 设置一个跟屏幕宽度成正比的 `font-size`，然后把元素宽高都用 `rem` 作为单位。

已知问题：

- 某些 Android 机型会丢失 `rem` 小数部分
- 占用了 `rem` 单位
- 不是纯 CSS 方案

#### 场景二：PPI适配

网站页面中文字适配方案：

- 在不同分辨率的 Retina 屏下，期望文字尺寸是相同的

- 在绝大多数的字体文件，是自带一些点阵尺寸的，通常是16px和24px，所以我们**不希望出现13px、15px这样的奇葩尺寸**。

从该特征可得知，场景一种的 `rem` 方案，不适合用于段落文字上。所以段落文字应该使用 `px` 作为单位，考虑到 Retina 屏，我们利用媒体查询（Media Query）来指定不同的字体，考虑到 dpr 判定的兼容性，我们使用宽度替换来代替。

```scss
.a {
    font-size: 12px;
}
@media(min-width: 401px){
    .a {
        font-size: 24px;
    }
}
```

另一种场景，一些标题性文字，希望随着屏幕宽而增大的，我们可以仍然使用rem作为单位。超过35px（个人直观感受）的文字，已经不用太考虑点阵信息了，靠字体的矢量信息也能渲染的很好。

#### 场景三：DPR匹配

一个区块，设计稿上有1像素边框，当你面对不同的屏幕时你希望它的行为是怎样的？

这个场景，需求很简单，设计师**希望在任何屏幕上这条线都是1物理像素**。

好吧，当然这个问题的答案不是写1px那么简单。在 Retina 屏下面，如果你写了这样的 `<meta>`。

```html
<meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
```

你将永远无法写出1px宽度的东西，除此之外，`inline` 的 SVG 等元素，也会按照逻辑像素来渲染，整个页面的清晰度会打折。

 手淘采用JS动态写入 `<meta>` 标签：

```js
const metaEle = doc.createElement('meta');
const scale = isRetina ? 0.5 : 1;

metaEl.setAttribute('name', 'viewport');
metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');

if (docEl.firstElementChild) {
    document.documentElement.firstElementChild.appendChild(metaEl);
} else {
    var wrap = doc.createElement('div');
    wrap.appendChild(metaEl);
    documen.write(wrap.innerHTML);
}
```

#### px转rem的mixin

```scss
// 使用sass的混合宏
// 淘宝手淘的方案里，iPhone6(375pt)屏幕宽度为10rem，即font-size=75px, scale=0.5 因设计图为二倍图，$base-font-size=75px
@mixin px2rem($property, $px-values, $baseline-px:16px, $support-for-ie:false){
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

#### 手淘flexible设计与实现总结

方案关键点：

- 动态改写 `<meta  name="viewport">` 标签
- 给 `<html>` 元素添加 `data-dpr` 属性，并且动态改写 `data-dpr` 的值
- 给 `<html>` 元素添加 `font-size` 属性，并且动态改写 `font-size` 的值

通过一段 JavaScript 代码根据设备的屏幕宽度、dpr设置根元素的 `data-dpr` 和 `font-size`，这段 JavaScript 代码要在所有资源加载之前执行，建议做内联处理。

总的来说，手机淘宝的 flexible 方案是综合运用 `rem` 和 `px` 两种单位+ JS 设置 `scale` 和 `html` 字体。

<https://github.com/amfe/lib.flexible>

### 总结

- 适配不同屏幕宽度以及不同dpr，通过动态设置 `viewport(scale=1/dpr) + 根元素fontSize + rem`，辅助使用 `vw/vh` 等来达到适合的显示；
- 若无需适配可显示1px线条，也可以不动态设置 `scale`，只使用动态设置根元素 `fontSize + rem + 理想视口`；
- 当视口缩放，计算所得的根元素 fontSize 也会跟着缩放，即若理想视口（`scale=1`）， iPhone6 根元素`fontSize=16px`；若 `scale=0.5`，iPhone6根元素 `fontSize=32px`；因此不必担心 `rem` 的计算；
- !!CSS单位：以前我认为这样比较好：适配元素 `rem` 为单位，正文字体及边距宜用 `px` 为单位；现在认为**全部用 `rem` 即可，包括字体大小，不用 `px`**；
- `px` 为单位的元素，需根据 dpr 有不同的大小，如大小 `12px`，`dpr=2` 则采用24px, 使用 SASS mixin 简化写法；
- 配合 SASS 函数，简化 `px2rem` 转换，且易于维护（若需修改 `$base-font-size`，无需手动重新计算所有rem单位）；
- `px2rem` 函数的 `$base-font-size` 只跟根元素 `font-size` 的基准（此文中是`fontSize=16px when 375`）以及设计图的大小有关，按此基准，若设计图为 iPhone6 二倍稿，则 `$base-font-size=32px`，参数传值直接为设计图标注尺寸；
- 使用 iPhone6（375pt）二倍设计图：宽度750px；
- 切图使用三倍精度图，以适应三倍屏（这个目前我还没有实际应用过）

---

参考资料：

- [WebAPP变革之rem](http://www.cocoachina.com/webapp/20141224/10746.html)
- [手机淘宝的flexible设计与实现](http://www.html-js.com/article/2402)
- [淘宝无限适配移动端REM布局详解](https://www.cnblogs.com/well-nice/p/5509589.html)