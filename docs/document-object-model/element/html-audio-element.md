---
nav:
  title: DOM
  order: 6
group:
  title: Element
  order: 6
title: HTMLAudioElement
order: 17
---

# HTMLAudioElement

```plain
EventTarget <- Node <- Element <- HTMLElement <- HTMLMediaElement <- HTMLAudioElment
```

HTML5 `<audio>` 元素用于在文档中嵌入音频内容。`<audio>` 元素可以包含一个或多个音频资源，这些音频资源可以使用 `src` 属性或者 `<source>` 元素来进行描述：浏览器将会选择最合适的一个来使用。也可以使用 MediaStream 将这个元素用于流式媒体。

## 基本用法

```html
<audio></audio>
```

## API

### 属性

| 属性          | 说明 |
| :------------ | :--- |
| `autoplay`    |      |
| `controls`    |      |
| `crossorigin` |      |
| `currentTime` |      |
| `duration`    |      |
| `loop`        |      |
| `muted`       |      |
| `preload`     |      |
| `src`         |      |

### 事件

| 事件             | 说明                                                                                                                               |
| :--------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `audioprocess`   |                                                                                                                                    |
| `canplay`        | 浏览器已经可以播放媒体，但是预测已加载的数据不足以在不暂停的情况下顺利将其播放到结尾（即预测会在播放时暂停以获取更多的缓冲区内容） |
| `canplaythrough` | 浏览器预测已经可以在不暂停的前提下将媒体播放到结束                                                                                 |
| `complete`       |                                                                                                                                    |
| `durationchange` | `duration` 属性发生了变化                                                                                                          |
| `emptied`        |                                                                                                                                    |
| `ended`          | 播放到媒体的结束位置，播放停止                                                                                                     |
| `loadeddata`     | 媒体的第一帧加载完成                                                                                                               |
| `loadedmetadata` | 元数据加载完成                                                                                                                     |
| `pause`          | 播放暂停                                                                                                                           |
| `play`           | 播放开始                                                                                                                           |
| `playing`        | 因为缺少数据而暂停或延迟的状态结束，播放准备开始                                                                                   |
| `ratechange`     | 播放速度变化                                                                                                                       |
| `seeked`         | 一次获取 操作结束                                                                                                                  |
| `seeking`        | 一次获取 操作开始                                                                                                                  |
| `stalled`        | 用户代理试图获取媒体数据，但数据意外地没有进入                                                                                     |
| `suspend`        |                                                                                                                                    |
| `timeupdate`     | 由 `currentTime` 指定的时间更新                                                                                                    |
| `volumechange`   | 音量变化                                                                                                                           |
| `waiting`        | 因为暂时性缺少数据，播放暂停                                                                                                       |

## 参考资料

- [📖 HTML Living Standard: HTMLAudioElement](https://html.spec.whatwg.org/multipage/media.html#htmlaudioelement)
- [📖 W3C: The Audio Element](https://www.w3.org/TR/2011/WD-html5-author-20110809/the-audio-element.html)
- [📖 W3cubDocs: HTMLAudioElmenet](https://docs.w3cub.com/dom/htmlaudioelement)
- [📖 TypeScript: Interface HTMLAudioElement](https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.htmlaudioelement.html)
- [HTML5 音频 API Web Audio](https://segmentfault.com/a/1190000010561222)
