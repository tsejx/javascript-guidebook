# History对象

`history` 对象保存着用history对象保存着用户上网的历史记录，从窗口被打开的那一刻算起。由于安全方面的考虑，开发人员无法得到用户浏览器的URL，但借由用户访问过的页面列表，可以在不知道实际URL的情况下实现后退和前进。本文将详细介绍BOM中的 `history` 对象户上网的历史记录，从窗口被打开的那一刻算起。由于安全方面的考虑，开发人员无法得到用户浏览器的URL，但借由用户访问过的页面列表，可以在不知道实际URL的情况下实现后退和前进。

## 属性

### history.length

`history.length` 属性保存着历史记录的URL数量。初始时，该值为1。如果当前窗口先后访问了三个网址，`history.length` 属性等于3

　　由于IE10+浏览器在初始时返回2，存在兼容性问题，所以该值并不常用

```javascript
history.length // 初始时，该值为1
history.length // 访问三个网址后，该值为3
```

## 跳转方法

`history` 对象提供了一系列的方法，允许在浏览历史之间跳转，包括 `go()`、`back()`、`forwar()`

### history.go()

使用go()方法可以在用户的历史记录中任意跳转。这个方法接收一个参数，表示向后或向前跳转的页面数的一个整数值。负数表示向后跳转(类似于后退按钮)，正数表示向前跳转(类似于前进按钮)

```javascript
// 后退一页
history.go(-1)
// 前进一页
history.go(1);
// 前进两页
history.go(2);
```

　　`go()` 方法无参数时，相当于 `history.go(0)`，可以刷新当前页面

```javascript
// 刷新当前页面
history.go();
// 刷新当前页面
history.go(0);
```

### history.back()

`history.back()` 方法用于模仿浏览器的后腿按钮，相当于 `history.go(-1)`

### history.forward()

`forward()` 方法用于模仿浏览器的前进按钮，相当于 `history.go(1)`

```javascript
// 后退一页
history.back()
// 前进一页
history.forward()
```

　　如果移动的位置超出了访问历史的边界，以上三个方法并不报错，而是静默失败 

　　[注意]使用历史记录时，页面通常从浏览器缓存之中加载，而不是重新要求服务器发送新的网页

## 增改记录

HTML5为 `history` 对象添加了两个新方法，`history.pushState()` 和 `history.replaceState()`，用来在浏览历史中添加和修改记录。`state` 属性用来保存记录对象，而 `popstate` 事件用来监听 `history` 对象的变化

　　[注意]IE9-浏览器不支持
　　
### history.pushState

> `history.pushState(state, title, url)`

**参数**

 - **`state object`**
    - 状态对象是一个由 `pushState()`方法创建的、与历史纪录相关的Javascript对象。当用户定向到一个新的状态时，会触发 `popstate` 事件。事件的 `state` 属性包含了历史纪录的 `state` 对象。如果不需要这个对象，此处可以填 `null`
 - **`title`**
    - 新页面的标题，但是所有浏览器目前都忽略这个值，因此这里可以填 `null`
 - **`URL`**
    - 这个参数提供了新历史纪录的地址。新URL必须和当前URL在同一个域，否则，`pushState()`将丢出异常。这个参数可选，如果它没有被特别标注，会被设置为文档的当前URL
    
　假定当前网址是 `example.com/1.html`，使用 `pushState` 方法在浏览记录( `history` 对象)中添加一个新记录

```javascript
var stateObj = { foo: 'bar' };
history.pushState(stateObj, 'page 2', '2.html');
```

　　添加上面这个新记录后，浏览器地址栏立刻显示 `example.com/2.html`，但并不会跳转到 `2.html`，甚至也不会检查 `2.html` 是否存在，它只是成为浏览历史中的最新记录。假如这时访问了 `google.com`，然后点击了倒退按钮，页面的url将显示 `2.html`，但是内容还是原来的 `1.html`。再点击一次倒退按钮，url将显示 `1.html`，内容不变

　　**总之，`pushState` 方法不会触发页面刷新，只是导致 `history` 对象发生变化，地址栏的显示地址发生变化**

　　如果 `pushState` 的url参数，设置了一个新的锚点值(即 `hash` )，并不会触发 `hashchange` 事件，即使新的URL和旧的只在 `hash` 上有区别

　　如果设置了一个跨域网址，则会报错。这样设计的目的是，防止恶意代码让用户以为他们是在另一个网站上

```javascript
// 报错
history.pushState(null, null, 'https://twitter.com/hello');
```

### history.replaceState()

　`history.replaceState` 方法的参数与 `pushState` 方法一模一样，不同之处在于 `replaceState()` 方法会修改当前历史记录条目而并非创建新的条目。

　　假定当前网页是 `example.com/example.html`

```javascript
history.pushState({page: 1}, 'title 1', '?page=1');
history.pushState({page: 2}, 'title 2', '?page=2');
history.replaceState({page: 3}, 'title 3', '?page=3');

history.back()
// url显示为http://example.com/example.html?page=1

history.back()
// url显示为http://example.com/example.html

history.go(2)
// url显示为http://example.com/example.html?page=3
```

### history.state

history.state属性返回当前页面的state对象

```javascript
history.pushState({page: 1}, 'title 1', '?page=1');

history.state// { page: 1 }
```

### popstate事件

　　每当同一个文档的浏览历史(即 `history` 对象)出现变化时，就会触发 `popstate` 事件

　　需要注意的是，仅仅调用 `pushState` 方法或 `replaceState` 方法，并不会触发该事件，只有用户点击浏览器倒退按钮和前进按钮，或者使用Javascript调用 `back()`、`forward()`、`go()`方法时才会触发。另外，该事件只针对同一个文档，如果浏览历史的切换，导致加载不同的文档，该事件也不会触发。

　　使用的时候，可以为popstate事件指定回调函数。这个回调函数的参数是一个 `event` 事件对象，它的 `state` 属性指向 `pushState` 和 `replaceState` 方法为当前URL所提供的状态对象(即这两个方法的第一个参数)。

```javascript
window.onpopstate = function (event) {
  console.log('location: ' + document.location);
  console.log('state: ' + JSON.stringify(event.state));
};
```

　　上面代码中的 `event.state`，就是通过 `pushState` 和 `replaceState` 方法，为当前URL绑定的 `state` 对象

　　这个state对象也可以直接通过 `history` 对象读取

```javascript
var currentState = history.state;
```

## 往返缓存

默认情况下，浏览器会在当前会话(session)缓存页面，当用户点击“前进”或“后退”按钮时，浏览器就会从缓存中加载页面。

　　浏览器有一个特性叫**“往返缓存”(back-forward cache或bfcache)**，可以在用户使用浏览器的“后退”和“前进”按钮时加快页面的转换速度。这个缓存中不仅保存着页面数据，还保存了DOM和Javascript的状态；实际上是将整个页面都保存在了内存里。如果页面位于 bfcache 中，那么再次打开该页面时就不会触发load事件

　　[注意]IE10-浏览器不支持

### pageshow

　　`pageshow` 事件在页面加载时触发，包括第一次加载和从缓存加载两种情况。如果要指定页面每次加载(不管是不是从浏览器缓存)时都运行的代码，可以放在这个事件的监听函数。

　　第一次加载时，它的触发顺序排在load事件后面。从缓存加载时，load事件不会触发，因为网页在缓存中的样子通常是load事件的监听函数运行后的样子，所以不必重复执行。同理，如果是从缓存中加载页面，网页内初始化的JavaScript脚本(比如DOMContentLoaded事件的监听函数)也不会执行。

　　[注意]虽然这个事件的目标是 `document`，但必须将其事件处理程序添加到 `window`。

　　`pageshow` 事件有一个 `persisted` 属性，返回一个布尔值。页面第一次加载时或没有从缓存加载时，这个属性是 `false`；当页面从缓存加载时，这个属性是 `true`。

```javascript
(function(){
    var showCount = 0;
    window.onload = function(){
        console.log('loaded');
    }
    window.onpageshow = function(e){
        e = e || event;
        showCount ++;
        console.log(e.persisted,showCount + 'times');
    }
})();
```

　　[注意]上面的例子使用了私有作用域，以防止变量showCount进入全局作用域。如果单击了浏览器的“刷新”按钮，那么showCount的值就会被重置为0，因为页面已经完全重新加载了

### pagehide

　　与 `pageshow` 事件对应的是 `pagehide` 事件，该事件会在浏览器卸载页面的时候触发，而且是在 `unload` 事件之前触发。与 `pageshow` 事件一样，`pagehide` 在 `document` 上面触发，但其事件处理程序必须要添加到window对象

　　[注意]指定了 `onunload` 事件处理程序的页面会被自动排除在 `bfcache` 之外，即使事件处理程序是空的。原因在于，`onunload` 最常用于撤销在 `onload` 中所执行的操作，而跳过 `onload` 后再次显示页面很可能就会导致页面不正常

　　`pagehide` 事件的 `event` 对象也包含 `persisted` 属性，不过其用途稍有不同。如果页面是从 bfcache 中加载的，那么 `persisted` 的值就是 `true`；如果页面在卸载之后会被保存在 bfcache 中，那么 `persisted` 的值也会被设置为 `true`。因此，当第一次触发 `pageshow` 时，`persisted` 的值一定是 `false`，而在第一次触发 `pagehide`  时，`persisted` 就会变成 `true` (除非页面不会被保存在 bfcache 中)

```javascript
window.onpagehide = function(e){
    e = e || event;
    console.log(e.persisted);
}
```