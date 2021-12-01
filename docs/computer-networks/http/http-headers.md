---
nav:
  title: 计算机网络
  order: 8
group:
  title: HTTP
  order: 3
title: HTTP 首部字段
order: 4
---

# HTTP 首部字段

HTTP 首部字段用于描述报文。

首部字段的格式特点：

1. 字段名 **不区分大小写**
2. 字段名不允许出现空格，不可以出现下划线 `_`
3. 字段名后必须紧跟着冒号 `:`

## 报文信息

以下报文形式 **通用** 表示请求头和响应头均可使用。

| 报文形式 | 首部字段名 | 说明                                                   | 示例                                                               |
| :------- | :--------- | :----------------------------------------------------- | :----------------------------------------------------------------- |
| 通用     | Date       | 创建报文的日期时间                                     | `Date: Tue, 15 Nov 2010 08:12:31 GMT`                              |
| 请求头   | Origin     | 请求页面的站点地址                                     | `Origin: https://developer.mozilla.org`                            |
|          | Referer    | 请求页面的完整 URL 地址                                | `Referer: https://developer.mozilla.org/en-US/docs/Web/JavaScript` |
|          | Host       | 请求要发送到的资源服务器的主机名和端口号               | `Host: www.taobao.com`                                             |
|          | User-Agent | 用户代理软件的应用类型、操作系统、软件开发商以及版本号 | `User-Agent: Mozilla/5.0 (Linux; X11)`                             |

## 网络连接

| 报文形式 | 首部字段名 | 说明                                                             | 示例                |
| :------- | :--------- | :--------------------------------------------------------------- | :------------------ |
| 通用     | Keep-Alive | 允许消息发送者表示连接的状态，还可以用于设置超时时长和最大请求数 |                     |
|          | Connection | 决定当前事务完成后，是否会关闭网络连接                           | `Connection: close` |

### Connection

如果取值为 `keep-alive`，网络连接就是持久的，不会关闭，使用对同一服务器的请求可以继续在该连接上完成。

可取值：

- `keep-alive`：表明客户端想要保持该网络连接打开，HTTP/1.1 的请求默认使用一个持久连接。这个请求头列表由头部名组成，这些头将被第一个非透明的代理或者代理间的缓存所移除：这些头定义了发出者和第一个实体之间的连接，而不是和目的地节点间的连接。
- `close`：表明客户端或服务器想要关闭该网络连接，这是 HTTP/1.0 请求的默认值

### Keep-Alive

`Keep-Alive` 是一个通用消息头，允许消息发送者暗示连接的状态，还可以用来设置超时时长和最大请求数。

语法：

```http
Keep-Alive: parameters
```

一系列用逗号隔开的参数，每一个参数由一个标识符和一个值构成，并使用等号 `=` 隔开。下述标识符是可用的：

- `timeout`：指定空闲连接需要保持打开状态的最小时长（以秒为单位）。需要注意的是，如果没有在传输层设置 `keep-alive` TCP message 的话，大于 TCP 层面的超时设置会被忽略。
- `max`：在连接关闭之前，在此连接可以发送的请求的最大值。在非管道连接中，除了 `0` 以外，这个值是被忽略的，因为需要在紧跟着的响应中发送新一次的请求。HTTP 管道连接则可以用它来限制管道的使用。

使用示例：

```http
HTTP/1.1 200 OK
Connection: Keep-Alive
Content-Encoding: gzip
Content-Type: text/html; charset=utf-8
Date: Thu, 11 Aug 2016 15:23:13 GMT
Keep-Alive: timeout=5, max=1000
Last-Modified: Mon, 25 Jul 2016 04:32:39 GMT
Server: Apache
```

HTTP 请求启动 KeepAlive 需要服务端配合，Nginx 配置：

```nginx
http {
  # 客户端连接在服务器端保持开启的超时值
  keepalive_timeout  120s 120s;
  # 可以服务的请求的最大数量
  keepalive_requests 10000;
}
```

## 内容协商

| 报文形式 | 首部字段名       | 说明                                          | 示例                                     |
| :------- | :--------------- | :-------------------------------------------- | :--------------------------------------- |
| 请求头   | Accept           | 用于告知服务器客户端可处理的 **媒体类型**     | `Accept: text/plain, text/html`          |
|          | Accept-Charset   | 用于告知服务器客户端可处理的 **字符集类型**   | `Accept-Charset: utf-8, iso-8859-5`      |
|          | Accept-Encoding  | 用于告知服务器客户端可处理的 **内容编码方式** | `Accept-Encoding: gzip, deflate, br`     |
|          | Accept-Language  | 用于告知服务器客户端可处理的 **自然语言**     | `Accept-Language: en,zh`                 |
| 响应头   | Content-Type     | 用于指示资源的 **媒体类型**（MIME 类型）      | `Content-Type: text/html; charset=utf-8` |
|          | Content-Encoding | 用于指示资源的 **编码方式**                   | `Content-Encoding: gzip`                 |
|          | Content-Language | 用于指示资源的 **自然语言**                   | `Content-Language: en,zh`                |
|          | Content-Length   | 用于指示资源的 **体积大小**（单位：字节）     | `Content-Length: 348`                    |
|          | Content-Location | 用于指示要访问的资源通过内容协商后的 URL      | `Content-Location: /index.htm`           |
|          | Content-Range    | 表示数据片段在整个文件中的位置                | `Content-Range: bytes 21010-47021/47022` |

### 压缩方式

当然一般这些数据都是会进行编码压缩的，采取什么样的压缩方式就体现在了发送方的 Content-Encoding 字段上， 同样的，接收什么样的压缩方式体现在了接受方的 Accept-Encoding 字段上。这个字段的取值有下面几种：

- `gzip`：当今最流行的压缩格式
- `deflate`：另外一种著名的压缩格式
- `br`：一种专门为 HTTP 发明的压缩算法

```http
<!-- 发送端 -->
Content-Encoding: gzip;
<!-- 接收端 -->
Accept-Encoding: gzip
```

### Content-Type

在响应中，`Content-Type` 用于告知客户端实际返回的内容的内容类型。

指令：

- `media-type`：资源或数据的 MIME 类型
- `charset`：字符编码标准
- `boundary`：用于封装消息的多个部分的边界

## 同源策略

| 报文形式 | 首部字段名                       | 说明                                                                                                 | 示例                                                             |
| :------- | :------------------------------- | :--------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------- |
| 请求头   | Access-Control-Request-Headers   | （预检请求）列出正式请求中允许的首部信息                                                             | `Access-Control-Request-Headers: *`                              |
|          | Access-Control-Request-Method    | （预检请求）列出正式请求中允许的请求方法                                                             | `Access-Control-Request-Method: *`                               |
| 响应头   | Access-Control-Allow-Credentials | 表示是否可以将对请求的响应暴露给页面                                                                 | `Access-Control-Allow-Credentials: true`                         |
|          | Access-Control-Allow-Headers     | （预检请求）列出正式请求中允许的首部信息                                                             | `Access-Control-Allow-Headers: *`                                |
|          | Access-Control-Allow-Methods     | （预检请求）列出正式请求中允许的请求方法                                                             | `Access-Control-Allow-Methods: *`                                |
|          | Access-Control-Allow-Origin      | （预检请求）列出正式请求中允许的域名                                                                 | `Access-Control-Allow-Origin: https://developer.mozilla.org`     |
|          | Access-Control-Expose-Headers    | （预检请求）列出正式请求中哪些首部可以暴露                                                           | `Access-Control-Expose-Headers: Content-Length, X-Kuma-Revision` |
|          | Access-Control-Max-Age           | （预检请求）列出正式请求中 `Access-Control-Allow-Headers` 和 `Access-Control-Allow-Methods` 缓存时间 | `Access-Control-Max-Age: 600`                                    |

## 缓存协商

| 报文形式 | 首部字段名          | 说明                                            | 示例                                                 |
| :------- | :------------------ | :---------------------------------------------- | :--------------------------------------------------- |
| 通用     | Cache-Control       | 表示资源的缓存策略                              | `Cache-Control: no-cache`                            |
| 请求头   | If-Modified-Since   | 比较资源的更新时间                              | `If-Modified-Since: Sat, 29 Oct 2010 19:43:31 GMT`   |
|          | If-Match            | 比较实体标记（ETag）                            | `If-Match: “737060cd8c284d8af7aD3082f209582d”`       |
|          | If-None-Match       | 比较实体标记（与 If-Match 相反）                | `If-None-Match: “737060cd8c284d8af7ad3082f209582d”`  |
|          | If-Range            | 资源未更新时发送实体 Byte 的范围请求            | `If-Range: “737060cd8c284d8af7ad3082f209582d”`       |
|          | If-Unmodified-Since | 比较资源的更新时间（与 If-Modified-Since 相反） | `If-Unmodified-Since: Sat, 29 Oct 2010 19:43:31 GMT` |
| 响应头   | Expires             | 表示资源的过期时间                              | `Expires: Thu, 01 Dec 2010 16:00:00 GMT`             |
|          | Last-Modified       | 表示服务器认定资源最后的修改时间                | `Last-Modified: Tue, 15 Nov 2010 12:45:26 GMT`       |
|          | ETag                | 请求变量的实体标签的当前值                      | `ETag: “737060cd8c284d8af7ad3082f209582d”`           |

## 权限认证

| 报文形式 | 首部字段名          | 说明                                                   | 示例                                                            |
| :------- | :------------------ | :----------------------------------------------------- | :-------------------------------------------------------------- |
| 通用     | Via                 | 代理服务器的相关信息                                   | `Via: 1.0 fred, 1.1 nowhere.com (Apache/1.1)`                   |
| 请求头   | Authorization       | 用于验证用户代理身份的凭证                             | `Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==`             |
|          | Proxy-Authorization | 代理服务器对客户端的认证信息                           | `Proxy-Authenticate: Basic realm="Access to the internal site"` |
| 响应头   | WWW-Authenticate    | 服务器对客户端的认证信息                               | `WWW-Authenticate: Basic`                                       |
|          | Proxy-Authenticate  | 用于指定代理服务器上的资源访问权限而采用的身份验证方式 | `Proxy-Authenticate: Basic realm="Access to the internal site"` |

## 其他

| 首部字段名        | 说明                                                        | 示例                                           |
| :---------------- | :---------------------------------------------------------- | :--------------------------------------------- |
| Allow             | 资源可支持的 HTTP 方法                                      | `Allow: GET,HEAD`                              |
| Trailer           | 报文末端的首部一览                                          | `Trailer: Max-Forwards`                        |
| Transfer-Encoding | 指定报文主题的传输编码方式                                  | `Transfer-Encoding:chunked`                    |
| Location          | 用来重定向接收方到非请求 URL 的位置来完成请求或标识新的资源 | `Location: http://www.leixuesong.cn/724`       |
| Retry-After       | 如果实体暂时不可取，通知客户端在指定时间之后再次尝试        | `Retry-After: 120`                             |
| Server            | Web 服务器的安装信息                                        | `Server: Apache/1.3.27 (Unix) (Red-Hat/Linux)` |

## 参考资料

- [MDN HTTP Headers](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)
- [HTTP 协议 Header 详解](https://juejin.im/entry/57482a5379bc44005c7e8594)
- [HTTP Header](https://juejin.im/entry/599296aaf265da3e260982db)
