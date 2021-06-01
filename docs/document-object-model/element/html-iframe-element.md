---
nav:
  title: DOM
  order: 6
group:
  title: Element
  order: 6
title: HTMLIFrameElement
order: 15
---

# HTMLIFrameElement

HTML 文档中的 `<iframe>` 元素

```html
<iframe src="https://blog.5udou.cn/"></iframe>
```

## 属性

| 属性            | 描述                                                                                                        |
| :-------------- | :---------------------------------------------------------------------------------------------------------- |
| src             | 嵌入网页内容的地址                                                                                          |
| srcdoc          | 网页要显示的内容                                                                                            |
| name            | 内嵌的浏览器内容的目标名称                                                                                  |
| sandbox         | 提供额外的限制                                                                                              |
| allow           | 指定特性策略                                                                                                |
| allowfullscreen | 是否允许全凭显示                                                                                            |
| width           | 内嵌网页的宽度                                                                                              |
| height          | 内嵌网页的高度                                                                                              |
| referrerpolicy  | 指定获取资源时携带的 `referer`，默认是 `no-referrer-when-downgrade`（也就是协议降级时不发送 Referrer 信息） |
| loading         |                                                                                                             |
| contentWindow   | 内嵌网页执行上下文的 `window` 对象                                                                          |
| contentDocument | 内嵌网页执行上下文的 `document` 对象                                                                        |

### 沙箱模式

`iframe` 的沙箱模式可以提供一些额外的配置，当你把 `iframe` 置为沙箱的时候，意味着沙箱内的内容的行为 **全凭你控制** 了。

例如在 `iframe` 中设置：

```html
<iframe sandbox src="http://127.0.0.1:3000/iframe1.html"></iframe>
```

框架文件将会被完全沙箱化，并有以下限制：

- JavaScript 将不会在框架文档中执行。这不仅包括通过 `script` 标签加载的 JavaScript 脚本文件，还包括内联事件处理程序和 `javascript: URLs`。这还意味着 `noscript` 标签中的内容会被显示，就像用户自己禁用了脚本一样
- 框架文档被加载到唯一的源，这意味着所有同源检查都将失败；唯一的源不匹配其他源，甚至它们自己。在其他影响中，这意味着文档不能访问其他源的 `cookie` 或任何其他存储机制（ DOM 存储、索引数据库等）中的数据
- 框架文档不能创建新窗口或对话框（例如，通过 `window.open` 或 `target="blank"`）
- 表单不能提交
- 插件不会被加载
- 框架文档只能导航自己，而不能导航其顶级父文档。设置 `window.top.location` 将抛出一个异常，点击带有 `target="_top"` 的链接将不起作用
- 自动触发的功能（自动聚焦的表单元素、自动播放视频等）将被阻止
- 无法获得 Pointer Lock
- 在框架文档包含的 `iframes` 上忽略 `seamless` 属性

文件被加载到一个完全沙箱化的 `iframe` 中，带来的风险非常小，但这是十分苛刻的。当然，这样做也没有太大的价值：对于一些静态内容，可以使用一个完整的沙箱，但大多数情况下，可以放宽松一些。

通过设置以下值控制：

- `allow-same-orign`：允许将内容作为普通来源对待，否则会被设为来自一个独立的源
- `allow-top-navigation`：允许包含文档导航内容
- `allow-forms`：允许表单提交
- `allow-scripts`：允许脚本执行
- `allow-modals`：允许模态窗口
- `allow-orientation-lock`：允许锁定父窗口屏幕方向
- `allow-pointer-lock`：允许使用指针锁 API
- `allow-popups`：允许弹出窗口
- `allow-popups-to-escape-sandbox`：允许弹出沙箱窗口
- `allow-presentation`：允许控制 Session
- `”“`：允许上述所有规则，默认

## 方法

### 导航方法

- reload 重新加载
- stop 停止加载
- getCanGoBack 是否可后退
- goBack 后退
- getCanGoForward 是否可前进
- goForward 前进

### 管理方法

- executeScript 指定加载完成后执行的脚本
- purgeHistroy 清理与浏览器有关的资源
- setVisible 修改浏览器 `iframe` 的可见性，这会影响资源分配和函数的资源占用率
- getVisible 指示当前浏览器 `iframe` 的可见性
- setActive 设置当前 `iframe` 为活动的 `frame`，对进程管理器如何划分优先级有影响
- getActive 指示当前浏览器 `iframe` 是否为当前活动的 `frame`
  setInputMethodActive 设置当前浏览器 `iframe` 是活动的输入法编辑器窗口而其他不适
  setNfcFocus

### 音频相关方法

- getVolume 当前音量
- setVolume 设置音量
- mute 播放所有音频静音
- unmute 取消播放发所有音频的静音
- getMuted 指示内嵌网页是否被静音

### 搜索方法

- findAll
- findNext
- clearMatch

### 事件相关方法

- sendMouseEvent
- sendTouchEvent
- addNextPaintListener
- removeNextPainListener

### 工具方法

- download
- getContentDimensions
- getManifest
- getScreenshot
- getStructuredData
- zoom

---

**参考资料：**

- [📖 HTML Living Standard](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#the-iframe-element)
- [📝 JavaScript 中的沙箱机制探秘](https://cloud.tencent.com/developer/article/1174904)
- [📝 如何使用内联框架元素 IFrames 的沙箱属性提高安全性](https://juejin.im/post/6844904191064801294)
