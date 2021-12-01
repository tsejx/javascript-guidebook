---
nav:
  title: 计算机网络
  order: 8
group:
  title: Web 安全
  order: 4
title: 同源策略
order: 1
---

# 同源策略

**同源策略**限制从一个源加载的文档或脚本如何与来自另一个源的资源进行交互，这是一个用于隔离潜在恶意文件的关键的安全机制。

同源需要满足以下三个方面：

- 协议相同
- 域名相同
- 端口相同

以 `http://www.a.com` 为例

- `http://www.a.com/foo` 同源
- `http://a.com/foo` 不同源（域名不同）
- `http://a.edu/foo` 不同源（域名不同）
- `http://b.a.com/foo` 不同源（域名不同）
- `http://a.com:81/foo` 不同源（端口不同）
- `https://a.com/foo` 不同源（协议不同）

如果是非同源，则以下行为会受到限制：

- Cookie、LocalStorage 和 IndexDB 无法读取
- DOM 无法获取
- AJAX 请求不能发送

**为什么要实现跨域请求？**

工程服务化后，不同职责的服务分散在不同的工程中，往往这些工程的域名是不同的，但一个需求可能对应到多个服务，这时便需要调用不同服务的接口，因此会出现跨域。

同源策略仅存在于浏览器客户端，不存在 Android、iOS、NodeJS、Python、Java 等其他环境。

⚠️ **注意**：跨域请求能成功发送，服务端能接收请求并正常返回结果，只是结果被浏览器拦截了。

## 跨源网络访问

严格来说，浏览器并不是拒绝所有的跨域请求，实际上拒绝的是跨域的读操作。

同源策略控制了不同源之间的交互，这些交互通常分为三类：

- ✅ 通常浏览器允许进行跨域 **写操作**（Cross-origin writes），如链接、重定向以及表单提交
- ✅ 通常浏览器允许跨域 **资源嵌入**（Cross-origin embedding），如 `img`、`script` 标签
- ❌ 通常浏览器不允许跨域 **读操作**（Cross-origin reads），但常可以通过内嵌资源来巧妙地进行读取访问。例如可以读取嵌套图片的高度和宽度，调用内嵌脚本的方法

## 解决方案

- CORS 跨域资源共享
- Node 代理跨域
- Nginx 代理跨域
- JSONP
- WebSocket
- window.postMessage
- document.domain + iframe
- window.location.hash + iframe
- window.name + iframe

### CORS

CORS 亦即 [跨域资源共享](../http/access-control)，是一种 HTTP 机制，它使用额外的 HTTP 响应头来告诉浏览器让其运行在一个 `origin` (`domain`) 上的 Web 应用被准许访问来自 **不同源服务器** 上的指定的资源。当一个资源从与该资源本身所在的服务器 **不同的域、协议或端口** 请求一个资源时，资源会发起一个 **跨域 HTTP 请求**。

值得注意的是，通常使用 CORS 时，异步请求会被分为**简单请求**和**非简单请求**，非简单请求的区别是会先发送一个 **预检请求**（Preflight Request）。

**服务器预检请求 / 响应头**

| 响应头                             | 描述                                                         |
| :--------------------------------- | :----------------------------------------------------------- |
| `Access-Control-Allow-Headers`     | 请求头，响应头，预请求（携带 Cookie 情况下不能为 `*`）       |
| `Access-Control-Allow-Methods`     | 请求头，响应头，预请求（携带 Cookie 情况下不能为 `*`）       |
| `Access-Control-Allow-Origin`      | 响应头，预请求 / 正常请求（携带 Cookie 情况下不能为 `*`）    |
| `Access-Control-Allow-Credentials` | 响应头，预请求/正常请求（携带 Cookie 情况下要设置为 `true`） |
| `Access-Control-Max-Age`           | 响应头，预请求（单位 `s`）                                   |

`Access-Control-Allow-Origin` 只能阻止浏览器端拿到服务器返回数据，服务端的处理还是会执行，要配合 `token` 鉴权令牌等策略来防范。

💡 实现细节请参考 [HTTP 跨域资源共享](../http/access-control)

#### 原生实现

在 Node.js 中 `CORS` 的实现：

```js
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', ctx.headers.origin);
  ctx.set('Access-Control-Allow-Credentials', true);
  ctx.set('Access-Control-Request-Method', 'PUT,POST,GET,DELETE,OPTIONS');
  ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, cc');
});
```

#### 第三方中间件

以 Koa 为例子，解禁指定域名的跨域请求问题：

```js
const Koa = require('koa');
const cors = require('koa2-cors'); // 使用插件解决跨域处理

const app = new Koa();

app.use(
  cors({
    origin: function (ctx) {
      if (ctx.url === '/login') {
        // 允许来自所有域名的请求
        return '*';
      }

      // 只允许 http://localhost:8080 这个域名的请求
      return 'http://localhost:8080';
    },
    // 指定本次预检请求的有效期，单位为秒
    maxAge: 5,
    // 是否允许发送 Cookie
    credentials: true,
    // 设置所允许的 HTTP 请求方法
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    // 设置服务器支持的所有头信息字段
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    // 设置获取其他自定义字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  })
);
```

> [koa2-cors](https://github.com/zadzbw/koa2-cors) 内部实现请参照源码。

#### 关于 Cookie 问题

要传递 Cookie 需要满足三个条件：

1. Web 请求设置 `withCredentials`

这里默认情况下在跨域请求，浏览器是不带 Cookie 的。但是我们可以通过设置 `withCredentials` 来进行传递 Cookie。

```js
// 原生 XMLHttpRequest 的设置方式
const xhr = new XHRHttpRequest();
xhr.withCredentials = true;

// Axios 设置方式
axios.default.withCredentials = true;
```

2. `Access-Control-Allow-Credentials` 为 `true`
3. `Access-Control-Allow-Origin` 为非 `*`

这里的请求方式，在 Chrome 中是能看到返回值的，但是只要不满足以上其一，浏览器会报错，无法获取数据。

### Node 代理

利用 Node + Express + Http-Proxy-Middleware 搭建一个 Proxy 服务器。

**前端实现**

```js
const xhr = new XMLHttpRequest();

// 前端开关：浏览器是否读写cookie
xhr.withCredentials = true;

// 访问http-proxy-middleware代理服务器
xhr.open('get', 'http://www.domain1.com:3000/login?user=admin', true);
xhr.send();
```

**服务器实现**

```js
const express = require('express');
const proxy = require('http-proxy-middleware');
const app = express();

app.use(
  '/',
  proxy({
    // 代理跨域目标接口
    target: 'http://www.domain2.com:8080',
    changeOrigin: true,

    // 修改响应头信息，实现跨域并允许带cookie
    onProxyRes: function (proxyRes, req, res) {
      res.header('Access-Control-Allow-Origin', 'http://www.domain1.com');
      res.header('Access-Control-Allow-Credentials', 'true');
    },

    // 修改响应信息中的cookie域名
    cookieDomainRewrite: 'www.domain1.com', // 可以为false，表示不修改
  })
);

app.listen(3000);
console.log('Proxy server is listen at port 3000...');
```

本质上与 CORS 中列举的 Koa 的例子的原理是一样的，就是解除 CORS 的限制，但这里更强调的是开发时与后端接口联调的场景使用，即启动前端项目的同时，也启动一个开发本地的 Node 代理服务用于转发客户端向服务端发起的请求。

### Nginx 反向代理

Nginx 可实现用于反向代理的异步 Web 服务器，他除了用于反向代理以外还可以用于负载均衡、 HTTP 缓存。

```nginx
http {
  include               mime.types;
  default_type          application/octet-stream;
  client_max_body_size  2000M;
  keepalive_timeout     65;

  # 虚拟服务器
  server {
    listen       8080;
    server_name  localhost;

    # CORS 设置
    # 指定响应资源是否允许与给定的 origin 共享
    add_header Access-Control-Allow-Origin *;
    # 配置是否允许将对请求的响应暴露给页面
    add_header Access-Control-Allow-Credentials 'true';
    # 配置允许跨域的请求头
    add_header Access-Control-Allow-Headers 'Authorization,Content-Type,Accept,Origin,User-Agent,Cache-Control,X-Mx-ReqToken,X-Requested-With';
    # 配置允许跨域的请求方法
    add_header Access-Control-Allow-Methods 'GET,POST,Options';

    # 跳过服务端校验，直接返回 200
    if ($request_method = 'OPTIONS') {
      return 200;
    }

    location / {
        root        /data/example/dist;
        index       index.html index.htm;
        try_files   $uri /index.html;
        add_header  Cache-Control "private, no-store, no-cache, must-revalidate, proxy-revalidate";
    }

    location /api/ {
        proxy_pass  https://xxx.xxx.xxx/req/;
    }
  }
}
```

- 对于简单请求，如 GET，只需要在 HTTP Response 后添加 Access-Control-Allow-Origin
- 对于非简单请求，如 POST、PUT、DELETE 等，浏览器会分两次应答。第一次 Preflight（`method: OPTIONS`），主要验证来源是否合法，并返回允许的 `Headers` 等；第二次才是真正的 HTTP 应答，所以服务器必须处理 `OPTIONS` 应答。

由于浏览器第一次 Preflight 预检，导致服务端对其请求进行校验，但是服务端本身没有开启 CORS，所以会导致服务端返回 405 Method Not Allowed 或者 403 Forbidden。所以我们需要在 Nginx 对该请求进行拦截，直接返回 200，跳过服务端校验。

### JSONP

**实现原理**

动态创建 `<script>` 脚本标签，通过跨域脚本嵌入不受同源策略限制的方法实现请求第三方服务器数据内容。除了适用于 `<script>` 脚本标签，HTML 中包含 `src` 和 `href` 属性的标签均不受同源策略限制。

**实现步骤**

1. 动态创建 `<script>` 标签
2. 标签 `src` 属性设置接口地址
3. 接口参数，必须要带一个自定义函数名，要不然后台无法返回数据，通常为 `callback` 或 `cb`
4. 通过定义函数名去接收后台返回数据

前端实现：

```js
// 动态创建脚本标签
const script = document.createElement('script');

// 设置接口地址
script.src = 'http://localhost:8080/api/jsonp?cb=jsonpCallback';

// 插入页面
document.appendChild(script);

// 通过定义回调函数接收响应数据
window.jsonpCallback = function (res) {
  // do something with response data
};
```

后端实现：

```js
const Koa = require('koa');
const fs = require('fs');
const app = new Koa();

app.use(async (ctx, next) => {
  if (ctx.path === '/api/jsonp') {
    const { cb } = ctx.query;
    ctx.body = `${cb}(${JSON.stringify({ msg })})`;
    return;
  }
});

app.listen(8080);
```

由于 `<script>` 元素请求的脚本，直接作为代码运行。这时，只要浏览器定义了回调函数，该函数就会立即调用。作为参数的 JSON 数据被视为 JavaScript 对象，而不是字符串，因此避免了使用 `JSON.parse` 的步骤。

**缺点**：

- 非常高的跨站脚本攻击风险
- 只能实现 GET 请求
- 接口出现错误时，很难进行错误识别处理

### WebSocket

WebSocket 是一种通信协议，使用 `ws://`（非加密）和 `wss://`（加密）作为协议前缀。该协议不实行同源政策，只要服务器支持，就可以通过它进行跨源通信。

简单来说，WebSocket 通过客户端和服务端之间建立持久的连接，双方可以随时发送数据。

这种方式本质上没有使用 HTTP 协议进行通信，因此也没有浏览器跨域的限制。

前端部分：

```js
const socket = new WebSocket('ws://localhost:8080');

socket.onopen = function () {
  socket.send('Client Socket is openning');
};

socket.onmessage = function (e) {
  console.log(e.data);
};
```

后端部分：

```js
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', function (socket) {
  socket.on('message', function (data) {
    socket.send(data);
  });
});
```

💡 实现细节请参考 [WebSocket](../../html5-scripting-programming/connectivity/web-socket)

### window.postMessage

通常，对于两个不同页面的脚本，只有当执行它们的页面位于具有相同的协议（通常为 HTTPS），端口号（443 为 HTTPS 的默认值），以及主机（两个页面的模数 `document.domain` 设置为相同的值）时，这两个脚本才能相互通信。`window.postMessage` 方法提供了一种受控机制来规避此限制，只要正确的使用，这种方法就很安全。

`window.postMessage(message, targetOrigin)` 方法是 HTML5 新引进的特性，可以使用它向其他的 `window` 对象发送消息，无论这个 `window` 对象是属于同源或不同源，目前 IE8+、Firefox、Chrome、Opera 等浏览器都已经支持该方法。

**用途：**

1. 页面和其打开的新窗口的数据传递
2. 多窗口之间消息传递
3. 页面与嵌套的 iframe 消息传递

```js
otherWindow.postMessage(message, targetOrigin, [transfer]);
```

- `otherWindow`：其他窗口的一个引用，比如 iframe 的 `contentWindow` 属性、执行 `window.open` 返回的窗口、或者是命名过或数值索引的 `window.iframes`
- `message`：将要发送到其他 `window` 的数据
- `targetOrigin`：通过窗口的 `origin` 属性来指定哪些窗口能接收到消息事件
- `transfer`（可选）：是一串和 `message` 同时传递的 Transferable 对象，这些对象的所有权将被转移给消息的接收方，而发送一方将不再保有所有权

发送端页面：

```html
<iframe id="iframe" src="http://localhost:8080/" frameborder="0" onload="load()"></iframe>

<script type="application/javascript">
  function load() {
    iframe.contentWindow.postMessage('Hello world!', 'http://localhost:8080/');

    window.onmessage = (e) => {
      console.log(e.data);
    };
  }
</script>
```

接收端页面：

```html
<div></div>
<script type="application/javascript">
  window.onmessage = (e) => {
    console.log(e.data);
    // Hello world!
    e.source.postMessage(e.data, e.origin);
  };
</script>
```

💡 实现细节请参考 [PostMessage](../../browser-object-model/connectivity/post-message)

### document.domain + iframe

Cookie 是服务器写入浏览器的一小段信息，只有同源的网页才能共享。

但是，两个网页一级域名相同，只是二级域名不同，浏览器只需要设置 `document.domain` 为更高级别的域就能实现 Cookie 共享。

🌰 **代码示例**

以 `a.foo.com` 和 `b.foo.com` 为例，只要设置相同的 `document.domain`，两个网页就可以共享 Cookie。

```js
document.domain = 'foo.com';
```

⚠️ **注意**：这种方法只适用于 Cookie 和 iframe 窗口，localStorage 和 IndexDB 无法通过这种方法，规避同源策略，需要采用下文提及的 [PostMessage API](#postMessage)。

另外，服务器也可以在设置 Cookie 的时候，指定 Cookie 的所属域名为一级域名。

```http
Set-Cookie: key=value; domain=.example; path=/
```

那么，二级域名和三级域名不用做任何设置，都可以读取这个 Cookie。

### window.location.hash + iframe

如果两个网页不同源，就无法拿到对方的 DOM。典型的例子是 `iframe` 窗口和 `window.open` 方法打开的窗口，它们与父窗口无法通信。

通过 `url` 带 `hash` 锚点，可以通过一个非跨域的中间页面来传递数据。

**实现流程**

一开始 `a.html` 给 `c.html` 传一个 hash 值，然后 `c.html` 收到 hash 值后，再把 hash 值传递给 `b.html`，最后 `b.html` 将结果放到 `a.html` 的 hash 值中。同样的，`a.html` 和 `b.html` 是同域的，都是 `http://localhost:8000/`，而 `c.html` 是 `http://localhost:8080/`。

`a.html`：

```html
<iframe src="http://localhost:8080/hash/c.html#param1"></iframe>

<script type="application/javascript">
  console.log(location.hash);

  window.onhashchange = function () {
    console.log(location.hash);
  };
</script>
```

`b.html`：

```html
<script type="application/javascript">
  window.parent.parent.location.hash = location.hash;
</script>
```

`c.html`：

```html
<body></body>
<script type="application/javascript">
  console.log(location.hash);

  const iframe = document.createElement('iframe');

  iframe.src = 'http://localhost:8000/hash/b.html#name2';

  document.body.appendChild(iframe);
</script>
```

### window.name + iframe

`window` 对象的 `name` 属性是一个很特别的属性，当该 `window` 的 `location` 变化，然后重新加载，它的 `name` 属性可以依然保持不变。

其中 `a.html` 和 `b.html` 是同域的，都是 `http://localhost:8000/`，而 `c.html` 是 `http://localhost:8080/`。

`a.html`：

```html
<iframe
  id="iframe"
  frameborder="0"
  src="http://localhost:8080/name/c.html"
  onload="load()"
></iframe>

<script type="application/javascript">
  let first = true;
  // onload 事件会触发 2 次，第 1 次加载跨域页，并留存数据于 window.name
  function load() {
    if (first) {
      // 第 1 次 onload（跨域页）成功后，切换到同域代理页面
      iframe.src = 'http://localhost:8000/name/b.html';
      first = false;
    } else {
      // 第 2 次 onload（同域 b.html 页）成功后，读取同域 window.name 中数据
      console.log(iframe.contentWindow.name);
    }
  }
</script>
```

`b.html` 为中间代理页，与 `a.html` 同域，内容为空。

```html
<div></div>
```

`c.html`：

```html
<script type="application/javascript">
  window.name = 'Hello world!';
</script>
```

## 阻止跨源访问

- 阻止跨域写操作，只要检测请求中的一个不可测的标记（CSRF token）即可，这个标记被称为 [Cross-Site Request Forgery (CSRF)](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_%28CSRF%29) 标记。必须使用这个标记来阻止页面的跨站读操作。
- 阻止跨站嵌入，需要确保你的资源不能是以上列出的可嵌入资源格式。多数情况下浏览器都不会遵守 `Content-Type` 消息头。例如，如果您在 HTML 文档中指定 `<script>` 标记，则浏览器将尝试将 HTML 解析为 JavaScript。 当您的资源不是您网站的入口点时，您还可以使用 CSRF 令牌来防止嵌入。
- 阻止资源的跨站读取，需要保证该资源是不可嵌入的。阻止嵌入行为是必须的，因为嵌入资源通常向其暴露信息。

## 参考资料

- [📖 MDN: 浏览器的同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)
- [📝 浏览器同源政策及其规避方法](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)
- [📝 我知道的跨域与安全](https://juejin.im/post/5a6320d56fb9a01cb64ee191)
- [📝 10 种跨域解决方案（附终极方案）](https://mp.weixin.qq.com/s/Nk8YPYQDUJOKgQ9Qa7byag)
