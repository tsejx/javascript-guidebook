# HTTP 超文本传输协议

📖 **快速目录：**

* [HTTP 协议](#HTTP协议)
  * [概述](#概述)
  * [特点](#特点)
* [URL 详解](#URL详解)
  * [简介](#简介)
  * [基本组成](#基本组成)
* [HTTP 请求](#HTTP请求)
  * [请求行](#请求行)
  * [请求头](#请求头)
  * [请求体](#请求体)
* [HTTP 响应](#HTTP响应)
  * [响应行](#响应行)
  * [响应头](#响应头)
  * [响应体](#响应体)

## HTTP 协议

### 概述

HTTP 全称是 HyperText Transfer Protocal ，即超文本传输协议。

HTTP 是**应用层协议**，当你上网浏览网页的时候，浏览器和 Web 服务器之间就会通过 HTTP 在 Internet 上进行数据的发送和接收。

HTTP 是一个基于请求 / 响应模式的、无状态的协议。即我们通常所说的 Request / Response。

![浏览器输入URL后HTTP请求返回的完整过程](../../images/8/bcdb48eb-5d0c-4ea4-860d-4915caf8da22.png)

### 特点

HTTP 支持客户端 / 服务器模式。

- **简单快速**：客户向服务器请求服务时，只需传送请求方法和路径。由于 HTTP 协议简单，使得 HTTP 服务器的程序规模小，因而通信速度很快。
- **灵活**：HTTP 允许传输任意类型的数据对象。正在传输的类型由 Content-Type 加以标记。
- **无连接**：无连接的含义是限制每次链接只处理一个请求。服务器处理完客户的请求，并收到客户的应答后，即断开链接，采用这种方式可以节省传输时间。
- **无状态**：HTTP 协议是无状态协议。无状态是指协议对于事物处理没有记忆能力。缺少状态意味着如果后续处理需要前面的信息，则它必须重传，这样可能会导致每次连接传送的数据量增大。另一方面，在服务器不需要先前信息时它的应答就比较快。

## URL 详解

### 简介

URL（Uniform Resource Locator）是**统一资源定位符**的简称，有时候也被俗称为网页地址（网址），如同是网络上的门牌，是因特网上标准的资源的地址。

> URI（Uniform Resource Identifier）统一资源标志符
>
> URN（Uniform Resource Name）永久统一资源定位符

### 基本组成

通用的格式：`scheme://host[:port#]/path/…/[?query-string][#anchor]`

| 名称         | 功能                                                         |
| ------------ | ------------------------------------------------------------ |
| scheme       | 访问服务器以获取资源时要使用哪种**协议**（例如 http、https 和 FTP 等） |
| host         | HTTP 服务器的 IP 地址或**域名**                              |
| port#        | HTTP 服务器的默认端口为 80，这种情况下端口可以省略，如果使用了别的端口，必须指明 |
| path         | 访问资源的**路径**                                           |
| query-string | 发给 HTTP 服务器的数据（**查询参数**）                       |
| anchor       | **锚点**                                                     |

<details>

<summary>🌰例子</summary>

`https://www.baidu.com/m/test/search?keyword=hahh&name=true#stuff`

| 名称         | 对应的字段               |
| ------------ | ------------------------ |
| Shema        | `http`                   |
| host         | `www.baidu.com`          |
| path         | `/m/test/search`         |
| Query-string | `keyword=hahh&name=true` |
| anchor       | `stuff`                  |

</details>

## HTTP 请求

HTTP 的请求报文分为三个部分：

* **请求行**
  * **请求方法**
  * **请求地址**
  * **协议版本**
* **请求头**
* **请求体**

### 请求行

请求行是请求消息的第一行，由三部分组成：分别是请求方法（GET/POST/DELETE/PUT/HEAD）、请求资源的 URI 路径、HTTP 的版本号。

**请求方法**

HTTP/1.1 协议中共定义了八种方法，以不同的方式操作指定的资源。

| 方法名  | 功能                                                         |
| ------- | ------------------------------------------------------------ |
| GET     | 向指定的资源发出“显示”请求，使用 GET 方法应该只用在读取数据上，而不应该用于产生“副作用”的操作中。 |
| POST    | 指定资源提交数据，请求服务器进行处理（例如提交表单或者上传文件）。数据被包含在请求文本中。这个请求可能会创建新的资源或者修改现有资源，或两者皆有。 |
| PUT     | 向指定资源位置上传其最新内容。                               |
| DELETE  | 请求服务器删除 Request-URI 所标识的资源。                    |
| OPTIONS | 使服务器传回该资源支持的所有 HTTP 请求方法。用 `*` 来代替资源名称，向 Web 服务器发送 OPTIONS 请求，可以测试服务器功能是否正常运作。 |
| HEAD    | 与 GET 方法一样，都是向服务器发出指定资源的请求，只不过服务器将不传回资源的本文部分，它的好处在于，使用这个方法可以在不必传输全部内容的情况下，就可以获取其中 `关于该资源的信息`（原信息或称元数据）。 |
| TRACE   | 显示服务器收到的请求，主要用于测试或诊断。                   |
| CONNECT | HTTP/1.1 中预留给能够将连接改为通道方式的代理服务器。通常用于 SSL 加密服务器的链接（经由非加密的 HTTP 代理服务器）。 |

其中，最常见的是 GET 和 POST 方法，如果是 RESful 接口的话一般会用到 PUT、DELETE、GET、POST（分别对应增删查改），这里附上一篇有关 REST 的文章 [什么是 REST](https://github.com/astaxie/build-web-application-with-golang/blob/master/zh/08.3.md) 。

**请求行**

```http
GET /index.html HTTP/1.1
```

### 请求头

请求头中的信息有和缓存相关的头（Cache-Control，If-Modified-Since）、客户端身份信息（User-Agent）等等。请求头的格式为：`键: 值`，注意**冒号后面有一个空格**：

```http
Accept: */*
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
Connection: keep-alive
Content-Length: 21429
Content-Type: application/json
Host: api.github.com
Origin: https://github.com
Referer: https://github.com/
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36
```

**常见的请求 Header**

| 请求头            | 作用                                   |
| ----------------- | -------------------------------------- |
| Accept            | 表示浏览器接受的数据类型               |
| Accept-Encoding   | 表示浏览器接受的数据压缩格式           |
| Host              | 表示当前请求访问的目标地址             |
| Authorization     | 表示用户身份认证信息                   |
| User-Agent        | 表示浏览器类型                         |
| If-Modified-Since | 表示当前请求资源最近一次更新时间       |
| If-None-Match     | 表示当前请求资源最近一次标识的 ETag 值 |
| Cookie            | 表示浏览器保存的 Cookie 信息           |
| Referer           | 表示标识请求引用自哪个地址             |

### 请求体

请求体是 POST 请求方式中的请求参数，以 `key = value` 形式进行存储，多个请求参数之间用 `&` 连接，如果请求当中请求体，那么在请求头当中的 Content-Length 属性记录的就是该请求体的长度。

```http
POST hysj.jsp HTTP/1.1
Host: search.cnipr.com
User-Agent: Mozilla/5.0 (Windows;U;Windows NT 6.9;zh-CN;rv:1.9.1.13)Gecko/20100914 Firefox/3.5.13 (.NET CLR 3.5.30729)
Accept: text/html, application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: zh-cn,zh;q=0.5
Accept-Encoding: gzip,deflate
Accept-Charst: GN2312,utf-8;q=0.7,*;q=0.7
Keep-Alive: 300
Connection: keep-alive
Referer: http://search.cnipr.com/cnipr/zljs/hyjs-biaodan-y.jsp
Content-Length: 405

pageNo=0&pageSize=10&orderNum=306735659327926273&customerMobile=15626000000&startTime=2019-02-01%2000:00:00&endTime=2019-02-25%2014:54:20&status=SUCCESS&source=WECHAT_SHOPPING&canteenId=104&refundStatus=REFUNDED&startPayTime=2019-02-01%2000:00:00&endPayTime=2019-02-25%2014:54:47
```

**根据应用场景的不同，HTTP 请求的请求体有三种不同的形式。**

第一种：

移动开发者常见的，请求体是任意类型的，服务器不会解析请求体，请求体的处理需要自己解析，如 POST、JSON 的时候就是这类。

第二种：

第二种和第三种都有固定的格式，是服务器端开发人员最先了解的两种。这里的格式要求就是 URL 中 Query String 的格式要求：多个键值对之间用 `&` 连接，键与值之间用 `=` 连接，且只能用 ASCII 字符，非 ASCII 字符需使用 `UrlEncode` 编码。

第三种：

第三种请求体被分成多个部分，**文件上传** 时会被使用，这种格式最先是被用于邮件传输中，每个字段 / 文件都被 boundary（Content-Type 中指定的）分成单独的段，每段以 `--` 加 boundary 开头，然后是该段的描述头，描述头之后空一行接内容，请求结束的标识为 boundary 后面加 `--`

区分是否被当成文件的关键是 `Content-Disposition` 是否包含 `filename`，因为文件有不同的类型，所以还要使用 `Content-Type` 指示文件的类型，如果不知道是什么类型取值可以为 `application/octet-stream` 表示文件是一个二进制的文件，如果不是文件则 `Content-Type` 可以省略。

## HTTP 响应

HTTP 响应的格式上除状态行（第一行）与请求报文的请求行不一样之外，其他的就格式而言是一样的，但排除状态行和请求行的区别，从 Header 上还是可以区分出 HTTP 请求和 HTTP 响应的区别的，怎么区别就要看前面的 Header。

### 响应行

**状态码**

状态码用以表示网页服务器超文本传输协议响应状态的 3 位数字码。[详细的状态码表](./response-status-codes.md)

| 状态码 | 对应信息                                                     |
| ------ | ------------------------------------------------------------ |
| 1XX    | 提示信息—表示请求已接收，继续处理                            |
| 2XX    | 用于表示请求已被成功接收、理解、接收                         |
| 3XX    | 用于表示资源（网页等）被永久转移到其它 URL，也就是所谓的重定向 |
| 4XX    | 客户端错误—请求有语法错误或者请求无法实现                    |
| 5XX    | 服务器端错误—服务器未能实现合法的请求                        |

### 响应头

响应头同样可用于传递一些附加信息。

```http
HTTP/1.0 200 ok
content-type: application/javascript;charset=utf-8
date: Tue, 07 Mar 2017 03:06:14 GMT
sever: Domain Reliability Searver
content-length: 0
x-xss-protection: 1, mode=bloack
x-frame-options: SAMEORIGIN
alt-svc: quic=":443";ma=2592000;v="36,35,34"
```

**常见的响应 Header**

| 名称              | 作用                                   |
| ----------------- | -------------------------------------- |
| Date              | 表示当前相应资源发送的服务器日期和时间 |
| Last-Modified     | 表示当前响应资源最后被修改的服务器时间 |
| Transfer-Encoding | 表示当前响应资源传输实体的编码格式     |
| Set-Cookie        | 表示设置 Cookie 信息                   |
| Location          | 在重定向中或者创建新资源时使用         |
| Server            | 表示服务器名称                         |

### 响应体

响应体也就是网页的正文内容，一般在响应头中会用 Content-Length 来明确响应体的长度，便于浏览器接收，对于大数据量的正文信息，也会使用 chunked 的编码方式。

---

**参考资料：**

* [Fetch Living Standard](https://fetch.spec.whatwg.org/)