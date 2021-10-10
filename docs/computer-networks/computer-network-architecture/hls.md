# HLS 流媒体网络传输协议

HLS 全称是 HTTP Live Streaming，是一个由 Apple 公司提出的基于 HTTP 的媒体流传输协议，用于实时音视频流的传输。目前 HLS 协议被广泛的应用于视频点播和直播领域。

## 实现原理

HLS 跟 DASH 协议的原理非常类似。通过将整条流切割成一个小的可以通过 HTTP 下载的媒体文件，然后提供一个配套的媒体列表文件，提供给客户端，让客户端顺序地拉取这些媒体文件播放，来实现看上去是在播放一条流的效果。由于传输层协议只需要标准的 HTTP 协议，HLS 可以方便的透过防火墙或者代理服务器，而且可以很方便的利用 CDN 进行分发加速，并且客户端实现起来也很方便。

HLS 把整个流分成一个个小的基于 HTTP 的文件来下载，每次只下载一些。

HLS 协议由三部分组成：

- HTTP：传输协议
- M3U8：索引文件
- TS：音视频的媒体信息

关于 HLS 的详细介绍可参考：[draft-pantos-http-live-streaming](https://datatracker.ietf.org/doc/html/draft-pantos-http-live-streaming-23)

在 HTML5 页面上使用 HLS 非常简单：

```html
<video src="example.m3u8" controls></video>
```

或者：

```html
<video controls>
  <source src="example.m3u8"></source>
</video>
```

## M3U8 索引文件

HLS 的 m3u8 文件，是一个 TS 的列表，也就是告诉浏览器可以播放这些 TS 文件：

```m3u8
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-MEDIA-SEQUENCE:64
#EXT-X-TARGETDURATION:12
#EXTINF:11.550
livestream-64.ts
#EXTINF:5.250
livestream-65.ts
#EXTINF:7.700
livestream-66.ts
#EXTINF:6.850
livestream-67.ts
```

有几个关键的参数，这些参数在 SRS 的配置文件中都有配置项：

- `EXT-X-TARGETDURATION`：所有切片的最大时长。有些 Apple 设备这个参数不正确会无法播放。SRS 会自动计算出 ts 文件的最大时长，然后更新 m3u8 时会自动更新这个值。用户不必自己配置。
- `EXTINF`：ts 切片的实际时长，SRS 提供配置项 `hls_fragment`，但实际上的 ts 时长还受 gop 影响。
  ts 文件的数目：SRS 可配置 hls_window，指定 m3u8 中保存多少个切片，SRS 会自动清理旧的切片。
- `livestream-67.ts`：SRS 会自动维护 ts 切片的文件名，在编码器重推之后，这个编号会继续增长，保证流的连续性。直到 SRS 重启，这个编号才重置为 0。

譬如，每个 ts 切片为 10 秒，窗口为 60 秒，那么 m3u8 中会保存 6 个 ts 切片。

每一个 `.m3u8` 文件，分别对应若干个 ts 文件，这些 ts 文件才是真正存放视频的数据，m3u8 文件只是存放了一些 ts 文件的配置信息和相关路径，当视频播放时，`.m3u8` 是动态改变的，`video` 标签会解析这个文件，并找到对应的 ts 文件来播放，所以一般为了加快速度，`.m3u8` 放在 Web 服务器上，ts 文件放在 CDN 上。

`.m3u8` 文件，其实就是以 UTF-8 编码的 `m3u` 文件，这个文件本身不能播放，只是存放了播放信息的文本文件。

## 技术架构

HLS 的架构分为三部分：Server、CDN 和 Client，即服务器、分发组件和客户端。

下面是 HLS 整体架构图：

<!-- 缺图片 -->

### Server

服务器端将视频数据流编码、封装和切割为连续的、时长很短的 MPEG-TS 格式的文件，通常一个 ts 分片大概是 10s；并提供一个配套的媒体列表文件（m3u8 文件）。

视频封装格式：MPEG-TS。

编码：视频编码为 H.264，音频编码为 AAC, MP3, AC-3 或者 EC-3 格式。

HLS 也支持纯音频格式，通常是 MPEG 基本音频文件（MP4 封装的 AAC 格式）。

### Distribution

由标准的网络服务器组成，接收客户端的请求和分发所有的资源包括 `m3u8` 列表文件和 `ts` 分片文件。

### Client

客户端先通过下载 `m3u8` 文件，再通过 `m3u8` 文件的索引地址顺序地拉取 `ts` 媒体文件播放。对于直播，它的索引文件一直处于动态变化的，你需要不断的更新索引文件 `playlist` 然后移除旧的索引文件。

---

HLS 协议规定：

- 视频的封装格式是 TS
- 视频编码格式为 H264，音频编码格式为 MP3、AAC 或者 AC-3
- 除了 TS 视频文件本身，还定义了用来控制播放的 m3u8 文件

HLS 的工作流程如下图（来源苹果官网）所示：

## 参考资料

- [B 站直播中 HLS 和去中心化 P2P 的实际应用](https://zhuanlan.zhihu.com/p/387073804)
