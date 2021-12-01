---
nav:
  title: 计算机网络
  order: 8
group:
  title: HTTP
  order: 3
title: HTTP 连接
order: 6
---

# HTTP 连接

HTTP 连接是 HTTP 报文传输的关键通道。

## 持久连接

持久连接（Persistent Connection）

HTTP 协议采用 **请求-应答** 模式：

- 普通模式：每个请求/应答客户和服务器都要新建一个连接，完成之后立即断开连接
- Keep-Alive 模式：该功能使客户端到服务器端的连接持续有效，当出现对服务器的后继请求时，Keep-Alive 功能避免了建立或者重新建立连接

在 HTTP/1.0 版本中，如果客户端浏览器支持 Keep-Alive ，那么就在 HTTP 请求头中添加一个字段 `Connection: Keep-Alive`，当服务器收到附带有 `Connection: Keep-Alive` 的请求时，它也会在响应头中添加一个同样的字段来使用 `Keep-Alive` 。这样一来，客户端和服务器之间的 HTTP 连接就会被保持，不会断开（超过 `Keep-Alive` 规定的时间，意外断电等情况除外），当客户端发送另外一个请求时，就使用这条已经建立的连接。

在 HTTP/1.1 版本中，默认情况下所有连接都被保持，如果加入 `Connection: close` 才关闭。目前大部分浏览器都使用 HTTP 1.1 协议，也就是说默认都会发起 Keep-Alive 的连接请求了，所以是否能完成一个完整的 Keep-Alive 连接就看服务器设置情况。

注意事项：

- HTTP Keep-Alive 简单来说就是保持当前的 TCP 连接，避免了重新建立连接
- HTTP 长连接不可能一直保持，例如 `Keep-Alive: timeout=5, max=100`，表示这个 TCP 通道可以保持 5 秒，且该长连接最多接收 100 次请求就断开
- HTTP 是无状态协议，意味着每个请求都是独立的，Keep-Alive 没能改变这个结果

> ❓ 使用长连接后，客户端和服务端如何知道本次传输结束呢？

1. 判断传输数据是否达到了 `Content-Length` 指示的大小
2. 动态生成的文件采用分块传输的方式传输（`Transfer-Encoding: chunked`），这时候就要根据 `chunked` 编码来判断，`chunked` 编码的数据在最后有一个空 `chunked` 块，表明本次传输数据结束

## 传输编码

传输编码在 HTTP 的报文中，使用 `Transfer-Encoding` 首部字段进行标记，它就是指明当前使用的传输编码。

`Transfer-Encoding` 会改变报文的格式和传输的方式，使用它不但不会减少内容传输的大小，甚至还有可能会使传输变大，看似是一个不环保的做法，但是其实是为了解决某些特殊问题。

简单来说，传输编码必须配合持久连接使用，为了持久连接中，将数据分块传输，并标记传输结束而设计的。

## 分块编码传输

`Transfer-Encoding` 在 HTTP/1.1 协议里，就只有 `chunked` 这个参数，标识当前为分块编码传输。

分块传输的规则：

1. 每个分块包含一个十六进制的数据长度值和真实数据
2. 数据长度值独占一行，和真实数据通过 CRLF（\r\n）分割
3. 数据长度值，不计算真实数据末尾的 CRLF，只计算当前传输块的数据长度
4. 最后通过一个数据长度值为 0 的分块，来标记当前内容实体传输结束

### 不定长包体实现

分块传输编码 Chunked Transfer Encoding

```http
Transfer-Encoding: chunked
```

表示分块传输数据，设置这个字段后会自动产生两个效果：

- `Content-Length` 首部字段会被忽略
- 基于长连接持续推送动态内容

我们以 Node.js 模拟分块传输：

```js
const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html; charset=utf8');
    res.setHeader('Content-Length', 10);
    res.setHeader('Transfer-Encoding', 'chunked');
    res.write('Hello world!');
    setTimeout(() => {
      res.write('第一次传输');
    }, 1000);
    setTimeout(() => {
      res.write('第二次传输');
    }, 2000);
  }
});

server.listen(8010, () => {
  console.log('成功启动');
});
```

### 分块编码的拖挂

当我们使用 `chunked` 进行分块编码传输的时候，传输结束之后，还有机会在分块报文的末尾，再追加一段数据，此数据称为拖挂（Trailer）。

拖挂的数据，可以是服务端在末尾需要传递的数据，客户端其实是可以忽略并丢弃拖挂的内容的，这就需要双方协商好传输的内容了。

在拖挂中可以包含附带的首部字段，除了 `Transfer-Encoding`、`Trailer` 以及 `Content-Length` 首部之外，其他 HTTP 首部都可以作为拖挂发送。

### 内容编码和传输编码结合

内容编码和传输编码一般都是配合使用。我们会先使用内容编码，将内容实体进行压缩，然后通过传输编码分块发送出去。客户端接收到分块的数据，再将数据进行重新整合，还原成最初的数据。

## 管线化连接

默认情况下 HTTP 协议中每个传输层连接只能承载一个 HTTP 请求和响应，浏览器会在收到上个请求的响应后，再发送下个请求。

在使用持久连接的情况下，某个连接上消息传递类似于 `请求1 -> 响应1 -> 请求2 -> 响应2 -> 请求3 -> 响应3`.

HTTP Pipelining（管线化）是将多个 HTTP 请求整批提交的技术，在传送过程中不需等待服务端的应答。使用 HTTP 管线化后，某个连接上的消息变成类似这样，`请求1 -> 请求2 -> 请求3 -> 响应1 -> 响应2 -> 响应3`。

注意事项：

- 管线化机制通过 **持久连接**（Persistent Connection）完成，仅 HTTP/1.1 支持此技术
- 只有 GET 和 HEAD 请求可以进行管线化，而 POST 则有所限制
- 初次创建连接时不应启动管线机制，因为服务器不一定支持 HTTP/1.1 版本的协议
- 管线化不会影响响应到来的顺序
- HTTP/1.1 要求服务器端支持管线化，但并不要求服务器端也对响应进行管线化处理，只要要求对于管线化的请求不失败即可
- 由于上面提到的服务器端问题，开启管线化很可能并不会带来大幅度的性能提升，而且很多服务器端和代理程序对管线化的支持并不好，因此现代浏览器如 Chrome 和 Firefox 默认并未开启管线化支持

## 参考资料

- [📝 HTTP 灵魂之问，巩固你的 HTTP 知识体系](https://juejin.im/post/6844904100035821575)
- [📝 HTTP 的长连接和短连接](https://www.cnblogs.com/cswuyg/p/3653263.html)
- [📝 HTTP 传输编码增加了传输量，只为解决这个问题](https://juejin.im/post/6844903635881558024)
