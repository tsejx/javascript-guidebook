---
nav:
  title: BOM
  order: 5
group:
  title: 数据通信 API
  order: 11
title: Server-sent Events
order: 6
---

# Server-sent Events

服务器向浏览器推送消息，除了 WebSocket，还有一种方法：Sever-sent Events（以下简称 SSE）。

W3C 关于 Server-Sent Events 部分的描述 [W3C Server-Sent Events](https://www.w3.org/TR/eventsource/)

相比以往的轮询，SSE 可以为 B2C 带来更高的效率。

```jsx | inline
import React from 'react';
import img from '../../assets/server-sent-events/sever-sent-worker.png';

export default () => <img alt="Server-sent Events" src={img} width={720} />;
```

## 本质

严格来说，HTTP 协议无法让服务器向客户端主动推送消息。但是，有一种变通方法，就是服务器向客户端声明，接下来要发送的是流信息（Streaming）。

也就是说，发送的不是一次性的数据包，而是一个数据流，会连续不断地发送过来。这时，客户端不会关闭连接，会一直等着服务器发过来的新的数据流，视频播放就是这样的例子。本质上，这种通信就是以流信息的方式，完成一次用时很长的下载。

SSE 就是利用这种机制，使用流信息向浏览器推送信息。它基于 HTTP 协议，目前除了 IE/Edge，其他浏览器都支持。

## 特点

SSE 与 WebSocket 作用相似，都是建立浏览器与服务器之间的通信渠道，然后服务器向浏览器推送信息。

总体来说，WebSocket 更强大和灵活。因为它是全双工通道，可以双向通信；SSE 是**单向通道**，只能服务器向浏览器发送，因为流信息本质上就是下载。如果浏览器向服务器发送信息，就变成了另一次 HTTP 请求。

虽然如此，SSE 在设计时就拥有了一些 WebSocket 没有的特性，例如自动重连接、Event IDs 以及发送随机事件的能力等，我们需要根据实际应用场景，去选择不同的应用方案。

**SSE 优点：**

- SSE 基于 HTTP 协议，现有的服务器软件都支持。WebSocket 是一个独立协议。
- SSE 属于轻量级，使用简单；WebSocket 协议相对复杂。
- SSE 默认支持断线重连，WebSocket，需要自己实现。
- SSE 一般只用来传送文本，二进制数据需要编码后传送，WebSocket，默认支持传送二进制数据。
- SSE 支持自定义发送的消息类型。

**SSE 和 WebSocket 对比**

|           | 是否基于新协议 | 是否双向通信     | 是否支持跨域       | 接入成本 |
| --------- | -------------- | ---------------- | ------------------ | -------- |
| SSE       | 否（`HTTP`）   | 否（服务器单向） | 否（Firefox 支持） | 低       |
| WebSocket | 是（`WS`）     | 是               | 是                 | 高       |

## 客户端实现

EventSource 接口用于接收服务器发送的事件。它通过 HTTP 连接到一个服务器，以 `text/event-stream` 格式接收事件，不关闭连接。

- 浏览器生成 EventSource 实例，向服务器发起连接。
- 建立 EventSource 实例时，构造函数接收当前网址网域作为第一参数，也可以跨域。跨域时，可以指定第二个参数，打开 `withCredentials` 属性，表示是否一起发送 Cookie。
- EventSource 实例的 `readyState` 属性，表明连接的当前状态。该属性只读，只可以取以下值。
  - `0`：相当于常量 `EventSource.CONNECTING`，表示连接还未建立，或者断线正在重连。
  - `1`：相当于常量 `EventSource.OPEN`，表示连接已经建立，可以接受数据。
  - `2`：相当于常量 `EventSource.CLOSED`，表示连接已断，且不会重连。
- 连接一旦建立，就会触发 `open` 事件，可以在 `onopen` 属性定义回调函数。（连接事件源）

```js
if ('EventSource' in window) {
  const source = new EventSource(url, { withCredentials: true });

  source.addEventListener(
    'open',
    event => {
      // ...
    },
    false
  );
}
```

- 客户端收到服务器发来的数据，就会触发 `message` 事件，可以在 `onmessage` 属性的回调函数。（接收事件）

```js
source.addEventListener(
  'message',
  evnet => {
    const data = event.data;
    // handle message
  },
  false
);
```

- 上述代码中，事件对象 `data` 属性就是服务器端传回的数据（文本格式）。
- 如果发生通信错误（比如连接中断），就会触发 `error` 事件，可以在 `onerror` 属性定义回调函数。（错误处理）

```js
source.addEventListener(
  'error',
  event => {
    // handle error event
  },
  false
);
```

- `close()` 方法用于关闭 SSE 连接。（主动断开连接）

```js
source.close();
```

**自定义事件**

默认情况下，服务器发来的数据，总是触发浏览器 `EventSource` 实例的 `message` 事件。开发者还可以自定义 SSE 事件，这种情况下，发送回来的数据不会触发 `message` 事件。

```js
source.addEventListener(
  'foo',
  function(event) {
    var data = event.data;
    // handle message
  },
  false
);
```

上面代码中，浏览器对 SSE 的`foo`事件进行监听。如何实现服务器发送 `foo` 事件，请看下文。

## 服务器实现

## 数据格式

服务器高速客户端，返回的类型是事件流 `text/event-stream`。事件流仅仅是一个简单的文本数据流，文本应该使用 UTF-8 格式的编码。每条消息后面都由一个空行作为分隔符。以冒号开头的行为注释行，会被忽略。

```http
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive
```

- SSE 的 MIME Type 规定为 `text/event-stream`
- SSE 肯定不允许缓存
- SSE 是一个一直打开的 TCP 连接，所以 Connection 为 Keep-alive

每次发送的消息，由若干个 `message` 组成，每个 `message` 之间用 `\n\n` 分隔。每个 `message` 内部由若干行组成，每一行都是如下格式。

```http
[field]: value\n
```

`filed` 可能的类型包括：

- 空：表示该行是注释，会在处理时被忽略。
- data：表示该行包含的是数据。以 data 开头的行可以出现多次。所有这些行都是该事件的数据。
- event：表示该行用来声明事件的类型。浏览器在收到数据时，会产生对应类型的事件。
- id：表示该行用来声明事件的标识符。
- retry：表示该行用来声明浏览器在连接断开之后进行再次连接之前的等待时间。

此外，还可以有冒号开头的行，表示注释。通常，服务器每隔一段时间就会向浏览器发送一个注释，保持连接不中断。

```http
: This is a comment
```

## data 字段

数据内容由 `data` 字段表示。

```http
data: message\n\n
```

如果数据很长，可以分成多行，最后一行以 `\n\n` 结尾，前面行都用 `\n` 结尾。

```http
data: begin message\n
data: continue message\n\n
```

下面是一个发送 JSON 数据的例子。

```http
data: {\n
data: "foo": "bar",\n
data: "baz": '123',\n
data: }\n\n
```

## id 字段

数据标识符用 `id` 字段表示，相当于每一条数据的编号。

```http
id: msg1\n
data: message\n\n
```

浏览器用 `lastEventId` 属性读取这个值。一旦连接断线，浏览器会发送一个 HTTP 头，里面包含一个特殊的 `Last-Event-ID` 头信息，将这个值发送回来，用来帮助服务器端重建连接。因此，这个头信息可以被视为一种同步机制。

## event 字段

`event` 字段表示自定义的事件类型，默认是 `message` 事件。浏览器可以用 `addEventListener()` 监听该事件。

```http
event: foo\n
data: a foo event\n\n

data: an unnamed event\n\n

event: bar\n
data: a bar event\n\n
```

上面的代码创造了三条信息。第一条的名字是 `foo`，触发浏览器的 `foo` 事件；第二条未取名，表示默认类型，触发浏览器的 `message` 事件；第三条是 `bar`，触发浏览器的 `bar` 事件。

下面是另一个例子。

```http
event: userconnect
data: {"username": "bobby", "time": "02:33:48"}

event: usermessage
data: {"username": "bobby", "time": "02:34:11", "text": "Hi everyone."}

event: userdisconnect
data: {"username": "bobby", "time": "02:34:23"}

event: usermessage
data: {"username": "sean", "time": "02:34:36", "text": "Bye, bobby."}
```

## retry 字段

服务器可以用 `retry` 字段，指定浏览器重新发起连接的时间间隔。

```http
retry: 10000\n
```

两种情况会导致浏览器重新发起连接：一种是时间间隔到期，二是由于网络错误等原因，导致连接出错。

---

**参考资料：**

- [Server-sent Events 教程](http://www.ruanyifeng.com/blog/2017/05/server-sent_events.html)
- [MDN:使用服务器发送事件](https://developer.mozilla.org/zh-CN/docs/Server-sent_events/Using_server-sent_events)
- [HTML5 服务器推送事件（Server-sent Events）实战开发](https://www.ibm.com/developerworks/cn/web/1307_chengfu_serversentevent/index.html)
- [JS 实时通信三把斧系列之三：EventSource](https://blog.5udou.cn/blog/JSShi-Shi-Tong-Xin-San-Ba-Fu-Xi-Lie-Zhi-San-eventsource55)
