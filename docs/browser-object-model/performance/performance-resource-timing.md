---
nav:
  title: BOM
  order: 5
group:
  title: 性能 API
  order: 13
title: Performance Resource Timing API
order: 2
---

# Performance Resource Timing API

Resource Timing API
Resource Timing API 提供了让用户查看一个资源从输入 url 到下载下来经历的各个过程所消耗的时间，借此可以来衡量网站的性能。 我们可以通过 Resource Timing Api 监控哪个阶段消耗时间比较长，然后针对该阶段进行优化，比如发现一个请求的过程中服务器返回时间过长，则需要对服务器进行优化了。

资源请求的生命周期
浏览器从请求资源到资源下载下来，会经过多个阶段，一个请求生命周期的主要阶段包括：

重定向；如果服务器返回 302 的状态时，则会发生重定向，页面会重定向到 302 响应的 location 属性指定的地址去（response 的 Location 属性指定，例如 jd.com 会被跳转到http://www.jd.com）。
读取浏览器缓存；如果资源的缓存时间还未过期（服务器设置的 expires 和 cache-control 还未过期），则会直接从浏览器缓存中读取。后续的 dns 查询、tcp 握手、请求的发送都不会进行了。
DNS 解析；发送 http 请求需要通过建立 TCP 连接，建立 TCP 连接需要直到目标机器（服务器）的 ip 地址，所以需要进行 dns 的解析出 ip，然后通过 socket 建立 tcp 连接。
TCP 握手；http 建立在 TCP 上，需要先完成 TCP 三次握手，通过第 2 步的 ip 和已知的端口号，浏览器开启一个进程建立 TCP 连接。在此过程中，如果使用 https，则会在 TCP 连接的时候进行 SSL 握手，建立 SSL 连接。
请求 request；浏览器根据 url，组装 http 请求，并发送。
接收 response；服务器返回 http 响应的时候，浏览器接收到 http response，然后就下载资源了。

利用 Resource Timing 监控资源加载速度
https://blog.csdn.net/weixin_33972649/article/details/87990641

改善页面性能 - 如何监控资源加载
https://zhuanlan.zhihu.com/p/59285705