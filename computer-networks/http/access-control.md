## HTTP 访问控制（CORS）

跨域资源共享（CORS：Cross-Origin Resource Sharing）是一种机制，它使用额外的 HTTP 头来告诉浏览器，让运行在相同域（Origin）上的 Web 应用被准许访问来自不同源服务器上的指定的资源。当一个资源从与该资源本身所在的服务器**不同的域、协议或端口**请求一个资源时，资源会发起一个**跨域 HTTP 请求**。

CORS 机制是为了在认可用户发起的请求的同时，阻止恶意注入脚本；并在以下情况发起的 HTTP 请求时触发：

* 不同的域：比如从 `example.com` 调用 `api.com`
* 不同的子域：比如从 `example.com` 调用 `api.example.com`
* 不同的端口：比如从 `example.com` 调用 `example.com:3001`
* 不同的协议：比如从 `https://example.com` 调用 `http://example.com`

### 两种请求

浏览器将CORS请求分成两类：简单请求（simple request）和非简单请求（not-so-simple request）。

只要满足以下两大条件，就属于简单请求：

* 请求方法是以下三种方法之一
  * HEAD
  * GET
  * POST
* HTTP 的首部字段不超出以下几种字段
  * Accept
  * Accept-Language
  * Content-Language
  * Last-Event-ID
  * Content-Type：`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`

凡事不满足上面两种条件的，就属于非简单请求。

### 使用场景

跨域资源共享标准（Cross-Origin Sharing Standard）允许在下列场景中使用跨域 HTTP 请求：

* 前文提到的由 XMLHttpRequest 或 Fetch 发起的跨域 HTTP 请求
* Web 字体（CSS 通过 `@font-face` 使用跨域字体资源）
* WebGL 贴图
* 使用 `drawImage` 将 `Images/viedo` 画面绘制到 Canvas
* 样式表（使用 CSSOM ）

---

**参考资料：**

* [MDN HTTP Access control CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)
* [理解 CORS](https://juejin.im/post/5a97b5a3f265da23766ab19a)
* [阮一峰 跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)
* [由同源策略到前端跨域](https://juejin.im/post/58f816198d6d81005874fd97)