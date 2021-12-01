---
nav:
  title: 计算机网络
  order: 8
group:
  title: HTTP
  order: 3
title: HTTP2
order: 21
---

# HTTP2

HTTP/2（超文本传输协议第 2 版，最初命名为 HTTP 2.0），简称为 h2（基于 TLS/1.2 或以上版本的加密连接）或 h2c（非加密连接），是 HTTP 协议的的第二个主要版本，使用于万维网。

## 旧版本问题

1. **多个 TCP 连接**：虽然 HTTP/1.1 管线化可以支持请求并发，但是浏览器很难实现，主流浏览器厂商都禁用了管线化
2. **队头阻塞**：TCP 连接上只能发送一个请求，由于单连接上的串行请求，前面的请求未完成前，后续的请求都在排队等待
3. **头部冗余**：HTTP/1.x 采用文本格式传输，首部未压缩，无状态特性让每个请求都会带上 Cookie、User-Agent 等重复的信息
4. **不支持服务端主动推送**：HTTP/1.1 不支持服务推送消息，只能使用轮询的方式解决

## 新特性

在了解 HTTP/2 新特性前，可以通过 DEMO 直观感受 HTTP/1.1 与 HTTP/2 的差距：

[HTTP/2: the Future of the Internet | Akamai](https://http2.akamai.com/demo)

主要新特性：

- **传输数据量大量减少**
  - [二进制分帧](#二进制分帧)
  - [标头压缩](#标头压缩)
- **多路复用及相关功能**
  - [多路复用](#多路复用)
  - 优先级与依赖性
- **服务器消息推送**
  - [服务器推送]()
- 其他
  - 重置流
  - 流量控制
  - HTTPS RFC 规范并没有要求 HTTP2 强制使用 TLS，但是目前世界所有浏览器和\- 服务器实现都基于 HTTPS 来实现 HTTP2

### 二进制分帧

相比于 HTTP/1.x 基于以换行符作为纯文本的分隔符的解析，HTTP/2 将所有的传输信息分割为更小的消息和帧，并对它们采用 **二进制格式编码**。基于二进制可以使协议有更多的扩展性，例如，引入帧来传输数据和指令。

HTTP/2 所有性能增强的核心在于新的 <strong style="color:red">二进制分帧层</strong>，它定义了如何封装 HTTP 消息并在客户端与服务器之间传输。

> 这里所谓的 <strong style="color:red">层</strong>，指的是位于套接字接口与应用可见的高级 HTTP API 之间一个经过优化的新编码机制：HTTP 的语义（包括各种动词、方法、标头）都不受影响，不同的是传输期间对它们的编码方式变了。

#### 数据流、消息和帧

新的二进制分帧机制改变了客户端与服务器之间交换数据的方式。

为了说明这个过程，我们需要了解 HTTP/2 的三个概念：

- **数据流**（Stream）：已建立的连接内的 <u>双向字节流</u>，可以承载一条或多条消息
- **消息**（Message）：与逻辑请求或响应消息对应的完整的一系列帧
- **帧**（Frame）：HTTP/2 通信的最小单位，每个帧都包含帧头，至少也会标识出当前帧所属的数据流

这些概念的关系总结如下：

- 所有通信都在一个 TCP 连接上完成，此连接 **可以承载任意数量的双向数据流**
- 每个数据流都有一个 **唯一的标识符和可选的优先级信息**，用于承载双向消息
- 每条消息都是一条逻辑 HTTP 消息（例如请求或响应），包含一个或多个帧
- 帧是最小的通信单位，承载着特定类型的数据，例如 HTTP 标头、消息负载等等。来自不同数据流的帧可以交错发送，然后根据每个帧头的数据流标识符重新组装。

HTTP/2 将 HTTP 协议通信分解为二进制编码帧的交换，这些帧对应着特定数据流中的消息。所有这些都在一个 TCP 连接内复用，这是 HTTP/2 协议所有其他功能和性能优化的基础。

```jsx | inline
import React from 'react';
import img from '../../assets/http2/connection.svg';

export default () => <img alt="HTTP 数据流通信连接" src={img} width={640} />;
```

**消息的组成：HEADERS 帧与 DATA 帧**

- HEADERS frame 头部帧
- DATA frame 数据帧

```jsx | inline
import React from 'react';
import img from '../../assets/http2/binary-framing.png';

export default () => <img alt="消息组成" src={img} width={640} />;
```

更多关于帧定义详解，请查阅 [HTTP/2 中的帧定义](https://halfrost.com/http2-http-frames-definitions/)

### 标头压缩

标头压缩（Header compression）：每个 HTTP 传输都承载一组标头，这些标头说明了传输的资源及其属性。 在 HTTP/1.x 中，此元数据始终以纯文本形式，通常会给每个传输增加 500–800 字节的开销。如果使用 HTTP Cookie，增加的开销有时会达到上千字节。

为了减少此开销和提升性能，HTTP/2 使用 <strong style="color:red">HPACK</strong> 压缩格式压缩请求和响应标头元数据，这种格式采用两种简单但是强大的技术：

1. 这种格式支持通过静态霍夫曼代码对传输的标头字段进行编码，从而减小了各个传输的大小。
2. 这种格式要求通讯双方 **各自缓存一份头域索引表**，相同的消息头只发送 **索引号**（换句话说，它可以建立一个共享的压缩上下文），此索引表随后会用作参考，对之前传输的值进行有效编码。

利用霍夫曼编码（HPACK），可以在传输时对各个值进行压缩，而利用之前传输值的索引列表，我们可以通过传输索引值的方式对重复值进行编码，索引值可用于有效查询和重构完整的标头键值对。

**索引表用法示意**

```jsx | inline
import React from 'react';
import img from '../../assets/http2/headers-compress.jpg';

export default () => <img alt="索引表用法示意" src={img} width={520} />;
```

客户端发了两次请求，第一次请求有完整的 HTTP 报文头部，第二次请求的时候只有一个 `path` 的字段不一样，但是这次报文头它只需要发送一个 `path` 的字段就好了，这样就大大减少了发送的量。这个的实现要求客户端和服务同时维护一个报文头表。

#### HPACK 霍夫曼编码

HPACK 压缩示意：

```jsx | inline
import React from 'react';
import img from '../../assets/http2/hpack-header-compression.png';

export default () => <img alt="HPACK压缩示意" src={img} width={640} />;
```

作为一种进一步优化方式，HPACK 压缩上下文包含一个静态字典和一个动态字典：

- [静态字典](https://httpwg.org/specs/rfc7541.html#static.table.definition) 在规范中定义，并提供了一个包含所有连接都可能使用的常用 HTTP 标头字段（例如，有效标头名称）的列表
- 动态字典最初为空，将根据在特定连接内交换的值进行更新

因此，为之前未见过的值采用静态 Huffman 编码，并替换每一侧静态表或动态表中已存在值的索引，可以减小每个请求的大小。

> ⚠️ **注意**：在 HTTP/2 中，请求和响应标头字段的定义保持不变，仅有一些微小的差异：所有标头字段名称均为小写，请求行现在拆分成各个 `:method`、`:scheme`、`:authority` 和 `:path` 伪标头字段。

- 关于 [HPACK 头部压缩标准](https://tools.ietf.org/html/rfc7541) 的制定
- [HPACK：Header Compression for HTTP/2](https://httpwg.org/specs/rfc7541.html)

### 多路复用

**多路复用（MultiPlexing）**：通过该功能，在一条连接上，您的浏览器可以同时发起无数个请求，并且响应可以同时响应。另外，多路复用中支持了流的优先级（Stream dependencies）设置，允许客户端告知服务器最优资源，可以优先传输。

当我们打开网站时，浏览器会对每个网页并发的连接进行限制，一般浏览器的 HTTP 请求并发数限制在 6-8 个。但实际上，绝大部分网站首页所需要的资源个数远大于这个限制。所以为了不让资源在下载阶段就被阻塞住，我们往往会把一些静态资源分散到 CDN 或其他服务器上，从而通过多域名的方式突破浏览器对并发连接数的限制，从而使得网站能同时下载尽可能多的资源。

但建立更多的连接也意味更多的开销。每个 HTTP 请求都对应建立 TCP 连接，也许有些资源体积只有几 kb，这些情况下建立连接本身的开销就变得更客观，很可能三次握手的实践比传输时间还长

在 HTTP/2 中，有了二进制分帧之后，HTTP/2 不再依赖 TCP 链接去实现多流并行，而是通过 <strong style="color:red">流</strong> 支持多路复用。

将 HTTP 消息分解为独立的帧，交错发送，然后在另一端重新组装是 HTTP/2 最重要的一项增强。事实上，这个机制会在整个网络技术栈中引发一系列连锁反应，从而带来巨大的性能提升，让我们可以：

- 并行交错地发送多个请求/响应，请求/响应之间互不影响
- 不必再为绕过 HTTP/1.x 限制而做很多工作（请参阅 [针对 HTTP/1.x 进行优化](https://hpbn.co/optimizing-application-delivery/#optimizing-for-http1x)，例如级联文件、Image Sprites 和域名分片
- 消除不必要的延迟和提高现有网络容量的利用率，从而减少页面加载时间

HTTP/2 中的新二进制分帧层解决了 HTTP/1.x 中存在的 **队头阻塞** 问题，也消除了并行处理和发送请求及响应时对多个连接的依赖。

### 服务器推送

服务端推送（Server push）：同 SPDY 一样，HTTP/2 也具有客户端推送功能。目前，大多数网站已经启用 HTTP/2，如淘宝。使用服务器推动，可以提前将资源推送至浏览器缓存。

HTTP/2 中的 Server Push 并不是指类似于现在的 Server Sent Event（SSE） 或者 WebSocket 的推送技术。**它是一种服务器根据客户端以前发送的请求来猜测未来的请求，并提前将未来请求的结果推送给客户端的技术**。

```jsx | inline
import React from 'react';
import img from '../../assets/http2/server-push.png';

export default () => <img alt="服务器推送" src={img} width={640} />;
```

> 为什么在浏览器中需要一种此类机制呢？

一个典型的网络应用包含多种资源，客户端需要检查服务器提供的文档才能逐个找到它们。 那为什么不让服务器提前推送这些资源，从而减少额外的延迟时间呢？ 服务器已经知道客户端下一步要请求什么资源，这时候服务器推送即可派上用场。

事实上，如果您在网页中内联过 CSS、JavaScript，或者通过数据 URI 内联过其他资产（请参阅 [资源内联](https://hpbn.co/http1x/#resource-inlining)），那么您就已经亲身体验过服务器推送了。 对于将资源手动内联到文档中的过程，我们实际上是在将资源推送给客户端，而不是等待客户端请求。 使用 HTTP/2，我们不仅可以实现相同结果，还会获得其他性能优势。

推送资源可以进行以下处理：

- 由客户端缓存
- 在不同页面之间重用
- 与其他资源一起复用
- 由服务器设定优先级
- 被客户端拒绝

#### Nginx 配置实现

通过 Nginx 配置能主动推送两个 HTML 文档中需要请求的文件：

```nginx
server {
    # 设定开启使用 HTTP2
    listen 443 ssl http2;
    server_name  localhost;

    ssl                      on;
    ssl_certificate          /etc/nginx/certs/example.crt;
    ssl_certificate_key      /etc/nginx/certs/example.key;

    ssl_session_timeout  5m;

    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers   on;

    location / {
      root   /usr/share/nginx/html;
      index  index.html index.htm;

      # 服务器主动推送这两个文件
      http2_push /style.css;
      http2_push /example.png;
    }
```

这种方式需要写在服务器配置中，每次修改都要重启服务，而且应用与服务器的配置不应该混在一起。

#### 服务端实现

服务器推送还有另一个实现方法，就是后端应用产生 HTTP 响应头信息 `Link` 命令。服务器发现有这个头信息，就会进行服务器推送。

```http
Link: </styles.css>; rel=preload; as=style
```

如果要推送多个资源：

```http
Link: </styles.css>; rel=preload; as=style, </example.png>; rel=preload; as=image
```

这时，Nginx 的配置改成下面这样。

```nginx
server {
    listen 443 ssl http2;

    # ...

    root /var/www/html;

    location = / {
        proxy_pass http://upstream;
        http2_push_preload on;
    }
}
```

如果服务器或者浏览器不支持 HTTP2，那么浏览器就会按照 `preload` 来处理这个头信息，预加载指定的资源文件。

事实上，这个头信息就是 `preload` 标准提出的，它的语法和 `as` 属性的值都写在了 [标准](https://w3c.github.io/preload/#as-attribute) 里面。

参考 [HTTP/2 Server Push with Node.js](https://blog.risingstack.com/node-js-http-2-push/) 实现。

#### 缓存问题

服务器推送有一个很麻烦的问题。所要推送的资源文件，如果浏览器已经有缓存，推送就是浪费带宽。即使推送的文件版本更新，浏览器也会优先使用本地缓存。

一种解决办法是，只对第一次访问的用户开启服务器推送。下面是 Nginx 官方给出的示例，根据 Cookie 判断是否为第一次访问。

```nginx
server {
    listen 443 ssl http2 default_server;

    ssl_certificate ssl/certificate.pem;
    ssl_certificate_key ssl/key.pem;

    root /var/www/html;
    http2_push_preload on;

    location = /demo.html {
        add_header Set-Cookie "session=1";
        add_header Link $resources;
    }
}


map $http_cookie $resources {
    "~*session=1" "";
    default "</style.css>; as=style; rel=preload";
}
```

### 安全提升

> HTTP/2 是不是必须基于 TLS/SSL 协议？

- IETF 标准不要求必须基于 TLS/SSL 协议 📌
- 浏览器要求必须基于 TLS/SSL 协议 📌
- 在 TLS 层 ALPN（Application Layer Protocol Negotiation）扩展做协商，只认 HTTP/1.x 的代理服务器不会干扰 HTTP/2
- sheme：`http://` 和 `https://` 默认基于 80 和 443 端口
- h2：基于 TLS 协议运行的 HTTP/2 被称为 `h2`
- h2c：基于 TCP 协议之上运行的 HTTP/2 被称为 `h2c`

## 参考资料

- [📖 Google developers document: Introduction to HTTP/2](https://developers.google.com/web/fundamentals/performance/http2/)
- [📖 HTTP2 资料汇总](https://imququ.com/post/http2-resource.html)
- [📝 HTTP2 讲解](https://ye11ow.gitbooks.io/http2-explained/content/)
- [📝 深入研究：HTTP2 的真正性能到底如何](https://segmentfault.com/a/1190000007219256)
- [📝 怎样把网站升级到 HTTP/2](https://zhuanlan.zhihu.com/p/29609078)
- [📝 HTTP/2 常见问题解答](https://juejin.im/post/5c5ada2e6fb9a049dd80be75)
- [📝 从理论到实践，全面理解 HTTP/2](https://juejin.im/post/5c6a9f85e51d4503831ad4fa)
- [📝 再谈 HTTP2 性能提升之背后原理](https://juejin.im/post/5c4e6d11e51d4534dc477f05)
- [📝 阮一峰：HTTP/2 服务器推送（Server Push）教程](https://www.ruanyifeng.com/blog/2018/03/http2_server_push.html)
- [🛠 HTTP/2 and SPDY indicator](https://chrome.google.com/webstore/detail/http2-and-spdy-indicator/mpbpobfflnpcgagjijhmgnchggcjblin/related?hl=zh-CN)
