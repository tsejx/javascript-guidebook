---
nav:
  title: BOM
  order: 5
group:
  title: 性能
  order: 11
title: Performance API
order: 1
---

# Performance API

- Performance
- PerformanceEntry
- PerformanceMark
- PerformanceMeasure
- PerformanceNavigationTiming
- PerformanceObserver
- PerformanceResourceTiming

Performance API
Resource Timing API
Performance Timeline
User Timing API
Frame Timing API
Beacon API
Intersection Observer API

PerformanceTiming

- LongTask API
- EventTiming API
- First Input Timing API
- Resource Timing API
- Navigation Timing API

- [Web Performance](https://s0developer0mozilla0org.icopy.site/en-US/docs/Web/Performance)
- [Navigation and resource timings](https://s0developer0mozilla0org.icopy.site/en-US/docs/Web/Performance/Navigation_and_resource_timings)
- [PerformanceTiming（已废弃）](https://s0developer0mozilla0org.icopy.site/en-US/docs/Web/API/PerformanceTiming)
- [PerformanceNavigationTiming](https://s0developer0mozilla0org.icopy.site/en-US/docs/Web/API/PerformanceNavigationTiming)

文档加载完毕后在控制台输入 `window.performance`

```js
{
  timeOrigin: 1586506121469.0242,
  onresourcetimingbufferfull: null,
  memory: {
    totalJSHeapSize: 45418276,
    usedJSHeapSize: 17120888,
    jsHeapSizeLimit: 4294705152
  },
  navigation: {
    type: 1,
    redirectCount: 0
  },
  timing: {
    // 准备加载页面的起始时间戳
    // 同一个浏览器上一个页面卸载（unload）结束时的时间戳。如果没有上一个页面，这个值会和 fetchStart 相同。
    navigationStart: 1543806782096,

    // 如果前一个文档和当前文档同源，返回前一个文档开始 unload 的时间戳。
    // 如果没有上一个页面，这个值会返回 0。
    unloadEventStart: 1543806782523,

    // 如果前一个文档和当前文档同源，返回前一个文档开始 unload 结束的时间戳。
    // 和 unloadEventStart 相对应，unload事件处理完成时的时间戳。如果没有上一个页面,这个值会返回0。
    unloadEventEnd: 1543806782523,

    // 如果有重定向，就是第一个 HTTP 重定向开始时的时间戳。如果没有重定向，或者重定向中的一个不同源，这个值会返回0。
    redirectStart: 0,

    // 如果有重定向，就是最后一个 HTTP 重定向完成时（也就是说是 HTTP 响应的最后一个比特直接被收到的时间）的时间戳。
    // 如果没有重定向，或者重定向中的一个不同源，这个值会返回 0。
    redirectEnd: 0,

    // 开始检查缓存或开始获取资源的时间
    // 浏览器准备好使用 HTTP 请求来获取（fetch）文档的时间戳。这个时间点会在检查任何应用缓存之前。
    fetchStart: 1543806782096,

    // 开始进行 DNS 查询的时间戳
    //如果使用了持续连接（persistent connection），或者这个信息存储到了缓存或者本地资源上，这个值将和 fetchStart 一致。
    domainLookupStart: 1543806782096,

    // DNS 域名查询完成的时间戳
    //如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等
    domainLookupEnd: 1543806782096,

    // HTTP（TCP）开始建立连接请求资源的时间戳
    // 如果使用了持续连接（persistent connection），或者这个信息存储到了缓存或者本地资源上，这个值将和 fetchStart 一致。
    connectStart: 1543806782099,

    // HTTP（TCP） 返回浏览器与服务器之间的连接建立时的时间戳
    // 如果建立的是持久连接，则返回值等同于 fetchStart 属性的值。连接建立指的是所有握手和认证过程全部结束。
    connectEnd: 1543806782227,

    // 如果是 HTTPS 请求。返回 SSL 握手的时间戳
    // HTTPS 返回浏览器与服务器开始安全链接的握手时的时间戳。如果当前网页不要求安全连接，则返回 0。
    secureConnectionStart: 1543806782162,

    // 浏览器开始（向服务器）发送 HTTP 请求的时间戳（包括从服务器，本地缓存请求）
    requestStart: 1543806782241,

    // 浏览器从服务器接收到（或从本地缓存读取）第一个字节时的时间戳
    // 如果传输层在开始请求之后失败并且连接被重开，该属性将会被数制成新的请求的相对应的发起时间。
    responseStart: 1543806782516,

    // 浏览器从服务器接收到（或从本地缓存读取，或从本地资源读取）最后一个字节时的时间戳（如果在此之前 HTTP 连接已经关闭，则返回关闭时的时间戳）。
    responseEnd: 1543806782537,

    // 当前网页 DOM 结构开始解析时的时间戳（即 Document.readyState 属性变为 “loading”、相应的 readystatechange 事件触发时）。
    domLoading: 1543806782573,

    // 当前网页 DOM 结构结束解析、开始加载内嵌资源时（即 Document.readyState 属性变为 “interactive”、相应的 readystatechange 事件触发时）的时间戳。
    domInteractive: 1543806783203,

    // DOMContentLoaded 事件开始的时间
    // 当解析器触发 DOMContentLoaded 事件，即所有需要被执行的脚本已经被解析时的时间戳。
    domContentLoadedEventStart: 1543806783203,

    // DOMContentLoaded 事件结束的时间
    // 当所有需要立即执行的脚本已经被执行（不论执行顺序）时的时间戳。
    domContentLoadedEventEnd: 1543806783216,

    // 当前文档解析完成，即 Document.readyState 变为 'complete' 且相对应的 readystatechange 被触发时的时间戳
    domComplete: 1543806783796,

    // load 事件被发送时的时间戳。如果这个事件还未被发送，它的值将会是 0。
    loadEventStart: 1543806783796,

    // 当 load 事件结束，即加载事件完成时的时间戳。如果这个事件还未被发送，或者尚未完成，它的值将会是0.
    loadEventEnd: 1543806783802
  }
}


```

通过以上时间点的获取，可以计算出以下信息：

一般指标：

- 重定向耗时：`redirectEnd - redirectStart`
- 白屏时间：`domloadng - fetchStart`
- DNS 查询耗时：`domainLookupEnd - domainLookupStart`
- TCP 链接耗时：`connectEnd - connectStart`
- HTTP 请求耗时：`responseEnd - responseStart`
- 解析 dom 树耗时：`domComplete - domInteractive`
- DOM 渲染耗时：`domComplete - domLoading`
- domready 时间：`domContentLoadedEventEnd - fetchStart`
- onload 时间：`loadEventEnd - fetchStart`
- 页面加载耗时：`loadEventEnd - navigationStart`
- 页面卸载耗时：`unloadEventEnd - unloadEventStart`
- 获取性能信息时当前时间：`new Date().getTime()`

## 高准确率的时间计算

```js
function calculateTime(callback) {
  const startTime = performance.now();
  callback();
  const endTime = performance.now();
  return endTime - startTime;
}
```

---

**参考资料：**

- [MDN：Using the Performance API](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance_API/Using_the_Performance_API)
