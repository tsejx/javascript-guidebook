---
nav:
  title: BOM
  order: 5
group:
  title: 集成 API
  order: 16
title: 全屏 Fullscreen API
order: 4
---

# 全屏 Fullscreen API

全屏 API 为使用用户的整个屏幕展现网络内容提供了一种简单的方式。这种 API 让你可以简单地控制浏览器，使得一个元素与其子元素，如果存在的话，可以占据整个屏幕，并在此期间，从屏幕上隐藏所有的浏览器用户界面以及其他应用。

## 激活全屏模式

通过 DOM 元素的 `requestFullScreen()` 方法可以激活全屏模式。

最常见的场景是视频窗口的全屏模式：

```html
<video id="_video" src="blob:https://wwww.example.com/"></video>
```

```js
const video = document.getElementById('_video');

video.addEventListener('click', function() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
  } else if (video.mozRequestFullscreen) {
    video.mozRequestFullscreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  }
});
```

### 显示差异

Gecko 和 Webkit 内核实现效果存在关键差异：

- Gecko 会自动为元素添加 CSS 规则，使其拉伸以填满屏幕 `width: 100%;height: 100%;`
- Webkit 没有这样做，相反地，它将全屏元素剧中，并以同样的大小显示，而屏幕的其他部分为黑色

为了在 Webkit 中获得相同的全屏行为，你需要自行元素添加 `width: 100%;height: 100%`

```css
#video:-webkit-full-screen {
  width: 100%;
  height: 100%;
}
```

另一个方面，如果你尝试在 Gecko 上模拟 Webkit 的行为，你需要把你想要呈现的元素放在另一个实际调整为全屏幕的元素中，并使用 CSS 规则调整内部元素，达到你想要的样式。

### 通知

当成功进入全屏模式时，包含该元素的文档会收到 `fullscreenchange` 事件。当退出全屏模式时，文档会再次收到该事件。注意此事件本身，不管在文档进入和退出全屏模式时，都不会提供任何信息，但如果文档有一个非空的 `fullscreenElement`，你就可以得知你处于全屏模式中。

## 退出全屏模式

通过调用 `document.exitFullscreen()` 方法能退出全屏模式。

## 其他信息

`document` 提供了一些额外的信息，在开发全屏网络应用时能够使用。

| 属性              | 说明                                                                         |
| ----------------- | ---------------------------------------------------------------------------- |
| fullscreenElement | 当前以全屏模式显示的元素。若此项非空，文档处于全屏模式中，否则不在该模式中。 |
| fullscreenEnabled | 当前文档是否为允许请求进入全屏模式的状态。                                   |

---

**参考资料：**

- [MDN：全屏 API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fullscreen_API)
