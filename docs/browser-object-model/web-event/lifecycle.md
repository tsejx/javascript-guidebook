# 页面生命周期方法

HTML 页面的生命周期包含四个重要事件：

| 事件             | 说明                                                                                          | 应用场景                                                             |
| :--------------- | :-------------------------------------------------------------------------------------------- | :------------------------------------------------------------------- |
| DOMContentLoaded | 浏览器已完全加载 HTML，并构建了 DOM 树，但诸如 `<img>` 和样式表之类的外部资源可能尚未加载完成 | DOM 已经就绪，因此处理程序可以查找 DOM 节点，并初始化接口            |
| load             | 浏览器不仅加载完成了 HTML，还加载完成了所有外部资源                                           | 外部资源已加载完成，样式已被应用，图片大小也已知了                   |
| beforeunload     | 当用户正在离开页面时触发                                                                      | 用户正在离开，我们可以检查用户是否保存了更改，并询问他是否真的要离开 |
| unload           | 当用户正在离开页面时触发                                                                      | 用户几乎已经离开了，但是我们仍然可以启动一些操作，例如发送统计数据   |

## readyState

Document.readyState 属性描述了 `document` 的加载状态。

- `loading`：正在加载状态，document 仍在加载中
- `interactive`：可交互状态，正在加载状态结束，但是诸如图像，样式表和框架之类的子资源仍在加载
- `complete`：完成状态，文档和所有子资源已完成加载，表示状态 `load` 状态的事件即将被触发

## readystatechange

`readystatechange` 事件是跟踪文档加载状态的另一种机制，会在状态发生改变时触发，因此我们可以打印所有这些状态：

```js
// 当前状态
console.log('document.readyState');

// 状态改变时打印到调试台中
document.addEventListener('readystatechange', () => console.log(document.readyState));
```

## DOMContentLoaded

DOMContentLoaded 事件发生在 `document` 对象上。

我们必须使用 addEventListener 来捕获它：

```js
document.addEventListener('DOMContentLoaded', () => {});
```

**示例：**

```html
<script type="text/javascript">
  function ready() {
    console.log('DOM is ready.');

    const img = document.querySelector('#img');

    // 图片目前尚未加载完成（除非已经被缓存），所以图片大小为 0x0
    console.log(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
  }

  document.addEventListener('DOMContentLoaded', ready);
</script>

<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0" />
```

示例中，`DOMContentLoaded` 处理程序在文档加载完成后触发，所以它可以查看所有元素，包括它下面的 `<img>` 元素。

> 如果我们将 `DOMContentLoaded` 事件处理程序设置在文档加载完成之后，会发生什么？

很自然地，它永远不会运行。在某些情况下，我们不确定文档是否已经准备就绪。我们希望我们的函数在 DOM 加载完成时执行，无论现在还是以后。

### 与脚本文件的关系

当浏览器处理一个 HTML 文档，并在文档中遇到 `<script>` 标签时，就会在继续构建 DOM 之前运行它。这是一种防范措施，因为脚本可能想要修改 DOM，甚至对其执行 `document.write` 操作，所以 `DOMContentLoaded` 必须等待脚本执行结束。

因此，DOMContentLoaded 肯定在下面的这些脚本执行结束之后发生：

```html
<script type="text/javascript">
  document.addEventListener('DOMContentLoaded', () => {
    alert('DOM ready!');
  });
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js"></script>

<script type="text/javascript">
  alert('Library loaded, inline script executed');
</script>
```

加载输出顺序：

1. `Library loaded...`
2. `DOM ready!`

不会阻塞 DOMContentLoaded 的脚本：

1. 具有 `async` 特性的脚本不会阻塞 `DOMContentLoaded`
2. 使用 `document.createElement('script')` 动态生成并添加到网页的脚本也不会阻塞 `DOMContentLoaded`

### 与样式文件的关系

外部样式表不会影响 DOM，因此 DOMContentLoaded 不会等待它们。

但这里有一个陷阱。如果在样式后面有一个脚本，那么该脚本必须等待样式表加载完成：

```html
<link type="text/css" rel="stylesheet" href="style.css" />
<script type="text/javascript">
  // 在样式表加载完成之前，脚本都不会执行
  alert(getComputedStyle(document.body).marginTop);
</script>
```

原因是，脚本可能想要获取元素的坐标和其他与样式相关的属性，如上例所示。因此，它必须等待样式加载完成。

当 `DOMContentLoaded` 等待脚本时，它现在也在等待脚本前面的样式。

### 浏览器内置的自动填充

Firefox，Chrome 和 Opera 都会在 `DOMContentLoaded` 中自动填充表单。

例如，如果页面有一个带有登录名和密码的表单，并且浏览器记住了这些值，那么在 `DOMContentLoaded` 上，浏览器会尝试自动填充它们（如果得到了用户允许）。

因此，如果 `DOMContentLoaded` 被需要加载很长时间的脚本延迟触发，那么自动填充也会等待。你可能在某些网站上看到过（如果你使用浏览器自动填充）—— 登录名/密码字段不会立即自动填充，而是在页面被完全加载前会延迟填充。这实际上是 `DOMContentLoaded` 事件之前的延迟。

## window.onload

当整个页面，包括样式、图片和其他资源被加载完成时，会触发 `window` 对象上的 `load` 事件。可以通过 `onload` 属性获取此事件。

下面的这个示例正确显示了图片大小，因为 `window.onload` 会等待所有图片加载完毕：

```html
<script type="text/javascript">
  window.onload = function () {
    alert('Page loaded');

    // 此时图片已经加载完成
    alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
  };
</script>

<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0" />
```

## window.onbeforeunload

如果访问者触发了离开页面的导航（navigation）或试图关闭窗口，`beforeunload` 处理程序将要求进行更多确认。

如果我们要取消事件，浏览器会询问用户是否确定。

你可以通过运行下面这段代码，然后重新加载页面来进行尝试：

```js
window.onbeforeunload = function () {
  return false;
};
```

由于历史原因，返回非空字符串也被视为取消事件。在以前，浏览器曾经将其显示为消息，但是根据 [现代规范](https://html.spec.whatwg.org/#unloading-documents) 所述，它们不应该这样。

这里有个例子：

```js
window.onbeforeunload = function () {
  return 'There are unsaved changes. Leave now?';
};
```

它的行为已经改变了，因为有些站长通过显示误导性和恶意信息滥用了此事件处理程序。所以，目前一些旧的浏览器可能仍将其显示为消息，但除此之外无法自定义显示给用户的消息。

## window.onunload

当访问者离开页面时，`window` 对象上的 `unload` 事件就会被触发。我们可以在那里做一些 **不涉及延迟** 的操作，例如关闭相关的弹出窗口。

有一个值得注意的特殊情况是发送分析数据。

假设我们收集有关页面使用情况的数据：鼠标点击、滚动、被查看的页面区域等。

自然地，当用户要离开的时候，我们希望通过 `unload` 事件将数据保存到我们的服务器上。

有一个特殊的 `navigator.sendBeacon(url, data)` 方法可以满足这种需求，详见规范 [https://w3c.github.io/beacon/](https://w3c.github.io/beacon/)。

它在后台发送数据，转换到另外一个页面不会有延迟：浏览器离开页面，但仍然在执行 sendBeacon。

使用方式如下：

```js
const analyticsData = {
  // 带有收集的数据的对象
};

window.addEventListener('unload', function() {
  navigator.sendBeacon('/analytics', JSON.stringify(analyticsData));
};
```

- 请求以 POST 方式发送
- 我们不仅能发送字符串，还能发送表单以及其他格式的数据，在 Fetch 一章有详细讲解，但通常它是一个字符串化的对象
- 数据大小限制在 64kb

当 `sendBeacon` 请求完成时，浏览器可能已经离开了文档，所以就无法获取服务器响应（对于分析数据来说通常为空）

还有一个 `keep-alive` 标志，该标志用于在 `fetch` 方法中为通用的网络请求执行此类 **离开页面后** 的请求。你可以在 Fetch API 一章中找到更多相关信息。

如果我们要取消跳转到另一页面的操作，在这里做不到。但是我们可以使用另一个事件 `onbeforeunload`。

## 总结

文档加载的生命周期：

1. 文档加载中状态 document.raedyState -> loading
2. 可交互状态 readystatechange -> `document.readyState = interactive`
3. DOMContentLoaded
4. iframe onload
5. img onload
6. 文档加载完成状态 document.readyState -> complete
7. window.onload

在 `DOMContentLoaded` 之前，`document.readyState` 会立即变成 `interactive`。它们俩的意义实际上是相同的。

当所有资源（`iframe` 和 `img`）都加载完成后，`document.readyState` 变成 `complete`。这里我们可以发现，它与 `img.onload`（`img` 是最后一个资源）和 `window.onload` 几乎同时发生。转换到 `complete` 状态的意义与 `window.onload` 相同。区别在于 `window.onload` 始终在所有其他 `load` 处理程序之后运行。
