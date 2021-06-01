---
nav:
  title: BOM
  order: 5
group:
  title: 数据通信 API
  order: 11
title: WebRTC
order: 7
---

# WebRTC

WebRTC（Web Real-Time Communications）是一项实时通讯技术，它允许网络应用或者站点，在不借助中间媒介的情况下，简历浏览器之间点对点（Peer-to-Peer）的连接，实现视频流和（或）音频流或者其他任意数据的传输。WebRTC 包含的这些标准使用户在无需安装任何插件或者第三方的软件的情况下，创建点对点（Peer-to-Peer）的数据分享和电话会议成为可能。

## 引言

- 通信双方需要先通过服务器交换一些信息
- 完成信息交换后，通信双方将直接进行连接以传输数据

```jsx | inline
import React from 'react';
import img from '../../assets/web-real-time-communication/workflow.png';

export default () => <img alt="Webpack执行流程" src={img} width={800} />;
```

## WebRTC 的组成

WebRTC 由三大块组成：

- getUserMedia：负责获取用户本地的多媒体数据，如调起摄像头录像等
- RTC PeerConnection：负责建立 P2P 连接以及传输多媒体数据
- RTC DataChannel：提供一个信令通道，在游戏里面信令是实现互动的重要元素

## 文件共享

目前，数据通道支持如下类型：

- String：JavaScript 基本的字符串
- Blob（Binary large object）：二进制大对象
- ArrayBuffer：确定数组长度的数据类型
- ArrayBufferView：基础的数组视图

其中，Blob 类型是一个可以存储二进制文件的容器，结合 HTML5 相关文件读取 API，可以实现文件共享的功能。

> WebRTC 作为一种复杂的图形通信传输技术，此处只作简略介绍，更深入的研究请移步其他文章。

---

**参考资料：**

- [WebRTC 的前生今世](https://juejin.im/entry/57f9aeedd203090068b18d09)
- [WebRTC 直播时代](https://juejin.im/entry/58ad04b38d6d810058c50bc1)
- [实现 WebRTC P2P 连接](https://juejin.im/post/5babb3565188255c791b0aa7)
- [WebRTC 学习资料大全](https://blog.csdn.net/foruok/article/details/53005728)
- [简单了解的 HTML5 WebRTC](https://juejin.im/entry/583405be61ff4b006b8c620e)
- [使用 WebRTC 构建简单的前端视频通讯](https://juejin.im/entry/5779d3172e958a00559b2202)
- [基于 WebRTC 技术的实时通信服务开发实践](https://juejin.im/entry/5978018251882563080713d6)
- [WebRTC Samples](https://webrtc.github.io/samples/)

**文献推荐：**

- 《WebRTC 权威指南》
- 《Learning WebRTC 中文版》
