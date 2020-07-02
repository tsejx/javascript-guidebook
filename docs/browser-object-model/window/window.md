---
nav:
  title: BOM
  order: 5
group:
  title: 全局对象
  order: 1
title: Window 对象
order: 1
---

# Window 对象

window 对象有一系列的属性，这些属性本身也是对象。

## Window 对象的属性

| 属性                        | 含义                                                         |
| --------------------------- | ------------------------------------------------------------ |
| applicationCache（只读）    | 返回该 window 中的应用缓存对象的一个引用。                   |
| caches（只读）              | 返回了与当前上下文紧密相关的 CacheStorage 对象。             |
| ❗️closed（只读）             | 指示引用窗口关闭或没有。                                     |
| ❗️console                    | window.console 提供了向浏览器控制台输出日志信息的方法（log、info、warn、error等）。 |
| crypto                      | window.crypto 只读属性返回与全局对象关联的 Crypto 对象。 此对象允许网页访问某些加密相关服务。 |
| customElements              | 返回一个 CustomElementRegistry 对象的引用，可以用于注册一个新的 custom elements，并且可以用于获取之前定义过的自定义元素的信息。 |
| ❗️devicePixelRatio           | 此属性返回当前显示设备的物理像素分辨率与 CSS 像素分辨率的比值。 |
| document                    | 指向当前窗口内的文档节点。                                   |
| ❗️frameElement               | 返回嵌入当前 window 对象的元素（比如 `<iframe>` 或者 `<object>` ），如果当前 window 对象已经是顶层窗口，则返回 null。 |
| frames                      | 返回当前窗口，一个类数组对象，列出了当前窗口的所有直接子窗口。 |
| ❗️fullScreen                 | 这个属性表明了窗口是否处于全屏模式下。f11全屏切换。          |
| ❗️history（只读）            | 用来获取History对象的引用，History对象提供了操作浏览器会话历史（浏览器地址栏中访问的页面，以及当前页面中通过框架加载的页面）的接口。 |
| ❗️indexDB（只读）            | indexedDB 是 window的一个只读属性，它集成了为应用程序提供异步访问索引数据库的功能的机制。 |
| ❗️innerHeight（只读）        | 浏览器窗口的视口（viewport）高度（以像素为单位），如果存在滚动条，则包括它。 |
| ❗️innerWidth（只读）         | 浏览器视口（viewport）宽度（单位：像素），如果存在滚动条则包括它。 |
| isSecureContext（只读）     | 判断上下文是否能够使用安全上下文的特征的只读属性。           |
| length（只读）              | 返回当前窗口中包含的框架数量（框架包括 frame 和 iframe 两种元素）。 |
| ❗️localStorage               | 只读的 localStorage 允许你访问一个 Document 的远端（origin）对象 Storage。数据存储为跨浏览器会话。 |
| ❗️location（只读）           | 返回一个 Location 对象，其中包含有关文档当前位置的信息。     |
| locationbar                 | 返回一个可以检查 visibility 属性的 locationbar 对象。        |
| personalbar                 | personalbar 属性本身也是一个对象，用于访问其自身的 visible 属性来确定个人栏是否可见。 |
| menubar                     | 返回一个可以检测 visibility 属性的 menubar 对象。            |
| messageManager              | 返回这个窗口的消息管理器对象。                               |
| ❗️name                       | 获取/设置窗口的名称。                                        |
| ❗️navigator                  | 返回一个 Navigator 对象的引用,可以用它来查询一些关于运行当前脚本的应用程序的相关信息。 |
| onabort                     | 一个处理发送到 Window 中断事件的事件处理。                   |
| onbeforeprint               | 打印之前的处理函数。                                         |
| onafterprint                | 打印之后的处理函数。                                         |
| ❗️onanimationcancel          | animationcancel 是一个事件处理操作，这个事件在 CSS Animation 属性意外中断时派发出来。 |
| ❗️onanimationend             | 当 CSS 动画到达其活动期的结束时发送此事件。                  |
| ❗️onanimationiteration       | 当动画迭代时触发。                                           |
| ❗️onappinstalled             | Window 对象的 onappinstalled 属性用于处理 appinstalled 事件处理程序。 PWA 成功安装时被触发一次。 |
| onbeforeinstallprompt       | Window.onbeforeinstallprompt 属性是一个事件处理程序，用于处理一个beforeinstallprompt，当一个Web清单存在时，它将在移动设备上发送，但是在提示用户将网站保存到主屏幕之前。 |
| onbeforeunload              | 当窗口即将被卸载（关闭）时，会触发该事件。此时页面文档依然可见，且该事件的默认动作可以被取消。 |
| onclose                     | 当在 Window 对象上触发 close 事件时的事件处理器。            |
| oncontextmenu               | 获取或设置当前窗口 Contextmenu 事件的事件处理函数。除非默认行为已经阻止了，否则右键菜单会被激活。 |
| ondevicelight               | 事件在设备的光传感器检测到周围环境光的强度发生变化时触发。   |
| ondevicemotion              | 设配移动时触发。                                             |
| ondeviceorientation         | 设备方向改变时触发。                                         |
| ondeviceorientationabsolute |                                                              |
| ondeviceproximity           | 接近或远离设备时触发。                                       |
| onerror                     | 加载一个全局的 error 事件处理函数可用于自动收集错误报告。    |
| ongamepadconnected          | 手柄连接时触发。                                             |
| ongamepaddisconnected       | 手柄断开时触发。                                             |
| ongotpointercapture         | gotpointercapture 事件类型触发。                             |
| onlostpointercapture        | gotpointercapture 事件类型触发。                             |
| ❗️onhashchange               | 当 一个窗口的哈希改变时就会触发 hashchange 事件（查看 location.hash） |
| onlanguagechange            | 这样的事件在浏览器通知更佳的语言列表已被更新后被触发。       |
| onloadstart                 | 在 onload 之前触发。                                         |
| ❗️onload                     | 当资源已加载时被触发。                                       |
| onloadend                   | onloadend 属性表示当代码被调用时优先级提高，资源的加载事件触发时调用处理函数。 |
| onunload                    | 当页面关闭后，会触发 unload 事件。                           |
| onmessage                   | onmessage 属性是当对象接收到 message 事件时被调用。          |
| onmessageerror              | 一个 messageerror 事件发送给 window。                        |
| onpopstate                  | Window.onpopstate 是 popstate 事件在 Window 对象上的事件处理程序。 |
| onrejectionhandled          | Promise 拒绝时触发。                                         |
| onreset                     | 当收到一个 reset 事件时触发。                                |
| ❗️onresize                   | 可以用来获取或设置当前窗口的 resize 事件的事件处理函数。     |
| onselect                    | onselect 用来获取或设置当前窗口的 select 事件的事件处理函数。 |
| ❗️onstorage                  | 当存储域发生改变时会触发事件。                               |
| ❗️opener                     | 如果当前窗口是由另一个窗口打开的，Window.opener 保留了那个窗口的引用. 如果当前窗口不是由其他窗口打开的, 则该属性返回 null。 |
| ❗️origin（只读）             | 返回全局范围的 origin，序列化为一个字符串。域的概念。        |
| ❗️outerHeight（只读）        | 为窗口的外层的高度（包括导航栏+状态栏等）。                  |
| ❗️outerWidth                 | 是窗口的外层的宽度。                                         |
| ❗️parent                     | 返回当前窗口的父窗口对象。如果一个窗口没有父窗口，则它的 parent 属性为自身的引用。 |
| performance                 | Web Performance API 允许网页访问某些函数来测量网页和 Web 应用程序的性能，包括 Navigation TimingAPI 和高分辨率时间数据。 |
| ❗️screen                     | 返回当前 window 的 screen 对象。screen 对象实现了 Screen 接口，它是个特殊的对象，返回当前渲染窗口中和屏幕有关的属性。 |
| ❗️screenX                    | 返回浏览器左边界到操作系统桌面左边界的水平距离。             |
| ❗️screenY                    | 返回浏览器顶部距离系统桌面顶部的垂直距离。                   |
| scrollbars                  | 返回滚动条对象，可以检查其可见性。                           |
| scrollMaxX                  | 返回水平最大可以 scroll 的长度，单位像素。                   |
| scrollMaxY                  | 返回垂直最大可以 scroll 的长度，单位像素。                   |
| ❗️scrollX                    | 返回文档/页面水平方向滚动的像素值。                          |
| ❗️scrollY                    | 返回文档/页面垂直方向滚动的像素值。                          |
| ❗️self                       | 返回一个指向当前 window 对象的引用。                         |
| ❗️sessionStorage             | sessionStorage 属性允许你访问一个 session Storage对象。      |
| speechSynthesis             | 返回一个 speechSynthesis 对象。                              |
| status                      | 设置浏览器底部状态栏的文本。                                 |
| statusbar                   | 返回一个 statusbar 对象。                                    |
| toolbar                     | 返回一个 toolbar 对象。                                      |
| ❗️top                        | 返回窗口体系中的最顶层窗口的引用。                           |
| URL                         | window.URL 属性返回一个对象，它提供了用于创建和管理对象URLs的静态方法。 |
| visualViewport              | 返回视觉窗口对象。                                           |
| ❗️PushManager                | 提供接收服务器及请求 url 的推送功能的一些方法。PWA 推功能    |
| window                      | window 对象的 window 属性指向这个 window 对象本身。          |

## Window 对象的方法

| 方法                                                | 功能                                                         |
| --------------------------------------------------- | ------------------------------------------------------------ |
| ❗️`alert(message)`                                    | 浏览自带的警告对话框。                                       |
| `btoa(str)`                                           | 从 String 对象中创建一个 base-64 编码的 ASCII 字符串，其中字符串中的每个字符都被视为一个二进制数据字节。 |
| `atob(code)`                                          | 对用 base-64 编码过的字符串进行解码。                        |
| `blur()`                                              | 将焦点移出顶层窗口。                                         |
| ❗️`requestAnimationFrame(callBack)`                    | 告诉浏览器您希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画。 |
| ❗️`cancelAnimationFrame(requestID)`                    | 取消一个先前通过调用 `window.requestAnimationFrame()` 方法添加到计划中的动画帧请求。 |
| `requestIdleCallback(callback[, options])`            | `window.requestIdleCallback()` 会在浏览器空闲时期依次调用函数， 这就可以让开发者在主事件循环中执行后台或低优先级的任务，而且不会对像动画和用户交互这样延迟触发而且关键的事件产生影响。 |
| `cancelIdleCallback(handle)`                          | window.cancelIdleCallback() 方法用于取消之前调用window.requestIdleCallback() 的回调。 |
| `setImmediate(func)`                                  | 该方法用来把一些需要长时间运行的操作放在一个回调函数里，在浏览器完成后面的其他语句后,就立刻执行这个回调函数。 |
| `clearImmediate(immediateID)`                         | 此方法用来清除 `window.setImmediate`。                       |
| ❗️`setInterval(callBack, delay)`                       | 重复调用一个函数或执行一个代码段，在每次调用之间具有固定的时间延迟。 |
| ❗️`clearInterval(intervalID)`                          | 取消用 setInterval 设置的重复定时任务。                      |
| ❗️`setTimeout(code[, delay])`                          | delay 时间之后执行 code，code 可为 string 或 function。      |
| ❗️`clearTimeout(timeoutID)`                            | 清除由 window.setTimeout() 设置的延时定时器。                |
| ❗️`close()`                                            | 关闭当前窗口。                                               |
| ❗️`confirm(message)`                                   | window.confirm() 方法显示一个具有一个可选消息和两个按钮(确定和取消)的模态对话框 。 |
| `createImageBitmap(image, sx, sy, sw, sh[, options])` | 接收图片源，并返回 ImageBitmap 的 Promise 对象。             |
| ❗️`event`                                              | IE 专用，表示正在处理的事件对象。                            |
| ❗️`fetch(input[, init])`                                | 用于发起获取资源的请求。它返回一个 Promise 对象。            |
| `focus()`                                             | 求将窗口显示在前（靠近屏幕），这可能由于用户设置而失败，并且该窗口在方法返回之前不能保证会显示在最前。 |
| `getAttention()`                                      | 试图获取用户的注意力。                                       |
| ❗️`getComputedStyle(element, [pseudoElt])`             | 给出应用活动样式表后的元素的所有 CSS 属性的值，并解析这些值可能包含的任何基本计算。 |
| `getSelection()`                                      | 返回一个  Selection 对象，表示用户选择的文本范围或光标的当前位置。 |
| `matchMedia(mediaQueryString)`                        | 返回一个新的 MediaQueryList 对象，表示指定的媒体查询字符串解析后的结果。 |
| `minimize()`                                          | 窗口最小化。                                                 |
| ❗️`moveBy(deltaX, deltaY)`                             | 根据指定的值，移动当前窗口。                                 |
| ❗️`moveTo(x, y)`                                       | 将当前窗口移动到指定的坐标位置。                             |
| ❗️`open(strUrl, windowName, [strWindowFeatures])`      | 根据指定的参数，将一个资源加载到一个新的浏览上下文（如一个窗口）或一个已经存在的浏览上下文中。 |
| ❗️`postMessage(message, targetOrigin, [transfer])`     | 可以安全地实现跨源通信。                                     |
| `print()`                                             | 打开打印对话框打印当前文档。                                 |
| ❗️`prompt(text, value)`                                | 显示一个对话框，对话框中包含一条文字信息，用来提示用户输入文字。 |
| ❗️`resizeBy(xDelta, yDelta)`                           | 调整窗口大小。                                               |
| ❗️`resizeTo(aWidth, aHeight)`                          | 动态调整窗口的大小。                                         |
| ❗️`scroll(x-coord, y-coord)`                           | 滚动窗口至文档中的特定位置。                                 |
| ❗️`scrollBy(X, Y)`                                     | 在窗口中按指定的距离滚动文档。                               |
| `scrollByLines(num)`                                  | 按给定的行数滚动文档。                                       |
| `scrollByPages(pages)`                                | 在当前文档页面按照指定的页数翻页。                           |
| ❗️`scrollTo(x-coord, y-coord)`                         | 滚动到文档中的某个坐标。                                     |
| `stop()`                                              | 此方法用于阻止页面资源加载。                                 |

## 全局作用域

由于 `window` 对象同时扮演着 ECMAScript 中 Global 对象的角色，因此所有在全局作用域中声明的变量、函数都会变成 `window` 对象的属性和方法。

抛开全局变量会成为 `window` 对象的属性不谈，定义全局变量与在 Window 对象上直接定义属性还是有一点差别：全局变量不能通过 `delete` 操作符删除，而直接在 `window` 对象上的定义的属性可以。

这是因为，通过 `var` 语句添加的 `window` 属性有一个名为 `[[Configurable]]` 的特性，这个特性的值被设置为 `false`，因此这样定义的属性不可以通过 `delete` 操作符删除。IE8 及更早版本在遇到 `delete` 删除 `window` 属性的语句时，不管该属性最初是如何创建的，都会抛出错误，以示警告。IE9 及更高版本不会抛出错误。

尝试访问未声明的变量会抛出错误，但是通过查询 `window` 对象，可以知道某个可能未声明的变量是否存在。