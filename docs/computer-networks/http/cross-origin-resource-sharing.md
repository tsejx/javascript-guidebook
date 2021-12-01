---
nav:
  title: 计算机网络
  order: 8
group:
  title: HTTP
  order: 3
title: HTTP CORS 跨域资源共享
order: 15
---

# HTTP CORS 跨域资源共享

跨域资源共享（CORS：Cross-Origin Resource Sharing）是一种机制，它使用额外的  HTTP 头来告诉浏览器，让运行在相同域（Origin）上的 Web 应用被准许访问来自不同源服务器上的指定的资源（也即是 [同源策略](../frontend-security/same-origin-policy) 的 HTTP 解决方案）。当一个资源从与该资源本身所在的服务器**不同的域、协议或端口**请求一个资源时，资源会发起一个**跨域 HTTP 请求**。

CORS 机制是为了在认可用户发起的请求的同时，阻止恶意注入脚本；并在以下情况发起的 HTTP 请求时触发：

- 不同的协议：比如从 `https://example.com` 调用 `http://example.com`
- 不同的域：比如从 `example.com` 调用 `api.com`
- 不同的子域：比如从 `example.com` 调用 `api.example.com`
- 不同的端口：比如从 `example.com` 调用 `example.com:3001`

## 实现条件

浏览器将 CORS 请求分成两类：

- 简单请求（simple request）
- 非简单请求（not-so-simple request）

### 简单请求

只要满足以下条件，就属于简单请求：

1. 请求方法是以下三种方法之一
   - **HEAD**
   - **GET**
   - **POST**
2. 自定义设置集合外的头部字段
   - **Accept** 告知服务端当前客户端可处理的内容类型
   - **Accept-Language** 允许客户端声明它可以理解的自然语言，以及优先选择的区域方言
   - **Content-Language** 说明访问者希望采用的的语言
   - **Content-Type**（例如 `application/json` 为非简单请求）指示资源的 MIME 类型
     - `text/plain`
     - `multipart/form-data`
     - `application/x-www-form-urlencoded`
   - **DPR**
   - **Downlink**
   - **Save-Data**
   - **Viewport-Width**
   - **Width**
   - **Last-Event-ID**
3. 请求中的任意 XMLHttpRequestUpload 对象均没有注册任何事件监听器；XMLHttpRequestUpload 对象可以使用 `XMLHttpRequest.upload` 属性访问。
4. 请求中没有 ReadableStream 对象。

### 非简单请求

除了简单请求这些限制外的都为非简单请求。

非简单请求需要满足使用以下任意方法的条件：

- PUT
- DELETE
- CONNECT
- OPTIONS
- TRACE
- PATCH

最常用于判断是否为简单和非简单请求的方法主要是通过 **请求方法** 和 `Content-Type` 头部字段的值。

## 预请求 Preflight

预请求是 OPTIONS 请求，浏览器会自动添加 `Access-Control-Allow-Headers` 和 `Access-Control-Allow-Methods` 头部字段。

需要服务端返回的响应头 `Access-Control-Allow-Headers`、`Access-Control-Allow-Methods` 和 `Access-Control-Allow-Origin`。

除了 `Access-Control-Allow-Origin` 是必须的之外，其他两种只有在不符合简单请求需要的时候服务器才需要添加，比如在简单请求的基础上自定义了一个请求头 `X-xx-name: chris`，那么服务器只需要在响应头中添加 `Access-Control-Allow-Headers`。

每种响应头都可以使用 `*` 通配符来表示所有。

### 减少预请求次数

可以通过设置 `Access-Control-Max-Age` 来减少预请求的次数，需要包含在预请求的响应头中，指定在该时间内预请求验证有效，不必每次都进行预请求，它的单位是 `s`。如 `Access-Control-Max-Age: 1728000`，即有效期为 20 天。

## 正常请求

预请求完之后就可以发送正常请求了，正常请求的步骤与简单请求一致，也需要添加 `Access-Control-Allow-Origin` 响应头。

## 应用场景

跨域资源共享标准（Cross-Origin Sharing Standard）允许在下列场景中使用跨域 HTTP 请求：

- 前文提到的由 XMLHttpRequest 或 Fetch 发起的跨域 HTTP 请求
- Web 字体（CSS 通过 `@font-face` 使用跨域字体资源）
- WebGL 贴图
- 使用 `drawImage` 将 `Images/viedo` 画面绘制到 Canvas
- 样式表（使用 CSSOM ）

> ⚠️ 注意：HTML 中 `<link>`、`<script>`、`<img>` 等标签自带连接属性进行 HTTP 请求是能够无视同源策略的。

## iOS WKWebview 需要 CORS

如果您正在开发使用 Webview（使用 Cordova 或 Ionic）的移动应用程序，Android 将不会给您带来任何麻烦，但 iOS 上的新 WKWebview 将需要 CORS。这意味着您几乎必须始终将 `Access-Control-Allow-Origin` 标头设置为 `*` ，但实际上这并不理想。

## 参考资料

- [📖 MDN HTTP Access control CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)
- [📝 理解 CORS](https://juejin.im/post/5a97b5a3f265da23766ab19a)
- [📝 阮一峰 跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)
- [📝 由同源策略到前端跨域](https://juejin.im/post/58f816198d6d81005874fd97)
