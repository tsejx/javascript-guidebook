---
nav:
  title: 计算机网络
  order: 8
group:
  title: Web 安全
  order: 4
title: 流量劫持
order: 6
---

# 流量劫持

流量劫持的方式主要分为两种：

- 域名解析劫持（DNS 劫持）
- 数据劫持（HTTP 劫持）

我们国内用户，一般是在家用路由器后面，要访问一个网站的话，会有三个步骤：

1. 首先访问 DNS 服务器，将域名转换为 IP 地址。
2. 访问这个 IP 地址，这样用户就访问了目标网站。
3. 如果是一个建设良好的网站，一般会把静态资源放在 CDN 上。

流量劫持就是在这些环节当中，对数据进行 **偷窃**、**篡改**，甚至转发流量进行攻击的这样一类行为。

## DNS 劫持

**域名解析劫持**（DNS 劫持）是针对传统 DNS 解析的常见劫持方式。用户在浏览器输入网址，即发出一个 HTTP 请求，首先需要进行域名解析，得到业务服务器的 IP 地址。使用传统 DNS 解析时，会通过当地网络运营商提供的本地域名服务器解析得到结果。在请求本地域名服务器解析域名时会出现问题，目标域名被恶意地解析到其他 IP 地址，造成用户无法正常使用服务。

[🌐 关于域名解析过程详解](../computer-network-architecture/dns#域名解析过程)

### 攻击方式

那么如何才能够污染 DNS 以达成流量劫持的目的呢？粗略来说，一共有三种途径：

1. **在用户设备上动手**：这个主要是通过一些恶意软件实现的，比如早期一些流氓软件会在用户本机篡改 `hosts` 文件，影响用户的搜索引擎工作。
2. **污染中间链路设备**：由于 DNS 查询是基于 UDP 协议明文发送的，因此在任意中间设备上，比如路由器，进行中间人攻击，修改 UDP 包的内容，就可以影响 DNS 的结果了。
3. **入侵 DNS 服务器**：这是一种成本比较高的方案，看起来似乎很困难，但 DNS 是一种相对古老的技术，其服务软件的实现可能已经年久失修，别有用心的攻击者可以寻找一些缺乏维护的 DNS 服务器，施行攻击。另外，有时 DNS 服务器上不止运行 DNS 软件，还会有一些其他的软件也在运行，比如同时也启动了 HTTP 服务等，这时攻击者也可以通过这些软件的漏洞来控制服务器，进而影响 DNS 的解析。由于 DNS 的缓存和上下传递关系，一旦有 DNS 服务器被影响，就会一次影响很多用户的访问，因此非常危险。

这三种途径当中，第一种和第三种的实施成本都比较高，但污染链路设备，在 Wi-Fi 普及而安全意识尚未普及的今天，是最容易得手的一种途径。

### 防御策略

目前针对 DNS 投毒，对抗中间人攻击的研究比较多。DNS 协议本身的安全性较差，而改造 DNS 协议又比较困难，因此现在主要的防御手段，集中在替换 UDP 协议上。

- TLS（Cloudflare）
- HTTP（腾讯云、阿里云）
- HTTPS（Cloudflare、Google）

目前，三种常见的替代方式比较流行：

1. DNS over TLS。这种协议是在 TLS 协议之上传输 DNS 内容，有点类似 HTTPS 和 TLS 关系。
2. DNS over HTTP。用 HTTP 协议来传输 DNS ，也是可以的。国内厂商当中对这种方案的支持较多。最简单的实现是使用一个 固定的 IP 地址作为域名服务器，每次不发生 UDP ，而是向这台服务器发送 HTTP 请求来获取解析结果。但通常很难签发相应的证书给固定 IP，因此也有些厂商自己对 HTTP 报文进行加密，从而防止这些解析结果再被中间人篡改。
3. DNS over HTTPS。和第二点比较类似，区别是使用了 HTTPS 协议。根据我的观察，采用这种方案的 Google 和 Cloudflare 都使用的是域名而非固定 IP ，因此还是要先解析一次域名服务器自身的域名才可以进行真正的查询。这可能会导致再次被中间人扰乱，从而迫使用户降级到普通的 UDP 方式上。

比较遗憾的是，由于浏览器没有暴露 DNS 相关的接口，这三种较为安全的 DNS 查询方式，都无法在前端当中得以使用。而 iOS 和 Android 开发者有机会使用其中的技术进行加强，但需要单独编写一些代码。

> 打工信部电话（12300）投诉也不失是个好办法。

## HTTP 劫持

HTTP 协议属于明文协议，中间链路上的任意设备，都可以篡改内容，导致流量劫持。

### 防御策略

#### Content Security Policy

CSP 原本是为了和 XSS 对抗而产生的一种技术方案，其原理是在 HTML 加载的时候，指定每种资源的 URL 白名单规则，防止 XSS 的运行和数据外送。但如果巧妙利用规则，也可以让所有的资源强制走 HTTPS ，这样就可以降低流量劫持的可能性。

具体的 CSP 规则比较复杂，大家可以在 [CSP 专属网站](https://content-security-policy.com/)上自己查看。

#### Subresource Integrity

SRI 是专门用来校验资源的一种方案，它读取资源标签中的 `integrity` 属性，将其中的信息摘要值，和资源实际的信息摘要值进行对比，如果发现无法匹配，那么浏览器就会拒绝执行资源。对于 `<script>` 标签来说，就是拒绝执行其中的代码，对于 CSS 来说则是不加载其中的样式。

通过给 `link` 标签或者 `script` 标签增加 `integrity` 属性即可开启 SRI 功能，比如：

```html
<script
  type="text/javascript"
  src="//s.url.cn/xxx/aaa.js"
  integrity="sha156-xxx sha384-yyy"
  crossorigin="anonymous"
></script>
```

`integrity` 值分成两个部分，第一部分指定哈希值的生成算法（sha256、sha384 及 sha512），第二部分是经过 `base64` 编码的实际哈希值，两者之间通过一个短横（`-`）分割。`integrity` 值可以包含多个由空格分隔的哈希值，只要文件匹配其中任意一个哈希值，就可以通过校验并加载该资源。上述例子中我使用了 `sha256` 和 `sha384` 两种 `hash` 方案。

> 备注：crossorigin="anonymous" 的作用是引入跨域脚本，在 HTML5 中有一种方式可以获取到跨域脚本的错误信息，首先跨域脚本的服务器必须通过 Access-Controll-Allow-Origin 头信息允许当前域名可以获取错误信息，然后是当前域名的 `script` 标签也必须声明支持跨域，也就是 `crossorigin` 属性。`link`、`img` 等标签均支持跨域脚本。如果上述两个条件无法满足的话， 可以使用 `try catch` 方案。

通过使用 webpack 的 `html-webpack-plugin` 和 `webpack-subresource-integrity` 可以生成包含 `integrity` 属性 `script` 标签。

```js
import SriPlugin from 'webpack-subresource-integrity';

const compiler = webpack({
  output: {
    crossOriginLoading: 'anonymous',
  },
  plugins: [
    new SriPlugin({
      hashFuncNames: ['sha256', 'sha384'],
      enabled: process.env.NODE_ENV === 'production',
    }),
  ],
});
```

那么当 `script` 或者 `link` 资源 SRI 校验失败的时候应该怎么做呢？

比较好的方式是通过 `script` 的 `onerror` 事件，当遇到 `onerror` 的时候重新 `load` 静态文件服务器之间的资源：

```html
<script
  type="text/javascript"
  src="//11.url.cn/aaa.js"
  integrity="sha256-xxx sha384-yyy"
  crossorigin="anonymous"
  onerror="loadScriptError.call(this, event)"
  onsuccess="loadScriptSuccess"
></script>
```

在此之前注入以下代码：

```js
(function () {
	function loadScriptError (event) {
		// 上报
		...
		// 重新加载 js
		return new Promise(function (resolve, reject) {
			var script = document.createElement('script')
			script.src = this.src.replace(/\/\/11.src.cn/, 'https://x.y.z') // 替换 cdn 地址为静态文件服务器地址
			script.onload = resolve
			script.onerror = reject
			script.crossOrigin = 'anonymous'
			document.getElementsByTagName('head')[0].appendChild(script)
		})
	}
	function loadScriptSuccess () {
		// 上报
		...
	}
	window.loadScriptError = loadScriptError
	window.loadScriptSuccess = loadScriptSuccess
})()
```

比较痛苦的是 `onerror` 中的 `event` 中无法区分究竟是什么原因导致的错误，可能是资源不存在，也可能是 SRI 校验失败，当然出现最多的还是请求超时，不过目前来看，除非有统计需求，无差别对待并没有多大问题。

注入 `onerror` 事件

当然，由于项目中的 `script` 标签是由 webpack 打包进去的，所以我们要使用 `script-ext-html-webpack-plugin` 将 `onerror` 事件和 `onsuccess` 事件注入进去：

```js
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = {
  //...
  plugins: [
    new HtmlWebpackPlugin(),
    new SriPlugin({
      hashFuncNames: ['sha256', 'sha384'],
    }),
    new ScriptExtHtmlWebpackPlugin({
      custom: {
        test: /\/*_[A-Za-z0-9]{8}.js/,
        attribute: 'onerror',
        value: 'loadScriptError.call(this, event)',
      },
    }),
    new ScriptExtHtmlWebpackPlugin({
      custom: {
        test: /\/*_[A-Za-z0-9]{8}.js/,
        attribute: 'onsuccess',
        value: 'loadScriptSuccess.call(this, event)',
      },
    }),
  ],
};
```

然后将 `loadScriptError` 和 `loadScriptSuccess` 两个方法注入到 HTML 中，可以使用 `inline` 的方式。

## CDN 劫持

前面说到 script 加载失败可能是由于多种原因造成的，那如何是否判断发生了 CDN 劫持呢？

方法就是再请求一次数据，比较两次得到文件的内容（当然不必全部比较），如果内容不一致，就可以得出结论了。

```js
function loadScript(url) {
  return fetch(url)
    .then((res) => {
      if (res.ok) {
        return res;
      }
      return Promise.reject(new Error());
    })
    .then((res) => {
      return res.text();
    })
    .catch((e) => {
      return '';
    });
}
```

比较两次加载的 `script` 是否相同

```js
function checkScriptDiff(src, srcNew) {
  return Promise.all([loadScript(src), loadScript(srcNew)])
    .then((data) => {
      var res1 = data[0].slice(0, 1000);
      var res2 = data[1].slice(0, 1000);
      if (!!res1 && !!res2 && res1 !== res2) {
        // CDN劫持事件发生
      }
    })
    .catch((e) => {
      // ...
    });
}
```

这里为什么只比较前 1000 个字符？因为通常 CDN 劫持者会在 js 文件最前面注入一些代码来达到他们的目的，注入中间代码需要 AST 解析，成本较高，所以比较全部字符串没有意义。如果你还是有顾虑的话，可以加上后 n 个字符的比较。

## 参考资料

- [📖 MDN：Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity)
- [📝 常见 Web 安全攻防总结](https://juejin.im/entry/5a559dd36fb9a01c9e45d896)
- [📝 浅谈流量劫持与防治](https://juejin.im/entry/5bcec8e2518825102423e391)
- [📝 腾讯 IVWEB 团队：使用 SRI 解决 CDN 劫持](https://juejin.im/post/5c355a816fb9a049a42f3ac8)
- [📝 应对流量劫持，前端能做哪些工作？](https://www.zhihu.com/question/35720092)
- [📝 Web 前端页面劫持和反劫持](https://js8.in/2017/08/04/Web%E5%89%8D%E7%AB%AF%E9%A1%B5%E9%9D%A2%E5%8A%AB%E6%8C%81%E5%92%8C%E5%8F%8D%E5%8A%AB%E6%8C%81/#more)
