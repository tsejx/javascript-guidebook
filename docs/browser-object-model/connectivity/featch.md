---
nav:
  title: BOM
  order: 5
group:
  title: 数据通信 API
  order: 11
title: Fetch API
order: 3
---

# Fetch API

Fetch API 提供了一个获取资源的接口（包括跨域），在功能上与 XMLHttpRequest 有很多相似的地方，但被设计成更具可扩展性和高效性。

Fetch 的核心在于对 HTTP 接口的抽象，包括 Request、Response、Headers、Body，以及用于初始化异步请求的 global fetch。得益于 JavaScript 实现的这些抽象好的 HTTP 模块，其他接口能够很方便的使用这些功能。

**PC 浏览器兼容性**

| Chrome | Opera | Firefox | IE  | Edge | Safari |
| ------ | ----- | ------- | --- | ---- | ------ |
| 42     | 29    | 39      | No  | 14   | 10.1   |

**Mobile 浏览器兼容性**

| iOS Safari | Opera Mobile | Opera Mini | Android | Android Chrome | Android Firefox |
| ---------- | ------------ | ---------- | ------- | -------------- | --------------- |
| 10.3       | 46           | No         | 67      | 70             | 63              |

## 语法

```js
Promise fetch(input, init)
```

### 参数

- input: 定义要获取的资源，这可能是
  - 一个 String 字符串，包含要获取资源的 URL
  - 一个 Request 对象
- init：[可选]一个配置项对象，包括所有对请求的设置，可选参数有
  - method：请求使用的方法，如 GET、POST、PUT、DELETE 等
  - headers：请求的头信息，形式为 Headers 的对象或包含 ByteString 值的对象字面量
  - body：请求的 body 信息：可能是一个 Blob、BufferSource、FormData
  - URLSearchParams 或者 String 对象。注意 GET 或 HEAD 方法的请求不能包含 body 信息
  - mode：请求的模式，如 cors、no-cors 或者 same-origin
  - credentials：请求的 credentials，如 omit、same-origin 或者 include。为了当前域名内自动发送 cookie，必须提供这个选项，从 Chorme 50 实例，这个属性也可以受 FederateCrential 实例或是一个 PasswwordCredential 实例
  - cache：请求的 cache 模型：default、no-store、reload、no-cache、force-cache 或者 only-if-cached
  - redirect：可用的 redirect 模式：follow（自动重定向），error（如果产生重定向将自动终止并且抛出一个错误）
  - referer：一个 USVSting 可以是 no-referrer、click 或一个 URL。默认 client。
  - downgrade、orign、orgin-when-cross-origin、unsafe-url
  - integrity：包括请求的 subresource integrity 值

## Guard

Guard 事 Headers 对象的特征。

当使用 `Headers()` 构造函数创建一个新的 Headers 对象的时候，它的 Guard 被设置成 `none`（默认值）。

当创建 Request 和 Response 对象的时候，它将拥有一个按照以下规则实现的与之相关联的 Headers 对象。

## Headers

Headers 类（请求头对象）能用于对 HTTP `request` 和 `response` 的检索、设置、添加和删除等各种操作。

每个 Headers 类包含一个 Headers 列表，它的初始值为空或者零个或多个键值对。

| 方法        | 说明                                                 |
| ----------- | ---------------------------------------------------- |
| `append()`  | 添加一个 header 信息                                 |
| `delete()`  | 删除指定的 header                                    |
| `entries()` | 返回 header 对象中的所有键值对，是一个 Iterator 对象 |
| `get()`     | 从 Headers 对象中返回指定的值                        |
| `getAll()`  | 获取所有的 header                                    |
| `has()`     | 检测指定的 header 的键，返回布尔值                   |
| `keys()`    | 获取所有 header 的键，是一个 Iterator 对象           |
| `set()`     | 修改或添加 header                                    |
| `values()`  | 获取所有 header 的值，是一个 Iterator 对象           |

```js
let content = 'Hello world!';

let reqHeaders = new Headers();

reqHeaders.append('Content-Type', 'text/plain');
reqHeaders.append('Content-Length', content.length.toString());
reqHeaders.append('X-Custom-Header', 'ProcessThisImmediately');
```

也可以是个对象。

```js
const reqHeaders = new Headers({
  'Content-Type': 'text/plain',
  'Content-Length': content.length.toString(),
  'X-Custom-Header': 'ProcessThisImmediately',
});
```

## Request

Request 对象是 FetchAPI 的资源请求对象。

```js
Request(url, options);
```

| 参数      | 说明     | 类型   |
| --------- | -------- | ------ |
| `url`     | 请求 URL | string |
| `options` | 配置对象 | object |

### 属性方法

| 属性          | 说明                                                                  |
| ------------- | --------------------------------------------------------------------- |
| `method`      | 请求方法                                                              |
| `url`         | 请求地址                                                              |
| `headers`     | 请求头（可是 Headers 对象，可以是对象）                               |
| `context`     | 请求上下文                                                            |
| `referrer`    | 指定请求源地址                                                        |
| `mode`        | 请求模式（是跨域 cors 还是正常 no-cors）                              |
| `credentials` | 跨域请求时，是否携带 Cookie 信息（omit 跨域携带/sam-origin 同源携带） |
| `redirect`    | 重定向                                                                |
| `integrity`   | 一个散列值，用于检验请求资源的完整性                                  |
| `cache`       | 是否缓存这个资源                                                      |

| 方法      | 说明                            |
| --------- | ------------------------------- |
| `clone()` | 复制一个当前 Request 对象的实例 |

### 示例

```js
const requst = new Request('data.json', {
  method: 'POST',
  headers: {},
  body: new FormData(document.getElementById('login-form')),
  cache: 'default',
});
```

## Body

Fetch mixin 对象，提供了关联 response/request 中 body 的方法，可以定义它的文档类型以及请求如何被处理。

`Request`  和  `Response`  对象都实现了 Body 的接口，所以都拥有 Body 的方法和属性，用于指定请求体中的 body 或响应体的内容的数据类型（`arrayBuffer/blob /json/text`) 主要是做数据类型的转换。

| 属性       | 说明                                           |
| ---------- | ---------------------------------------------- |
| `bodyUsed` | 用于判断是否在响应体中是否设置过 body 读取类型 |

| 方法            | 说明                                                                                                            |
| --------------- | --------------------------------------------------------------------------------------------------------------- |
| `arrayBuffer()` | 将响应流转换为 Buffer 数组的 Promise 对象，并将 `bodyUsed` 状态改为已使用                                       |
| `blob()`        | 将响应流转换为大的二进制的 Promise 对象，并将 `bodyUsed`   状态改为已使用，一般用于文件读取（下载大文件或视频） |
| `formData()`    | 将响应流转换为 formData 的 Promise 对象，并将 `bodyUsed` 状态改为已使用                                         |
| `json()`        | 将响应流转换为 json 的 Promise 对象，并将 `bodyUsed` 状态改为已使用                                             |
| `text()`        | 将响应流转换为文本字符串的 Promise 对象，并将 `bodyUsed` 状态改为已使用                                         |

## Response

Request 对象是 FetchAPI 的资源响应对象。

| 属性（只读）  | 说明                                                 |
| ------------- | ---------------------------------------------------- |
| `type`        | 响应的类型 basic/cors 等                             |
| `url`         | 包含 Response 的 URL                                 |
| `useFinalURL` | 包含了一个布尔值来标示这是否是该 Response 的最终 URL |
| `status`      | 响应码                                               |
| `ok`          | 表示响应成功                                         |
| `statusText`  | 状态码信息                                           |
| `headers`     | 响应头的 Headers 对象                                |
| `bodyUsed`    | 是否设置过响应内容的类型                             |

| 方法         | 说明                                       |
| ------------ | ------------------------------------------ |
| `clone()`    | 创建一个 Response 对象的克隆               |
| `error()`    | 返回一个绑定了网络错误的新的 Response 对象 |
| `redirect()` | 用另一个 URL 创建一个新的 Response         |

## fetch()

`fetch()` 方法用于发起获取资源的请求，它返回一个 Promise 对象，这个 Promise 对象会在请求响应后将状态变更为 Resolved，并返回 Response 对象。

### 示例

```js
fetch('api/data.json', {
    method: 'POST',			// 请求类型
    headers: {},			// 请求头
    body: {},				// 请求体
    mode: '',				// 请求模式
    credentials: '',		// Cookie的跨域策略
    cache: '',				// 请求的Cache模式
}).then(response => {...})
```

### mode

- `no-cors`：允许来自 CDN 的脚本、其他域的图片和其他一些跨域资源，但是首先有个前提条件，就是请求的 `method` 只能是 HEAD、GET 或者 POST。此外，任何 ServiceWorkers 拦截了这些请求，它不能随意添加或者改写任何 `header`。其次，JavaScript 不能访问 Response 中的任何属性，这保证了 ServiceWorkers 不会导致任何跨域下的安全问题而隐私信息泄漏。
- `cors`：通常用作跨域请求来从第三方提供的 API 获取数据。这个模式遵守 CORS 协议。只有有限的一些 `header` 被暴露给 Response 对象，但是 `body` 是可读的。
- `same-origin`：如果一个请求是跨域的，那么返回一个简单的 `error`，这样确保所有的请求遵守同源策略。

### cache

- `default`：缓存相同的请求
- `no-store`：不缓存任何请求
- `reload`：创建一个正常的请求，并用响应更新 HTTP 缓存
- `no-cache`：如果 HTTP 缓存中有响应，并且不是正常请求，则 Fetch 创建条件请求。然后，它使用响应更新 HTTP 缓存。
- `force-cache`：Fetch 使用 HTTP 缓存中与请求匹配的任何响应，不管是否过期。如果没有响应，则会创建正常请求，并使用响应更新 HTTP 缓存。
- `only-if-cached`：Fetch 使用 HTTP 缓存中与请求匹配的任何响应，不管是否过期。如果没有响应，则返回网络错误。 （只有当请求的模式为 `same-origin` 时，才能使用任何缓存重定向，假设请求的重定向模式为 `follow`，重定向不会违反请求的模式）。

如果 `header` 中包含名称为 `If-Modified-Since`、`If-None-Match`、`If-Unmodified-Since`，`If-Match` 和 `If-Range` 之一，如果是 `default`，Fetch 会将  `cache`  自动设置为  `no-store`。

---

参考资料：

- [MDN web docs：Fetch API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)
- [Fetch 使用的常见问题及解决办法](http://www.cnblogs.com/wonyun/p/fetch_polyfill_timeout_jsonp_cookie_progress.html)
- [Fetch 用法说明](https://segmentfault.com/a/1190000007019545)
