---
nav:
  title: DOM
  order: 6
group:
  title: Element
  order: 6
title: HTMLMediaElement
order: 16
---

# HTMLMediaElement

HTML 媒体元素接口在属性和方法中添加了 HTML 元素来支持基础的媒体相关的能力，就像 `audio` 和 `video` 一样。HTML 视频元素和 HTML 音频元素元素都继承自此接口。

```plain
EventTarget <- Node <- Element <- HTMLElement <- HTMLMediaElement
```

## 特性

从父级 [HTMLElement]()、[Element]()、[Node]() 和 [EventTarget]() 继承属性。

| 名称                | 类型               | 说明                                                   |
| :------------------ | :----------------- | :----------------------------------------------------- |
| audioTracks         | [AudioTrackList]() |                                                        |
| autoplay            | Boolean            |                                                        |
| buffered            | [TimeRanges]()     |                                                        |
| controller          | MediaController    |                                                        |
| controls            | Boolean            |                                                        |
| crossOrigin         | DOMString          |                                                        |
| currentSrc          | DOMString          |                                                        |
| currentTime         | double             |                                                        |
| defaultMuted        | Boolean            |                                                        |
| defaultPlaybackRate | double             |                                                        |
| duration            | double             |                                                        |
| ended               | Boolean            | 表示媒体是否已经播放完毕                               |
| error               | MediaError         | 表示最近的错误，如果没有错误则值为 `null`              |
| initialTime         |                    |                                                        |
| loop                | Boolean            |                                                        |
| mediaGroup          | DOMString          |                                                        |
| mediaKeys           | MediaKeys          |                                                        |
| muted               | Boolean            | 静音时为 `true`，否则是 `false`                        |
| networkState        |                    | 获取媒体时的网络状态                                   |
| paused              | Boolean            | 指示媒体元素是否被暂停                                 |
| playbackRate        | double             |                                                        |
| played              | TimeRanges         | 媒体可被播放的范围                                     |
| preload             | DOMString          |                                                        |
| readyState          |                    |                                                        |
| seekable            | TimeRanges         |                                                        |
| seeking             | Boolean            |                                                        |
| sinkId              | DOMString          |                                                        |
| src                 | DOMString          |                                                        |
| textTracks          | TextTrackList      |                                                        |
| videoTracks         | VideoTrackList     |                                                        |
| volume              | double             | 表示音频的音量，值从 `0.0`（静音）到 `1.0`（最大音量） |

## 方法

| 名称         | 返回值 | 说明 |
| :----------- | :----- | :--- |
| canPlayType  |        |      |
| fastSeek     |        |      |
| load         |        |      |
| getMetadata  |        |      |
| loadFrom     |        |      |
| pause        |        |      |
| play         |        |      |
| setMediaKeys |        |      |
| setSinkId    |        |      |

## 参考资料：

- [Autoplay guide for media and Web Audio APIs](https://developer.mozilla.org/zh-CN/docs/Web/Media/Autoplay_guide)
