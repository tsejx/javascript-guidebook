---
nav:
  title: BOM
  order: 5
group:
  title: 数据通信 API
  order: 11
title: WebSocket
order: 5
---

# Web Socket

WebSocket 作为 HTML5 一种新的协议，实现了浏览器和服务器双全工通信（full-duplex）。

- 连接协商和同源策略
- 与既有 HTTP 基础设施的互操作
- 基于消息的通信和高效消息分帧
- 子协议协商及可扩展能力

## 建立通信

WebSocket 通过构造函数创建一个 WebSocket 用于与服务器进行连接，返回一个 WebSocket 实例。通过这个实例监听事件，这些事件可以让我们知道**什么时候建立连接**，**什么时候服务器发消息过来**，**什么时候发生了故障**，**什么时候关闭连接**。

### 语法

```js
WebSocket(url [, protocols])
```

- `url`：`ws(wss)://ip:port/url` （wss 是 WebSocketSource 缩写）
- `protocols`：可以使用的字协议包括 XMPP（可扩展息处理现场协议）、SOAP（简单对象访问协议）或者自定义协议

### 属性

| 属性             | 说明                                                                                                                                                                                                                                       | 类型           |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| `onopen`         | 服务器响应 WebSocket 连接请求后的回调函数                                                                                                                                                                                                  | EventListener  |
| `onmessage`      | 接收到来自服务器的数据时触发的回调函数（WebSocket 还可以处理二进制数据，这种数据作为 Blob 消息或者 ArrayBuffer 消息。因为设置 WebSocket 消息二进制数据类型的应用会影响二进制消息，所以必须在读取数据之前决定用于客户端的二进制数据的类型） | EventListener  |
| `onerror`        | 响应意外故障的时候出发，如果你接收一个 Error 事件，可以预期很快就会触发 `close` 事件。Error 事件处理程序时调用服务器重连逻辑以及处理来自 WebSocket 对象的异常的最佳场所。                                                                  | EventListener  |
| `onclose`        | WebSocket 连接关闭后的回调函数                                                                                                                                                                                                             | EventListener  |
| `binaryType`     | 指示由连接发送的二进制数据的类型的字符串                                                                                                                                                                                                   | DOMString      |
| `bufferedAmount` | （只读）未发送至服务器的字节数                                                                                                                                                                                                             | unsigned long  |
| `extensions`     | （只读）服务器选择的扩展                                                                                                                                                                                                                   | DOMString      |
| `protocol`       | 服务器选择的下属协议                                                                                                                                                                                                                       | DOMString      |
| `readyState`     | 当前的连接状态                                                                                                                                                                                                                             | unsigned short |
| `url`            | （只读）WebSocket 的绝对路径                                                                                                                                                                                                               |                |

### 连接状态

`readyState` 报告连接状态：

| 特性常量             | 值  | 状态                               |
| -------------------- | --- | ---------------------------------- |
| WebSocket.CONNECTING | 0   | 连接正在进行中，但还未建立         |
| WebSocket.OPEN       | 1   | 连接已经建立，消息可以在客户端接收 |
| WebSocket.CLOSING    | 2   | 连接正在进行关闭握手               |
| WebSocket.CLOSED     | 3   | 连接以及功能关闭，不能打开         |

### 方法

| 方法                       | 说明                                                                                                                                                                                                                                                          |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `close([code [, reason]])` | 关闭当前链接（`code` 可选参数，指示状态代码的数字值，解释连接正在关闭的原因。如果未指定此参数，则假定默认值为 1000（表示正常的“事务完成”关闭）；`reason` 可选参数，一个人类可读的字符串，解释连接正在关闭的原因。该字符串必须不超过 123 个字符的 UTF-8 文本） |
| `send(data)`               | 连接打开时向服务器发送数据                                                                                                                                                                                                                                    |

#### Code 附录

| 状态代码  | 状态               | 说明                                                                                                                             |
| --------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| 1000      | 正在关闭           | 会话成功完成时发送此状态码                                                                                                       |
| 1001      | 离开               | 因应用程序离开且不期望后续的连接尝试而关闭连接时，发送此状态码。服务器可能关闭，或者客户端应用程序可能关闭                       |
| 1002      | 协议错误           | 当因协议错误而关闭连接时发送此状态码                                                                                             |
| 1003      | 不可接受的数据类型 | 当应用程序接收到一条无法处理的意外类型消息时发送此状态码                                                                         |
| 1004      | 保留               | 禁用状态码。根据 RFC 6455，这个状态码保留，可能在未来定义                                                                        |
| 1005      | 保留               | 禁用状态码。WebSocket API 用此状态码表示没有接收到任何代码                                                                       |
| 1006      | 保留               | 禁用状态码。WebSocket API 用此状态码表示连接异常关闭                                                                             |
| 1007      | 无效数据           | 在接收一个格式与消息类型不匹配的消息之后发送此状态码。如果文本消息包含错误格式的 UTF-8 数据，连接应该用这个代码关闭              |
| 1008      | 消息违反政策       | 当应用程序由于其他代码所不包含的原因终止连接，或者不希望泄露消息无法处理的原因时返回此状态码                                     |
| 1009      | 消息过大           | 当接收的消息太大，应用程序无法处理时发送此状态码（记住，帧的载荷长度最多为 64 字节。即使你有一个大服务器，有些消息也仍然过大）。 |
| 1010      | 需要扩展           | 当应用程序需要一个或者多个服务器无法协商的特殊扩展时，从客户端（浏览器）发送此状态码。                                           |
| 1011      | 意外情况           | 当应用程序由于不可预见的原因，无法继续处理连接时，发送此状态码                                                                   |
| 1015      | TLS 失败（保留）   | 禁用状态码。WebSocket API 用这个代码表示 TLS 在 WebSocket 握手之前失败。                                                         |
| 0~999     | 禁止               | 1000 以下的代码是无效的，不能用于任何目的                                                                                        |
| 1000~2999 | 保留               | 这些代码保留以用于扩展和 WebSocket 协议的修订版本。按照标准规定使用这些代码，参见表 3-4                                          |
| 3000~3999 | 需要注册           | 这些状态码用于“程序库、框架和应用程序”。这些状态码应该在 IANA（互联网编号分配机构）公开注册                                      |
| 4000~4999 | 私有               | 在应用程序中将这些状态码用于自定义用途。因为它们没有注册，所以不要期望它们能被其他 WebSocket 广泛理解                            |

### 示例

```js
// 创建安全的WebSocket连接(wss)
const ws = new WebSocket('ws://github.websocket.org');

// 连接建立时调用
ws.addEventListener(
  'open',
  () => {
    // 向服务端发送消息
    this.send('TEST!');
  },
  false
);

// 接收服务端响应的消息
ws.addEventListener(
  'message',
  err => {
    console.log(e.data);
  },
  false
);

// 连接关闭时调用
ws.addEvenetListener(
  'close',
  err => {
    console.log('WebSocketClosed!');
  },
  false
);

// 连接错误时调用(并且会关闭连接)
ws.addEventListener(
  'error',
  err => {
    console.log('WebSocketError!');
  },
  false
);
```

```js
ws.binaryType = 'blob';

ws.onmessage = function(e) {
  if (e.data instanceof Blob) {
    console.log('Blob', e.data);
    const b = new Blob(e.data);
  }
};
```

```js
ws.binaryType = 'arraybuffer';

ws.onmessage = function(e) {
  if (e.data instanceof ArrayBuffer) {
    console.log('ArrayBuffer', e.data);
    const a = new Uint8Array(e.data);
  }
};
```

## WebSocket 协议

WebSocket 协议有两部分：握手、数据传输。

### 握手请求

WebSocket 协议是为了浏览器实现与服务器的全双工通信和 HTTP 协议在浏览器端的广泛应用，因此 WebSocket 的握手是 HTTP 请求的升级。

建立 WebSocket 连接的请求头：

```http
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
Origin: http://example.com
```

| 头字段                 | 说明                                                                                                         |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ |
| Host                   | （必填）WebSocket 服务器主机名                                                                               |
| Upgrade                | （必填）值必须为 `websocket`                                                                                 |
| Connection             | （必填）值必须为 `Upgrade`                                                                                   |
| Sec-WebSocket-Key      | （必填）Base64 encode 编码的随机 16 字节长的字符序列                                                         |
| Sec-WebSocket-Protocol | （选填）可用选项有子协议选择器                                                                               |
| Sec-WebSocket-Version  | （必填）WebSocket Draft（协议版本）                                                                          |
| Origin                 | （浏览器必填）头域（ RFC6454） 用于保护 WebSocket 服务器不被未授权的运行在浏览器的脚本跨源使用 WebSocket API |

WebSocket 客户端将上述请求发送到服务器。如果是调用浏览器的 WebSocket API，浏览器会自动完成完成上述请求头。

## 相关类库

- react-websocket

## 兼容性

语法部分错误
| IE | Edge | Firefox | Chrome | Safari | Opera |
| --- | ---- | ------- | ------ | ------ | ----- |
| 11 | 18 | 63 | 70 | 12 | 56 |

```js
// 兼容代码
const ws = window.WebSocket
  ? new window.WebSocket(url, protocol)
  : new window.MozWebSocket(url, protocol);
```

---

**参考资料：**

- [WebSocket 浅析](https://juejin.im/entry/58bd0579128fe1007e5c62c7)
- [WebSocket 粗谈](https://juejin.im/entry/57a993750a2b5800586a9d3f)
- [WebSocket 探秘](https://juejin.im/post/5a1bdf676fb9a045055dd99d)
- [React 加入 WebSocket](https://www.cnblogs.com/houjl/p/10812519.html)
