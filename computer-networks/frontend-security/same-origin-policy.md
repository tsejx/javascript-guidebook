# 同源策略

处于浏览器的同源策略，浏览器会拒绝跨域请求。

同源政策的目的，是为了保证用户信息的安全，防止恶意的网站窃取数据。

同源需要满足以下三个方面：

* 协议相同
* 域名相同
* 端口相同

以 `http://www.a.com` 为例

* `http://www.a.com/foo` 同源
* `http://a.com/foo` 不同源（域名不同）
* `http://b.a.com/foo` 不同源（域名不同）
* `http://a.com:81/foo` 不同源（端口不同）
* `https://a.com/foo` 不同源（协议不同） 

如果是非同源，则以下行为会受到限制：

* Cookie、LocalStorage 和 IndexDB 无法读取
* DOM 无法获取
* AJAX 请求不能发送

**为什么要实现跨域请求？**

工程服务化后，不同职责的服务分散在不同的工程中，往往这些工程的域名是不同的，但一个需求可能对应到多个服务，这时便需要调用不同服务的接口，因此会出现跨域。

同源策略是存在于浏览器客户端，不存在 Android、iOS、NodeJS、Python、Java 等其他环境。

⚠️ **注意**：跨域请求能成功发送，服务端能接收请求并正常返回结果，只是结果被浏览器拦截了。

## 跨源网络访问

严格来说，浏览器并不是拒绝所有的跨域请求，实际上拒绝的是跨域的读操作。

同源策略控制了不同源之间的交互，这些交互通常分为三类：

- 通常浏览器允许进行跨域写操作（Cross-origin writes），如链接、重定向以及表单提交
- 通常浏览器允许跨域资源嵌入（Cross-origin embedding），如 `img`、`script` 标签
- 通常浏览器不允许跨域读操作（Cross-origin reads），但常可以通过内嵌资源来巧妙地进行读取访问。例如可以读取嵌套图片的高度和宽度，调用内嵌脚本的方法

## 解决方案

- Cookie
- JSONP
- CORS
- WebSocket
- PostMessage
- iframe
- Node 代理跨域
- Nginx 代理跨域

### Cookie

Cookie 是服务器写入浏览器的一小段信息，只有同源的网页才能共享。

但是，两个网页一级域名相同，只是二级域名不同，浏览器祝只需要设置 `document.domain` 为更高级的域就能实现共享 Cookie。

🌰 **标准示例**

以 `a.foo.com` 和 `b.foo.com` 为例，只要设置相同的 `document.domain`，两个网页就可以共享 Cookie。

```js
document.domain = 'foo.com'
```

⚠️ **注意**：这种方法只适用于 Cookie 和 iframe 窗口，LocalStorage 和 IndexDB 无法通过这种方法，规避同源策略，需要采用下文提及的 [PostMessage API](#postMessage)。

另外，服务器也可以在设置 Cookie 的时候，指定 Cookie 的所属域名为一级域名。

```http
Set-Cookie: key=value; domain=.example; path=/
```

那么，二级域名和三级域名不用做任何设置，都可以读取这个 Cookie。

### JSONP

**实现原理**

动态创建 `<script>` 脚本标签，通过跨域脚本嵌入不受同源策略限制的方法实现请求第三方服务器数据内容。除了适用于 `<script>` 脚本标签，HTML 中包含 `src` 和 `href` 属性的标签均不受同源策略限制。

**实现步骤**

1. 动态创建 `<script>` 标签
2. 标签 `src` 属性设置接口地址
3. 接口参数，必须要带一个自定义函数名，要不然后台无法返回数据，通常为 `callback` 或 `cb`
4. 通过定义函数名去接收后台返回数据

```js
// 创建脚本标签
const script = document.createElement('script');

// 设置接口地址
script.src = 'http://1.1.1.1/url?callback=jsonpCallback'

// 插入页面
document.appendChild(script);

// 通过定义回调函数接收响应数据
function jsonpCallback(data){
    // do something
}
```

由于 `<script>` 元素请求的脚本，直接作为代码运行。这时，只要浏览器定义了回调函数，该函数就会立即调用。作为参数的 JSON 数据被视为 JavaScript 对象，而不是字符串，因此避免了使用 `JSON.parse` 的步骤。

**缺点**：

* 非常高的跨站脚本攻击风险
* 只能实现 GET 请求
* 接口出现错误时，很难进行错误识别处理

### CORS

CORS 即 [跨域资源共享](../http/access-control.md)，该策略能使服务器支持 XMLHttpRequest 的跨域请求。CORS 实现起来非常方便，只需要增加特定的 HTTP 头，让服务器能声明允许的访问来源。

值得注意的是，通常使用 CORS 时，异步请求会被分为简单请求和非简单请求，非简单请求的区别是会先发一次预检请求。

**服务器预检请求 / 响应头**

| 字段                             |                                                              |
| -------------------------------- | ------------------------------------------------------------ |
| Access-Control-Allow-Headers     | 请求头，响应头，预请求（携带 Cookie 情况下不能为 `*`）       |
| Access-Control-Allow-Methods     | 请求头，响应头，预请求（携带 Cookie 情况下不能为 `*`）       |
| Access-Control-Allow-Origin      | 响应头，预请求 / 正常请求（携带 Cookie情况下不能为 `*`）     |
| Access-Control-Allow-Credentials | 响应头，预请求/正常请求（携带 Cookie 情况下要设置为 `true`） |
| Access-Control-Max-Age           | 响应头，预请求（单位 `s`）                                   |

Access-Control-Allow-Origin 只能阻止浏览器端拿到服务器返回数据，服务端的处理还是会执行，要配合 Token 等策略来防范。

💡 实现细节请参考 [HTTP 跨域资源共享](../http/access-policy.md)

### WebSocket

WebSocket 是一种通信协议，使用 `ws://`（非加密）和 `wss://`（加密）作为协议前缀。该协议不实行同源政策，只要服务器支持，就可以通过它进行跨源通信。

💡 实现细节请参考 [WebSocket](../../html5-scripting-programming/connectivity/web-socket)

### PostMessage

`window.postMessage(message, targetOrigin)` 方法是HTML5 新引进的特性，可以使用它向其他的 Window 对象发送消息，无论这个 Window 对象是属于同源或不同源，目前 IE8+、Firefox、Chrome、Opera 等浏览器都已经支持该方法。

```js
otherWindow.postMessage(message, targetOrigin, [transfer]);
```

💡 实现细节请参考 [PostMessage](../../html5-scripting-programming/connectivity/post-message.md)

### iframe

如果两个网页不同源，就无法拿到对方的 DOM。典型的例子是 `iframe` 窗口和 `window.open` 方法打开的窗口，它们与父窗口无法通信。

**父窗口获取子窗口节点报错**

```js
document.getElementById('iframeWindow').contentWindow.document;
// Uncaught DOMException: Blocked a frame from accessing a cross-origin frame.
```

**子窗口获取主窗口节点报错**

```js
window.parent.document.body
// 报错
```

主要通过以下两种方式：

* `window.name`
* `location.hash`

### Node 代理跨域

Node 中间件实现跨域代理，是通过启一个代理服务器，实现数据的转发，也可以通过设置 `cookieDomainRewrite` 参数修改响应头中 Cookie 中域名，实现当前域的 Cookie 写入，方便接口登录认证。

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

app.use('/', proxy({
    // 代理跨域目标接口
    target: 'http://www.domain2.com:8080',
    changeOrigin: true,

    // 修改响应头信息，实现跨域并允许带cookie
    onProxyRes: function(proxyRes, req, res) {
        res.header('Access-Control-Allow-Origin', 'http://www.domain1.com');
        res.header('Access-Control-Allow-Credentials', 'true');
    },

    // 修改响应信息中的cookie域名
    cookieDomainRewrite: 'www.domain1.com'  // 可以为false，表示不修改
}));

app.listen(3000);
console.log('Proxy server is listen at port 3000...');
```

### Nginx 代理跨域

Nginx 是国外大神实现用的用于反向代理的异步 Web 服务器 他除了用于反向代理以外还可以用于负载均衡、 HTTP 缓存。

```nginx
server {
    listen       80;
	server_name  localhost;
	location / {
        root   /Users/abc/dist/;
        index  index.html index.htm;
    }

    location /api/ {
        proxy_pass  https://xxx.xxx.xxx/req/;
    }
}
```

## 阻止跨源访问

- 阻止跨域写操作，只要检测请求中的一个不可测的标记（CSRF token）即可，这个标记被称为 [Cross-Site Request Forgery (CSRF)](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_%28CSRF%29)  标记。必须使用这个标记来阻止页面的跨站读操作。
- 阻止跨站嵌入，需要确保你的资源不能是以上列出的可嵌入资源格式。多数情况下浏览器都不会遵守 `Conten-Type` 消息头。例如，如果您在 HTM L文档中指定 `<script>` 标记，则浏览器将尝试将 HTML 解析为 JavaScript。 当您的资源不是您网站的入口点时，您还可以使用 CSRF 令牌来防止嵌入。
- 阻止资源的跨站读取，需要保证该资源是不可嵌入的。阻止嵌入行为是必须的，因为嵌入资源通常向其暴露信息。

---

**参考资料**

* [📖 MDN: 浏览器的同源策略](<https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy>)
* [📝 浏览器同源政策及其规避方法](<http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html>)
* [📝 我知道的跨域与安全](<https://juejin.im/post/5a6320d56fb9a01cb64ee191>)