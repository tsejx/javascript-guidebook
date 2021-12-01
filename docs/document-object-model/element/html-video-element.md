---
nav:
  title: DOM
  order: 6
group:
  title: Element
  order: 6
title: HTMLVideoElement
order: 18
---

# HTMLVideoElement

```plain
EventTarget <- Node <- Element <- HTMLElement <- HTMLMediaElement <- HTMLVideoElement
```

继承其父对象 [HTMLMediaElement](./html-media-element) 和 [HTMLElement](./html-element) 的方法。

height
poster
videoHeight
videoWidth
width

```html
<video />
```

- `<video>` 元素提供了播放、暂停和音量控件来控制视频。
- `<video>` 元素也提供了 width 和 height 属性控制视频的尺寸.如果设置的高度和宽度，所需的视频空间会在页面加载时保留。如果没有设置这些属性，浏览器不知道大小的视频，浏览器就不能再加载时保留特定的空间，页面就会根据原始视频的大小而改变。
- `<video>` 与 `</video>` 标签之间插入的内容是提供给不支持 video 元素的浏览器显示的。
- `<video>` 元素支持多个 `<source>` 元素。`<source>` 元素可以链接不同的视频文件。

## 可选属性

| 属性     | 值                 | 描述                                               |
| -------- | ------------------ | -------------------------------------------------- |
| autoplay | autoplay           | 视频在就绪后马上播放                               |
| controls | controls           | 向用户显示控件，比如播放按钮                       |
| height   | pixels             | 视频播放器的高度                                   |
| loop     | loop               | 媒介文件完成播放后再次开始播放                     |
| muted    | muted              | 视频的音视频输出为静音                             |
| poster   | URL                | 规定视频正在下载时显示的图像，直到用户点击播放按钮 |
| preload  | auto metadata none | 视频在页面加载时进行加载，并预备播放               |
| src      | URL                | 播放视频的 URL                                     |
| width    | pixels             | 视频播放器的宽度                                   |

## Video 对象

通过 `getElementById()` 访问 `<video>` 元素。

```js
const video = docuemnt.getElementById('myVideo');
```

## 属性

| 属性                | 说明                                                |
| ------------------- | --------------------------------------------------- |
| audioTracks         | 返回表示可用音频轨道的 AudioTrackList 对象。        |
| autoplay            | 设置或返回是否在就绪（加载完成）后随即播放视频。    |
| buffered            | 返回表示视频已缓冲部分的 TimeRanges 对象。          |
| controller          | 返回表示视频当前媒体控制器的 MediaController 对象。 |
| controls            | 设置或返回视频是否应该显示控件（比如播放/暂停等）。 |
| crossOrigin         | 设置或返回视频的 CORS 设置。                        |
| currentSrc          | 返回当前视频的 URL。                                |
| currentTime         | 设置或返回视频中的当前播放位置（以秒计）。          |
| defaultMuted        | 设置或返回视频默认是否静音。                        |
| defaultPlaybackRate | 设置或返回视频的默认播放速度。                      |
| duration            | 返回视频的长度（以秒计）。                          |
| ended               | 返回视频的播放是否已结束。                          |
| error               | 返回表示视频错误状态的 MediaError 对象。            |
| height              | 设置或返回视频的 height 属性的值。                  |
| loop                | 设置或返回视频是否应在结束时再次播放。              |
| mediaGroup          | 设置或返回视频所属媒介组合的名称。                  |
| muted               | 设置或返回是否关闭声音。                            |
| networkState        | 返回视频的当前网络状态。                            |
| paused              | 设置或返回视频是否暂停。                            |
| playbackRate        | 设置或返回视频播放的速度。                          |
| played              | 返回表示视频已播放部分的 TimeRanges 对象。          |
| poster              | 设置或返回视频的 poster 属性的值。                  |
| preload             | 设置或返回视频的 preload 属性的值。                 |
| readyState          | 返回视频当前的就绪状态。                            |
| seekable            | 返回表示视频可寻址部分的 TimeRanges 对象。          |
| seeking             | 返回用户当前是否正在视频中进行查找。                |
| src                 | 设置或返回视频的 src 属性的值。                     |
| startDate           | 返回表示当前时间偏移的 Date 对象。                  |
| textTracks          | 返回表示可用文本轨道的 TextTrackList 对象。         |
| videoTracks         | 返回表示可用视频轨道的 VideoTrackList 对象。        |
| volume              | 设置或返回视频的音量。                              |
| width               | 设置或返回视频的 width 属性的值。                   |

## 方法

| 方法             | 说明                                   |
| ---------------- | -------------------------------------- |
| `addTextTrack()` | 向视频添加新的文本轨道。               |
| `canPlayType()`  | 检查浏览器是否能够播放指定的视频类型。 |
| `load()`         | 重新加载视频元素。                     |
| `play()`         | 开始播放视频。                         |
| `pause()`        | 暂停当前播放的视频。                   |

## 加载过程

视频/音频（Audio / Video）在加载过程中，触发的顺序如下：

1. `onloadstart`
2. `ondurationchange`
3. `onloadedmetadata`
4. `onloadeddata`
5. `onprogress`
6. `oncanplay`
7. `oncanplaythrough`
