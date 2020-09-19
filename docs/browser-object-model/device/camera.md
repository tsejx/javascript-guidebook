---
nav:
  title: BOM
  order: 5
group:
  title: 设备 API
  order: 15
title: 摄录设备
order: 3
---

# 摄录设备

HTML5 的 `getUserMedia` API 提供了访问用户媒体设备的能力，基于该特性，开发者可以在不依赖任何浏览器插件的条件下访问视频和音频等设备。

## getUserMedia API

各主要浏览器对 `getUserMedia` API 的支持情况。

| 浏览器                 | 版本（旧版 API） | 版本（新版 API） | 说明                        |
| ---------------------- | ---------------- | ---------------- | --------------------------- |
| IE                     | 不支持           | 不支持           |                             |
| Edge                   | 12+              | 不支持           |                             |
| Firefox                | 17+              | 36+              | 需要前缀 `moz`              |
| Chrome                 | 21+              | 47+              | 部分支持，需要前缀 `webkit` |
| Safari                 | 不支持           | 不支持           |                             |
| iOS Safari             | 不支持           | 不支持           |                             |
| Android Browser        | 56+              | 不支持           | 部分支持，需要前缀 `webkit` |
| Chrome for Android     | 57+              | 不支持           | 部分支持，需要前缀 `webkit` |
| UC Browser for Android | 11.4+            | 不支持           | 部分支持，需要前缀 `webkit` |

旧版语法

```js
getUserMedia(constraints, successCallback, errorCallback);
```

新版语法

```js
getUserMedia(constraints)
  .then(successCallback)
  .catch(errorCallback);
```

参数 `constraints` 指定请求的媒体类型，主要包含 video 和 audio。

```js
// 请求不带任何参数的视频和音频
{video: true, audio: true}

// 可指定视频分辨率
{video: true, audio: true}

// 移动设备上，可指定使用前置摄像头
{video: { facingMode: 'user' } }

// 使用后置摄像头
{video: { facingMode: { exact: 'environment'} } }
```

- 成功回调函数 `successCallback` 的参数 stream，为 MediaStream 对象，表示媒体内容的数据流，可以通过 `URL.createObjectURL` 转换后设置为 Video 或 Audio 元素的 `src` 属性来使用，部分较新的浏览器也可以直接设置为 `srcObject` 属性来使用。
- 失败回调函数 `errorCallback` 的参数 `error`，其中 `name` 属性的值参考下表。

| 错误值               | 错误名称         |
| -------------------- | ---------------- |
| AbortError           | 中止错误         |
| NotAllowedError      | 拒绝错误         |
| NotFoundError        | 找不到错误       |
| NotReadableError     | 无法读取错误     |
| OverConstrainedError | 无法满足要求错误 |
| SecurityError        | 安全错误         |
| TypeError            | 类型错误         |

实例代码：

```js
navigator.mediaDevices
  .getUseMedia({ video: true })
  .then(function(stream) {
    // 成功获得媒体流
  })
  .catch(function(error) {
    console.log('获取用户媒体失败:' + error.name);
  });
```

初次访问用户媒体设备时，浏览器会询问用户是否允许访问，在用户允许后获得访问媒体设备授权。

## 调用摄像头拍照实例

本例子中，将请求访问用户摄像头，并把视频流通过 Video 元素显示出来。

```html
<!-- video用于显示媒体设备的视频流,自动播放 -->
<video id="video" autoplay style="width:480px;height:320px"></video>
<div>
  <button id="capture">拍照</button>
  <!-- 拍照按钮-->
</div>
<canvas id="canvas" width="480" height="320"></canvas>
<!-- 描绘video截图 -->
```

```js
// 访问用户媒体设备的兼容方法
function getUserMedia(constraints, success, error) {
  if (navigator.mediaDevice.getUserMedia) {
    // 最新的标准API
    navigator.mediaDevice
      .getUserMedia(constraints)
      .then(success)
      .catch(error);
  } else if (navigator.webkitGetUserMedia) {
    // Webkit 核心浏览器
    navigator.webkitGetUserMedia(constraints, success, error);
  } else if (navigator.mozGetUserMedia) {
    // Firefox 浏览器
    navigator.mozGetUserMedia(constraints, success, error);
  } else if (navigator.getUserMedia) {
    // 旧版 API
    navigator.getUserMedia(constraints, success, error);
  }
}

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2D');

// 成功的回调函数
function success(stream) {
  // 兼容的webkit核心浏览器
  const compatobleURL = window.URL || window.webkitURL;
  // 将视频流设置为video元素的源
  video.src = compatibleURL.createObjectURL(stream);
  video.play(); // 播放视频
}

// 异常的回调函数
function error(error) {
  console.log('访问用户媒体设备失败:', error.name, error.message);
}

if (
  navigator.mediaDevices.getUserMedia ||
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia
) {
  // 调用用户媒体设备，访问摄像头
  getUserMedia({ video: { width: 480, height: 320 } }, success, error);
} else {
  alert('您的浏览器不支持访问用户媒体设备！');
}

// 绑定拍照按钮的单击事件
document.getElementById('capture').addEventListener('click', function() {
  context.drawImage(video, 0, 0, 480, 320); // 将video画面在canvas上绘制出来
});
```
