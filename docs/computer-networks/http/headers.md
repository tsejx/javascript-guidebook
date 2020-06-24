---
nav:
  title: 计算机网络
  order: 8
group:
  title: HTTP
  order: 3
title: HTTP 首部字段
order: 3
---

# HTTP 首部字段

HTTP 消息头允许客户端和服务器通过 request 和 response 传递附加信息。一个请求头由名称（不区分大小写）后跟冒号 `:`，冒号后跟具体的值（不带换行符）组成。该值前的引导空白会被忽略。

根据不同上下文，可将消息头分为：

* 通用首部字段（General Header Fields）：同时适用于请求和响应消息，但与最终消息主体中传输的数据无关的消息头。
* 请求首部字段（Request Header Fields）：包含更多有关要获取的资源或客户端本身信息的消息头。
* 响应首部字段（Response Header Fields）：包含有关响应的补充信息，如其位置或服务器本身（名称和版本等）的消息头。
* 实体首部字段（Entity Header Fields）：包含有关实体主体的更多信息，比如主体长（Content-Length）度或其 MIME 类型。

## 通用首部字段

| 首部字段名        | 说明                       | 示例                                             |
| ----------------- | -------------------------- | ------------------------------------------------ |
| Cache-Control     | 控制缓存的行为             | `Cache-Control: no-cache`                        |
| Connection        | 逐跳首部、连接的管理       | `Connection: close`                              |
| Date              | 创建报文的日期时间         | `Date: Tue, 15 Nov 2010 08:12:31 GMT`            |
| Pragma            | 报文指令                   | `Pragma: no-cache`                               |
| Trailer           | 报文末端的首部一览         | `Trailer: Max-Forwards`                          |
| Transfer-Encoding | 指定报文主题的传输编码方式 | `Transfer-Encoding:chunked`                      |
| Upgrade           | 升级为其他协议             | `Upgrade: HTTP/2.0, SHTTP/1.3, IRC/6.9, RTA/x11` |
| Via               | 代理服务器的相关信息       | `Via: 1.0 fred, 1.1 nowhere.com (Apache/1.1)`    |
| Warning           | 错误通知                   | Warning: 199 Miscellaneous warning               |

## 请求首部字段

| 首部字段名          | 说明                                          | 示例                                                      |
| ------------------- | --------------------------------------------- | --------------------------------------------------------- |
| Accept              | 用户代理可处理的媒体类型                      | `Accept: text/plain, text/html`                           |
| Accept-Charset      | 优先的字符集                                  | `Accept-Charset: iso-8859-5`                              |
| Accept-Encoding     | 优先的内容编码                                | `Accept-Encoding: gzip, deflate, br`                      |
| Accept-Language     | 优先的语言（自然语言）                        | `Accept-Language: en,zh`                                  |
| Authorization       | Web 认证信息                                   | `Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==`       |
| Expect              | 期待服务器的特定行为                          | `Expect: 100-continue`                                    |
| From                | 用户的电子邮箱地址                            | `From: raykaeso@leixuesong.cn`                            |
| Host                | 请求资源的服务器的域名和端口号                | `Host: www.leixuesong.cn`                                 |
| If-Match            | 比较实体标记（ETag）                          | `If-Match: “737060cd8c284d8af7aD3082f209582d”`            |
| If-Modified-Since   | 比较资源的更新时间                            | `If-Modified-Since: Sat, 29 Oct 2010 19:43:31 GMT`        |
| If-None-Match       | 比较实体标记（与 If-Match 相反）                | `If-None-Match: “737060cd8c284d8af7ad3082f209582d”`       |
| If-Range            | 资源未更新时发送实体 Byte 的范围请求            | `If-Range: “737060cd8c284d8af7ad3082f209582d”`            |
| If-Unmodified-Since | 比较资源的更新时间（与 If-Modified-Since 相反） | `If-Unmodified-Since: Sat, 29 Oct 2010 19:43:31 GMT`      |
| Max-Forwards        | 最大传输逐跳数                                | `Max-Forwards: 10`                                        |
| Proxy-Authorization | 代理服务器要求客户端的认证信息                | `Proxy-Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==` |
| Range               | 实体的字节范围请求                            | `Range: bytes=500-999`                                    |
| Referer             | 对请求中 URI 的原始获取方                       | `Referer: www.leixuesong.cn`                              |
| TE                  | 传输编码的优先级                              | `TE: trailers,deflate;q=0.5`                              |
| User-Agent          | HTTP 客户端程序的信息                          | `User-Agent: Mozilla/5.0 (Linux; X11)`                    |

## 响应首部字段

| 首部字段名 | 说明 | 示例 |
| ------ | ---- | ---- |
| Accept-Ranges       | 是否接受字节范围请求 | `Accept-Ranges: bytes`                                    |
| Age | 从原始服务器到代理缓存形成的估算时间（以秒计，非负） | `Age: 12` |
| ETag | 请求变量的实体标签的当前值 | `ETag: “737060cd8c284d8af7ad3082f209582d”` |
| Location | 用来重定向接收方到非请求 URL 的位置来完成请求或标识新的资源 | ` Location: http://www.leixuesong.cn/724` |
| Proxy-Authenticate | 代理服务器对客户端的认证信息 | `Proxy-Authenticate: Basic realm="Access to the internal site"` |
| Retry-After | 如果实体暂时不可取，通知客户端在指定时间之后再次尝试 | ` Retry-After: 120` |
| Server | Web 服务器的安装信息 | `Server: Apache/1.3.27 (Unix) (Red-Hat/Linux)` |
| Vary | 代理服务器缓存的管理信息 | `Vary: *` |
| WWW-Authenticate | 服务器对客户端的认证信息 | `WWW-Authenticate: Basic` |

## 实体首部字段

| 首部字段名       | 说明                            | 示例                                           |
| ---------------- | ------------------------------- | ---------------------------------------------- |
| Allow            | 资源可支持的 HTTP 方法            | `Allow: GET,HEAD`                              |
| Content-Encoding | 实体主体适用的编码方式          | `Content-Encoding: gzip`                       |
| Content-Language | 实体主体的自然语言              | `Content-Language: en,zh`                      |
| Content-Length   | 实体主体的大小（单位：字节）    | `Content-Length: 348`                          |
| Content-Location | 替代对应资源的 URI               | `Content-Location: /index.htm`                 |
| Content-MD5      | 实体主体的报文摘要（MD5 交验值） | `Content-MD5: Q2hlY2sgSW50ZWdyaXR5IQ==`        |
| Content-Range    | 实体主体的位置范围              | `Content-Range: bytes 21010-47021/47022`       |
| Content-Type     | 实体主体的媒体类型（MIME 类型）  | `Content-Type: text/html; charset=utf-8`       |
| Expires          | 响应国旗的日期和时间            | `Expires: Thu, 01 Dec 2010 16:00:00 GMT`       |
| Last-Modified    | 请求资源最后修改的时间          | `Last-Modified: Tue, 15 Nov 2010 12:45:26 GMT` |

---

**参考资料：**

* [MDN HTTP Headers](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)
* [HTTP 协议 Header 详解](https://juejin.im/entry/57482a5379bc44005c7e8594)
* [HTTP Header](https://juejin.im/entry/599296aaf265da3e260982db)